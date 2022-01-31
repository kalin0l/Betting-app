import React from 'react';
import Banner from './Banner'
import { SportContext } from '../../context'
import Modal from '../Modal';
import { Transition } from 'react-transition-group';
import Tabs from '../Tabs';
import PastEvents from '../PastEvents';
import LiveEvents from '../LiveEvents';
import PaginationBtns from '../PaginationBtns';


function Main() {

    const { info, isModal,inProp } = React.useContext(SportContext);

    return <main className={`${info ? 'section-center shadow' : 'section-center'}`}>
        <Banner />
        {/* rendering additional information for the past events */}
        { info &&<Transition in={inProp} timeout={400}>

            {state => (
                <Modal show={state} isModal={isModal} />
            )}
        </Transition>}
        <section className='sports-section'>
           <Tabs/>
            {/* rendering first 9 past events */}
           <PastEvents/>
            {/* rendering live events */}
           <LiveEvents/>
            {/* pagination buttons */}
           <PaginationBtns/>

        </section>

    </main>
}
export default Main;