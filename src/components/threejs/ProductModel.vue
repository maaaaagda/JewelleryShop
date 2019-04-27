<template>
  <div >
    <div v-show="!loading" ref="container" class="model-container" >
    </div>
    <v-container align-content-center v-show="loading" class="model-container">
      <v-layout align-center justify-center row fill-height>
          <Loader/>
       </v-layout>
    </v-container>
  </div>
</template>

<script>
import GLTFLoader from 'three-gltf-loader'
import ring from './models/ring.gltf'
import Loader from '../Loader'
const THREE = require('three')
const OrbitControls = require('three-orbitcontrols')

export default {
  components: { Loader },
  data: () => ({
    container: '',
    stats: '',
    camera: '',
    scene: '',
    projector: '',
    renderer: '',
    loading: true,
    containerSize: 500
  }),
  methods: {
    init () {
      this.camera = new THREE.PerspectiveCamera(50, 1, 5, 1000)
      this.camera.position.set(0, 0, 30)
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color('rgb(237,237,237)')

      let slight = new THREE.AmbientLight('rgb(247,247,247)', 0.5)
      this.scene.add(slight)
      var light = new THREE.SpotLight('rgb(228,228,228)', 0.7)
      light.position.set(0, 300, 0)
      light.castShadow = true
      light.shadow.radius = 1
      light.angle = Math.PI / 10
      light.shadow.mapSize.width = 2048
      light.shadow.mapSize.height = 2048
      this.scene.add(light)

      let geometry = new THREE.PlaneGeometry(100, 100, 1, 1)
      let material = new THREE.ShadowMaterial()
      material.opacity = 0.5

      let floor = new THREE.Mesh(geometry, material)
      floor.receiveShadow = true
      floor.rotateX(300)
      floor.position.set(0, -7, 0)
      this.scene.add(floor)

      const urls = ['bedroom.jpg', 'window.jpg', 'ceilling.jpg', 'floor.jpg',
        'ceilling.jpg', 'ceilling.jpg'].map(url => require('./images/' + url))
      let textureCube = new THREE.CubeTextureLoader().load(urls)
      textureCube.format = THREE.RGBFormat
      textureCube.mapping = THREE.CubeReflectionMapping
      textureCube.encoding = THREE.sRGBEncoding

      let textureLoader = new THREE.TextureLoader()
      let goldTexture = textureLoader.load(require('./images/gold.jpg'))
      const loader = new GLTFLoader()
      loader.setCrossOrigin('anonymous')
      loader.load(
        ring, (gltf) => {
          const root = gltf.scene
          root.traverse(function (node) {
            if (node.isMesh) {
              if (node.material) {
                let ringMaterial
                if (!node.name.includes('diamondpink')) {
                  ringMaterial = new THREE.MeshStandardMaterial({ envMap: textureCube })
                  ringMaterial.emissive = new THREE.Color('rgb(158,135,71)')
                  ringMaterial.emissiveMap = goldTexture
                  ringMaterial.color = new THREE.Color('rgb(158,135,71)')
                  ringMaterial.metalness = 0.9
                  ringMaterial.roughness = 0.2
                } else {
                  ringMaterial = new THREE.MeshPhongMaterial({ envMap: textureCube })
                  ringMaterial.emissive = new THREE.Color('rgb(254,255,247)')
                  ringMaterial.color = new THREE.Color('rgb(155,177,202)')
                  ringMaterial.specular = new THREE.Color('rgb(56,65,104)')
                  ringMaterial.metalness = 0.8
                  ringMaterial.roughness = 0.5
                }
                node.receiveShadow = false
                node.material = ringMaterial
                node.material.needsUpdate = true
              }
            }
            node.castShadow = true
          })
          root.position.set(0, -8, 0)
          this.scene.add(root)
          this.loading = false
        }, (xhr) => {
          console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`)
        })

      this.renderer = new THREE.WebGLRenderer({antialias: true})
      this.renderer.gammaOutput = true
      this.renderer.gammaFactor = 2.2
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(this.containerSize, this.containerSize)
      this.container.appendChild(this.renderer.domElement)

      let controls = new OrbitControls(this.camera, this.renderer.domElement)
      controls.enableZoom = true
      controls.minPolarAngle = -Math.PI / 2
      controls.maxPolarAngle = Math.PI / 2
      let axesHelper = new THREE.AxesHelper(50)
      this.scene.add(axesHelper)

      let helper = new THREE.CameraHelper(light.shadow.camera)
      this.scene.add(helper)
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    }
  },
  mounted () {
    this.container = this.$refs.container
    this.init()
    this.animate()
  }
}
</script>

<style>
  .model-container {
    width: 500px;;
    height: 500px;
  }
</style>
