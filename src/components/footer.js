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
        xHandle
        phoneNumber
        generalEmail
      }
    }
  `)

  const { address, xHandle, phoneNumber, generalEmail, addressLink } = data.contentfulFooter

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
          href={`https://www.x.com/${xHandle}`}
          target='_blank'
          rel='noreferrer'
        >
          @{xHandle}
        </a>
      </div>
    </footer>
  )
}

export default Footer
