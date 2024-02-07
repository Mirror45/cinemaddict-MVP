const createFilterItemTemplate = (filters) => {
  const { name, count } = filters;
  return `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`;
};

export const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join("");

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};