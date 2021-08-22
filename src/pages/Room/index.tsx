/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation, useQuery } from '@apollo/client';
import {
  addDays,
  format,
  isBefore,
  parseISO,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
  subDays,
  subHours
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

import * as S from './styles';
import { GET_APPOINTMENTS } from '../../graphql/queries';
import { CREATE_APPOINTMENT } from '../../graphql/mutations';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { fade } from '../../animations/fade';

interface AppointmentProps {
  time: Date
}

interface ScheduleProps {
  time: number;
  dateTime: string;
  past: boolean;
  appointment: any;
}

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const Room: React.FC = () => {

  const { id }: { id: string } = useParams();
  const { profile } = useAuth();

  const [handleCreate] = useMutation(CREATE_APPOINTMENT);
  const { data: appointmentData, refetch } = useQuery(GET_APPOINTMENTS, {
    variables: { input: parseFloat(id) },
    fetchPolicy: 'no-cache'
  })

  const [date, setDate] = useState(new Date())
  const [appointments, setAppointments] = useState<ScheduleProps[]>();

  useEffect(() => {
    if (appointmentData) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const dateData = range.map(hour => {
        const checkDate = setMilliseconds(setSeconds(setMinutes(setHours(date, hour), 0), 0), 0);
        const compareDate = utcToZonedTime(checkDate, timezone);

        let t = appointmentData.appointmentsByRoomId.find((a: AppointmentProps) => {
          const correctTimezone = parseISO(a.time.toString()).toISOString()
          return correctTimezone === subHours(checkDate, 3).toISOString()
        })

        return {
          time: hour,
          dateTime: subHours(checkDate, 3).toISOString(),
          past: isBefore(compareDate, new Date()),
          appointment: t
        };
      });
      setAppointments(dateData)
    }
  }, [appointmentData, date])

  const handlePrevDay = () => {
    setDate(subDays(date, 1));
  }
  const handleNextDay = () => {
    setDate(addDays(date, 1));
  }

  const handleAppointment = (date: string) => {
    const body = {
      time: date,
      roomId: parseFloat(id),
      userId: profile ? parseFloat(profile?.user.id) : 0
    }

    handleCreate({ variables: { input: body } }).then(() => {
      refetch()
      toast.success('Successfully created 🥳')
    })
  }

  return (
    <S.Container initial="initial" animate='animate' variants={fade}>
      <S.DateContainer>
        <S.ActionButton onClick={handlePrevDay} >-</S.ActionButton>
        <h2>{format(date, 'dd/MM/yyyy')}</h2>
        <S.ActionButton onClick={handleNextDay} >+</S.ActionButton>
      </S.DateContainer>

      <S.TimeWrapper>
        {appointments && appointments.map(time => (
          <S.TimeContainer key={time.time}>
            {time.appointment ? (
              <FiXCircle color="#F55C47" size={21} />
            ) : (
              <FiCheckCircle color="#4AA96C" size={21} />
            )}
            <S.TimeInfoContainer
              style={{
                opacity: time.past ? 0.5 : 1,
              }}
            >
              <S.Time>{time.time}:00h</S.Time>
              <>
                {time.appointment ? (
                  <S.DisabledBtn disabled>
                    Unavailable
                  </S.DisabledBtn>
                ) : (
                  <S.ScheduleBtn
                    style={{ cursor: time.past ? 'not-allowed' : 'pointer' }}
                    disabled={time.past}
                    onClick={() => handleAppointment(time.dateTime)}
                  >
                    Schedule
                  </S.ScheduleBtn>
                )}
              </>
            </S.TimeInfoContainer>
          </S.TimeContainer>
        ))}
      </S.TimeWrapper>
    </S.Container>
  );
}

export default Room;
