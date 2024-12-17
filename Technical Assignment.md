<aside>
🌐 Create an application for displaying recipes.

</aside>

### The following requirements must be met:

- Display of recipes.
- Display of a single recipe.
- Recipes filtering by category.
- Pagination.
An example of pagination is below. The arrows change the page to `1`. If there are more than `10` pages, display pages `1` to `7`, then `...`, then the last page.

![Untitled](https://ibb.co/mXFwBQj)

- Debounced search.
- Several recipes select and count the ingredients needed to prepare them. You need to display basic information about the selected recipes and combine their ingredients into one list.
- About search, category filtering, and pagination: search should be implemented through the API, while category filtering and pagination should be implemented only on the front-end.

### An example of the data obtained:
```javascript
{
  "meals": [
    {
      "idMeal": "52850",
      "strMeal": "Chicken Couscous",
      "strDrinkAlternate": null,
      "strCategory": "Chicken",
      "strArea": "Moroccan",
      "strInstructions": "Heat the olive oil in a large frying pan and cook the onion for 1-2 mins just until softened. Add the chicken and fry for 7-10 mins until cooked through and the onions have turned golden. Grate over the ginger, stir through the harissa to coat everything and cook for 1 min more.\r\n\r\nTip in the apricots, chickpeas and couscous, then pour over the stock and stir once. Cover with a lid or tightly cover the pan with foil and leave for about 5 mins until the couscous has soaked up all the stock and is soft. Fluff up the couscous with a fork and scatter over the coriander to serve. Serve with extra harissa, if you like.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/qxytrx1511304021.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=GZQGy9oscVk",
      "strIngredient1": "Olive Oil",
      "strIngredient2": "Onion",
      "strIngredient3": "Chicken Breast",
      "strIngredient4": "Ginger",
      "strIngredient5": "Harissa Spice",
      "strIngredient6": "Dried Apricots",
      "strIngredient7": "Chickpeas",
      "strIngredient8": "Couscous",
      "strIngredient9": "Chicken Stock",
      "strIngredient10": "Coriander",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1 tbsp",
      "strMeasure2": "1 chopped",
      "strMeasure3": "200g",
      "strMeasure4": "pinch",
      "strMeasure5": "2 tblsp ",
      "strMeasure6": "10",
      "strMeasure7": "220g",
      "strMeasure8": "200g",
      "strMeasure9": "200ml",
      "strMeasure10": "Handful",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/13139/onepan-chicken-couscous",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    }
  ]
}
```

### Use the following technologies:

- [TheMealDB](https://www.themealdb.com/api.php?ref=apilist.fun) as `API`.
- `React`.
- `TypeScript`.
- other auxiliary libraries.

### There should be three pages:

1. All recipes page (display a photo, name, category, and place of origin in the form of a card).
2. Single recipe page (display all the data we receive).
3. Favorite recipes page (something like a shopping cart - display cards of favorite recipes, a summary list of their ingredients, and cooking instructions).

### Additionally:

1. Use `Tanstack Query`.
2. Use cached data from `Tanstack Query` instead of `state manager`.

### Notes:

1. The test task must be placed on one of the following services: `GitHub`, `GitLab`, `BitBucket`, and it must be publicly available.
2. The test task must be registered on one of the following services: `Vercel`, `Netlify`, `Heroku`, `GitHub Pages`.
3. We expect you to come up with creative solutions to problems, such as *“How do I get all the products?”* Good luck!
