class trigonometricValues {
    constructor(angle) {
        this.changeAngle(angle);
    }

    changeAngle(angle) {
        this.c = Math.cos(angle);
        this.s = Math.sin(angle);
        this.cs = this.c * this.s;
        this.cSqr = Math.pow(this.c, 2);
        this.sSqr = Math.pow(this.s, 2);
    }
}
let tv = new trigonometricValues(0);

class Box {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    show() {
        noFill();
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
                    -this.root.size * tv.c,
                    this.root.size * tv.c
                ),
                depth - 1,
                angle
            );

            this.rightBranch = new Branch(
                new Box(
                    this.root.size * (tv.cSqr + tv.cs),
                    -this.root.size * (tv.sSqr + tv.cs),
                    this.root.size * tv.s
                ),
                depth - 1,
                angle
            );
        }
    }

    show() {
        this.root.show();
        if (this.depth > 0) {
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

        tv.changeAngle(this.angle);
        this.recreate();
    }

    recreate() {
        this.root = new Branch(
            new Box(0, 0, this.size),
            this.depth,
            this.angle
        );
    }

    setAngle(angle) {
        tv.changeAngle(angle);

        this.angle = angle;
        this.recreate();
    }

    setSize(size) {
        this.size = size;
        this.recreate();
    }

    setDepth(depth) {
        this.depth = depth;
        this.recreate();
    }

    getAngle() {
        return int(degrees(this.angle));
    }

    getSize() {
        return this.size;
    }

    getDepth() {
        return this.depth;
    }

    show() {
        push();
        translate(this.x, this.y);
        this.root.show();
        pop();
    }
}
