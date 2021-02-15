const UPDATE_USER_INFO = "info/UPDATE_USER_INFO";
const UPDATE_SEARCH_INFO = "info/UPDATE_SEARCH_INFO";

export const updateUserInfo = (newUserInfo) => ({
  type: UPDATE_USER_INFO,
  newUserInfo,
});

export const updateSearchInfo = (newSearch) => ({
  type: UPDATE_SEARCH_INFO,
  newSearch,
});

let tempUserInfo = JSON.parse(localStorage.getItem("userInfo"));
if (!tempUserInfo) {
  tempUserInfo = { password: "", name: "" };
}

let tempSearchInfo = JSON.parse(localStorage.getItem("searchInfo"));
if (!tempSearchInfo) {
  tempSearchInfo = [];
}

const initialState = {
  userInfo: tempUserInfo,
  searchInfo: [...tempSearchInfo],
};

export default function info(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: { ...action.newUserInfo },
      };
    case UPDATE_SEARCH_INFO:
      const tempSearchInfo = state.searchInfo;
      tempSearchInfo.push(action.newSearch);
      if (tempSearchInfo.length > 10) {
        tempSearchInfo.shift();
      }
      return {
        ...state,
        searchInfo: [...tempSearchInfo],
      };
    default:
      return state;
  }
}
