
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


import { GLTFLoader } from 'three';

const gltfLoader = new GLTFLoader();
gltfLoader.load('/DamagedHelmet.glb', function (gltf) {
  gltf.scene.scale.set(10.0, 10.0, 10.0);
  scene.add(gltf.scene);
});


// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create controls
const controls = new OrbitControls(camera, renderer.domElement);

// Create a light
const light = new THREE.Ambient
Light(0x404040); // soft white light
scene.add(light);

// Add a render loop
function animate() {
  requestAnimationFrame(animate);

  // Render the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
