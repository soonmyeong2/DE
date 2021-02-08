// import Home from "../components/Home";
import { useDispatch } from "react-redux";
import Tile from "../components/Tile";
import { changeComponent } from "../modules/route";
export default function TileContainer() {
  const dispatch = useDispatch();
  const onChangeComponent = (component) => dispatch(changeComponent(component));

  return (
    <>
      <Tile onChangeComponent={onChangeComponent} />
    </>
  );
}
