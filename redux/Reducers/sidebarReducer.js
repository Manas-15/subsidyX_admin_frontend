export function sidebar(state = {}, action) {
  switch (action.type) {
    case "SELECTED_CATEGORY":
      return {
        selectedItem: action?.item,
      };

    default:
      return state;
  }
}
