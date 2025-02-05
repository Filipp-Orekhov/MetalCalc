import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';

const Calculator = () => {
  const { selectedShape, selectedMaterial } = useSelector((state: RootState) => state.metal);

  type ParamsType = {
    thickness: string;
    materialLength: string;
    diameter: string;
    firstSide: string;
    secondSide: string;
  };

  const [params, setParams] = useState<ParamsType>({
    thickness: "",
    materialLength: "",
    diameter: "",
    firstSide: "",
    secondSide: ""
  });

  useEffect(() => {
    setParams({
      thickness: "",
      materialLength: "",
      diameter: "",
      firstSide: "",
      secondSide: ""
    });
  }, [selectedShape]);

  if (!selectedShape || !selectedMaterial || !selectedShape.requiredParams) return null;

  const calculateWeight = () => {
    try {
      const formula = selectedShape.formula.replace(/density/g, `${selectedMaterial.density}`);
      const result = new Function(...Object.keys(params), `return ${formula}`)(...Object.values(params).map(v => Number(v) || 0));
      return result.toFixed(2);
    } catch {
      return "Ошибка";
    }
  };

  const handleInputChange = (key: keyof ParamsType, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div key={selectedShape.id} className="Calculator">
      <h3>Расчёт массы</h3>
      {selectedShape.requiredParams.includes("firstSide") && (
      <input
        type="number"
        placeholder="Сторона 1"
        value={params.firstSide}
        onChange={event => handleInputChange("firstSide", event.target.value)}
      />)}
      {selectedShape.requiredParams.includes("secondSide") && (
        <input
        type="number"
        placeholder="Сторона 2"
        value={params.secondSide}
        onChange={event => handleInputChange("secondSide", event.target.value)}
      />)}
      {selectedShape.requiredParams.includes("diameter") && (
        <input
          type="number"
          placeholder="Диаметр"
          value={params.diameter}
          onChange={event => handleInputChange("diameter", event.target.value)}
        />)}
      {selectedShape.requiredParams.includes("thickness") && (
        <input
          type="number"
          placeholder="Толщина стенки"
          value={params.thickness}
          onChange={event => handleInputChange("thickness", event.target.value)}
        />)}
      {selectedShape.requiredParams.includes("materialLength") && (
        <input
          type="number"
          placeholder="Длина"
          value={params.materialLength}
          onChange={event => handleInputChange("materialLength", event.target.value)}
        />)}
      <p>Масса: {calculateWeight()} кг</p>
    </div>
  );
};

export default Calculator;
