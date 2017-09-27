using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RowFinal : MonoBehaviour {


	RowSpawnerFinal rowSpawner;
	public float speed = 10f;
	private List<GameObject> activeRows;
	public int bottomHole;
	// Use this for initialization
	public List <Transform> middleChilds,topChilds;


	void Start () {
		

		/*for (int i = 0; i < activeRows.Count; i++) {
		
			if (activeRows [i].GetInstanceID() == gameObject.GetInstanceID()) {
			
				if (activeRows.Count == 1) {
					print ("Trenutno je aktivnih : " + activeRows.Count + " stoga ovaj red mora biti bottom : " + activeRows [i].name); 
					gameObject.name = "bottom";
				}
				else if(activeRows.Count == 2){
					print ("Trenutno je aktivnih : " + activeRows.Count + " stoga ovaj red mora biti middle : " + activeRows [i].name); 
					gameObject.name = "middle";
				}
				else if(activeRows.Count == 3){
					print ("Trenutno je aktivnih : " + activeRows.Count + " stoga ovaj red mora biti top : " + activeRows [i].name);
					gameObject.name = "top";
				}

			}
		}*/

	}
	void OnDisable(){
		rowSpawner = GetComponentInParent<RowSpawnerFinal> ();
	rowSpawner.renameRows ();
		if (gameObject.name == "bottom") {
		
			rowSpawner.bottomHole = rowSpawner.middleHole;
			rowSpawner.bottomChilds = rowSpawner.middleChilds;
			rowSpawner.bottomRow = rowSpawner.middleRow;
		}


		rowSpawner.updateLists ();
		transform.position = rowSpawner.startPosition;


	}

	void OnEnable(){
		
		rowSpawner = GetComponentInParent<RowSpawnerFinal> ();
		if (gameObject.name == "bottom") {
			
			foreach (Transform obj in transform) {
			
				obj.gameObject.SetActive (true);
			}
		
	
			int random = Random.Range (0, 4);
			transform.GetChild (random).gameObject.SetActive (false);

	
		} else if (gameObject.name == "middle") {
			middleChilds.Clear ();

			int random = Random.Range(0,3);
			foreach (Transform obj in transform) {
			
				if (obj.GetSiblingIndex () == rowSpawner.bottomHole) {
				
					obj.gameObject.SetActive (true);
				} else {
				

					middleChilds.Add (obj);


				}
			}

			for (int i = 0; i < middleChilds.Count; i++) {
			
					if (i == random) {
				
					middleChilds [i].gameObject.SetActive (false);
					rowSpawner.middleHole = middleChilds [i].GetSiblingIndex ();
				} else {
				
					middleChilds [i].gameObject.SetActive (true);

				}
			}
	




		}

		else if(gameObject.name =="top"){

			int random = Random.Range (0, 3);
			print ("AKTRIVIRAN TOP! UCITAJ MIDDLEHOLE :  " + rowSpawner.middleHole);
			topChilds.Clear ();

			foreach (Transform obj in transform) {

				if (obj.GetSiblingIndex () == rowSpawner.middleHole) {

					obj.gameObject.SetActive (true);
				} else {


					topChilds.Add (obj);


				}
			}

			for (int i = 0; i < topChilds.Count; i++) {

				if (i == random) {

					topChilds [i].gameObject.SetActive (false);
					rowSpawner.topHole = topChilds [i].GetSiblingIndex ();
				} else {

					topChilds [i].gameObject.SetActive (true);

				}
			}
		}

	}

	void Update(){
		
		if (gameObject.name == "bottom") {
			rowSpawner.bottomChilds.Clear ();
			rowSpawner.bottomRow = gameObject;
			foreach (Transform obj in transform) {
				if (obj.gameObject.activeSelf) {
					rowSpawner.bottomChilds.Add (obj.gameObject);
				} else {
				
					rowSpawner.bottomHole = obj.GetSiblingIndex ();
				}


			}
		} else if (gameObject.name == "middle") {
			rowSpawner.middleChilds.Clear ();
			rowSpawner.middleRow = gameObject;
			foreach (Transform obj in transform) {
				if (obj.gameObject.activeSelf) {
					rowSpawner.middleChilds.Add (obj.gameObject);
				} else {
				
					rowSpawner.middleHole = obj.GetSiblingIndex ();
				}
			}

		}

		else if (gameObject.name == "top") {
			rowSpawner.topChilds.Clear ();
			rowSpawner.topRow = gameObject;
			foreach (Transform obj in transform) {
				if (obj.gameObject.activeSelf) {
					rowSpawner.topChilds.Add (obj.gameObject);
				} else {
				
					rowSpawner.topHole = obj.GetSiblingIndex ();
				}
			}

		}
	

	}
	// Update is called once per frame
	void LateUpdate () {
		moveRow ();

	}


	void moveRow(){

		transform.Translate (Vector3.down* Time.deltaTime * speed);
	}

	void OnTriggerEnter(Collider coll){
	
		if (coll.gameObject.tag == "Player") {
			print ("BOK");
			Destroy (coll.gameObject);
		}
	}




}
