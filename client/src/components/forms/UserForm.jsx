import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

function UserForm({ onFinish, isUpdate = false }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.admin);
  const { offices, brands, ranks, roles } = useSelector((state) => state.app);

  useEffect(() => {
    form.resetFields();
    if (isUpdate && Object.keys(user).length !== 0) {
      form.setFieldsValue(user);
      form.setFieldValue("roleId", {
        value: user.role?._id,
        label: user.role?.title,
      });
    }
  }, [isUpdate, user, form]);

  useEffect(() => {
    if (user) {
      if (user.office && user.rank && user.brand) {
        form.setFieldsValue({
          office: {
            value: user.office._id,
          },

          rank: {
            value: user.rank._id,
          },

          brand: {
            value: user.brand._id,
          },
        });
      }
    }
  }, [user, form]);

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
      <div className="flex gap-2">
        <Form.Item
          className="w-1/2"
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: "Το πεδίο είναι υποχρεωτικό",
            },
          ]}
        >
          <Input placeholder="Πληκτρολογείστε το username" />
        </Form.Item>

        {!isUpdate && (
          <Form.Item
            className="w-1/2"
            label="Κωδικός"
            name="password"
            rules={[
              {
                required: true,
                message: "Το πεδίο είναι υποχρεωτικό",
              },
            ]}
          >
            <Input.Password placeholder="Πληκτρολογείστε τον κωδικό" />
          </Form.Item>
        )}
      </div>
      <div className="flex gap-2">
        <Form.Item
          className="w-1/2"
          label="Όνομα"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Το πεδίο είναι υποχρεωτικό",
            },
          ]}
        >
          <Input placeholder="Πληκτρολογείστε το όνομα" />
        </Form.Item>
        <Form.Item
          className="w-1/2"
          label="Επώνυμο"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Το πεδίο είναι υποχρεωτικό",
            },
          ]}
        >
          <Input placeholder="Πληκτρολογείστε το επώνυμο" />
        </Form.Item>
      </div>
      {!isUpdate && (
        <div className="flex gap-2">
          <Form.Item
            className="w-1/2"
            label="Ρόλος"
            name="roleId"
            rules={[
              {
                required: true,
                message: "Το πεδίο είναι υποχρεωτικό",
              },
            ]}
          >
            <Select
              options={roles.map((item) => ({
                value: item._id,
                label: <p className="capitalize">{item.title}</p>,
              }))}
              placeholder="Επιλέξτε τον ρόλο"
            />
          </Form.Item>
        </div>
      )}
      <div className="flex gap-2">
        <Form.Item
          className="w-1/2"
          label="Όπλο - Σώμα"
          name="brand"
          rules={[
            {
              required: true,
              message: "Το πεδίο είναι υποχρεωτικό",
            },
          ]}
        >
          <Select
            options={brands.map((item) => ({
              value: item._id,
              label: item.title + " - " + item.abbreviation,
            }))}
            placeholder="Επιλέξτε το όπλο - σώμα"
          />
        </Form.Item>
        <Form.Item
          className="w-1/2"
          label="Βαθμός"
          name="rank"
          rules={[
            {
              required: true,
              message: "Το πεδίο είναι υποχρεωτικό",
            },
          ]}
        >
          <Select
            options={ranks.map((item) => ({
              value: item._id,
              label: item.title + " - " + item.abbreviation,
            }))}
            placeholder="Επιλέξτε τον βάθμο"
          />
        </Form.Item>
      </div>
      <div className="flex gap-2">
        <Form.Item
          className="w-1/2"
          label="Επιτελικός Φορέας"
          name="office"
          rules={[
            {
              required: true,
              message: "Το πεδίο είναι υποχρεωτικό",
            },
          ]}
        >
          <Select
            options={offices.map((item) => ({
              value: item._id,
              label: item.description,
            }))}
            placeholder="Επιλέξτε το τμήμα"
          />
        </Form.Item>

        <Form.Item className="w-1/2" label="Τηλέφωνο" name="phone">
          <Input placeholder="Πληκτρολογείστε τον αριθμό τηλεφώνου" />
        </Form.Item>
      </div>

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

export default UserForm;
