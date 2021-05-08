interface RebrickableResponse {
  count: number;
  next?: string;
  previous?: string;
}

export interface LegoSetsResponse extends RebrickableResponse {
  results: LegoSet[];
}

export interface LegoSet {
  set_num: string;
  name: string;
  year: number;
  theme_id: number;
  num_parts: number;
  set_img_url: string;
  set_url: string;
  last_modified_dt: string;
  parts?: LegoPart[];
}

export interface LegoSetPartsResponse extends RebrickableResponse {
  results: LegoPart[]
}

export interface LegoPart {
  id: number;
  inv_part_id: number;
  part: Part;
  color: Color;
  set_num: string;
  quantity: number;
  is_spare: boolean;
  element_id: string;
  num_sets: number;
  quantity_owned?: number;
}

export interface Color {
  id: number;
  name: string;
  rgb: string;
  is_trans: boolean;
  external_ids: ColorExternalIDS;
}

export interface ColorExternalIDS {
  BrickLink: BrickLink;
  BrickOwl: BrickLink;
  LEGO: BrickLink;
  Peeron: Peeron;
  LDraw: BrickLink;
}

export interface BrickLink {
  ext_ids: number[];
  ext_descrs: Array<string[]>;
}

export interface Peeron {
  ext_ids: null[];
  ext_descrs: Array<string[]>;
}

export interface Part {
  part_num: string;
  name: string;
  part_cat_id: number;
  part_url: string;
  part_img_url: string;
  external_ids: PartExternalIDS;
  print_of: null;
}

export interface PartExternalIDS {
  BrickOwl: string[];
  LDraw: string[];
  LEGO: string[];
}
