using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ScoreManager : MonoBehaviour
{


    public Text myText;
    public float increaseByValue = 42;
    public float score;
    public ParticleSystem psBig;
    public ParticleSystem psSmall;

    void Start()
    {
       // ps.Emit(1);  
        //InvokeRepeating("AddToScore", 0f, 0.3f);
    }
    void AddToScore()
    {
        myText.text.Remove(0);
        score += 1;
        myText.text = score.ToString();
        psSmall.Emit(1);
    }

    void OnTriggerEnter(Collider coll)
    {
        if (coll.gameObject.tag == "Row")
        {   
            myText.text.Remove(0);
            score += increaseByValue;
            myText.text = score.ToString();
            psBig.Emit(1);
            print("collision"); 
        }

    }
}
