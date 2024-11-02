import React from "react";

const DetailRow = ({ title, children, customStyle }) => (
  <div className={`${customStyle} flex justify-between border-b pb-2 mb-4`}>
    <p className="font-medium">{title}:</p>
    {children}
  </div>
);

function AuthorDetails({ author }) {
  return (
    <div className="border rounded-lg shadow-lg">
      <h1 className="text-xl border-b font-bold p-3">Δημιουργός</h1>

      <div className="p-3">
        <DetailRow title="Ονοματεπώνυμο">
          <p>
            {author?.rank +
              " (" +
              author?.brand +
              ") " +
              author?.firstName +
              " " +
              author?.lastName}
          </p>
        </DetailRow>

        <DetailRow title="Γραφείο">
          <p className="capitalize">{author?.office}</p>
        </DetailRow>

        <DetailRow title="Τηλέφωνο">
          <p>{author?.phone}</p>{" "}
        </DetailRow>
      </div>
    </div>
  );
}

export default AuthorDetails;
