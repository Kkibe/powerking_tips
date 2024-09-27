import React, { useContext} from 'react'
import './Ticket.scss';
import { PriceContext } from '../../PriceContext';

export default function Ticket() {
  const {price, setPrice} = useContext(PriceContext)
  const returnPeriod = () => {
    if(price === 100){
      return 'Daily'
    } else if (price === 600){
      return 'Weekly'
    } else {
      return 'Monthly'
    }
  }
  return (
    <div className="pay">
        <h1>Make Payment</h1>
        <div className="input-container">
          <input type="radio" id="daily" name="price" value="1" checked={price===100 ? true : false}   onChange={(e) => setPrice(100)}/>
          <label htmlFor="daily">KSH 100 -   Daily VIP</label>
        </div>

        <div className="input-container">
          <input type="radio" id="weekly" name="price" value="600" checked={price===600 ? true : false}   onChange={(e) => setPrice(600)}/>
          <label htmlFor="weekly">KSH 600 - 7 Days VIP</label>
        </div>

        <div className="input-container">
          <input type="radio" id="age3" name="price" value="9.8" checked={price===1500 ? true : false}  onChange={(e) => setPrice(1500)}/>
          <label htmlFor="age3">KSH 1500 - 30 Days VIP</label>
        </div>
        <h4>You Are About To Subscribe To {returnPeriod()} VIP For KSH {price}</h4>
        <span 
          className="btn intaSendPayButtonn"
          onClick={() => document.querySelector('.mpesa-modal').classList.toggle('active')}
        >Get VIP For {price}</span>
    </div>
  )
}
