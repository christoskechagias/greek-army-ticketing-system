import React from "react";
import { Button, Modal } from "antd";
import { PiCheckCircleBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { MdOutlineAssignmentInd, MdOutlinePrint } from "react-icons/md";
import {
  updateTicketAssignee,
  updateTicketStatus,
} from "../../redux/features/member/actions/ticketActions.js";
import printTicketDetails from "./PrintTicketDetails.js";
import { isTicketStatus } from "../ticketStatus.js";

function TicketMemberActions({ ticket }) {
  const dispatch = useDispatch();
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

  const handleTicketAssignee = () => {
    dispatch(updateTicketAssignee({ ticketId: ticket._id }));
  };

  return (
    <div>
      <div className="flex gap-2">
        {isTicketStatus(ticket.status, "open") && (
          <Button
            icon={<MdOutlineAssignmentInd size={25} />}
            onClick={() => handleTicketAssignee()}
            className="self-end"
          >
            Να ανατεθεί σε εμένα
          </Button>
        )}

        {isTicketStatus(ticket.status, "inProgress") && ticket.isAssignee && (
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

export default TicketMemberActions;
