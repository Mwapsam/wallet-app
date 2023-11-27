import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../utils/types';
import { BASE_URL, getToken, saveToken } from '../utils/server';

export const registerUser = createAsyncThunk(
  'user/register',
  async (user: User) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/register/`, user);
      const res = response.data;
      return res;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error(
        'An error occurred during registration. Please try again.'
      );
    }
  }
);

export const loginUser = createAsyncThunk('user/login', async (user: User) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/token/`, user);
    const res = response.data;
    saveToken('access', res.access);
    saveToken('refresh', res.refresh);
    return res;
  } catch (error) {
    throw new Error(
      'An error occurred during authentication. Please try again.'
    );
  }
});

export const refreshTokens = async () => {
  try {
    const refreshToken = await getToken('refresh');
    if (!refreshToken) {
      return 'Refresh token not available';
    }
    const response = await axios.post(`${BASE_URL}/api/v1/token/refresh/`, {
      refresh: refreshToken,
    });
    const res = response.data;
    saveToken('access', res.access);
    return 'Tokens refreshed successfully';
  } catch (error) {
    throw new Error('Token refresh failed');
  }
};

export const currentUser = createAsyncThunk('user/currentUser', async () => {
  try {
    await refreshTokens();

    const jwtToken = await getToken('access');    

    if (!jwtToken) {
      throw new Error('Authentication failed!');
    }

    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    const response = await axios.get(`${BASE_URL}/api/v1/current-user/`, {
      headers,
    });
    const res = response.data;
    console.log(res);
    
    return res;
  } catch (error) {
    console.log(error);
    
    throw new Error('Failed to fetch current user');
  }
});
