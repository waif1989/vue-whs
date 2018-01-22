<template>
  <div>
    <div id="feedback"></div>
    <div id="threescenes6"></div>
  </div>
</template>

<style>
  #threescenes6 {
    width: 100%;
    overflow-x: hidden;
  }
</style>

<script>
  import detector from '../utils/detector';
  import * as THREE from 'three';
  import { OBJLoader } from 'three-addons';
  // import * as THREELib from "threejs-addons";
  // const THREE = THREELib();
  import * as OrbitControls from 'three-orbitcontrols';
  import FEMALE02 from '@/assets/models/obj/female02/female02.obj';
  export default {
    mounted () {
      if ( !detector.webgl ) detector.addGetWebGLMessage();

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
      camera.position.set(0,0.5,10);

      const ambient = new THREE.AmbientLight( 0xffffff );
      scene.add( ambient );

      const directionalLight = new THREE.DirectionalLight( 0xffffff );
      directionalLight.position.set( 0, 0, 1 ).normalize();
      scene.add( directionalLight );

      /*const loader = new OBJLoader();
      console.log('loader--', loader)
      loader.load(
        // resource URL
        FEMALE02,
        // called when resource is loaded
        function ( object ) {

          scene.add( object );

        },
        // called when loading is in progresses
        function ( xhr ) {

          console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

          console.log( 'An error happened' );

        }
      );*/
      /*var objLoader = new ObjectLoader();
      objLoader.load(FEMALE02, function (object) {

        scene.add(object);
        object.position.y -= 60;

      });*/

      const loader = new OBJLoader();
     /* const object = loader.parse(FEMALE02);
      scene.add(object);*/
     /* loader.load('../assets/models/obj/female02/female02.obj', (object) => {
        console.log('object---', object)
        object.position.y = -95;
        scene.add(object);
      }, () => {}, () => {});*/
      /*const object = loader.parse(FEMALE02);
      console.log('object--', object)*/

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setClearColor( 0xfff6e6 );
      renderer.render( scene, camera );
      document.getElementById('threescenes6').appendChild( renderer.domElement );

      const controls = new OrbitControls( camera, renderer.domElement );
      controls.target = new THREE.Vector3(0,0,0);
      controls.maxPolarAngle = Math.PI / 2;
      controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );
    }
  }
</script>
