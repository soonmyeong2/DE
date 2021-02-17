import { useDispatch, useSelector } from "react-redux";
import Home from "../components/Home";
import SearchHome from "../components/SearchHome";
import { changeComponent, changeSearch } from "../modules/route";
import { Route } from "react-router-dom";
import { updateLikeInfo, updateUserInfo } from "../modules/info";
import LikeHome from "../components/LikeHome";
export default function HomeContainer() {
  const { component, userInfo, searchInfo, search, likeInfo } = useSelector(
    (state) => ({
      component: state.route.component,
      userInfo: state.info.userInfo,
      searchInfo: state.info.searchInfo,
      search: state.route.search,
      likeInfo: state.info.likeInfo,
    })
  );

  const dispatch = useDispatch();

  const onUpdateUserInfo = (newUserInfo) =>
    dispatch(updateUserInfo(newUserInfo));

  const onChangeComponent = (component) => dispatch(changeComponent(component));
  const onUpdateLikeInfo = (newLikeInfo) =>
    dispatch(updateLikeInfo(newLikeInfo));
  const onChangeSearch = (component) => dispatch(changeSearch(component));

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
            likeInfo={likeInfo}
            onUpdateLikeInfo={onUpdateLikeInfo}
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
            search={search}
            onChangeSearch={onChangeSearch}
            onUpdateLikeInfo={onUpdateLikeInfo}
            likeInfo={likeInfo}
          />
        )}
      />
      <Route
        path="/like"
        exact
        render={() => (
          <LikeHome
            component={component}
            onUpdateUserInfo={onUpdateUserInfo}
            userInfo={userInfo}
            search={search}
            onChangeSearch={onChangeSearch}
            onUpdateLikeInfo={onUpdateLikeInfo}
            likeInfo={likeInfo}
          />
        )}
      />
    </>
  );
}
