
let fondo;
let samurai;
//let W=1920/1.5;
//let H= 1080/1.5;
let W,H;
let p= 1;
let camina,quieto,salta,gira,mVuela,mGira,mhMuere,mbMuere;
let moscas;
let muertes;
let time;
let sMuerte,sEspada,sMosca;
let sound;
let on ,off;
let mr;
let sca;


function preload(){
//fondo
fondo=loadImage("assets/fondo.png");

//samurai
camina=loadAnimation("assets/samurai/sc/sc_00000.png","assets/samurai/sc/sc_00014.png");
quieto=loadImage("assets/samurai/sc/sc_00000.png");
salta=loadAnimation("assets/samurai/ss/ss_00000.png","assets/samurai/ss/ss_00016.png");
gira=loadImage("assets/samurai/sg/sg_00000.png");

//moscas

mVuela=loadAnimation("assets/mosca/mosca 0001.png","assets/mosca/mosca 0005.png");
mGira=loadImage("assets/mosca/mosca 0006.png");
mhMuere=loadAnimation("assets/mosca/cabeza 0007.png","assets/mosca/cabeza 0015.png");
mbMuere=loadAnimation("assets/mosca/mosca 0007.png","assets/mosca/mosca 0015.png");

//sonido

sMuerte= loadSound("assets/sonidos/mata .wav");
sEspada= loadSound("assets/sonidos/espadazo.wav");
sMosca= loadSound("assets/sonidos/moscas.wav");

on= loadImage("assets/sonidos/on.png");
off= loadImage("assets/sonidos/off.png");


}

function setup(){
     W= 84*windowWidth/100;
     H= 56.25*W/100;

    createCanvas (W,H);
//samurai
    //samurai= createSprite(W/2, H/2+100);
    samurai= createSprite(W/2, 64*H/100);
    samurai.addAnimation("camina",camina);
    samurai.addImage("quieto",quieto);
    samurai.addAnimation("salta",salta);
     samurai.addImage("gira",gira);

     samurai.setCollider("rectangle", 0, 0, 0, 0);

    sca= map(W,0,1920/1.5,0,0.60);

    samurai.scale=sca;
    //samurai.debug=true;

//moscas

start();


//text

textFont('Chewy');


//time
setInterval(timer,1000);

//sonido 
sound=false;
   
}

function draw(){
   
    background(fondo);

    if (time===0){
    gameOver();
    }else{

    mosMove();
    }

    mata();
    
   
    SamuraiMove();

    drawSprites();

  
  //text
  textSize(40);
 // textAlign(LEFT);
  fill(255,0,0);
  text("Kills:"+" "+ muertes,0.81*W/100,92*H/100);
  textAlign(RIGHT);
  text("Time:"+" "+time,W-10,92*H/100);

  soundControl();

  if(moscas.length>0 && sound){
     sMosca.playMode('untilDone');
      sMosca.setVolume(0.3);
      sMosca.play();
  }else{
      sMosca.stop();
  }


}

function SamuraiMove(){
    let pp=p;

    samurai.maxSpeed = 5;

    if(mouseX<samurai.position.x-20){
        samurai.changeAnimation("camina");
        p=1;
        samurai.mirrorX(p);
        samurai.velocity.x=((mouseX-samurai.position.x)/70);
    }else if(mouseX>samurai.position.x+20){
        samurai.changeAnimation("camina");
        p=-1;
        samurai.mirrorX(p);
        samurai.velocity.x=((mouseX-samurai.position.x)/70);
    }else{
        samurai.changeAnimation("quieto");
        samurai.velocity.x=0;
    }

   
if(pp!=p){
    samurai.changeAnimation("gira");
}

if(mouseY<samurai.position.y-75){
    samurai.changeAnimation("salta");
    samurai.velocity.x=0;

   
}



}

