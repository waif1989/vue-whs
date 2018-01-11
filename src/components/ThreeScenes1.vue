<template>
  <div id="threescenes1"></div>
</template>

<style>
  #threescenes1 {
    width: 100%;
    overflow-x: hidden;
  }
</style>

<script>
  import detector from '../utils/detector'
  import * as THREE from 'three'
  export default {
    name: 'ThreeScenes1',
    created () {
    },
    mounted () {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.getElementById('threescenes1').appendChild( renderer.domElement );
      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const cube = new THREE.Mesh( geometry, material );
      scene.add( cube );

      camera.position.z = 3;
      // camera.rotation.x = 1;
      // camera.rotation.y = 1;
      cube.rotation.x = 1;
      cube.rotation.y = 1;
      function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
      }
      if (detector.webgl) {
        // Initiate function or other initializations here
        animate();
      } else {
        const warning = detector.getWebGLErrorMessage();
        document.getElementById('threescenes1').appendChild(warning);
      }
    }
  }
</script>
