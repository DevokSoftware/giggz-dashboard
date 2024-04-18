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
import EventsPage from "./pages/EventsPage";
import EventCreatePage from "./pages/EventCreatePage";
import EventDetailsPage from "./pages/EventDetailsPage";
import LocationsPage from "./pages/LocationsPage";
import LocationCreatePage from "./pages/LocationCreatePage";
import LocationDetailsPage from "./pages/LocationDetailsPage";

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
            <Route path="/shows" element={<Outlet />}>
              <Route path="" element={<EventsPage />} />
              <Route path="/shows/create" element={<EventCreatePage />} />
              <Route path="/shows/:eventId" element={<EventDetailsPage />} />
            </Route>
            <Route path="/locations" element={<Outlet />}>
              <Route path="" element={<LocationsPage />} />
              <Route
                path="/locations/create"
                element={<LocationCreatePage />}
              />
              <Route
                path="/locations/:locationId"
                element={<LocationDetailsPage />}
              />
            </Route>
          </Routes>
        </Box>
      </Box>
    </Router>
  </ChakraProvider>
);
