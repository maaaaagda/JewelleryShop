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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Loader from '../Loader'
const THREE = require('three')
const OrbitControls = require('three-orbitcontrols')

export default {
  components: { Loader },
  props: {
    ringMaterial: {
      type: Object,
      default: function () {
        return {
          name: 'Gold',
          color: 'rgb(158,135,70)',
          emissiveColor: 'rgb(127,109,58)',
          texture: 'gold'
        }
      }
    },
    product: Object
  },
  data: () => ({
    container: '',
    stats: '',
    camera: '',
    scene: '',
    projector: '',
    renderer: '',
    loading: false,
    containerSize: 500,
    textureCube: null
  }),
  watch: {
    ringMaterial: function (newMaterial) {
      const ringMaterial = JSON.parse(JSON.stringify(newMaterial))
      let ringModel = this.scene.getObjectByName('ringModel', true)
      this.updateMaterial(ringModel, this.textureCube, ringMaterial)
    },
    product: function (newProduct) {
      const productModel = newProduct.model
      this.init(productModel)
      this.animate()
    }
  },
  methods: {
    init (productModel) {
      this.loading = true
      this.camera = new THREE.PerspectiveCamera(35, 1, 5, 1000)
      this.camera.position.set(-20, 30, 25)
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color('rgb(254,254,254)')

      let slight = new THREE.AmbientLight('rgb(247,247,247)', 0.5)
      this.scene.add(slight)
      var light = new THREE.SpotLight('rgb(251,255,194)', 0.7)
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
      textureCube.minFilter = THREE.NearestFilter
      textureCube.format = THREE.RGBFormat
      textureCube.mapping = THREE.CubeReflectionMapping
      textureCube.encoding = THREE.sRGBEncoding
      this.textureCube = textureCube

      const loader = new GLTFLoader()
      loader.setCrossOrigin('anonymous')
      loader.load(
        this.getModel(productModel), (gltf) => {
          const root = gltf.scene
          this.updateMaterial(root, textureCube)
          root.position.set(0, -10, 0)
          root.name = 'ringModel'
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
    },
    animate () {
      requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    },
    updateMaterial (ringModel, textureCube, newRingMaterial = this.ringMaterial) {
      let textureLoader = new THREE.TextureLoader()
      let texture = textureLoader.load(require('./textures/' + newRingMaterial.texture + '.jpg'))
      texture.minFilter = THREE.NearestFilter
      ringModel.traverse(node => {
        if (node.isMesh) {
          if (node.material) {
            let ringMaterial
            if (!node.name.includes('diamondpink')) {
              ringMaterial = new THREE.MeshStandardMaterial({ envMap: textureCube })
              ringMaterial.emissive = new THREE.Color(newRingMaterial.emissiveColor)
              ringMaterial.emissiveMap = texture
              ringMaterial.color = new THREE.Color(newRingMaterial.color)
              ringMaterial.metalness = 0.7
              ringMaterial.roughness = 0.5
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
    },
    getModel (id) {
      return require('./models/' + id + '.gltf')
    }
  },
  mounted () {
    this.container = this.$refs.container
    if (this.product.model) {
      this.init(this.product.model)
      this.animate()
    }
  }
}
</script>

<style>
  .model-container {
    width: 500px;;
    height: 500px;
  }
</style>
