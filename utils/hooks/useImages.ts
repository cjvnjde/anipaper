import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { QueryFunction } from "react-query/types/core/types";
import { buildUrl } from "../buildUrl";
import { createRandomInRange, RandomInRange } from "../randomInRange";
import { ImageLevel2 } from "../types/Image";

const getImages: (initialParam: number) => QueryFunction<ImageLevel2[]> = (initialParam) => async ({
  signal,
  pageParam,
}): Promise<ImageLevel2[]> => {
  const randomImages = await fetch(buildUrl("category", { id: 3, page: pageParam || initialParam }), {
    signal,
  });

  const data = await randomImages.json();
  return data.wallpapers;
};

const getImageCount: QueryFunction<{ count: string; success: boolean }> = async ({ signal }): Promise<{ count: string; success: boolean }> => {
  const imageCount = await fetch(buildUrl("category_count", { id: 3 }), {
    signal,
  });

  return imageCount.json();
};

export default function useImages() {
  const [initialPage, setInitialPage] = useState(-1);
  const generateRandom = useRef<null | RandomInRange>(null);
  const {
    isLoading,
    data,
  } = useQuery<{ count: string; success: boolean }, Error, number>("imageCount", getImageCount, {
    select: (pageCount) => Math.floor(Number(pageCount.count) / 30),
  });

  useEffect(() => {
    if (data && !generateRandom.current) {
      generateRandom.current = createRandomInRange(0, 500);
      setInitialPage(generateRandom.current?.next().value);
    }
  }, [data]);

  const queryData = useInfiniteQuery<ImageLevel2[], Error, ImageLevel2[]>("images", getImages(initialPage), {
    enabled: initialPage >= 0,
    getNextPageParam: () => {
      return generateRandom.current?.next()?.value;
    },
  });

  return {
    ...queryData,
    isLoading: isLoading || queryData.isLoading || queryData.isIdle,
  };
}
