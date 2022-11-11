// ! denotes required field, use ? for optional
export const schema = gql`
  type Contact {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    message: String!
    createdAt: DateTime!
  }

  type Query {
    contacts: [Contact!]! @requireAuth
    contact(id: Int!): Contact @requireAuth
  }

  input CreateContactInput {
    firstName: String!
    lastName: String!
    email: String!
    message: String!
  }

  type Mutation {
    createContact(input: CreateContactInput!): Contact! @skipAuth
  }
`
