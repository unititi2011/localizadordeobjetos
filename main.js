objects= [];
status="";

function preload() {
   
}



function setup() {
    canvas= createCanvas(480, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(480, 380)
}

function start() {
    objecto= ml5.objectDetector('cocossd, modelLoaded;')
    document.getElementById("status").innerHTML="Status: detectando Objetos";
    objecto=document.getElementById("objeto").value
}


function modelLoaded() {
    console.log("Modelo Carregado!")
    status= true;
}

function gotResult(error, results) {
    if (error){
        console.log(error);
    }
    console.log(results);
    objects= results;
}


function draw(){
    image(video,0,0,480,380);
    if(status !="")
    {
        objectDetector.detect(video, gotResults);
        for (i= 0; i < objects.lenght; i++) {
            document.getElementById("status").innerHTML= "Status: Objetos Detectados";
console.log(objects);
            fill("#FF0000");
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label+ " " + percent + "%", objects[i].x +15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects [i].x, objects[i].width, objects[i].height);
            if(objects [i].label== objecto){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML=objecto+"encontrado";
            }
            else{
                document.getElementById("status").innerHTML="objecto não encontrado";
            }
        }
    }
}