// src/app/leadsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  linkedin: string;
  visas: string;
  resume: any;
  message: string;
  state: 'Pending' | 'Reached Out';
  createdAt: string;
  country: string;
};

interface LeadsState {
  leads: Lead[];
  searchQuery: string;
  sortBy: keyof Lead;
  sortOrder: 'asc' | 'desc';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LeadsState = {
  leads: [],
  searchQuery: '',
  sortBy: 'firstName',
  sortOrder: 'asc',
  status: 'idle',
  error: null,
};

// Async thunk to fetch leads
export const fetchLeads = createAsyncThunk('leads/fetchLeads', async () => {
  const response = await fetch('/api/leads');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
});

// Async thunk to update lead status
export const updateLeadStatus = createAsyncThunk(
  'leads/updateLeadStatus',
  async (id: string) => {
    const response = await fetch('/api/leads', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return id; // Return the ID so we can update the state
  }
);

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action: PayloadAction<keyof Lead>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeads.fulfilled, (state, action: PayloadAction<Lead[]>) => {
        state.status = 'succeeded';
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || "Failed to fetch leads";
      })
      .addCase(updateLeadStatus.fulfilled, (state, action: PayloadAction<string>) => {
        const id = action.payload;
        state.leads = state.leads.map(lead =>
          lead.id === id ? { ...lead, state: 'Reached Out' } : lead
        );
      })
      .addCase(updateLeadStatus.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update lead status";
      });
  },
});

export const { setSearchQuery, setSortBy, setSortOrder } = leadsSlice.actions;

export default leadsSlice.reducer;
