import { createSlice } from '@reduxjs/toolkit';
import { currentUser, loginUser, registerUser } from '../services/auth.service';
import { User } from '../utils/types';

interface UserState {
  user: User;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean,
}

const initialState: UserState = {
  user: {
    id: '',
    name: '',
    email: '',
    phone: null,
    is_active: false,
    is_staff: false,
    user_permissions: [],
  },
  loading: false,
  error: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })

      .addCase(currentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default userSlice.reducer;
