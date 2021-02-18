import "../css/Home.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loadding from "./Loading";
import { withRouter } from "react-router-dom";
import qs from "qs";
import { BACK_URL } from "../api/api";
import BasicReviewUnit from "./BasicReviewUnit";
import SearchInputContainer from "../containers/SearchInputContainer";
import TileReviewUnit from "./TileReviewUnit";

export default withRouter(function SearchHome({
  history,
  location,
  onUpdateUserInfo,
  userInfo,
  component,
  search,
  onChangeSearch,
  likeInfo,
  onUpdateLikeInfo,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

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

  const getMoreReview = async (search, page, reqStack = 0) => {
    if (reqStack === 4) {
      setIsLoading(false);
      alert("검색된 리뷰가 없습니다");
      return;
    }
    axios
      .get(`${BACK_URL}/review/search/${search}/${page}`)
      .then(async (res) => {
        if (res.data === "wait") {
          console.log("wait", page);
          await setTimeout(async () => {
            await getMoreReview(search, page, reqStack + 1);
          }, 3000);
        } else {
          console.log(res.data, page);
          if (res.data.length < 9) {
            await setTimeout(async () => {
              await getMoreReview(search, page, reqStack + 1);
            }, 3000);
          } else {
            if (page === 0) {
              console.log(res.data);
              setReviews(res.data);
            } else {
              setReviews(reviews.concat(res.data));
            }
            setPage((page) => page + 1);
            console.log(reviews);
            console.log(1234);
            setIsLoading(false);
          }
        }
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // setIsLoading(true);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    onChangeSearch(query.search);
    setReviews([]);
    setPage(0);

    setIsLoading(true);
    // history.push(`/search?search=${searchValue}`);
    return () => {};
  }, [search]);

  useEffect(() => {
    if (isLoading) {
      getMoreReview(search, page);
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
          if (component) {
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
