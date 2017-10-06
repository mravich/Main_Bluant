<?php
    session_start();
?>

<html>


    <head>

    <!--Import stylesheeta -->
    <link rel="stylesheet" type="text/css" href="style.css">
        
    <title>analizator</title>
    
    </head>
    <body>

    <header>
    	<nav>
    		<ul>
	    		<li><a href ="index.php">HOME</a></li>

	    		<!--Php kod za provjeru dal je ulogiran korisnik ako je daj mu log out button ako ne daj mu mogucnost da se ulogira-->
	    		<?php
	    			//Provjera id-a sesije
	    			if(isset($_SESSION['id'])){

	    				//Printanje forme za logout button
					     echo "<form action='logout.php'>
					        		<button>LOG OUT</button>
					    		</form>";

				    }else{
				    	//Printanje forme za login
				    echo "<form action ='login.php' method = 'POST'>
				        <input type='text' name='uid' placeholder='UserName'>
				        <input type='password' name='pwd' placeholder='Password'>
				        <button type='submit'>LOGIN</button>
				    </form>";
				    }
	
	    		?>

	    		</li><a href ="signup_page.php">SIGN UP</a></li>
    		</ul>
    	</nav>

    </header>



    