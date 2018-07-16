<?php
header('Content-Type: application/json;charset=utf-8');
require("../ReportDao.php");
$dao = new ReportDao();
    $obj = json_decode(file_get_contents("php://input"));
    if(isset($obj)){
        if($obj->action == "update"){
            $id = $obj->id;
            $title = $obj->title;
            $result = $obj->result;
            $email = $obj->email;
            $result = $dao->update($id, $title, $result, $email);
            echo json_encode($result);
        }
    }  
    
?>