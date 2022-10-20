// import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";
import { GreaterStencilFunc } from "three";

var loader = document.getElementById("preloader");
window.addEventListener("load", function(){
  loader.style.display = "none";
})


/**
 * デバッグ(色つけるときに追加) 
 */

/**
 * 必須の3要素
 */
// Canvas
const canvas = document.querySelector("#webgl");

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
//camera.position.y = 2;
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * ここからパーティクルを記述
 */
const donutParticlesGeometry = new THREE.TorusGeometry(2.5, 0.7, 26, 100);

const donutParticlesMaterial = new THREE.PointsMaterial({
  size: 0.02, // Setting size
  color: "blue", // Setting color
});

const donutParticles = new THREE.Points(donutParticlesGeometry, donutParticlesMaterial);

// Add Particles ( Dots )
const count = 5000; // small dot amounts
const particlesGeometry = new THREE.BufferGeometry();
const positionArray = new Float32Array(count *3);

for(let i=0; i < count * 3; i++){
  positionArray[i] = (Math.random()-0.5)*15;
}

particlesGeometry.setAttribute(
  "position", new THREE.BufferAttribute(positionArray, 3)
);

const particlesMateiral = new THREE.PointsMaterial({
  size: 0.01, // Dot size
  color: "blue", // Dot color
});

const particles = new THREE.Points(particlesGeometry, particlesMateiral);

scene.add(donutParticles, particles);  // Add things in scene


//カメラ制御 ( マウス操作 )
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableRotate = false; /* マウスで回すの禁止 */

/**
 * アニメーション
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Camera work ( 回る動作 )
  camera.position.x = Math.cos(elapsedTime *0.5)*6;
  camera.position.z = Math.sin(elapsedTime *0.5)*6;

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

//ブラウザのリサイズ操作
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
