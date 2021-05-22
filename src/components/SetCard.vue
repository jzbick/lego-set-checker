<template>
  <div v-if="set" class="set-card__container">

    <div>
      <img :src="set.set_img_url" alt="" class="set-card__image" width="200">
    </div>

    <div class="set-card__info">
      <div class="set-card__info-text">
        <div class="set-card__info-labels">
          <div>Name:</div>
          <div>Set-Number:</div>
          <div>Parts:</div>
        </div>
        <div class="set-card__info-values">
          <div>{{ set.name }}</div>
          <div>{{ set.set_num }}</div>
          <div>{{ set.num_parts }}</div>
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
          <div>{{ set.num_parts }}</div>
          <div>{{ missingParts }}</div>
          <div>{{ uniqueMissingParts }}</div>
        </div>
      </div>
      <div class="set-card__checkbox-container">
        <ui-checkbox v-model="missingOnly" input-id="checkbox"></ui-checkbox>
        <label for="checkbox">Missing Only</label>
      </div>
      <ui-button raised v-on:click="handleExport">Export</ui-button>
    </div>

  </div>
</template>

<script lang="ts">
import {LegoPart, LegoSet} from "../types/rebrickable";
import {checkCacheForSet} from "../functions/checkCache";
import FileSaver from "file-saver";


export default {
  name: "SetCard",
  computed: {
    set(): LegoSet {
      return this.$store.state.set as LegoSet
    },
    missingParts(): number {
      return this.$store.state.missingParts as number
    },
    uniqueMissingParts(): number {
      return this.$store.state.uniqueMissingParts as number
    },
  },
  data() {
    return {
      missingOnly: false
    }
  },
  methods: {
    async fetchParts() {
      this.$emit('fetchParts', this.set.set_num)
    },
    handleExport() {
      let set = checkCacheForSet(this.set.set_num)

      if (set?.parts) {
        let csv = 'sep=,\r\n\n'
        const keys = ['id', 'name', 'quantity', 'quantity_owned', 'url']
        keys.forEach(key => csv += `${key},`)
        csv = `${csv.slice(0, -1)}\r\n`
        set.parts
            .map((value: LegoPart) => ({
              id: value.id,
              name: value.part.name,
              quantity: value.quantity,
              quantity_owned: value.quantity_owned,
              url: value.part.part_url
            }))
            .filter(value => !this.missingOnly ? true : value.quantity > (value.quantity_owned || 0))
            .forEach(part => {
              let row = ""
              Object.values(part)
                  .forEach(value => row += `"${value ? value : 0}",`)

              csv += `${row}\r\n`
            })
        FileSaver.saveAs(new File([csv], `${this.set.set_num} - ${this.set.name}.csv`, {type: 'text/csv'}))
      }
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

.set-card__checkbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-align {
  text-align: right;
}
</style>
