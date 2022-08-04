const reducer = (state, action) => {
  if (action.type === "CLEAR_OPEN_BETS") {
    return {
      ...state,
      counter: 0,
      openBets: {
        placedEvents: [],
        placedOdds: [],
        newBalance: 100,
        placedStake: 0,
      },
    };
  }
  if (action.type === "OPEN_PAST_EVENTS") {
    return {
      ...state,
      info: !state.info,
      isModal: action.payload,
      inProp: !state.inProp,
    };
  }
  if (action.type === "CLEAR_SELECTIONS") {
    return { ...state, placedBets: [] };
  }
  if (action.type === "SET_EVENTS") {
    return { ...state, events: action.payload };
  }
  if (action.type === "MAIN_EVENTS") {
    return { ...state, mainEvents: action.payload };
  }
  if (action.type === "SET_SPORTS") {
    return { ...state, sports: action.payload };
  }
  if (action.type === "ADD_TO_BETSLIP") {
    return { ...state, placedBets: action.payload };
  }
  if (action.type === "STAKE") {
    return { ...state, newBalance: state.newBalance - action.payload };
  }

  if (action.type === "ADD_BET_TO_OPEN_BETS") {
    return {
      ...state,
      openBets: {
        placedEvents: action.payload,
      },
    };
  }
  if (action.type === "SET_SCORE") {
    return {
      ...state,
      homeTeamScore: action.payload,
      awayTeamScore: action.payload,
    };
  }
  if (action.type === "SET_1") {
    return { ...state, odds: action.payload };
  }
  if (action.type === "SET_2") {
    return { ...state, odds: action.payload };
  }
  if (action.type === "SET_3") {
    return { ...state, odds: action.payload };
  }
  if (action.type === "INC") {
    return { ...state, stake: state.stake + 1 };
  }
  if (action.type === "DEC") {
    return { ...state, stake: state.stake < 1 ? 0 : state.stake - 1 };
  }
  if (action.type === "TO_FALSE_INFO") {
    return { ...state, info: false };
  }
  if (action.type === "TO_FALSE_INPROP") {
    return { ...state, inProp: !state.inProp };
  }
  if (action.type === "BANNER_EVENTS") {
    return { ...state, placedBets: action.payload };
  }
  if (action.type === "CASH_OUT") {
    return { ...state, newBalance: state.newBalance + action.payload };
  }
  if (action.type === "OPEN_DEPOSIT") {
    return { ...state, isDepositClicked: !state.isDepositClicked };
  }
  if (action.type === "DEPOSIT") {
    const deposits = action.payload;
    if (typeof deposits === "number") {
      return { ...state, newBalance: state.newBalance + deposits };
    }
    return {
      ...state,
      newBalance: deposits.reduce((acc, cur) => acc + cur.deposit, 0),
    };
  }
  // if (action.type === "CLEAR_BET") {
  //   const id = action.payload;
  //   const event = state.openBets.placedEvents.filter((ev) => ev._id !== id);
  //   if (event) {
  //     return {
  //       ...state,
  //       openBets: {
  //         placedEvents: event,
  //       },
  //     };
  //   }
  // }

  return state;
};
export default reducer;
