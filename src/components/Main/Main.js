import React, { useState } from 'react';
import Banner from './Banner'
import { SportContext } from '../../context'
import { GrClose } from "react-icons/gr";


function Main() {

    const [isClicked, setIsClicked] = useState(false);


    const { events, setPlacedBets, sports, page, setPage, mainEvents, info, openModal, isModal, setInfo, loading } = React.useContext(SportContext);

    const onHandlePage = (i) => {
        setPage(i)
    }
    // pagination functionality
    const nextPage = () => {
        setPage((oldPage) => {
            let newPage = oldPage + 1
            if (newPage > mainEvents.length - 1) {
                newPage = 0
            }
            return newPage
        })
    }

    const prevPage = () => {
        setPage((oldPage) => {
            let newPage = oldPage - 1
            if (newPage < 0) {
                newPage = mainEvents.length - 1
            }
            return newPage
        })
    }
    

    let image = 'https://www.thesportsdb.com/images/media/event/thumb/f50pvg1603530695.jpg';

    return <main className={`${info ? 'section-center shadow' : 'section-center'}`}>
        <Banner />
        {/* rendering additional information for the past events */}
        {info && isModal && <div className='modal'>
            <button className='close-btn' onClick={() => setInfo(false)}><GrClose /></button>
            <div className='info-section'>
                <p>{isModal.sport.name}</p>
                <h1>{isModal.section.name} - {isModal.challenge.name}</h1>
                <h1>{isModal.name} - Round: {isModal.round_number}</h1>
                {isModal.home_score !== null && <p>{isModal.home_score.current}:{isModal.away_score.current} - {isModal.status_more}</p>}
            </div>
        </div>}
        <section className='sports-section'>
            <div className='sports-tabs'>
                <button onClick={() => setIsClicked(false)}>Live events</button>
                {!isClicked && <span ></span>}
                <button onClick={() => setIsClicked(true)}>Past events</button>
                {isClicked && <span className={isClicked ? 'past-events' : null}></span>}
            </div>
            {/* rendering first 9 past events */}
            {isClicked && sports.data && sports.data.slice(0, 9).map((event, i) => {

                const { id, status_more: part, start_at: start } = event
                return <div key={id} className='events-container'>
                    <div className='league-container' onClick={() => setPlacedBets(sports.data[i])}>
                        {event.league && <div>{event.league.name}</div>}
                        <div>{start}</div>
                    </div>
                    <div className='container'>
                        <div className='img-container'>
                            <img src={`${image}`} alt='premier league img' />
                        </div>
                        <div className='team-date-container'>
                            <div className='team-container'>
                                <div>{event.home_team.name}</div>
                                <div>{event.away_team.name}</div>
                            </div>
                            <div className='date-container'>
                                <div>{part}</div>
                                <div></div>
                            </div>
                        </div>
                        <div className='round-container'>
                            <div className='link' onClick={() => openModal(i)}>More Info</div>
                        </div>
                    </div>

                </div>
            })}
            {/* rendering live events */}
            {!isClicked && mainEvents && mainEvents.length > 0 && mainEvents[page].map((event, i) => {
                const { id, status_more: part, start_at: start } = event


                let image = 'https://www.thesportsdb.com/images/media/event/thumb/f50pvg1603530695.jpg';

                return <div key={id} className='events-container'>
                    <div className='league-container' onClick={() => setPlacedBets(events.data[i])}>
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
            {/* pagination buttons */}
            {!isClicked && <div className='pagination-container'>
                <button type='button' className='prev-btn' onClick={prevPage}>Prev</button>
                {mainEvents && mainEvents.map((_, index) => {
                    return <button key={index} className={`${index === page ? 'activePage' : null}`} onClick={() => onHandlePage(index)}>{index + 1}</button>
                })}
                <button type='button' className='next-btn' onClick={nextPage}>Next</button>
            </div>}

        </section>

    </main>
}
export default Main;