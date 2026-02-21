import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = {
        ...action.payload.user,
        subscription: action.payload.user.subscription || 'free',
        socialMediaVerified: action.payload.user.socialMediaVerified || {
          instagram: false,
          telegram: false,
          youtube: false
        }
      };
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    updateSubscription: (state, action) => {
      if (state.user) {
        state.user.subscription = action.payload;
      }
    },
  },
});

export const { loginSuccess, logout, setUser, updateSubscription } = authSlice.actions;
export default authSlice.reducer;
