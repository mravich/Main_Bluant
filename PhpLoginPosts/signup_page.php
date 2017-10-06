<?php
    include 'header.php';
?>

 <!-- ISPIS SESIJE -->   
<?php
    
    //Iscitaj url stranice 
    $url = "http://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    
    //Provjeri dal u url-u ima error-a
    if(strpos($url, 'error=empty') !==false){
        echo "Fill out all fields!";
    }
    else if(strpos($url, 'error=username') !==false){
        echo "Username already exists!";
    }

    if(isset($_SESSION['id'])){
     echo $_SESSION['id'];
    }else{
    echo "You are not logged in!";
    }
?>

<?php
    if(isset($_SESSION['id'])){
     echo "You are already logged in!";
    }else{

    //Forma za sigun up
    echo "<form action ='signup.php' method = 'POST'>
        
        <input type='text' name='first' placeholder='FirstName'>
        <input type='text' name='last' placeholder='LastName'>
        <input type='text' name='uid' placeholder='UserName'>
        <input type='password' name='pwd' placeholder='Password'>
        <button type='submit'>Sign up</button>
        
    </form>";
    }

?>

    

    </body>
</html>