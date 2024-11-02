import React, { useState } from "react";
import { Input, Upload, Button, Form } from "antd";
import { useDispatch } from "react-redux";
import { alert } from "../../redux/features/alert/alertSlice";
import { FiPaperclip, FiArrowUpCircle } from "react-icons/fi";

const { TextArea } = Input;

const ChatInput = ({ onFinish, isActive }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [comment, setComment] = useState("");

  const updateFormValues = (newComment) => {
    form.setFieldsValue({ comment: newComment });
    setComment(newComment);
  };

  const handleFileChange = (info) => {
    const newFileList = info.fileList.map((file) => {
      if (file.originFileObj) {
        return file;
      }
      return {
        ...file,
        url: file.url || file.thumbUrl,
      };
    });
    setFileList(newFileList);
    form.setFieldsValue({ images: newFileList });
  };

  const handleFileRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    form.setFieldsValue({ images: newFileList });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleCommentChange = (e) => {
    updateFormValues(e.target.value);
  };

  const handleSubmit = (values) => {
    onFinish(values);
    form.resetFields();
    setFileList([]);
    setComment("");
  };

  const isButtonDisabled = () => {
    return !(comment.trim() || fileList.length > 0);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");

    if (!isImage) {
      dispatch(
        alert({
          type: "error",
          message: "Επιτρέπονται μόνο εικόνες",
        })
      );
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  return (
    <div>
      {isActive && (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ remember: true }}
          autoComplete="off"
          className="m-3 p-1 border border-gray-300 rounded-xl"
        >
          <div className="w-[200px]">
            <Upload
              fileList={fileList}
              onRemove={handleFileRemove}
              listType="text"
              showUploadList={{
                showRemoveIcon: true,
              }}
            />
          </div>
          <div className="flex items-end space-x-2">
            <Form.Item
              name="images"
              className="m-0"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                name="images"
                listType="text"
                beforeUpload={beforeUpload}
                multiple
                onChange={handleFileChange}
                fileList={fileList}
                showUploadList={false}
                accept="image/*"
              >
                <Button
                  icon={<FiPaperclip size={20} />}
                  className="rounded-full border-none"
                />
              </Upload>
            </Form.Item>

            <Form.Item name="comment" className="w-full m-0">
              <TextArea
                className="rounded-2xl flex p-2 resize-none border-0 outline-none focus:outline-none focus:ring-0"
                placeholder="Type a message..."
                autoSize={{ minRows: 1, maxRows: 5 }}
                value={comment}
                onChange={handleCommentChange}
              />
            </Form.Item>

            <Form.Item className="m-0">
              <Button
                htmlType="submit"
                icon={<FiArrowUpCircle size={25} />}
                className="rounded-full border-none"
                disabled={isButtonDisabled()}
              />
            </Form.Item>
          </div>
        </Form>
      )}
    </div>
  );
};

export default ChatInput;
