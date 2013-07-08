function Character() {
    this.vScene = null;
    this.moveSpeed = 5;
    this.feet = {};
    this.hands = {};
    this.move = {
        left: false,
        right: false,
        up: false,
        down: false
    };
    this.walkSwitch = false;
    this.oldPos = {
        x: 0,
        z: 0
    };
    this.item = null;
    Character.prototype.spawn = function(x, z) {
        this.vScene = new THREE.Object3D();
        // Body
        var quality = 8;
        // var material = new THREE.MeshLambertMaterial(args);
        var body = new THREE.Mesh(new THREE.SphereGeometry(22, quality, quality), new THREE.MeshNormalMaterial());
        body.position.y -= 5;
        this.vScene.add(body);
        // Head
        var head = new THREE.Mesh(new THREE.SphereGeometry(15, quality, quality), new THREE.MeshNormalMaterial());
        head.position.y += 35;
        head.position.z += 7;
        this.vScene.add(head);
        // Left Hand
        this.hands.left = new THREE.Mesh(new THREE.SphereGeometry(10, quality, quality), new THREE.MeshNormalMaterial());
        this.hands.left.position.z = 10;
        this.hands.left.position.x = -30;
        this.hands.left.position.y = -10;
        this.vScene.add(this.hands.left);
        // Right Hand
        this.hands.right = new THREE.Mesh(new THREE.SphereGeometry(10, quality, quality), new THREE.MeshNormalMaterial());
        this.hands.right.position.z = 10;
        this.hands.right.position.x = 30;
        this.hands.right.position.y = -10;
        this.vScene.add(this.hands.right);
        // Left Foot
        this.feet.left = new THREE.Mesh(new THREE.SphereGeometry(10, quality, quality), new THREE.MeshNormalMaterial());
        this.feet.left.position.x -= 15;
        this.feet.left.position.y -= 40;
        this.vScene.add(this.feet.left);
        // Right Foot
        this.feet.right = new THREE.Mesh(new THREE.SphereGeometry(10, quality, quality), new THREE.MeshNormalMaterial());
        this.feet.right.position.x += 15;
        this.feet.right.position.y -= 40;
        this.vScene.add(this.feet.right);

        this.vScene.position.y += 50;
        scene.add(this.vScene);
    };
    Character.prototype.destroy = function() {
        scene.remove(this.vScene);
    };
    Character.prototype.moveLeft = function(v) {
        this.move.left = v;
        // this.vScene.position.x -= 10;
    };
    Character.prototype.moveRight = function(v) {
        this.move.right = v;
        // this.vScene.position.x += 10;
    };
    Character.prototype.moveUp = function(v) {
        this.move.up = v;
        // this.vScene.position.z -= 10;
    };
    Character.prototype.moveDown = function(v) {
        this.move.down = v;
        // this.vScene.position.z += 10;
    };
    Character.prototype.setAsAi = function() {
        var selfRef = this;
        setInterval(function() {
            var ran = Math.floor((Math.random() * 5) + 1);
            if (ran == 1) {
                selfRef.moveLeft(true);
                selfRef.moveRight(false);
            } else if (ran == 2) {
                selfRef.moveDown(true);
                selfRef.moveUp(false);
            } else if (ran == 3) {
                selfRef.moveUp(true);
                selfRef.moveDown(false);
            } else if (ran == 4) {
                selfRef.moveRight(true);
                selfRef.moveLeft(false);
            } else if (ran == 5) {
                selfRef.throwItem();
            }
        }, 50);
    };
    Character.prototype.getItem = function(item) {
        this.item = item;
        this.item.vObject.position.x = this.vScene.position.x;
        this.item.vObject.position.z = this.vScene.position.z;
        this.item.vObject.position.y = 125;
        this.hands.right.position.y = 50;
        this.hands.right.position.x = 25;
        this.hands.right.position.z = 0;
        this.hands.left.position.y = 50;
        this.hands.left.position.x = -25;
        this.hands.left.position.z = 0;
    };
    Character.prototype.throwItem = function() {
        if (this.item) {
            var throwing = this.item;
            this.item = null;
            this.hands.left.position.z = 10;
            this.hands.left.position.x = -30;
            this.hands.left.position.y = -10;
            this.hands.right.position.z = 10;
            this.hands.right.position.x = 30;
            this.hands.right.position.y = -10;

            var throwDistance = 200;
            var theta = this.vScene.rotation.y;
            var xpos = this.vScene.position.x + Math.sin(theta) * throwDistance;
            var zpos = this.vScene.position.z + Math.cos(theta) * throwDistance;
            throwing.setDestination(xpos, zpos);
            // throwing.vObject.position.x = this.vScene.position.x + Math.sin(theta) * throwDistance;
            // throwing.vObject.position.z = this.vScene.position.z + Math.cos(theta) * throwDistance;
            // console.log(Math.cos(theta) * 10);
            // console.log(Math.sin(theta) * 10);
        }
    };
    Character.prototype.movement = function() {

        if ((this.move.left) || (this.move.right) || (this.move.up) || (this.move.down)) {
            if ((this.move.left) && (this.vScene.position.x > -gameBoundary)) {
                this.vScene.position.x -= this.moveSpeed;
                if (this.item) this.item.x(-this.moveSpeed);
            }
            if ((this.move.right) && (this.vScene.position.x < gameBoundary)) {
                this.vScene.position.x += this.moveSpeed;
                if (this.item) this.item.x(this.moveSpeed);
            }
            if ((this.move.up) && (this.vScene.position.z > -gameBoundary)) {
                this.vScene.position.z -= this.moveSpeed;
                if (this.item) this.item.z(-this.moveSpeed);
            }
            if ((this.move.down) && (this.vScene.position.z < gameBoundary)) {
                this.vScene.position.z += this.moveSpeed;
                if (this.item) this.item.z(this.moveSpeed);
            }


            if (this.move.up) {
                if (this.move.right) {
                    this.vScene.rotation.y = 90;
                    if (this.item) this.item.vObject.rotation.y = 90;
                } else if (this.move.left) {
                    this.vScene.rotation.y = -90;
                    if (this.item) this.item.vObject.rotation.y = -90;
                } else {
                    this.vScene.rotation.y = Math.PI;
                    if (this.item) this.item.vObject.rotation.y = Math.PI;
                }
            } else if (this.move.down) {
                if (this.move.right) {
                    this.vScene.rotation.y = 45;
                    if (this.item) this.item.vObject.rotation.y = 45;
                } else if (this.move.left) {
                    this.vScene.rotation.y = -45;
                    if (this.item) this.item.vObject.rotation.y = -45;
                } else {
                    this.vScene.rotation.y = 0;
                    if (this.item) this.item.vObject.rotation.y = 0;
                }
            } else if (this.move.left) {
                this.vScene.rotation.y = -Math.PI / 2;
                if (this.item) this.item.vObject.rotation.y = -Math.PI / 2;
            } else if (this.move.right) {
                this.vScene.rotation.y = Math.PI / 2;
                if (this.item) this.item.vObject.rotation.y = Math.PI / 2;
            }
            var move = 2;
            var stepSize = 20;
            if ((this.feet.left.position.z < -stepSize) && (this.walkSwitch)) {
                this.walkSwitch = false;
            } else if ((!this.walkSwitch) && (this.feet.left.position.z > stepSize)) {
                this.walkSwitch = true;
            }
            this.feet.left.position.z += this.walkSwitch ? -move : move;
            this.feet.right.position.z -= this.walkSwitch ? -move : move;

            if (this.item === null) {
                for (var i = cubePositions.length - 1; i >= 0; i--) {
                    if (cubePositions[i].getUnlocked()) {
                        if (Math.abs(this.vScene.position.x - cubePositions[i].vObject.position.x) < 60) {
                            if (Math.abs(this.vScene.position.z - cubePositions[i].vObject.position.z) < 60) {
                                this.getItem(cubePositions[i]);
                                cubePositions[i].setLocked();
                                // console.log('Got Item!');
                            }
                        }
                    }
                }
            }
        }



    };
}