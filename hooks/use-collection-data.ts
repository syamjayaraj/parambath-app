import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { useState } from "react";

export const useCollectionData = (
  collectionName: string,
  searchInput: string,
  pageNumber: number
) => {
  let query;
  switch (collectionName) {
    case "autos":
      query = gql`
        query GetAutos($searchInput: String, $pageNumber: Int) {
          autos(
            filters: { name: { contains: $searchInput } }
            pagination: { page: $pageNumber, pageSize: 5 }
          ) {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      `;
      break;
    case "businesses":
      query = gql`
        query GetBusinesses {
          businesses {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      `;
      break;
    default:
      throw new Error("Invalid collection name");
  }
  const { loading, error, data, fetchMore } = useQuery(query, {
    variables: { searchInput, pageNumber },
    // fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    data: data ? data[collectionName]?.data : null,
    fetchMore,
  };
};
