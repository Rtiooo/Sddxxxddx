var canvas, ctx;
var interval;
var width, height;
var size,step;
var Sum_1;
      
      color1 = "#5398BE"
      color2 = "#F2CD5D"

function setup() {
	width = $("body").width();
	height = $("body").height();
  
	canvas = document.getElementById("scrawl");
  canvas.width=width;
  canvas.height=height;
  
	ctx = canvas.getContext("2d");
	size=60;
	step=width/size;
	Sum_1=0;


	initialize();
	interval = setInterval(run,1);

}




// Intiiales Setzen der Boards
function initialize() {
	Old = new Array (size);
	New = new Array (size);
	//Anzahl der Nachbarn
	Neigh = new Array (size);
	Ratio1 = new Array (size);

	for (i = 0; i < Old . length; ++ i){
		Old [i] = new Array (size);
		New [i] = new Array (size);
		Neigh [i] = new Array (size);
		Ratio1 [i] = new Array (size);

	}
	for (i = 0; i < size; ++ i){
		for (j = 0; j < size; ++ j){
			Ratio1 [i][j]=0;
			Neigh[i][j]=8;
			if (i===0 || i===size-1) {
				Neigh[i][j]=5;
				if(j===0 || j===size-1) {
					Neigh[i][j]=3
				}
			}
			if (j===0 || j===size-1) {
				Neigh[i][j]=5;
				if(i===0 || i===size-1) {
					Neigh[i][j]=3
				}
			}


			if (i<size/2){
				Old [i][j] = 1;
				Sum_1+=1
			} 
			else {
				Old [i][j] = 0;
			}
			New [i][j] = Old [i][j];
		}
	}
	Sum_1=Sum_1/(size*size);
}


function ratio() {
	for (i = 0; i < size; ++ i){
		for (j = 0; j < size; ++ j){
			Ratio1[i][j]=0;
			if(i>0){
				if(j>0){ 		Ratio1[i][j]+=Old[i-1][j-1];}
								Ratio1[i][j]+=Old[i-1][j];
				if(j<size-1){	Ratio1[i][j]+=Old[i-1][j+1];}
			}

			if(j>0){ 		Ratio1[i][j]+=Old[i][j-1];}
			if(j<size-1){	Ratio1[i][j]+=Old[i][j+1];}

			if(i<size-1){
				if(j>0){ 		Ratio1[i][j]+=Old[i+1][j-1];}
								Ratio1[i][j]+=Old[i+1][j];
				if(j<size-1){	Ratio1[i][j]+=Old[i+1][j+1];}
			}

			Ratio1[i][j]=Ratio1[i][j]/Neigh[i][j];
		}
	}
		console.log("Bianco:"+Neigh[1][1]);
	console.log("Nero:"+Ratio1[1][1]);
			console.log(Sum_1);
  
  
    if(Sum_1==1){
      $("#winner").html("Yellow win");
    } else if(Sum_1==0){
      $("#winner").html("Blue win");
    }

}





function draw() {
	

	for (i = 0; i < size; ++ i){
		for (j = 0; j < size; ++ j){
					ctx.fillStyle = color1;
					if(Old[i][j]===1){ctx.fillStyle = color2;}						
				ctx.fillRect (i*step, j*step, step, step);
			}
		}
}

function calculate() {

	for (i = 0; i < size; ++ i){
		for (j = 0; j < size; ++ j){
			help=Math.random();

			if ((Ratio1[i][j])>help){
				Old[i][j]=1;
			} else{Old[i][j]=0;
			}
		}
	}
	

	Sum_1=0;
	for (i = 0; i < size; ++ i){
		for (j = 0; j < size; ++ j){
			if (Old[i][j]==1) Sum_1+=1;
		}
	}
	Sum_1=Sum_1/(size*size);
}
function run() {
	ratio();
	draw();
	calculate();
}