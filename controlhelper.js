import * as THREE from './node_modules/three/build/three.module.js';

var helpers = []

const wGeometry = new THREE.BoxGeometry(10, 10, 10)
const wMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const w = new THREE.Mesh(wGeometry, wMaterial);
w.name = "w";
w.position.y = 40;
helpers.push(w);

const sGeometry = new THREE.BoxGeometry(10, 10, 10)
const sMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const s = new THREE.Mesh(sGeometry, sMaterial);
s.name = "s";
s.position.y = -40;
helpers.push(s);

const eGeometry = new THREE.BoxGeometry(10, 10, 10)
const eMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const e = new THREE.Mesh(eGeometry, eMaterial);
e.name = "e";
e.position.x = -40;
helpers.push(e);

const qGeometry = new THREE.BoxGeometry(10, 10, 10)
const qMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const q = new THREE.Mesh(qGeometry, qMaterial);
q.name = "q";
q.position.x = 40;
helpers.push(q);

const aGeometry = new THREE.BoxGeometry(10, 10, 10)
const aMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const a = new THREE.Mesh(aGeometry, aMaterial);
a.name = "a";
a.position.z = 40;
helpers.push(a);

const dGeometry = new THREE.BoxGeometry(10, 10, 10)
const dMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const d = new THREE.Mesh(dGeometry, dMaterial);
d.name = "d";
d.position.z = -40;
helpers.push(d);

export { helpers }