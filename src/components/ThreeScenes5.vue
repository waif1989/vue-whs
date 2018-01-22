<template>
  <div>
    <div id="threescenes5"></div>
  </div>
</template>

<style>
  #threescenes5 {
    width: 100%;
    overflow-x: hidden;
  }
</style>

<script>
  import detector from '../utils/detector';
  import * as THREE from 'three';
  import * as OrbitControls from 'three-orbitcontrols';
  import ROBO from '@/assets/models/scenes/robo_pigeon.json';
  export default {
    data () {
      return {
        scene: null,
        camera: null,
        renderer: null,
        container: null
      }
    },
    methods: {
      render () {
        if ( this.scene !== undefined ) {
          this.renderer.render( this.scene, this.camera );
        }
      },
      threePointLight () {
        let directionalLight = null;
        directionalLight = new THREE.DirectionalLight( 0xb8b8b8 );
        directionalLight.position.set( 1, 1, 1 ).normalize();
        directionalLight.intensity = 1.0;
        this.scene.add( directionalLight );

        directionalLight = new THREE.DirectionalLight( 0xb8b8b8 );
        directionalLight.position.set( - 1, 0.6, 0.5 ).normalize();
        directionalLight.intensity = 0.5;
        this.scene.add( directionalLight );

        directionalLight = new THREE.DirectionalLight();
        directionalLight.position.set( - 0.3, 0.6, - 0.8 ).normalize( 0xb8b8b8 );
        directionalLight.intensity = 0.45;
        this.scene.add( directionalLight );
      },
      setupScene ( result ) {
        this.scene = result;
        this.scene.add( new THREE.GridHelper( 20, 8 ) );
        this.threePointLight();
        this.render();
      },
      loadMSGPack () {
        const loader = new THREE.ObjectLoader();
        const object = loader.parse( ROBO );
        this.setupScene( object );
      },
      onWindowResize () {
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.render();
      },
      init () {
        this.container = document.getElementById( 'threescenes5' );
        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true	} );
        this.renderer.setClearColor( 0x000000, 0 );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.container.appendChild( this.renderer.domElement );

        const aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera = new THREE.PerspectiveCamera( 60, aspect, 0.01, 50 );
        this.camera.position.set( 5, 5, 5 );
        this.camera.updateProjectionMatrix();

        const orbit = new OrbitControls( this.camera, this.container );
        orbit.addEventListener( 'change', this.render );
        const target = new THREE.Vector3( 0, 1, 0 );
        this.camera.lookAt( target );
        orbit.target = target;
        window.addEventListener( 'resize', this.onWindowResize, false );
        this.loadMSGPack();
      }
    },
    mounted () {
      if ( !detector.webgl ) detector.addGetWebGLMessage();
      this.init();
    }
  }
</script>
