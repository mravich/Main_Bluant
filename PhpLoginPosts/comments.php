<?php
include 'databaseHandler.php';

//Izrada funkcije za stavljanje necega u bazu
function setComments($conn){



	//Provjera dal je button stisnut za unos u bazu
	if(isset($_POST['commentSubmit'])){

		//Definiranje varijabli koje unosimo u bazu
		$uid = $_POST['uid'];
		$date = $_POST['date'];
		$message = $_POST['message'];

		//Definiranje izraza za unos u bazu
		$sql = "INSERT INTO info(uid,date,info) 
				VALUES ('$uid','$date','$message')";
		$result = mysqli_query($conn,$sql);
	}
	

}

//Izrada funkcije za izvlacenje necega iz baze
function getComments($conn){

	//Uzmianje podataka iz tablice info
	$sql = "SELECT * FROM info";

	//Spremanje reda iz tablice u result
	$result = mysqli_query($conn,$sql);

	//Izvlacenje unesenih stvari po userima
	while($row = mysqli_fetch_assoc($result)){
		echo"<div class='info-box'>";
		echo $row['uid']."<br>";
		echo $row['date']."<br>";
		//Ako ima vise redova u unosu odvoji ih
		echo nl2br($row['info']);

		//Dodavanje buttona za edit unosa u bazu pomocu editComments
		echo "
			<form class='delete-form'method='POST' action='".deleteComments($conn)."'>
				<input type ='hidden' name='iid' value = '".$row['iid']."'>
				<button name='commentDelete' type='submit'>Delete</button>
			</form>

			<form class='edit-form'method='POST' action='editComments.php'>
				<input type ='hidden' name='iid' value = '".$row['iid']."'>
				<input type ='hidden' name='uid' value = '".$row['uid']."'>
				<input type ='hidden' name='date' value = '".$row['date']."'>
				<input type ='hidden' name='info' value = '".$row['info']."'>
				<button>Edit</button>
			</form>

		</div>";
	}
}


	//Izrada funkcije za editiranje necega u bazi
	function editComments($conn){

	//Provjera dal je button stisnut za unos u bazu
	if(isset($_POST['commentSubmit'])){

		//Definiranje varijabli koje unosimo u bazu
		$iid = $_POST['iid'];
		$uid = $_POST['uid'];
		$date = $_POST['date'];
		$message = $_POST['message'];

		//Definiranje izraza za unos u bazu
		$sql = "UPDATE info SET info='$message' WHERE iid='$iid'";
		$result = mysqli_query($conn,$sql);
		header("Location: index.php");
	}
	

}

	function deleteComments($conn){

	//Provjera dal je button stisnut za unos u bazu
	if(isset($_POST['commentDelete'])){

		//Definiranje varijabli koje unosimo u bazu
		$iid = $_POST['iid'];

		//Definiranje izraza za unos u bazu
		$sql = "DELETE FROM info WHERE iid='$iid'";
		$result = mysqli_query($conn,$sql);
		header("Location: index.php");
	}
	}