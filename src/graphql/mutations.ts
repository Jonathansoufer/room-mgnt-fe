import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($input: AuthInput!) {
    login(data: $input) {
      token
      user {
        id
        name
        email
        company
      }
    }
  }
`;

export const CREATE_APPOINTMENT = gql`
  mutation ($input: CreateAppointmentInput!) {
    createAppointment(data: $input) {
      id
      roomId
      time
      userId
    }
  }
`;

export const CREATE_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(data: $input) {
      id
      name
      email
      company
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation ($input: Float!) {
    deleteAppointment(id: $input)
  }
`;
