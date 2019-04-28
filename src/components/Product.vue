<template>
  <div class="product-container">
    <v-breadcrumbs class="v-breadcrumbs--large" :items="items">
      <template v-slot:divider>
        <v-icon>chevron_right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md7>
          <div class="model-container">
            <v-layout align-center justify-center row fill-height>
            <product-model v-bind:ringMaterial="ringMaterial" v-bind:product="product" model="pureHappiness"/>
            </v-layout>
          </div>
        </v-flex>
        <v-flex d-flex xs12 sm6 md5>
          <v-card>
            <v-card-title primary-title><h1>{{product.name}}</h1></v-card-title>
            <v-card-text class="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</v-card-text>
            <v-card-title primary-title><h2>Price: {{product.price}}USD</h2></v-card-title>
            <div>
              <material-select v-on:change-selected-material="changeMaterial"/>
            </div>
          </v-card>
          </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ProductModel from './threejs/ProductModel'
import MaterialSelect from './MaterialSelect'
import { rings } from '../globals'
export default {
  components: {
    ProductModel,
    MaterialSelect
  },
  data: () => ({
    items: [
      {
        text: 'Dayanara',
        disabled: false,
        href: '/'
      },
      {
        text: 'Jewellery',
        disabled: false,
        href: '/'
      },
      {
        text: 'Rings',
        disabled: true,
        href: '/'
      }
    ],
    ringMaterial: undefined,
    product: {}
  }),
  methods: {
    changeMaterial (material) {
      this.ringMaterial = material
    },
    getChosenProduct (id) {
      return rings.find(ring => ring.id === id)
    }
  },
  mounted () {
    this.product = this.getChosenProduct(this.$route.params.productId)
  }
}
</script>

<style>
  a.v-breadcrumbs__item:visited {
    color: black;
  }
  .model-container {
    min-height: 500px
  }
  .product-description {
    text-align: start;
    font-size: 15px;
  }
  .product-container {
    background-color: rgb(237,237,237);
  }
</style>
