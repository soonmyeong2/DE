import TopBar from "../components/TopBar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeComponent, changeSearch } from "../modules/route";
import { updateSearchInfo } from "../modules/info";
export default function TopBarContainer() {
  const { component } = useSelector((state) => ({
    component: state.route.component,
  }));
  const dispatch = useDispatch();
  const onUpdateSearchInfo = (newSearch) =>
    dispatch(updateSearchInfo(newSearch));
  const onChangeComponent = (component) => dispatch(changeComponent(component));

  const onChangeSearch = (component) => dispatch(changeSearch(component));

  return (
    <>
      <TopBar
        component={component}
        onChangeComponent={onChangeComponent}
        onUpdateSearchInfo={onUpdateSearchInfo}
        onChangeSearch={onChangeSearch}
      />
    </>
  );
}
