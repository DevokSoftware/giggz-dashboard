import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouteLink,
  Navigate,
  Outlet,
} from "react-router-dom";
import ComediansPage from "./pages/ComediansPage";
import HomePage from "./pages/Homepage";
import ComedianDetailsPage from "./pages/ComedianDetailsPage";
import Login from "./pages/Login";
import ComedianCreatePage from "./pages/ComedianCreatePage";
import Navbar from "./components/Navbar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Box textAlign="center" fontSize="xl">
        <Navbar />
        <Box pt={20}>
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/comedians" element={<Outlet />}>
              <Route path="" element={<ComediansPage />} />
              <Route
                path="/comedians/create"
                element={<ComedianCreatePage />}
              />
              <Route
                path="/comedians/:comedianId"
                element={<ComedianDetailsPage />}
              />
            </Route>
          </Routes>
        </Box>
      </Box>
    </Router>
  </ChakraProvider>
);
