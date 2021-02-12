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
import qs from "qs";
import { BACK_URL } from "../api/api";
function ReviewUnit({ review }) {
  const [commentOnOff, setCommnetOnOff] = useState(false);

  const clickCommentOnOff = () => {
    setCommnetOnOff(!commentOnOff);
  };

  return (
    <>
      <div className="content">
        <div className="content-header">
          <Avatar src={imageTemp}></Avatar>
          <h3>{review.productName}</h3>
        </div>
        {review.reviewContentClassType === "PHOTO" ? (
          <div className="content-media">
            <Carousel images={review.reviewAttaches} />
          </div>
        ) : null}
        <div className="content-text">
          <small>
            {review.writerMemberId}/
            {review.productOptionContent
              ? review.productOptionContent + "/"
              : null}
            {review.channelName}
          </small>
          <p>{review.reviewContent}</p>
          <p className="content-more">더보기..{review._id}</p>
        </div>
        <div className="content-info"></div>
        <div className="content-action">
          <div className="content-action-frond">
            <IconButton onClick={clickCommentOnOff}>
              <ChatBubbleOutline /> 123
            </IconButton>
            <IconButton>
              {/* <Favorite style={{color:"red"}} /> */}
              <FavoriteBorderOutlined /> 123
            </IconButton>
          </div>
          <div className="content-action-back">
            <Button
              className="button"
              href={review.productUrl}
              target="_blank"
              startIcon={<ShoppingCartOutlined />}
            >
              사러가기
            </Button>
          </div>
        </div>

        <div
          className="content-comment"
          className={commentOnOff ? "visible" : "invisible"}
        >
          <div className="comment-unit">
            <div className="comment-unit-header">남시성</div>
            <div className="comment-unit-content">
              이거 최곤데? 이거 꼭 사고 싶어
            </div>
          </div>
          <div className="comment-unit">
            <div className="comment-unit-header">siseong</div>
            <div className="comment-unit-content">남시성sdfds</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(function Search({ history, location }) {
  const contents = [];
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsTemp, setReviewsTemp] = useState([]);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (
      scrollTop + clientHeight + 0.7998046875 >= scrollHeight &&
      isLoading === false
    ) {
      getMoreReview();
    }
  };
  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onClick = () => {
    const value = searchValue;
    history.push(`/search?search=${value}`);
    setReviews([]);
    setPage(0);
    getMoreReview();
  };
  const getMoreReview = async () => {
    setIsLoading(true);
    await axios
      .get(`${BACK_URL}/review/search/${query.search}/${page}`)
      .then((res) => {
        if (res.data === "wait") {
          console.log("wait");
          setTimeout(() => {
            getMoreReview();
          }, 1000);
        } else {
          console.log(res.data, page);
          setReviews(reviews.concat(res.data));

          setPage((page) => page + 1);
        }
      });

    setIsLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  useEffect(() => {
    setSearchValue(query.search);
    getMoreReview();
    return () => {};
  }, []);
  return (
    <>
      <div className="content-list">
        <div className="content">
          <div className="search">
            <input
              type="text"
              className="searchTerm"
              placeholder="What are you looking for?"
              onChange={onChange}
              value={searchValue}
            />
            <button onClick={onClick} className="searchButton">
              <SearchIcon />
            </button>
          </div>
        </div>
        {reviews.map((review) => (
          <ReviewUnit key={review._id} review={review} />
        ))}
        <div
          // className="visible"
          className={isLoading ? "visible" : "invisible"}
        >
          <Loadding />
        </div>
      </div>
    </>
  );
});
