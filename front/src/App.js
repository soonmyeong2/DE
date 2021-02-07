import "./css/App.scss";
import { Route } from "react-router-dom";

import HomeContainer from "./containers/HomeContainser";
import Home2Container from "./containers/Home2Containser";
import TopBarContainer from "./containers/TopBarContainer";
import Search from "./components/Search";
function App() {
  return (
    <div className="app">
      <TopBarContainer />
      <div className="contents-box">
        <Route path="/" exact component={HomeContainer} />

        <Route path="/tiled" exact component={Home2Container} />

        <Route path="/search" exact component={Search} />
      </div>
    </div>
  );
}

export default App;
