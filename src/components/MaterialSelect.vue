<template>
  <v-container pa-3>
    <v-flex xs12 sm6 ref="select-container">
      <v-select v-model="selectedMaterial"
                :items="materials"
                return-object
                attach="select-container"
                label="Material:"
                item-text="name"
                item-value="selectedMaterial">
      </v-select>
    </v-flex>
  </v-container>
</template>

<script>
const materials = [
  { name: 'Silver',
    color: 'rgb(192, 192, 192)',
    emissiveColor: 'rgb(78,78,78)',
    texture: 'silver'
  }, {
    name: 'Yellow gold',
    color: 'rgb(158,135,71)',
    emissiveColor: 'rgb(127,109,57)',
    texture: 'gold'
  }, {
    name: 'Pink gold',
    color: 'rgb(213,139,124)',
    emissiveColor: 'rgb(196,112,102)',
    texture: 'gold'
  }]
export default {
  data: () => ({
    materials: materials,
    selectedMaterial: materials[1]
  }),
  watch: {
    selectedMaterial: function (newMaterial) {
      this.$emit('change-selected-material', newMaterial)
    }
  }
}
</script>

<style>
  .v-label {
    font-size: 25px;
  }
</style>
