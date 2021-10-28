import React, { useState,useEffect } from 'react';
import { SportContext } from '../context'
import { useAuth0 } from "@auth0/auth0-react";

const Aside = () => {


    const { openBets, setOpenBets, decrease, placedBets, increase, clearSelections, stake, odds, setOdds, info, clearOpenBets,setCounter,counter } = React.useContext(SportContext);
    const { isAuthenticated } = useAuth0();

    const [listOfBets, setListOfBets] = useState(false);
    const [notEnough,setNotEnough] = useState(false);
    

    const addBet = () => {
        setOpenBets({

            ...openBets,
            placedEvents: [...openBets.placedEvents, placedBets],
            placedOdds: [...openBets.placedOdds, odds],
            placedStake: [...Object.values(openBets.placedStake),stake],
            newBalance: openBets.newBalance - stake,


        });
        setCounter((oldCounter) => {
            let newCounter = oldCounter + 1;
            if(newCounter >= 8) {
                newCounter = 8;
            }
            return newCounter;
        });
        openBets.newBalance < stake ? setNotEnough(true) : setNotEnough(false);

    }
    
    const getEvents = () => {
        const numberOfEvents = localStorage.getItem('numberOfEvents');
        if (numberOfEvents > 9) {
            return;
        } else {
            return JSON.parse(numberOfEvents);
        }
    }
    useEffect(() => {
        localStorage.setItem('numberOfEvents', JSON.stringify(openBets.placedOdds.length))
    }, [openBets.placedOdds])


    return <aside className={`${info ? 'betslip-container shadow' : 'betslip-container'}`}>
        <div className='betslip'>

            <div className='tabs-container'>
                <p onClick={() => setListOfBets(false)}>
                    My betslip
                </p>

                <p onClick={() => setListOfBets(true)} >
                    Open Bets ({openBets.placedEvents.length <= 0 || openBets.placedEvents.events >= 8 ? getEvents() : getEvents() + 1})
                </p>
            </div>
            {/* rendering open bets */}
            {listOfBets && openBets && openBets.placedEvents.slice(0,9).map((item, i) => {
                if (!item.home_team || !item.away_team) {
                    return <div className='empty'>No team names!</div>
                }

                return <div key={i}>
                    <div className='team-names'>
                        <h3>{item.home_team.name} vs {item.away_team.name}</h3>
                    </div>
                    <div key={Math.random()} className='bet-details-container'>
                        <span>Odds:{openBets.placedOdds[i]}</span>
                        <span>Stake:{openBets.placedStake[i]}</span>
                        <span>Return:{(openBets.placedStake[i] * openBets.placedOdds[i]).toFixed(2)}$</span>
                    </div>
                </div>
            })}
            {!listOfBets && placedBets && placedBets.id && <div className='bet-container'>
                <h3>{placedBets.home_team.name} vs {placedBets.away_team.name}</h3>
            </div>}
            {!placedBets.main_odds && <div className='empty'>No odds for now!</div>}
            {!listOfBets && !notEnough && placedBets && placedBets.main_odds && <div className='odd-btn-container'>
                {placedBets.main_odds && placedBets.main_odds.outcome_1 && <button  onClick={setOdds(placedBets.main_odds.outcome_1['value'])} className='link'>{placedBets.main_odds.outcome_1['value']}</button>}
                {placedBets.main_odds && placedBets.main_odds.outcome_X && <button onClick={setOdds(placedBets.main_odds.outcome_X['value'])} className='link'>{placedBets.main_odds.outcome_X['value']}</button>}
                {placedBets.main_odds && placedBets.main_odds.outcome_2 && <button onClick={setOdds(placedBets.main_odds.outcome_2['value'])} className='link'>{placedBets.main_odds.outcome_2['value']}</button>}
            </div>}
            {notEnough || openBets.newBalance < stake && <p className='error-msg'>Insufficient Funds</p>}

            <div className='betslip-btn'>
                <button type='submit' className='btn' onClick={decrease}>-</button>
                <input type='text' value={stake} />
                <button type='submit' className='btn' onClick={increase}>+</button>
            </div>
            <div className='bet-btn-container'>
                <button className='bet-btn' type='submit' onClick={addBet} disabled={openBets.placedEvents.length >= 8 || openBets.newBalance < stake ? true : !isAuthenticated}>BET</button>
                {placedBets && !listOfBets ? <button className='clear-all-btn' type='submit' onClick={clearSelections}>Clear selections</button> : <button className='clear-all-btn' type='submit' onClick={clearOpenBets}>Clear bets</button>}
            </div>
        </div>

    </aside >
}
export default Aside