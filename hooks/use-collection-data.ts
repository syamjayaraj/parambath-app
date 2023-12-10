import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export const useCollectionData = (
  type: string,
  searchInput: string,
  pageNumber: number,
  pageSize: number
) => {
  let query;
  switch (type) {
    case "autos":
      query = gql`
        query GetAutos($searchInput: String, $pageNumber: Int, $pageSize: Int) {
          autos(
            filters: { name: { contains: $searchInput } }
            pagination: { page: $pageNumber, pageSize: $pageSize }
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
        query GetBusinesses(
          $searchInput: String
          $pageNumber: Int
          $pageSize: Int
        ) {
          businesses(
            filters: { name: { contains: $searchInput } }
            pagination: { page: $pageNumber, pageSize: $pageSize }
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
    default:
      throw new Error("Invalid collection name");
  }
  const { loading, error, data, fetchMore } = useQuery(query, {
    variables: { searchInput, pageNumber, pageSize },
    // fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    data: data ? data[type]?.data : null,
    fetchMore,
  };
};
