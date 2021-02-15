import { useDispatch, useSelector } from "react-redux";
import BasicHome from "../components/BasicHome";
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

  const onUpdateSearchInfo = (newSearch) =>
    dispatch(updateSearchInfo(newSearch));

  const onChangeComponent = (component) => dispatch(changeComponent(component));

  return (
    <>
      <Route
        path="/"
        exact
        render={() => (
          <BasicHome
            component={component}
            onUpdateSearchInfo={onUpdateSearchInfo}
            onChangeComponent={onChangeComponent}
            searchInfo={searchInfo}
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
            onUpdateSearchInfo={onUpdateSearchInfo}
            onUpdateUserInfo={onUpdateUserInfo}
            userInfo={userInfo}
          />
        )}
      />
    </>
  );
}
