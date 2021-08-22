import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import React from "react";
import { FiLock, FiMail, FiUserCheck, FiBriefcase } from "react-icons/fi";

import * as yup from "yup";
import * as S from "./styles";
import Input from "../../components/Input";
import { fade } from "../../animations/fade";
import { useMutation } from "@apollo/client";

import { CREATE_USER } from "../../graphql/mutations";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
  const [createUser] = useMutation(CREATE_USER);
  let history = useHistory();

  const handleSignUp = (
    email: string,
    password: string,
    company: string,
    name: string
  ) => {
    try {
      const createUserValidationSchema = yup.object().shape({
        email: yup.string().email().required(),
        company: yup.string().required("coca" || "pepsi"),
        name: yup.string().required(),
        password: yup.string().required(),
      });

      const params = { email, password, company, name };

      createUserValidationSchema.validate(params, {
        abortEarly: true,
      });

      createUser({
        variables: {
          input: {
            email,
            password,
            company,
            name,
          },
        },
      }).then(() => {
        toast.success("Successfully created 🥳");
        setTimeout(() => {
          handleSignIn();
        }, 2000);
      });
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleSignIn = () => {
    history.push("/");
  };

  return (
    <S.Container initial="initial" animate="animate" variants={fade}>
      <S.FormContainer>
        <Formik
          initialValues={{ email: "", password: "", company: "", name: "" }}
          onSubmit={({ email, password, company, name }) =>
            handleSignUp(email, password, company, name)
          }
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
              <h1 style={{ marginBottom: 20 }}>Create an Account</h1>

              <Input
                value={values.name}
                onChange={handleChange}
                placeholder="Name"
                type="name"
                name="name"
                icon={FiUserCheck}
              />
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
              <Input
                value={values.company}
                onChange={handleChange}
                placeholder="Company (coca or pepsi)"
                type="company"
                name="company"
                icon={FiBriefcase}
              />

              <S.BtnContainer type="submit">
                <S.BtnTitle>Submit</S.BtnTitle>
              </S.BtnContainer>
            </form>
          )}
        </Formik>
      </S.FormContainer>
    </S.Container>
  );
};

export default SignUp;
