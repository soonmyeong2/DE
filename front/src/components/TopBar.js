import { ViewDayOutlined, ViewModuleOutlined } from "@material-ui/icons";
import { Link, withRouter } from "react-router-dom";
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
        <div></div>
        <img alt="logo" onClick={onClickLogo} className="logo" src={logo}></img>
        <div>
          <div className="link-button">
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
        </div>
      </div>
    </>
  );
});
