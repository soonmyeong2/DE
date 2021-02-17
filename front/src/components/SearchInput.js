import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { withRouter } from "react-router-dom";
function SearchInput({ history, onUpdateSearchInfo, onChangeSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearchBar = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickSearchButton = () => {
    onUpdateSearchInfo(searchValue);
    onChangeSearch(searchValue);
    history.push(`/search?search=${searchValue}`);
    // history.go();
  };
  return (
    <>
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          onChange={onChangeSearchBar}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onClickSearchButton();
            }
          }}
        />
        <button onClick={onClickSearchButton} className="searchButton">
          <SearchIcon />
        </button>
      </div>
    </>
  );
}

export default withRouter(SearchInput);
