import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WeatherProvider from "./store/WeatherProvider"

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <WeatherProvider>
       <App />
    </WeatherProvider>
  </StrictMode>
);
