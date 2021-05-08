import {LegoPart} from "../types/rebrickable";
import {checkCacheForSet} from "./checkCache";

export const persistSetParts = (setNumber: string, parts: LegoPart[]) => {

  const set = checkCacheForSet(setNumber);

  if (!set) {
    throw new Error(`set with id ${setNumber} was not found in local storage`)
  }

  parts.forEach(part => {
    if (!set.parts) {
      set.parts = []
    }
    if (!set.parts?.map(p => p.id)?.includes(part.id)) {
      set.parts?.push(part)
    }
  })
  localStorage.setItem(setNumber, JSON.stringify(set))
}
