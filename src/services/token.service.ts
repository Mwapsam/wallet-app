import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { refreshTokens } from '../services/auth.service'; 
import { setTokens } from '../reducers/authSlice';
import { BASE_URL } from '../utils/server';

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/token/`, credentials);
    const tokens = response.data;
    return tokens;
  } catch (error) {
    throw error;
  }
});

export const refreshTokensAsync = createAsyncThunk('auth/refreshTokens', async (_, { dispatch }) => {
  try {
    const tokens = await refreshTokens(); 
    dispatch(setTokens(tokens));
  } catch (error) {
    throw error;
  }
});
