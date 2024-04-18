import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Spinner,
  Box,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import {
  Location,
  LocationService,
  LocationsGetFiltersParameter,
  Pageable,
} from "../services/openapi";
import useApi from "../services/useApi";
import moment from "moment";

const LocationsPage = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const { isLoading, error, handleRequest } = useApi();
  const [filters, setFilters] = useState<LocationsGetFiltersParameter>({});
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsResponse = await handleRequest(
          LocationService.locationsGet(filters)
        );
        setLocations(locationsResponse || []);
      } catch (error) {
        // TODO handle this errors in a generic way
        console.error(error);
      }
    };
    fetchLocations();
  }, [handleRequest]);

  const handleDelete = async (id: string) => {
    await handleRequest(
      LocationService.locationsLocationIdDelete(id as unknown as number)
    );
    const locationsResponse = await handleRequest(
      LocationService.locationsGet(filters)
    );
    setLocations(locationsResponse || []);
  };

  return (
    <>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="green.600"
          size="xl"
        />
      ) : (
        <>
          <Box textAlign="end">
            <RouteLink to={`/locations/create`}>
              <Button colorScheme="green" size="sm" mt="3" mr="3">
                Criar Localização
              </Button>
            </RouteLink>
          </Box>
          <Box
            pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
            pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
            maxW="1300px"
            mx="auto"
          >
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th>Cidade</Th>
                    <Th>Rua</Th>
                    <Th>Número</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {locations.map((location) => (
                    <Tr key={location.id}>
                      <Td>{location.name}</Td>
                      <Td>{location.city}</Td>
                      <Td>{location.street}</Td>
                      <Td>{location.number}</Td>

                      <Td textAlign="end">
                        <RouteLink to={`/locations/${location.id}`}>
                          <Button colorScheme="green" size="xs">
                            Editar
                          </Button>
                        </RouteLink>
                        <Button
                          colorScheme="green"
                          size="xs"
                          ml="3"
                          onClick={() => handleDelete(location.id)}
                        >
                          Eliminar
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </>
      )}
    </>
  );
};

export default LocationsPage;
