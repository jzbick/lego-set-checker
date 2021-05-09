<template>
  <Header content-selector="#root" v-on:setSelected="onSelect"/>
  <div id="root">
    <SetCard :searched-set="searchedSet" v-on:fetchParts="getParts"></SetCard>
    <hr style="margin: 0">
    <PartsList
        :loading="loading"
        :next-page="nextPage"
        :parts="parts"
        :parts-count="partsCount"
        :prev-page="prevPage"
        :searched-set="searchedSet"
        v-on:getPartsPage="getPartsPage"
    ></PartsList>
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
import PartsList from "./components/PartsList.vue";

export default {
  name: 'app',
  components: {
    PartsList,
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
      loading: false,
      partsCount: 0,
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
      this.parts = []
      this.loading = true
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
      this.loading = false
      this.partsCount = response.data.count
      this.nextPage = response.data.next
      this.prevPage = response.data.previous

      persistSetParts(this.searchedSet.set_num, this.parts)

    },
    async getPartsPage(url: string) {
      this.loading = true
      this.parts = []
      const response = await this.$http.get(url, {
        headers: {
          'Authorization': `key ${import.meta.env.VITE_API_KEY}`
        },
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
      this.loading = false
      this.partsCount = response.data.count
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
</style>
