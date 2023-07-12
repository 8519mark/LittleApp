import './App.css';

import { Routes, Route} from 'react-router-dom';
import { Map } from './components/map/Map';
import { Home } from './components/home/Home';
import TestC from './components/test/TestC';


// return an JSX element to render into DOM object
function App() : JSX.Element {

  return (
    <Routes>
      <Route path = '/' element = {<Home />}></Route>
      <Route path = 'Map' element = {<Map />}></Route>
      <Route path = 'Test' element = {<TestC text = "Hello World!"/>}></Route>
    </Routes>
  );
}

export default App;
