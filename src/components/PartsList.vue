<template>
  <div v-if="parts && searchedSet" class="parts-container">
    <div v-if="loading" class="parts-list">
      <ui-spinner active/>
    </div>
    <div v-else class="parts-list">
      <PartCard v-for="part in parts" :part="part"></PartCard>
    </div>
    <div class="page-buttons">
      <ui-button :disabled="!prevPage" raised @click="handlePrev">prev</ui-button>
      <div> {{ getCurrentPageNumber() || 0 }} / {{ getTotalPages() || 0 }}</div>
      <ui-button :disabled="!nextPage" raised @click="handleNext">next</ui-button>
    </div>
  </div>
</template>

<script lang="ts">
import {LegoPart, LegoSet} from "../types/rebrickable";
import PartCard from "./PartCard.vue";
import {getPageNumberFromUrl} from "../functions/getPageNumberFromUrl";

export default {
  name: "PartsList",
  components: {
    PartCard
  },
  props: {
    parts: null as LegoPart[],
    searchedSet: null as LegoSet,
    loading: false as boolean,
    prevPage: '' as string,
    nextPage: '' as string,
    partsCount: null as number
  },
  methods: {
    handlePrev() {
      this.$emit('getPartsPage', this.prevPage)
    },
    handleNext() {
      this.$emit('getPartsPage', this.nextPage)
    },
    getCurrentPageNumber(): number {
      if (this.nextPage) {
        return getPageNumberFromUrl(this.nextPage) - 1
      } else if (this.prevPage) {
        return getPageNumberFromUrl(this.prevPage) + 1
      }
    },
    getTotalPages(): number {
      return Math.ceil(this.partsCount / 5)
    }
  },
  emits: ["getPartsPage"]
}
</script>

<style scoped>
.parts-container {
  height: 75.79%;
  display: flex;
  flex-direction: column;
}

.parts-list {
  height: 77.55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.parts-list::-webkit-scrollbar {
  display: none;
}

.page-buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 22.45%;
}
</style>
