<?php
header('Content-Type: application/json;charset=utf-8');
require("../UsersDao.php");
$dao = new UsersDao();
    $obj = json_decode(file_get_contents("php://input"));
    
    if(isset($obj)){
        if($obj->action == "detail"){
            echo $dao->detail($obj->email);
        }
    }  
    
?>