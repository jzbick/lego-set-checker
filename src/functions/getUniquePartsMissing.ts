import {checkCacheForSet} from "./checkCache";

export const getUniquePartsMissing = (setNumber: string): number | undefined => {
  const set = checkCacheForSet(setNumber)
  if (!set) {
    return undefined
  }

  let partsMissing = 0

  set.parts?.forEach(part => {
    if (part.quantity_owned) {
      if (part.quantity_owned < part.quantity) {
        partsMissing++
      }
    } else {
      partsMissing++
    }
  })

  return partsMissing
}
