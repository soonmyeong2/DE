import "./css/App.scss";
import { Route } from "react-router-dom";

import HomeContainer from "./containers/HomeContainser";
import TileContainer from "./containers/TileContainser";
import TopBarContainer from "./containers/TopBarContainer";
import SearchContainer from "./containers/SearchContainer";
function App() {
  return (
    <div className="app">
      <TopBarContainer />
      <div className="contents-box">
        <Route path="/" exact component={HomeContainer} />
        <Route path="/tile" exact component={TileContainer} />
        <Route path="/search" exact component={SearchContainer} />
      </div>
    </div>
  );
}

export default App;
