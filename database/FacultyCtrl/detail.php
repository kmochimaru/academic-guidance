<?php
header('Content-Type: application/json;charset=utf-8');
require("../FacultyDao.php");
$dao = new FacultyDao();
    $obj = json_decode(file_get_contents("php://input"));
    
    if(isset($obj)){
        if($obj->action == "detail"){
            echo $dao->detail($obj->faculty_id);
        }
    }  
    
?>