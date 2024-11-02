import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Table, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getColumns } from "./BannersTableColumns";
import {
  fetchBanners,
  createBanner,
  deleteBanner,
  updateBanner,
} from "../../../redux/features/admin/actions/appActions";
import { AiOutlineDelete } from "react-icons/ai";

const BannerModal = ({ isModalOpen, closeModal, bannerData, isEditMode }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isModalOpen && isEditMode && bannerData) {
      form.setFieldsValue({
        title: bannerData.title,
        isActive: bannerData.isActive,
      });
    } else if (!isEditMode) {
      form.resetFields();
    }
  }, [isModalOpen, bannerData, form, isEditMode]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (isEditMode) {
          dispatch(updateBanner({ ...values, _id: bannerData._id }));
        } else {
          dispatch(createBanner(values));
        }
        form.resetFields();
        closeModal();
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    closeModal();
  };

  return (
    <Modal
      title={isEditMode ? "Επεξεργασία Banner" : "Δημιουργία Banner"}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="Ακύρωση"
      okText={isEditMode ? "Ενημέρωση" : "Δημιουργία"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Τίτλος Banner"
          rules={[{ required: true, message: "Παρακαλώ προσθέστε τον τίτλο!" }]}
        >
          <Input placeholder="Προσθέστε τον τίτλο του banner" />
        </Form.Item>
        <Form.Item name="isActive" label="Κατάσταση" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

function BannersTable() {
  const dispatch = useDispatch();
  const { banners, loadingBanners } = useSelector((state) => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const openCreateModal = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (banner) => {
    setSelectedBanner(banner);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (bannerId) => {
    Modal.confirm({
      icon: (
        <AiOutlineDelete style={{ color: "red" }} className="mr-2" size={25} />
      ),
      title: "Διαγραφή banner",
      content: "Είσαι σίγουρος για την διαγραφή του banner;",
      okText: "Ναι",
      okType: "danger",
      cancelText: "Όχι",
      onOk: () => {
        dispatch(deleteBanner(bannerId));
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <BannerModal
        isModalOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
          setSelectedBanner(null);
          setIsEditMode(false);
        }}
        bannerData={selectedBanner}
        isEditMode={isEditMode}
      />
      <Button className="w-fit" type="primary" onClick={openCreateModal}>
        Δημιουργία
      </Button>
      <Table
        bordered
        size="small"
        loading={loadingBanners}
        dataSource={banners.map((banner) => ({
          ...banner,
          key: banner._id,
        }))}
        columns={getColumns(handleDelete, openEditModal)}
        locale={{
          filterReset: "Καθαρισμός",
          emptyText: <p className="text-lg">Δεν υπάρχουν banners</p>,
        }}
      />
    </div>
  );
}

export default BannersTable;
