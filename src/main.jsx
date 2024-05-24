import './reset.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let camera, scene, renderer, controls;

// Initialize the camera
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 1000);
camera.position.set(30.5, 10.5, 10.0);

// Initialize the scene
scene = new THREE.Scene();

// Load the environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  '/royal_esplanade_4k.hdr',
  function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;

    // Load the GLTF model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/DamagedHelmet.glb',
      function (gltf) {
        gltf.scene.scale.set(10.0, 10.0, 10.0);
        scene.add(gltf.scene);
        console.log('GLTF model loaded successfully');
      },
      undefined,
      function (error) {
        console.error('An error occurred while loading the GLTF model:', error);
      }
    );
  },
  undefined,
  function (error) {
    console.error('An error occurred while loading the HDR texture:', error);
  }
);

// Initialize the renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding; // Set output encoding
document.body.appendChild(renderer.domElement);

// Initialize the OrbitControls
controls = new OrbitControls(camera, renderer.domElement);

// Animation function
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update controls
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation
animate();
