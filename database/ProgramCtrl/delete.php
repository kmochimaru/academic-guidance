<?php
    header("Content-Type: application/json; charset=utf-8");
    require("../ProgramDao.php");
    $dao = new ProgramDao();
    
    if($_GET["action"]=="delete"){
        $result = $dao->delete($_GET["program_id"]);
        echo $result;
    }
?>