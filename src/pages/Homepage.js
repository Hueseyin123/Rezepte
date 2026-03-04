import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import React from "react";  
import { Link } from "react-router-dom";

const CATEGORY_REZEPTES = gql`
      query GetCategories{
      categories {
      documentId
      name
    }  
}
`;


function handleClick() {
  console.info("Outside works")
}



export default function Homepage() {
  const { data, loading, error } = useQuery(CATEGORY_REZEPTES);
 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

return (
    <div className = "Kategorie">

        <Stack direction="row" spacing={8.5} size="true ">

              {data.categories.map(category => (
                <Link key={category.documentId} to={`/category/${category.documentId}`}>
                      <Chip style={{
                                    marginTop: "50px",
                                    width: '385px',
                                    height: '500px',
                                    borderRadius: '90px',
                                    fontSize: "30px",
                                    fontFamily: "fantasy",
                                    cursor: "pointer",
                                    backgroundColor: "tan"}}
                        key={category.name} onClick={handleClick} label= {category.name}  color="primary" variant="outlined" />
                </Link>
              ))}
        </Stack>
    </div>
  )
}

