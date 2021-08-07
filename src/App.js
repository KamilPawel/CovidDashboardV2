import logo from './logo.svg';
import './App.css';
import CovidMap from './components/CovidMap';
import PlotData from './components/PlotData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PlotData nation = 'england'/>
        <CovidMap />
      </header>
    </div>
  );
}

export default App;
