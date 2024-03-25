import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import {
  ComedianResponse,
  ComedianService,
  ComediansGetFiltersParameter,
  Pageable,
} from "../services/openapi";
import useApi from "../services/useApi";

const ComediansPage = () => {
  const [comedians, setComedians] = useState<ComedianResponse[]>([]);
  const { isLoading, error, handleRequest } = useApi();
  const [pageable, setPageable] = useState<Pageable>({});
  const [filters, setFilters] = useState<ComediansGetFiltersParameter>({});
  useEffect(() => {
    const fetchComedians = async () => {
      try {
        const comediansResponse = await handleRequest(
          ComedianService.comediansGet(pageable, filters)
        );
        setComedians(comediansResponse?.content || []);
      } catch (error) {
        // TODO handle this errors in a generic way
        console.error(error);
      }
    };
    fetchComedians();
  }, [handleRequest]);

  const handleDelete = async (id: string) => {
    await handleRequest(
      ComedianService.comediansComedianIdDelete(id as unknown as number)
    );
    const comediansResponse = await handleRequest(
      ComedianService.comediansGet(pageable, filters)
    );
    setComedians(comediansResponse?.content || []);
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
            <RouteLink to={`/comedians/create`}>
              <Button colorScheme="green" size="sm" mt="3" mr="3">
                Criar comediante
              </Button>{" "}
            </RouteLink>
          </Box>
          <Box
            pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
            pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
            maxW="1000px"
            mx="auto"
          >
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>Nome</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {comedians.map((comedian) => (
                    <Tr key={comedian.id}>
                      <Td>{comedian.name}</Td>
                      <Td textAlign="end">
                        <RouteLink to={`/comedians/${comedian.id}`}>
                          <Button colorScheme="green" size="xs">
                            Editar
                          </Button>
                        </RouteLink>
                        <Button
                          colorScheme="green"
                          size="xs"
                          ml="3"
                          onClick={() => handleDelete(comedian.id)}
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

export default ComediansPage;
