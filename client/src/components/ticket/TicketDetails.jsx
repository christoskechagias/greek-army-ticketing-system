import React from "react";
import { Image } from "antd";
import moment from "moment";
import { getStatusByKey } from "../ticketStatus";

const DetailRow = ({ title, children, customStyle }) => (
  <div className={`${customStyle} flex justify-between border-b pb-2 mb-4`}>
    <p className="font-medium">{title}:</p>
    {children}
  </div>
);

function TicketDetails({ ticket }) {
  return (
    <div className="border rounded-lg shadow-lg">
      <h1 className="text-xl border-b font-bold p-3">Στοιχεία</h1>

      <div className="p-3">
        <DetailRow title="Θέμα">
          <p>{ticket.subject}</p>
        </DetailRow>

        <DetailRow title="Κατηγορία">
          <p>{ticket.category}</p>
        </DetailRow>

        <DetailRow title="Ημερομηνία δημιουργίας">
          <div className="flex flex-col items-end">
            <p>{moment(ticket.createdAt).format("h:mm a")}</p>
            <p>{moment(ticket.createdAt).format("DD/MM/YYYY")}</p>
          </div>
        </DetailRow>

        <DetailRow title="Κατάσταση">
          <div className="flex items-center gap-2 ">
            <p>{getStatusByKey(ticket.status)?.icon}</p>
            <p>{getStatusByKey(ticket.status)?.title}</p>
          </div>
        </DetailRow>

        {ticket.completedAt && (
          <DetailRow title="Ημερομηνία ολοκλήρωσης">
            <div className="flex flex-col items-end">
              <p>{moment(ticket?.completedAt).format("h:mm a")}</p>
              <p>{moment(ticket?.completedAt).format("DD/MM/YYYY")}</p>
            </div>
          </DetailRow>
        )}

        <DetailRow title="Περιγραφή" customStyle={"flex-col"}>
          <p className="overflow-y-auto break-words break-all whitespace-normal overflow-hidden max-h-[400px]">
            {ticket.description}
          </p>
        </DetailRow>

        {ticket.images && ticket.images.length > 0 && (
          <DetailRow title="Εικόνες">
            <div className="flex gap-4 max-h-[300px] overflow-y-auto">
              <Image.PreviewGroup>
                {ticket.images.map((image, index) => (
                  <Image
                    key={index}
                    width={100}
                    height={100}
                    src={image}
                    alt="Ticket"
                    className="rounded-lg border border-gray-200"
                  />
                ))}
              </Image.PreviewGroup>
            </div>
          </DetailRow>
        )}
      </div>
    </div>
  );
}

export default TicketDetails;
