import { ViewDayOutlined, ViewModuleOutlined } from "@material-ui/icons";
import { Link, withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import "../css/TopBar.scss";
import logo from "../image/logo.png";
export default withRouter(function TopBar({ history, component }) {
  const onClickLogo = () => {
    history.push("/");
    history.go();
  };
  return (
    <>
      <div className="bar">
        <div className="link-button">
          {" "}
          {component === "tile" ? (
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
        <div className="">
          <form
            method="GET"
            action="https://www.shopwithscrip.com/Search?"
            role="search"
            className="navbar-form navbar-left ng-pristine ng-valid"
            id="express-form"
            novalidate=""
          >
            <input
              required=""
              name="q"
              placeholder="뭘 찾으세요..?"
              className="form-control tt-input"
              id="express-form-typeahead"
              autocomplete="off"
              spellcheck="false"
              dir="auto"
              type="text"
            />
          </form>
        </div>
      </div>
    </>
  );
});
