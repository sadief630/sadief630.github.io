// Sadie Forbes
// CSC 2364 Final Project: City Stunt Jump
// YOUTUBE: https://youtu.be/YGurMC0m-U8 
// GITHUB: https://github.com/sforb11/Final_Project_sforb11

//DECLARE SOME CONSTS (REST DECLARED IN MAKE VARS)
let obstacles;
let randint;
let score;
let next;
let gameState = 'begin'; 
let lightTrigger = -50;
let nextLight = 0;
let frameSpeed = 0; //move rate of background
let i = 0;
let k = 0;
let checkX = -200;
let safe = false;
let sound = true;
let lightCount = 0;
let startTime = 0;
let time = 0;
let finalScore = 0;
let frames = [];

//IMAGES AND FONTS
function preload(){
  font = loadFont('images/goth.otf');
  sky = loadImage('images/Sky.png');
  sub = loadImage('images/sub.png');
  title = loadImage('images/Title.png');
  wallpaper = loadImage('images/Background1.png');
  gameOver = loadImage('images/Game-Over.png');
  scoreText = loadImage('images/Score.png');
  hydrant = loadImage('images/Hydrant.png');
  frame = loadImage('images/Hydrant.png');
  hydrant2 = loadImage('images/Hydrant2.png');
  trash = loadImage('images/Trash.png');
  cone = loadImage('images/Cone.png');
  red = loadImage('images/Red.png');
  yellow = loadImage('images/Yellow.png');
  green = loadImage('images/Green.png');
  BikerSprite = loadImage('images/Bikers.png');
  check = loadImage('images/CheckMark.png');
  key = loadImage('images/key.png');

}

//ARRAY OF SHORT (<3 SECOND) SOUND EFFECTS
//SOURCED FROM FREESOUND
let sounds = new Tone.Players({
  select: 'sounds/select.wav',
  click: 'sounds/click.wav',
  jump: 'sounds/jump.wav',
  crash: 'sounds/crash.mp3',
  coin: 'sounds/score.wav'
})
sounds.toDestination();


function setup() {
  createCanvas(1100, 700);
  textSize(24)
  createVars()
}

//TONE SECTION (PRETTY LONG LOL)

//SYNTHS FOR MOTORCYCLE REV SOUND EFFECT
// Modulation, Amplitude Env, Distortion, Vibrato are used here.
var dist = new Tone.Distortion(0.5).toDestination();
var fm1 = new Tone.FMSynth().connect(dist);
var vibrato = new Tone.Vibrato(100,.05).toDestination();
var fm2 = new Tone.FMSynth().connect(vibrato);
let osc = new Tone.AMOscillator(100,'triangle','square').start()
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  sustain: 0,
  decay: 1,
  release: 0.04,
  attack: .1
}).connect(pan);
osc.connect(ampEnv);

//BEGIN SCREEN MUSIC CODE BLOCK (DUOSYNTH)
let beginSynth3 = new Tone.DuoSynth({
  envelope: {
    sustain: .0,
    release: .0002,
    attack: 0.00009
  }
}).toDestination();
const playSong3 = [
  {'time': '0:0:0', 'note': 'F2', 'duration': '64n'},
  {'time': '0:0:6', 'note': 'G2', 'duration': '64n'},  
  {'time': '0:0:16', 'note': 'A2', 'duration': '64n'}, 
  {'time': '0:0:22', 'note': 'G2', 'duration': '64n'},
  {'time': '0:0:32', 'note': 'F2', 'duration': '64n'}, 
  {'time': '0:0:38', 'note': 'G2', 'duration': '64n'}, 
  {'time': '0:0:48', 'note': 'C3', 'duration': '64n'}, 
  {'time': '0:0:54', 'note': 'G2', 'duration': '64n'},
  {'time': '0:0:60', 'note': 'E2', 'duration': '64n'}, 
]
const playTrack3 = new Tone.Part(function(time,note){
  beginSynth3.triggerAttackRelease(note.note,note.duration,time);
}, playSong3);
playTrack3.loop = true;
playTrack3.loopEnd = "0:0:64";
beginSynth3.volume.value = -14;

