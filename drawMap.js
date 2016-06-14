function drawMap(map,size){
	var mapObject = map;
	var tileSize = size;
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	document.getElementById("myCanvas").style.backgroundColor = "#0090f2";
	document.getElementById("myCanvas").width = (tileSize * mapObject.width);
	document.getElementById("myCanvas").height = (tileSize * mapObject.height);
	
	for(var i = 1; i < mapObject.width - 1; i ++) {
		for(var j = 1; j < mapObject.height - 1; j ++){
			if (mapObject.map[i][j] !== 0){
				context.rect(i*tileSize,j*tileSize,tileSize,tileSize);
			}
		}
	} 
	context.fillStyle = "#00a11a";
	context.fill();
}
