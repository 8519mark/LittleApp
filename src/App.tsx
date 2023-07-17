import './App.css';

import { Routes, Route} from 'react-router-dom';
import { Map } from './components/map/Map';
import { Home } from './components/home/Home';
import { Security } from './components/security/Security'


// return an JSX element to render into DOM object
function App() : JSX.Element {

  return (
    <Routes>
      <Route path = '/' element = {<Home />}></Route>
      <Route path = 'Map' element = {<Map />}></Route>
      <Route path = 'Security' element = {<Security />}></Route>
    </Routes>
  );
}

export default App;
