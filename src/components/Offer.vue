<template>
  <div>
    <v-container class="app-container">
      <div class="main-image">
        <div class="main-title-container">
          <h1 class="main-title">Dayanara jewellery</h1>
        </div>
      </div>
    </v-container>
    <v-container class="app-container">
      <div>
        <p class="secondary-text ">What are you looking for?</p>
      </div>
    </v-container>
    <v-container class="app-container">
      <v-layout row justify-space-around wrap>
        <div
          v-for="card in cards"
          :key="card.title"
        >
          <v-card
            class="ma-2">
            <v-img
              :src="getImgUrl(card.src)"
              height="300px"
              width="300px"
              class="offer-img"
            >
              <v-container
                fill-height
                fluid
                p-5
              >
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <h1 class="white--text" v-text="card.title"></h1>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
          </v-card>
        </div>
      </v-layout>
    </v-container>
    <best-sellers/>
  </div>
</template>

<script>
import BestSellers from './BestSellers'
export default {
  components: { BestSellers },
  data: () => ({
    cards: [
      { title: 'Wedding rings', src: 'adult-beautiful-blossom-916344.jpg', flex: 3 },
      { title: 'Engagement rings', src: 'accessory-blur-close-up-1457801.jpg', flex: 3 },
      { title: 'Other', src: 'art-bangles-bracelet-1191536.jpg', flex: 3 }
    ]
  }),
  methods: {
    getImgUrl (img) {
      return require('../assets/' + img)
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/_globals.scss';
  .offer-img {
    transition: transform 0.5s ease-in-out;
  }
  .offer-img:hover {
    transform: scale(1.03);
  }
  .main-image {
     background: url("../assets/blur-close-up-crystal-691046.jpg");
     background-size: cover;
     background-repeat: no-repeat;
     background-position: center center;
     height: 100vh;
     min-height: 600px;
   }
  .main-title-container {
    width: inherit;
    height: inherit;
    position: relative;
  }
  .main-title {
    color: $secondaryColor;
    text-align: center;
    text-shadow: -5px 5px 5px $shadowColor;
    font-family: 'Great vibes', cursive;
    font-size: 100px;
    position: absolute;
    bottom: 70px;
    width: 100%;
  }
  .app-container {
    width:100%;
    margin:0 0 50px 0;
    padding: 0;
    max-width: 100%
  }
  .secondary-text {
    font-size: 30px;
  }
</style>
