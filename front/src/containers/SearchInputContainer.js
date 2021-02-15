import { useDispatch } from "react-redux";
import SearchInput from "../components/SearchInput";
import { updateSearchInfo } from "../modules/info";

export default function SearchInputContainer() {
  const dispatch = useDispatch();
  const onUpdateSearchInfo = (newSearch) =>
    dispatch(updateSearchInfo(newSearch));
  return (
    <>
      <SearchInput onUpdateSearchInfo={onUpdateSearchInfo} />
    </>
  );
}
