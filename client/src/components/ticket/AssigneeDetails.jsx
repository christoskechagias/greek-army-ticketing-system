import React from "react";
import moment from "moment";

const DetailRow = ({ title, children, customStyle }) => (
  <div className={`${customStyle} flex justify-between border-b pb-2 mb-4`}>
    <p className="font-medium">{title}:</p>
    {children}
  </div>
);

function AssigneeDetails({ assignee }) {
  return (
    <div className="border rounded-lg shadow-lg">
      <h1 className="text-xl border-b font-bold p-3">Ανατέθηκε</h1>
      <div className="p-3">
        {assignee ? (
          <>
            <DetailRow title="Ονοματεπώνυμο">
              <p>
                {assignee?.rank +
                  " (" +
                  assignee?.brand +
                  ") " +
                  assignee?.firstName +
                  " " +
                  assignee?.lastName}
              </p>
            </DetailRow>
            <DetailRow title="Ημερομηνία ανάθεσης">
              <div className="flex flex-col items-end">
                <p>{moment(assignee?.assignedAt).format("h:mm a")}</p>
                <p>{moment(assignee?.assignedAt).format("DD/MM/YYYY")}</p>
              </div>
            </DetailRow>
          </>
        ) : (
          <DetailRow title="Δεν έχει ανατεθεί" />
        )}
      </div>
    </div>
  );
}

export default AssigneeDetails;
