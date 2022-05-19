import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store'
import { v4 as uuidv4 } from 'uuid'


interface Interaction {
  id: number,
  prompt: string,
  response: string
}

interface InteractionsState {
  values: Interaction[];
  loading: boolean;
}

interface apiThunkProps {
  userPrompt: string
}

interface ThunkAPI {
  dispatch: AppDispatch
  getState: () => RootState
  extra?: any
  requestId: string
  signal: AbortSignal
}


const initialState: InteractionsState = {
  values: [],
  loading: false,
};


export const generateResponse = createAsyncThunk<void, apiThunkProps, ThunkAPI>(
  'interactions/generateResponse',
  async (props, thunkApi) => {
    const dispatch = thunkApi.dispatch
    const state = thunkApi.getState()
    const prompt = props.userPrompt
    let response: any
    
    setTimeout(() => {

      response = `I'm afraid I can't do that, Dave.`

      dispatch(logInteraction({
        id: uuidv4(),
        prompt,
        response
      }))
    }, 3000);

    return response;
  }
);

export const interactions = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    logInteraction: (state, { payload }) => {
      state.values.push(payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateResponse.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateResponse.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(generateResponse.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logInteraction } = interactions.actions;

export const selectInteractions = (state: RootState) => state.interactions.values;
export const selectInteractionsLoading = (state: RootState) => state.interactions.loading;



export default interactions.reducer;