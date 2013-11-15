GameTile[][] tileArray;
String recycle = "r", tr = "tr", cone = "c", earth = "e";
String[] tileImgArray = new String[4];
int timer, score;
int tileSize = 50;
int numTiles = 7;
GameTile switchA, switchB;
boolean canSwitch, winState, finState, highlight;
PImage imgBackground;

void setup(){
  size(640, 460);
  frameRate(6);
  imgBackground = loadImage("background.jpg");
  background(imgBackground);
  
  tileArray = new GameTile[numTiles][numTiles];
  
  tileImgArray[0] = recycle;
  tileImgArray[1] = tr;
  tileImgArray[2] = cone;
  tileImgArray[3] = earth;
  
  timer = 60;
  score = 0;
  canSwitch = false;
  winState = false;
  finState = false;
  
  setUpGamePanel();
  rect(250, 50, 350, 350);
  drawGamePanel();
  
}

void draw(){
  
  if(canSwitch){
     switchTiles();    
     canSwitch = false;
     switchA = null;
     switchB = null;
  }
  
  checkMatchCondition();
  rearrange();
  
  checkWin();
  checkFin();
  
  if(winState){
    fill(0);
    rect(0,0,640,460);
    fill(255);
    textSize(32);
    text("Clean Earth", 300, 230);
    rect(380, 270, 130, 30);
    fill(0);
    textSize(24); 
    text("Play Again", 387, 292);
  }
  if(finState){
    fill(0);
    rect(0,0,640,460);
    fill(255);
    textSize(32);
    text("Game Finished!", 360, 230);
    rect(380, 270, 130, 30);
    fill(0);
    textSize(24); 
    text("Restart", 405, 292);
  }
  if(second()%10 == 0){
    refresh();
  }
}

void setUpGamePanel(){
  for(int i = 0; i<numTiles; i++){
    for(int j = 0; j<numTiles; j++){
      tileArray[i][j] = new GameTile(tileImgArray[int(random(4))], i*tileSize + 250, j*tileSize + 50, i, j);
    }
  }
}

void drawGamePanel(){
  background(imgBackground);
  fill(0, 180.0);
  stroke(0);
  rect(50, 75, 150, 250); 
  rect(250, 50, 350, 350);
  fill(255);
  textSize(24); 
  text("Score: " + score, 60, 125);
  text("Time: 0:" + (timer - second()), 60, 200);
  
  
  for(int i = 0; i<numTiles; i++){
    for(int j = 0; j<numTiles; j++){
      if(tileArray[i][j] != null){
        tileArray[i][j].drawTile();
      }
    }
  }
  if(highlight){
    noFill();
    rect( switchA.getI() * tileSize + 250, switchA.getJ() * tileSize + 50, tileSize, tileSize);
    rect( switchA.getI() * tileSize + 251, switchA.getJ() * tileSize + 51, tileSize-2, tileSize-2);
  } 
}

void mousePressed(){
  if(switchA == null){
    for(int i = 0; i < numTiles; i++){
      for(int j = 0; j < numTiles; j++){
        if(tileArray[i][j] != null && tileArray[i][j].tileOver()){
            switchA = tileArray[i][j];
            highlight = true;
        }
      }
    }
  }
  else if(switchA != null && switchB == null){
    for(int i = 0; i < numTiles; i++){
      for(int j = 0; j < numTiles; j++){
        if(tileArray[i][j] != null && tileArray[i][j].tileOver() && switchA != tileArray[i][j]){
        //If the tiles are next to each other
           if(switchA.getI() == tileArray[i][j].getI()+1 && switchA.getJ() == tileArray[i][j].getJ()){
                switchB = tileArray[i][j];
                canSwitch = true;
           }
           else if(switchA.getI() == tileArray[i][j].getI()-1 && switchA.getJ() == tileArray[i][j].getJ()){
                switchB = tileArray[i][j];
                canSwitch = true;
           }
           else if(switchA.getI() == tileArray[i][j].getI() && switchA.getJ() == tileArray[i][j].getJ()-1){
                switchB = tileArray[i][j];
                canSwitch = true;
           }
           else if(switchA.getI() == tileArray[i][j].getI() && switchA.getJ() == tileArray[i][j].getJ()+1){
                switchB = tileArray[i][j];
                canSwitch = true;
           }
           else{
             canSwitch = false;
           }            
        }
      }
    }
  }
  if(winState || finState){
    if(mouseX >= 380 && mouseX <= 510 && mouseY >= 270 && mouseY <= 300){
        setup();
    }
  }
}

void switchTiles(){
  int tempI = switchA.getI();
  int tempJ = switchA.getJ();
  
  switchA.setI(switchB.getI());
  switchA.setJ(switchB.getJ());
  
  switchB.setI(tempI);
  switchB.setJ(tempJ);
  
  tileArray[switchA.getI()][switchA.getJ()] = switchA;
  tileArray[switchB.getI()][switchB.getJ()] = switchB;
  
  highlight = false;
}

void checkMatchCondition(){
  //checkhorizantal
  for(int i = 0; i <numTiles-2; i++){
    for(int j = 0; j <numTiles; j++){
      if(tileArray[i][j] != null && tileArray[i+1][j] != null && tileArray[i+2][j] != null &&
      tileArray[i][j].getImg().equals(tileArray[i+1][j].getImg()) &&
      tileArray[i][j].getImg().equals(tileArray[i+2][j].getImg())){
        score += 3;    
        
        if(i <= numTiles-4 && tileArray[i+3][j] != null && 
          tileArray[i][j].getImg().equals(tileArray[i+3][j].getImg())){
            score += 1;
            tileArray[i+3][j] = null;
          }
          
        tileArray[i][j] = null;
        tileArray[i+1][j] = null;
        tileArray[i+2][j] = null;
      }
    }
  }
  //checkvertical
  for(int i = 0; i <numTiles; i++){
    for(int j = 0; j <numTiles-2; j++){
      if(tileArray[i][j] != null && tileArray[i][j+1] != null && tileArray[i][j+2] != null &&
      tileArray[i][j].getImg().equals(tileArray[i][j+1].getImg()) &&
      tileArray[i][j].getImg().equals(tileArray[i][j+2].getImg())){
        score += 3;
        
        if(j <= numTiles-4 && tileArray[i][j+3] != null && 
          tileArray[i][j].getImg().equals(tileArray[i][j+3].getImg())){
            score += 1;
            tileArray[i][j+3] = null;
          }
        
        tileArray[i][j] = null;
        tileArray[i][j+1] = null;
        tileArray[i][j+2] = null;
      }
    }
  }
}

void rearrange(){
  for(int i = 0; i < numTiles; i++){
    for(int j = 0; j < numTiles-1; j++){
      if(tileArray[i][j] != null && tileArray[i][j+1] == null){
        tileArray[i][j+1] = new GameTile(tileArray[i][j].getImg(), i*tileSize + 250, (j+1)*tileSize + 50, i, j+1);
        tileArray[i][j] = null;
      }
    }
  }
  drawGamePanel();
}

void checkWin(){
  if(score>100){
    winState = true;
    finState = false;
  }
}

void checkFin(){
  if(second() == 60){
    finState = true;
    winState = false;
  }
}

void refresh(){
  for(int i = 0; i < numTiles; i++){
    if(tileArray[i][0] == null){
      tileArray[i][0] = new GameTile(tileImgArray[int(random(4))], i*tileSize + 250, 50, i, 0);
    }
  }
}
