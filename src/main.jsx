import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// Crear una escena
const scene = new THREE.Scene();

// Cargar el modelo GLTF
const gltfLoader = new GLTFLoader();
gltfLoader.load('/DamagedHelmet.glb', function (gltf) {
  gltf.scene.scale.set(10.0, 10.0, 10.0);
  scene.add(gltf.scene);
});

// Crear un HDRI
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/royal_esplanade_4k.hdr', function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});

// Crear una cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Crear un renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear controles
const controls = new OrbitControls(camera, renderer.domElement);

// Crear una luz
const light = new THREE.AmbientLight(0x404040); // luz blanca suave
scene.add(light);

// Añadir un bucle de renderizado
function animate() {
  requestAnimationFrame(animate);

  // Actualizar controles
  controls.update();

  // Renderizar la escena
  renderer.render(scene, camera);
}

// Iniciar la animación
animate();

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
