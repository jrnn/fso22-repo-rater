import { gql, useQuery } from "@apollo/client"
import { REVIEW_FIELDS } from "../fragments"
import { Review } from "../../types"

interface MeResponse {
  me?: {
    id: string
    username: string
    reviews: {
      pageInfo: {
        endCursor: string
        hasNextPage: boolean
      }
      edges: ReadonlyArray<{
        node: Review
      }>
    }
  }
}

type MeVariables = {
  getReviews: false
} | {
  getReviews: true
  first: number
  after: string
}

const ME = gql`
  ${REVIEW_FIELDS}
  query (
    $getReviews: Boolean = false,
    $first: Int,
    $after: String
  ) {
    me {
      id
      username
      reviews (
        first: $first,
        after: $after
      ) @include(
        if: $getReviews
      ) {
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          node {
            ...ReviewFields
          }
        }
      }
    }
  }
`

export const useMeQuery = (variables: MeVariables) =>
  useQuery<MeResponse>(ME, {
    variables,
    fetchPolicy: "cache-and-network"
  })
