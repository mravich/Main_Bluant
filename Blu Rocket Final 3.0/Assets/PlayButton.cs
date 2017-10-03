using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayButton : MonoBehaviour {

	public AnimationClip explode;

	void Start()
	{

		Animator anim = GetComponent<Animator> ();
	
	}
	void OnMouseOver(){

	
	}

	void OnMouseExit(){
	
		foreach (Transform obj in transform) {

			foreach (Transform obj2 in obj) {
				


			}
		}
	}

	void OnMouseDown(){
		

		print ("Pokreni igru");
	


	}

}
