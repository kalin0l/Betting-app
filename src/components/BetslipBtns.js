import React from "react";
import { SportContext } from "../context";
import { useAuth0 } from "@auth0/auth0-react";

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
  } = React.useContext(SportContext);
  const { isAuthenticated } = useAuth0();

  const addBet = () => {
    dispatch({ type: "ADD_BET_TO_OPEN_BETS" });

    openBets.newBalance < stake ? setNotEnough(true) : setNotEnough(false);
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
          onClick={addBet}
          disabled={
            openBets.placedEvents.length >= 8 || openBets.newBalance < stake
              ? true
              : !isAuthenticated
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
