import React from 'react';
import { SportContext } from '../context'
import BetslipTabs from './BetSlipTabs';
import OpenBets from './OpenBets';
import SelectedEvents from './SelectedEvents';
import BetslipBtns from './BetslipBtns';

const Aside = () => {

    const {  info } = React.useContext(SportContext);

    return <aside className={`${info ? 'betslip-container shadow' : 'betslip-container'}`}>
        <div className='betslip'>

           <BetslipTabs/>
            {/* rendering open bets */}
           <OpenBets/>
           <SelectedEvents/>
          <BetslipBtns/>
        </div>

    </aside >
}
export default Aside