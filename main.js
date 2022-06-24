import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import arenPath from './aren.jpeg'
import earthPath from './earth_map.jpeg'
import normalPath from './normal_map.webp'
import spacePath from './space.jpeg'
import meta from './meta.png'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight)
camera.position.z = 15


renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: '#FF6347'})
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight('#ffffff')
pointLight.position.set(10,10,10)

const ambientLight = new THREE.AmbientLight('#ffffff')

scene.add(pointLight, ambientLight)

const controls = new OrbitControls( camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: '#ffffff'})
  const star = new THREE.Mesh(geometry, material)


  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load(spacePath)
scene.background = spaceTexture

const arenTexture = new THREE.TextureLoader().load(arenPath)

const aren = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: arenTexture})
)

scene.add(aren)

const earthTexture = new THREE.TextureLoader().load(earthPath)
const normalTexture = new THREE.TextureLoader().load(normalPath)

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normalTexture
  })
)

scene.add(earth)

earth.position.z = 30
earth.position.x = -10
earth.rotation.x = 0.2

function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  earth.rotation.y += 0.075

  aren.rotation.y += 0.01
  aren.rotation.z += 0.01

  camera.position.z = 15 + t * -0.03
  camera.position.x = t * -0.001
  camera.rotation.y = t * -0.005
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()
  renderer.render(scene, camera)
}

animate()
