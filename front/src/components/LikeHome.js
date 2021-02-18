import "../css/Home.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loadding from "./Loading";
import { withRouter } from "react-router-dom";
import { BACK_URL } from "../api/api";
import SearchInputContainer from "../containers/SearchInputContainer";
import BasicReviewUnit from "./BasicReviewUnit";
import TileReviewUnit from "./TileReviewUnit";

export default withRouter(function LikeHome({
  component,
  onUpdateUserInfo,
  userInfo,
  searchInfo,
  likeInfo,
  onUpdateLikeInfo,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const [page, setPage] = useState(0);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollTop + clientHeight + 1500 >= scrollHeight &&
      isLoading === false
    ) {
      setIsLoading(true);
    }
  };

  const getMoreReview = async () => {
    console.log(BACK_URL);
    await axios
      .get(`${BACK_URL}/review/like/?like-info=${likeInfo}&page=${page}`)
      .then((res) => {
        setReviews(reviews.concat(res.data));
        setPage(page + 1);
        console.log(reviews, page);

        setIsLoading(false);
      })
      .catch(() => {
        getMoreReview();
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    setIsLoading(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (isLoading) {
      getMoreReview();
    }
    return () => {};
  }, [isLoading]);

  return (
    <>
      <div className="content-list">
        {(function () {
          if (component === true) {
            return reviews.map((review) => (
              <BasicReviewUnit
                key={review._id}
                reviewProp={review}
                onUpdateUserInfo={onUpdateUserInfo}
                userInfo={userInfo}
                likeInfo={likeInfo}
                onUpdateLikeInfo={onUpdateLikeInfo}
              />
            ));
          } else {
            return reviews.map((review) => (
              <TileReviewUnit
                key={review._id}
                reviewProp={review}
                onUpdateUserInfo={onUpdateUserInfo}
                userInfo={userInfo}
                likeInfo={likeInfo}
                onUpdateLikeInfo={onUpdateLikeInfo}
              />
            ));
          }
        })()}
        <div className={isLoading ? "visible" : "invisible"}>
          <Loadding />
        </div>
      </div>
    </>
  );
});
