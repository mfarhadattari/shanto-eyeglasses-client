import { LockOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ChangeEvent, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EyeFileInput from "../../components/form/EyeFileInput";
import EyeForm from "../../components/form/EyeForm";
import EyeInput from "../../components/form/EyeInput";
import usePageTitle from "../../hooks/usePageTitle";
import { useRegistrationMutation } from "../../redux/features/Auth/authApi";
import { logout } from "../../redux/features/Auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

const Registration = () => {
  const title = usePageTitle("Registration");
  const methods = useForm();
  const [userRegistration] = useRegistrationMutation();
  const dispatch = useAppDispatch();
  // loading handling
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [fileReset, setFileReset] = useState(false);

  const navigate = useNavigate();

  /* ---------------- Registration Submit Handler -------------- */
  const onRegistrationSubmit = async (values: FieldValues) => {
    if (!file) {
      return toast.error("No avatar selected");
    }
    setLoading(true);
    dispatch(logout());
    try {
      const formData = new FormData();
      const data: Record<string, any> = values;
      const strData = JSON.stringify(data);
      formData.append("file", file);
      formData.append("data", strData);
      const res = await userRegistration(formData).unwrap();
      methods.reset();
      setFileReset(true);
      toast.success(`${res.message}!`);
      setLoading(false);
      navigate("/login");
    } catch (error: any) {
      setLoading(false);
      toast.error(`${error?.data?.message}!` || "Something went wrong!");
    }
  };

  /* ---------------- Handel File Change -------------- */
  const handelFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selected = files[0] as any;
      setFile(selected);
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
      {title}
      <EyeForm
        methods={methods}
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

        <EyeFileInput
          name="file"
          placeholder="Select image"
          prefix={<UploadOutlined className="site-form-item-icon" />}
          onChange={handelFileChange}
          isReset={fileReset}
          acceptType="image/*"
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
