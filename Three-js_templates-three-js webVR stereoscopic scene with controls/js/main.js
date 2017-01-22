/**
 * @fileOverview three-js-scene-template, main.js, dev
 * @version 1.0
 */
 
 
//'use strict';

// ================================================================================================================
//  three.js scene
//
//  NOTES:
//  just like in OpenGL, three basic components are included:
//		i) rendering surface scene, to draw on
//		ii) render loop
//		iii) projection mode: viewing frustum matrix 
//
//  and then appended to <body>, 
//	with added VRControls
//
//  c.f.: https://threejs.org/docs/
// ================================================================================================================
// https://css-tricks.com/reactive-audio-webvr/

// global vars (without a namespace):
var camera, 
	scene,
	renderer,
	effect,					// VREffect.js
	vrDisplay,
	controls,				// VRControls.js	
	cubes = [],
	numCubes = 100;			// nr of cubes

init();
draw();

function init() {
	scene = new THREE.Scene();
	
	/**
	* PerspectiveCamera(fov, aspect, near, far)
	*/
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);



	renderer = new THREE.WebGLRenderer();
	document.body.appendChild(renderer.domElement);
	
	controls = new THREE.VRControls(camera);	// pass the controls to camera
	
	// the stereoscopic effect
	effect = new THREE.VREffect(renderer);
	effect.setSize(window.innerWidth, window.innerHeight);
	
	// get connected VR devices
	navigator.getVRDisplays().then(function(displays) {
    	if(displays.length > 0) {
    		vrDisplay = displays[0];	// set to 1st connected device, "Google Card" from WebVR Polyfill
   		}  
	});
}


function draw() {
	var material, geometry, mesh;
	
	for(var i = 0; i < numCubes; i++) {
		material = new THREE.MeshNormalMaterial();
		geometry = new THREE.BoxGeometry(50, 50, 50);
		mesh = new THREE.Mesh(geometry, material);
	
		// random positions
		mesh.position.x = (Math.random() * 1000) - 500;
		mesh.position.y = (Math.random() * 1000) - 500;
		mesh.position.z = (Math.random() * 1000) - 500;
	
		scene.add(mesh);
	  
		// push mesh in array
		cubes.push(mesh);
	}
}



// render loop at 60 fps:
var render = function () {
	requestAnimationFrame(render);

	 // cubes
	  for (var i = 0; i < numCubes; i++) {
		  cubes[i].rotation.x += 0.01;
		  cubes[i].rotation.y += 0.02;
	  }

	controls.update();					// update controls
	//renderer.render(scene, camera);		// render the scene with camera
	effect.render(scene, camera);
};
render();


// enable vrDisplay on click
// requestPresent must be on an event listener
document.querySelector('#VRConnect').addEventListener('click', function() {
	vrDisplay.requestPresent([{source: renderer.domElement}]);
});


// window.onresize common
function onResize() {
	effect.setSize(window.innerWidth, window.innerHeight);
  	camera.aspect = window.innerWidth / window.innerHeight;
  	camera.updateProjectionMatrix();
}

// call onResize() on vrdisplaypresentchange and resize
window.addEventListener('vrdisplaypresentchange', onResize);
window.addEventListener('resize', onResize);