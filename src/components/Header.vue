<template>
  <ui-top-app-bar
      :nav-icon="false"
      :content-selector="contentSelector"
      title="Lego Set Checker"
  >
    <template #toolbar>
      <ui-autocomplete
          :model-value="searchedSet"
          :source="sets"
          class="autocomplete"
          delay="500"
          placeholder="Search set by ID"
          remote
          @search="onSearch"
          @selected="onSelect"
      >
        <template #after>
          <div class="searchbar__icon">
            <ui-icon dark outlined>search</ui-icon>
          </div>
        </template>
      </ui-autocomplete>
    </template>
  </ui-top-app-bar>
</template>

<script lang="ts">
import {AxiosResponse} from 'axios';
import {LegoSetsResponse} from "../types/rebrickable";

export default {
  name: 'Header',
  props: {
    contentSelector: String,
  },
  data() {
    return {
      searchedSet: '',
      sets: [] as string[],
    }
  },
  methods: {
    async onSearch(keyword: string) {
      const response = await this.$http.get(`${import.meta.env.VITE_API_BASE_URL}/lego/sets`, {
        params: {
          search: keyword
        },
        headers: {
          'Authorization': `key ${import.meta.env.VITE_API_KEY}`
        }
      }) as AxiosResponse<LegoSetsResponse>

      this.sets = response.data.results.map(set => (
          {
            label: `${set.set_num} | ${set.name}`,
            key: set.set_num
          }
      ))
    },
    onSelect(value: { label: string, key: string }) {
      this.searchedSet = value.label
      this.$emit('setSelected', value.key)
    }
  },
  emits: ['setSelected']
}
</script>

<style scoped>
.mdc-top-app-bar__row {
  display: flex;
  justify-content: space-between;
}

.autocomplete {
  width: 100%;
  align-items: center !important;
}

.searchbar__icon {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
}
</style>
