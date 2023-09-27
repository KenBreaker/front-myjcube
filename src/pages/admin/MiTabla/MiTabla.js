import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useApolloClient } from "@apollo/client";
import { getOrderOfWeek, TodosLosUsuariosQuery } from "../../../api";
import "./MiTabla.css";

export function MiTabla({ selectedDate }) {
  const client = useApolloClient();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      if (
        selectedDate.hasOwnProperty("weekStartDate") &&
        selectedDate.hasOwnProperty("weekEndDate")
      ) {
        setLoading(true);

        const fetchData = async () => {
          try {
            const response = await client.query({
              query: TodosLosUsuariosQuery,
              variables: {
                id: 1,
                name: "prueba",
              },
            });

            const { data } = response;
            console.log(JSON.stringify(data, null, 2));

            setLoading(false);
          } catch (error) {
            console.error(error);
          }
        };

        fetchData();
      }
    }
  }, [selectedDate, client]);

  useEffect(() => {
    if (selectedDate) {
      if (
        selectedDate.hasOwnProperty("weekStartDate") &&
        selectedDate.hasOwnProperty("weekEndDate")
      ) {
        setLoading(true);

        client
          .query({
            query: getOrderOfWeek,
            variables: {
              greaterThanOrEqualTo: new Date(
                selectedDate.weekStartDate
              ).toISOString(),
              lessThanOrEqualTo: new Date(
                selectedDate.weekEndDate
              ).toISOString(),
            },
          })
          .then((response) => {
            const { data } = response;
            const orders = data.allOrders.edges.map((edge) => edge.node);
            setData(orders);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setError(error);
            setLoading(false);
          });
      }
    }
  }, [selectedDate, client]);

  const daysOfWeek = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const columns = [
    { field: "date", header: "Fecha" },
    ...daysOfWeek.map((day) => ({
      field: day.toLowerCase(),
      header: day,
    })),
  ];

  let groupedData = {};

  const countOccurrences = (arr, dateVal, userVal) => {
    return arr.reduce(
      (count, item) =>
        new Date(item.startDate).toISOString().split("T")[0] === dateVal &&
        item.userByIdUser.name === userVal
          ? count + 1
          : count,
      0
    );
  };

  useEffect(() => {
    if (selectedDate && data.length > 0) {
      let weekDay = [];
      let userCount = {};

      for (let i = 0; i < 7; i++) {
        selectedDate.weekStartDate.setDate(
          selectedDate.weekStartDate.getDate() + 1
        );
        const formattedDate = selectedDate.weekStartDate
          .toISOString()
          .split("T")[0];

        data.forEach((item) => {
          const userName = item.userByIdUser.name;

          userCount[userName] = countOccurrences(data, formattedDate, userName);
          weekDay.push({
            i: userCount[userName],
          });
        });

        console.log(userCount);
      }
    }
  }, [data]);

  return (
    <div className="card">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <DataTable
          value={Object.values(groupedData)}
          showGridlines
          tableStyle={{ minWidth: "50rem" }}
        >
          {columns.map((column) => (
            <Column
              key={column.field}
              field={column.field}
              header={column.header}
              body={(rowData) => {
                if (column.field === "date") {
                  return <span>{rowData.date}</span>;
                } else {
                  const dayData = rowData[column.field];
                  if (dayData && dayData.length > 0) {
                    return (
                      <ul>
                        {dayData.map((entry) => (
                          <li key={entry.id}>
                            ID: {entry.id}, Usuario: {entry.userName}
                          </li>
                        ))}
                      </ul>
                    );
                  } else {
                    return <span>Sin solicitudes</span>;
                  }
                }
              }}
            />
          ))}
        </DataTable>
      )}
    </div>
  );
}
