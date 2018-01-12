<template>
  <div>
    <div id="info">Description</div>
    <div id="threescenes1"></div>
  </div>
</template>

<style>
  #threescenes1 {
    width: 100%;
    overflow-x: hidden;
  }
  #info {
    position: relative;
    width: 100%;
    text-align: center;
    z-index: 100;
    display:block;
  }
</style>

<script>
  import detector from '../utils/detector'
  import * as THREE from 'three'
  export default {
    name: 'ThreeScenes1',
    data () {
      return {
        requestAnimationFrameId: null
      }
    },
    created () {
    },
    mounted () {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.getElementById('threescenes1').appendChild( renderer.domElement );

      const boxMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
      const cube = new THREE.Mesh( boxGeometry, boxMaterial );
      scene.add( cube );

      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
      const lineGeometry = new THREE.Geometry();
      lineGeometry.vertices.push(new THREE.Vector3(-10, 0, 0));
      lineGeometry.vertices.push(new THREE.Vector3(0, 10, 0));
      lineGeometry.vertices.push(new THREE.Vector3(10, 0, 0));
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);

      const loader = new THREE.FontLoader();
      const fontMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
      loader.load( '/static/helvetiker_regular.typeface.json', function ( font ) {
        const fontGeometry = new THREE.TextGeometry( 'Hello three.js!', {
          font: font,
          size: 1,
          height: 1,
          curveSegments: 20,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 0.01,
          bevelSegments: 20
        });
        fontGeometry.computeBoundingBox();
        fontGeometry.computeVertexNormals();
        const text = new THREE.Mesh( fontGeometry, fontMaterial );
        text.rotation.x = 0;
        text.rotation.y = Math.PI * 2;
        scene.add(text);
      });

      const dirLight = new THREE.DirectionalLight( 0xffffff, 0.125 );
      dirLight.position.set( 0, 0, 1 ).normalize();
      scene.add( dirLight );

      const pointLight = new THREE.PointLight( 0xffffff, 1.5 );
      pointLight.position.set( 0, 100, 90 );
      scene.add( pointLight );

      // camera.position.z = 3;
      // camera.rotation.x = 1;
      // camera.rotation.y = 1;
      camera.position.set(0, 0, 30);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      cube.rotation.x = 1;
      cube.rotation.y = 1;
      const animate = () => {
        this.requestAnimationFrameId = requestAnimationFrame( animate );
        renderer.render( scene, camera );
      }
      if (detector.webgl) {
        // Initiate function or other initializations here
        animate();
      } else {
        const warning = detector.getWebGLErrorMessage();
        document.getElementById('threescenes1').appendChild(warning);
      }
    },
    beforeDestroy () {
      window.cancelAnimationFrame(this.requestAnimationFrameId)
    },
    destroyed () {
      const container = document.getElementById('threescenes1')
      container.parentNode.removeChild(container)
    }
  }
</script>
