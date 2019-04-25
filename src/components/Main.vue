<template>
      <div
        class="hide-overflow"
        style="position: relative;"
      >
        <v-toolbar color="white" class="secondary-text">
          <v-btn flat>
            <v-icon>dehaze</v-icon>
          </v-btn>
          <v-toolbar-title>Dayanara jewellery</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>About</v-btn>
            <v-btn flat>Special offers</v-btn>
            <v-btn flat>Contact</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div
          class="scroll-y"
          style="max-height: 90vh;"
        >
          <router-view></router-view>
        </div>
      </div>
</template>

<style>
  .secondary-text {
    font-size: 30px;
  }
</style>
