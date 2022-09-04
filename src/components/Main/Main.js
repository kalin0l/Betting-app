import React, { useEffect } from 'react';
import Banner from './Banner'
import { SportContext } from '../../context/context'
import { AuthContext } from '../../context/authContext';
import Modal from '../Modal';
import { Transition } from 'react-transition-group';
import Tabs from '../Tabs';
import PastEvents from '../PastEvents';
import LiveEvents from '../LiveEvents';
import PaginationBtns from '../PaginationBtns';
import DepositModal from '../DepositModal';
import { useCookies } from "react-cookie";




function Main() {

    const { info, isModal,inProp,isDepositClicked } = React.useContext(SportContext);
    const { dispatch,user } = React.useContext(AuthContext);
    
    const [cookies,setCookies] = useCookies();
    useEffect(() => {
       dispatch({type:'SET_COOKIE', payload: cookies.accessToken})
       
    },[cookies,dispatch]);
   

    useEffect(() => {
        localStorage.setItem("name", JSON.stringify(user));
    },[user])

    return <main className={`${info ? 'section-center shadow' : 'section-center'}`}>
        <Banner />
        {/* rendering additional information for the past events */}
        { info &&<Transition in={inProp} timeout={400}>

            {state => (
                <Modal show={state} isModal={isModal} />
            )}
        </Transition>}
        {isDepositClicked && <DepositModal/> }
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