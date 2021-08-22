import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled(motion.div)`
  flex: 1;
  height: 100vh;
  padding: 64px;
`;

export const FormContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BtnContainer = styled.button`
  background-color: #2968e9;
  padding: 16px;
  width: 300px;
  margin-top: 10px;
  border-radius: 10px;
`;

export const BtnTitle = styled.h2`
  color: #fff;
`;

export const Text = styled.button`
  color: #2968e9;
  font-size: 16px;
  font-weight: 500;
  margin: 20px;
  background-color: transparent;
`;
