import {createStore, Store} from "vuex";
import {LegoPart, LegoSet} from "./types/rebrickable";
import {InjectionKey} from "vue";
import {getPartsMissing} from "./functions/getPartsMissing";
import {getUniquePartsMissing} from "./functions/getUniquePartsMissing";

export interface State {
  set?: LegoSet
  parts?: LegoPart[],
  prevPage: string,
  nextPage: string,
  missingParts: number,
  uniqueMissingParts: number
}

export const key: InjectionKey<Store<State>> = Symbol()


export const store = createStore<State>({
  state(): State {
    return {
      set: undefined,
      parts: [],
      prevPage: '',
      nextPage: '',
      missingParts: 0,
      uniqueMissingParts: 0
    }
  },
  mutations: {
    setSet(state, set: LegoSet) {
      state.set = set
    },
    setParts(state, parts: LegoPart[]) {
      state.parts = parts
    },
    pushPart(state, part: LegoPart) {
      state.parts?.push(part)
    },
    setPrevPage(state, prevPage: string) {
      state.prevPage = prevPage
    },
    setNextPage(state, nextPage: string) {
      state.nextPage = nextPage
    },
    setMissingParts(state) {
      if (state.set) {
        const missingParts = getPartsMissing(state.set.set_num)
        if (missingParts) state.missingParts = missingParts
        const uniqueMissingParts = getUniquePartsMissing(state.set.set_num)
        if (uniqueMissingParts) state.uniqueMissingParts = uniqueMissingParts
      }
    }
  },
  actions: {
    setSet(context, set: LegoSet) {
      context.commit('setSet', set)
    },
    setParts(context, parts: LegoPart[]) {
      context.commit('setParts', parts)
    },
    pushPart(context, part: LegoPart) {
      context.commit('pushPart', part)
    },
    setPrevPage(context, prevPage: string) {
      context.commit('setPrevPage', prevPage)
    },
    setNextPage(context, nextPage: string) {
      context.commit('setNextPage', nextPage)
    },
    setMissingParts(context) {
      context.commit('setMissingParts')
    }
  }
})
