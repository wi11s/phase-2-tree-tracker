import React from 'react'; 
import {Route, Switch} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Map from './Map';
import Form from './Form';

function App() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/map'>
                    <Map />
                </Route>
                <Route exact path='/form'>
                    <Form />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default App;