import React from 'react';
import { Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import Header from "./components/Header";
import PilotIndex from "./containers/pilot/Index";

function App() {
    return (
        <StyledEngineProvider>
                    <Header />
                        <Routes>

                            <Route path="/" element={<PilotIndex />} />
                        </Routes>

        </StyledEngineProvider>
    );
}

export default App;

