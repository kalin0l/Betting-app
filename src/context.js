import React, { useEffect, useState, useReducer } from "react";
import reducer from "./reducer";

export const SportContext = React.createContext();

export const SportsProvider = ({ children }) => {
  const getLocalStorageEvents = () => {
    const bets = localStorage.getItem("openBets");
    if (bets) {
      return JSON.parse(bets);
    } else {
      return [];
    }
  };
  const getLocalStorageOdds = () => {
    const odds = localStorage.getItem("odds");
    if (odds) {
      return JSON.parse(odds);
    } else {
      return [];
    }
  };
  const getLocalStorageStake = () => {
    const stake = localStorage.getItem("stake");
    if (stake) {
      return JSON.parse([stake]);
    } else {
      return [];
    }
  };
  const initialState = {
    info:false,
    inProp:false,
    isModal: [],
    events: [],
    mainEvents: [],
    sports: [],
    placedBets: [],
    odds: [],
    openBets: {
      placedEvents: getLocalStorageEvents(),
      placedOdds: getLocalStorageOdds(),
      placedStake: getLocalStorageStake(),
      newBalance: 100,
    },
    counter: 0,
    stake:0,
    notEnough: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isClicked, setIsClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [listOfBets, setListOfBets] = useState(false);
  const [notEnough, setNotEnough] = useState(false);

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();

  // setting the event data to the localstorage
  useEffect(() => {
    localStorage.setItem("openBets", JSON.stringify(state.openBets.placedEvents));
    localStorage.setItem("odds", JSON.stringify(state.openBets.placedOdds));
    localStorage.setItem("stake", JSON.stringify(state.openBets.placedStake));
    localStorage.setItem("balance", JSON.stringify(state.openBets.newBalance));
  }, [
    state.placedBets,
    state.openBets.newBalance,
    state.openBets.placedEvents,
    state.openBets.placedOdds,
    state.openBets.placedStake,
  ]);

  // clearing open bets
  const clearOpenBets = () => {
    localStorage.clear();

    dispatch({ type: "CLEAR_OPEN_BETS" });
  };
  // opening the additional info of the past event
  const openModal = (i) => {
    dispatch({ type: "OPEN_PAST_EVENTS", payload: state.sports.data[i] });

  };
  // clearing the bet selection from the bet slip
  const clearSelections = () => {
    dispatch({ type: "CLEAR_SELECTIONS" });
  };

  // increasing and decreasing the stake
  const decrease = () => {
    dispatch({type: 'DEC'})
    
  };
  const increase = () => {
      dispatch({type: 'INC'})
    
  };

  // pagination functionality
  const paginate = (numberOfEvents) => {
    const eventsPerPage = 9;
    const numberOfPages = Math.ceil(numberOfEvents.length / eventsPerPage);

    const newEvents = Array.from({ length: numberOfPages }, (_, i) => {
      const start = i * eventsPerPage;
      return numberOfEvents.slice(start, start + eventsPerPage);
    });
    return newEvents;
  };

  useEffect(() => {
    const sportsEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://sportscore1.p.rapidapi.com/events/live",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "e188076ae0msha1822f57c981c74p1d721fjsnfd365b8ac058",
              "x-rapidapi-host": "sportscore1.p.rapidapi.com",
            },
          }
        );
        const data = await res.json();

        dispatch({ type: "MAIN_EVENTS", payload: paginate(data.data) });
        dispatch({ type: "SET_EVENTS", payload: data });
        setLoading(false);

      } catch (err) {
        console.log(err);
      }
    };
    sportsEvents();
  }, []);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await fetch(
          `https://sportscore1.p.rapidapi.com/events/date/${year.toString()}-${
            month < 10 ? "0" + month.toString() : month.toString()
          }-${
            date < 10 ? "0" + (date - 1).toString() : date.toString()
          }?page=1`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "sportscore1.p.rapidapi.com",
              "x-rapidapi-key":
                "e188076ae0msha1822f57c981c74p1d721fjsnfd365b8ac058",
            },
          }
        );
        const data = await res.json();
        dispatch({ type: "SET_SPORTS", payload: data });
      } catch (err) {
        console.log(err);
      }
    };

    fetchSports();
  }, [date, month, year]);

  // slider functionality
  const nextSlide = () => {
    setIndex((oldIndex) => {
        let index = oldIndex + 1;
        if (index > 10) {
            index = 0;
        }

        return index;
    });
  };
  const prevSlide = () => {
    setIndex((oldIndex) => {
        let index = oldIndex - 1;
        if (index < 0) {
            index = 10;
        }

        return index;
    })
  };

  return (
    <SportContext.Provider
      value={{
        notEnough,
        setNotEnough,
        listOfBets,
        setListOfBets,
        // openBets,
        // setOpenBets,
        // placedBets,
        // setPlacedBets,
        // events,
        loading,
        // stake,
        nextSlide,
        prevSlide,
        index,
        decrease,
        increase,
        clearSelections,
        // sports,
        page,
        setPage,
        // mainEvents,
        // setOdds,
        // odds,
        // setInfo,
        // info,
        openModal,
        // isModal,
        clearOpenBets,
        // inProp,
        // setInProp,
        isClicked,
        setIsClicked,
        ...state,
        dispatch,
      }}
    >
      {children}
    </SportContext.Provider>
  );
};
export default SportsProvider;