function mosMove(){
let mVel=map(sca,0,0.6,0,2);
for(i=0;i<moscas.length;i++){
    let mosca= moscas[i];

    mosca.changeAnimation("Mvuela");
 

    if(mosca.mirrorX()<0){
        mosca.velocity.x=+mVel
    }else{
        mosca.velocity.x=-mVel
    }
   
   
    let pos=random(0,1);
    if (pos<0.01||mosca.position.x<-150||mosca.position.x>W+150){
      mosca.velocity.x=mosca.velocity.x*-1;
      mosca.changeAnimation("mGira");
      
    }

     if (mosca.velocity.x>0){
        mosca.mirrorX(-1);
        mosca.setCollider("rectangle",(-12*-1)*sca,10*sca,200*sca,101*sca);

        }else{
            mosca.mirrorX(1);
            mosca.setCollider("rectangle",-12*sca,10*sca,200*sca,101*sca);
        }
if(mosca.velocity.y<mVel &&mosca.velocity.y>-mVel){
    if(random(0,1)<0.5){
        //mosca.position.y+=3*sin(frameCount/100);
    mosca.velocity.y=-mVel;
 }else{
     mosca.velocity.y=+mVel;
 }
}

    if (mosca.position.y> H/2.5){
       mosca.velocity.y=-mVel
    }
if(mosca.position.y<-50){
   mosca.velocity.y=+mVel;
}

    }

}

function mata (){
  
if (samurai.getAnimationLabel ()=="salta"){

    if(samurai.animation.getFrame ()===8 || samurai.animation.getFrame ()===9){
        samurai.setCollider("rectangle", (156*sca)*p, -195*sca, 178*sca, 40*sca);
        sss=true;
    }

     else if(samurai.animation.getFrame ()===10 || samurai.animation.getFrame ()===11){
        samurai.setCollider("rectangle", (-35*sca)*p, -325*sca, 37*sca, 182*sca);  
    }

    else if(samurai.animation.getFrame ()===12 || samurai.animation.getFrame ()===13){
        samurai.setCollider("rectangle", (-175*sca)*p, -204*sca, 24*sca, 178*sca);   
    }
    else{
        samurai.setCollider("rectangle", 0, 0, 0, 0);
    }
    if(samurai.animation.getFrame ()===2 && sound){ 
    sEspada.playMode('untilDone');
    sEspada.play();
    }
    
    }else{
        samurai.setCollider("rectangle", 0, 0, 0, 0);
    }
    samurai.overlap(moscas, muere);

   
   
}

function muere(s,m){
    let mosP=m.position;
    let cabeza, cuerpo;
    let mirr=m.mirrorX();

   if(sound){
    sMuerte.play();
   }
 
    m.remove();

    if(mirr===-1){

    cuerpo= createSprite(mosP.x, mosP.y+map(sca,0,0.6,0,1));
    cuerpo.addAnimation("muere",mbMuere);
    cuerpo.scale=sca;
    cuerpo.mirrorX(mirr);

    cabeza= createSprite((mosP.x+map(sca,0,0.6,0,56)), mosP.y+map(sca,0,0.6,0,16));
    cabeza.addAnimation("muere",mhMuere);
    cabeza.scale=sca;
    cabeza.mirrorX(mirr);

    cuerpo.addSpeed(10,100);
    cabeza.addSpeed(10,80)

    cuerpo.rotationSpeed=0.5;
    cabeza.rotationSpeed=0.5;

    }else{ 

    cuerpo= createSprite((mosP.x+map(sca,0,0.6,0,56)), mosP.y+map(sca,0,0.6,0,16));
    cuerpo.addAnimation("muere",mbMuere);
    cuerpo.scale=sca;   

    cabeza= createSprite(mosP.x, mosP.y+map(sca,0,0.6,0,1));
    cabeza.addAnimation("muere",mhMuere);
    cabeza.scale=sca;

    cuerpo.addSpeed(10,80);
    cabeza.addSpeed(10,100);

    cuerpo.rotationSpeed=0.5;
    cabeza.rotationSpeed=0.5;

    }

    if(cabeza.position.y>H+map(sca,0,0.6,0,150)){
        cabeza.remove();
    }
    if(cuerpo.position.y>H+map(sca,0,0.6,0,150)){
        cuerpo.remove();
    }
 //nace 
let nPos;
if(random(0,1)<0.5){
    nPos=map(sca,0,0.6,0,-100);
}else{
    nPos=W+map(sca,0,0.6,0,100);
}
    var newMosca= createSprite(nPos,random(0,H/2.5));
    newMosca.addAnimation("Mvuela",mVuela);
    newMosca.addImage("mGira",mGira);

    newMosca.setCollider("rectangle",-12*sca,10*sca,200*sca,101*sca);

    newMosca.scale=sca;
    //newMosca.debug=true;
    
let rot= random(0,1);
if(rot<0.5){
    newMosca.mirrorX(-1);
    newMosca.setCollider("rectangle",(-12*sca)*-1, 10*sca, 200*sca, 
    101*sca);
    newMosca.velocity.x=+map(sca,0,0.6,0,2);

}else{
    newMosca.velocity.x=-map(sca,0,0.6,0,2);
}


moscas.add(newMosca);

muertes+=1;


}

