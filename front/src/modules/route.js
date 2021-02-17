const CHANGE_COMPONENT = "route/CHANGE_COMPONENT";
const CHANGE_SEARCH = "route/CHANGE_SEARCH";

export const changeComponent = (component) => ({
  type: CHANGE_COMPONENT,
  component,
});

export const changeSearch = (search) => ({
  type: CHANGE_SEARCH,
  search,
});

let tempComponent = JSON.parse(localStorage.getItem("component"));
console.log(tempComponent, 1919);
if (tempComponent === null) {
  tempComponent = true;
}

export const initialState = {
  component: tempComponent, //true: basic, false: tile
  search: "",
};

export default function route(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COMPONENT:
      return {
        ...state,
        component: action.component,
      };
    case CHANGE_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
}
