import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Home from '../Pages/Home';
import Itinerary from '../Pages/Itinerary';
import Tuyos from '../Pages/Tuyos';
import Map from '../Pages/Map';
import Profile from '../Pages/Profile';
import Contact from '../Pages/Contact';
import AddTuyo from '../Pages/AddTuyo';
import Register from '../Pages/Register';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/tuyos' component={Tuyos} />
          <Route exact path='/ajouter-tuyo' component={AddTuyo} />
          <Route path='/itineraire' component={Itinerary} />
          <Route path='/carte' component={Map} />
          <Route path='/profil' component={Profile} />
          <Route path='/contact' component={Contact} />
          <Route path='/inscription' component={Register} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
