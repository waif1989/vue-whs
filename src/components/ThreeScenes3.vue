<template>
  <div id="threescenes3"></div>
</template>

<style>
  #threescenes3 {
    width: 100%;
    overflow-x: hidden;
  }
</style>

<script>
  import detector from '../utils/detector'
  import * as THREE from 'three'
  import * as OrbitControls from 'three-orbitcontrols'
  export default {
    mounted () {
        // Create a scene which will hold all our meshes to be rendered
        const scene = new THREE.Scene();

        // Create and position a camera
        const camera = new THREE.PerspectiveCamera(
          60,                                   // Field of view
          window.innerWidth/window.innerHeight, // Aspect ratio
          0.1,                                  // Near clipping pane
          1000                                  // Far clipping pane
        );

        // Reposition the camera
        camera.position.set(0,30,50);

        // Point the camera at a given coordinate
        camera.lookAt(new THREE.Vector3(0,15,0))

        // Create a renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });

        // Size should be the same as the window
        renderer.setSize( window.innerWidth, window.innerHeight );

        // Set a near white clear color (default is black)
        renderer.setClearColor( 0xfff6e6 );

        // Enable shadow mapping
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Append to the document
        document.getElementById('threescenes3').appendChild( renderer.domElement );

        // Add an ambient lights
        const ambientLight = new THREE.AmbientLight( 0xffffff, 0.3 );
        scene.add( ambientLight );

        // Add a point light that will cast shadows
        const pointLight = new THREE.PointLight( 0xffffff, 1 );
        pointLight.position.set( 25, 50, 25 );
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 1024;
        pointLight.shadow.mapSize.height = 1024;
        scene.add( pointLight );

        // A basic material that shows the ground
        const shadowMaterial = new THREE.ShadowMaterial( { color: 0xeeeeee } );
        shadowMaterial.opacity = 0.5;
        const groundMesh = new THREE.Mesh(
          new THREE.BoxGeometry( 100, .1, 100 ),
          shadowMaterial
        );
        groundMesh.receiveShadow = true;
        scene.add( groundMesh );

        // Render the scene/camera combnation
        renderer.render(scene, camera);


        ///////////////////////////////////////////////////
        const Decoration = function() {

          // Run the Group constructor with the given arguments
          THREE.Group.apply(this, arguments);

          this.rotationSpeed = Math.random() * 0.02 + 0.005;
          this.rotationPosition = Math.random();

          // A random color assignment
          const colors = ['#ff0051', '#f56762','#a53c6c','#f19fa0','#72bdbf','#47689b'];

          // The main bauble is an Octahedron
          const bauble = new THREE.Mesh(
            addNoise(new THREE.OctahedronGeometry(12,1), 2),
            new THREE.MeshStandardMaterial( {
              color: colors[Math.floor(Math.random()*colors.length)],
              shading: THREE.FlatShading ,
              metalness: 0,
              roughness: 0.8,
              refractionRatio: 0.25
            } )
          );
          bauble.castShadow = true;
          bauble.receiveShadow = true;
          bauble.rotateZ(Math.random()*Math.PI*2);
          bauble.rotateY(Math.random()*Math.PI*2);
          this.add(bauble);

          // A cylinder to represent the top attachement
          const shapeOne = new THREE.Mesh(
            addNoise(new THREE.CylinderGeometry(4, 6, 10, 6, 1), 0.5),
            new THREE.MeshStandardMaterial( {
              color: 0xf8db08,
              shading: THREE.FlatShading ,
              metalness: 0,
              roughness: 0.8,
              refractionRatio: 0.25
            } )
          );
          shapeOne.position.y += 8;
          shapeOne.castShadow = true;
          shapeOne.receiveShadow = true;
          this.add(shapeOne);

          // A Torus to represent the top hook
          const shapeTwo = new THREE.Mesh(
            addNoise(new THREE.TorusGeometry( 2,1, 6, 4, Math.PI), 0.2),
            new THREE.MeshStandardMaterial( {
              color: 0xf8db08,
              shading: THREE.FlatShading ,
              metalness: 0,
              roughness: 0.8,
              refractionRatio: 0.25

            } )
          );
          shapeTwo.position.y += 13;
          shapeTwo.castShadow = true;
          shapeTwo.receiveShadow = true;
          this.add(shapeTwo);

        };
        Decoration.prototype = Object.create(THREE.Group.prototype);
        Decoration.prototype.constructor = Decoration;
        Decoration.prototype.updatePosition = function() {
          this.rotationPosition += this.rotationSpeed;
          this.rotation.y = (Math.sin(this.rotationPosition));
        };

        const decorations = [];
        // Add some new instances of our decoration
        const decoration1 = new Decoration();
        decoration1.position.y += 10;
        scene.add(decoration1);
        decorations.push(decoration1);

        const decoration2 = new Decoration();
        decoration2.position.set(20,15,-10);
        decoration2.scale.set(.8,.8,.8);
        scene.add(decoration2);
        decorations.push(decoration2);

        const decoration3 = new Decoration();
        decoration3.position.set(-20,20,-12);
        scene.add(decoration3);
        decorations.push(decoration3);
        ////////////////////////////////////////////////////////////////

        // Add an orbit control which allows us to move around the scene. See the three.js example for more details
        // https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.target = new THREE.Vector3(0,15,0);
        controls.maxPolarAngle = Math.PI / 2;
        controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );

        requestAnimationFrame(render);

        function render() {

          controls.update();

          // Update the decoration positions
          for(var d = 0; d < decorations.length; d++) {
            decorations[d].updatePosition();
          }

          // Render the scene/camera combnation
          renderer.render(scene, camera);

          // Repeat
          requestAnimationFrame(render);
        }

        // add this only if there is no animation loop (requestAnimationFrame)

        /**
         * Helper function to add random noise to geometry vertixes
         *
         * @param geometry The geometry to alter
         * @param noiseX Amount of noise on the X axis
         * @param noiseY Amount of noise on the Y axis
         * @param noiseZ Amount of noise on the Z axis
         * @returns the geometry object
         */
        function addNoise(geometry, noiseX, noiseY, noiseZ) {

          noiseX = noiseX || 2;
          noiseY = noiseY || noiseX;
          noiseZ = noiseZ || noiseY;

          // loop through each vertix in the geometry and move it randomly
          for(var i = 0; i < geometry.vertices.length; i++){
            var v = geometry.vertices[i];
            v.x += -noiseX / 2 + Math.random() * noiseX;
            v.y += -noiseY / 2 + Math.random() * noiseY;
            v.z += -noiseZ / 2 + Math.random() * noiseZ;
          }

          return geometry;
        }
    }
  }
</script>
