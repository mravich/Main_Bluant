using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour {

	public GameObject playButton;
	// Use this for initialization
	public GameObject playerPlane;

	public GameObject rowSpawner;



	public void startGame(){
	
		print ("Makni play button i digni playera te uključi rowspawnera");
		playerPlane.transform.position = Vector3.Lerp(playerPlane.transform.position,new Vector3(playerPlane.transform.position.x,-5.3f,playerPlane.transform.position.z),3f);
		playerPlane.SetActive (true);
		rowSpawner.GetComponent<RowSpawnerFinal> ().activeRows.Clear ();
		playButton.transform.position = Vector3.Lerp(playButton.transform.position,new Vector3(playButton.transform.position.x,-15.3f,playButton.transform.position.z),3f);
		rowSpawner.SetActive (true);
	}

	public void resetGame(){
		playerPlane.transform.position = Vector3.Lerp(playerPlane.transform.position,new Vector3(playerPlane.transform.position.x,-15.3f,playerPlane.transform.position.z),3f);
		rowSpawner.GetComponent<RowSpawnerFinal> ().activeRows.Clear ();
		for (int i = 0; i < rowSpawner.GetComponent<RowSpawnerFinal> ().activeRows.Count; i++) {
			rowSpawner.GetComponent<RowSpawnerFinal> ().activeRows [i].transform.position = new Vector3 (rowSpawner.GetComponent<RowSpawnerFinal> ().activeRows [i].transform.position.x, rowSpawner.GetComponent<RowSpawnerFinal> ().activeRows [i].transform.position.y +15f, rowSpawner.GetComponent<RowSpawnerFinal> ().activeRows [i].transform.position.z);

		}
		playButton.transform.position = Vector3.Lerp(playButton.transform.position,new Vector3(playButton.transform.position.x, 5.3f,playButton.transform.position.z),3f);
		rowSpawner.SetActive (false);

	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
