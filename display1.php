<?php
//this connects to the database
require_once("db.php");
?>
<!DOCTYPE html> 
<html lang=en>
	<head>
	<style>
	html, body{
	width:50%;
	height:50%;
	margin:0%;
	font-family:"helvetica", "verdana", "calibri", "san serif";
	overflow:hidden;
	padding:0%;
	border:0%;
	}
	table{
		border:2px solid black;
		width:100%;
	}
	th,td{
		width:15%;
	text-align:center;
    border:2px solid black;	
	}
	
	</style>
	 		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi"/>
	
	<title> Display Saved Data In GridView </title>

	</head>
	<body>
	<script>
	function removes(id){
		
	var ans = confirm("Are You Sure You Want To Delete This Row");
	if(ans){//if true delete row
		window.location.assign("delete.php?id="+id);
	}
	else{//if false 
		// do nothing
	}
	}
	
	
	</script>
	<?php
	//we create a table
	echo "<table>";
	// create table th 
	echo "<tr > <th> ID </th> <th> firstname </th> <th> lastname </th> <th>   </th> </tr>";
	$sql=" select * from people ";
	$st=$conn->prepare($sql);
	$st->execute();
	$total=$st->rowCount();//get the number of rows returned
	if($total < 1 ){//if no row was returned
		echo "<tr> <td style> No Data: DataBase Empty </td> ";//print out error message
		echo "<td> No Data: DataBase Empty </td> ";//print out error message
		echo " <td> No Data: DataBase Empty </td>";//print out error message
		echo " <td> No Data: DataBase Empty </td>";//print out error message
	    echo "<td> No Data: DataBase Empty  </td>";//print out error message
		
	}
		else{
	while($res = $st->fetchObject()){//loop through the returned rows
		echo "<tr>";
		echo "<td> $res->id </td> <td> $res->firstname </td> <td> $res->lastname </td> <td> <a href=# onclick=removes($res->id)> Delete </a> </td>";
		echo"</tr>";
	}
	}
	?>
	</table>
	<p>
	<a href=insertdata1.php> Insert Another Data </a>
	</p>
	</body>
	</html>