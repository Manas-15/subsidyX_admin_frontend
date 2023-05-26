
export const sidebarActions = {
  selectedCategory,
};

function selectedCategory(item) {
  return { type: "SELECTED_CATEGORY", item };
}
