import React, { useContext} from 'react'
import './Ticket.scss';
import { PriceContext } from '../../PriceContext';
import AppHelmet from '../../components/AppHelmet';
import { AuthContext } from '../../AuthContext';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Qr from '../../assets/paypal_btn.png';


export default function PaypalPayment() {
  const {price, setPrice} = useContext(PriceContext)
  const {currentUser} = useContext(AuthContext);

    const DonateButton = () => {
      return    <PayPalButtons
      // forceReRender={[currency, amount]}
      style={{ color: "gold", label: "pay" }}
      //fundingSource="paypal"
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: price,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: price
                  }
                }
              },
              items: [
                {
                  name: "Cat Fundraiser",
                  description:
                    "All proceeds directly support Furby's care and recovery.",
                  quantity: "1",
                  unit_amount: {
                    currency_code: "USD",
                    value: price
                  },
                  category: "DONATION"
                }
              ]
            }
          ]
        });
      }}
    />
    }
  return (
    <PayPalScriptProvider       
    options={{
      "client-id": "test",//WAUXGH9WGKFU6
      components: "buttons",
      currency: "USD"
    }}>
        <div className="pay" >

        
      <AppHelmet title={"Pay"} location={'/pay'}/>
      <h2>UPGRADE TO VIP NOW!</h2>
      <form>
      <fieldset>
        <input name="prices" type="radio" value={2} id="daily" checked={price===2 ? true : false}   onChange={(e) => setPrice(2)}/>
        <label htmlFor="daily">Daily VIP</label>
        <span className="price">$ 2</span>
      </fieldset>
      <fieldset>
        <input name="prices" type="radio" value={5} id="weekly" checked={price===5 ? true : false}   onChange={(e) => setPrice(5)}/>
        <label htmlFor="weekly">7 Days VIP</label>
        <span className="price">$ 5</span>
      </fieldset>
      <fieldset>
        <input name="prices" type="radio" value={25} id="monthly" checked={price===25 ? true : false}   onChange={(e) => setPrice(25)}/>
        <label htmlFor="monthly">30 Days VIP</label>
        <span className="price">$ 25</span>
      </fieldset>
      <fieldset>
        <input name="prices" type="radio" value={50} id="yearly" checked={price===50 ? true : false}   onChange={(e) => setPrice(50)}/>
        <label htmlFor="yearly">1 Year VIP</label>
        <span className="price">$ 50</span>
      </fieldset>
    </form>
    <DonateButton />
    <h2>Scan this qr code</h2>
    <img src={Qr} alt="paypal-qr-code"  width={150} height={150}/>
    </div>
    </PayPalScriptProvider>
  )
}
