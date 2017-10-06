<?php
session_start();

//Zatvori sesiju
session_destroy();

//Povratak na stranicu index.php
header("Location: index.php");