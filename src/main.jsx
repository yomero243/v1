import './reset.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

// Crear un elemento contenedor para el canvas
const canvasContainer = document.createElement('div');
canvasContainer.style.width = '400px'; // Establecer el ancho del contenedor
canvasContainer.style.height = '300px'; // Establecer la altura del contenedor
canvasContainer.style.border = '1px solid #000'; // Agregar un borde al contenedor
canvasContainer.style.borderRadius = '15px'; // Bordes curvos
canvasContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Sombra
canvasContainer.style.overflow = 'hidden'; // Asegurar que los bordes curvos se apliquen al canvas
canvasContainer.style.position = 'absolute'; // Hacer que el contenedor sea absoluto
canvasContainer.style.top = '20px'; // Posicionar el contenedor un poco hacia abajo
canvasContainer.style.left = '50%'; // Centrar horizontalmente
canvasContainer.style.transform = 'translateX(-50%)'; // Ajustar para centrar completamente
document.body.appendChild(canvasContainer);

let camera, scene, renderer, controls;

// Inicializar la cámara
camera = new THREE.PerspectiveCamera(45, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.25, 1000);
camera.position.set(30.5, 10.5, 10.0);

// Inicializar la escena
scene = new THREE.Scene();

// Cargar el modelo GLTF
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  'public/DamagedHelmet.glb',
  function (gltf) {
    gltf.scene.scale.set(10.0, 10.0, 10.0);
    scene.add(gltf.scene);
    console.log('GLTF model loaded successfully');
  },
);

// Cargar el mapa ambiental
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
'/public/studio_small_08_1k.hdr',
  function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture; // Usar la textura HDR como fondo
    console.log('Environment map loaded successfully');
  },
);

// Inicializar el renderizador
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
canvasContainer.appendChild(renderer.domElement);

// Inicializar los OrbitControls
controls = new OrbitControls(camera, renderer.domElement);

// Función de animación
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Actualizar controles
  renderer.render(scene, camera);
}

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', () => {
  camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
});

// Iniciar la animación
animate();
