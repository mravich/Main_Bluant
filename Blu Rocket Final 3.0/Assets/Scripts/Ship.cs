using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Ship : MonoBehaviour {


	//private Movement movement;
	//private ForceManager forceManager;
	public Rigidbody rb;
	public Transform shipTransform;
	public float shipSpeed = 5f;
	private bool isMoving;
	public bool isMovingLeft, isMovingRight,canTeleport,canRotate;
	public float tilt;
	public Vector3 vektor;
	public Vector3 startRotation,currentRotation;
	public Vector3 rayDirection;
	public float angleClamp;
	public GameObject gameManager;
	// Use this for initialization

	void Awake(){

		// UCITAVANJE MOVEMENT SKRIPTE
		//movement = this.GetComponent<Movement> ();


		// UCITAVANJE RIGIDBODIJA OBJEKTA U OVOM SLUCAJU PLANE-A
		rb = this.GetComponent<Rigidbody>();


		// UCITAVANJE FORCE MANAGERA 
		//forceManager = this.GetComponent<ForceManager> ();

		// UCITAVANJE TRANSFORMA OBJEKTA
		shipTransform = this.transform;


	}

	void Start () {

		canTeleport = true;
		canRotate = true;


		 startRotation = shipTransform.eulerAngles;
		 currentRotation = shipTransform.eulerAngles;

	}




	// Update is called once per frame
	void Update () {
		restrictShipPosition ();
		restrictShipVelocity ();
		teleportShip ();



	}



	void LateUpdate(){
	
		if (isMovingLeft) {

			currentRotation.y = Mathf.Clamp (currentRotation.y + 5f, startRotation.y - angleClamp, startRotation.y + angleClamp);
			shipTransform.localRotation = Quaternion.Euler (currentRotation);
		} else if (isMovingRight) {

			currentRotation.y = Mathf.Clamp (currentRotation.y - 5f, startRotation.y - angleClamp, startRotation.y + angleClamp);
			shipTransform.localRotation = Quaternion.Euler (currentRotation);
		} else {
		
			currentRotation.y = Mathf.Lerp (currentRotation.y, 90f, 0.2f);
			shipTransform.localRotation = Quaternion.Euler (currentRotation);
		
		}
	
	}








	void FixedUpdate(){
		
		Vector3 currentRotation = shipTransform.localRotation.eulerAngles;
		float angle;
		if (isMovingLeft) {

			rb.AddForce (new Vector3 (-0.01f*shipSpeed, 0f, 0f), ForceMode.Impulse);


			/* RADI ALI NE DOBRO
			angle = Mathf.LerpAngle(0, 40, Time.deltaTime);
			shipTransform.Rotate(Vector3.up, angle);
			*/


		} else if (isMovingRight) {
			
	
			rb.AddForce (new Vector3 (0.01f*shipSpeed, 0f, 0f), ForceMode.Impulse);

			/*RADI ALI NE DOBRO 
			angle = Mathf.LerpAngle(0, -40, Time.deltaTime);
			shipTransform.Rotate(Vector3.up, angle);
			*/

		} else {
		
			rb.velocity = Vector3.Lerp (rb.velocity, Vector3.zero, 6f * Time.deltaTime);
			//currentRotation.y = Mathf.Lerp (currentRotation.y, 0f, 0.2f);
			//shipTransform.localRotation = Quaternion.Euler (currentRotation);



		
		}



		


	}






















	public void MoveShip(bool left, bool right){

		if (left) {


			isMovingLeft = left;
			isMovingRight = right;
		} else if (right) {


			isMovingLeft = left;
			isMovingRight = right;
		}

	}
	public void StopShip(){
		isMovingLeft = false;
		isMovingRight = false;

	
	}

	public void restrictShipPosition(){
		Transform transform = getTransformOfObject ();
		Vector3 currentPosition = new Vector3(Mathf.Clamp(transform.position.x,-8.5f,8.5f),transform.position.y,transform.position.z);
		transform.position = currentPosition;

	}
	public void restrictShipVelocity(){

		//RESTRICT ROTATION


		//srb.velocity = new Vector2 (Mathf.Clamp (rb.velocity.x, -25f, 25f), 0f); 
	}

	public Transform getTransformOfObject(){
		Transform transform = this.GetComponent<Transform> ();
		return transform;

	}

	public void teleportShip(){

		Vector3 currentPosition = transform.position;
		float currentx = currentPosition.x;
		if (currentx >= -8.49f && currentx <=8.49f) {
			canTeleport = true;
		}
		if (currentx <= -8.5f|| currentx >= 8.5f) {
		
			if (canTeleport) {
				Vector3 newPosition = new Vector3 (currentx*-1f, currentPosition.y, currentPosition.z);
				shipTransform.position = newPosition;
				canTeleport = false;
			}


		}
	
	}

	void OnTriggerEnter(Collider coll){

		if (coll.gameObject.tag == "Cubes") {
			print ("BOK");
			gameManager.GetComponent<GameManager> ().resetGame ();
			gameObject.SetActive (false);
		}
	}

}
