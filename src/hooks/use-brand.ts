import {gql} from "@apollo/client";

export const GET_BRAND = gql`
  query getBrand($_id: String, $user_id: String) {
    brand(_id: $_id, user_id: $user_id) {
      _id
      title
      logo
      link
      description
      user_id
      updated_at
      created_at
    }
  }
`