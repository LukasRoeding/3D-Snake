import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './orbitcontrols.js';
import { gamecube, grid } from './gamecube.js';
import { food } from './food.js'
import { helpers } from './controlhelper.js'

let highscore = 0;
const highscoreElement = document.getElementById("highscore")
let movePause = false;
let tail = [];
let pressedKey = 'w'
let foodEaten = false;
let directionVector = new THREE.Vector3();
directionVector.set(0,1,0)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.domElement.addEventListener("click", onclick, true);
document.body.appendChild(renderer.domElement);

var raycaster = new THREE.Raycaster();

document.addEventListener('keydown', logKey);
function logKey(e) {
    if (e.key == "q" || e.key == "w" || e.key == "e" || e.key == "a" || e.key == "s" || e.key == "d") {
       pressedKey  = e.key; 
    }
    
}
const controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window );
camera.position.set(60, 60, 0);
controls.update();

scene.add(gamecube);
scene.add(food);

for (let index = 0; index < grid.length; index++) {
    scene.add(grid[index]);   
}

for (let index = 0; index < helpers.length; index++) {
    scene.add(helpers[index]);
    helpers[index].cursor = 'pointer';
}

const snakeGeometry = new THREE.BoxGeometry(1, 1, 1)
const snakeMaterial = new THREE.MeshBasicMaterial({ color: 0xE10600 });
const snake = new THREE.Mesh(snakeGeometry, snakeMaterial);
scene.add(snake);

function eat() {
    foodEaten = true;
}

function newTail() {
    var num = Math.floor(Math.random()*25) + 1; // this will get a number between 1 and 99;
    num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    food.position.x = num;
    var num = Math.floor(Math.random()*25) + 1; // this will get a number between 1 and 99;
    num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    food.position.y = num;
    var num = Math.floor(Math.random()*25) + 1; // this will get a number between 1 and 99;
    num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    food.position.z = num;
    const tailGeometry = new THREE.BoxGeometry(1, 1, 1)
    const tailMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const tailElement = new THREE.Mesh(tailGeometry, tailMaterial);
    scene.add(tailElement);
    tail.push(tailElement);
    
    if (tail.length > highscore) {
        highscore = tail.length;
        highscoreElement.innerHTML = highscore;
    }
}

function death() {
    snake.position.set(0,0,0)
    for (let index = 0; index < tail.length; index++) {
        scene.remove(tail[index]);
    }
    tail = [];
}

function onclick(event) {
    var mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects( helpers, true );
    if (intersects.length > 0) {
        pressedKey = intersects[0].object.name;
    }
}

function animate() {
    requestAnimationFrame(animate);
    if (movePause == false) {
        if (foodEaten) {
            newTail();
            foodEaten = false;
        }
        if (tail[0]) {
            for (let index = tail.length - 1; index >= 1; index--) {
                tail[index].position.x = tail[index-1].position.x;
                tail[index].position.y = tail[index-1].position.y;
                tail[index].position.z = tail[index-1].position.z;
            }
            tail[0].position.x = snake.position.x;
            tail[0].position.y = snake.position.y;
            tail[0].position.z = snake.position.z;
        }
        if (pressedKey == "w") {
            snake.position.y = snake.position.y + 1;
        } else if (pressedKey == "s") {
            snake.position.y = snake.position.y - 1;
        } else if (pressedKey == "a") {
            snake.position.z = snake.position.z + 1;
        } else if (pressedKey == "d") {
            snake.position.z = snake.position.z - 1;
        } else if (pressedKey == "q") {
            snake.position.x = snake.position.x + 1;
        } else if (pressedKey == "e") {
            snake.position.x = snake.position.x - 1;
        }
        camera.lookAt(snake.position.x, snake.position.y, snake.position.z)
        for (let index = 0; index < tail.length; index++) {
            if (snake.position.x == tail[index].position.x && snake.position.y == tail[index].position.y && snake.position.z == tail[index].position.z) {
                death();
            }
        }
        if (snake.position.x == food.position.x && snake.position.y == food.position.y && snake.position.z == food.position.z) {
            eat();
        }
        movePause = true; 
        
        setTimeout(() => {
            movePause = false
        }, 300)
    }
    
    if (Math.abs(snake.position.x) > 25 || Math.abs(snake.position.y) > 25 || Math.abs(snake.position.z) > 25) {
        death();
    }
    controls.update();
    renderer.render(scene, camera);
};

animate();