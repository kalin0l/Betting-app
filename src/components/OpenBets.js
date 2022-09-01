import React, { useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { SportContext } from "../context/context";

const OpenBets = () => {
  const { user } = React.useContext(AuthContext);
  const { listOfBets, openBets, dispatch,newBalance,cashOut } =
    React.useContext(SportContext);

  useEffect(() => {

    const getAllOpenBets = async (user) => {
      try {
        const res = await fetch(`/${user.userId}`);
        const data = await res.json();
        dispatch({ type: "ADD_BET_TO_OPEN_BETS", payload: data.docs });
      } catch (error) {
        console.log(error);
      }
    };
    getAllOpenBets(user);
  }, [user, dispatch,newBalance]);

  
  return (
    <>
      {listOfBets &&
        openBets &&
        openBets.placedEvents.map((item, i) => {
          const stake = item.stake * 0.9
          return (
            <div key={i}>
              <div className="team-names">
                <h3>
                  {item.homeTeam} vs {item.awayTeam}
                </h3>
              </div>
              <div className="bet-score">
                <span>{item.homeTeamScore}:{item.awayTeamScore}</span>
              </div>
              <div key={Math.random()} className="bet-details-container">
                <span>Odds:{item.selection}</span>
                <span>Stake:{item.stake}</span>
                <span>Return:{(item.stake * item.selection).toFixed(2)}$</span>
              </div>
              <div className="cash-out-btn">
                <button className="bet-btn" type="button" onClick={() => cashOut(stake,user.userId,item._id)}>Cash out {item.stake * 0.9}$</button>
              </div>
            </div>
          );
        })}
    </>
  );
};
export default OpenBets;
