import React from 'react'
import { useParams } from 'react-router-dom'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'

const REVIEW_DETAILS = gql`
query GetReviewDetails($id: ID!) {
  review(documentId: $id) {
    documentId
    title
    rating
    body
  }
}

`;

export default function ReviewDetails() {
  const { id } = useParams()
  const { data, loading, error } = useQuery(REVIEW_DETAILS, {
    variables: { id: id },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>


  console.log(data)


  return (
    <div className="review-card">
      <div className="rating">{data.review.rating}</div>
      <h2>{data.review.title}</h2>
      <small>console list</small>

 <p>{data.review.body[0].children[0].text}</p>
      </div>
  );
}
