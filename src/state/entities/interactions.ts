import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from '../store'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'


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

    const apiRequest = {
      prompt: props.userPrompt,
      temperature: 0.9,
      max_tokens: 50
    }
    
    const openaiURL = "https://api.openai.com/v1/engines/text-curie-001/completions"
    const response: any = await axios.post(openaiURL, apiRequest, {
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_KEY}`
      }
    })

    const interaction = response.data.choices[0].text

    dispatch(logInteraction({
      id: uuidv4(),
      prompt: props.userPrompt,
      response: interaction
    }))
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