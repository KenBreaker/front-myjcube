// @ts-nocheck
'use client';
import React, { useState, useEffect } from "react";
import { addLocale } from "primereact/api";
import { Calendar } from "primereact/calendar";
import "./Calendario.css";

export function Calendario({ actualizarEstado }) {
  const [selectedDate, setSelectedDate] = useState(null);

  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  useEffect(() => {
    if (selectedDate) {
      const startDate = new Date(selectedDate);
      startDate.setDate(startDate.getDate() - startDate.getDay());
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);
  
      if (selectedDate !== startDate) {
        actualizarEstado({
          selectedDate: selectedDate,
          weekStartDate: startDate,
          weekEndDate: endDate,
        });
      }
    }
  }, [selectedDate]);
  
  const handleDateChange = (e) => {
    setSelectedDate(e.value);
  };

  return (
    <div className="calendario flex justify-content-center">
      <Calendar
        value={selectedDate}
        onChange={(e) => handleDateChange(e)}
        locale="es"
        showIcon
        showButtonBar
      />
    </div>
  );
}

export default Calendario;