class trigonometricValues {
    constructor(angle) {
        this.changeAngle(angle);
    }
    changeAngle(angle) {
        this.c = Math.cos(angle);
        this.s = Math.sin(angle);
    }
}
let tv = new trigonometricValues(0);

class trunkTreeBrunch {
    constructor(start, end, angle, depth) {
        this.a = start;
        this.b = end;

        this.angle = angle;
        this.depth = depth;

        if (depth > 0) {
            this.rightBranch = new trunkTreeBrunch(this.b, this.getEndLocation(0), this.angle, depth - 1);
            this.leftBranch = new trunkTreeBrunch(this.b, this.getEndLocation(HALF_PI),this.angle, depth - 1);
        }
    }

    getEndLocation(sgn) {
        let newEnd = p5.Vector
            .sub(this.b, this.a)
            .mult(sgn === HALF_PI? tv.s : tv.c)
            .rotate(sgn - this.angle)
            .add(this.b);

        return newEnd;
    }

    show() {
        line(this.a.x ,this.a.y, this.b.x, this.b.y);
        if (this.depth > 0) {
            this.leftBranch.show();
            this.rightBranch.show();
        }
    }
}

class trunkPythagorasTree {
    constructor(start, angle = QUARTER_PI, size = height/8, depth = 9) {
        this.start = start;
        this.angle = angle;
        this.size = size;
        this.depth = depth;

        tv.changeAngle(angle);
        this.recreate();
    }


    recreate() {
        this.root = new trunkTreeBrunch(this.start, createVector(this.start.x, this.start.y - this.size), this.angle, this.depth);
    }

    setAngle(angle) {
        tv.changeAngle(angle);

        this.angle = angle;
        this.recreate();
    }

    setDepth(depth) {
        this.depth = depth;
        this.recreate();
    }

    setLocation(loc) {
        this.start = loc;
        this.recreate();
    }

    setSize(size) {
        this.size = size;
        this.recreate();
    }

    getAngle() {
        return int(degrees(this.angle));
    }

    getDepth() {
        return this.depth;
    }

    getSize() {
        return this.size;
    }

    show() {
        this.root.show();
    }
}
