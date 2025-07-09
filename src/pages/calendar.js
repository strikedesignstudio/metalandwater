import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { graphql } from 'gatsby'
import useWindowSize from '../utils/useWindowSize'

const Calendar = ({ data }) => {
  const months = data.contentfulCalendarPage.monthListings
  const { width } = useWindowSize()
  const isMobile = width < 750
  return (
    <Layout>
      <div className='calendar-container'>
        {months.map((month) => (
          <div key={month.id} className='month-container'>
            <h2 className='calendar-heading'>{month.monthHeading}</h2>
            {month.performances.map((performance) => (
              <a
                href={performance.link}
                key={performance.id}
                target='_blank'
                rel='noreferrer'
                className='calendar-link'
              >
                <div className='calendar-date'>{performance.date}</div>
                {!isMobile && <span>&mdash;</span>}
                <div className='calendar-info'>
                  <div>{performance.title}</div>
                  {!isMobile && <span>&mdash;</span>}
                  <div>{performance.location}</div>
                </div>
                {!isMobile && (
                  <svg
                    id='Arrow'
                    xmlns='http://www.w3.org/2000/svg'
                    className='arrow-right'
                    viewBox='0 0 22 33.5'
                  >
                    <line
                      id='Line_33'
                      data-name='Line 33'
                      y2='30'
                      transform='translate(11)'
                      fill='none'
                      stroke-width='3'
                    />
                    <path
                      id='Polygon_1'
                      data-name='Polygon 1'
                      d='M11,0,22,14H0Z'
                      transform='translate(22 33.5) rotate(-180)'
                    />
                  </svg>
                )}
              </a>
            ))}
          </div>
        ))}

<div className="month-container">
  <a href="https://metalwater.co/archive/" alt="Archive Page" className="calendar-link">Archive</a>
  </div>
   
      </div>
        
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulCalendarPage {
      monthListings {
        id
        monthHeading
        performances {
          date
          id
          link
          location
          title
        }
      }
    }
  }
`

export const Head = () => <Seo title="What's On" />

export default Calendar
