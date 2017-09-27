using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InputController : MonoBehaviour {


	//DEFINIRAMO SHIP GAMEOBJEKT KAKO BI MOGLI KORISTITI NJEGOVU METHODU MOVE.SHIP()
	public GameObject ship;

	// VARIJABLA POTREBNA KAKO BI ODREDILI STRANU U KOJU MICEMO AVION U SLUCAJU OBJE TIPKE STISNUTE
	public float direction=1;

	// BOOLEOVI ZA PROVJERU INPUTA 
	public bool directionLeft,directionRight;

	// BOOL ZA PROVJERU KADA SU STISNUTE OBJE TIPKE
	public bool bothPressed;


	// AWAKE STANJE OBJEKTA
	void Awake(){


	}

	// Use this for initialization

	void Start () {


	}



	// Update is called once per frame
	void Update () {
	
		// SVAKI FREJM PROVJERAVAMO INPUT I SETTAMO VARIJABLE NA TRUE ILI FALSE
		directionLeft = Input.GetKey (KeyCode.LeftArrow);
		directionRight =  Input.GetKey (KeyCode.RightArrow);



		// PROVJERAVAMO AKO JE JEDNA OD VARIJABLI SMJERA TRUE
		if (directionLeft || directionRight) {
			
			// PROVJERAVAMO AKO SU OBJE VARIJABLE SMJERA TRUE
			if (directionLeft && directionRight) {

				// SETTAMO BOTHPRESSED VARIJABLU KOJA NAM JE POTREBNA U SLJEDECOJ PROVJERI
				bothPressed = true;

				// PROVJERAVAMO AKO SU OBJE TIPKE STISNUTE I SMJER KOJI JE TRENUTNO UKLJUCEN JE DESNO
				if (bothPressed && (direction == 1f)) {
					
					// POZIVAMO METODU ZA POMICANJE SHIPA NA SHIP SKRIPTI TE SALJEMO VRIJEDNOSTI BOOLEOVA 
					ship.GetComponent<Ship> ().MoveShip (true,false);

				}

				// PROVJERAVAMO AKO SU OBJE TIPKE STISNUTE I SMJER KOJI JE TRENUTNO UKLJUCEN JE LIJEVO
				else if(bothPressed && (direction ==-1f)){
					
					// POZIVAMO METODU ZA POMICANJE SHIPA NA SHIP SKRIPTI TE SALJEMO VRIJEDNOSTI BOOLEOVA 
					ship.GetComponent<Ship> ().MoveShip (false,true);
				}

			} 

			// PROVJERAVAMO KOJA JE OD SMJEROVA STISNUT
			else if (directionLeft) {
				// AKO JE STISNUTO LIJEVO

				bothPressed = false;
				direction = -1f;

				ship.GetComponent<Ship> ().MoveShip (true,false);

			} else {
				// AKO JE STISNUTO DESNO

				bothPressed = false;
				direction = 1f;

				ship.GetComponent<Ship> ().MoveShip (false,true);
			}
				


		}

		// AKO NEMA INPUTA 
		else {
			// ZAUSTAVI BROD

			ship.GetComponent<Ship> ().StopShip ();
			bothPressed = false;
		}


	


	}

}
