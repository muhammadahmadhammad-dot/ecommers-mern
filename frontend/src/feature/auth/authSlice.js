import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService  from "./authService.js";


export const login = createAsyncThunk('auth/login', async(data, thunkAPI )=>{
    try {
        return await authService.login(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const initialState = {
  user: window.localStorage.getItem("user") ? JSON.parse(window.localStorage.getItem("user")) : '',
  token: window.localStorage.getItem("token") ? JSON.parse(window.localStorage.getItem("token")) : '',
  status: '',
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      window.localStorage.removeItem("user")
      window.localStorage.removeItem("token")
        state.auth.user='';
        state.auth.token='';
    },
  },
  extraReducers:(builder) => {
    builder.addCase(login.pending, (state)=>{
        state.status = 'loading';
    }).addCase(login.fulfilled, (state, action)=>{
        state.status = 'success';
        state.user = action.payload.user
        state.token = action.payload.token
    }).addCase(login.rejected,(state,action)=>{
        state.status = "failed";
        state.error = action.payload
    })
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
