import React from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";

function TicketForm({ onFinish }) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { ticketCategories } = useSelector((state) => state.app);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

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
        className="w-full max-w-[600px]"
        label="Κατηγορία"
        name="category"
        rules={[
          {
            required: true,
            message: "Το πεδίο είναι υποχρεωτικό",
          },
        ]}
      >
        <Select
          options={ticketCategories.map((item) => ({
            value: item._id,
            label: item.title,
          }))}
          placeholder="Επιλέξτε κατηγορία"
        />
      </Form.Item>
      <Form.Item
        className="w-full max-w-[600px]"
        label="Θέμα"
        name="subject"
        rules={[
          {
            required: true,
            message: "Το πεδίο είναι υποχρεωτικό",
          },
        ]}
      >
        <Input showCount maxLength={50} placeholder="Πληκτρολογείστε το θέμα" />
      </Form.Item>

      <Form.Item
        className="w-full max-w-[600px]"
        label="Περιγραφή"
        name="description"
        rules={[
          {
            required: true,
            message: "Το πεδίο είναι υποχρεωτικό",
          },
        ]}
      >
        <TextArea rows={6} placeholder="Πληκτρολογείστε την περιγραφή..." />
      </Form.Item>

      <Form.Item
        name="images"
        label="Εικόνες"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          name="images"
          listType="picture"
          beforeUpload={() => false}
          multiple
        >
          <Button icon={<UploadOutlined />}>Επιλέξτε τις εικόνες σας</Button>
        </Upload>
      </Form.Item>

      <div className="flex gap-2 mt-10">
        <Form.Item>
          <Button onClick={() => navigate(-1)}>Ακύρωση</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Δημιουργία
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default TicketForm;
