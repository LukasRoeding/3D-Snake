import * as THREE from './node_modules/three/build/three.module.js';

function giveMeFood(amount) {
    console.log(amount)
    const foods = [];
    for (let index = 0; index < amount; index++) {
        const foodGeometry = new THREE.BoxGeometry(1, 1, 1)
        const foodMaterial = new THREE.MeshBasicMaterial({ color: 0x8B008B });
        const food = new THREE.Mesh(foodGeometry, foodMaterial);
        var num = Math.floor(Math.random()*25) + 1; // this will get a number between 1 and 99;
        num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
        food.position.x = num;
        var num = Math.floor(Math.random()*25) + 1; // this will get a number between 1 and 99;
        num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
        food.position.y = num;
        var num = Math.floor(Math.random()*25) + 1; // this will get a number between 1 and 99;
        num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
        food.position.z = num;
        foods.push(food)

    }
    return foods
}
const foodGeometry = new THREE.BoxGeometry(1, 1, 1)
const foodMaterial = new THREE.MeshBasicMaterial({ color: 0x8B008B });
const food = new THREE.Mesh(foodGeometry, foodMaterial);
var num = Math.floor(Math.random()*25) + 1; // this will get a number between 1 and 99;
num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
food.position.x = num;
var num = Math.floor(Math.random()*25) + 1; // this will get a number between 1 and 99;
num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
food.position.y = num;
var num = Math.floor(Math.random()*25) + 1; // this will get a number between 1 and 99;
num *= Math.round(Math.random()) ? 1 : -1; // this will add minus sign in 50% of cases
food.position.z = num;

export {food, giveMeFood}