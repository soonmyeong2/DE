import {
  FavoriteBorderOutlined,
  ViewDayOutlined,
  ViewModuleOutlined,
} from "@material-ui/icons";
import { withRouter } from "react-router-dom";
import "../css/TopBar.scss";
import logo from "../image/logo.png";
import React, { useState } from "react";
import { Button } from "@material-ui/core";

function SearchTopBar({ history, onUpdateSearchInfo, onChangeSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearchBar = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickSearchButton = () => {
    onUpdateSearchInfo(searchValue);
    onChangeSearch(searchValue);
    history.push(`/search?search=${searchValue}`);
    // history.go();
  };
  return (
    <>
      <div
        role="search"
        className="navbar-form navbar-left ng-pristine ng-valid"
        id="express-form"
      >
        <input
          required=""
          className="form-control tt-input"
          id="express-form-typeahead"
          dir="auto"
          type="text"
          onChange={onChangeSearchBar}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onClickSearchButton();
            }
          }}
        />
      </div>
    </>
  );
}

export default withRouter(function TopBar({
  history,
  component,
  onUpdateSearchInfo,
  onChangeComponent,
  onChangeSearch,
  search,
}) {
  const onClickLogo = () => {
    history.push("/");
    if (search === "") {
      history.go();
    } else {
      onChangeSearch("");
    }

    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="bar">
        <div className="link-button">
          {!component ? (
            <Button
              onClick={() => {
                localStorage.setItem("component", JSON.stringify(!component));

                window.scrollTo(0, 0);
                onChangeComponent(!component);
              }}
            >
              <ViewDayOutlined fontSize="large"></ViewDayOutlined>
            </Button>
          ) : (
            <Button
              onClick={() => {
                window.scrollTo(0, 0);
                localStorage.setItem("component", JSON.stringify(!component));

                onChangeComponent(!component);
              }}
            >
              <ViewModuleOutlined fontSize="large"></ViewModuleOutlined>
            </Button>
          )}

          <Button>
            <FavoriteBorderOutlined onClick={() => history.push(`/like`)} />
          </Button>
        </div>
        <img alt="logo" onClick={onClickLogo} className="logo" src={logo}></img>
        <div style={{ display: "flex" }}>
          <SearchTopBar
            history={history}
            onUpdateSearchInfo={onUpdateSearchInfo}
            onChangeSearch={onChangeSearch}
          />
        </div>
      </div>
    </>
  );
});
