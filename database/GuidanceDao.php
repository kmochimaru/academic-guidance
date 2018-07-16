<?php

require __DIR__ ."/db_connection.php";

class GuidanceDao{
    protected $db;

    function __construct(){
        $this->db = DB();
    }

    function __destruct(){  
        $this->db = null;
    }

    public function create($title, $general,  $education, $vocational, $personal_social, $type){
        $result = 0;
        try{
            $query = $this->db->prepare("INSERT INTO guidance(title, general, education, vocational ,personal_social, type) VALUES (:title, :general, :education, :vocational, :personal_social, :type)");
            $query->bindParam("title", $title, PDO::PARAM_STR);
            $query->bindParam("general", $general, PDO::PARAM_STR);
            $query->bindParam("education", $education, PDO::PARAM_STR);
            $query->bindParam("vocational", $vocational, PDO::PARAM_STR);
            $query->bindParam("personal_social", $personal_social, PDO::PARAM_STR);
            $query->bindParam("type", $type, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception create :  ".$e->getMessage();
        }
        return $result;
    }

    public function read($type){
        $query = $this->db->prepare("SELECT * FROM guidance WHERE type = :type");
        $query->bindParam("type", $type, PDO::PARAM_STR);
        $query->execute();
        $data = array();
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        return $data;
    }

    public function result($type, $title){
        $query = $this->db->prepare("SELECT * FROM guidance WHERE type = :type AND title LIKE CONCAT('%', :title, '%')");
        $query->bindParam("type", $type, PDO::PARAM_STR);
        $query->bindParam("title", $title, PDO::PARAM_STR);
        $query->execute();
        $data = array();
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        return $data;
    }

    public function update($guidance_id, $title, $general,  $education, $vocational, $personal_social, $type){
        $result = 0;
        try{
            $query = $this->db->prepare("UPDATE guidance SET title = :title, general = :general, education = :education, vocational = :vocational, personal_social = :personal_social, type = :type WHERE guidance_id = :guidance_id");
            $query->bindParam("guidance_id", $guidance_id, PDO::PARAM_INT);
            $query->bindParam("title", $title, PDO::PARAM_STR);
            $query->bindParam("general", $general, PDO::PARAM_STR);
            $query->bindParam("education", $education, PDO::PARAM_STR);
            $query->bindParam("vocational", $vocational, PDO::PARAM_STR);
            $query->bindParam("personal_social", $personal_social, PDO::PARAM_STR);
            $query->bindParam("type", $type, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception update :  ".$e->getMessage();
        }
        return $result;
    }

    public function delete($guidance_id){
        $result = 0;
        try{
            $query = $this->db->prepare("DELETE FROM guidance WHERE guidance_id = :guidance_id");
            $query->bindParam("guidance_id", $guidance_id, PDO::PARAM_INT);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception delete :  ".$e->getMessage();
        }
        return $result;
    }

    public function detail($guidance_id){
        $query = $this->db->prepare("SELECT * FROM guidance WHERE guidance_id = :guidance_id");
        $query->bindParam("guidance_id", $guidance_id, PDO::PARAM_INT);
        $query->execute();
        return json_encode($query->fetch(PDO::FETCH_ASSOC));
    }
}

?>