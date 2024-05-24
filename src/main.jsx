
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let camera, scene, renderer, controls;

// Inicializar la cámara
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 1000);
camera.position.set(30.5, 10.5, 10.0);

// Inicializar la escena
scene = new THREE.Scene();

// Cargar el mapa de entorno
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/royal_esplanade_4k.hdr', function (texture) {
texture.mapping = THREE.EquirectangularReflectionMapping;

scene.background = texture;
scene.environment = texture;

} );

// Cargar el modelo GLTF
const gltfLoader = new GLTFLoader();
gltfLoader.load('/DamagedHelmet.glb', function (gltf) {
  gltf.scene.scale.set(10.0, 10.0, 10.0);
  scene.add(gltf.scene);
});

// Inicializar el renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Inicializar los controles OrbitControls
controls = new OrbitControls(camera, renderer.domElement);

// Función de animación
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Iniciar la animación
animate();