import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
  flex: 1;
  height: 100vh;
  padding: 64px;

  a {
    color: #FFF;
  }

  h2 {
    font-size: 28px;
  }

`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;

  span {
    background-image: ${props => `linear-gradient(115deg, ${props.theme.colors.gradientPrimary}, ${props.theme.colors.gradientSecondary}, ${props.theme.colors.gradientPrimary})`};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Chip = styled(motion.span)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: ${props => `linear-gradient(115deg, ${props.theme.colors.gradientPrimary}, ${props.theme.colors.gradientSecondary})`};
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.2);
  min-width: 350px;
  min-height: 150px;
  border-radius: 5px;
  padding: 8px;

  h3 {
    font-size: 32px;
  }
`;

export const RoomsContent = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
