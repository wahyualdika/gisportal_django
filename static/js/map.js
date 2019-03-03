
	var map, layeradm, layerp2k=[], layerMonev2017=[], layerpendik=[];
	var a = [];
		a[0] = "http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Tutupan_Lahan_Aceh_1990/MapServer/0"; // layer tutupan lahan 1990
		a[1] = "http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Tutupan_Lahan_Aceh_2000/MapServer/0"; //layer tutupan lahan 2000
		a[2] = "http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Tutupan_Lahan_Aceh_2006/MapServer/0"; // layer tutupan lahan 2006
		a[3] = "http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Tutupan_Lahan_Aceh_2013/MapServer/0"; // layer tutupan lahan 2013
		a[4] = "http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Pola_Ruang_Aceh_2013/MapServer/0"; // layer pola ruang
		a[5] = "http://gisportal.acehprov.go.id:6080/arcgis/rest/services/webgispdga/transportasi_aceh/MapServer/1"; // layer pelabuhan
		a[6] = "http://gisportal.acehprov.go.id:6080/arcgis/rest/services/webgispdga/transportasi_aceh/MapServer/0"; // layer bandara
		a[7] = "http://gisportal.acehprov.go.id:6080/arcgis/rest/services/webgispdga/transportasi_aceh/MapServer/2"; // layer terminal
		a[8] = "http://gisportal.acehprov.go.id:6080/arcgis/rest/services/webgispdga/Kawasan_Wisata_Aceh/MapServer/0"; // layer kawasan wisata
		a[9] = "http://gisportal.acehprov.go.id:6080/arcgis/rest/services/webgispdga/Kesehatan_Prov_Aceh/MapServer/0"; // layer kesehatan
		a[10] = "http://gisportal.acehprov.go.id:6080/arcgis/rest/services/webgispdga/sarana_perhubungan_aceh/MapServer/0"; // layer perhubungan
		// a[11] = "http://gis.pidiejayakab.go.id:8399/arcgis/rest/services/pjpetadasar/MapServer/69"; // layer kemiskinan pidie jaya
		a[12] = "http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Pendidikan_Provinsi_Aceh/MapServer/4"; // layer dayah
		a[13] = "http://gisportal.acehprov.go.id:6080/arcgis/rest/services/DKP_Aceh/Batas_Wilayah_Laut_AR/MapServer/0"; // layer batas laut
		a[14] = "http://gisportal.acehprov.go.id:6080/arcgis/rest/services/DKP_Aceh/Wilayah_Pengelolaan_Perikanan_AR/MapServer/0"; // layer batas ikan
		a[15] = "http://gisportal.acehprov.go.id:6080/arcgis/rest/services/DKP_Aceh/Wilayah_Pengelolaan_Perikanan_AR/MapServer/1"; // layer batas ikan 2
		a[16] = "http://gisportal.acehprov.go.id:6080/arcgis/rest/services/webgispdga/Kerawanan_Banjir_Tamiang/MapServer/0"; // layer rawan banjir tamiang
		a[17] = "http://gisportal.acehprov.go.id:6080/arcgis/rest/services/webgispdga/Kerawanan_Banjir_Teunom/MapServer/0"; // layer rawan banjir teunom
	
		
	var findParams;
	var legend, legendLayers = [];

	var layer=[];
	// info : [0]= tutupan lahan 1990, [1]= tutupan lahan 2000, [2]= tutupan lahan 2006, [3]= tutupan lahan 2013, [4]= pola ruang
	//		  [5]= pelabuhan, [6]= bandara, [7]= terminal, [8]= pariwisata, [9]= infrastruktur kesehatan, [10]= perhubungan
	//		  [11]= data kemiskinan pijay (tidak terpakai), [12]= dayah, [13] = batas laut, [14] = batas ikan, [15] = batas ikan 2
			      
    var popup=[];
	// info : [0]= konten p2k, [1]= perhubungan, [2]= pelabuhan dan bandara, [3]= kawasan wisata, [4]= terminal, [5]= pendidikan 
	//		  [6]= infrastruktur kesehatan, [7]= data kemiskinan pijay (tidak terpakai), [8]= dayah 
	
	var findTask=[];
	// info : [0]= pencarian p2k, [1]= perhubungan, [2]= pendidikan, [3]= infrastruktur kesehatan,
	
	var simbol=[];
	// info : [0]= simbol p2k, [1]= perhubungan, [2]= pendidikan, [3]= infrastruktur kesehatan,
	
	function init() {
		
		esri.bundle.widgets.print.NLS_printout= "Hasil";
	
		// memunculkan map
		map = new esri.Map("map", { 
			basemap : "topo", 
			center : [96.3,5],
			zoom : 8,
			sliderStyle:"small"
		});
		
		// mengaktifkan fungsi toolbars
		navToolbar = new esri.toolbars.Navigation(map);
		dojo.connect(navToolbar, "onExtentHistoryChange", extentHistoryChangeHandler);
		
		// fungsi navigation toolbars
		function extentHistoryChangeHandler() {
			dijit.byId("zoomprev").disabled = navToolbar.isFirstExtent();
			dijit.byId("zoomnext").disabled = navToolbar.isLastExtent();
		}
		
		// fungsi homebutton
		var home = new esri.dijit.HomeButton({
			map: map,
			}, "HomeButton");
		home.startup();
		
		// membuat koordinat
		map.on("load", function() {
			map.on("mouse-move", showCoordinates);
			map.on("mouse-drag", showCoordinates);
		});
		
		// menampilkan koordinat
		function showCoordinates(evt) {
			var mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
			dojo.byId("info").innerHTML = mp.x.toFixed(5) + "  ,  " + mp.y.toFixed(5);
		}
		
		// membuat skala
		var scalebar = new esri.dijit.Scalebar({
			map: map,
			scalebarUnit: "dual"
		});
		
		//fungsi menukar dasar peta
		var Toggle = new esri.dijit.BasemapToggle({
			map: map,
			basemap: "satellite",
		}, "BasemapToggle");
		Toggle.startup();
		
		// membuat fungsi print map
		var printer = new esri.dijit.Print({
			map: map,
			templates :[{
					label: "layout",
					format: "PNG32",
					layout: "A4 Landscape",
					layoutOptions: {
						titleText: "PETA",
						authorText: "BAPPEDA",
						copyrightText: "BAPPEDA ACEH",
						scalebarUnit: "Miles",
					},
					showAttribution:false
			}],
			url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
		}, dojo.byId("printButton"));
		printer.startup();
		
		// layer administrasi
		var adm = new esri.layers.ImageParameters();
			
		adm.layerIds = [0,1,2,3,4];
		adm.layerOption = esri.layers.ImageParameters.LAYER_OPTION_SHOW;
		
		layeradm = new esri.layers.ArcGISDynamicMapServiceLayer("http://gisportal.acehprov.go.id:6080/arcgis/rest/services/services_2017/Aceh_Adm_RTRW/MapServer/",{
			"imageParameters":adm
		});
		
		// konten pop-up P2K
		var kontenp2k = "<table><tr><td width=100> <b>Sektor</b> </td><td> ${SEKTOR} </td></tr>" +
						"<tr><td width=100> <b>SKPA/SKPD</b> </td><td> ${SKPA_SKPD} </td></tr>" +
						"<tr><td width=100> <b>Paket</b> </td><td> ${NAMA_PAKET} </td></tr>" +
						"<tr><td width=100> <b>Pagu</b> </td><td> Rp. ${PAGU:NumberFormat} </td></tr>" +
						"<tr><td width=100> <b>Lokasi</b> </td><td> ${LOKASI} </td></tr>" +
						"<tr><td width=100> <b>Kecamatan</b> </td><td> ${KECAMATAN} </td></tr>" +
						"<tr><td width=100> <b>Desa</b> </td><td> ${DESA} </td></tr></table>" +
						"<br> <img src='img/webgis/p2k/${ID_FOTO}.jpg' height='145' width='230'>";
		popup[0] = new esri.InfoTemplate("INFO", kontenp2k);
		
		// konten pop-up Perhubungan
		var kontenperhubungan = "<table><tr><td width=100> <b>Sarana</b> </td><td> ${Sarana} </td></tr>" +
				   "<tr><td width=100> <b>Lokasi</b> </td><td> ${Lokasi} </td></tr>" +
				   "<tr><td width=100> <b>Kabupaten</b> </td><td> ${Kabupaten} </td></tr>" +
				   "<tr><td width=100> <b>Keterangan</b> </td><td> ${Keterangan} </td></tr>" +
				   "<tr><td width=100> <b>Matra</b> </td><td> ${Matra} </td></tr></table>" +
				   "<br> <img src='img/webgis/sarana-perhubungan/${Foto_Dis}.jpg' height='145' width='230'>";
		popup[1] = new esri.InfoTemplate("Perhubungan", kontenperhubungan);
		
		// konten layer pelabuhan dan bandara
		var kontenpelandara = "<table><tr><td width=100> <b>Nama</b> </td><td> ${keterangan} </td></tr>" +
				   "<tr><td width=100> <b>Kecamatan</b> </td><td> ${nm_kec} </td></tr>" +
				   "<tr><td width=100> <b>Kabupaten</b> </td><td> ${nm_kab} </td></tr>";
		popup[2] = new esri.InfoTemplate("Prasarana perhubungan", kontenpelandara);
		
		// konten Kawasan Wisata Aceh
		var kontenwisata = "<table><tr><td width=100> <b>Nama</b> </td><td> ${nm_objek} </td></tr>" +
				   "<tr><td width=100> <b>Lokasi</b> </td><td> ${lokasi} </td></tr>" +
				   "<tr><td width=100> <b>Kabupaten</b> </td><td> ${nm_kab} </td></tr>" +
				   "<tr><td width=100> <b>Keterangan</b> </td><td> ${Keterangan} </td></tr>" +
				   "<tr><td width=100> <b>Status</b> </td><td> ${status} </td></tr></table>";
		popup[3] = new esri.InfoTemplate("Kawasan Wisata", kontenwisata);
		
		// konten terminal
		var kontenterminal = "<table><tr><td width=100> <b>Terminal</b> </td><td> ${terminal_t} </td></tr>" +
				   "<tr><td width=100> <b>Nomor</b> </td><td> ${nomor} </td></tr>" +
				   "<tr><td width=100> <b>Alamat</b> </td><td> ${alamat} </td></tr>" +
				   "<tr><td width=100> <b>Kabupaten</b> </td><td> ${nm_kab} </td></tr>";
		popup[4] = new esri.InfoTemplate("Prasarana perhubungan", kontenterminal);
		
		// konten Pendidikan Provinsi Aceh
		var kontenpendidikan = "<table><tr><td width=100> <b>Nama</b> </td><td> ${nm_sekolah} </td></tr>" +
				   "<tr><td width=100> <b>Lokasi</b> </td><td> ${alamat} </td></tr>" +
				   "<tr><td width=100> <b>Kabupaten</b> </td><td> ${nm_kab} </td></tr>" +
				   "<tr><td width=100> <b>Keterangan</b> </td><td> ${keterangan} </td></tr>" +
				   "<tr><td width=100> <b>Fasilitas</b> </td><td> ${status} </td></tr></table>";
		popup[5] = new esri.InfoTemplate("Pendidikan", kontenpendidikan);
		
		// konten Kesehatan Provinsi Aceh
		var konteninfrakesehatan = "<table><tr><td width=100> <b>Nama</b> </td><td> ${nm_objek} </td></tr>" +
				   "<tr><td width=100> <b>Lokasi</b> </td><td> ${alamat} </td></tr>" +
				   "<tr><td width=100> <b>Kabupaten</b> </td><td> ${nm_kab} </td></tr>" +
				   "<tr><td width=100> <b>Keterangan</b> </td><td> ${deskripsi} </td></tr>" +
				   "<tr><td width=100> <b>Fasilitas</b> </td><td> ${fasilitas} </td></tr></table>";
		popup[6] = new esri.InfoTemplate("Infrastruktur kesehatan", konteninfrakesehatan);
		
		// konten Kemiskinan Kabupaten Pidie Jaya
		// var kontendatakemiskinanpijay = "<table><tr><td width=100> <b>Nama</b> </td><td> ${NAMA_KK} </td></tr>" +
		//		   "<tr><td width=100> <b>Pekerjaan</b> </td><td> ${PEKERJAAN} </td></tr>" +
		//		   "<tr><td width=100> <b>Tanggungan</b> </td><td> ${TANGGUNGAN} </td></tr>" +
		//		   "<tr><td width=100> <b>Status Rumah</b> </td><td> ${STATUS_RMH} </td></tr>" +
		//		   "<tr><td width=100> <b>Gampong</b> </td><td> ${GAMPONG} </td></tr>" +
		//		   "<tr><td width=100> <b>Kecamatan</b> </td><td> ${KECAMATAN} </td></tr></table>";
		// popup[7] = new esri.InfoTemplate("Kemiskinan", kontendatakemiskinanpijay);
		
		// konten Dayah
		var kontendayah = "<table><tr><td width=100> <b>Nama</b> </td><td> ${NAMA} </td></tr>" +
				   "<tr><td width=100> <b>Kabupaten</b> </td><td> ${Nama_Kab} </td></tr>";
		popup[8] = new esri.InfoTemplate("Dayah", kontendayah);
		
		// konten pop-up monev2017
		var kontenMonev2017 = "<table><tr><td width=500> <b>Sektor</b> </td><td> ${SEKTOR} </td></tr>" +
						"<tr><td width=100> <b>SKPA/SKPD</b> </td><td width=200> ${SKPA_SKPD} </td></tr>" +
						"<tr><td width=100> <b>Paket</b> </td><td width=500> ${NAMA_PAKET} </td></tr>" +
						"<tr><td width=100> <b>Pagu</b> </td><td width=200> Rp. ${PAGU} </td></tr>" +
						"<tr><td width=100> <b>Lokasi</b> </td><td width=200> ${KABUPATEN} </td></tr>" +
						"<tr><td width=100> <b>Kecamatan</b> </td width=200><td> ${KECAMATAN} </td></tr>" +
						"<tr><td width=100> <b>Desa</b> </td><td width=200> ${DESA} </td></tr></table>" +
						"<br> <img src='img/webgis/monev2017/${ID_FOTO}.jpg' height='145' width='230'>";
		popup[9] = new esri.InfoTemplate("INFO", kontenMonev2017);
		
		// fitur findtask ( diperlukan untuk memasukkan layer yang ingin dimasukkan dalam fitur pencarian )
		findTask[0] = new esri.tasks.FindTask("http://123.108.97.62:6080/arcgis/rest/services/webgispdga/KegiatanP2K_2013_all/MapServer"); // p2k
		findTask[1] = new esri.tasks.FindTask("http://gisportal.acehprov.go.id:6080/arcgis/rest/services/webgispdga/transportasi_aceh/MapServer/"); // perhubungan
		findTask[2] = new esri.tasks.FindTask("http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Pendidikan_Provinsi_Aceh/MapServer"); // pendidikan
		findTask[3] = new esri.tasks.FindTask("http://123.108.97.62:6080/arcgis/rest/services/Kesehatan/Kesehatan_Provinsi_Aceh/MapServer"); // kesehatan
		findTask[4] = new esri.tasks.FindTask("http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Monev2017/MapServer"); // monev2017
		
		// simbol point lokasi hasil pencarian p2k
		simbol[0] = new esri.symbol.SimpleMarkerSymbol(
					esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
					new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
					new esri.Color([54, 42, 42]), 2),
					new esri.Color([32, 40, 197, 1])
				);
		
		// simbol point lokasi hasil pencarian perhubungan		
		simbol[1] = new esri.symbol.SimpleMarkerSymbol(
					esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
					new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
					new esri.Color([54, 42, 42]), 2),
					new esri.Color([52, 255, 51, 1])
				);
				
		// simbol point lokasi hasil pencarian pendidikan
		simbol[2] = new esri.symbol.SimpleMarkerSymbol(
					esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
					new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
					new esri.Color([54, 42, 42]), 2),
					new esri.Color([239, 255, 16, 1])
				);
				
		// simbol point lokasi hasil pencarian infarstruktur kesehatan
		simbol[3] = new esri.symbol.SimpleMarkerSymbol(
					esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
					new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
					new esri.Color([54, 42, 42]), 2),
					new esri.Color([148, 54, 14, 1])
				);
				
		// simbol point lokasi hasil pencarian monev2017
		simbol[4] = new esri.symbol.SimpleMarkerSymbol(
					esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
					new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
					new esri.Color([54, 42, 42]), 2),
					new esri.Color([32, 40, 197, 1])
				);
		
		//memasukkan fitur findtask kedalam map
		map.on("load", function () {	
          //membuat fitur find paramater ( diperlukan untuk menentukan kata pencarian)
          findParams = new esri.tasks.FindParameters();
          findParams.returnGeometry = true;
          findParams.layerIds = [0];
          findParams.searchFields = ["SEKTOR","LOKASI","NAMA_PAKET","Sarana","Lokasi","nama","keterangan","fasilitas","nm_sekolah"];
          findParams.outSpatialReference = map.spatialReference;
          console.log("find sr: ", findParams.outSpatialReference);
		}); 
		
		// layer pendidikan SMA sederajat
		layerpendik[0] = new esri.layers.FeatureLayer("http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Pendidikan_Provinsi_Aceh/MapServer/0",{
			mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
			outFields: ["*"],
			infoTemplate: popup[5]
		});
		layerpendik[0].setDefinitionExpression("tingkatan = 'SMA/SMK/MA'"); 
		
		// layer pendidikan SMP sederajat
		layerpendik[1] = new esri.layers.FeatureLayer("http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Pendidikan_Provinsi_Aceh/MapServer/0",{
			mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
			outFields: ["*"],
			infoTemplate: popup[5]
		});
		layerpendik[1].setDefinitionExpression("tingkatan = 'SMP/MTs'");
		
		// layer pendidikan SD sederajat
		layerpendik[2] = new esri.layers.FeatureLayer("http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Pendidikan_Provinsi_Aceh/MapServer/0",{
			mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
			outFields: ["*"],
			infoTemplate: popup[5]
		});
		layerpendik[2].setDefinitionExpression("tingkatan = 'SD/MI'");
	
		//fungsi membuat legend
		map.on("layer-add", function (results) {
			//legendLayers = results;
			//if (legendLayers.length > 0) {
				//createLegend(legendLayers);
			//}
			legend = new esri.dijit.Legend({
				map: map,
				layerInfos: results
			},"legend");
			legend.startup();
		});		
		//legendLayers.push({ layer: layeradm, title: 'Administrasi' });
		//legend = new esri.dijit.Legend({
		//	map: map,
		//	layerInfos : legendLayers,
        //}, "legend");
		//legend.startup();
	
	}
	
		//function createLegend() {
		//	legend = new esri.dijit.Legend({
		//		map: map,
		//		layerInfos: legendLayers
		//	},"legend");
		//	legend.startup();
		//}
	
	
	// memanggil dan mehilangkan layer
	function getlayer(id){
		if (layer[id] == null){
			layer[id] = new esri.layers.FeatureLayer(a[id], {
				mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
			});
		}
		
		if (document.getElementById(id).checked){
			map.addLayer(layer[id]);
		}
		else {
			map.removeLayer(layer[id]);
		} 
	}
	
	// memanggil dan mehilangkan layer dengan fitur pop-up
	function getlayerp(id, pop){
		if (layer[id] == null){
			layer[id] = new esri.layers.FeatureLayer(a[id], {
				mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
				outFields: ["*"],
				infoTemplate: popup[pop]
			});
		}
		
		if (document.getElementById(id).checked){
			map.addLayer(layer[id]);
		}
		else {
			map.removeLayer(layer[id]);
		} 
	}
	
	// fungsi khusus untuk layer administrasi
	function getadm() {	
		if (document.getElementById("adm").checked){		
			map.addLayer(layeradm);
		}
		else {
			map.removeLayer(layeradm);
			legend.destroy();
		}	
	}
	
	// fungsi khusus untuk layer p2k
	function getp2k(id, sektor){
		var expr;
		if (layerp2k[id] == null){
			layerp2k[id] = new esri.layers.FeatureLayer("http://123.108.97.62:6080/arcgis/rest/services/webgispdga/KegiatanP2K_2013_all/MapServer/0", {
				mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
				outFields: ["*"],
				infoTemplate: popup[0]
			});
			expr = "SEKTOR = '" + sektor + "'";
			layerp2k[id].setDefinitionExpression(expr);
		}
		
		if (document.getElementById(sektor).checked){
			map.addLayer(layerp2k[id]);
		}
		else {
			map.removeLayer(layerp2k[id]);
		} 		
	}


	// fungsi khusus untuk layer monev2017
	function getMonev2017(id, sektor_1){
		var expr;
		if (layerMonev2017[id] == null){
			layerMonev2017[id] = new esri.layers.FeatureLayer("http://123.108.97.62:6080/arcgis/rest/services/webgispdga/Monev2017/MapServer/0", {
				mode: esri.layers.FeatureLayer.MODE_ONDEMAND,
				outFields: ["*"],
				infoTemplate: popup[9]
			});
			expr = "SEKTOR_1 = '" + sektor_1 + "'";
			layerMonev2017[id].setDefinitionExpression(expr);
		}
		
		if (document.getElementById(sektor_1).checked){
			map.addLayer(layerMonev2017[id]);
		}
		else {
			map.removeLayer(layerMonev2017[id]);
		} 		
	}
	
	
	// fungsi khusus untuk layer pendidikan
	function getpendik(id, jenjang){
		if (document.getElementById(jenjang).checked){
			map.addLayer(layerpendik[id]);
		}
		else {
			map.removeLayer(layerpendik[id]);
		} 		
	}
	
	//fungsi pencarian
	function find() {
		if (document.getElementById("pencarian").value == 1){
		    findParams.searchText = document.getElementById("cari").value;
            findTask[0].execute(findParams, showResults);
		}
		else  if (document.getElementById("pencarian").value == 2){
			findParams.searchText = document.getElementById("cari").value;
			findTask[1].execute(findParams, showResults2);
		}
		else  if (document.getElementById("pencarian").value == 3){
			findParams.searchText = document.getElementById("cari").value;
			findTask[2].execute(findParams, showResults3);
		}
		else {
			findParams.searchText = document.getElementById("cari").value;
			findTask[3].execute(findParams, showResults4);
		}
	}
	
	// fungsi untuk menampilkan hasil pencarian p2k
	function showResults(results) {
			map.graphics.clear();
			var items = dojo.map(results, function (result) {
				var graphic = result.feature;
				graphic.setSymbol(simbol[0]);
				graphic.setInfoTemplate(popup[0]);
				map.graphics.add(graphic);
				return result.feature.attributes;
			});
	}	

	
	// fungsi untuk menampilkan hasil pencarian monev2017
		function showResults(results) {
			map.graphics.clear();
			var items = dojo.map(results, function (result) {
				var graphic = result.feature;
				graphic.setSymbol(simbol[4]);
				graphic.setInfoTemplate(popup[9]);
				map.graphics.add(graphic);
				return result.feature.attributes;
			});
	}	

	
	// fungsi untuk menampilkan hasil pencarian perhubungan
	function showResults2(results) {
			map.graphics.clear();
			var items = dojo.map(results, function (result) {
				var graphic = result.feature;
				graphic.setSymbol(simbol[1]);
				graphic.setInfoTemplate(popup[1]);
				map.graphics.add(graphic);
				return result.feature.attributes;
			});
	}	
	
	// fungsi untuk menampilkan hasil pencarian pendidikan
	function showResults3(results) {
			map.graphics.clear();
			var items = dojo.map(results, function (result) {
				var graphic = result.feature;
				graphic.setSymbol(simbol[2]);
				graphic.setInfoTemplate(popup[5]);
				map.graphics.add(graphic);
				return result.feature.attributes;
			});
	}

	// fungsi untuk menampilkan hasil pencarian infrastruktur kesehatan
	function showResults4(results) {
			map.graphics.clear();
			var items = dojo.map(results, function (result) {
				var graphic = result.feature;
				graphic.setSymbol(simbol[3]);
				graphic.setInfoTemplate(popup[6]);
				map.graphics.add(graphic);
				return result.feature.attributes;
			});
	}	
	
	// fungsi untuk membersihkan hasil pencarian
	function cleaning(){
		 map.graphics.clear();
	}
	// fungsi Bookmarks
	function Bookmarks(id){
		if (id== 1){ //Banda Aceh
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 95.218904;
			startExtent.ymin = 5.513480;
			startExtent.xmax = 95.432624;
			startExtent.ymax = 5.615515;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}		
		if (id== 2){ //Kota Sabang
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 95.212;
			startExtent.ymin = 5.768;
			startExtent.xmax = 95.387;
			startExtent.ymax = 5.920;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 3){ //Aceh Besar
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 95.157;
			startExtent.ymin = 5.245;
			startExtent.xmax = 95.775;
			startExtent.ymax = 5.654;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 4){ //Kab. Aceh Jaya
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 95.327;
			startExtent.ymin = 4.543;
			startExtent.xmax = 95.944;
			startExtent.ymax = 4.953;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 5){ //Kab. Pidie
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 95.464;
			startExtent.ymin = 4.710;
			startExtent.xmax = 96.688;
			startExtent.ymax = 5.522;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 6){ //Kab. Pidie Jaya
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 95.883;
			startExtent.ymin = 4.918;
			startExtent.xmax = 96.481;
			startExtent.ymax = 5.327;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 7){ //Kab. Bireuen
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 96.308;
			startExtent.ymin = 4.872;
			startExtent.xmax = 96.922;
			startExtent.ymax = 5.282;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 8){ //Kab. Aceh Utara
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 96.775;
			startExtent.ymin = 4.881;
			startExtent.xmax = 97.391;
			startExtent.ymax = 5.291;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 9){ //Kota Lhokseumawe
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 97.049;
			startExtent.ymin = 5.130;
			startExtent.xmax = 97.391;
			startExtent.ymax = 5.232;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 10){ //Kab. Aceh Timur
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 97.469;
			startExtent.ymin = 4.219;
			startExtent.xmax = 98.265;
			startExtent.ymax = 4.627;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 11){ //Kota Langsa
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 97.882;
			startExtent.ymin = 4.438;
			startExtent.xmax = 98.037;
			startExtent.ymax = 4.541;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 12){ //Kab. Aceh Tamiang
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 97.745;
			startExtent.ymin = 4.073;
			startExtent.xmax = 98.362;
			startExtent.ymax = 4.483;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 13){ //Kab. Bener Meriah
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 96.642;
			startExtent.ymin = 4.529;
			startExtent.xmax = 97.259;
			startExtent.ymax = 4.939;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 14){ //Kab. Aceh Tengah
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 96.318;
			startExtent.ymin = 4.149;
			startExtent.xmax = 97.553;
			startExtent.ymax = 4.969;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 15){ //Kab. Gayo Lues
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 96.516;
			startExtent.ymin = 3.542;
			startExtent.xmax = 97.748;
			startExtent.ymax = 4.362;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 16){ //Kab. Aceh Barat
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 95.486;
			startExtent.ymin = 4.064;
			startExtent.xmax = 96.718;
			startExtent.ymax = 4.883;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 17){ //Kab. Nagan Raya
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 95.952;
			startExtent.ymin = 3.701;
			startExtent.xmax = 97.186;
			startExtent.ymax = 4.521;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 18){ //Kab. Aceh Barat Jaya
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 96.488;
			startExtent.ymin = 3.665;
			startExtent.xmax = 97.106;
			startExtent.ymax = 4.075;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 19){ //Kab. Aceh Selatan
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 96.681;
			startExtent.ymin = 2.893;
			startExtent.xmax = 98.095;
			startExtent.ymax = 3.714;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 20){ //Kab. Aceh Tenggara
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 97.065;
			startExtent.ymin = 2.912;
			startExtent.xmax = 98.300;
			startExtent.ymax = 3.733;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 21){ //Kota Subulussalam  
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 97.478;
			startExtent.ymin = 2.492;
			startExtent.xmax = 98.095;
			startExtent.ymax = 2.903;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 22){ //Kab. Aceh Singkil  
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 97.562;
			startExtent.ymin = 2.128;
			startExtent.xmax = 98.180;
			startExtent.ymax = 2.539;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
		if (id== 23){ //Kab. Simeulue  
			var spatialRef = new esri.SpatialReference({wkid:4326});
			var startExtent = new esri.geometry.Extent();
			startExtent.xmin = 95.745;
			startExtent.ymin = 2.403;
			startExtent.xmax = 96.362;
			startExtent.ymax = 2.814;
			startExtent.spatialReference = spatialRef;
			map.setExtent(startExtent);
		}
	}
	
	dojo.addOnLoad(init);