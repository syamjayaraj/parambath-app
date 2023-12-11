import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

export const useCollectionData = (
  type: string,
  searchInput: string,
  category: number | undefined,
  pageNumber: number,
  pageSize: number
) => {
  let query;
  console.log(category);
  switch (type) {
    case "autos":
      query = gql`
        query GetAutos(
          $searchInput: String
          $pageNumber: Int
          $pageSize: Int
          $category: Int
        ) {
          autos(
            filters: {
              name: { contains: $searchInput }
              nameMalayalam: { contains: $searchInput }
              auto_stand: { id: { eq: $category } }
            }
            pagination: { page: $pageNumber, pageSize: $pageSize }
          ) {
            data {
              id
              attributes {
                name
                nameMalayalam
                ownerName
                ownerNameMalayalam
                auto_stand {
                  data {
                    id
                    attributes {
                      name
                      nameMalayalam
                    }
                  }
                }
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
    variables: { searchInput, category, pageNumber, pageSize },
    // fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    error,
    data: data ? data[type]?.data : null,
    fetchMore,
  };
};
