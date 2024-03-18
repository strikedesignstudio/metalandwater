import React, { useState } from 'react'

const DropdownText = ({ text }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className='dropdown-container'>
      <button className='dropdown-heading' onClick={() => setOpen(!open)}>
        <svg
          id='Arrow'
          xmlns='http://www.w3.org/2000/svg'
          className={open ? 'dropdown-arrow up' : 'dropdown-arrow down'}
          viewBox='0 0 22 33.5'
        >
          <line
            id='Line_33'
            data-name='Line 33'
            y2='30'
            transform='translate(11)'
            fill='none'
            stroke='#fff'
            stroke-width='3'
          />
          <path
            id='Polygon_1'
            data-name='Polygon 1'
            d='M11,0,22,14H0Z'
            transform='translate(22 33.5) rotate(-180)'
            fill='#fff'
          />
        </svg>
        {text.heading}
      </button>
      <div
        className={
          open ? 'dropdown-text dropdown-show' : 'dropdown-text dropdown-hide'
        }
        dangerouslySetInnerHTML={{ __html: text.text.childMarkdownRemark?.html }}
      ></div>
    </div>
  )
}

export default DropdownText
