import React from 'react'
import { SportContext } from '../context'



const LiveEvents = () => {

    const {isClicked,mainEvents,setPlacedBets,events,page} = React.useContext(SportContext);
    
    return <>
    {!isClicked && mainEvents && mainEvents.length > 0 && mainEvents[page].map((event, i) => {
                const { id, status_more: part, start_at: start } = event


                let image = 'https://www.thesportsdb.com/images/media/event/thumb/f50pvg1603530695.jpg';

                return <div key={id} className='events-container'>
                    <div className='league-container'>
                        {event.league && <div>{event.league.name} </div>}
                        <div>{start}</div>
                    </div>
                    <div className='container'>
                        <div className='img-container'>
                            <img src={`${image}`} alt='premier league img' />
                        </div>
                        <div className='team-date-container'>
                            <div className='team-container'>
                                {event.home_team && <div>{event.home_team.name}</div>}
                                {event.home_team && <div>{event.away_team.name}</div>}
                            </div>
                            <div className='date-container'>
                                <div>{part} minute</div>
                                <div></div>
                            </div>
                        </div>
                        <div className='round-container'>
                            <div className='link' onClick={() => setPlacedBets(events.data[i])}>Click here to bet</div>
                        </div>
                    </div>

                </div>
            })}
    </>
}
export default LiveEvents;