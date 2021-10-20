import React, { useEffect, useState } from 'react';

export const SportContext = React.createContext();

export const SportsProvider = ({ children }) => {

    const getLocalStorageEvents = () => {
        const bets = localStorage.getItem('openBets');
        if (bets) {
            return JSON.parse(bets);
        } else {
            return [];
        }
    }
    const getLocalStorageOdds = () => {
        const odds = localStorage.getItem('odds');
        if (odds) {
            return JSON.parse(odds);
        } else {
            return [];
        }
    }
    const getLocalStorageStake = () => {
        const stake = localStorage.getItem('stake');
        if (stake) {
            return JSON.parse(stake);
        } else {
            return [];
        }
    }
   
    const [info, setInfo] = useState(false);
    const [isModal, setIsModal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [mainEvents, setMainEvents] = useState([]);
    const [sports, setSports] = useState([]);
    const [index, setIndex] = useState(0);
    const [stake, setStake] = useState(0);
    const [placedBets, setPlacedBets] = useState([]);
    const [odds, setOdds] = useState([]);
    const [openBets, setOpenBets] = useState({
        placedEvents: getLocalStorageEvents(),
        placedOdds: getLocalStorageOdds(),
        placedStake: getLocalStorageStake(),
        newBalance: 100,
    })
    const [page, setPage] = useState(0);


    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();

    // setting the event data to the localstorage
    useEffect(() => {

        localStorage.setItem('openBets', JSON.stringify(openBets.placedEvents));
        localStorage.setItem('odds', JSON.stringify(openBets.placedOdds));
        localStorage.setItem('stake', JSON.stringify(openBets.placedStake));
        localStorage.setItem('balance', JSON.stringify(openBets.newBalance));
    }, [placedBets, openBets.newBalance, openBets.placedEvents,openBets.placedOdds,openBets.placedStake]);

    // clearing open bets
    const clearOpenBets = () => {
        localStorage.clear();
        setOpenBets({
            placedEvents: [],
            placedOdds: [],
            newBalance: 100,
            placedStake: 0,
        })
    }
    // opening the additional info of the past event
    const openModal = (i) => {
        setInfo(true);
        setIsModal(sports.data[i])

    }
    // clearing the bet selection from the bet slip
    const clearSelections = () => {
        setPlacedBets([]);
    }

    // increasing and decreasing the stake
    const decrease = () => {
        setStake(oldStake => {
            let newStake = oldStake - 1;
            if (newStake < 1) {
                newStake = 1;
            }
            return newStake;
        });
    }
    const increase = () => {
        setStake(oldStake => {
            let newStake = oldStake + 1;

            return newStake;
        });
    }

    // pagination functionality
    const paginate = (numberOfEvents) => {
        const eventsPerPage = 9;
        const numberOfPages = Math.ceil(numberOfEvents.length / eventsPerPage);

        const newEvents = Array.from({ length: numberOfPages }, (_, i) => {
            const start = i * eventsPerPage;
            return numberOfEvents.slice(start, start + eventsPerPage);
        })
        return newEvents;
    }

    const sportsEvents = async () => {
        setLoading(true);
        try {
            const res = await fetch("https://sportscore1.p.rapidapi.com/events/live", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "e188076ae0msha1822f57c981c74p1d721fjsnfd365b8ac058",
                    "x-rapidapi-host": "sportscore1.p.rapidapi.com"
                }
            });
            const data = await res.json();

            setLoading(false);
            setMainEvents(paginate(data.data));
            setEvents(data);

        } catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        sportsEvents();
    }, [])


    const fetchSports = async () => {
        try {
            const res = await fetch(`https://sportscore1.p.rapidapi.com/events/date/${year.toString()}-${month < 10 ? '0' + month.toString() : month.toString()}-${date < 10 ? '0' + (date - 1).toString() : date.toString()}?page=1`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "sportscore1.p.rapidapi.com",
                    "x-rapidapi-key": "e188076ae0msha1822f57c981c74p1d721fjsnfd365b8ac058"
                }
            })
            const data = await res.json();
            setSports(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchSports();

    }, []);


    // slider functionality
    const nextSlide = () => {
        setIndex((oldIndex) => {
            let index = oldIndex + 1;
            if (index > 10) {
                index = 0;
            }

            return index;
        });

    }
    const prevSlide = () => {
        setIndex((oldIndex) => {
            let index = oldIndex - 1;
            if (index < 0) {
                index = 10;
            }

            return index;
        })
    }




    return <SportContext.Provider value={{
        openBets,
        setOpenBets,
        placedBets,
        setPlacedBets,
        events,
        loading,
        stake,
        nextSlide,
        prevSlide,
        index,
        decrease,
        increase,
        clearSelections,
        sports,
        page,
        setPage,
        mainEvents,
        setOdds,
        odds,
        setInfo,
        info,
        openModal,
        isModal,
        clearOpenBets,

    }}>{children}</SportContext.Provider>
}
export default SportsProvider;
