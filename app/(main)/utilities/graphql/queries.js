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

export const TodosLosUsuariosQuery = gql`
query TodosLosUsuarios {
  allUsers {
    nodes {
      id
      name
      email
    }
  }
}
`;

export const queryOrderDaily = gql`
  query queryOrderDaily {
    allOrders(
      filter: { idUser: { equalTo: 1 }, startDate: { equalTo: "2023-09-14" } }
    ) {
      nodes {
        id
        connectionByIdConnection {
          address
        }
        createdDate
        orderTypeByIdOrderType {
          name
        }
        ticketStatusByIdTicketStatus {
          name
        }
      }
    }
  }
`;