import React, { useState } from 'react'
import { Link } from 'gatsby'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }
  return (
    <header>
      <nav>
        <div className='navbar'>
          <Link to='/' onClick={isOpen ? toggleSidebar : () => {}}>
            <svg
              title='Logo link to homepage'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 200.785 96'
              className='nav-logo'
            >
              <path
                id='Path_1'
                data-name='Path 1'
                d='M188.119.015,173.589,89.468c-.133.8-.4,1.2-1.067,1.2-.8,0-1.066-.4-1.2-1.2,0,0-14.785-87.046-14.957-88.037A1.475,1.475,0,0,0,154.841.015c-.777,0-21.6-.034-22.456,0a1.588,1.588,0,0,0-1.563,1.415c-.141.827-14.958,88.038-14.958,88.038-.133.8-.4,1.2-1.2,1.2-.666,0-.933-.4-1.066-1.2,0,0-14.1-86.889-14.263-87.8C99.121.454,98.483.015,97.249.015H73.589L58.258,90.4c-.134.8-.533.934-1.067.934s-.933-.134-1.067-.934L40.794.015H17.327a1.805,1.805,0,0,0-2.012,1.7C15.129,2.911,0,93.334,0,93.334V96H12.665L27.2,6.548c.134-.8.4-1.2,1.067-1.2.8,0,1.067.4,1.2,1.2,0,0,14.308,84.591,14.677,86.39A3.612,3.612,0,0,0,47.581,96H66.508c2.113,0,3.334-.869,3.7-2.878.365-1.986,14.709-86.574,14.709-86.574.134-.8.4-1.2,1.2-1.2.666,0,.933.4,1.067,1.2,0,0,14.08,86.692,14.254,87.747A1.852,1.852,0,0,0,103.226,96H127.2L142.526,5.614c.134-.8.533-.933,1.067-.933s.933.133,1.066.933L159.99,96h23.447a1.855,1.855,0,0,0,2.039-1.733L200.785,2.681V.015Z'
                transform='translate(0 0)'
                fill='#fff'
              />
            </svg>
          </Link>
          <button
            id='nav-icon'
            className={`${isOpen ? 'open' : ''}`}
            onClick={toggleSidebar}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className='desktop-page-links'>
            <li>
              <Link to='/about'>About Metal & Water</Link>
            </li>
            <li>
              <Link to='/artists'>Artists</Link>
            </li>
            <li>
              <Link to='/calendar'>What's On</Link>
            </li>
          </ul>
        </div>
        <ul className={`mobile-page-links ${isOpen ? 'show' : 'hide'}`}>
          <li>
            <Link to='/about' onClick={toggleSidebar}>
              About Metal & Water
            </Link>
          </li>
          <li>
            <Link to='/artists' onClick={toggleSidebar}>
              Artists
            </Link>
          </li>
          <li>
            <Link to='/calendar' onClick={toggleSidebar}>
              What's On
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
