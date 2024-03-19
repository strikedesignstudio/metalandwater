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
        phoneNumber
        generalEmail
      }
    }
  `)

  const { address, phoneNumber, generalEmail, addressLink } = data.contentfulFooter

  return (
    <footer>
      <div>
        <Link to='/' className='footer-logo'>
          Metal & Water
        </Link>
      </div>
      <div>
        <a href={`mailto:${generalEmail}`}>{generalEmail}</a>
        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
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
      </div>
    </footer>
  )
}

export default Footer
