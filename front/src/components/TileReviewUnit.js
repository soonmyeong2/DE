import ModalForm from "./ModalForm";
import imageTemp from "../image/logo192.png";
import "../css/Home2.scss";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleOutline from "@material-ui/icons/ChatBubbleOutline";
import ShoppingCartOutlined from "@material-ui/icons/ShoppingCartOutlined";

import { BACK_URL } from "../api/api";
import {
  Avatar,
  Backdrop,
  Button,
  Fade,
  IconButton,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import axios from "axios";
import Carousel from "./Carousel";
import React, { useEffect, useState } from "react";
import Loadding from "./Loading";
import logo from "../image/logo.png";

function CommentDeleteModal({ commentDelete, passwordDefalut, commentId }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(passwordDefalut);
  const handleOpen = () => {
    setOpen(true);
  };
  const passwordInputHadler = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <Button size="small" onClick={() => handleOpen()}>
        x
      </Button>
      <ModalForm openProp={open} onOpenProp={(openChild) => setOpen(openChild)}>
        <div className="deleteCommentModal">
          <p>패스워드 확인</p>
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
            onClick={() => commentDelete(commentId, password)}
          >
            지우기
          </Button>
        </div>
      </ModalForm>
    </>
  );
}

function Comment({ comment, commentDelete, userInfo }) {
  const [commentDeleteHover, setCommentDeleteHover] = useState(false);

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
          <CommentDeleteModal
            commentId={comment.id}
            commentDelete={commentDelete}
            passwordDefalut={userInfo.password}
          />
        </div>
      </div>
    </>
  );
}
function TileReviewUnit({ reviewProp, userInfo, onUpdateUserInfo }) {
  const [review, setReview] = useState(reviewProp);
  const [comment, setComment] = useState({ text: "", name: "", password: "" });
  const [open, setOpen] = useState(false);
  const commentInputHadler = (e, key) => {
    if (key === "text" && e.target.value.length === 20) {
    } else if (key === "name" && e.target.value.length === 8) {
    } else {
      setComment({ ...comment, [key]: e.target.value });
    }
    console.log(comment);
  };

  const handleOpen = () => {
    setOpen(true);
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
    console.log(review.id, comment);
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
        onUpdateUserInfo({
          name: comment.name,
          password: comment.password,
        });
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
      <div className="content-box" onClick={handleOpen}>
        <img
          className="content-box-img"
          src={review.reviewAttaches[0].attachUrl + "?type=f300_300"}
        ></img>
      </div>
      <ModalForm openProp={open} onOpenProp={(openChild) => setOpen(openChild)}>
        <div className="paper">
          <div className="content-header">
            <Avatar>{review.reviewScore > 3 ? "😊" : "😒"}</Avatar>
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
                <p>{"⭐".repeat(parseInt(review.reviewScore))}</p>
                <p>{review.reviewContent}</p>
                <samll>{review.createDate}</samll>
              </div>
              <div className="content-info"></div>
              <div className="content-action">
                <div className="content-action-frond">
                  <IconButton>
                    <ChatBubbleOutline />
                    {review.comments ? review.comments.length : 0}
                  </IconButton>
                  <IconButton>
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

              <div className="comment-creater">
                <div style={{ margin: "10px" }}>
                  <TextField
                    value={comment.text}
                    size="small"
                    variant="outlined"
                    style={{ width: "430px" }}
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
                      style={{ width: "90px", marginRight: "10px" }}
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
        </div>
      </ModalForm>
    </>
  );
}
export default TileReviewUnit;
