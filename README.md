## 此处代码涉及到热力图的展示：
1.可参考官方网站 [https://www.patrick-wied.at/static/heatmapjs/]  
2.文件中heatmap.js和gmaps-heatmap.js为执行热力图程序需加的js文件  
  hot.html中只使用了heatmap.js  
3.所传的数据包含三个部分：经度，纬度，数量  
4.一般来说，热力图需要在底图（地图）上做显示才有意义  
5.hot.html中加了显示鼠标坐标的功能，以做测试  


## 关于index.html和index原件.html:此为arcgis for javascript结合Echarts  
1.其核心代码放在main.js中  
`<script type="text/javascript" src="js/main.js"></script>`  
2.注意main.js中，new map的语句    
	`var map = new esri.Map('map', {  
		basemap: 'osm',  
		center: [114.338119,30.508913],  //114.338119,30.508913  
		zoom: 12,  
		navigationMode: "css-transform",  
		force3DTransforms: true,  
		logo: false,  
		fitExtent: true,  
		fadeOnZoom: true,  
		slider: false  
	});`  
	此处basemap可选择性很多，可参考链接[http://www.cnblogs.com/myfgis/p/5709079.html ] 
	center属性，由于我此处点的集合大概集中在[114,30]的位置，因此设为地图显示的中心  
3.main.js中加载的data.json文件，包含三个属性：经度，纬度，权值  
  Echarts显示热力图，是根据经度纬度的密集程度，此处并未考虑权值大小  
  颜色蓝色表示密集程度很底，红色表示密集程度较高  
  注意：若要考虑权值大小，
  `  
  result.push([item.coord[0], item.coord[1],item.elevation]);  
  `  
  `    
  //开始获取数据    
		$.get("../../static/js/data/data_yuan2.json", function(data) {  
			var result = [];  
			for(var i = 0; i < data.length; i++) {  
				for(var j = 0; j < data[i].length; j++) {  
					var item = data[i][j];  
					result.push([item.coord[0], item.coord[1],item.elevation]);  
				}  
			}  
			heatmap.drawChart(result);  
		}, "json");  
  `

