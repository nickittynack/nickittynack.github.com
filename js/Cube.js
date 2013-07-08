function Cube() {
    this.notLocked = true;
    this.vObject = null;
    this.cubeSize = 40;
    this.destination = {};
    this.flySpeed = 8;
    this.fallRate = 0.2;
    Cube.prototype.spawn = function() {
        var material = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('img/tnt.jpg')
        });
        this.vObject = new THREE.Mesh(new THREE.CubeGeometry(this.cubeSize, this.cubeSize, this.cubeSize), material);
        this.vObject.overdraw = true;
        this.vObject.position.y += this.cubeSize / 2;
        this.vObject.position.x += Math.floor((Math.random() * 400) - 200);
        this.vObject.position.z += Math.floor((Math.random() * 400) - 200);
        scene.add(this.vObject);
    };
    Cube.prototype.z = function(z) {
        this.vObject.position.z += z;
    };
    Cube.prototype.x = function(x) {
        this.vObject.position.x += x;
    };
    Cube.prototype.setLocked = function() {
        this.notLocked = false;
    };
    Cube.prototype.getUnlocked = function() {
        return this.notLocked;
    };
    Cube.prototype.setDestination = function(xpos, zpos) {
        this.destination = {
            x: xpos,
            xless: false,
            z: zpos,
            zless: false
        };
        if (this.destination.x < this.vObject.position.x) {
            this.destination.xless = true;
        }
        if (this.destination.z < this.vObject.position.z) {
            this.destination.zless = true;
        }
        this.vObject.position.y += 40;
        animateCubes.push(this);
    };
    Cube.prototype.movement = function() {
        if (this.vObject.position.y > 20) {
            console.log('Move');
            if ((this.destination.x < this.vObject.position.x) && (this.destination.xless)) {
                this.vObject.position.x -= this.flySpeed;
            } else if ((this.destination.x > this.vObject.position.x) && (!this.destination.xless)) {
                this.vObject.position.x += this.flySpeed;
            }
            if ((this.destination.z < this.vObject.position.z) && (this.destination.zless)) {
                this.vObject.position.z -= this.flySpeed;
            } else if ((this.destination.z > this.vObject.position.z) && (!this.destination.zless)) {
                this.vObject.position.z += this.flySpeed;
            }
            // this.flySpeed += 0.2;
            this.fallRate *= 1.2;
            this.vObject.position.y -= this.fallRate;
        } else {
            scene.remove(this.vObject);
        }
    };
}