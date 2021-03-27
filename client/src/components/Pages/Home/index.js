import React from 'react';
import { Link } from 'react-router-dom';

// Components
import Navbar from '../../Navbar';
import Search from './Search';
import Cards from './Cards';
import Tuyos from '../Tuyos';

// Styles
import './styles.scss';

const Home = () => {
    
    return (
        <header className='home__header'>
            <Navbar/>
            <h2 className="home__main-title">Découvrez votre future destination comme un local !</h2>
            <p className="home__sub-title">Itinéraires sur-mesure basés sur de <span>vraies</span> recommandations</p>
            <Search/>
            <Cards/>
            <Link to="/tuyos" className="home__cta">
                <i className="far fa-paper-plane"></i>
                <p className="home__cta__link">Voir tous les tuyos</p>  
            </Link>
        </header>
    )
}

export default Home;