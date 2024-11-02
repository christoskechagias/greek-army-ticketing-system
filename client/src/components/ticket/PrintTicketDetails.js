import moment from "moment";

const printTicketDetails = (ticket) => {
  const printContent = `
    <html>
      <head>
        <style>
          body {
            position: relative;
            margin: 0;
            padding: 0;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 100px;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
          }
          .section-header {
            padding: 10px;
            text-align: center;
          }
          .description-cell {
            word-break: break-word;  
          }
          .signature-section{
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .signature-box {
            border: 1px solid black;
            height: 150px;
            width: 200px;
            text-align: center;
            box-sizing: border-box;
          }
          .signature-box .title {
            font-weight: bold;
            text-decoration: underline;
          }
          .ticket-id {
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
                margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="ticket-id">Ticket ID: ${ticket?.ticketId || "N/A"}</div>
        <table>
          <tr>
            <td colspan="2" class="section-header">Στοιχεία</td>
          </tr>
          <tr>
            <th>Θέμα:</th>
            <td>${ticket?.subject || "N/A"}</td>
          </tr>
          <tr>
            <th>Κατηγορία:</th>
            <td>${ticket?.category || "N/A"}</td>
          </tr>
          <tr>
            <th>Ημερομηνία δημιουργίας:</th>
            <td>
              ${moment(ticket?.createdAt).format("h:mm a")}<br/>
              ${moment(ticket?.createdAt).format("DD/MM/YYYY")}
            </td>
          </tr>
          ${
            ticket?.completedAt
              ? `
            <tr>
              <th>Ημερομηνία ολοκλήρωσης:</th>
              <td>
                ${moment(ticket?.completedAt).format("h:mm a")}<br/>
                ${moment(ticket?.completedAt).format("DD/MM/YYYY")}
              </td>
            </tr>
            `
              : ""
          }
          <tr>
            <th>Περιγραφή:</th>
            <td class="description-cell">${ticket?.description || "N/A"}</td>
          </tr>

          <tr>
            <td colspan="2" class="section-header">Δημιουργός</td>
          </tr>
          <tr>
            <th>Ονοματεπώνυμο:</th>
            <td>
              ${ticket?.author?.rank || ""} (${ticket?.author?.brand || ""}) 
              ${ticket?.author?.firstName || ""} ${
    ticket?.author?.lastName || ""
  }
            </td>
          </tr>
          <tr>
            <th>Γραφείο:</th>
            <td>${ticket?.author?.office || "N/A"}</td>
          </tr>
          <tr>
            <th>Τηλέφωνο:</th>
            <td>${ticket?.author?.phone || "N/A"}</td>
          </tr>
        </table>
        
        <div class="signature-section">
            <div class="signature-box">
              <p class="title">ΓΕΠ</p>
            </div>
            <div class="signature-box">
              <p class="title">Δημιουργός</p>
            </div>
        </div>

      </body>
    </html>
  `;

  const iframe = document.createElement("iframe");
  iframe.style.position = "absolute";
  iframe.style.width = "0px";
  iframe.style.height = "0px";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(printContent);
  doc.close();

  iframe.contentWindow.focus();
  iframe.contentWindow.print();

  document.body.removeChild(iframe);
};

export default printTicketDetails;
