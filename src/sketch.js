let tree, input, button, playStopBtn;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    stroke(255, 200);
    noFill();

    let angle = PI/4;
    updateAngle(angle);

    input = createInput(degrees(angle));

    button = createButton('Change');
    button.mousePressed(onPress);

    createP('Set manual angle:  ').child(input).child(button);

    playStopBtn = createButton('Play/Stop animation').center("horizontal");
    playStopBtn.mousePressed(playStop);

    let size = min (height/8, width/8);
    tree = new PythagorasTree(width/2 - height/13, height - size*2 - 2, 10, angle, size);
}

let isLoop = true;

function draw() {
    background(0);

    tree.show();
    if (isLoop)
        tree.changeAngle(radians(frameCount%89));
}

function playStop() {
    isLoop = !isLoop;
    isLoop ? loop() : noLoop();
}

function onPress() {
    isLoop = false;
    noLoop();
    let newAngle = radians(input.value());
    if (newAngle < HALF_PI && newAngle > 0) {
        tree.changeAngle(newAngle);
        redraw();
    }
}