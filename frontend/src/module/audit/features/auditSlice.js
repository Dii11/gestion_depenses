import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auditApi from '../services/auditApi'

export const fetchAudits=createAsyncThunk(
'audits/fetchAudits',async()=>{
    const response=await auditApi.getAudit();
    return response.data;

}
)

const auditSlice=createSlice({
    name:'audits',
    initialState:{
        audits:[],
        loading:false,
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAudits.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchAudits.fulfilled,(state,action)=>{
            state.loading=false;
            state.audits=action.payload
        })
        .addCase(fetchAudits.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
    }

})
export default auditSlice.reducer;