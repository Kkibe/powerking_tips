import React, { useContext} from 'react'
import './Ticket.scss';
import { PriceContext } from '../../PriceContext';

export default function Ticket() {
  const {price, setPrice} = useContext(PriceContext)
  const returnPeriod = () => {
    if(price === 100){
      return 'Daily'
    } else if (price === 1200){
      return 'Weekly'
    } else if (price === 3000){
      return 'Monthly'
    } else {
      return 'Yearly'
    }
  }
  return (
    <div className="pay">
        <h2>UPGRADE TO VIP NOW!</h2>
      <form>
      <fieldset>
        <input name="prices" type="radio" value={100} id="daily" checked={price===100 ? true : false}   onChange={(e) => setPrice(100)}/>
        <label htmlFor="daily">Daily VIP</label>
        <span className="price">100</span>
      </fieldset>
      <fieldset>
        <input name="prices" type="radio" value={1200} id="weekly" checked={price===1200 ? true : false}   onChange={(e) => setPrice(1200)}/>
        <label htmlFor="weekly">7 Days VIP</label>
        <span className="price">1200</span>
      </fieldset>
      <fieldset>
        <input name="prices" type="radio" value={3000} id="monthly" checked={price===3000 ? true : false}   onChange={(e) => setPrice(3000)}/>
        <label htmlFor="monthly">30 Days VIP</label>
        <span className="price">3000</span>
      </fieldset>
      <fieldset>
        <input name="prices" type="radio" value={7500} id="yearly" checked={price===7500 ? true : false}   onChange={(e) => setPrice(7500)}/>
        <label htmlFor="yearly">1 Year VIP</label>
        <span className="price">7500</span>
      </fieldset>
    </form>
    <span 
          className="btn"
          onClick={() => document.querySelector('.mpesa-modal').classList.toggle('active')}
        >GET {returnPeriod().toLocaleUpperCase()} VIP @ KSH {price}</span>
    </div>
  )
}
