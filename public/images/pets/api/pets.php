<?php
include "headers.php";
include "connection.php";


class SavePets
{
    function addGender($json)
    {
        include "connection.php";
        $json = json_decode($json, true);
        $sql = "INSERT INTO tblgender(gender_name) VALUES(:gender_name)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":gender_name", $json["gender_name"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function addDestination($json)
    {
        include "connection.php";
        $json = json_decode($json, true);
        $sql = "INSERT INTO tbldestination(dest_name) VALUES(:dest_name)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":dest_name", $json["dest_name"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function addPassengers($json)
    {
        include "connection.php";
        $json = json_decode($json, true); // Corrected this line
        $sql = "INSERT INTO tblpassengers(pas_name, pas_destinationId, pas_genderId, pas_price) VALUES(:pas_name, :pas_destinationId, :pas_genderId, :pas_price)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":pas_name", $json["pas_name"]);
        $stmt->bindParam(":pas_destinationId", $json["pas_destinationId"]);
        $stmt->bindParam(":pas_genderId", $json["pas_genderId"]);
        $stmt->bindParam(":pas_price", $json["pas_price"]);
        $stmt->execute();
        return $stmt->rowCount() > 0 ? 1 : 0;
    }

    function getGenderDetails()
    {
        include "connection.php";
        $sql = "SELECT * FROM tblgender";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($stmt->rowCount() > 0) {
            echo json_encode($result);
        } else {
            echo json_encode([]); 
        }
    }

    function getDestinationDetails()
    {
        include "connection.php";
        $sql = "SELECT * FROM tbldestination";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $stmt->rowCount() > 0 ? json_encode($result) : json_encode([]);
    }

    function getPassengersDetails() {
        include "connection.php";
        $sql = "SELECT a.pas_name, a.pas_price, b.gender_name, c.dest_name FROM tblpassengers a
        INNER JOIN tblgender b ON b.gender_id = a.pas_genderId
        INNER JOIN tbldestination c ON c.dest_id = a.pas_destinationId";
    
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        // Output as JSON
        echo json_encode($result);
    }
    
}

$json = isset($_POST["json"]) ? $_POST["json"] : "0";
$operation = isset($_POST["operation"]) ? $_POST["operation"] : "0";
$savePets = new SavePets();

switch ($operation) {
    case "addGender":
        echo $savePets->addGender($json);
        break;
    
    case "addDestination":
        echo $savePets->addDestination($json);
        break;
    
    case "addPassengers":
        echo $savePets->addPassengers($json);
        break;
    
    case "getGenderDetails":
        echo $savePets->getGenderDetails();
        break;
    
    case "getDestinationDetails":
        echo $savePets->getDestinationDetails();
        break;
    
    case "getPassengersDetails":
        echo $savePets->getPassengersDetails();
        break;
    
    default:
        break;
}
