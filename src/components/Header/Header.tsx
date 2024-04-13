import React, { useState } from 'react';
import { Tooltip } from 'antd';
import './Header.scss'
import XemplLogo from './../../assets/images/xempla-logo.svg'
import NavIconMenu from './../../assets/images/nav-dropdown-icon.svg'
import ThemeMoon from './../../assets/images/nightmode-nav-icon.svg'
import LocationPin from './../../assets/images/location-nav-icon.svg'
import WeatherIcon from './../../assets/images/weather-nav-icon.svg'
import NotificationIcon from './../../assets/images/noti-nav-icon.svg'
import UserNavIcon from './../../assets/images/user-nav-icon.svg'


const Header = () => {
  return (
    <header className='w-100 product-header position-fixed'>
      <div className="header-wrapper d-flex justify-content-between pe-3 position-relative">
        <div className="left-header-content d-flex flex-row align-items-center">
          <button className='xem-header-nav-btn d-flex justify-content-center align-items-center me-3'><img src={NavIconMenu} alt="nav" /></button>
          <img src={XemplLogo} alt="Xempla" className='xempla-logo' />
        </div>
        <div className='right-header-content d-flex flex-row align-items-center'>
          <Tooltip title="Change Theme">
            <button className='squircle-btn theme-change-btn me-2' >
              <img src={ThemeMoon} alt="change theme" />
            </button>
          </Tooltip>
          <Tooltip title="Location: Mumbai, India">
            <div className="weatherHeader d-flex flex-row align-items-center justify-content-center me-2">
              <img src={LocationPin} alt="change theme" />
              <p className="m-0 ps-2">Mumbai, India</p>
            </div>
          </Tooltip>
          <Tooltip title="Weather">
            <button className='squircle-btn wun-btn me-2'>
              <img src={WeatherIcon} alt="weather" />
            </button>
          </Tooltip>
          <Tooltip title="Notification">
            <div className='position-relative me-2'>
              <span className="notidot position-absolute"></span>
              <button className='squircle-btn wun-btn me-0'>
                <img src={NotificationIcon} alt="change theme" />
              </button>
            </div>
          </Tooltip>

          <div className='dropdown-usernav'>
            <Tooltip title="Your Profile and settings">
              <button className='squircle-btn wun-btn'>
                <img src={UserNavIcon} alt="change theme" />
              </button>
            </Tooltip>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header