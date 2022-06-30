import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './orbitcontrols.js';
import { gamecube, grid } from './gamecube.js';
import { giveMeFood } from './food.js'
import { helpers } from './controlhelper.js'

let allTheFood = giveMeFood(16)
let highscore = 0;
const highscoreElement = document.getElementById("highscore")
let movePause = false;
let tail = [];
let pressedKey = 'w'
let activeControl;
let foodEaten = false;
let counter = 3;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.domElement.addEventListener("click", onclick, true);
document.body.appendChild(renderer.domElement);
var audio = new Audio('eat-sound.mp3');

var raycaster = new THREE.Raycaster();

const controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window );
camera.position.set(40, 40, 0);
controls.update();
scene.add(gamecube);

console.log(allTheFood)
for (let index = 0; index < allTheFood.length; index++) {
    scene.add(allTheFood[index])  
}

for (let index = 0; index < grid.length; index++) {
    scene.add(grid[index]);   
}

for (let index = 0; index < helpers.length; index++) {
    scene.add(helpers[index]);
}
activeControl = helpers[0];
activeControl.material.color.setHex(0xffd700);

const snakeGeometry = new THREE.BoxGeometry(1, 1, 1)
const snakeMaterial = new THREE.MeshBasicMaterial({ color: 0xE10600 });
const snake = new THREE.Mesh(snakeGeometry, snakeMaterial);
scene.add(snake);

function eat(food) {
    audio.play();
    foodEaten = true;
    var num = Math.floor(Math.random()*20) + 1; // this will get a number between 1 and 99;
    num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    food.position.x = num;
    var num = Math.floor(Math.random()*20) + 1; // this will get a number between 1 and 99;
    num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    food.position.y = num;
    var num = Math.floor(Math.random()*20) + 1; // this will get a number between 1 and 99;
    num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
    food.position.z = num;
}

function newTail() {
    const tailGeometry = new THREE.BoxGeometry(1, 1, 1)
    const tailMaterial = new THREE.MeshBasicMaterial({ color: 0xE10600 });
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
    window.alert("You Lost!")
}

function onclick(event) {
    var mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects( helpers, true );
    if (intersects.length > 0) {
        if (
            Math.abs(intersects[0].object.position.x) == Math.abs(activeControl.position.x) && 
            Math.abs(intersects[0].object.position.y) == Math.abs(activeControl.position.y) && 
            Math.abs(intersects[0].object.position.z) == Math.abs(activeControl.position.z) &&
            tail.length > 0
        ) {
            return;
        } else {
            activeControl.material.color.setHex(0x00ffff);
            activeControl = intersects[0].object;
            pressedKey = activeControl.name;
            activeControl.material.color.setHex(0xffd700)
        }
       
    }
}

function animate() {
    requestAnimationFrame(animate);
    if (movePause == false) {
        if (foodEaten) {
            newTail();
            counter--;
            if (counter == 0) {
                foodEaten = false;
                counter = 3;
            }
            
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
        for (let index = 0; index < tail.length; index++) {
            if (snake.position.x == tail[index].position.x && snake.position.y == tail[index].position.y && snake.position.z == tail[index].position.z) {
                death();
            }
        }
        for (let index = 0; index < allTheFood.length; index++) {
            if (snake.position.x == allTheFood[index].position.x && snake.position.y == allTheFood[index].position.y && snake.position.z == allTheFood[index].position.z) {
                eat(allTheFood[index]);
            }   
        }
        movePause = true; 
        
        setTimeout(() => {
            movePause = false
        }, 250)
    }
    
    if (snake.position.x > 20) {
        snake.position.x = -20;
    } else if (snake.position.x < -20) {
        snake.position.x = 20;
    } else if (snake.position.y < -20) {
        snake.position.y = 20;
    } else if (snake.position.y > 20) {
        snake.position.y = -20;
    } else if (snake.position.z < -20) {
        snake.position.z = 20;
    } else if (snake.position.z > 20) {
        snake.position.z = -20;
    }
    controls.update();
    renderer.render(scene, camera);
};

animate();