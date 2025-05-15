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
  user: window.localStorage.getItem("user") || '',
  token: window.localStorage.getItem("token") || '',
  status: '',
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
        state.user='';
        state.token='';
    },
  },
  extraReducers:(builder) => {
    builder.addCase(login.pending, (state)=>{
        state.status = 'loading';
    }).addCase(login.fulfilled, (state, action)=>{
        state.status = 'success';
        state.user = action.payload
    }).addCase(login.rejected,(state,action)=>{
        state.status = "failed";
        state.error = action.payload
    })
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
