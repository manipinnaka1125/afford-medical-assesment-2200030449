import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Stockapi from './components/Stockapi';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Stockapi/>} />

      </Routes>
    </Router>
  );
}
export default App;