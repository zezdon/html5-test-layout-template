let scene, camera, renderer, cube, sphere, canvas,geometry, geometryCube;

function init() {
    // Canvas
    canvas = document.querySelector('canvas.webgl');

    // Scene    
    scene = new THREE.Scene( );
    scene.background = new THREE.Color( 0xffffff );

    // Objects
    //geometryCube = new THREE.BoxGeometry( 2, 2, 2 );    
    geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

    // Materials
    // const material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    const material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(0xff0000);

    //const textureCube = new THREE.TextureLoader().load('http://webbsajt.com/vtest/textures/crate.gif');
    //const materialCube = new THREE.MeshBasicMaterial({ map: textureCube });

    // Mesh
    sphere = new THREE.Mesh(geometry,material);
    scene.add(sphere);

    //cube = new THREE.Mesh( geometryCube, materialCube );
    //scene.add( cube );

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

// Animate

const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.x = .5 * elapsedTime;    
    sphere.rotation.y = .5 * elapsedTime;

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;    

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
