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
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollTop + clientHeight + 6000 >= scrollHeight &&
      isLoading === false
    ) {
      setIsLoading(true);
    }
  };

  const getMoreReview = async (search, page) => {
    await axios
      .get(`${BACK_URL}/review/search/${search}/${page}`)
      .then((res) => {
        if (res.data === "wait") {
          console.log("wait");
          setTimeout(() => {
            getMoreReview(search, page);
          }, 1000);
        } else {
          console.log(res.data, page);
          if (page === 0) {
            if (res.data.length === 0) {
              setTimeout(() => {
                getMoreReview(search, page);
              }, 3000);
            } else {
              console.log(res.data);
              setReviews(res.data);
            }
          } else {
            setReviews(reviews.concat(res.data));
          }
          setPage((page) => page + 1);
        }
      });

    console.log(reviews);
    setIsLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
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
              />
            ));
          } else {
            return reviews.map((review) => (
              <TileReviewUnit
                key={review._id}
                reviewProp={review}
                onUpdateUserInfo={onUpdateUserInfo}
                userInfo={userInfo}
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
