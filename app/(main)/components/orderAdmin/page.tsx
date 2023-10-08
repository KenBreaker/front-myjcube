// @ts-nocheck
'use client';
import React, { useState } from "react";
import { Calendario} from "./calendario/page";
import { WeekTable } from "./weekTable/page";

export function AdminRouter() {
  const [selectedDate, setSelectedDate] = useState(null);

  const actualizarEstado = (nuevoValor:any) => {
    setSelectedDate(nuevoValor);
  };
  return (
    <div className="grid p-fluid">
      <div className="col-12 md:col-6">
          <div className="card">
              <div className="grid formgrid">
                  <h5>Calendario</h5>
                  <Calendario actualizarEstado={actualizarEstado} />
              </div>
          </div>
      </div>
      <div className="col-12 md:col-6">
          <div className="card">
              <div className="grid formgrid">
                  <h5>Calendario</h5>
                  <Calendario actualizarEstado={actualizarEstado} />
              </div>
          </div>
      </div>
      <div className="col-12">
          <div className="card">
              <div className="grid formgrid">
                  <h5>Tabla semanal</h5>
                  <WeekTable selectedDate={selectedDate}/>
              </div>
          </div>
      </div>
    </div>
      
  );
}

export default AdminRouter;

