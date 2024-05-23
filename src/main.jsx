import * as THREE from 'three';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const controls = new OrbitControls(camera, renderer.domElement);

// Crear una luz ambiental
const ambientLight = new THREE.AmbientLight(
0x404040); // soft white light
scene.add(ambientLight);

// Crear una luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0); // change the direction of the light
scene.add(directionalLight);

// Crear una cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // Use MeshPhongMaterial for better lighting
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Crear un renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Añadir el renderizador al documento
document.body.appendChild(renderer.domElement);

// Renderizar la escena
renderer.render(scene, camera);
