import React from "react";  
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      name
      documentId
      
    }
  }
`;

export default function SiteHeader() {
  const { data, loading, error } = useQuery(CATEGORIES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="site-header">
      <Link to="/"><h1>Reviews</h1></Link>
      <nav className="categories"><span>Filter reviews by category:</span>
      {data.categories.map(category => (
        <Link key={category.documentId} to={`/category/${category.documentId}`}>
          {category.name}
        </Link>
      ))}
      </nav>
    </div>
  )
}