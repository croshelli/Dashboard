import processing.core.*; 
import processing.xml.*; 

import java.applet.*; 
import java.awt.Dimension; 
import java.awt.Frame; 
import java.awt.event.MouseEvent; 
import java.awt.event.KeyEvent; 
import java.awt.event.FocusEvent; 
import java.awt.Image; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class TrashMiniGame extends PApplet {

GameTile[][] tileArray;
String recycle = "r", tr = "tr", cone = "c", earth = "e";
String[] tileImgArray = new String[4];
int timer, score;
int tileSize = 50;
int numTiles = 7;
GameTile switchA, switchB;
boolean canSwitch, winState, finState, highlight;
PImage imgBackground;

public void setup(){
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

public void draw(){
  
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

public void setUpGamePanel(){
  for(int i = 0; i<numTiles; i++){
    for(int j = 0; j<numTiles; j++){
      tileArray[i][j] = new GameTile(tileImgArray[PApplet.parseInt(random(4))], i*tileSize + 250, j*tileSize + 50, i, j);
    }
  }
}

public void drawGamePanel(){
  background(imgBackground);
  fill(0, 180.0f);
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

public void mousePressed(){
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

public void switchTiles(){
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

public void checkMatchCondition(){
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

public void rearrange(){
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

public void checkWin(){
  if(score>100){
    winState = true;
    finState = false;
  }
}

public void checkFin(){
  if(second() == 60){
    finState = true;
    winState = false;
  }
}

public void refresh(){
  for(int i = 0; i < numTiles; i++){
    if(tileArray[i][0] == null){
      tileArray[i][0] = new GameTile(tileImgArray[PApplet.parseInt(random(4))], i*tileSize + 250, 50, i, 0);
    }
  }
}
class GameTile{
  String tileImg;
  PImage img;
  int tileHeight = 50, tileWidth = 50;
  float tileX, tileY;
  boolean tileOver;
  int arrayI, arrayJ;
  
  GameTile(String name, int x, int y, int i, int j){
    tileImg = name;
    tileX = x;
    tileY = y;
    tileOver = false;
    arrayI = i;
    arrayJ = j;
    setImage();
  }
  
  public void setImage(){
    if(tileImg.equals("r")){
      img = loadImage("recycle.jpg");
    }
    else if(tileImg.equals("tr")){
      img = loadImage("trashCan.jpg");
    }
    else if(tileImg.equals("c")){
      img = loadImage("cone.jpg");
    }
    else{
      img = loadImage("earth.jpg");
    }  
  }
  
  public void drawTile(){
    image(img, tileX, tileY);
  }
  
  public String getImg(){
    return tileImg;
  }
  
  public int getI(){
    return arrayI;
  }
  
  public int getJ(){
    return arrayJ;
  }
  
  public void setI(int i){
    arrayI = i;
    tileX = PApplet.parseFloat(arrayI * 50 + 250);
  }
  
  public void setJ(int j){
    arrayJ = j;
    tileY = PApplet.parseFloat(arrayJ * 50 + 50);
  }
  
  public boolean tileOver(){
    if(mouseX >= tileX && mouseX <= tileX + tileWidth &&
    mouseY >= tileY && mouseY <= tileY + tileHeight){
        tileOver = true;
      }else{
        tileOver = false;
      }
    return tileOver;
  }
  
}
  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#F0F0F0", "TrashMiniGame" });
  }
}