function timer(){

if(time>0 ){

 time--;

}


}

 function gameOver(){
for(i=0;i<moscas.length;i++){
    let m=moscas[i];
    m.velocity.y=-2;
    if(m.position.y<-50){
        m.remove();
    }
}

if(moscas.length===0){

    textSize(map(W,0,1920/1.5,0,100));
    fill(255,0,0);
    text("Game Over",(W/2)-map(W,0,1920/1.5,0,200),(H/2)-map(W,0,1920/1.5,0,50));
    textSize(map(W,0,1920/1.5,0,50));
    text("RESTART",(W/2)-map(W,0,1920/1.5,0,80),(H/2)-map(W,0,1920/1.5,0,300));

    //noFill();
   // rect((W/2)-80,(H/2)-340,160,50);

    if (mouseX<((W/2)-map(W,0,1920/1.5,0,80))+map(W,0,1920/1.5,0,160) && mouseX >(W/2)-map(W,0,1920/1.5,0,80)
     && mouseY<((H/2)-map(W,0,1920/1.5,0,340))+map(W,0,1920/1.5,0,50) && mouseY>(H/2)-map(W,0,1920/1.5,0,340)){

    textSize(map(W,0,1920/1.5,0,50));
    fill(242, 241, 182);
    text("RESTART",(W/2)-map(W,0,1920/1.5,0,80),(H/2)-map(W,0,1920/1.5,0,300));

if(mouseIsPressed){
    start();
}
    
    }
}

 }

 function start(){
    muertes=0;
    time=60;

    //moscas
moscas=new Group();

for(i=0;i<12;i++){
    var mosca= createSprite(random(0,W),random(0,H/2.5));
    mosca.addAnimation("Mvuela",mVuela);
    mosca.addImage("mGira",mGira);

    mosca.setCollider("rectangle",-12*sca,10*sca,200*sca,101*sca);

    mosca.scale=sca;
    //mosca.debug=true;
    
let rot= random(0,1);
if(rot<0.5){
    mosca.mirrorX(-1);
    mosca.setCollider("rectangle",(-12*sca)*-1, 10*sca,200*sca,101*sca);
   // mosca.velocity.x=+2

}
//else{
    //mosca.velocity.x=-2;
//}


moscas.add(mosca);
}


 }

function soundControl(){

   // image(on,W-80,10);
   // noFill();
    //rect(W-80,10,50,40);
if(sound){
    if(mouseX>W-80 && mouseX<(W-80)+50 && mouseY >10 && mouseY<10+40){
        tint(242, 241, 182);
        image(on,W-80,10);
        if(mr){
            sound=false;
        }
    }else{
        tint(255,0,0);
        image(on,W-80,10);
    }
}else{
    if(mouseX>W-80 && mouseX<(W-80)+50 && mouseY >10 && mouseY<10+40){
        tint(242, 241, 182);
        image(off,W-80,10);
        if(mr){
            sound=true;
        }
    }else{
        tint(255,0,0);
        image(off,W-80,10);
    }

}

mr=false;
}

function mouseReleased(){
    mr=true;
    
}

