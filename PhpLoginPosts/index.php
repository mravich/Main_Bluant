<?php
    include 'header.php';
    include 'comments.php';
    date_default_timezone_set('Europe/Copenhagen');
?>
     


<!-- Umjesto ovoga stavit formu za unos url-a kojeg ocemo pretraziti-->
<?php
    echo"<form method='POST' action='".setComments($conn)."'>
    <input type = 'hidden' name ='uid' value = 'anonymous'>
    <input type = 'hidden' name ='date' value = '".date('Y-m-d H:i:s')."'>
    <textarea name='message'></textarea><br>
    <button class='comment_button' type ='submit' name ='commentSubmit'>Enter url</button>

    </form>";
    getComments($conn);
?>
    
    
    </body>
</html>