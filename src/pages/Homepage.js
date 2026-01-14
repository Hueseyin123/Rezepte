
import React from "react";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
const REVIEWS = gql`
  query GetReviews {
    reviews {
        documentId 
          title
          rating
          body,
            categories {
              name,
              documentId
            }
        }
      }
`;

export default function Homepage() {
  const { data, loading, error } = useQuery(REVIEWS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div>
      {data.reviews.map((review) => (

            <div key={review.documentId} className="review-card">
              <div className="rating">{review.rating}</div>
              <h2>{review.title}</h2>

            {review.categories.map(c => (
            <small key={c.documentId}>{c.name}</small>

          ))}

          <div className="review-body">
            {(() => {
              const fullText =
                review.body
                  ?.map((block) =>
                    block.children?.map((child) => child.text).join(" ")
                  )
                  .join(" ") || "";
              return fullText.substring(0, 100) + "…";
            })()}
          </div>

          <Link to={`/details/${review.documentId}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
}
