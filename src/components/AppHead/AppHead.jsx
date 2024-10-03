import React, { useContext } from 'react'
import './AppHead.scss'
import {useNavigate } from 'react-router-dom';

import Daily from '../../assets/v1.png';
import Weekly from '../../assets/v2.png';
import Monthly from '../../assets/v3.png';
import { PriceContext } from '../../PriceContext';

export default function AppHead() {
   const navigate = useNavigate();
   const {setPrice} = useContext(PriceContext);

   const handleClick = (price) => {
      setPrice(price)
      navigate('/pay')
   }
  return (
<div className="tournee">
<div className="ticket">
   <div className="img-ticket">
      <img className="img" src={Daily} alt='daily'/>
   </div>
   <h1 className='small'>Daily VIP</h1>
   <p>Access VIP predictions for 24 hours, perfect for short-term and immediate insights.</p>
   <button onClick={() => handleClick(100)} className="btn">Subscibe</button>
</div>
<div className="ticket">
   <div className="img-ticket">
      <img className="img" src={Weekly} alt='weekly'/>
   </div>
   <h1 className='small'>Weekly VIP</h1>
   <p>Enjoy a full week of VIP predictions with exclusive tips and detailed match analysis.</p>
   <button onClick={() => handleClick(1200)} className="btn">Subscribe</button>
</div>
<div className="ticket">
   <div className="img-ticket">
      <img className="img" src={Monthly} alt='monthly'/>
   </div>
   <h1 className='small'>Monthly VIP</h1>
   <p>Get unlimited VIP access for a month, ensuring consistent and high-quality predictions.</p>
   <button onClick={() => handleClick(3000)}  className="btn">Subscribe</button>
</div>

</div>
  )
}