//END SCREEN MUSIC CODE BLOCK (DUOSYNTH)
let beginSynth4 = new Tone.DuoSynth({
  envelope: {
    sustain: .0,
    release: .002,
    attack: 0.009
  }
}).toDestination();
const playSong4 = [
  {'time': '0:0:0', 'note': 'F2', 'duration': '64n'},
  {'time': '0:0:3', 'note': 'F2', 'duration': '64n'},
  {'time': '0:0:6', 'note': 'G2', 'duration': '64n'},
  {'time': '0:0:9', 'note': 'G2', 'duration': '64n'},  
  {'time': '0:0:16', 'note': 'G#2', 'duration': '64n'}, 
  {'time': '0:0:22', 'note': 'G2', 'duration': '64n'}, 
  {'time': '0:0:32', 'note': 'F2', 'duration': '64n'}, 
  {'time': '0:0:38', 'note': 'G#2', 'duration': '64n'},
  {'time': '0:0:48', 'note': 'C#3', 'duration': '64n'}, 
  {'time': '0:0:52', 'note': 'C#3', 'duration': '64n'}, 
  {'time': '0:0:54', 'note': 'G2', 'duration': '64n'}, 
  {'time': '0:0:60', 'note': 'F2', 'duration': '64n'}, 

]
const playTrack4 = new Tone.Part(function(time,note){
  beginSynth4.triggerAttackRelease(note.note,note.duration,time);
}, playSong4);
playTrack4.loop = true;
playTrack4.loopEnd = "0:0:64";
beginSynth4.volume.value = -23;

