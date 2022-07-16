import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/Image.module.css";
import { download } from "../utils/download";
import useImage from "../utils/hooks/useImage";

const AnimeId = () => {
  const router = useRouter();
  const { isLoading, data } = useImage(router.isReady, Number(router.query.animeId));

  return (
    <div className={styles.wrapper}>
      {
        isLoading ? (
          <div>
            loading...
          </div>
        ) : (
          <div className={styles.imageContainer}>
            <img src={data?.url_image} className={styles.image} />
            {/*<div>*/}
            {/*  <button*/}
            {/*    onClick={(e) => {*/}
            {/*      e.preventDefault();*/}

            {/*      if (data?.url_image) {*/}
            {/*        download(data?.url_image);*/}
            {/*      }*/}
            {/*    }}*/}
            {/*  >download*/}
            {/*  </button>*/}
            {/*</div>*/}
          </div>
        )
      }
    </div>
  );
};

export default AnimeId;