import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchCategories, fetchRecipesBySearch } from '../utils/api';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
}

interface RecipeState {
  recipes: Recipe[];
  categories: string[];
  selectedRecipes: Recipe[];
  searchTerm: string;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  categories: [],
  selectedRecipes: [],
  searchTerm: '',
  currentPage: 1,
  isLoading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (query: string) => {
    const data = await fetchRecipesBySearch(query);
    return data || [];
  }
);

export const fetchAllCategories = createAsyncThunk(
  'recipes/fetchCategories',
  async () => {
    const data = await fetchCategories();
    return data.map((category: any) => category.strCategory);
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
    addSelectedRecipe(state, action: PayloadAction<Recipe>) {
      state.selectedRecipes.push(action.payload);
    },
    removeSelectedRecipe(state, action: PayloadAction<string>) {
      state.selectedRecipes = state.selectedRecipes.filter(
        (recipe) => recipe.idMeal !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
})

export const {
  setSearchTerm,
  setCurrentPage,
  addSelectedRecipe,
  removeSelectedRecipe,
} = recipesSlice.actions;

export default recipesSlice.reducer;