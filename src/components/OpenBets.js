import React from "react";
import { SportContext } from "../context";



const OpenBets = () => {
    const {listOfBets,openBets} = React.useContext(SportContext);
    return <>
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
    </>
}
export default OpenBets;