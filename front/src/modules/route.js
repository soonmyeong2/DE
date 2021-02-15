const CHANGE_COMPONENT = "route/CHANGE_COMPONENT";

export const changeComponent = (component) => ({
  type: CHANGE_COMPONENT,
  component,
});

let tempComponent = JSON.parse(localStorage.getItem("component"));
console.log(tempComponent, 1919);
if (tempComponent === null) {
  tempComponent = true;
}

export const initialState = {
  component: tempComponent, //true: basic, false: tile
};

export default function route(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COMPONENT:
      return {
        ...state,
        component: action.component,
      };
    default:
      return state;
  }
}
