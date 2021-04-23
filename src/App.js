
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageForm from './components/ImageForm/ImageForm';
import 'tachyons';
function App() {
  return (
    <div className="App">
     <Navigation /> 
     <Logo />
     <ImageForm />
    </div>
  );
}

export default App;
