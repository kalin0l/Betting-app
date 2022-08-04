import React from "react";
import { SportContext } from "../context";

const SelectedEvents = () => {
  const { listOfBets, placedBets, newBalance, stake, notEnough, dispatch } = React.useContext(SportContext);

  return (
    <>
      {!listOfBets && placedBets && placedBets.id && (
        <div className="bet-container">
          <h3>
            {placedBets.home_team.name} vs {placedBets.away_team.name}
          </h3>
        </div>
      )}
      {!listOfBets && !placedBets.main_odds && (
        <div className="empty">No odds for now!</div>
      )}
      {!listOfBets && !notEnough && placedBets && placedBets.main_odds && (
        <div className="odd-btn-container">
          {placedBets.main_odds && placedBets.main_odds.outcome_1 && (
            <button
              onClick={() =>
                dispatch({
                  type: "SET_1",
                  payload: placedBets.main_odds.outcome_1["value"],
                })
              }
              className="link"
            >
              {placedBets.main_odds.outcome_1["value"]}
            </button>
          )}
          {placedBets.main_odds && placedBets.main_odds.outcome_X && (
            <button
              onClick={() =>
                dispatch({
                  type: "SET_2",
                  payload: placedBets.main_odds.outcome_1["value"],
                })
              }
              className="link"
            >
              {placedBets.main_odds.outcome_X["value"]}
            </button>
          )}
          {placedBets.main_odds && placedBets.main_odds.outcome_2 && (
            <button
              onClick={() =>
                dispatch({
                  type: "SET_3",
                  payload: placedBets.main_odds.outcome_1["value"],
                })
              }
              className="link"
            >
              {placedBets.main_odds.outcome_2["value"]}
            </button>
          )}
        </div>
      )}
      {notEnough || newBalance < stake ? (
        <p className="error-msg">Insufficient Funds</p>
      ) : null}
    </>
  );
};
export default SelectedEvents;
