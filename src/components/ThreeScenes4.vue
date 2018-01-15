<template>
  <div>
    <div id="threescenes4">33</div>
  </div>
</template>

<style>
  #threescenes4 {
    width: 100%;
    overflow-x: hidden;
  }
</style>

<script>
  import detector from '../utils/detector'
  import * as THREE from 'three'
  import * as OrbitControls from 'three-orbitcontrols'
  import TEAPOT from '../assets/models/json/teapot-claraio.json'
  export default {
    mounted () {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
      // Reposition the camera
      camera.position.set(0,0.5,10);

      const ambient = new THREE.AmbientLight( 0xffffff );
      scene.add( ambient );

      const directionalLight = new THREE.DirectionalLight( 0xffffff );
      directionalLight.position.set( 0, 0, 1 ).normalize();
      scene.add( directionalLight );

      const loader = new THREE.ObjectLoader();
      var object = loader.parse( TEAPOT );
      scene.add( object );

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setClearColor( 0xfff6e6 );
      renderer.render( scene, camera );
      document.getElementById('threescenes4').appendChild( renderer.domElement );

      const controls = new OrbitControls( camera, renderer.domElement );
      controls.target = new THREE.Vector3(0,0,0);
      controls.maxPolarAngle = Math.PI / 2;
      controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );
    }
  }
</script>
