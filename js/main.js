var camera, scene, renderer;
var geometry, material, mesh;
var initialised = false;
var player1, player2, player3, player4;
var cubePositions = [];
var animateCubes = [];
var gameBoundary = 220;


init();
animate();

function init() {

    camera = new THREE.CombinedCamera(window.innerWidth / 2, window.innerHeight / 2, 70, 1, 1000, -500, 1000);

    camera.position.x = 0; // 0
    camera.position.y = 500; // 500
    camera.position.z = 300; // 300
    scene = new THREE.Scene();

    renderer = new THREE.CanvasRenderer(); //WebGLRenderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    var size = 250,
        step = 50;

    var geometry = new THREE.Geometry();

    for (var i = -size; i <= size; i += step) {

        geometry.vertices.push(new THREE.Vector3(-size, 0, i));
        geometry.vertices.push(new THREE.Vector3(size, 0, i));

        geometry.vertices.push(new THREE.Vector3(i, 0, -size));
        geometry.vertices.push(new THREE.Vector3(i, 0, size));

    }

    var material = new THREE.LineBasicMaterial({
        color: 0x000000,
        opacity: 0.2
    });

    var line = new THREE.Line(geometry, material);
    line.type = THREE.LinePieces;
    scene.add(line);

    player1 = new Character();
    player1.spawn();

    player2 = new Character();
    player2.spawn();
    player2.setAsAi();

    player3 = new Character();
    player3.spawn();
    player3.setAsAi();

    player4 = new Character();
    player4.spawn();
    player4.setAsAi();

    cubePositions.push(new Cube());
    cubePositions[cubePositions.length - 1].spawn();

    // player1.getItem(cubePositions[cubePositions.length - 1]);
    document.body.appendChild(renderer.domElement);
    initialised = true;

    setInterval(function() {
        cubePositions.push(new Cube());
        cubePositions[cubePositions.length - 1].spawn();
    }, 4000);
}

function animate() {
    if (initialised) {
        player1.movement();
        player2.movement();
        player3.movement();
        player4.movement();
    }
    for (var i = 0; i < animateCubes.length; i++) {
        animateCubes[i].movement();
    }
    requestAnimationFrame(animate);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene, camera);

}

// function resize() {
//     if (initialised) {
//         camera.left = window.innerWidth / -2;
//         camera.right = window.innerWidth / 2;
//         camera.top = window.innerHeight / 2;
//         camera.bottom = window.innerHeight / -2;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     }
// }
// $(window).resize(function() {
//   resize();
// });
$(document).keydown(function(e) {
    e.preventDefault();
    if (e.keyCode == 37) {
        player1.moveLeft(true);
    }
    if (e.keyCode == 39) {
        player1.moveRight(true);
    }
    if (e.keyCode == 38) {
        player1.moveUp(true);
    }
    if (e.keyCode == 40) {
        player1.moveDown(true);
    }
});

$(document).keyup(function(e) {
    e.preventDefault();
    if (e.keyCode == 37) {
        player1.moveLeft(false);
    }
    if (e.keyCode == 39) {
        player1.moveRight(false);
    }
    if (e.keyCode == 38) {
        player1.moveUp(false);
    }
    if (e.keyCode == 40) {
        player1.moveDown(false);
    }
    if (e.keyCode == 32) {
        player1.throwItem();
    }
});