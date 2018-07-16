<?php
header('Content-Type: application/json;charset=utf-8');
require("../UsersDao.php");
$dao = new UsersDao();
    $obj = json_decode(file_get_contents("php://input"));

    if(isset($obj)){
        if($obj->action == "create" || $obj->action == "register"){
            $name = $obj->name;
            $surname = $obj->surname;
            $email = $obj->email;
            $education_plan = $obj->education_plan;
            $program = "-";
            $gender = $obj->gender;
            $password = md5($obj->password);
            $level = $obj->level;
            $result = $dao->create($name, $surname, $email, $education_plan, $program, $gender, $password, $level);
            echo json_encode($result);
        }
    }  
    
?>