import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { login } from "../../redux/features/auth/authActions";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    dispatch(login(values.userName, values.password))
      .then((url) => navigate(url))
      .catch((error) => console.error(error));
  };

  return (
    <Form
      className="flex flex-col gap-2"
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item
        label={
          <span className="text-white text-lg font-semibold">Όνομα χρήστη</span>
        }
        name="userName"
        rules={[
          {
            required: true,
            message: "Το πεδίο είναι υποχρεωτικό",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={
          <span className="text-white text-lg font-semibold">Κωδικός</span>
        }
        name="password"
        rules={[
          {
            required: true,
            message: "Το πεδίο είναι υποχρεωτικό",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Σύνδεση
        </Button>
      </Form.Item>
    </Form>
  );
}

export default LoginForm;
