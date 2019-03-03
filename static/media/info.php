<?php
//include "../connect-db/connect-db.php";
$connection = new mysqli("localhost","root","","gisportal");
if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
}

$limit = 5;
$stmt = $connection->prepare("select * from data ORDER BY tanggalDitambahkan DESC LIMIT ?");
$stmt->bind_param("i",$limit);
$stmt->execute();
$stmt->bind_result($id,$namaData,$deskripsiData,$tanggalDitambahkan,$link);

while($stmt->fetch()){
	echo "<a  style='color:#40C440; font-size:14px;' href='".$link."'>'".$deskripsiData."'</a><br>";
}
?>	
