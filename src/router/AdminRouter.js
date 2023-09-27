import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Calendar } from "../layouts";
import { Auth, Calendario, MiTabla } from "../pages/admin";

export function AdminRouter() {
  const [selectedDate, setSelectedDate] = useState(null);

  const actualizarEstado = (nuevoValor) => {
    setSelectedDate(nuevoValor);
  };
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/admin/*" element={loadLayout(Calendar, Auth)} />

      <Route
        path="/admin/calendario"
        element={loadLayout(Calendar, () => (
          <>
            <Calendario actualizarEstado={actualizarEstado} />
            <MiTabla selectedDate={selectedDate} />
          </>
        ))}
      />
    </Routes>
  );
}
