import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import _ from "lodash";

export const useCategoryData = (categoryType: string) => {
  let query;
  switch (categoryType) {
    case "auto-stands":
      query = gql`
        query GetAutoStands {
          autoStands {
            data {
              id
              attributes {
                name
                nameMalayalam
              }
            }
          }
        }
      `;
      break;
    default:
      throw new Error("Invalid collection name");
  }
  const { loading, error, data } = useQuery(query, {});

  return {
    categoryLoading: loading,
    categoryError: error,
    categoryData: data ? data[_.camelCase(categoryType)]?.data : null,
  };
};
