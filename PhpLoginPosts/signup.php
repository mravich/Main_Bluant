<?php
session_start();

//Ukljuci database handlera da se moze spajat na bazu
include 'databaseHandler.php';


//Varijable koje saljemo formom
$first = $_POST['first'];
$last = $_POST['last'];
$uid = $_POST['uid'];
$pwd = $_POST['pwd'];


//Ako je $first prazno napravi nesto
if(empty($first)){
	header("Location: signup_page.php?error=empty");
	//Zaustavi donji dio skripte da se izvede
	exit();
}
//Ako je $last prazno napravi nesto
if(empty($last)){
	header("Location: signup_page.php?error=empty");
	//Zaustavi donji dio skripte da se izvede
	exit();
}
//Ako je $uid prazno napravi nesto
if(empty($uid)){
	header("Location: signup_page.php?error=empty");
	//Zaustavi donji dio skripte da se izvede
	exit();
}
//Ako je $pwd  prazno napravi nesto
if(empty($pwd)){
	header("Location: signup_page.php?error=empty");
	//Zaustavi donji dio skripte da se izvede
	exit();
}
else{

	//Napravi upit za bazu koji provjerava dal ima usera sa tim username-om
	$sql = "SELECT uid FROM users WHERE uid ='$uid'";
	//Spremi odgovor iz baze
	$result = mysqli_query($conn,$sql);
	//Varijabla koja samo broji dal je uspieo zahtjev za pronalaskom usernamea 0 ili 1 ili više*
	$uidcheck = mysqli_num_rows($result);

	//Ako vec postoji takav username u bazi 
	if($uidcheck>0){
		//Vrati na signup i javi gresku tipa username
		header("Location: signup_page.php?error=username");
		//Zaustavi donji dio skripte da se izvede
		exit();
	} 

	else {
		
		//HASHIRANJE PASSWORDA
		$pwdencrypt = password_hash($pwd, PASSWORD_DEFAULT);
		//SQL string za slat u bazu
		$sql = "INSERT INTO users(first, last, uid, pwd) 
				VALUES ('$first', '$last', '$uid', '$pwdencrypt')";

		//SQL odgovor baze
		$result = mysqli_query($conn,$sql);

		//Povratak na stranicu index.php
		header("Location: index.php");
	}
	
}



