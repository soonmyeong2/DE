import "../css/Home.scss";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loadding from "./Loading";
import { withRouter } from "react-router-dom";
import qs from "qs";
import { BACK_URL } from "../api/api";
import ReviewUnit from "./Reviewunit";
import SearchInputContainer from "../containers/SearchInputContainer";

export default withRouter(function SearchHome({
  history,
  location,
  onUpdateUserInfo,
  userInfo,
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

  const onChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const onClick = () => {
    setSearchValue(searchInputValue);
  };

  const getMoreReview = async (searchValue, page) => {
    await axios
      .get(`${BACK_URL}/review/search/${searchValue}/${page}`)
      .then((res) => {
        if (res.data === "wait") {
          console.log("wait");
          setTimeout(() => {
            getMoreReview(searchValue, page);
          }, 1000);
        } else {
          console.log(res.data, page);
          if (page === 0) {
            if (res.data.length === 0) {
              setTimeout(() => {
                getMoreReview(searchValue, page);
              }, 1000);
            } else {
              setReviews(res.data);
            }
          } else {
            setReviews(reviews.concat(res.data));
          }
          setPage((page) => page + 1);
        }
      });

    setIsLoading(false);
  };

  useEffect(() => {
    setSearchValue(query.search);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setPage(0);
    setIsLoading(true);
    history.push(`/search?search=${searchValue}`);
    return () => {};
  }, [searchValue]);

  useEffect(() => {
    if (isLoading) {
      getMoreReview(searchValue, page);
    }
    return () => {};
  }, [isLoading]);

  return (
    <>
      <div className="content-list">
        <div className="content">
          <SearchInputContainer />
        </div>
        {reviews.map((review) => (
          <ReviewUnit
            key={review._id}
            reviewProp={review}
            onUpdateUserInfo={onUpdateUserInfo}
            userInfo={userInfo}
          />
        ))}
        <div className={isLoading ? "visible" : "invisible"}>
          <Loadding />
        </div>
      </div>
    </>
  );
});
