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
  var THREE = require('three');
  require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!three-extras/controls/OrbitControls');
  require('imports-loader?THREE=three!exports-loader?THREE.OBJLoader!three-extras/loaders/OBJLoader');
  require('imports-loader?THREE=three!exports-loader?THREE.MTLLoader!three-extras/loaders/MTLLoader');
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

      const objLoader = new THREE.OBJLoader();
      const mtlLoader = new THREE.MTLLoader();
      mtlLoader.setPath( '/static/models/obj/female02/' );
      mtlLoader.load( 'female02.mtl', (materials) => {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.setPath( '/static/models/obj/female02/' );
        objLoader.load( 'female02.obj',(object) => {
          object.position.y = - 95;
          scene.add( object );
        }, () => {}, () => {} );
      });
      /*objloader.load('/static/models/obj/female02/female02.obj', (object) => {
        const mtlLoader = new MTLLoader();
        mtlLoader.setBaseUrl('/static/models/obj/female02');
        mtlLoader.load('/static/models/obj/female02/female02.mtl', (materials) => {
          materials.preload();
          objloader.setMaterials( materials );
          object.position.y = -95;
          scene.add(object);
        });

      });*/

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setClearColor( 0xfff6e6 );
      renderer.render( scene, camera );
      document.getElementById('threescenes6').appendChild( renderer.domElement );

      const controls = new THREE.OrbitControls( camera, renderer.domElement );
      controls.target = new THREE.Vector3(0,0,0);
      controls.maxPolarAngle = Math.PI / 2;
      controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );
    }
  }
</script>
