import React from "react";
import { BrowserRouter } from "react-router-dom";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import { WebRouter, AdminRouter } from "./router";

export default function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <WebRouter />
        <AdminRouter />
      </BrowserRouter>
    </PrimeReactProvider>
  );
}
