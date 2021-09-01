import { useMutation, useQuery } from "@apollo/client";
import { format, isBefore } from "date-fns";
import { addHours } from "date-fns/esm";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { fade } from "../../animations/fade";
import { stagger } from "../../animations/stagger";
import { DELETE_APPOINTMENT } from "../../graphql/mutations";
import { APPOINTMENTS_BY_USER_ID } from "../../graphql/queries";
import { useAuth } from "../../hooks/useAuth";

import * as S from "./styles";

interface AppointmentProps {
  id: string;
  time: string;
}

const Appointments: React.FC = () => {
  const { profile } = useAuth();
  const { data, refetch } = useQuery(APPOINTMENTS_BY_USER_ID, {
    variables: { input: parseFloat(profile!.user.id) },
    fetchPolicy: "no-cache",
  });
  const [deleteAppointment] = useMutation(DELETE_APPOINTMENT);

  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  const handleDelete = (id: string) => {
    try {
      deleteAppointment({ variables: { input: parseFloat(id) } }).then(() => {
        refetch();
        toast.success("Successfully removed 🥳");
      });
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    console.log(data);
    if (data) {
      const filtered = data.appointmentsByUserId.sort(
        (a: AppointmentProps, b: AppointmentProps) =>
          new Date(a.time).getTime() - new Date(b.time).getTime()
      );
      setAppointments(filtered);
    }
  }, [data]);

  return (
    <S.Container initial="initial" animate="animate" variants={fade}>
      <h2>Appointments</h2>
      <S.TimeWrapper variants={stagger}>
        {appointments.map((appointment) => (
          <>
            {isBefore(addHours(new Date(appointment.time), 3), new Date()) ? (
              <S.TimeContainer style={{ opacity: 0.5 }}>
                <h1>
                  {format(
                    addHours(new Date(appointment.time), 3),
                    "dd/MM/yyyy HH:mm"
                  )}
                </h1>
                <S.DeleteBtn disabled style={{ cursor: "not-allowed" }}>
                  DELETE
                </S.DeleteBtn>
              </S.TimeContainer>
            ) : (
              <S.TimeContainer>
                <h1>
                  {format(
                    addHours(new Date(appointment.time), 3),
                    "dd/MM/yyyy HH:mm"
                  )}
                </h1>
                <S.DeleteBtn onClick={() => handleDelete(appointment.id)}>
                  DELETE
                </S.DeleteBtn>
              </S.TimeContainer>
            )}
          </>
        ))}
      </S.TimeWrapper>
      coke
    </S.Container>
  );
};

export default Appointments;
