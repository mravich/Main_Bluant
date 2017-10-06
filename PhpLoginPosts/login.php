<?php
session_start();

//Ukljuci database handlera da se moze spajat na bazu
include 'databaseHandler.php';

//Varijable koje saljemo formom
$uid = $_POST['uid'];
$pwd = $_POST['pwd'];

//Nadji usera u bazi koji odgovara uid-u
$sql = "SELECT * FROM users WHERE uid='$uid'";
$result = mysqli_query($conn,$sql);

//Uzmi password iz baze od usera pod tim uid-om
$row = mysqli_fetch_assoc($result);
$encrypted_pwd = $row['pwd'];

//Koristi $pwd kao kljuc ada desifrira $encrypted_pwd rezultat je true ili false
$decrypt = password_verify($pwd,$encrypted_pwd);

if($decrypt == 0){
	header("Location: index.php?error=empty");
	//Zaustavi donji dio skripte da se izvede
	exit();

} else {

	//SQL string za slat u bazu
	$sql = "SELECT * FROM users WHERE uid='$uid' AND pwd ='$encrypted_pwd'";

	//SQL odgovor baze
	$result = mysqli_query($conn,$sql);


	//Check ako si dobro ulogiran
	//Ako je baza vratila usera sa gornjim usernameom i sifrom ulogiraj ako ne javi gresku 
	if(!$row = mysqli_fetch_assoc($result)){
		echo "Your username or password is incorrect!";
	} else {
		$_SESSION['id'] = $row['id'];
	}

	//Povratak na stranicu index.php
	header("Location: index.php");
}


