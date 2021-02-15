import { useDispatch, useSelector } from "react-redux";
import Home from "../components/Home";
import SearchHome from "../components/SearchHome";
import { changeComponent } from "../modules/route";
import { Route } from "react-router-dom";
import { updateSearchInfo, updateUserInfo } from "../modules/info";
export default function HomeContainer() {
  const { component, userInfo, searchInfo } = useSelector((state) => ({
    component: state.route.component,
    userInfo: state.info.userInfo,
    searchInfo: state.info.searchInfo,
  }));

  const dispatch = useDispatch();

  const onUpdateUserInfo = (newUserInfo) =>
    dispatch(updateUserInfo(newUserInfo));

  const onChangeComponent = (component) => dispatch(changeComponent(component));

  return (
    <>
      <Route
        path="/"
        exact
        render={() => (
          <Home
            component={component}
            onUpdateUserInfo={onUpdateUserInfo}
            onChangeComponent={onChangeComponent}
            searchInfo={searchInfo}
            userInfo={userInfo}
          />
        )}
      />
      {/* <Route path="/tile" exact render={() => <TileHome />} /> */}
      <Route
        path="/search"
        exact
        render={() => (
          <SearchHome
            component={component}
            onUpdateUserInfo={onUpdateUserInfo}
            userInfo={userInfo}
          />
        )}
      />
    </>
  );
}
