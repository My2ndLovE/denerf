/**
 * Three.js Black Hole Animation
 * Creates an animated 3D background with tech logos and wireframe shapes
 */

import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Scene setup
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050810, 0.02);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas'),
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x050810, 1);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00d9ff, 1, 50);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xa855f7, 1, 50);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

camera.position.z = 15;

const mainGroup = new THREE.Group();
scene.add(mainGroup);

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Tech Logos
const techLogos = [
    { name: 'react', url: 'https://cdn.simpleicons.org/react/61DAFB' },
    { name: 'python', url: 'https://cdn.simpleicons.org/python/3776AB' },
    { name: 'typescript', url: 'https://cdn.simpleicons.org/typescript/3178C6' },
    { name: 'docker', url: 'https://cdn.simpleicons.org/docker/2496ED' },
    { name: 'aws', url: 'https://unpkg.com/simple-icons@v9/icons/amazonaws.svg' },
    { name: 'git', url: 'https://cdn.simpleicons.org/git/F05032' },
    { name: 'node', url: 'https://cdn.simpleicons.org/nodedotjs/339933' },
    { name: 'kubernetes', url: 'https://cdn.simpleicons.org/kubernetes/326CE5' },
    { name: 'rust', url: 'https://cdn.simpleicons.org/rust/000000/white' },
    { name: 'go', url: 'https://cdn.simpleicons.org/go/00ADD8' },
    { name: 'dotnet', url: 'https://cdn.simpleicons.org/dotnet/512BD4' },
    { name: 'azure', url: 'https://unpkg.com/simple-icons@v9/icons/microsoftazure.svg' },
    { name: 'sqlserver', url: 'https://unpkg.com/simple-icons@v9/icons/microsoftsqlserver.svg' },
    { name: 'postgresql', url: 'https://cdn.simpleicons.org/postgresql/4169E1' }
];

// Create Logo Mesh
function createLogoMesh(url, size) {
    const texture = textureLoader.load(url);
    texture.colorSpace = THREE.SRGBColorSpace;

    const isCube = Math.random() > 0.5;
    let geometry;

    if (isCube) {
        geometry = new THREE.BoxGeometry(size, size, size);
    } else {
        geometry = new THREE.CylinderGeometry(size / 1.5, size / 1.5, size / 5, 32);
        geometry.rotateX(Math.PI / 2);
    }

    const material = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        roughness: 0.4,
        metalness: 0.3,
        color: 0xffffff
    });

    return new THREE.Mesh(geometry, material);
}

// Create Wireframe Tech Shapes
function createTechGeometry(type, size, color, opacity) {
    let geometry;
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: opacity
    });

    switch (type) {
        case 'box':
            geometry = new THREE.BoxGeometry(size, size * 1.2, size);
            break;
        case 'database':
            geometry = new THREE.CylinderGeometry(size * 0.6, size * 0.6, size, 16);
            break;
        case 'node':
            geometry = new THREE.IcosahedronGeometry(size * 0.7, 0);
            break;
        case 'grid':
            geometry = new THREE.PlaneGeometry(size * 2, size * 2, 4, 4);
            break;
        default:
            geometry = new THREE.BoxGeometry(size, size, size);
    }

    return new THREE.Mesh(geometry, material);
}

// Colors
const colors = {
    cyan: 0x22d3ee,
    blue: 0x3b82f6,
    purple: 0xa855f7,
    dim: 0x475569
};

const shapes = [];
const techShapes = ['box', 'database', 'node', 'grid'];
const totalObjects = 100;

// Generate Objects
for (let i = 0; i < totalObjects; i++) {
    const isLogo = Math.random() < 0.8;
    let object;

    if (isLogo) {
        const logoData = techLogos[Math.floor(Math.random() * techLogos.length)];
        object = createLogoMesh(logoData.url, Math.random() * 0.8 + 0.6);
    } else {
        const type = techShapes[Math.floor(Math.random() * techShapes.length)];
        object = createTechGeometry(type, Math.random() * 0.8 + 0.5, colors.cyan, 0.8);
    }

    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 40 + 10;
    const z = (Math.random() - 0.5) * 20;

    object.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z
    );

    object.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );

    mainGroup.add(object);

    shapes.push({
        mesh: object,
        angle: angle,
        radius: radius,
        z: z,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        orbitSpeed: Math.random() * 0.002 + 0.001,
        inwardSpeed: Math.random() * 0.02 + 0.01
    });
}

// Scroll and Mouse Variables
let scrollY = 0;
let lastScrollY = 0;
let scrollSpeed = 0;
let mouseX = 0;
let mouseY = 0;

// Mouse Movement
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Scroll Tracking
ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
        scrollY = self.progress;
        const delta = Math.abs(self.scroll() - lastScrollY);
        scrollSpeed += delta * 0.05;
        scrollSpeed = Math.min(scrollSpeed, 2.0);
        lastScrollY = self.scroll();
    }
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    scrollSpeed *= 0.96;
    if (scrollSpeed < 0.001) scrollSpeed = 0;

    // Mouse Parallax
    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.08;
    camera.position.y += (mouseY * 1.5 - camera.position.y) * 0.08;
    camera.lookAt(0, 0, 0);

    // Black Hole Animation
    shapes.forEach((shape) => {
        const { mesh } = shape;

        const currentOrbitSpeed = shape.orbitSpeed + (scrollSpeed * 0.01);
        const currentInwardSpeed = shape.inwardSpeed + (scrollSpeed * 0.1);

        shape.angle += currentOrbitSpeed;
        shape.radius -= currentInwardSpeed;

        let targetOpacity = 1;

        if (shape.radius < 15) {
            targetOpacity = Math.max(0, (shape.radius - 2) / 13);
        } else if (shape.radius > 45) {
            targetOpacity = Math.max(0, (55 - shape.radius) / 10);
        }

        mesh.material.opacity = targetOpacity * 0.9;

        if (shape.radius < 2) {
            shape.radius = 50 + Math.random() * 10;
            shape.angle = Math.random() * Math.PI * 2;
            shape.z = (Math.random() - 0.5) * 20;
            mesh.material.opacity = 0;
        }

        mesh.position.x = Math.cos(shape.angle) * shape.radius;
        mesh.position.y = Math.sin(shape.angle) * shape.radius;
        mesh.position.z = shape.z;

        mesh.rotation.x += shape.rotationSpeed;
        mesh.rotation.y += shape.rotationSpeed;
    });

    renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Animation
animate();

// Export for use in page-specific scripts
export { gsap, ScrollTrigger };
