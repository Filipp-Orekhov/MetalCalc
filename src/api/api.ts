import { axiosInstance } from '../utils/axiosInstance.ts';
import { ParamsType } from '../types/metal.ts';

export const fetchMetalDataApi = async () => {
  try {
    const response = await axiosInstance.get('/api/metalData');
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
};

export const calculateWeightApi = async (
  shapeId: string,
  materialName: string,
  params: ParamsType,
) => {
  try {
    const response = await axiosInstance.post('/calculate', {
      shapeId,
      materialName,
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при расчёте веса:', error);
    throw error;
  }
};
