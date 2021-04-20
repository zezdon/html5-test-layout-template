let scene, camera, renderer, sphere, particlesMesh, canvas, geometry;

function init() {
    // Texture loader
    const loader = new THREE.TextureLoader()
    const cross = loader.load('http://webbsajt.com/vtest/textures/christian-cross-transparent-background.png')
    const normalTexture = loader.load('http://webbsajt.com/vtest/textures/NormalMap.png')

    // Canvas
    canvas = document.querySelector('canvas.webgl');

    // Scene    
    scene = new THREE.Scene( );

    // Objects
    const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

    const particlesGeometry = new THREE.BufferGeometry;
    const particlesCnt = 5000;

    const posArray = new Float32Array(particlesCnt * 3);

    for(let i = 0; i < particlesCnt * 3; i++) {
        //posArray[i] = Math.random() - 0.5
        //posArray[i] = (Math.random() - 0.5) * 5
        posArray[i] = (Math.random() - 0.5) * (Math.random() * 5)
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Materials
    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7
    material.roughness = 0.2
    material.normalMap = normalTexture;

    material.color = new THREE.Color(0x292929)
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        map: cross,
        transparent: true,
        color: ''
    })
    
    // Mesh
    sphere = new THREE.Mesh(geometry,material)
    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(sphere, particlesMesh)

    // Light 1
    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    // Light 2
    const pointLight2 = new THREE.PointLight(0xff0000, 2);
    pointLight2.position.set(-1.86,1,-1.65);
    pointLight2.intensity = 10;
    scene.add(pointLight2);

    // Light 3
    const pointLight3 = new THREE.PointLight(0x96ff00, 2);
    pointLight3.position.set(1.6,-1.52,-1.6);
    pointLight3.intensity = 10;
    scene.add(pointLight3);    

    // Light 4
    const pointLight4 = new THREE.PointLight(0xe1ff, 2);
    pointLight4.position.set(0.69,-3,-1.98);
    pointLight4.intensity = 6.8;
    scene.add(pointLight4);    

    //const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
    //scene.add(pointLightHelper);

    //const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
    //scene.add(pointLightHelper2);    

    // Base Camera  
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    scene.add(camera);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });    
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    document.body.appendChild( renderer.domElement );            
}

// Animate

document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

function updateSphere(event) {
    sphere.position.y = window.scrollY * .001;
}

window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock();

function animate() {

    targetX = mouseX * .001;
    targetY = mouseY * .001;

    const elapsedTime = clock.getElapsedTime();

    // Update objects
    //sphere.rotation.x = .5 * elapsedTime; 
    particlesMesh.rotation.y = -.1 * elapsedTime
       
    sphere.rotation.y = .5 * elapsedTime;

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y);
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x);
    sphere.position.z += -.05 * (targetY - sphere.rotation.x);

    // Render
    renderer.render(scene, camera);
    // Call animate again on the next frame
    requestAnimationFrame(animate);    
}

function onWindowResize() {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // Update renderer
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
