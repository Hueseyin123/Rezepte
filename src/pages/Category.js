import React from 'react'
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { Link, useParams } from 'react-router-dom';
import { c } from '@apollo/client/react/internal/compiler-runtime';

const CATEGORY_REVIEWS = gql`
  query GetCategoryReviews($id: ID!) {
    category(documentId: $id) {
      name,
      documentId,
        reviews {
        title,
        body,
        rating,
        documentId,
          
          
      } 

    }
  }
`;


export default function Category() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(CATEGORY_REVIEWS, {
    variables: { id: id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div>
      <h2>{data.category.name}</h2>
   {data.category.reviews.map(review  => (
        <div key={review.documentId} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          <small key={data.category.documentId}>{data.category.name}</small>

<p>
  {review.body?.text ? review.body.text.substring(0, 100) : 'click Read more for full content'}...
</p>
<Link to={`/details/${review.documentId}`}>Read more</Link>
        </div>
            ))}
    </div>
  )
}