import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useQuery, gql } from "@apollo/client";
import { queryOrderDaily } from "../../../api";
import { Column } from "primereact/column";
import "./OrdenesDiarias.css";
import "primeicons/primeicons.css";

export function OrdenesDiarias() {
  const { loading, error, data } = useQuery(queryOrderDaily);
  const [visible, setVisible] = useState(true);

  if (loading) return <p>Loading...</p>;

  const header = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Ordenes Diarias</span>
    </div>
  );

  return (
    <Dialog onHide={() => setVisible(false)} visible={visible}>
      <div className="card">
        <DataTable
          value={data.allOrders.nodes}
          header={header}
          showGridlines
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="showmore"
            header="ver mas"
            body={(rowData) => (
              <span>
                <i
                  className="pi pi-file"
                  style={{ fontSize: "1.2rem", color: "blue" }}
                ></i>{" "}
                {rowData.showmore}
              </span>
            )}
          ></Column>
          <Column field="id" header="ID orden"></Column>
          <Column field="phone" header="Telefono"></Column>
          <Column
            field="connectionByIdConnection.address"
            header="Localizacion"
          ></Column>
          <Column
            field="orderTypeByIdOrderType.name"
            header="Tipo de orden"
          ></Column>
          <Column
            field="ticketStatusByIdTicketStatus.name"
            header="Estado de ticket"
          ></Column>
          <Column field="createdDate" header="Fecha"></Column>
        </DataTable>
      </div>
    </Dialog>
  );
}
