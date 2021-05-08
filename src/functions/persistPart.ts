import {LegoPart} from "../types/rebrickable";
import {checkCacheForSet} from "./checkCache";

export const persistPart = (setNumber: string, part: LegoPart) => {
  const set = checkCacheForSet(setNumber)

  if (!set) {
    throw new Error(`set with id ${setNumber} was not found in local storage`)
  }

  set.parts = set.parts?.map(p => {
    if (p.id === part.id) {
      return part
    }
    return p
  })

  localStorage.setItem(setNumber, JSON.stringify(set))

}
