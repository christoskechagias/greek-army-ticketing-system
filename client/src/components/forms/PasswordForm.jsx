import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

function PasswordForm({ onFinish }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  return (
    <Form
      form={form}
      initialValues={{
        remember: true,
      }}
      layout="vertical"
      className="mt-5 max-w-[900px] w-full"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        className="w-1/2"
        label="Νέος κωδικός"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "Το πεδίο είναι υποχρεωτικό",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        className="w-1/2"
        label="Επανάληψη νέου κωδικού"
        name="reNewPassword"
        dependencies={["newPassword"]}
        rules={[
          {
            required: true,
            message: "Το πεδίο είναι υποχρεωτικό",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Οι δύο κωδικοί δεν ταιριάζουν!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <div className="flex gap-2 mt-10">
        <Form.Item>
          <Button onClick={() => navigate(-1)}>Ακύρωση</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Καταχώρηση
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default PasswordForm;
