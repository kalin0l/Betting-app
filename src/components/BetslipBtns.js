import React from "react";
import { SportContext } from "../context";
import { AuthContext } from "../authContext";

const BetslipBtns = () => {
  const {
    increase,
    decrease,
    openBets,
    stake,
    placedBets,
    listOfBets,
    clearSelections,
    clearOpenBets,
    setNotEnough,
    dispatch,
    odds,
    newBalance,
  } = React.useContext(SportContext);

  const {user} = React.useContext(AuthContext);

  const addBet = async (homeTeam,awayTeam,homeTeamScore,awayTeamScore,stake,selection,id) => {
    
    
    newBalance < stake ? setNotEnough(true) : setNotEnough(false);
    try {
      const res = await fetch(`/${id}`,{
        method:'POST',
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          homeTeam,awayTeam,homeTeamScore,awayTeamScore,stake,selection,user:id
        })
      })
      const data = await res.json();
      dispatch({ type: "STAKE",payload:data.bet.stake })
      console.log(data.bet);
      
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <div className="betslip-btn">
        <button type="submit" className="btn" onClick={decrease}>
          -
        </button>
        {stake < 0 ? (
          <input type="text" value={0} />
        ) : (
          <input type="text" value={stake} />
        )}
        <button type="submit" className="btn" onClick={increase}>
          +
        </button>
      </div>
      <div className="bet-btn-container">
        <button
          className="bet-btn"
          type="submit"
          onClick={() => addBet(placedBets.home_team.name,placedBets.away_team.name,placedBets.home_score.current,placedBets.away_score.current,stake,odds,user.userId)}
          disabled={
            openBets.placedEvents.length >= 8 || newBalance < stake ? true : !user
          }
        >
          BET
        </button>
        {placedBets && !listOfBets ? (
          <button
            className="clear-all-btn"
            type="submit"
            onClick={clearSelections}
          >
            Clear selections
          </button>
        ) : (
          <button
            className="clear-all-btn"
            type="submit"
            onClick={clearOpenBets}
          >
            Clear bets
          </button>
        )}
      </div>
    </>
  );
};
export default BetslipBtns;
