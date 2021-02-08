import imageTemp from "../image/logo192.png";
import "../css/Home2.scss";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import {
  Avatar,
  Backdrop,
  Button,
  Fade,
  IconButton,
  makeStyles,
  Modal,
} from "@material-ui/core";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import axios from "axios";
import Carousel from "./Carousel";
import React, { useEffect, useState } from "react";
import Loadding from "./Loading";
import logo from "../image/logo.png";

function ReviewUnit({ review }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [commentOnOff, setCommnetOnOff] = useState(false);

  const clickCommentOnOff = () => {
    setCommnetOnOff(!commentOnOff);
  };

  return (
    <>
      <div className="content-box" onClick={handleOpen}>
        <img
          className="content-box-img"
          src={review.reviewAttaches[0].attachUrl}
        ></img>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="paper">
            <div className="content-header">
              <Avatar src={imageTemp}></Avatar>
              <h3>{review.productName}</h3>
            </div>
            <div className="content-modal">
              {review.reviewContentClassType === "PHOTO" ? (
                <div className="content-media">
                  <Carousel images={review.reviewAttaches} />
                </div>
              ) : null}
              <div className="content-modal-text">
                <div className="content-text">
                  <small>
                    {review.writerMemberId}/
                    {review.productOptionContent
                      ? review.productOptionContent + "/"
                      : null}
                    {review.channelName}
                  </small>
                  <p>{review.reviewContent}</p>
                  <p className="content-more">더보기..</p>
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
                      이거 최곤데? 이거 꼭 사고 싶어@
                    </div>
                  </div>
                  <div className="comment-unit">
                    <div className="comment-unit-header">siseong</div>
                    <div className="comment-unit-content">남시성sdfds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default function Tile({ onChangeComponent }) {
  const contents = [];
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [reviews, setReviews] = useState([]);

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

  const getMoreReview = async () => {
    setIsLoading(true);
    await axios.get(`http://3.36.164.64:8080/review/${page}`).then((res) => {
      setReviews(reviews.concat(res.data.reviewList));
      setPage(res.data.num);
      console.log(res, page);

      console.log(isLoading);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    onChangeComponent("tile");
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  useEffect(() => {
    getMoreReview();

    return () => {};
  }, []);

  return (
    <>
      <div className="content-list">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
          />
          <button type="submit" className="searchButton">
            <SearchIcon />
          </button>
        </div>

        {reviews.map((review) =>
          review.reviewContentClassType === "PHOTO" ? (
            <ReviewUnit key={review.id} review={review} />
          ) : null
        )}

        <div className={isLoading ? "visible" : "invisible"}>
          <Loadding />
        </div>
      </div>
    </>
  );
}
