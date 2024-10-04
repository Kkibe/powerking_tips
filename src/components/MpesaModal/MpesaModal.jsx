import React from 'react'
import './MpesaModal.scss';
import { Close } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export default function MpesaModal() {
  const handleClose = () => {
    if(document.querySelector('.mpesa-modal').classList.contains('active')) {
      document.querySelector('.mpesa-modal').classList.remove('active');
    }
  }
  return (
    <div className='mpesa-modal' id='donate'>
        <Close className='close' onClick={handleClose}/>
        <form>
            <h4>BUSINESS NUMBER: </h4>
            <h1>4139425</h1>
            <h4>ACCOUNT NUMBER: </h4>
            <h1>POWERKING</h1>
            <NavLink to={'/paid-submit'} onClick={handleClose} className="btn" title='send'>CONTINUE</NavLink>
        </form>
    </div>
  )
}