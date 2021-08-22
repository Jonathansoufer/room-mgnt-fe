import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query rooms {
    rooms {
      id
      name
      status
      company
    }
  }
`;

export const GET_APPOINTMENTS = gql`
  query appointmentsByRoomId($input: Float!) {
    appointmentsByRoomId(id: $input) {
      time
    }
  }
`;

export const APPOINTMENTS_BY_USER_ID = gql`
  query appointmentsByUserId($input: Float!) {
    appointmentsByUserId(id: $input) {
      id
      time
    }
  }
`