//MORE PLAY/BEGIN MUSIC
let beginSynth2 = new Tone.PolySynth({
  envelope: {
    sustain: 1,
    release: .3,
    attack: 0.09
  }
}).toDestination();
const playSong2 = [
  {'time': '0:0:0', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:0', 'note': 'A3', 'duration': '64n'},

  {'time': '0:0:2', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:2', 'note': 'A3', 'duration': '64n'},

  {'time': '0:0:4', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:4', 'note': 'A3', 'duration': '64n'},


  {'time': '0:0:6', 'note': 'G3', 'duration': '64n'}, 
  {'time': '0:0:6', 'note': 'B3', 'duration': '64n'},
  {'time': '0:0:12', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:12', 'note': 'B3', 'duration': '64n'},


  {'time': '0:0:16', 'note': 'A3', 'duration': '64n'},
  {'time': '0:0:16', 'note': 'C4', 'duration': '64n'},
  {'time': '0:0:18', 'note': 'A3', 'duration': '64n'},
  {'time': '0:0:18', 'note': 'C4', 'duration': '64n'},
  {'time': '0:0:20', 'note': 'A3', 'duration': '64n'},
  {'time': '0:0:20', 'note': 'C4', 'duration': '64n'},

  {'time': '0:0:22', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:22', 'note': 'B3', 'duration': '64n'},
  
  {'time': '0:0:28', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:28', 'note': 'B3', 'duration': '64n'},

  {'time': '0:0:32', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:32', 'note': 'A3', 'duration': '64n'},

  {'time': '0:0:34', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:34', 'note': 'A3', 'duration': '64n'},

  {'time': '0:0:36', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:36', 'note': 'A3', 'duration': '64n'},

  {'time': '0:0:38', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:38', 'note': 'B3', 'duration': '64n'},
  {'time': '0:0:44', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:44', 'note': 'B3', 'duration': '64n'},

  {'time': '0:0:48', 'note': 'C4', 'duration': '64n'},
  {'time': '0:0:48', 'note': 'E4', 'duration': '64n'},
  {'time': '0:0:50', 'note': 'B3', 'duration': '64n'},
  {'time': '0:0:50', 'note': 'D4', 'duration': '64n'},
  {'time': '0:0:52', 'note': 'A3', 'duration': '64n'},
  {'time': '0:0:52', 'note': 'C4', 'duration': '64n'},

  {'time': '0:0:54', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:54', 'note': 'B3', 'duration': '64n'},
  
  {'time': '0:0:60', 'note': 'E3', 'duration': '64n'}, 
  {'time': '0:0:60', 'note': 'G3', 'duration': '64n'},
]
const playTrack2 = new Tone.Part(function(time,note){
  beginSynth2.triggerAttackRelease(note.note,note.duration,time);
}, playSong2);
playTrack2.loop = true;
playTrack2.loopEnd = "0:0:64";
beginSynth2.volume.value = -5;

//...MORE MUSIC
let beginSynth = new Tone.Synth({
  envelope: {
    sustain: .8,
    release: .5,
    attack: 0.09
  }
}).toDestination();
const playSong = [
  {'time': '0:0:0', 'note': 'F3', 'duration': '64n'}, ///////
  {'time': '0:0:3', 'note': 'F3', 'duration': '64n'}, ///////
  {'time': '0:0:6', 'note': 'G3', 'duration': '64n'},  ////////
  {'time': '0:0:9', 'note': 'G3', 'duration': '64n'},  ////////
  {'time': '0:0:16', 'note': 'A3', 'duration': '64n'}, ////////
  {'time': '0:0:22', 'note': 'G3', 'duration': '64n'}, ////////
  {'time': '0:0:32', 'note': 'F3', 'duration': '64n'}, /////////
  {'time': '0:0:35', 'note': 'F3', 'duration': '64n'}, /////////
  {'time': '0:0:38', 'note': 'G3', 'duration': '64n'}, ////////
  {'time': '0:0:41', 'note': 'G3', 'duration': '64n'}, ////////
  {'time': '0:0:48', 'note': 'C3', 'duration': '64n'}, //////
  {'time': '0:0:54', 'note': 'G3', 'duration': '64n'}, ///////
  {'time': '0:0:60', 'note': 'E3', 'duration': '64n'}, //////

]
const playTrack = new Tone.Part(function(time,note){
  beginSynth.triggerAttackRelease(note.note,note.duration,time);
}, playSong);
playTrack.loop = true;
playTrack.loopEnd = "0:0:64";
beginSynth.volume.value = -5;



//DRAW FUNCTION
function draw() {
  textFont(font);
  Tone.Transport.start(); 
  switch(gameState){
    case 'begin': //start screen and char selection
      Tone.Transport.bpm.value = 130;
      playTrack.start(); //start play tracks
      playTrack2.start();
      playTrack3.start();
      //formatting and graphics
      image(sky,0 - frameSpeed,0,0,900); //moving background(s)
      image(sky,1445 - frameSpeed,0,0,900);
      textStyle(BOLD);
      textSize(24);
      fill(255);
      image(title,310,170,500,80);
      image(sub,410,320,285,40);
      //characters in char selection! 
      image((BikerSprite.get(k*320,0*320,320,320)), 280,430, 160,160);
      image((BikerSprite.get(k*320,2*320,320,320)), 470,430,160,160);
      image((BikerSprite.get(k*320,1*320,320,320)), 660,430,160,160);
     if(frameCount % 20 == 0){
        k++;
        if(k==4){
          k = 0;
        }
     }
      text("high score: " + localStorage.getItem('highScore'),460,50);
      fill(100,0,100);
      rect(517,628,80,30);
      fill(255);
      text("start",530,650);
      frameSpeed++;
      if(frameSpeed>1445){
        frameSpeed = 0;
      }
      image(check,checkX,410,40,40);
      //If mouse is pressed without selecting a character, display error!
      if(mouseIsPressed){
        if(mouseX >= 517 && mouseX <=597 && mouseY >= 628 && mouseY <= 658){
          if(checkX < 400){
            text("please select a character",400,400);
          }
        }
      }
      break; 
    case 'play': //game time!
      playTrack2.stop(); //switch to different music volumes and tracks
      beginSynth.volume.value = 0;
      beginSynth3.volume.value = -25;
      image(wallpaper,0 + frameSpeed,0,3033,height);
      image(wallpaper,3033 + frameSpeed,0,3033,height); 

      // moving the background to match the speed of the obstacles
      frameSpeed -= 3 + score/3.4;
      if(frameSpeed < - 3033){
        frameSpeed = 0;
      }

    
     time = int((millis()-startTime)/100); //distance var
       
      text('distance: ' + time, 5,45);
      text('obstacles: ' + score, 5, 20);
      text('lights: ' + lightCount, 5, 70);
      next++;
      
      if (next == randint) {
        obstacles.push(new Obstacle()); //creates new obstacle object
        next = 0;
        randint = int(random(150 + score*.5, 200 + score*.09))
      }

      for (let o of obstacles) { //check through obstacles to see if collision has occured
        o.checkScore(biker.getCords());
        o.go();
        o.draw();
        if (biker.colls(o)) { //checks collision
           sounds.player('crash').start();
           gameState = 'end';
           playTrack4.start(); //start end music
           finalScore = (score*50) + (lightCount*100) + time;
           frameSpeed = 0;
           obstacles.pop(o);
        }
      }

      //Light Mechanics
      
      nextLight++; //increment rand light trigger
      
      //if it's less than the trigger, the light stays green
      if(lightTrigger > nextLight){
        image(green,450,60,220,86);
      }
      else if(lightTrigger == nextLight){ //if it equals the trigger, the yellow sequence will start
        image(yellow,450,60,220,86);
      }
      else if(nextLight >= lightTrigger && nextLight < lightTrigger + 300){
        image(yellow,450,60,220,86);
      }
      else if(nextLight == lightTrigger + 300){ //if 300 frames pass, the light turns red.
  
        sounds.player('jump').start();
        image(red,450,60,220,86);
        
      }
      else if(nextLight >= lightTrigger && nextLight < lightTrigger + 450){

        image(red,450,60,220,86);
        if(keyIsPressed && keyCode == ENTER){ //if you hit the button in time, you will pass.
          safe = true;
          if(sound){
            sounds.player('select').start();
            lightCount++;
          }
          sound = false;
        }
        if(safe){
             image(check,600,70,50,50);
        }
      }
      else if(nextLight == lightTrigger + 450){
        sounds.player('jump').start();
        image(green,450,60,220,86);
      }
      else{ //if you did not hit the button/pass the light check, you lose.
        if(!safe){
          sounds.player('crash').start();
          gameState = 'end';
          finalScore = (score*50) + (lightCount*100) + time;
          frameSpeed = 0;
        }
        else
        {
          safe = false;
          sound = true;
          lightTrigger = int(random(500,1000));
          nextLight = 0;
        }
        image(green,450,60,220,86);
      }
       
      // end light mechanics

      //bike movement/sprite functions
      biker.draw();
      biker.go(); 

      break;
    case 'end': //end screen
      Tone.Transport.bpm.value = 160;
      //turn off music
    
      playTrack.stop();
      playTrack2.stop();
      playTrack3.stop();
     
      //resume moving background
      image(sky,0 - frameSpeed,0,0,900);
      image(sky,1445 - frameSpeed,0,0,900);
      frameSpeed++;
      if(frameSpeed>1445){
        frameSpeed = 0;
      }
      //score calculation
      text('distance: ' + time, 462,310);
      text('+ obstacle bonus: ' + score + " x 50", 365, 340);
      text('+ light bonus: ' + lightCount + " x 100", 415, 370);
      image(gameOver,350,200);
      image(scoreText,415,390,150,40);
      textSize(46);
      text(finalScore, 580,424);
      // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
      if(localStorage.getItem('highScore') == null){
        localStorage.setItem('highScore','0');
      }

      if(finalScore > parseInt(localStorage.getItem('highScore'))){
        localStorage.setItem('highScore',finalScore);
      }
  
      textSize(24);
      text("high score: " + localStorage.getItem('highScore'),445,500);

      text("refresh to restart ",430,540);

      
      break;
  }
}


//the mouseClicked function controls character selection and game start
function mouseClicked(){
  if(gameState == 'begin'){
    if(mouseX >= 517 && mouseX <=597 && mouseY >= 628 && mouseY <= 658){
      if(checkX < 400){
        sounds.player('click').start();
      }
      else{
        startTime = millis();
        gameState = 'play';
        sounds.player('click').start();
        frameSpeed = 0;
      }
  }
  if(mouseY >= 430 && mouseY <= 590){
    if(mouseX >= 280 && mouseX <= 440){
      buildSprite(0);
      sounds.player('select').start();
      checkX = 410;
    }
    if(mouseX >= 470 && mouseX <= 630){
      buildSprite(2);
      sounds.player('select').start();
      checkX = 600;
    }
    if(mouseX >= 660 && mouseX <= 820){
      buildSprite(1);
      sounds.player('select').start();
      checkX = 790;
    }
    }
  }
}

//chooses and creates array of frames for sprites before biker is drawn
function buildSprite(x){
  for(let i = 0; i < 5; i++){
    frames[i] = BikerSprite.get(0+i*320,x*320,320,320);
  }
}

//a buttonPressed function 
function keyPressed() {
  if(keyCode != ENTER){
    biker.jump();
  }
}

// as I was working on the game I made a createVars funciton to simplify
// resetting variables, and I kept it for convienence 
function createVars() {
  obstacles = []
  next = 0;
  randint = int(random(50, 150));
  biker = new Motorcycle();
  new Obstacle();
  lightTrigger = int(random(500,1000));
  score = 0;
  frameSpeed = 0;
  checkX = -200;
}

//Motorcycle/Biker Class
class Motorcycle {
  constructor() {
    this.d = 170; 
    this.x = this.d;
    this.y = height - this.d;
    this.vy = 0;
    this.gravity = .29;
    this.ycord;
    this.i = 0;
  }
  draw() { //spritesheet animation
    if(frameCount % 13 == 0){
      if(this.i == 4){
        this.i = 0;
      }
      this.i++;
    }
    image(frames[this.i],this.x,this.y-50,this.d,this.d);
  }
  /*
    I had to look up a lot on how to make a jump function.
    I made my own gravity variable which creates a certain change in height
    as the character moves. The gravity also SLIGHTLY increases over
    the amount of time to make the jumps more difficult.
  */
  jump() { 
    this.ycord = height - this.y - this.d;
    if(this.gravity <= 3.0){
      this.gravity = 0.29 + score/100;
    }
    else{
      this.gravity = 3.2;
    }
    if (this.ycord == 0) {
      this.vy = -12;
      ampEnv.triggerAttackRelease('16n');
      fm1.triggerAttackRelease("A1", "64n");
      fm2.triggerAttackRelease("A1", "64n");
    }
    
  }
  //used in recording the score
  getCords(){
    return this.d;
  }
  
  // p5 2d collide package function used here. The function checks if two
  // different shapes (rectangles, in this case) collide and returns
  // true or false.
  colls(other) {
 
    return collideRectRect(this.x+10,this.y-60,this.d-10,this.d,other.x+10,other.y-30,other.w-20,other.h,50);
    
  }
  go() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.d);
  }
}

//The Obstacle Class!
class Obstacle {
  constructor() {
    this.choice = random([0,1,2]); //chooses a sprite and designs accordingly
    if(this.choice == 0){ //hydrant
      this.h = 120;
      this.w = 45;
      this.x = width;
      this.y = height - this.h;
    }
    else if(this.choice == 1){ //traffic cone
      this.h = 110;
      this.w = 45;
      this.x = width;
      this.y = height - this.h;
    }
    else{ //trash can
      this.h = 80;
      this.w = 60;
      this.x = width;
      this.y = height - this.h;
    }
    this.checked = false;
  }
  draw() { //animation!
    fill(255, 255);
    if(this.choice == 0){
      if(frameCount % 30 == 0){
        frame = hydrant2;
      }
      if(frameCount % 30 - 15 == 0){
        frame = hydrant;
      }
      image(frame,this.x,this.y-50,this.w,this.h);
    }
    else if(this.choice == 1){
      image(cone,this.x,this.y-50,this.w,this.h);
    }
    else{
      image(trash,this.x,this.y-50,this.w,this.h);
    }
  }

  checkScore(x){ //checks the score to see if a player has successfully cleared an obstacle.
    let prev = score;
    if(this.x < x-100 && this.checked == false){ //check ONCE if jump
      score++;
      Tone.Transport.bpm.value += 2;
    }
    if(score > prev){
      this.checked = true;
    }
  }

  go() {
    this.x -= 5 + score/3;
  }
}
