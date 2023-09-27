import { gql } from "@apollo/client";

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
