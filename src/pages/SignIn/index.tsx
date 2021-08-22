import { Formik } from "formik";
import React from "react";
import { FiLock, FiMail } from "react-icons/fi";

import * as yup from "yup";
import * as S from "./styles";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/Input";
import { fade } from "../../animations/fade";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  let history = useHistory();

  const handleSignIn = (email: string, password: string) => {
    try {
      const loginValidationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
      });

      const params = { email, password };

      loginValidationSchema.validate(params, {
        abortEarly: true,
      });

      signIn({ email, password });
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const handleSignUp = () => {
    history.push("/signUp");
  };

  return (
    <S.Container initial="initial" animate="animate" variants={fade}>
      <S.FormContainer>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={({ email, password }) => handleSignIn(email, password)}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={handleSubmit}
            >
              <h1 style={{ marginBottom: 20 }}>Login</h1>

              <Input
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                name="email"
                icon={FiMail}
              />

              <Input
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
                name="password"
                icon={FiLock}
              />

              <S.BtnContainer type="submit">
                <S.BtnTitle>Submit</S.BtnTitle>
              </S.BtnContainer>
            </form>
          )}
        </Formik>
        <S.Text onClick={handleSignUp}>Create account</S.Text>
      </S.FormContainer>
    </S.Container>
  );
};

export default SignIn;
