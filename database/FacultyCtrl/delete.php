<?php
    header("Content-Type: application/json; charset=utf-8");
    require("../FacultyDao.php");
    $dao = new FacultyDao();
    
    if($_GET["action"]=="delete"){
        $result = $dao->delete($_GET["faculty_id"]);
        echo $result;
    }
?>