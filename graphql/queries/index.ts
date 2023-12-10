import { gql } from "@apollo/client";

export const GET_AUTOS = gql`
  query GetAutos {
    autos {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export const GET_BUSINESSES = gql`
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
