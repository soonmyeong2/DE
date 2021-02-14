import imageTemp from "../image/logo192.png";
import "../css/Home.scss";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";
import {
  Avatar,
  Backdrop,
  Button,
  Fade,
  IconButton,
  Modal,
  TextField,
} from "@material-ui/core";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import axios from "axios";
import Carousel from "./Carousel";
import React, { useEffect, useState } from "react";
import Loadding from "./Loading";
import { withRouter } from "react-router-dom";
import qs from "qs";
import { BACK_URL } from "../api/api";
function Comment({ comment, commentDelete, userInfo }) {
  const [commentDeleteHover, setCommentDeleteHover] = useState(false);
  const [password, setPassword] = useState(userInfo.password);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const passwordInputHadler = (e) => {
    setPassword(e.target.value);

    console.log(comment);
  };
  return (
    <>
      <div
        className="comment-unit"
        onMouseEnter={() => setCommentDeleteHover(true)}
        onMouseLeave={() => setCommentDeleteHover(false)}
      >
        <div style={{ display: "flex" }}>
          <div className="comment-unit-header">{comment.name}</div>
          <div className="comment-unit-content">{comment.text}</div>
        </div>
        <div className={commentDeleteHover ? "visible" : "invisible"}>
          <Button size="small" onClick={() => handleOpen()}>
            x
          </Button>
        </div>
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
          <div className="deleteCommentModal">
            <p>댓글 작성시 입력했던 패스워드 내놔</p>
            <TextField
              type="password"
              value={password}
              size="small"
              variant="outlined"
              style={{ width: "300px", marginRight: "10px" }}
              onChange={(e) => passwordInputHadler(e)}
            />
            <Button
              color="secondary"
              variant="contained"
              disabled={password ? false : true}
              onClick={() => commentDelete(comment.id, password)}
            >
              지우기
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
function ReviewUnit({ reviewProp, userInfo, onUpdateUserInfo }) {
  const [review, setReview] = useState(reviewProp);

  const [comment, setComment] = useState({ text: "", name: "", password: "" });

  const [commentOnOff, setCommnetOnOff] = useState(false);
  const clickCommentOnOff = () => {
    setCommnetOnOff(!commentOnOff);
  };

  const commentInputHadler = (e, key) => {
    if (key === "text" && e.target.value.length === 20) {
    } else if (key === "name" && e.target.value.length === 8) {
    } else {
      setComment({ ...comment, [key]: e.target.value });
    }
    console.log(comment);
  };
  const commentDelete = (commentId, password) => {
    axios
      .delete(
        `${BACK_URL}/review/${review._id}/comment/${commentId}/${password}`
      )
      .then((res) => {
        console.log(res);
        setReview({ ...review, comments: res.data });
      })
      .catch((e) => {
        console.log(e);
        alert("비번 확인좀");
      });
  };

  const commentWrite = async () => {
    console.log(review._id, comment);
    await axios
      .post(`${BACK_URL}/review/${review._id}/comment/`, comment)
      .then((res) => {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            name: comment.name,
            password: comment.password,
          })
        );
        onUpdateUserInfo();
        setReview({ ...review, comments: res.data });
      });
  };

  useEffect(() => {
    if (userInfo) {
      setComment({
        ...comment,
        name: userInfo.name,
        password: userInfo.password,
      });
    }

    return () => {};
  }, [userInfo]);

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
              <ChatBubbleOutline />{" "}
              {review.comments ? review.comments.length : 0}
            </IconButton>
            <IconButton>
              {/* <Favorite style={{color:"red"}} /> */}
              <FavoriteBorderOutlined />
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
          <div className="comment-creater">
            <div style={{ margin: "10px" }}>
              <TextField
                value={comment.text}
                size="small"
                variant="outlined"
                style={{ width: "530px" }}
                onChange={(e) => commentInputHadler(e, "text")}
              />
            </div>
            <div
              style={{
                margin: "10px",
                marginTop: "0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <TextField
                  variant="outlined"
                  size="small"
                  label="닉네임"
                  value={comment.name}
                  style={{ marginRight: "10px", width: "100px" }}
                  onChange={(e) => commentInputHadler(e, "name")}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  type="password"
                  label="비밀번호"
                  value={comment.password}
                  style={{ width: "70px", marginRight: "10px" }}
                  onChange={(e) => commentInputHadler(e, "password")}
                />
              </div>
              <Button
                color="primary"
                variant="contained"
                disabled={
                  comment.text && comment.name && comment.password
                    ? false
                    : true
                }
                onClick={commentWrite}
              >
                write
              </Button>
            </div>
          </div>
          {review.comments
            ? review.comments.map((comment) => (
                <Comment
                  userInfo={userInfo}
                  key={comment.id}
                  comment={comment}
                  commentDelete={commentDelete}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default withRouter(function Search({
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
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setSearchValue(query.search);
    return () => {};
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
          <div className="search">
            <input
              type="text"
              className="searchTerm"
              placeholder="What are you looking for?"
              onChange={onChange}
              value={searchInputValue}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onClick();
                }
              }}
            />
            <button onClick={onClick} className="searchButton">
              <SearchIcon />
            </button>
          </div>
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
