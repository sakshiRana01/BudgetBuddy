import { Outlet } from 'react-router';
import './App.css';
import { Header } from './compoments/Pages/Header';
import { Home } from './compoments/Pages/Home';
import { Logins } from './compoments/Pages/Logins';
import { Signup } from './compoments/Pages/Signup';
import { Footer } from './compoments/Pages/Footer';

function App() {
  return (
    <div className="App">
    <Header/>
    <Outlet/>
    </div>
  );
}

export default App;
