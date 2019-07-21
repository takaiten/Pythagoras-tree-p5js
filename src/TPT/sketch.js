let tree;
let angInp, depInp, sizeInp;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    frameRate(30);
    stroke(255, 200);

    let size = min (height/8, width/8);
    tree = new trunkPythagorasTree(createVector(width / 2, 3 * height / 4), QUARTER_PI, size, 10);

    angInp = createInput(tree.getAngle());
    depInp = createInput(tree.getDepth());
    sizeInp = createInput(tree.getSize());

    createP('Manual settings:')
        .attribute('align', 'center')
        .child(createDiv('Set angle:  ')
            .attribute('align', 'left')
            .child(angInp)
            .child(createButton('Set')
                .mousePressed(setAngleFunc)))
        .child(createDiv('Set depth:  ')
            .attribute('align', 'left')
            .child(depInp)
            .child(createButton('Set')
                .mousePressed(setDepthFunc)))
        .child(createDiv('Set start height:  ')
            .attribute('align', 'left')
            .child(sizeInp)
            .child(createButton('Set')
                .mousePressed(setSizeFunc)));
}

let isPlay = true;

function draw() {
    background(0);

    tree.show();

    if (isPlay)
        tree.setAngle(radians(frameCount % 90));

    /* Show info */
    fill(255);
    text('FPS:' + int(getFrameRate()), 0, 10);
    text('Angle:' + tree.getAngle(), 0, 25);
    text('Depth:' + tree.getDepth(), 0, 40);
}

function mousePressed() {
    if (mouseY < height) {
        isPlay = !isPlay;
        isPlay ? loop() : noLoop();
    }
}

function setAngleFunc() {
    const newAngle = angInp.value();
    if (newAngle < 90 && newAngle > 0) {
        noLoop();
        isPlay = false;
        tree.setAngle(radians(newAngle));

        redraw();
    }
}

function setDepthFunc() {
    const newDepth = depInp.value();
    if (newDepth > 0 && newDepth < 15) {
        tree.setDepth(newDepth);

        if (!isPlay) {
            redraw();
        }
    }
}

function setSizeFunc() {
    const newSize = sizeInp.value();
    if (newSize > 0 && newSize < height) {
        tree.setSize(newSize);

        if (!isPlay) {
            redraw();
        }
    }
}
