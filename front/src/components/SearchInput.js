import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import { withRouter } from "react-router-dom";
function SearchInput({ history, onUpdateSearchInfo }) {
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearchBar = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickSearchButton = () => {
    onUpdateSearchInfo(searchValue);
    history.push(`/search?search=${searchValue}`);
  };
  return (
    <>
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="뭘 찾으세요..?"
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
