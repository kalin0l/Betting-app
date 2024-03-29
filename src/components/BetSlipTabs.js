import React from 'react'
import { SportContext } from "../context/context";


const BetslipTabs = () => {


    const {openBets,setListOfBets} = React.useContext(SportContext);

    const getEvents = () => {
        const numberOfEvents = openBets.placedEvents && openBets.placedEvents.length ? openBets.placedEvents.length : 0;
        if (numberOfEvents > 8) {
            return 8;
        } else {
            return numberOfEvents;
        }
    }

   return <div className='tabs-container'>
        <p onClick={() => setListOfBets(false)}>
            My betslip
        </p>

        <p onClick={() => setListOfBets(true)} >
            Open Bets ({getEvents()})
        </p>
    </div>
}
export default BetslipTabs;