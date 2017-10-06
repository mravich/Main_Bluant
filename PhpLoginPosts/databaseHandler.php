<?php 


//Stvaranje konekcije sa bazom (host,user,pass,baza)
$conn = mysqli_connect("localhost","root","","users");

//Error handling no connection
if(!$conn){

	//Pripazit na ovu liniju moze doci do injectiona
	die("Connection failed: ".mysqli_connect_error());
}