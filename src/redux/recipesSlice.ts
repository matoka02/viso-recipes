import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchCategories, fetchRecipesBySearch, fetchRecipeDetails as fetchDetailsAPI } from '../utils/api';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  [key: `strIngredient${number}`]: string | undefined; // Allow dynamic ingredient keys
  [key: `strMeasure${number}`]: string | undefined; // Allow dynamic measure keys
}

interface RecipeDetails {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  // [key: string]: any;
  [key: string]: string | undefined; 
}

interface RecipeState {
  recipes: Recipe[];
  categories: string[];
  selectedCategory: string | null,
  // selectedRecipes: Recipe[];
  selectedRecipes: RecipeDetails[];
  searchTerm: string;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  // selectedRecipe: Recipe | null;
  selectedRecipe: RecipeDetails | null;
}


const initialState: RecipeState = {
  recipes: [],
  categories: [],
  selectedCategory: null,
  selectedRecipes: [],
  searchTerm: '',
  currentPage: 1,
  isLoading: false,
  error: null,
  selectedRecipe: null,
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (query: string) => {
    const data = await fetchRecipesBySearch(query);
    return data || [];
  }
);

export const fetchRecipeDetails = createAsyncThunk<RecipeDetails, string>(
  'recipes/fetchRecipeDetails',
  async (id: string) => {
    const data = await fetchDetailsAPI(id);
    return data;
  }
);

export const fetchAllCategories = createAsyncThunk(
  'recipes/fetchCategories',
  async () => {
    const data = await fetchCategories();
    return data.map((category: any) => category.strCategory);
  }
);

export const addSelectedRecipeWithDetails = createAsyncThunk<
  RecipeDetails,
  string,
  { state: { recipes: RecipeState } }
>(
  'recipes/addSelectedRecipeWithDetails',
  async (idMeal, { getState }) => {
    const { recipes } = getState();
    const existingRecipe = recipes.selectedRecipes.find((r) => r.idMeal === idMeal);
    if (existingRecipe) {
      throw new Error('Recipe already selected');
    }
    const recipeDetails = await fetchDetailsAPI(idMeal);
    return recipeDetails;
  }
);



const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    // addSelectedRecipe(state, action: PayloadAction<Recipe>) {
    //   state.selectedRecipes.push(action.payload);
    // },
    // removeSelectedRecipe(state, action: PayloadAction<string>) {
    //   state.selectedRecipes = state.selectedRecipes.filter(
    //     (recipe) => recipe.idMeal !== action.payload
    //   );
    // },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    removeSelectedRecipe(state, action: PayloadAction<string>) {
      state.selectedRecipes = state.selectedRecipes.filter(
        (recipe) => recipe.idMeal !== action.payload
      );
    },
    removeSelectedRecipeById(state, action: PayloadAction<string>) {
      state.selectedRecipes = state.selectedRecipes.filter(
        (recipe) => recipe.idMeal !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
    // Handle fetchRecipes Thunk
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch recipes';
        state.isLoading = false;
      })
      // Handle fetchRecipeDetails Thunk
      .addCase(fetchRecipeDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipeDetails.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload; // <-- Set selectedRecipe
        state.isLoading = false;
      })
      .addCase(fetchRecipeDetails.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch recipe details';
        state.isLoading = false;
      })
      // Handle fetchAllCategories Thunk
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      // Handle addSelectedRecipeWithDetails Thunk
      .addCase(addSelectedRecipeWithDetails.fulfilled, (state, action) => {
        state.selectedRecipes.push(action.payload);
      })
      .addCase(addSelectedRecipeWithDetails.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to add selected recipe';
      });
  },
})

export const {
  setSearchTerm,
  setCurrentPage,
  // addSelectedRecipe,
  // removeSelectedRecipe,
  setSelectedCategory,
  removeSelectedRecipe,
  removeSelectedRecipeById,
} = recipesSlice.actions;

export default recipesSlice.reducer;