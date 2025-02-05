import { Link } from 'react-router-dom';

const Contacts = () => {
  return (
    <div className="Contacts">
      <li><Link to="/home">Перейти на страницу калькулятора</Link></li>
      <h1>Контакты, которые мы заслужили</h1>
      <p>Привет!</p>
    </div>
  );
};

export default Contacts;