import React, { useEffect, useState, useReducer } from "react";
import reducer from "../reducer";

export const SportContext = React.createContext();

export const SportsProvider = ({ children }) => {
  

  const initialState = {
    info: false,
    inProp: false,
    isModal: [],
    events: [],
    mainEvents: [],
    sports: [],
    placedBets: [],
    odds: "",
    newBalance: 0,
    openBets: {
      placedEvents: [],
    },
    isDepositClicked: false,
    stake: 0,
    // notEnough: false,
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

  const openDepositModal = () => {
    dispatch({ type: "OPEN_DEPOSIT" });
  };
  const depositHandler = async (deposit, id) => {
    try {
      const res = await fetch(`/api/v1/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          deposit,
          user: id,
        }),
      });
      const data = await res.json();
      console.log(data.newDeposit);
      // dispatch({type:'DEPOSIT',payload:data.newDeposit.deposit});
    } catch (error) {
      console.log(error);
    }
  };

  // clearing open bets
  // const clearOpenBets = () => {

  //   dispatch({ type: "CLEAR_OPEN_BETS" });
  // };
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
    dispatch({ type: "DEC" });
  };
  const increase = () => {
    dispatch({ type: "INC" });
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

  const cashOut = async (stake, id) => {
    try {
      const res = await fetch(`/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = res.json();
      console.log(data);
      dispatch({ type: "CASH_OUT", payload: stake });
      dispatch({ type: "DEPOSIT", payload: stake });
    } catch (error) {
      console.log(error);
    }
  };

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
    });
  };

  return (
    <SportContext.Provider
      value={{
        notEnough,
        setNotEnough,
        listOfBets,
        setListOfBets,
        loading,
        nextSlide,
        prevSlide,
        index,
        decrease,
        increase,
        clearSelections,
        page,
        setPage,
        openModal,
        isClicked,
        setIsClicked,
        ...state,
        dispatch,
        cashOut,
        openDepositModal,
        depositHandler,
      }}
    >
      {children}
    </SportContext.Provider>
  );
};
