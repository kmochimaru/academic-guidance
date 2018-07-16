<?php
    header("Content-Type: application/json; charset=utf-8");
    require("../UsersDao.php");
    $dao = new UsersDao();
    
    if($_GET["action"]=="delete"){
        $result = $dao->delete($_GET["email"], $_GET["test"]);
        echo $result;
    }
?>