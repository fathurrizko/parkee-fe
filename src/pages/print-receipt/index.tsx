import React from "react";

interface TicketProps {
  clockIn: string;        // example: "2025-11-21T09:15:00"
  vehicleType: string;    // example: "Motor"
  vehicleNo: string;      // example: "B 1234 CD"
}

export default function ParkingTicket({ clockIn, vehicleType, vehicleNo }: TicketProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Parking Ticket</h3>

      <div style={styles.row}>
        <span>Clock In:</span>
        <span>{clockIn}</span>
      </div>

      <div style={styles.row}>
        <span>Vehicle Type:</span>
        <span>{vehicleType}</span>
      </div>

      <div style={styles.row}>
        <span>Vehicle No:</span>
        <span>{vehicleNo}</span>
      </div>

      <button style={styles.button} onClick={handlePrint}>
        Print Ticket
      </button>
    </div>
  );
}

const styles: any = {
  container: {
    width: "220px",
    padding: "12px",
    border: "1px solid black",
    margin: "20px",
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "12px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  button: {
    width: "100%",
    marginTop: "12px",
    padding: "6px",
    cursor: "pointer",
  },
};
