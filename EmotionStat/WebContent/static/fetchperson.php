<?php
	require('db_connect.php');
	
	function db_fetch($id, $length){
		
		$id_offset = 50;
		$id = $id +$id_offset;
		
		$id_in_query = "";
		for($i=$id; $i<$length+$id; $i++)
			$id_in_query = $id_in_query.$i.(($i<$length+$id-1) ? "," : "");
		
		$ppl = dbconnect()->query("SELECT * FROM nodes WHERE id IN ($id_in_query);") or die(mysql_error());
			
		$result = array();
		
		if($ppl->num_rows>0)
			while($row = $ppl->fetch_assoc()){
				$cols = array(
					"id" => $row["id"],
					"username" => $row["username"],
					"profile" => utf8_encode($row["profile"]),
					"feed" => utf8_encode($row["feed"]),
					"friendlist" => $row["friendlist"]
				);	
				
				array_push($result, $cols);
			}
		
		echo json_encode($result);
	}
	
	if(isset($_POST['id']) && isset($_POST['length']))
		db_fetch(intval($_POST['id']), intval($_POST['length']));
?>