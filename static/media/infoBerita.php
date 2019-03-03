<?php
//include "../connect-db/connect-db.php";
$connection = new mysqli("localhost","root","","gisportal");
if ($connection->connect_error) {
		die("Connection failed: " . $connection->connect_error);
}

$limit = 1;
$stmt = $connection->prepare("select * from berita ORDER BY tanggal DESC LIMIT ?");
$stmt->bind_param("i",$limit);
$stmt->execute();
$stmt->bind_result($id,$namaBerita,$tanggal,$deskripsiBerita,$isiBerita,$gambarPath,$linkBerita);

while($stmt->fetch()){
	echo "<p style=margin:5px;font-size:14px;font-weight:bold>" . $namaBerita . "</p>";
	echo "<p style=margin:5px;font-size:14px;font-weight:italic><i>" . $tanggal . "</i></p>";
	echo "<p style=margin:5px;font-size:14px>" . $deskripsiBerita . "</p>";
	echo "<div style='margin:20px'>";
	echo "<p class='readmore'><a href='newspages/berita.php?id=".$id."'>Selengkapnya</a></p>";
	echo "</div>";
}
$stmt->close();
?>	