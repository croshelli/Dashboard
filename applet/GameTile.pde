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
  
  void setImage(){
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
  
  void drawTile(){
    image(img, tileX, tileY);
  }
  
  String getImg(){
    return tileImg;
  }
  
  int getI(){
    return arrayI;
  }
  
  int getJ(){
    return arrayJ;
  }
  
  void setI(int i){
    arrayI = i;
    tileX = float(arrayI * 50 + 250);
  }
  
  void setJ(int j){
    arrayJ = j;
    tileY = float(arrayJ * 50 + 50);
  }
  
  boolean tileOver(){
    if(mouseX >= tileX && mouseX <= tileX + tileWidth &&
    mouseY >= tileY && mouseY <= tileY + tileHeight){
        tileOver = true;
      }else{
        tileOver = false;
      }
    return tileOver;
  }
  
}
