<template>
  <div id="whs"></div>
</template>

<script>
  import * as WHS from 'whs'
  import {
    BufferGeometry,
    Mesh,
    ParametricGeometry,
    MeshPhongMaterial,
    PCFSoftShadowMap,
    Vector3
  } from 'three';
  export default {
    name: 'Whs',
    data () {
      return {
        app: null
      }
    },
    created () {

    },
    mounted () {
      this.app = new WHS.App([
        new WHS.ElementModule({
          container: document.getElementById('whs')
        }),
        new WHS.SceneModule(),
        new WHS.CameraModule({
          position: {
            y: 10,
            z: 50
          }
        }),
        new WHS.RenderingModule({
          bgColor: 0x162129,

          renderer: {
            antialias: true,
            shadowmap: {
              type: PCFSoftShadowMap
            }
          }
        }, {shadow: true}),
        new WHS.OrbitControlsModule({
          follow: false
        }),
        new WHS.ResizeModule()
      ]);
      // Sphere
      const sphere = new WHS.Sphere({ // Create sphere comonent.
        geometry: {
          radius: 5,
          widthSegments: 32,
          heightSegments: 32
        },

        material: new MeshPhongMaterial({
          color: 0xF2F2F2
        }),

        position: new Vector3(0, 5, 0)
      });
      sphere.addTo(this.app);
      // Plane
      new WHS.Plane({
        geometry: {
          width: 100,
          height: 100
        },

        material: new MeshPhongMaterial({color: 0x447F8B}),

        rotation: {
          x: -Math.PI / 2
        }
      }).addTo(this.app);
      // Lights
      new WHS.PointLight({
        light: {
          intensity: 0.5,
          distance: 100
        },

        shadow: {
          fov: 90
        },

        position: new Vector3(0, 10, 10)
      }).addTo(this.app);
      // AmbientLight
      new WHS.AmbientLight({
        light: {
          intensity: 0.4
        }
      }).addTo(this.app);
      this.app.start()
    }
  }
</script>

<style scoped>
  #whs {
    width: 500px;
    height: 500px;
    margin: auto;
  }
</style>
