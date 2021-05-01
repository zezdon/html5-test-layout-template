let scene, camera, renderer, sphere, particlesMesh, canvas,geometry, particlesGeometry;

function init() {
    // Texture loader
    const loader = new THREE.TextureLoader();
    const texture = loader.load('http://webbsajt.com/vtest/textures/d_45749609_change.jpg');
    const height = loader.load('http://webbsajt.com/vtest/textures/Rock_01_h.jpg');
    const alpha = loader.load('http://webbsajt.com/vtest/textures/tsctcqx.jpg');
    // Canvas
    canvas = document.querySelector('canvas.webgl');

    // Scene    
    scene = new THREE.Scene( );
    //scene.background = new THREE.Color( 0xffffff );

    // Objects
    geometry = new THREE.PlaneBufferGeometry( 3, 3, 64, 64 );
                   
    // Materials
    const material = new THREE.MeshStandardMaterial({
        color: 'gray',
        map: texture,
        displacementMap: height,
        displacementScale: .2,
        alphaMap: alpha,
        transparent: true,
        depthTest: false
    })

    // Mesh
    plane = new THREE.Mesh(geometry,material)
    scene.add(plane)
    plane.rotation.x = 181

    // Lights
    const pointLight = new THREE.PointLight('#00b3ff', 3)
    pointLight.position.x = .2
    pointLight.position.y = 10
    pointLight.position.z = 4.4
    scene.add(pointLight)

    // Base Camera  
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 3;
    scene.add(camera);

    // Renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });    
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    document.body.appendChild( renderer.domElement );            
}

// Animate

document.addEventListener('mousemove', animateTerrain);

let mouseY = 0;

function animateTerrain(event) {
    mouseY = event.clientY;

}

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    plane.rotation.z = .5 * elapsedTime;
    plane.material.displacementScale = .1 + mouseY * 0.0008;

    // Render
    renderer.render(scene, camera);
    // Call animate again on the next frame
    requestAnimationFrame(animate);    
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

function onWindowResize() {

    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();
