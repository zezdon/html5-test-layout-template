let scene, camera, renderer, sphere, particlesMesh, canvas,geometry, particlesGeometry;

function init() {
    // Texture loader
    const loader = new THREE.TextureLoader();
    const cross = loader.load('http://webbsajt.com/vtest/textures/christian-cross-transparent-background.png');

    // Canvas
    canvas = document.querySelector('canvas.webgl');

    // Scene    
    scene = new THREE.Scene( );
    //scene.background = new THREE.Color( 0xffffff );

    // Objects
    geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

    particlesGeometry = new THREE.BufferGeometry;
    const particlesCnt = 5000;

    const posArray = new Float32Array(particlesCnt * 3);

    for(let i = 0; i < particlesCnt * 3; i++) {
        //posArray[i] = Math.random() - 0.5
        //posArray[i] = (Math.random() - 0.5) * 5
        posArray[i] = (Math.random() - 0.5) * (Math.random() * 5)
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));    
                
    // Materials
    const material = new THREE.PointsMaterial({
        size: 0.005   
    })

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        map: cross,
        transparent: true,
        color: ''
    })

    // Mesh
    sphere = new THREE.Points(geometry,material)
    particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(sphere, particlesMesh)

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)

    // Base Camera  
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    scene.add(camera);

    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});    
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    document.body.appendChild( renderer.domElement );            
}

document.addEventListener('mousemove', animateParticles)

let mouseX = 0
let mouseY = 0

function animateParticles(event) {
    mouseX = event.clientX
    mouseY = event.clientY
}

// Animate

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.x = .5 * elapsedTime;    
    sphere.rotation.y = .5 * elapsedTime;

    particlesMesh.rotation.y = -.1 * elapsedTime    

    if (mouseX > 0) {
        particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00008)
        particlesMesh.rotation.y = -mouseX * (elapsedTime * 0.00008)        
    }

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
