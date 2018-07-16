<?php

header('Content-Type: application/json;charset=utf-8');
require("../UsersDao.php");
$dao = new UsersDao();
    
    if(isset($_GET["action"])){
        $action_get = $_GET["action"];
        if($action_get == "readEducation"){
            $data = [];
            $education_plan = $dao->readEducation();    //Distinct education 
            foreach($education_plan as $item){
                $name = $item['education_plan'];
                $count = $dao->countEducation($name);
                $arr = array(
                            "education_plan" => $name,
                            "count" => $count
                );
                array_push($data, $arr);
                
            }
            echo json_encode($data);
        }
    }
?>