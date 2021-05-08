import {LegoPart, LegoSet} from "../types/rebrickable";

export const checkCacheForSet = (setNumber: string): LegoSet | undefined => {
  const set = localStorage.getItem(setNumber);
  if (!set) {
    return undefined;
  } else {
    return JSON.parse(set);
  }
}

export const checkCacheForPartInSet = (setNumber: string, part: LegoPart): LegoPart | undefined => {
  const set = checkCacheForSet(setNumber)
  if (!set) {
    return undefined;
  } else {
    return set.parts?.find(p => p.id === part.id)
  }
}
