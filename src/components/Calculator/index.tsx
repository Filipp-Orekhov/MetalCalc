import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { calculateWeightApi } from '../../api/api';
import { selectSelectedShape, selectSelectedMaterial } from '../../store/selectors';
import { ParamsType } from '../../types/metal';
import style from './style.module.scss';

const defaultParams: ParamsType = {
  thickness: '',
  materialLength: '',
  diameter: '',
  firstSide: '',
  secondSide: '',
};

const Calculator = () => {
  const selectedShape = useSelector(selectSelectedShape);
  const selectedMaterial = useSelector(selectSelectedMaterial);

  const [params, setParams] = useState<ParamsType>(defaultParams);
  const [weight, setWeight] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setParams(defaultParams);
    setWeight(null);
    setError(null);
  }, [selectedShape, selectedMaterial]);

  if (!selectedShape || !selectedMaterial) return null;

  const handleInputChange = (key: keyof ParamsType, value: string) => {
    if (value === '' || (/^\d*\.?\d*$/.test(value) && Number(value) > 0)) {
      setParams((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await calculateWeightApi(selectedShape.id, selectedMaterial.name, params);
      if (result.error) {
        setError(result.error);
        setWeight(null);
      } else {
        setWeight(result.weight);
        setError(null);
      }
    } catch {
      setError('Ошибка при расчёте');
      setWeight(null);
    }
  };

  return (
    <div className={style.Calculator}>
      <h3>Расчёт массы</h3>

      {selectedShape.requiredParams.map((param) => (
        <input
          key={param}
          className="custom-input"
          type="text"
          inputMode="decimal"
          pattern="^\d*\.?\d*$"
          placeholder={`${param === 'materialLength' ? 'Длина, м' : param === 'thickness' ? 'Толщина, мм' : param === 'diameter' ? 'Диаметр, мм' : `Сторона ${param.endsWith('Side') ? (param === 'firstSide' ? '1' : '2') : ''}, мм`}`}
          value={params[param as keyof ParamsType]}
          onChange={(e) => handleInputChange(param as keyof ParamsType, e.target.value)}
        />
      ))}

      <button onClick={handleSubmit}>Рассчитать</button>

      {error && <p className={style.Error}>{error}</p>}
      {weight && <p className={style.Weight}>Масса: {weight} кг</p>}
    </div>
  );
};

export default Calculator;
