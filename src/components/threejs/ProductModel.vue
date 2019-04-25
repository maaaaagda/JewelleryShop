<!-- eslint-disable -->
<template>
  <div ref="container">

  </div>
</template>

<script>
import GLTFLoader from 'three-gltf-loader'
import ring20 from './models/ring_20.gltf'
import ring_diamond from './models/ring_diamond.gltf'
const THREE = require('three')
const OrbitControls = require('three-orbitcontrols')

export default {
  data: () => ({
    container: '',
    stats: '',
    camera: '',
    scene: '',
    projector: '',
    renderer: ''
  }),
  methods: {
    init () {
      const height = 500
      const width = 500
      this.container.setAttribute('height', height + 'px')
      this.container.setAttribute('width', width + 'px')
      this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000)
      this.camera.position.set(0, 0, 100)
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color('rgb(231,231,231)')

      var light = new THREE.DirectionalLight(0xefefff, 1.5)
      light.position.set(1, 1, 1).normalize()
      light.castShadow = true
      light.shadow.radius = 8
      this.scene.add(light)
      light = new THREE.DirectionalLight(0xffefef, 1.5)
      light.castShadow = true
      light.shadow.radius = 8
      light.position.set(-1, -1, -1).normalize()
      this.scene.add(light)

      var geometry = new THREE.PlaneGeometry(100, 100, 1, 1)
      var material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
      var floor = new THREE.Mesh(geometry, material)
      floor.material.side = THREE.DoubleSide
      floor.rotation.x = 90
      //this.scene.add(floor)

      const loader = new GLTFLoader()
      loader.setCrossOrigin('anonymous')
      loader.load(
        ring20, (gltf) => {
          const root = gltf.scene
          const urls = ['bedroom.jpg', 'window.jpg', 'ceilling.jpg', 'floor.jpg',
            'ceilling.jpg', 'ceilling.jpg'].map(url => require('./images/' + url))
          let textureCube = new THREE.CubeTextureLoader().load(urls)
          textureCube.format = THREE.RGBFormat
          textureCube.mapping = THREE.CubeReflectionMapping
          textureCube.encoding = THREE.sRGBEncoding

          root.traverse(function (node) {
            if (node.isMesh) {
              if (node.material) {
                let ringMaterial
                if (!node.name.includes('diamondpink')) {
                  ringMaterial = new THREE.MeshStandardMaterial({ envMap: textureCube })
                  ringMaterial.emissive = new THREE.Color('rgb(202,173,90)')
                  ringMaterial.emissiveMap = new THREE.ImageUtils.loadTexture(require('./images/gold.jpg'))
                  ringMaterial.color = new THREE.Color('rgb(223,206,134)')
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
                node.material = ringMaterial
                node.material.needsUpdate = true
              }
            }
            console.log(node)
          })
          root.scale.set(3, 3, 3)
          root.position.set(0, -25, 0)
          this.scene.add(root)
        }, (xhr) => {
          console.log(`${(xhr.loaded / xhr.total * 100)}% loaded`)
        })

      this.renderer = new THREE.WebGLRenderer()
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(width, height)
      this.container.appendChild(this.renderer.domElement)

      var controls = new OrbitControls(this.camera, this.renderer.domElement)
      controls.enableZoom = false
      var axesHelper = new THREE.AxesHelper(50)
      this.scene.add(axesHelper)
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
