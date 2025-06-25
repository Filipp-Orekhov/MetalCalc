import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { selectSelectedMaterial, selectSelectedShape } from '../../store/selectors';
import { setSelectedMaterial } from '../../store/metalSlice';
import style from './style.module.scss';

const MaterialSelector = () => {
  const dispatch = useDispatch();
  const selectedShape = useSelector(selectSelectedShape);
  const selectedMaterial = useSelector(selectSelectedMaterial);
  const allMaterials = useSelector((state: RootState) => state.metal.materials);

  if (!selectedShape) return null;

  // Получаем список материалов по materialIds
  const availableMaterials = selectedShape.materialIds
    .map((id) => allMaterials.find((mat) => mat.id === id))
    .filter((mat): mat is NonNullable<typeof mat> => !!mat);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const material = allMaterials.find((m) => m.id === selectedId);
    if (material) {
      dispatch(setSelectedMaterial(material.id));
    }
  };

  return (
    <div className={style.MaterialSelector}>
      <h3>Выберите материал</h3>
      <select className="custom-select" value={selectedMaterial?.id || ''} onChange={handleChange}>
        <option className="option" value="">
          Выберите
        </option>
        {availableMaterials.map((material) => (
          <option key={material.id} value={material.id}>
            {material.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MaterialSelector;
