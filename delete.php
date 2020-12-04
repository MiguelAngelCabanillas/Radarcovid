<?php
require_once("db.php");
if(isset($_GET['id'])){
$id=$_GET['id'];	
$sql="DELETE FROM record where id= :id";	
try{
$st=$conn->prepare($sql);
$st->bindValue(":id", $id);
$st->execute();
header("Location:display.php");
}
catch(PDOException $e){
	echo "An Error Occured: ". $e->getMessage();
}
}
else{
	echo "<h1>Wrong Request</h1>";
}

$conn=null;
?>