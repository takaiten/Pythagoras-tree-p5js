let c, s, cs, cSqr, sSqr;

function updateAngle(a) {
    c = cos(a);
    s = sin(a);
    cs = c * s;
    cSqr = pow(c, 2);
    sSqr = pow(s, 2);
}

class Box {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    show() {
        square(0, 0, this.size);
    }
}

class Branch {
    constructor(root, depth, angle) {
        this.root = root;
        this.depth = depth;
        this.angle = angle;

        if (this.depth > 0) {
            this.leftBranch = new Branch(
                new Box(
                    0,
                    -this.root.size * c,
                    this.root.size * c
                ),
                depth - 1,
                angle
            );

            this.rightBranch = new Branch(
                new Box(
                    this.root.size * (cSqr + cs),
                    -this.root.size * (sSqr + cs),
                    this.root.size * s
                ),
                depth - 1,
                angle
            );
        }
    }

    show() {
        this.root.show();
        if(this.depth > 0) {
            push();
            rotate(-this.angle);
            translate(this.leftBranch.root.x, this.leftBranch.root.y);
            this.leftBranch.show();
            pop();

            push();
            translate(this.rightBranch.root.x, this.rightBranch.root.y);
            rotate(HALF_PI - this.angle);
            this.rightBranch.show();
            pop();
        }
    }
}

class PythagorasTree {
    constructor(x, y, depth = 10, angle = QUARTER_PI, size = height / 6) {
        this.x = x;
        this.y = y;

        this.size = size;
        this.angle = angle;
        this.depth = depth;

        this.root = new Branch(
            new Box(0, 0, this.size),
            this.depth,
            this.angle
        );
    }

    changeAngle(angle) {
        updateAngle(angle);

        this.angle = angle;
        this.root = new Branch(
            new Box(0, 0, this.size),
            this.depth,
            this.angle
        );
    }

    show() {
        translate(this.x, this.y);
        this.root.show();
    }
}
