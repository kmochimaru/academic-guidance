<?php
header('Content-Type: application/json;charset=utf-8');
require("../ProgramDao.php");
$dao = new ProgramDao();

    if(isset($_GET["action"]) && isset($_GET["program_id"])){
        if($_GET["action"] == "detail"){
            echo $dao->detail($_GET["program_id"]);
        }
    }  
    
?>