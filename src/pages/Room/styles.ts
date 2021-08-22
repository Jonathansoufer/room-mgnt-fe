import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  flex: 1;
  height: 100vh;
  padding: 64px;
`;

export const DateContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 50px;
  }
`;

export const ActionButton = styled.button`
  background-image: ${props => `linear-gradient(115deg, ${props.theme.colors.gradientPrimary}, ${props.theme.colors.gradientSecondary})`};
  color: #FFF;

  border-radius: 50%;
  border: none;
  min-width: 25px;
  min-height: 25px;

  margin-left: 25px;
  margin-right: 25px;
`;

export const TimeWrapper = styled.ul`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: center;
  margin-top: 50px;
`;

export const TimeContainer = styled.li`
  display: flex;
  background-color: #FFF;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.2);
  align-items: center;
  padding: 20px;
  border-radius: 5px;
  min-height: 50px;
`;

export const TimeInfoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #ddd;
  padding-left: 20px;
  margin-left: 20px;
`;

export const Time = styled.h1`
  font-size: 25px;
  font-weight: 500;
`;

export const ScheduleBtn = styled.button`
  background-color: ${props => props.theme.colors.green};
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.2);
  padding: 5px 15px;
  color: #FFF;
  font-weight: bold;
  border-radius: 12px;
  margin-top: 5px;
`;

export const DisabledBtn = styled.button`
  background-color: ${props => props.theme.colors.red};
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.2);
  padding: 5px 15px;
  color: #FFF;
  font-weight: bold;
  border-radius: 12px;
  margin-top: 5px;
  cursor: not-allowed;
`;
