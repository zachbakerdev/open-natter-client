import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<h1>index</h1>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
