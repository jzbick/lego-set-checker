<template>
  <div v-if="searchedSet" class="set-card__container">
    <img :src="searchedSet.set_img_url" alt="" class="set-card__image" width="200">
    <div class="set-card__info">
      <div class="set-card__info-text">
        <div class="set-card__info-labels">
          <div>Name:</div>
          <div>Set-Number:</div>
          <div>Parts:</div>
        </div>
        <div class="set-card__info-values">
          <div>{{ searchedSet.name }}</div>
          <div>{{ searchedSet.set_num }}</div>
          <div>{{ searchedSet.num_parts }}</div>
        </div>
      </div>
      <ui-button raised v-on:click="fetchParts">Get parts</ui-button>
    </div>
  </div>
</template>

<script lang="ts">
import {LegoSet} from "../types/rebrickable";

export default {
  name: "SetCard",
  props: {
    searchedSet: null as LegoSet
  },
  methods: {
    async fetchParts() {
      this.$emit('fetchParts', this.searchedSet.set_num)
    }
  },
  emits: ['fetchParts']
}
</script>

<style scoped>
.set-card__container {
  width: 75%;
  margin: .5rem auto;
  display: flex;
  box-sizing: border-box;
}

.set-card__image {
  margin: .5rem;
}

.set-card__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.set-card__info-text {
  margin: .5rem;
  display: flex;
}

.set-card__info-text > div {
  margin: .5rem;
}
</style>
