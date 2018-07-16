<?php
header('Content-Type: application/json;charset=utf-8');
require("../FacultyDao.php");
$dao = new FacultyDao();

    if(isset($_GET["action"])){
        $action_get = $_GET["action"];
        if($action_get == "read"){
            $faculty = $dao->read();
            echo json_encode($faculty);
        }
    }
    
?>