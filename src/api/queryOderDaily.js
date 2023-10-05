import { gql } from "@apollo/client";

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
