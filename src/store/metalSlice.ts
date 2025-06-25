import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchMetalDataApi } from '../api/api.ts';
export interface Material {
  id: string;
  name: string;
  density: number;
}

export interface Shape {
  id: string;
  name: string;
  requiredParams: string[];
  formula: string;
  materialIds: string[];
}

interface MetalState {
  shapes: Shape[];
  loading: boolean;
  error: string | null;
  selectedShape: Shape | null;
  selectedMaterial: Material | null;
  materials: Material[];
}

const initialState: MetalState = {
  shapes: [],
  loading: false,
  error: null,
  selectedShape: null,
  selectedMaterial: null,
  materials: [],
};

export const fetchMetalData = createAsyncThunk('metal/fetchMetalData', async (_, thunkAPI) => {
  try {
    const data = await fetchMetalDataApi();
    return data; // ожидаем { shapes, materials }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Ошибка при загрузке данных');
  }
});

const metalSlice = createSlice({
  name: 'metal',
  initialState,
  reducers: {
    setSelectedMaterial(state, action: PayloadAction<String>) {
      const materialId = action.payload;
      state.selectedMaterial = state.materials.find((m) => m.id === materialId) || null;
    },
    setSelectedShape(state, action: PayloadAction<String>) {
      const shapeId = action.payload;
      state.selectedShape = state.shapes.find((s) => s.id === shapeId) || null;
      state.selectedMaterial = null; // Можно сбрасывать выбранный материал при смене формы
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMetalData.fulfilled,
        (state, action: PayloadAction<{ shapes: Shape[]; materials: Material[] }>) => {
          state.loading = false;
          state.shapes = action.payload.shapes;
          state.materials = action.payload.materials;
        },
      )
      .addCase(fetchMetalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedMaterial, setSelectedShape } = metalSlice.actions;
export default metalSlice.reducer;
