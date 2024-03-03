import React from 'react';
import './lock.css'
import PinField from 'react-pin-field'

export const LockScreen = ({ setPassCode }) => {
   
  
	return (
        <form className='form-lock-screen'>
            <div className='container'>
                <PinField className='pin-field' autoFocus length={4} onChange={(value) => setPassCode(value)} />
                <div className='left-gradient'/>
                <div className='sup-gradient'/>
                <div className='right-gradient'/>
                <div className='inf-gradient'/>
            </div>
        </form>	
    );	
}