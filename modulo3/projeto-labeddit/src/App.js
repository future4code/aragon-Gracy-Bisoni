import React from "react";
import { GlobalState } from "./global/GlobalState";
import { Router } from "./routes/Router";
import '@fontsource/roboto/500.css'

const App = () => {
  return (
    <>
      <GlobalState>
        <Router/>
      </GlobalState>
    </>
  )
}

export default App;

