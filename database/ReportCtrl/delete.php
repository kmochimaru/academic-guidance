<?php
    header("Content-Type: application/json; charset=utf-8");
    require("../ReportDao.php");
    $dao = new ReportDao();
    
    if($_GET["action"]=="delete"){
        $result = $dao->delete($_GET["email"], $_GET["title"]);
        echo $result;
    }
?>