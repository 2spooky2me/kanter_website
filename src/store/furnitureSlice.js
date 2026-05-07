import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    createSofa as createSofaApi,
    deleteSofa as deleteSofaApi,
    fetchSofas as fetchSofasApi,
    updateSofa as updateSofaApi,
} from '../api/sofasApi';
import { getDefaultSofas, normalizeSofa } from '../utils/sofaStorage';

const LANGUAGE_KEY = 'kanter_language';

const loadLanguage = () => {
    if (typeof window === 'undefined') {
        return 'he';
    }

    return window.localStorage.getItem(LANGUAGE_KEY) || 'he';
};

const saveLanguage = (language) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(LANGUAGE_KEY, language);
    }
};

export const fetchSofas = createAsyncThunk('furniture/fetchSofas', async () => {
    const sofas = await fetchSofasApi();
    return sofas.map(normalizeSofa);
});

export const createSofa = createAsyncThunk('furniture/createSofa', async (sofa) => {
    const savedSofa = await createSofaApi(normalizeSofa(sofa));
    return normalizeSofa(savedSofa);
});

export const saveSofa = createAsyncThunk('furniture/saveSofa', async (sofa) => {
    const savedSofa = await updateSofaApi(normalizeSofa(sofa));
    return normalizeSofa(savedSofa);
});

export const removeSofa = createAsyncThunk('furniture/removeSofa', async (id) => {
    await deleteSofaApi(id);
    return id;
});

const furnitureSlice = createSlice({
    name: 'furniture',
    initialState: {
        items: getDefaultSofas(),
        status: 'idle',
        error: null,
        videoModalOpen: false,
        currentLanguage: loadLanguage(),
    },
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload.map(normalizeSofa);
        },
        toggleVideoModal: (state) => {
            state.videoModalOpen = !state.videoModalOpen;
        },
        setLanguage: (state, action) => {
            state.currentLanguage = action.payload;
            saveLanguage(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSofas.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSofas.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchSofas.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createSofa.fulfilled, (state, action) => {
                state.items = [action.payload, ...state.items];
            })
            .addCase(saveSofa.fulfilled, (state, action) => {
                state.items = state.items.map((item) =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(removeSofa.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export const { setItems, toggleVideoModal, setLanguage } = furnitureSlice.actions;
export default furnitureSlice.reducer;
