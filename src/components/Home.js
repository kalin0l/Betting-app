import React from 'react';
import Main from '../components/Main/Main'
import Header from '../components/Header'
import Aside from '../components/Aside'
import Footer from '../components/Footer'
import { SportContext } from "../context/context";


const Home = () => {
    const { info } = React.useContext(SportContext);
    return <>
        <section className={`${info ? 'section-grid shadow' : 'section-grid'}`}>
            <Header />
            <Main />
            <Aside />
            <Footer />
        </section>
    </>
}
export default Home;