import { ViewDayOutlined, ViewModuleOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "../css/TopBar.scss";
import logo from '../image/logo.png'
export default function TopBar() {
  return (
    <>
      <div className="bar">
        <div></div>
        <img alt="logo" className="logo" src={logo}></img>
        <div>
          <div className="link-button">
            {window.location.pathname.includes("/tiled") ?
            <Link to="/"><ViewDayOutlined fontSize="large"></ViewDayOutlined></Link>:<Link to="/tiled"><ViewModuleOutlined fontSize="large"></ViewModuleOutlined></Link> }
        </div>
        </div>
        </div>
    </>
  );
}
