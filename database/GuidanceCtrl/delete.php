<?php
    header("Content-Type: application/json; charset=utf-8");
    require("../GuidanceDao.php");
    $dao = new GuidanceDao();
    
    if($_GET["action"]=="delete"){
        $result = $dao->delete($_GET["guidance_id"]);
        echo $result;
    }
?>