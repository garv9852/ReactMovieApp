import Navbar from "./Components/navbar"
import Banner from "./Components/banner"
import Movies from "./Components/movi"
import Favorite from "./Components/favorite";
import {BrowserRouter as Router,Switch,Route} from  'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/favorites" component={Favorite}/>
        <Route path="/" render={(props)=>(
          <>
            <Banner {...props}/>
            <Movies {...props}/>
          </>
        )}/>
      </Switch>
    </Router>
  );
}

export default App;
