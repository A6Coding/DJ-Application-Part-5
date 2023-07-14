songOne = "";
songTwo = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeft = 0;
scoreRight = 0;
statusOne = "";
statusTwo = "";

function preload() {
    songOne = loadSound("music.mp3");
    songTwo = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 350);
    canvas.position(385, 350);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResult);
}

function modelLoaded() {
    console.log("PoseNet is ready!");
}

function gotResult(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeft = results[0].pose.keypoints[9].score;
        scoreRight = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("left wrist x=" + leftWristX + " left wrist y=" + leftWristY);
        console.log("right wrist x=" + rightWristX + " right wrist y=" + rightWristY);
    }
}

function play() {
    songTwo.play();
    songTwo.setVolume(1);
    songTwo.rate(1);
    songOne.play();
    songOne.setVolume(1);
    songOne.rate(1);
}

function draw() {
    image(video, 0, 0, 600, 350);
    statusOne = songOne.isPlaying();
    statusTwo = songOne.isPlaying();
    fill('#FF0000');
    stroke('#000000');

    if (scoreRight > 0.2) {
        circle(rightWristX, rightWristY, 20);
        songTwo.stop();
        if (statusOne == false) {
            songOne.play();
            document.getElementById("playing_song").innerHTML = "Song: Song #1";
        }
    }

    if (scoreLeft > 0.2) {
        circle(leftWristX, leftWristY, 20);
        songOne.stop();
        if (statusTwo == false) {
            songTwo.play();
            document.getElementById("playing_song").innerHTML = "Song: Song #2";
        }
    }
}