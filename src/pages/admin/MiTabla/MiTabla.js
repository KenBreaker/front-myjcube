import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useApolloClient } from "@apollo/client";
import { getOrderOfWeek, TodosLosUsuariosQuery } from "../../../api";
import "./MiTabla.css";

export function MiTabla({ selectedDate }) {
  const client = useApolloClient();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataUsers, setDataUsers] = useState();
  const [groupedData, setGroupedData] = useState([]);

  let Test = [
    {
      Lunes: "0",
      Martes: "0",
      Miercoles: "0",
      Jueves: "0",
      Viernes: "0",
      Sabado: "0",
      Domingo: "0",
    },
  ];

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
            setDataUsers(response);

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
            setData(response);

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

  const columns = [
    { field: "Lunes", header: "Lunes" },
    { field: "Martes", header: "Martes" },
    { field: "Miercoles", header: "Miercoles" },
    { field: "Jueves", header: "Jueves" },
    { field: "Viernes", header: "Viernes" },
    { field: "Sabado", header: "Sabado" },
    { field: "Domingo", header: "Domingo" },
  ];

  const countOccurrences = (arr, dateVal, userVal) => {
    return arr.reduce((count, item) => {
      return item.node.startDate === dateVal &&
        item.node.userByIdUser.name === userVal
        ? count + 1
        : count;
    }, 0);
  };

  useEffect(() => {
    if (selectedDate && data && dataUsers) {
      let weekDay = [];
      let userCount = [];
      dataUsers.data.allUsers.nodes.forEach((user) => {
        userCount = [];
        for (let i = 0; i < 7; i++) {
          selectedDate.weekStartDate.setDate(
            selectedDate.weekStartDate.getDate() + 1
          );
          const formattedDate = selectedDate.weekStartDate
            .toISOString()
            .split("T")[0];
          userCount.push(
            countOccurrences(
              data.data.allOrders.edges,
              formattedDate,
              user.name
            )
          );
        }
        console.log(user.name);
        console.log(userCount);
        weekDay.push({
          Lunes: user.name + " : " + userCount[0],
          Martes: user.name + " : " + userCount[1],
          Miercoles: user.name + " : " + userCount[2],
          Jueves: user.name + " : " + userCount[3],
          Viernes: user.name + " : " + userCount[4],
          Sabado: user.name + " : " + userCount[5],
          Domingo: user.name + " : " + userCount[6],
        });
      });
      setGroupedData(weekDay);

      console.log(weekDay);
    }
  }, [data, dataUsers, selectedDate]);

  return (
    <div className="card">
      <DataTable
        value={groupedData}
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
      >
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
      </DataTable>
    </div>
  );
}
