using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RowSpawnerFinal : MonoBehaviour {


	// GAMEOBJECT ROW KOJEG UBACUJEMO U EDITORU 
	public GameObject row;

	// LISTA U KOJOJ SU SPREMLJENI SVI ROWS-i KOJE ĆEMO KORISTITI
	public List<GameObject> rows;

	public List<GameObject> activeRows;

	public List<GameObject> inactiveRows;

	public GameObject bottomRow,middleRow,topRow;

	public List<GameObject> bottomChilds,middleChilds,topChilds;
	public Vector3 startPosition;

	public int bottomHole,middleHole,topHole;
	// LISTA AKTIVNIH ROWS-a 
	private int active,inactive=0;

	void Start () {

		startPosition = transform.position;
		// NAPUNIMO LISTU rows SA 6 GAMEOBJECTA KOJI SU INAKTIVNI ZATIM ĆEMO NJIH SPAWNAT OVISNO O AKTIVNOSTI(STAVIT OVO U FILLLIST())
		for (int i = 0; i < 6; i++) {
			GameObject listRow = Instantiate (row, transform.position, Quaternion.identity) as GameObject;
			listRow.transform.SetParent (transform);
			listRow.SetActive (false);
			listRow.name = i.ToString();
			rows.Add (listRow);
		}



		updateLists ();
		InvokeRepeating ("SpawnRow", 0.5f, 0.75f);
	}



	void SpawnRow(){
		
	
		updateLists ();

		if (activeRows.Count == 0) {
			
			//print ("Nema trenutno aktivnih zidova spawnaj bottom one");
			//print ("Ovo je prvi red na sceni stoga na njemu na random napravi rupu");
			inactiveRows [0].gameObject.name = "bottom";
			int random = Random.Range (0, 4);

			//inactiveRows[0].transform.GetChild(random).gameObject.SetActive(false);

			updateLists ();
			inactiveRows [0].SetActive (true);
			updateLists ();
		} else if (activeRows.Count == 1) {
			
			//print ("Aktivan je jedan zid koji je bottom spawnaj middle one");
			inactiveRows [0].gameObject.name = "middle";
			updateLists ();
			inactiveRows [0].SetActive (true);
			updateLists ();
		} else if (activeRows.Count == 2) {
		
			//print ("Aktivni su bottom i middle red spawnaj top");
			//print ("Ovo je top red na sceni stoga ucitaj u njega middle row i pogledaj di on ima rupu");
			inactiveRows [0].gameObject.name = "top";
			updateLists ();
			inactiveRows [0].SetActive (true);
			updateLists ();
		}



		/*else if(activeRows.Count == 1){

			//print ("Aktivan je jedan zid koji je bottom spawnaj middle one");

			inactiveRows [0].gameObject.name = "middle";


			for (int i = 0; i < activeRows.Count; i++) {
			
				if (activeRows [i].gameObject.name == "bottom") {
				
					foreach (Transform obj in activeRows[i].transform) {

						if (obj.gameObject.activeSelf == false) {
						
							bottomHole = obj.transform.GetSiblingIndex ();
						}
					}
				}

			}

			inactiveRows [0].transform.GetChild (bottomHole).gameObject.SetActive (true);

			foreach (Transform obj in inactiveRows[0].transform) {
			
				obj.gameObject.SetActive (true);
			}



			for (int i = 0; i < inactiveRows [0].transform.childCount; i++) {
			
				if (i != bottomHole) {

				

					bottomChilds.Add (inactiveRows [0].transform.GetChild (i).gameObject);

				}
			}

			int random = Random.Range (0, 3);

			for (int i = 0; i < bottomChilds.Count; i++) {
			
				if (i == random) {
				
					bottomChilds [i].SetActive (false);
				}
			}
			updateLists ();
			inactiveRows [0].SetActive (true);
			updateLists ();
		}

		else if(activeRows.Count == 2){

			//print ("Aktivni su bottom i middle red spawnaj top");
			print ("Ovo je top red na sceni stoga ucitaj u njega middle row i pogledaj di on ima rupu");
			inactiveRows [0].gameObject.name = "top";

			for (int i = 0; i < activeRows.Count; i++) {

				if (activeRows [i].gameObject.name == "middle") {

					foreach (Transform obj in activeRows[i].transform) {

						if (obj.gameObject.activeSelf == false) {

							middleHole = obj.transform.GetSiblingIndex ();
						}
					}
				}

			}

			inactiveRows [0].transform.GetChild (middleHole).gameObject.SetActive (true);

			foreach (Transform obj in inactiveRows[0].transform) {

				obj.gameObject.SetActive (true);
			}

			for (int i = 0; i < inactiveRows [0].transform.childCount; i++) {

				if (i != middleHole) {
					
					middleChilds.Add (inactiveRows [0].transform.GetChild (i).gameObject);

				}
			}

			int random = Random.Range (0, 3);

			for (int i = 0; i < middleChilds.Count; i++) {

				if (i == random) {

					middleChilds [i].SetActive (false);
				}
			}

			updateLists ();
			inactiveRows [0].SetActive (true);
			updateLists ();
		}
			//print ("Odlucili smo spawnati : " + random + " a to je red: " + rows [random] + " koji je trenutno " + rows [random].activeSelf + ".\n Trenutni broj aktivnih redova iznosi : " + active);
			
		foreach (Transform obj in transform) {

			if (obj.transform.name == "bottom") {

				bottomRow = obj.gameObject;

			}
			else if(obj.transform.name == "middle"){
				middleRow = obj.gameObject;


			}
			else if(obj.transform.name == "top"){
				topRow = obj.gameObject;

			}
		}*/

 	
	}
	
	// Update is called once per frame
	void Update () {



	
	}





	// UPDATE CURRENT LISTS
	public void updateLists(){

		// CLEAR BOTH LISTS
		inactiveRows.Clear ();
		activeRows.Clear ();


		// CHECK EVERY TRANSFORM IN transform
		foreach(Transform obj in transform){

			// IF IT IS ACTIVE PUT IT IN activeList
			if (obj.gameObject.activeSelf) {

				activeRows.Add (obj.gameObject);
			} 
			// IF IT IS INACTIVE PUT IT IN inactiveList
			else {

				inactiveRows.Add (obj.gameObject);
			}

		}

	}



	public void renameRows(){
		
		int savedMiddleHole = middleHole;
		foreach (GameObject obj in activeRows) {
			
			if (obj.name == "middle") {
				
				obj.name = "bottom";

				bottomHole = middleHole;
				bottomRow = obj;

			} else if (obj.name == "top") {
				
				obj.name = "middle";
				middleHole = savedMiddleHole;
				middleRow = obj;
			} else if (obj.name == "bottom") {
			
				obj.name = "bang";

				topRow = obj;
			}
		}

	}


}
