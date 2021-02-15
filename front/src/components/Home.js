import imageTemp from "../image/logo192.png";
import "../css/Home.scss";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import axios from "axios";
import Carousel from "./Carousel";
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
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

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

  const getMoreReview = async () => {
    await axios.get(`${BACK_URL}/review`).then((res) => {
      setReviews(reviews.concat(res.data));

      console.log(reviews);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
