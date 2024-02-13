/*
Genuary : JAN. 10 - Hexagonal.

Author: Brice Michel Bigendako
*/

let polygonSize = 50;
let polygonStrokeWeight = 10;
let col1 = 140;
let col2 = 227;
let col3 = 237;
let polygonColor = 0; //0-> fixed, 1->black and white, 2->random
let polygonImbricatedRotation = 0; //0-> fixed, 1->sequential, 2->random

function setup() {
  createCanvas(windowWidth, windowHeight);
  col1 = random(1,255);
  col2 = random(1,255);
  col3 = random(1,255);  
}

function isOdd(num) {
  return  (num % 2) == 1;
}

function drawHexagon(x, y, rotation = 90) {
  push();
	translate(x, y);
	//convert 90 degree rotation into radian
	rotate(rotation * (PI / 180));  
	polygon(0, 0, polygonSize, 6);
  pop();
}

function drawLine(lineNumber, columns, startFrom = 0) {
  let x = polygonSize ;
	let y = polygonSize;
  let startX = polygonSize * Math.sqrt(3);
  let rotation = 90;

  if(polygonImbricatedRotation) {
    rotation = 0;
  }

  if (isOdd(lineNumber)) {
    startX = (polygonSize/2) * Math.sqrt(3);
    columns++;
  }
  
  for (let i = startFrom; i < columns+startFrom; i++) {
    x = startX + (i * (polygonSize) * Math.sqrt(3));    
    y = (polygonSize * (lineNumber-1) ) + (polygonSize/2 * (lineNumber-1));
    drawHexagon(x, y, rotation);
  }
}

function drawGrid(lines = 50, columns = 50) {

  for(let i = 1; i <= lines; i++) {
    startFrom = 0;    
    drawLine(i, columns);
  }

}

function drawGridImbricated(lines = 50, columns = 50) {
  for(let i = 1 ; i<= lines; i++){
    startFrom = 0;    
    drawLineImbricated(i, polygonSize, startFrom);
  }
}

function drawLineImbricated(lineNumber, columns, startFrom = 0) {
  let x = polygonSize ;
	let y = polygonSize;
  let startX = polygonSize * Math.sqrt(3);

  if (isOdd(lineNumber)) {
    startX = (polygonSize/2) * Math.sqrt(3);
    columns++;
  }

  for (let i = startFrom; i < columns + startFrom; i++) {
    x = startX + (i * (polygonSize) * Math.sqrt(3));    
    y = (polygonSize * (lineNumber-1) ) + (polygonSize/2 * (lineNumber-1));
    drawIbricated(x, y);
  }
}

function drawIbricated(mainX=90, mainY=90) {
  let initpolygonSize = polygonSize;
  let rotation = 0;

    for (let i = 0; i < 10; i++) {
      polygonSize = initpolygonSize - (initpolygonSize/10 * i);
      if(polygonImbricatedRotation == 1) {        
        rotation = 90 - 9 * i;
      } else if (polygonImbricatedRotation > 1){
        rotation = 9 * random(0,10);
      }      
      drawHexagon(mainX, mainY, rotation);      
    }
    polygonSize = initpolygonSize;
}

function step1Hexagon() {
  background(140, 227, 237);
  polygonColor = 3;  
  polygonSize = 200;
  polygonStrokeWeight = 10; 

  drawHexagon(polygonSize, polygonSize, 90);
}

function step2Grid() {
  polygonColor = 2; 
  polygonSize = 100;
  polygonStrokeWeight = 20; 
  
  polygonImbricatedRotation = 2;

  drawGrid();
}

function step3Imbricated() {  
  polygonSize = 500;
  polygonStrokeWeight = 10;
  polygonImbricatedRotation = 2;
  drawIbricated(polygonSize, polygonSize);
}

function step4GridImbricated() {  
  polygonColor = 2; 
  polygonStrokeWeight = 10;
  polygonSize = 150;
  polygonImbricatedRotation = 2;  
  
  drawGridImbricated();
  
}

function step5GridImbricatedRandom() {  
  polygonStrokeWeight = 10;
  polygonSize = 150;
  polygonImbricatedRotation = random([0,1]);  
  polygonColor = random([0,1,2]); 
  
  drawGridImbricated(); 
}

function step6AllGridsRandom() {  
  polygonStrokeWeight = 10;
  polygonSize = 150;
  polygonImbricatedRotation = random([0,1,2]);  
  polygonColor = random([0,1,2]); 
  if(random([0,1]))
    {
      drawGridImbricated();
    }else{
      polygonStrokeWeight = random(20,40);
      drawGrid();
    }
   
}

function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  if(polygonColor == 0) { //fixed color
    fill(col1, col2, col3);
  }else if(polygonColor == 1) {//black and white
    col = random(1,255);
    fill(col, col, col);
  }else {//random
    col1 = random(1,255);
    col2 = random(1,255);
    col3 = random(1,255);
    fill(col1, col2, col3);
  }

  stroke(255, 255, 255);
  strokeWeight(polygonStrokeWeight); 
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);    
  }
  endShape(CLOSE);
}

function draw() {
  //You can uncomments to check differents elements of the project


  //step1Hexagon();

  //step2Grid();

  //step3Imbricated();
  
  //step4GridImbricated();

  step5GridImbricatedRandom();

  //step6AllGridsRandom();

  noLoop(); 
}
