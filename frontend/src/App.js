import Navbar from './components/navbar';
import Index from './components/index';
import Footer from './components/footer';

import './css/App.css';

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <Navbar />
      </div>
      <div className="app-body">
        <Index />
      </div>
      <div className="app-footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
