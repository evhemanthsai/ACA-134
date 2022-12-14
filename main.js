var canvas = "";
stats = "";
objects = [];
let song;

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerText = " STATUS : Detecting Objects";
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    song = loadSound("alarm.mp3");
}
  

function preload(){

}

function draw (){
    image(video,0,0,380,380);
    
    if (stats != ""){
        objectDetector.detect(video,gotResult)
        r = random(255);
        g = random(255);
        b = random(255);
        for(i=0; i<objects.length; i++){
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15);
        document.getElementById("status").innerHTML = "Status : Object Detected";
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(bbjects[i].label != "person"){
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            song.play();
        } else if(objects[i].label = "person"){
            document.getElementById("number_of_objects").innerHTML = "Baby Found";
            song.stop();
        }
    }
}
}


function modelLoaded(){
    console.log('MODEL LOADED');
    stats = true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}