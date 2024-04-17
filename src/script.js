import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry'





THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
const gui = new lil.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture1 = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture2 = textureLoader.load('/textures/matcaps/3.png')



const fontLoader = new FontLoader()
fontLoader.load(
    'fonts/Poppins.json',(font)=> {
        const textGeometry = new TextGeometry(
            'P',
            {
                font,
                size : 0.5,
                height : 0.2,
                curveSegments: 7,
                // bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4

            }
        )
        const textGeometry1 = new TextGeometry(
            'W',
            {
                font,
                size : 0.5,
                height : 0.2,
                curveSegments: 7,
                // bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4

            }
            
        )
        const textGeometry2 = new TextGeometry(
            'D',
            {
                font,
                size : 0.5,
                height : 0.2,
                curveSegments: 7,
                // bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 4

            }
        )
        const textGeometry3 = new TextGeometry(
            'Digital Agency',
            {
                font,
                size : 0.2,
                height : 0.02,
                curveSegments: 7,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.0001,
                bevelOffset: 0,
                bevelSegments: 4

            }
        )
        
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y -0.2) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // )

        textGeometry.center()
        textGeometry1.center()
        textGeometry2.center()
        textGeometry3.center()
        const textMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
        const textMaterial1 = new THREE.MeshMatcapMaterial({matcap:matcapTexture1,color:"#0192d7"})
        const textMaterial2 = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
        const textMaterial3 = new THREE.MeshMatcapMaterial({matcap:matcapTexture1,color:"#0192d7"})
        const text = new THREE.Mesh(textGeometry,textMaterial)
        const text1 = new THREE.Mesh(textGeometry1,textMaterial1)
        const text2 = new THREE.Mesh(textGeometry2,textMaterial2)
        const text3 = new THREE.Mesh(textGeometry3,textMaterial3)
        console.time('donots')
        const donotGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
        const donotMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
        for(let i=0;i<100;i++)
        {
            const donot = new THREE.Mesh(donotGeometry,donotMaterial)
            donot.position.x = (Math.random() - 0.5) * 10
            donot.position.y = (Math.random() - 0.5) * 10
            donot.position.z = (Math.random() - 0.5) * 10
            // scene.add(donot)
        }
        text.position.x = - 0.6
        text1.position.x = 0
        text2.position.x = 0.7
        text3.position.y = -0.77
        text3.position.z = -3
        
        scene.add(text,text1,text2,text3)
        
        const clock = new THREE.Clock()

        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()
    
            // Update controls
            // controls.update()
            // camera.rotation.y = 0.1 * elapsedTime
            text.rotation.x = scrollY * 0.01
            text1.position.z = scrollY * 0.01
            text1.position.y =- scrollY * 0.002
            text2.rotation.x = -scrollY * 0.01
            text3.rotation.x = -scrollY * 0.01
            text3.position.z = scrollY * 0.015
            
            if(scrollY < 260){
                renderer.render(scene, camera)
                
                document.querySelector('canvas').style.display = "block";
            }else{
                document.querySelector('.spiel-section').style.display = "flex";
                document.querySelector('canvas').style.display = "none";
            }             
            // Render
            
    
            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }
    
        tick()
    }
)

/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight+260
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height )
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = -0.4
camera.position.z = 3
scene.add(camera)



// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true
   
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /**
 * Animate
 */