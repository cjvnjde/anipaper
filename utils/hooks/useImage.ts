import { useQuery } from "react-query";
import { QueryFunction } from "react-query/types/core/types";
import { buildUrl } from "../buildUrl";
import { ImageLevel2 } from "../types/Image";

const getImage: (id: number) => QueryFunction<{ wallpaper: ImageLevel2, success: boolean }> = (id) => async ({ signal }): Promise<{ wallpaper: ImageLevel2, success: boolean }> => {
  const randomImages = await fetch(buildUrl("wallpaper_info", { id }), {
    signal,
  });

  return randomImages.json();
};

export default function useImage(isReady: boolean, id: number) {
  return useQuery<{ wallpaper: ImageLevel2, success: boolean }, Error, ImageLevel2>("images", getImage(id), {
    enabled: isReady,
    select: imageResp => imageResp.wallpaper,
  });
}
