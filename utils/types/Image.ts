export type ImageLevel1 = {
  id: number;
  width: number;
  height: number;
  file_type: string;
  file_size: number;
  url_image: string;
  url_thumb: string;
  url_page: string;
}

export type ImageLevel2 = {
  category: string;
  category_id: number;
  sub_category: string;
  sub_category_id: number;
  user_name: string;
  user_id: number;
} & ImageLevel1;

export type ImageLevel3 = {
  collection: string;
  collection_id: number;
  group: string;
  group_id: number;
} & ImageLevel2;