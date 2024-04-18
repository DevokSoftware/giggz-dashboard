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
  EventResponse,
  EventService,
  EventsGetFiltersParameter,
  Pageable,
} from "../services/openapi";
import useApi from "../services/useApi";
import moment from "moment";

const EventsPage = () => {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const { isLoading, error, handleRequest } = useApi();
  const [pageable, setPageable] = useState<Pageable>({});
  const [filters, setFilters] = useState<EventsGetFiltersParameter>({});
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResponse = await handleRequest(
          EventService.eventsGet(pageable, filters)
        );
        setEvents(eventsResponse?.content || []);
      } catch (error) {
        // TODO handle this errors in a generic way
        console.error(error);
      }
    };
    fetchEvents();
  }, [handleRequest]);

  const handleDelete = async (id: string) => {
    await handleRequest(
      EventService.eventsEventIdDelete(id as unknown as number)
    );
    const eventsResponse = await handleRequest(
      EventService.eventsGet(pageable, filters)
    );
    setEvents(eventsResponse?.content || []);
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
            <RouteLink to={`/shows/create`}>
              <Button colorScheme="green" size="sm" mt="3" mr="3">
                Criar evento
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
                    <Th>Localização</Th>
                    <Th>Data</Th>
                    <Th>Comediantes</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {events.map((event) => (
                    <Tr key={event.id}>
                      <Td>{event.name}</Td>
                      <Td>
                        {event.location?.name}, {event.location?.city}
                      </Td>

                      <Td>
                        {moment(event.date)
                          .locale("pt-br")
                          .format("DD [de] MMMM, y")}
                      </Td>
                      <Td>
                        {event.comedians?.map((comedian) => (
                          <Text>{comedian.name}</Text>
                        ))}
                      </Td>
                      <Td textAlign="end">
                        <RouteLink to={`/shows/${event.id}`}>
                          <Button colorScheme="green" size="xs">
                            Editar
                          </Button>
                        </RouteLink>
                        <Button
                          colorScheme="green"
                          size="xs"
                          ml="3"
                          onClick={() => handleDelete(event.id)}
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

export default EventsPage;
