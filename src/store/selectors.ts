import { RootState } from './store';

export const selectShapes = (state: RootState) => state.metal.shapes;
export const selectSelectedShape = (state: RootState) => state.metal.selectedShape;
export const selectSelectedMaterial = (state: RootState) => state.metal.selectedMaterial;
