<?php
header('Content-Type: application/json;charset=utf-8');
require("../ProgramDao.php");
$dao = new ProgramDao();
    $obj = json_decode(file_get_contents("php://input"));

    if(isset($obj)){
        if($obj->action == "update"){
            $id                     = $obj->id;
            $program_id             = $obj->program_id;                  //col 1-4
            $program_name           = $obj->program_name;
            $program_year           = $obj->program_year;
            $education_level        = $obj->education_level;
            $program_fullName_th    = $obj->program_fullName_th;         //col 5-8
            $program_fullName_eng   = $obj->program_fullName_eng;
            $degree_fullName_th     = $obj->degree_fullName_th;
            $degree_fullName_eng    = $obj->degree_fullName_eng;
            $degree_acronym_th      = $obj->degree_acronym_th;           //col 9-12
            $degree_acronym_eng     = $obj->degree_acronym_eng;
            $concerned              = $obj->concerned;
            $branch_name            = $obj->branch_name;
            $branch_name_th         = $obj->branch_name_th;              //col 13-16
            $branch_name_eng        = $obj->branch_name_eng;
            $branch_group           = $obj->branch_group;
            $branch_year            = $obj->branch_year;
            $branch_type            = $obj->branch_type;                 //col 17-20
            $program_inter          = $obj->program_inter;
            $semester               = $obj->semester;
            $program_group          = $obj->program_group;
            $credit                 = $obj->credit;                      //col 20-24  
            $eng_test               = $obj->eng_test;                             
            $knowledge_processing   = $obj->knowledge_processing;
            $qualification_exam     = $obj->qualification_exam;
            $graduation             = $obj->graduation;                  //col 24-28  
            $date_program           = $obj->date_program;                             
            $date_first_confirm     = $obj->date_first_confirm;
            $date_ohec              = $obj->date_ohec;
            $date_pcru              = $obj->date_pcru;                   //col 28-32  
            $date_pc                = $obj->date_pc;                             
            $date_update            = $obj->date_update;
            $philosophy             = $obj->philosophy;
            $target                 = $obj->target;                      //col 32-36 
            $expenses               = $obj->expenses;                             
            $property               = $obj->property;
            $faculty_id             = $obj->faculty_id;
            $url                    = $obj->url;
            $result = $dao->update(
                $id
                ,$program_id                    //col 1-4
                ,$program_name          
                ,$program_year          
                ,$education_level      
                ,$program_fullName_th           //col 5-8
                ,$program_fullName_eng   
                ,$degree_fullName_th    
                ,$degree_fullName_eng   
                ,$degree_acronym_th             //col 9-12
                ,$degree_acronym_eng    
                ,$concerned           
                ,$branch_name           
                ,$branch_name_th                //col 13-16
                ,$branch_name_eng     
                ,$branch_group          
                ,$branch_year           
                ,$branch_type                   //col 17-20
                ,$program_inter         
                ,$semester               
                ,$program_group        
                ,$credit                        //col 20-24  
                ,$eng_test                                            
                ,$knowledge_processing  
                ,$qualification_exam   
                ,$graduation                    //col 24-28  
                ,$date_program                                   
                ,$date_first_confirm    
                ,$date_ohec              
                ,$date_pcru                     //col 28-32  
                ,$date_pc                                            
                ,$date_update            
                ,$philosophy             
                ,$target                        //col 32-36 
                ,$expenses                                            
                ,$property               
                ,$faculty_id             
                ,$url
            );
            echo json_encode($result);
        }
    }  
    
?>