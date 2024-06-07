/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import "./LoginForm.scss";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { initialValues, validationSchema } from "./loginForm.data";
import { Auth } from "../../../api/Auth/auth";
import { useAuthStore } from "../../../store/auth";
const auth = new Auth();
interface Props {
  goBack: () => void;
}
export function LoginForm({ goBack }: Props) {
  const setToken = useAuthStore((state) => state.setToken);
  const setProfile = useAuthStore((state) => state.setProfile);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log("Login ok: ", formValue);
      try {
        const token = await auth.login(formValue);
        setToken(token);
        const profile = await auth.profile();
        setProfile(profile);
        navigate("/home");
      } catch (error: unknown) {
        console.log(error);
        throw error;
      }
    },
  });
  const onShowHiddenPassword = (): void =>
    setShowPassword((prevState) => !prevState);
  return (
    <div className="LoginForm">
      <h1>Inicio de sesión</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="usuario"
          type="text"
          placeholder="Usuario"
          icon="user circle outline"
          onChange={formik.handleChange}
          value={formik.values.usuario}
          error={formik.errors.usuario}
        />
        {/* {formik.errors.usuario && <p>{formik.errors.usuario}</p>} */}
        <Form.Input
          name="clave"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          icon={
            <Icon
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={onShowHiddenPassword}
            />
          }
          onChange={formik.handleChange}
          value={formik.values.clave}
          error={formik.errors.clave}
        />
        <Form.Button type="submit" fluid>
          Continuar
        </Form.Button>
      </Form>
      <div className="options">
        <p onClick={goBack}>Volver</p>
      </div>
    </div>
  );
}
