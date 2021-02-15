import TopBar from "../components/TopBar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeComponent } from "../modules/route";
import { updateSearchInfo } from "../modules/info";
export default function TopBarContainer() {
  const { component } = useSelector((state) => ({
    component: state.route.component,
  }));
  const dispatch = useDispatch();
  const onUpdateSearchInfo = (newSearch) =>
    dispatch(updateSearchInfo(newSearch));
  const onChangeComponent = (newSearch) => dispatch(changeComponent(newSearch));

  return (
    <>
      <TopBar
        component={component}
        onChangeComponent={onChangeComponent}
        onUpdateSearchInfo={onUpdateSearchInfo}
      />
    </>
  );
}
