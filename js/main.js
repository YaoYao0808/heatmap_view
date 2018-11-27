dojo.require("esri.map");
dojo.require("esri.layers.ArcGISDynamicMapServiceLayer");
dojo.require("src/Echarts3Layer");

dojo.ready(function() {

	var map = new esri.Map('map', {
		basemap: 'osm',
		center: [114.338119,30.508913],  //114.338119,30.508913
		zoom: 12,
		navigationMode: "css-transform",
		force3DTransforms: true,
		logo: false,
		fitExtent: true,
		fadeOnZoom: true,
		slider: false
	});

	dojo.connect(map, 'onLoad', function(themap) {

		var heatmap = Dcq.Heatmap.Instance();
		if(!heatmap.isInited()) {
			heatmap.init({
				'map': themap,
				'echarts': echarts
			});
		}

		//开始获取数据
		$.get("data_yuan2.json", function(data) {
			var result = [];
			for(var i = 0; i < data.length; i++) {
				for(var j = 0; j < data[i].length; j++) {
					var item = data[i][j];
					result.push([item.coord[0], item.coord[1]]);
				}
			}
			heatmap.drawChart(result);
		}, "json");
	});
});