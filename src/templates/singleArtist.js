import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { GatsbyImage } from 'gatsby-plugin-image'
import ImageSlider from '../components/imageSlider'

const SingleArtist = ({ data }) => {
  const { artist, featuredImage, artistInfo, works } =
    data.contentfulArtist

  return (
    <Layout>
      <div className='page-container'>
        <div className='artist-hero'>
          <h1 className='artist-title'>{artist}</h1>
          <div className='featured-image-container'>
            <GatsbyImage
              image={featuredImage.image?.gatsbyImageData}
              alt={featuredImage.image?.description}
            ></GatsbyImage>
            <p className='image-credit'>{featuredImage.imageCredit}</p>
          </div>
        </div>
        <div
          className='artist-bio'
          dangerouslySetInnerHTML={{
            __html: artistInfo?.childMarkdownRemark?.html,
          }}
        ></div>
        {works?.map((work) => (
          <div key={work.id} className='work-container'>
            <div className='work-info'>
              <p className='artist-underline'>{work.nameOfWork}</p>
              <p className='artist-underline'>{work.year}</p>
              {work.credits && (
                <div
                  className='artist-underline'
                  dangerouslySetInnerHTML={{
                    __html: work.credits.childMarkdownRemark.html,
                  }}
                ></div>
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: work.workDescription?.childMarkdownRemark.html,
                }}
              ></div>
            </div>
            <div className='work-media'>
              <ImageSlider images={work.images}></ImageSlider>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleArtist($slug: String) {
    contentfulArtist(slug: { eq: $slug }) {
      artist
      featuredImage {
        image {
          gatsbyImageData
          description
        }
        imageCredit
      }
      artistInfo {
        childMarkdownRemark {
          html
        }
      }
      works {
        id
        images {
          id
          image {
            description
            gatsbyImageData(width: 3000)
          }
          imageCredit
        }
        year
        workDescription {
          childMarkdownRemark {
            html
          }
        }
        credits {
          childMarkdownRemark {
            html
          }
        }
        nameOfWork
      }
    }
  }
`

export default SingleArtist
