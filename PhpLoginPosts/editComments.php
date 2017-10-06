<?php
    include 'header.php';
    include 'comments.php';
    date_default_timezone_set('Europe/Copenhagen');
?>
     


<!-- Umjesto ovoga stavit formu za unos url-a kojeg ocemo pretraziti-->
<?php

$iid = $_POST['iid'];
$uid = $_POST['uid'];
$date = $_POST['date'];
$info = $_POST['info'];


    echo"<form method='POST' action='".editComments($conn)."'>
    <input type = 'hidden' name ='iid' value = '".$iid."'>
    <input type = 'hidden' name ='uid' value = '".$uid."'>
    <input type = 'hidden' name ='date' value = '".$date."'>
    <textarea name='message'>".$info."</textarea><br>
    <button class='comment_button' type ='submit' name ='commentSubmit'>Edit</button>

    </form>";

?>
    
    
    </body>
</html>