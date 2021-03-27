import React from 'react';

// Components
import Navbar from '../../Navbar';

// Styles
import './styles.scss';

// Data
import { tuyoData, categories } from './tuyoData';


const Tuyos = () => {

    return (
    <>
        <main id="tuyos" className="tuyos">
            <Navbar/>
            <section className="tuyos__hero">
                <h2 className="tuyos__hero__title">Explorez tous les Tuyos des locaux</h2>
                <div className="tuyos__hero__categories">
                    {categories.map((category) => (
                        <div key={category.id} className="tuyos__hero__category">
                            <p className="tuyos__hero__category__title">{category.title}</p>
                            <span><i className={category.icon}/></span>
                        </div>
                    ))}
                </div>
            </section>
            <section className="tuyos__container">
                <ul >
                {tuyoData.map((tuyo) => (
                    <li key={tuyo.id} className="tuyo">
                        <article>
                        <figure>
                            <img className="tuyo__photo"  src={tuyo.photo.url}></img>
                            <figcaption><h3>{tuyo.title}</h3></figcaption> 
                        </figure>
                        <p>{tuyo.description}</p>
                        <span><i className='fa-star is-full'></i></span>
                        </article>
                    </li>
                ))}
                </ul>
            </section>
        </main>
    </>
    )
}

export default Tuyos;