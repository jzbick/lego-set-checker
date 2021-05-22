<template>
  <div v-if="part" class="part-card__container">
    <img :src="part.part.part_img_url" alt="" class="part-card__image" width="100">
    <div class="part-card__info">
      <div class="part-card__info-labels">
        <div>Name:</div>
        <div>Quantity:</div>
      </div>
      <div class="part-card__info-values">
        <div>{{ part.part.name }}</div>
        <div>{{ part.quantity }}</div>
      </div>
    </div>
    <div class="part-card__form">
      <ui-textfield
          v-model.number="part.quantity_owned"
          input-type="number"
          placeholder="Quantity owned"
          @change="handlePersistPart"
          v-on:keypress.enter="handleEnter"
      />
    </div>
  </div>
  <hr>
</template>

<script lang="ts">
import {LegoPart} from "../types/rebrickable";
import {persistPart} from '../functions/persistPart';

export default {
  name: "PartCard",
  props: {
    part: null as LegoPart
  },
  methods: {
    handlePersistPart() {
      persistPart(this.part.set_num, this.part)
      this.$store.dispatch('setMissingParts')
    },
    handleEnter() {
      this.$emit('enterPressed')
    }
  },
  emits: ['enterPressed']
}
</script>

<style scoped>
.part-card__container {
  display: flex;
  width: 80%;
  margin: 0 auto;
}

.part-card__image {
  width: 10%
}

.part-card__info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  margin: .5rem;
  overflow: hidden;
}

.part-card__info > div > div {
  margin: .5rem;
  white-space: nowrap;
}

.part-card__form {
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
