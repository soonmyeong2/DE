import { ViewDayOutlined, ViewModuleOutlined } from "@material-ui/icons";
import { Link, withRouter } from "react-router-dom";
import "../css/TopBar.scss";
import logo from "../image/logo.png";
import React, { useState } from "react";

function SearchTopBar({ history, onUpdateSearchInfo }) {
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearchBar = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickSearchButton = () => {
    onUpdateSearchInfo(searchValue);
    history.push(`/search?search=${searchValue}`);
    history.go();
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
          placeholder="뭘 찾으세요..?"
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
}) {
  const onClickLogo = () => {
    history.push("/");
    history.go();
  };

  return (
    <>
      <div className="bar">
        <div className="link-button">
          {component ? (
            <Link to="/">
              <ViewDayOutlined fontSize="large"></ViewDayOutlined>
            </Link>
          ) : (
            <Link to="/tile">
              <ViewModuleOutlined fontSize="large"></ViewModuleOutlined>
            </Link>
          )}
        </div>
        <img alt="logo" onClick={onClickLogo} className="logo" src={logo}></img>
        <div>
          <SearchTopBar
            history={history}
            onUpdateSearchInfo={onUpdateSearchInfo}
          />
        </div>
      </div>
    </>
  );
});
