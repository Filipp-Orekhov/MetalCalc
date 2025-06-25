import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedShape, selectShapes } from '../../store/selectors';
import { fetchMetalData, setSelectedShape } from '../../store/metalSlice';
import style from './style.module.scss';
import { AppDispatch } from '../../store/store.ts';

const ShapeSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shapes = useSelector(selectShapes);
  const selectedShape = useSelector(selectSelectedShape);

  useEffect(() => {
    dispatch(fetchMetalData());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shapeId = e.target.value;
    const shape = shapes.find((s) => s.id === shapeId);
    if (shape) {
      dispatch(setSelectedShape(shape.id));
    }
  };

  return (
    <div className={style.ShapeSelector}>
      <h3>Выберите форму проката</h3>
      <select className="custom-select" value={selectedShape?.id || ''} onChange={handleChange}>
        <option value="">Выберите</option>
        {shapes.map((shape) => (
          <option key={shape.id} value={shape.id}>
            {shape.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ShapeSelector;
