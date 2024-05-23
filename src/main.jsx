// Suggested code may be subject to a license. Learn more: ~LicenseLog:2033501394.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2733373037.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3034748638.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3802863081.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2677389203.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3394255726.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Geometry
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lighting
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
