const CHANGE_COMPONENT = "route/CHANGE_COMPONENT";

export const changeComponent = (component) => ({
  type: CHANGE_COMPONENT,
  component,
});

export const initialState = {
  component: true, //true: basic, false: tile
};

export default function route(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COMPONENT:
      return {
        ...state,
        component: !action.component,
      };
    default:
      return state;
  }
}
