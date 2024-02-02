import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EyeForm from "../../components/form/EyeForm";
import usePageTitle from "../../hooks/usePageTitle";
import {
  ILoginCredentials,
  useLoginMutation,
} from "../../redux/features/Auth/authApi";
import { setUser } from "../../redux/features/Auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import EyeInput from "./../../components/form/EyeInput";

const Login = () => {
  const title = usePageTitle("Login");

  const methods = useForm();

  const [userLogin] = useLoginMutation();
  const dispatch = useAppDispatch();

  // loading handling
  const [loading, setLoading] = useState(false);

  // redirect handling
  const navigate = useNavigate();
  const redirectUrl = useLocation()?.state?.from || "/";

  /* -------------- Login Submit Handler -------------- */
  const onLoginSubmit = async (value: FieldValues) => {
    setLoading(true);
    const res = (await userLogin(value as ILoginCredentials)) as any;
    if (res?.data?.success === true) {
      const { message, data } = res.data;
      dispatch(setUser(data));
      methods.reset();
      toast.success(`${message}!`);
      navigate(redirectUrl);
    } else if (res?.error?.data) {
      const { message } = res.error.data;
      toast.error(`${message}!`);
    } else {
      toast.error("Something went wrong!");
    }
    return setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      {title}
      <EyeForm
        methods={methods}
        className="login-form"
        style={{
          width: "300px",
          margin: "0 auto",
        }}
        onSubmit={onLoginSubmit}
      >
        <h3 style={{ textAlign: "center", margin: "10px", fontSize: "20px" }}>
          Login User
        </h3>

        <EyeInput
          name="email"
          placeholder="Email"
          type="email"
          prefix={<UserOutlined className="site-form-item-icon" />}
          requiredMessage="Please enter your email!"
        />
        <EyeInput
          name="password"
          placeholder="Password"
          type="password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          requiredMessage="Please enter your password!"
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          className="login-form-button"
          loading={loading}
          icon={<LoginOutlined />}
        >
          Log in
        </Button>
        <p style={{ marginTop: "20px", fontSize: "14px", textAlign: "left" }}>
          Or{" "}
          <Link style={{ color: "black" }} to="/registration">
            Register now!
          </Link>
        </p>
      </EyeForm>
    </main>
  );
};

export default Login;
