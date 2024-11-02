import React, { useState } from "react";
import { Button, Modal, Select } from "antd";
import { PiCheckCircleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAssignmentInd, MdOutlinePrint } from "react-icons/md";
import {
  updateTicketAssignee,
  updateTicketStatus,
} from "../../redux/features/admin/actions/ticketActions.js";
import printTicketDetails from "./PrintTicketDetails.js";
import { isTicketStatus } from "../ticketStatus.js";

function TicketAdminActions({ ticket }) {
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTicketStatus = () => {
    Modal.confirm({
      title: "Είσαι σίγουρος ότι θέλεις να κλείσεις το ticket?",
      content: "Αυτή η ενέργεια δεν είναι αντιστρέψιμη",
      okText: "Ναι",
      okType: "danger",
      cancelText: "Όχι",
      onOk: () => {
        dispatch(updateTicketStatus(ticket._id));
      },
    });
  };

  return (
    <div>
      <AssignTicketModal
        ticket={ticket}
        members={members}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="flex gap-2">
        {(isTicketStatus(ticket.status, "open") ||
          isTicketStatus(ticket.status, "inProgress")) && (
          <Button
            icon={<MdOutlineAssignmentInd size={25} />}
            onClick={() => setIsModalOpen(true)}
            className="self-end"
          >
            Ανάθεση
          </Button>
        )}

        {isTicketStatus(ticket.status, "inProgress") && (
          <Button
            icon={<PiCheckCircleBold size={25} />}
            onClick={() => handleTicketStatus()}
          >
            Ολοκλήρωση
          </Button>
        )}
        <Button onClick={() => printTicketDetails(ticket)}>
          <MdOutlinePrint size={25} />
        </Button>
      </div>
    </div>
  );
}

const AssignTicketModal = ({ ticket, members, open, onClose }) => {
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const dispatch = useDispatch();

  const handleOk = () => {
    if (selectedAssignee) {
      dispatch(
        updateTicketAssignee({
          ticketId: ticket._id,
          assigneeId: selectedAssignee,
        })
      );
      onClose();
    } else {
      Modal.error({
        title: "Επιλογή Ανάθεσης",
        content: "Παρακαλώ επιλέξτε έναν αναθέτη.",
      });
    }
  };

  const handleCancel = () => {
    setSelectedAssignee(null);
    onClose();
  };
  return (
    <Modal
      width={700}
      title={
        <div className="flex gap-2 items-center">
          <p>Ανάθεση του ticket στον</p>
          <Select
            value={selectedAssignee}
            placeholder="Επιλέξτε"
            className="w-[250px]"
            onChange={(value) => setSelectedAssignee(value)}
            options={members.map((member) => ({
              value: member._id,
              label: (
                <p key={member._id}>
                  {member.firstName} {member.lastName}
                </p>
              ),
            }))}
          />
        </div>
      }
      okText="Ανάθεση"
      cancelText="Ακύρωση"
      centered
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      okButtonProps={{
        disabled: !selectedAssignee,
      }}
    />
  );
};

export default TicketAdminActions;
