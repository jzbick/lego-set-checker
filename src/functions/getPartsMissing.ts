import {checkCacheForSet} from "./checkCache";

export const getPartsMissing = (setNumber: string): number | undefined => {
  const set = checkCacheForSet(setNumber)
  if (!set) {
    return undefined
  }

  let partsOwned = 0

  set.parts?.forEach((part) => {
    if (part.quantity_owned) partsOwned += part.quantity_owned
  })

  return set.num_parts - partsOwned
}
