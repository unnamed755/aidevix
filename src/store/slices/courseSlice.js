import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  currentCourse: null,
  favorites: [],
  watchHistory: [],
  loading: false,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
    addToHistory: (state, action) => {
      state.watchHistory.push(action.payload);
    },
  },
});

export const { setCourses, setCurrentCourse, addToFavorites, removeFromFavorites, addToHistory } = courseSlice.actions;
export default courseSlice.reducer;
