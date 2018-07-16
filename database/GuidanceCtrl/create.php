<?php
header('Content-Type: application/json;charset=utf-8');
require("../GuidanceDao.php");
$dao = new GuidanceDao();
    $obj = json_decode(file_get_contents("php://input"));
    if(isset($obj)){
        if($obj->action == "create"){
            $title = $obj->title;
            $general = $obj->general;
            $education = $obj->education;
            $vocational = $obj->vocational;
            $personal_social = $obj->personal_social;
            $type = $obj->type;
            $result = $dao->create($title, $general,  $education, $vocational, $personal_social, $type);
            echo json_encode($result);
        }
    }  
    
?>