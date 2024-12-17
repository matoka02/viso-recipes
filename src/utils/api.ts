const BASE_URL = '//www.themealdb.com/api/json/v1/1';

export const fetchRecipesBySearch = async (query: string) => {
  const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
  const data = await response.json();
  return data.meals || [];
};

export const fetchRecipeDetails = async (id: string) => {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals?.[0] || null;
};

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories.php`);
  const data = await response.json();
  return data.categories || [];
};
