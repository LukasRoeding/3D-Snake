import * as THREE from './node_modules/three/build/three.module.js';

var helpers = []

const wGeometry = new THREE.BoxGeometry(10, 10, 10)
const wtexture = new THREE.TextureLoader().load( 'w.png' );
const wMaterial = new THREE.MeshBasicMaterial({ map: wtexture });
const w = new THREE.Mesh(wGeometry, wMaterial);
w.position.y = 40;
helpers.push(w);

const sGeometry = new THREE.BoxGeometry(10, 10, 10)
const stexture = new THREE.TextureLoader().load( 's.png' );
const sMaterial = new THREE.MeshBasicMaterial({ map: stexture });
const s = new THREE.Mesh(sGeometry, sMaterial);
s.position.y = -40;
helpers.push(s);

const eGeometry = new THREE.BoxGeometry(10, 10, 10)
const etexture = new THREE.TextureLoader().load( 'e.png' );
const eMaterial = new THREE.MeshBasicMaterial({ map: etexture });
const e = new THREE.Mesh(eGeometry, eMaterial);
e.position.x = -40;
helpers.push(e);

const qGeometry = new THREE.BoxGeometry(10, 10, 10)
const qtexture = new THREE.TextureLoader().load( 'q.png' );
const qMaterial = new THREE.MeshBasicMaterial({ map: qtexture });
const q = new THREE.Mesh(qGeometry, qMaterial);
q.position.x = 40;
helpers.push(q);

const aGeometry = new THREE.BoxGeometry(10, 10, 10)
const atexture = new THREE.TextureLoader().load( 'a.png' );
const aMaterial = new THREE.MeshBasicMaterial({ map: atexture });
const a = new THREE.Mesh(aGeometry, aMaterial);
a.position.z = 40;
helpers.push(a);

const dGeometry = new THREE.BoxGeometry(10, 10, 10)
const dtexture = new THREE.TextureLoader().load( 'd.png' );
const dMaterial = new THREE.MeshBasicMaterial({ map: dtexture });
const d = new THREE.Mesh(dGeometry, dMaterial);
d.position.z = -40;
helpers.push(d);

export { helpers }