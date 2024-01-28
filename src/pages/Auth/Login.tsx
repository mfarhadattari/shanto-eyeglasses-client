import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";
import EyeForm from "../../components/form/EyeForm";
import EyeInput from "./../../components/form/EyeInput";

const Login = () => {
  const onLoginSubmit = (value) => {
    console.log(value);
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
