import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulFooter {
        address {
          childMarkdownRemark {
            html
          }
        }
        addressLink
        generalEmail
      }
    }
  `)

  const { address, generalEmail, addressLink } =
    data.contentfulFooter

  return (
    <footer>
      <div>
        <Link to='https://www.instagram.com/metalwater.co/' className='footer-logo'>
          Metal & Water
        </Link>
      </div>
      <div>
        <a href={`mailto:${generalEmail}`}>{generalEmail}</a>
      </div>
      <div>
        <a
          href={addressLink}
          target='_blank'
          rel='noreferrer'
          dangerouslySetInnerHTML={{ __html: address.childMarkdownRemark.html }}
        ></a>
      </div>
      <div>
        <a
          href='https://www.instagram.com/metalwater.co/'
          target='_blank'
          rel='noreferrer'
        >
          @metalwater.co
        </a>
        <a
          href='https://mailchi.mp/metalwater/newsletter'
          target='_blank'
          rel='noreferrer'
          className='footer-email'
        >
          Sign up for our newsletter{' '}
          <svg
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
        </a>
        <a
          href='https://www.pacificpacific.pub'
          target='_blank'
          rel='noreferrer'
          className='footer-credit'
        >
          Website designed and developed by Pacific
        </a>
      </div>
    </footer>
  )
}

export default Footer
