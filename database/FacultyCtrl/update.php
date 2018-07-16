<?php
header('Content-Type: application/json;charset=utf-8');
require("../FacultyDao.php");
$dao = new FacultyDao();
    $obj = json_decode(file_get_contents("php://input"));
    if(isset($obj)){
        if($obj->action == "update"){
            $faculty_id = $obj->faculty_id;
            $faculty_name = $obj->faculty_name;
            $result = $dao->update($faculty_id, $faculty_name);
            echo json_encode($result);
        }
    }  
    
?>