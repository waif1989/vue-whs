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
  import dat from 'dat.gui';
  import Stats from 'stats.js';
  const THREE = require('three');
  require('imports-loader?THREE=three!exports-loader?THREE.OrbitControls!three-extras/controls/OrbitControls');
  require('imports-loader?THREE=three!exports-loader?THREE.OBJLoader!three-extras/loaders/OBJLoader');
  require('imports-loader?THREE=three!exports-loader?THREE.MTLLoader!three-extras/loaders/MTLLoader');
  export default {
    data () {
      return {
        globalObject: null,
        stats: null
      }
    },
    methods: {
      addControlGui (controlObject) {
        const gui = new dat.GUI();
        gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
        gui.add(controlObject, 'opacity', 0.1, 1);
        gui.addColor(controlObject, 'color');
      },
      addStatsObject () {
        this.stats = new Stats();
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        document.body.appendChild( this.stats.domElement );
      },
      isInMobile () {
        if(/android/i.test(navigator.userAgent)){
          return true;
        } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          return true;
        } else if (/MicroMessenger/i.test(navigator.userAgent)) {
          return true;
        } else {
          return false;
        }
      }
    },
    mounted () {
      if ( !detector.webgl ) detector.addGetWebGLMessage();
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
      camera.position.set(-100,300,250);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setClearColor( 0xffffff );
      document.getElementById('threescenes6').appendChild( renderer.domElement );

      let datGUIControl = null;
      if (!this.isInMobile()) {
        // Render function will not work when "addStatsObject" & "addControlGui" execute in mobilephone
        datGUIControl = new function () {
          this.rotationSpeed = 0.005;
          this.opacity = 0.6;
          this.color = 0xe6e1c2;
        };

        this.addStatsObject(); // Show FPS in top left corner of browser
        this.addControlGui(datGUIControl); // Show control bar in top right corner of browser
      }

      const ambient = new THREE.AmbientLight( 0xffffff );
      scene.add( ambient );

      const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.2 );
      directionalLight.position.set( 0, 100, 1 ).normalize();
      scene.add( directionalLight );

      const objLoader = new THREE.OBJLoader();
      const mtlLoader = new THREE.MTLLoader();
      mtlLoader.setPath( '/static/models/obj/female02/' );
      mtlLoader.load( 'female02.mtl', (materials) => {
        materials.preload();
        objLoader.setMaterials(materials);
        objLoader.setPath( '/static/models/obj/female02/' );
        objLoader.load( 'female02.obj',(object) => {
          // object.position.y = - 45;
          console.log('object----', object)
          this.globalObject = object;
          object.position.set(0,0,0);
          scene.add( object );
          if (!this.isInMobile()) {
            object.children.forEach((item) => {
              item.material.opacity = datGUIControl.opacity;
              item.material.color = new THREE.Color(datGUIControl.color);
            });
            this.stats.update();
          }
          renderer.render( scene, camera );
        }, () => {}, () => {} );
      });

      const cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
      cameraControls.target = new THREE.Vector3(0,0,0);
      cameraControls.maxPolarAngle = Math.PI / 2;
      cameraControls.addEventListener( 'change', () => {
        if (!this.isInMobile()) {
          this.globalObject.children.forEach((item) => {
            item.material.opacity = datGUIControl.opacity;
            item.material.color = new THREE.Color(datGUIControl.color);
          });
          this.stats.update();
        }
        renderer.render(scene, camera);
      } );

    }
  }
</script>
