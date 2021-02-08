import TopBar from "../components/TopBar";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeComponent } from "../modules/route";
export default function TopBarContainer() {
  const { component } = useSelector((state) => ({
    component: state.route.component,
  }));

  return (
    <>
      <TopBar component={component} />
    </>
  );
}
