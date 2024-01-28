import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import EyeForm from "../../components/form/EyeForm";
import {
  ILoginCredentials,
  useLoginMutation,
} from "../../redux/features/Auth/authApi";
import EyeInput from "./../../components/form/EyeInput";

const Login = () => {
  const [userLogin] = useLoginMutation();
  const [loading, setLoading] = useState(false);
  const onLoginSubmit = async (value: FieldValues) => {
    setLoading(true);
    const res = (await userLogin(value as ILoginCredentials)) as any;
    if (res?.data?.success === true) {
      const { message, data } = res.data;
      console.log(data);
      toast.success(`${message}!`);
    } else if (res?.error) {
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
      <EyeForm
        defaultValues={{
          email: "mfarhad.dev@gmail.com",
          password: "Asdfg@12345",
        }}
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
