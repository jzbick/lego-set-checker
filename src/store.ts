import {createStore, Store} from "vuex";
import {LegoPart, LegoSet} from "./types/rebrickable";
import {InjectionKey} from "vue";

export interface State {
  set?: LegoSet
  parts?: LegoPart[],
  prevPage: string,
  nextPage: string,
}

export const key: InjectionKey<Store<State>> = Symbol()


export const store = createStore<State>({
  state: {
    set: undefined,
    parts: [],
    prevPage: '',
    nextPage: ''
  } as State,
  mutations: {
    setSet(state, set: LegoSet) {
      state.set = set
      if (!localStorage.getItem(set.set_num)) {
        localStorage.setItem(set.set_num, JSON.stringify(set))
      }
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
    }
  }
})
