<?php

require __DIR__ ."/db_connection.php";

class FacultyDao{
    protected $db;

    function __construct(){
        $this->db = DB();
    }

    function __destruct(){
        $this->db = null;
    }

    public function create($faculty_id, $faculty_name){
        $result = 0;
        try{
            $query = $this->db->prepare("INSERT INTO faculty(faculty_id, faculty_name) VALUES (:faculty_id, :faculty_name)");
            $query->bindParam("faculty_id", $faculty_id, PDO::PARAM_STR);
            $query->bindParam("faculty_name", $faculty_name, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception create :  ".$e->getMessage();
        }
        return $result;
    }

    public function read(){
        $query = $this->db->prepare("SELECT * FROM faculty");
        $query->execute();
        $data = array();
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        return $data;
    }

    public function update($faculty_id, $faculty_name){
        $result = 0;
        try{
            $query = $this->db->prepare("UPDATE faculty SET faculty_name = :faculty_name WHERE faculty_id = :faculty_id");
            $query->bindParam("faculty_id", $faculty_id, PDO::PARAM_STR);
            $query->bindParam("faculty_name", $faculty_name, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception update :  ".$e->getMessage();
        }
        return $result;
    }

    public function delete($faculty_id){
        $result = 0;
        try{
            $query = $this->db->prepare("DELETE FROM faculty WHERE faculty_id = :faculty_id");
            $query->bindParam("faculty_id", $faculty_id, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception delete :  ".$e->getMessage();
        }
        return $result;
    }

    public function detail($faculty_id){
        $query = $this->db->prepare("SELECT * FROM faculty WHERE faculty_id = :faculty_id");
        $query->bindParam("faculty_id", $faculty_id, PDO::PARAM_STR);
        $query->execute();
        return json_encode($query->fetch(PDO::FETCH_ASSOC));
    }
}

?>