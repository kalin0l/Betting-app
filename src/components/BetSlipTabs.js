import React from 'react'
import { SportContext } from '../context';


const BetslipTabs = () => {


    const {openBets,counter,setListOfBets} = React.useContext(SportContext);

    const getEvents = () => {
        const numberOfEvents = sessionStorage.getItem('numberOfEvents') ;
        if (numberOfEvents >= 8) {
            return JSON.parse(numberOfEvents);
        } else {
            return JSON.parse(8);
        }
    }

   return <div className='tabs-container'>
        <p onClick={() => setListOfBets(false)}>
            My betslip
        </p>

        <p onClick={() => setListOfBets(true)} >
            Open Bets ({openBets.placedEvents.length === 8 ? getEvents() : counter})
        </p>
    </div>
}
export default BetslipTabs;