import { Box, Button, Link } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
const HomePage = () => {
  return (
    <Box textAlign="center" fontSize="xl">
      <Link as={RouteLink} to="/comedians">
        <Button>Comediantes</Button>
      </Link>
    </Box>
  );
};

export default HomePage;
