<?php
header('Content-Type: application/json;charset=utf-8');
require("../ProgramDao.php");
$dao = new ProgramDao();

    if(isset($_GET["action"])){
        if($_GET["action"] == "read"){
            $program = $dao->read();
            echo json_encode($program);
        }
    }
    
?>