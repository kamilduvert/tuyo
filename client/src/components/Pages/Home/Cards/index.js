import React from 'react';

// Styles
import './styles.scss';

// Data
import { cardData } from './cardData';


const Cards = () => {

    return (
        <section className="home__cards">
        {cardData.map((item) => (
            <article key={item.id} className="home__card">
                <div className="home__card__icon">
                    <i className={item.icon}></i>
                </div>
                <div className="home__card__details">
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                </div>
            </article>
        ))};
        </section>
    )
}

export default Cards;


