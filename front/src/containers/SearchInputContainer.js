import { useDispatch } from "react-redux";
import SearchInput from "../components/SearchInput";
import { updateSearchInfo } from "../modules/info";
import { changeSearch } from "../modules/route";

export default function SearchInputContainer() {
  const dispatch = useDispatch();
  const onUpdateSearchInfo = (newSearch) =>
    dispatch(updateSearchInfo(newSearch));

  const onChangeSearch = (component) => dispatch(changeSearch(component));
  return (
    <>
      <SearchInput
        onChangeSearch={onChangeSearch}
        onUpdateSearchInfo={onUpdateSearchInfo}
      />
    </>
  );
}
