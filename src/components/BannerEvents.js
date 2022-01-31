import React from "react";
import { SportContext } from "../context";

const BannerEvents = () => {
  const { events, index, setPlacedBets } = React.useContext(SportContext);

  return (
    <>
      {events.data &&
        events.data.length > 1 &&
        events.data.map((event, i) => {
          let position;
          if (i === index) {
            position = "active";
          } else {
            position = "";
          }
          return (
            <div key={i} className={`banner-container ${position}`}>
              <div className="event-container">
                <div>
                  <div className="home-away-container">
                    <h4>{event.name}</h4>
                  </div>
                  <div className="date-country-container">
                    {event.league && event.league.name && (
                      <span>{event.league.name}</span>
                    )}
                    <span>
                      {event.home_score.display} : {event.away_score.display}
                    </span>
                  </div>
                  <div className="btn-container">
                    <button
                      type="submit"
                      onClick={() => setPlacedBets(events.data[i])}
                    >
                      Click here to bet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
export default BannerEvents;
