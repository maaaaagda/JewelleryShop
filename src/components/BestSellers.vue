<template>
  <div>
    <v-container class="app-container">
      <div  v-if="!hideTitle">
        <p class="secondary-text ">Dayanara bestsellers</p>
      </div>
    </v-container>
    <v-container class="app-container">
      <v-layout row justify-space-around wrap>
        <router-link tag="div"
          v-for="bs in bestSellers"
          :key="bs.id"
          style="text-align: start"
          :to="`/jewellery/${bs.id}`"
        >
          <v-flex d-flex fill-height>
            <v-card
              min-height="200px"
              width="200px"
              class="ma-2 best-seller">
              <v-img
                :src="getImgUrl(bs.src)"
                height="200px"
                width="200px"
              >
              </v-img>
              <v-card-title>
                <v-flex xs-12>
                  <v-layout pa-1 align-start justify-center row fill-height>
                    <v-icon>add</v-icon><span>colors</span>
                  </v-layout>
                </v-flex>
                <v-layout row wrap>
                  <v-flex xs12>
                    <span><b>{{bs.name}}</b></span><br>
                  </v-flex>
                  <v-flex xs12>
                    <span>Price: {{bs.price}}USD</span>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
        </router-link>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { rings } from '../globals'
export default {
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    bestSellers: rings
  }),
  methods: {
    getImgUrl (img) {
      return require('../assets/modelsImages/' + img)
    }
  }
}
</script>

<style>
  .app-container {
    width:100%;
    margin:0 0 50px 0;
    padding: 0;
    max-width: 100%
  }
  .secondary-text {
    font-size: 30px;
  }
  .best-seller:hover {
    cursor: pointer;
  }
</style>
