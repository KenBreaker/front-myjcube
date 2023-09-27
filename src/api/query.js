import { gql } from "@apollo/client";

export const getOrderOfWeek = gql`
  query getOrderOfWeek(
    $greaterThanOrEqualTo: Date = ""
    $lessThanOrEqualTo: Date = ""
  ) {
    allOrders(
      filter: {
        startDate: {
          greaterThanOrEqualTo: $greaterThanOrEqualTo
          lessThanOrEqualTo: $lessThanOrEqualTo
        }
      }
    ) {
      edges {
        node {
          userByIdUser {
            name
          }
          startDate
          id
        }
      }
    }
  }
`;
