import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  flex: 1;
  height: 100vh;
  padding: 64px;

  h2 {
    font-size: 50px;
  }
`
export const TimeWrapper = styled(motion.ul)`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: center;
  margin-top: 50px;
`;

export const TimeContainer = styled(motion.li)`
  display: flex;
  background-color: #FFF;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.2);
  align-items: center;
  padding: 20px;
  border-radius: 5px;
  min-height: 50px;
`;

export const DeleteBtn = styled.button`
  background-color: ${props => props.theme.colors.red};
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.2);
  padding: 5px 15px;
  color: #FFF;
  font-weight: bold;
  border-radius: 12px;
  margin-top: 5px;
`;
