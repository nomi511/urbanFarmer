import React from 'react'
import LogoImg from '../images/logo.png'


function Logo() {
  return (
    <div className='logo'>
        <img src={LogoImg} alt="logo" className='logo-img' />
        <div className='logo-txt'>UrbanFarmer</div>
    </div>
  )
}

export default Logo