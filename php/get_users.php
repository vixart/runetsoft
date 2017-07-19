<?php
	include_once("db.php");
	$query_users = $connect->query("SELECT * FROM users");
	
	$users = array();
	
	while($row_users = $query_users->fetch_array())
	{
		$user = array();
		
		$query_qualifications = $connect->query("SELECT * FROM qualifications WHERE id='$row_users[qualification_id]'");
		$row_qualifications = $query_qualifications->fetch_array();
		
		$sql_fetch = "SELECT name FROM cities WHERE id IN (SELECT city_id FROM users_city WHERE user_id='$row_users[id]')";
		$query_cities = $connect->query("SELECT name FROM cities WHERE id IN (SELECT city_id FROM users_city WHERE user_id='$row_users[id]')");
		
		$cities = array();
		
		while($row_cities = $query_cities->fetch_array())
			array_push($cities, $row_cities['name']);
		
		$user['name'] = $row_users['name'];
		$user['qualification'] = $row_qualifications['name'];
		$user['cities'] = $cities;
		
		array_push($users, $user);
	}
	
	echo json_encode($users); //JSON_UNESCAPED_UNICODE(256) с PHP 5.4 - у меня версия ниже
?>