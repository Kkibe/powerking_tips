import React, { useState, useEffect, useContext} from 'react'
import './MpesaModal.scss';
import { Close } from '@mui/icons-material';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { PriceContext } from '../../PriceContext';

export default function MpesaModal() {
  const [phoneNumber, setPhoneNumber] = useState();
  const {price} = useContext(PriceContext)
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const handleClose = () => {
    if(document.querySelector('.mpesa-modal').classList.contains('active')) {
      document.querySelector('.mpesa-modal').classList.remove('active');
    }
  }
  const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if(!isPhoneValid(phoneNumber)){
      setError("invalid phone number");
      return;
    }
    
    const numberArray = phoneNumber.split("");
    numberArray.shift();
    setSuccess(`Your Request Has Been Submitted`)

    /*const amount = price.toString()
    axios.post('https://powerkingtips.com/mpesa', {
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': "POST",
        "Content-Type": "application/json",
      },
      body: {
        amount,
        number: numberArray.join("")
      }
    }).then((response) => {
      console.error(response.data);
      document.querySelector('.mpesa-modal').classList.toggle('active')
    })
      .catch((error) => {
        console.log(error.message)
        document.querySelector('.mpesa-modal').classList.toggle('active')
      })*/
  };
  
  useEffect(() => {
    error && setTimeout(() => {
      setError(null);
    }, 1000);

    success && setTimeout(() => {
      setPhoneNumber('')
      setSuccess(null);
      document.querySelector('.mpesa-modal').classList.toggle('active')
    }, 1000);
  }, [error, success]);
  
  return (
    <div className='mpesa-modal' id='donate'>
        <Close className='close' onClick={handleClose}/>
        <h4>How it works:</h4>
        <ul>
            <li>&raquo; Go To Lipa Na  Mpesa Buy Good and Services and Pay KSH {price}</li>
            <li>&raquo; Enter the phone number used to make payment and click "I Have PAYED"</li>
            <li>&raquo; We will upgrade your account once we confirm you have payed</li>
        </ul>
        <form onSubmit={handleSubmit}>
            <h4>TILL NUMBER: <h1>4139425</h1></h4>
            <label htmlFor='name'>Phone number</label>
            <PhoneInput
              defaultCountry='ke'
              value={phoneNumber}
              onChange={phone => setPhoneNumber(phone)}
              hideDropdown
              className='input'
            />
            
            {/*<label htmlFor='amount'>Amount</label>
            <input type="number" name="amount" id="amount"  required value={price} disabled/>*/}
            <button className="btn" type='submit' title='send'>I HAVE PAYED</button>
            {
              error && <h4 className='error'>{error}</h4>
            }
            {
              success && <h4 className='success'>{success}</h4>
            }
        </form>
    </div>
  )
}