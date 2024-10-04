import React, { useState, useEffect} from 'react'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { addPhone } from '../firebase';
import AppHelmet from '../components/AppHelmet';

export default function Paidpage() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
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

    addPhone({phone: phoneNumber, message});
    setSuccess(`Your Request Has Been Submitted For Approval`)
  };
  
  useEffect(() => {
    error && setTimeout(() => {
      setError(null);
    }, 3000);

    success && setTimeout(() => {
      setPhoneNumber('')
      setSuccess(null);
      window.location.replace('/tips')
    }, 3000);
  }, [error, success]);
  
  return (
    <div className='paid-page' >
        <AppHelmet title={"Paid"} location={'/paid-submit'}/>
        <form onSubmit={handleSubmit}>
            <h4>BUSINESS NUMBER: </h4>
            <h1>4139425</h1>
            <h4>ACCOUNT NUMBER: </h4>
            <h1>POWERKING</h1>
            <label htmlFor='name'>Phone number</label>
            <PhoneInput
              defaultCountry='ke'
              value={phoneNumber}
              onChange={phone => setPhoneNumber(phone)}
              hideDropdown
              className='input'
            />
            <label>Paste your mpesa message:</label>
            <textarea placeholder="MPESA MESSAGE" required value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button className="btn" type='submit' title='send' aria-label="send">SUBMIT</button>
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