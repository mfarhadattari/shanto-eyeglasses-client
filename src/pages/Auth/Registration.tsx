import { LockOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EyeForm from "../../components/form/EyeForm";
import EyeInput from "../../components/form/EyeInput";
import { useRegistrationMutation } from "../../redux/features/Auth/authApi";

const Registration = () => {
  const [userRegistration] = useRegistrationMutation();
  // loading handling
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

  const navigate = useNavigate();

  /* ---------------- Registration Submit Handler -------------- */
  const onRegistrationSubmit = async (values: FieldValues) => {
    if (!file) {
      return toast.error("No avatar selected");
    }
    setLoading(true);
    try {
      const formData = new FormData();
      const data = JSON.stringify(values);
      formData.append("file", file);
      formData.append("data", data);
      const res = await userRegistration(formData).unwrap();
      toast.success(`${res.message}!`);
      setLoading(false);
      navigate("/login");
    } catch (error: any) {
      setLoading(false);
      toast.error(`${error?.data?.message}!` || "Something went wrong!");
    }
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
        onSubmit={onRegistrationSubmit}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "20px",
          }}
        >
          Registration User
        </h3>

        <EyeInput
          name="name"
          placeholder="Name"
          type="text"
          prefix={<UserOutlined className="site-form-item-icon" />}
          requiredMessage="Please enter your name!"
        />

        <EyeInput
          name="email"
          placeholder="Email"
          type="email"
          prefix={<UserOutlined className="site-form-item-icon" />}
          requiredMessage="Please enter your email!"
        />

        <Input
          name="file"
          type="file"
          style={{
            marginBottom: "15px",
          }}
          prefix={<UploadOutlined className="site-form-item-icon" />}
          onChange={(e) => setFile(e.target.files[0])}
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
          Register
        </Button>
        <p style={{ marginTop: "20px", fontSize: "14px", textAlign: "left" }}>
          Or{" "}
          <Link style={{ color: "black" }} to="/login">
            Login now!
          </Link>
        </p>
      </EyeForm>
    </main>
  );
};

export default Registration;
