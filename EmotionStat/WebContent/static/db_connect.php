<?php

function dbconnect(){
	$conn = new mysqli("localhost", "root", "", "emotionstat");
	if($conn->connect_error)
		die("Database connection failed! ".$conn->connect_error);
	else{ $conn->set_charset("utf8"); return $conn; }
}

?>