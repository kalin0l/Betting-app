import React from "react";
import { SportContext } from "../context";

const PastEvents = () => {
    const {isClicked,openModal,sports} = React.useContext(SportContext);
    let image = 'https://www.thesportsdb.com/images/media/event/thumb/f50pvg1603530695.jpg';
  return (
    <>
      {isClicked &&
        sports.data &&
        sports.data.slice(0, 9).map((event, i) => {
          const { id, status_more: part, start_at: start } = event;
          return (
            <div key={id} className="events-container">
              <div className="league-container">
                {event.league && <div>{event.league.name}</div>}
                <div>{start}</div>
              </div>
              <div className="container">
                <div className="img-container">
                  <img src={`${image}`} alt="premier league img" />
                </div>
                <div className="team-date-container">
                  <div className="team-container">
                    <div>{event.home_team.name}</div>
                    <div>{event.away_team.name}</div>
                  </div>
                  <div className="date-container">
                    <div>{part}</div>
                    <div></div>
                  </div>
                </div>
                <div className="round-container">
                  <div className="link" onClick={() => openModal(i)}>
                    More Info
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
export default PastEvents;
