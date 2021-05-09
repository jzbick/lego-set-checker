<template>
  <div v-if="searchedSet" class="set-card__container">

    <div>
      <img :src="searchedSet.set_img_url" alt="" class="set-card__image" width="200">
    </div>

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

    <div class="set-card__missing-parts">
      <div class="set-card__info-text">
        <div class="set-card__info-labels">
          <div>Total:</div>
          <div>Missing:</div>
          <div>Unique missing:</div>
        </div>
        <div class="set-card__info-values right-align">
          <div>{{ searchedSet.num_parts }}</div>
          <div>{{ getPartsMissing() || 0 }}</div>
          <div>{{ getUniquePartsMissing() || 0 }}</div>
        </div>
      </div>
      <ui-button raised>Export</ui-button>
    </div>

  </div>
</template>

<script lang="ts">
import {LegoSet} from "../types/rebrickable";
import {getPartsMissing} from "../functions/getPartsMissing";
import {getUniquePartsMissing} from "../functions/getUniquePartsMissing";


export default {
  name: "SetCard",
  props: {
    searchedSet: null as LegoSet
  },
  methods: {
    async fetchParts() {
      this.$emit('fetchParts', this.searchedSet.set_num)
    },
    getPartsMissing(): number {
      return getPartsMissing(this.searchedSet.set_num)
    },
    getUniquePartsMissing(): number {
      return getUniquePartsMissing(this.searchedSet.set_num)
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
  height: 17.47%;
}

.set-card__container > div {
  width: 33%;
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

.set-card__missing-parts {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.right-align {
  text-align: right;
}
</style>
