import Link from "next/link";
import React, { useEffect, useRef } from "react";
import styles from "../styles/Images.module.css";
import useImages from "../utils/hooks/useImages";

const Anime = () => {
  const {
    isLoading,
    data,
    fetchNextPage,
  } = useImages();
  const contentRef = useRef<HTMLDivElement>(null);
  const prevHeight = useRef<number | null>(null);

  useEffect(() => {
    const loadMore = () => {
      const divOffset = contentRef.current?.getBoundingClientRect().top || 0;
      const parentOffset = contentRef.current?.offsetParent?.getBoundingClientRect().top || window.innerHeight;
      const offset = divOffset - parentOffset;
      const top = window.scrollY + window.innerHeight - offset;

      if (top
        + 2000
        >= Number(contentRef.current?.scrollHeight)
        && prevHeight.current
        !== Number(contentRef.current?.scrollHeight)) {
        prevHeight.current = Number(contentRef.current?.scrollHeight);
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", loadMore);

    return () => {
      window.removeEventListener("scroll", loadMore);
    };
  }, [fetchNextPage]);

  return (
    <div
      className={styles.cards}
      ref={contentRef}
    >
      {
        isLoading ? (
          <span>loading</span>
        ) : (
          data?.pages.reduce((data, page) => {
            return [...data, ...page];
          }, []).map(image => {
            return (
              <Link href={`/${image.id}`} key={image.id}>
                <div
                  className={styles.card}
                >
                  <img
                    className={styles.image}
                    src={image.url_thumb}
                    alt={image.category}
                  />
                </div>
              </Link>
            );
          })
        )
      }
    </div>
  );
};

export default Anime;