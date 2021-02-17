import "../css/Home.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loadding from "./Loading";
import { withRouter } from "react-router-dom";
import { BACK_URL } from "../api/api";
import SearchInputContainer from "../containers/SearchInputContainer";
import BasicReviewUnit from "./BasicReviewUnit";
import TileReviewUnit from "./TileReviewUnit";

export default withRouter(function Home({
  component,
  onUpdateUserInfo,
  userInfo,
  searchInfo,
  likeInfo,
  onUpdateLikeInfo,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  const [numIndex, setNumIndex] = useState(0);
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  const numArrayCreate = () => {
    let num = parseInt(Math.random() * 8 + 1);
    const numArrayTemp = [];
    while (num < 1500) {
      num += 13 + parseInt(Math.random() * 8);
      numArrayTemp.push(num);
    }
    shuffle(numArrayTemp);
    return numArrayTemp;
  };

  const [numArray, setNumArray] = useState(numArrayCreate);
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
      .get(
        `${BACK_URL}/review/?search-info=${searchInfo}&num=${numArray[numIndex]}`
      )
      .then((res) => {
        setReviews(reviews.concat(res.data));
        setNumIndex(numIndex + 1);
        console.log(reviews);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // useEffect(() => {
  //   setIsLoading(true);
  //   return () => {};
  // }, []);

  useEffect(() => {
    if (isLoading) {
      getMoreReview();
    }
    return () => {};
  }, [isLoading]);

  return (
    <>
      <div className="content-list">
        <div className="content">
          <SearchInputContainer />
        </div>

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
