import {gql} from "@apollo/client";

export const GET_USERS = gql`
  {
    users {
      _id
      name
      email
      surname
      nickname
      avatar
      subscriptions
    }
  }
`


export const GET_SUBSCRIPTIONS_USERS = gql`
  query getUser($key: String!) {
    subscriptions(key: $key) {
      _id
      name
      email
      surname
      nickname
      avatar
      subscriptions
    }
  }
`

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(_id: $id) {
      _id
      name
      email
      surname
    }
  }
`