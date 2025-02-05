import ShapeSelector from '../components/ShapeSelector.tsx';
import MaterialSelector from '../components/MaterialSelector.tsx';
import Calculator from '../components/Calculator.tsx';

const Home = () => (
  <div className='main_container'>
    <h1>Металлокалькулятор</h1>
    <ShapeSelector />
    <MaterialSelector />
    <Calculator />
  </div>
);

export default Home;