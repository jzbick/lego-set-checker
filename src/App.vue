<template>
  <Header content-selector="#root" v-on:setSelected="onSelect"/>
  <div id="root">
    <SetCard v-on:fetchParts="getParts"></SetCard>
    <hr style="margin: 0">
    <PartsList
        :loading="loading"
        :parts-count="partsCount"
        v-on:getPartsPage="getPartsPage"
    ></PartsList>
  </div>
</template>

<script lang="ts">

import Header from "./components/Header.vue";
import {AxiosResponse} from "axios";
import {LegoSet, LegoSetPartsResponse} from "./types/rebrickable";
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
      loading: false,
      partsCount: 0,
    }
  },
  computed: {
    set() {
      return this.$store.state.set as LegoSet
    },
  },
  methods: {
    async onSelect(searchTerm: string) {
      const cacheSet = checkCacheForSet()

      if (cacheSet) {
        await this.$store.dispatch('setSet', cacheSet);
      } else {

        const response = await this.$http.get(`${import.meta.env.VITE_API_BASE_URL}/lego/sets/${searchTerm}`, {
          headers: {
            'Authorization': `key ${import.meta.env.VITE_API_KEY}`
          }
        }) as AxiosResponse<LegoSet>
        await this.$store.dispatch('setSet', response.data);

        if (!localStorage.getItem(this.set.set_num)) {
          localStorage.setItem(this.set.set_num, JSON.stringify(this.set))
        }
      }
    },
    async getParts() {
      await this.$store.dispatch('setParts', [])
      this.loading = true
      const response = await this.$http.get(`${import.meta.env.VITE_API_BASE_URL}/lego/sets/${this.set.set_num}/parts`, {
        headers: {
          'Authorization': `key ${import.meta.env.VITE_API_KEY}`
        },
        params: {
          page_size: 5
        }
      }) as AxiosResponse<LegoSetPartsResponse>

      this.handleResponseParts(response)

    },
    async getPartsPage(url: string) {
      await this.$store.dispatch('setParts', [])
      this.loading = true
      const response = await this.$http.get(url, {
        headers: {
          'Authorization': `key ${import.meta.env.VITE_API_KEY}`
        },
      }) as AxiosResponse<LegoSetPartsResponse>

      this.handleResponseParts(response)
    },
    handleResponseParts(response: AxiosResponse<LegoSetPartsResponse>) {
      response.data.results.forEach(part => {
        const cachePart = checkCacheForPartInSet(this.set.set_num, part)
        if (cachePart) {
          this.$store.dispatch('pushPart', cachePart)
        } else {
          this.$store.dispatch('pushPart', part)
        }
      })
      this.loading = false
      this.partsCount = response.data.count

      this.$store.dispatch('setNextPage', response.data.next)
      this.$store.dispatch('setPrevPage', response.data.previous)
      persistSetParts(this.set.set_num, this.$store.state.parts)
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
