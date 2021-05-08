<template>
  <Header content-selector="#root" v-on:setSelected="onSelect"/>
  <div id="root">
    <SetCard :searched-set="searchedSet" v-on:fetchParts="getParts"></SetCard>
    <hr style="margin: 0">
    <div v-if="parts">
      <div class="parts-list">
        <PartCard v-for="part in parts" :part="part"></PartCard>
      </div>
      <div class="page-buttons">
        <ui-button v-if="prevPage" raised @click="getPartsPage(prevPage)">prev</ui-button>
        <ui-button v-if="nextPage" raised @click="getPartsPage(nextPage)">next</ui-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import Header from "./components/Header.vue";
import {AxiosResponse} from "axios";
import {LegoPart, LegoSet, LegoSetPartsResponse} from "./types/rebrickable";
import SetCard from "./components/SetCard.vue";
import PartCard from "./components/PartCard.vue";
import {persistSetParts} from "./functions/persistSetParts";
import {checkCacheForPartInSet, checkCacheForSet} from "./functions/checkCache";

export default {
  name: 'app',
  components: {
    PartCard,
    SetCard,
    Header
  },
  data() {
    return {
      searchedSet: null as LegoSet,
      parts: [] as LegoPart[],
      nextPage: '',
      prevPage: '',
    }
  },
  methods: {
    async onSelect(searchTerm: string) {
      const cacheSet = checkCacheForSet()

      if (cacheSet) {
        this.searchedSet = cacheSet;
      } else {

        const response = await this.$http.get(`${import.meta.env.VITE_API_BASE_URL}/lego/sets/${searchTerm}`, {
          headers: {
            'Authorization': `key ${import.meta.env.VITE_API_KEY}`
          }
        }) as AxiosResponse<LegoSet>
        this.searchedSet = response.data

        if (!localStorage.getItem(this.searchedSet.set_num)) {
          localStorage.setItem(this.searchedSet.set_num, JSON.stringify(this.searchedSet))
        }
      }
    },
    async getParts() {
      const response = await this.$http.get(`${import.meta.env.VITE_API_BASE_URL}/lego/sets/${this.searchedSet.set_num}/parts`, {
        headers: {
          'Authorization': `key ${import.meta.env.VITE_API_KEY}`
        },
        params: {
          page_size: 5
        }
      }) as AxiosResponse<LegoSetPartsResponse>

      const responseParts = response.data.results

      responseParts.forEach(part => {
        const cachePart = checkCacheForPartInSet(this.searchedSet.set_num, part)
        if (cachePart) {
          this.parts.push(cachePart)
        } else {
          this.parts.push(part)
        }
      })

      this.nextPage = response.data.next
      this.prevPage = response.data.previous

      persistSetParts(this.searchedSet.set_num, this.parts)

    },
    async getPartsPage(url: string) {
      const response = await this.$http.get(url, {
        headers: {
          'Authorization': `key ${import.meta.env.VITE_API_KEY}`
        },
      }) as AxiosResponse<LegoSetPartsResponse>

      this.parts = response.data.results
      this.nextPage = response.data.next
      this.prevPage = response.data.previous

      persistSetParts(this.searchedSet.set_num, this.parts)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Roboto, monospace;
}

#root {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.parts-list {
  overflow-y: scroll;
  scrollbar-width: none;
}

.parts-list::-webkit-scrollbar {
  display: none;
}

.page-buttons {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
</style>
