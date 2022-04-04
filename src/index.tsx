import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import App from "./App";
import SummaryView from "./views/summary-view";
import GameView from "./views/game-view";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<GameView />} />
        <Route path="/summary" element={<SummaryView />} />
      </Routes>
    </ChakraProvider>
  </BrowserRouter>
);
