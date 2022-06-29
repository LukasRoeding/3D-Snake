import * as THREE from './node_modules/three/build/three.module.js';

const geometry = new THREE.BoxGeometry(51, 51, 51)
const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF
 });
material.opacity = 0.05;
material.transparent = true;
const gamecube = new THREE.Mesh(geometry, material);

let grid = [];
const size = 51;
const divisions = 2;

const gridTop = new THREE.GridHelper( size, divisions )
gridTop.position.y += 25.5;
grid.push(gridTop)
const gridBottom = new THREE.GridHelper( size, divisions )
gridBottom.position.y -= 25.5;
grid.push(gridBottom)

const gridLeft = new THREE.GridHelper( size, divisions )
gridLeft.rotateZ(Math.PI / 2);
gridLeft.position.x -= 25.5;
grid.push(gridLeft)

const gridRight = new THREE.GridHelper( size, divisions )
gridRight.rotateZ(Math.PI / 2);
gridRight.position.x += 25.5;
grid.push(gridRight)

const gridFront = new THREE.GridHelper( size, divisions )
gridFront.rotateX(Math.PI / 2);
gridFront.position.z -= 25.5;
grid.push(gridFront)

const gridBack = new THREE.GridHelper( size, divisions )
gridBack.rotateX(Math.PI / 2);
gridBack.position.z += 25.5;
grid.push(gridBack)

export {gamecube, grid}