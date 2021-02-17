const UPDATE_USER_INFO = "info/UPDATE_USER_INFO";
const UPDATE_SEARCH_INFO = "info/UPDATE_SEARCH_INFO";
const UPDATE_LIKE_INFO = "info/UPDATE_LIKE_INFO";
export const updateUserInfo = (newUserInfo) => ({
  type: UPDATE_USER_INFO,
  newUserInfo,
});

export const updateSearchInfo = (newSearch) => ({
  type: UPDATE_SEARCH_INFO,
  newSearch,
});

export const updateLikeInfo = (newLikeInfo) => ({
  type: UPDATE_LIKE_INFO,
  newLikeInfo,
});

let tempUserInfo = JSON.parse(localStorage.getItem("userInfo"));
if (!tempUserInfo) {
  tempUserInfo = { password: "", name: "" };
}

let tempSearchInfo = JSON.parse(localStorage.getItem("searchInfo"));
if (!tempSearchInfo) {
  tempSearchInfo = [];
}

let tempLikeInfo = JSON.parse(localStorage.getItem("likeInfo"));
if (!tempLikeInfo) {
  tempLikeInfo = [];
}

const initialState = {
  userInfo: tempUserInfo,
  searchInfo: [...tempSearchInfo],
  likeInfo: [...tempLikeInfo],
};

export default function info(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: { ...action.newUserInfo },
      };

    case UPDATE_LIKE_INFO:
      return {
        ...state,
        likeInfo: action.newLikeInfo,
      };
    case UPDATE_SEARCH_INFO:
      const tempSearchInfo = state.searchInfo;
      tempSearchInfo.push(action.newSearch);
      if (tempSearchInfo.length > 10) {
        tempSearchInfo.shift();
      }
      localStorage.setItem("searchInfo", JSON.stringify(tempSearchInfo));
      return {
        ...state,
        searchInfo: [...tempSearchInfo],
      };
    default:
      return state;
  }
}
