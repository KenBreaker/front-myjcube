'use client';
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useApolloClient } from "@apollo/client";
import { getOrderOfWeek, TodosLosUsuariosQuery } from "../../../utilities/graphql/queries";
import "./WeekTable.css";

export function WeekTable({ selectedDate }) {
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
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDate && dataUsers) {
      if (
        selectedDate.hasOwnProperty("weekStartDate") &&
        selectedDate.hasOwnProperty("weekEndDate")
      ) {
        setLoading(true);
        let weekDay = [];
        let userCount = [];
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
                      response.data.allOrders.edges,
                      formattedDate,
                      user.name
                    )
                  );
                }

                // console.log(user.name);
                // console.log(userCount);
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
              setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setError(error);
            setLoading(false);
          });
      }
    }
  }, [dataUsers]);

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

export default WeekTable;