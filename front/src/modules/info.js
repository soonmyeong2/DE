const UPDATE_USER_INFO = "info/UPDATE_USER_INFO";

export const updateUserInfo = () => ({
  type: UPDATE_USER_INFO,
});
let initialState;
if (JSON.parse(localStorage.getItem("userInfo"))) {
  initialState = {
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
  };
} else {
  initialState = {
    userInfo: { password: "", name: "" },
  };
}

export default function info(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
      };
    default:
      return state;
  }
}
