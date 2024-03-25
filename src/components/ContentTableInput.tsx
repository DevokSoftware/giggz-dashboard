import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useFormikContext, getIn, Field, ErrorMessage } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ContentInput } from "../services/openapi";

interface ContentTableInputProps {
  name: string;
  handleAdd: (item: ContentInput) => void;
  handleRemove: (index: number) => void;
}

const ContentTableInput = ({
  name,
  handleAdd,
  handleRemove,
}: ContentTableInputProps) => {
  const { values } = useFormikContext();

  // from all the form values we only need the "friends" part.
  // we use getIn and not values[name] for the case when name is a path like `social.facebook`
  const formikSlice = getIn(values, name) || [];
  const [tableRows, setTableRows] = useState(formikSlice);

  // we need this so the table updates after the timeout expires
  useEffect(() => {
    setTableRows(formikSlice);
  }, [formikSlice]);

  const onAdd = useCallback(() => {
    const newState = [...tableRows];
    const item: ContentInput = {
      name: "",
    };

    newState.push(item);
    setTableRows(newState);
    handleAdd(item);
  }, [handleAdd, tableRows]);

  const onRemove = useCallback(
    (index: number) => {
      const newState = [...tableRows];

      newState.splice(index, 1);
      setTableRows(newState);
      handleRemove(index);
    },
    [handleRemove, tableRows]
  );

  return (
    <div className="field">
      <Box textAlign="end">
        <Button colorScheme="green" size="xs" onClick={onAdd}>
          Adicionar Conteúdo
        </Button>
      </Box>
      <Box mt={2}>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Tipo</Th>
                <Th>URL</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {formikSlice?.map((content: ContentInput, index: number) => (
                <Tr key={index}>
                  <Td>
                    <Field name={`${name}[${index}].name`}>
                      {({ field, form }: any) => (
                        <FormControl>
                          <Input {...field} size="sm" />
                          <ErrorMessage
                            name={`${name}[${index}].name`}
                            component="div"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Td>
                  <Td>
                    <Field name={`${name}[${index}].contentType`}>
                      {({ field, form }: any) => (
                        <FormControl>
                          <Input {...field} size="sm" />
                          <ErrorMessage
                            name={`${name}[${index}].contentType`}
                            component="div"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Td>
                  <Td>
                    <Field name={`${name}[${index}].url`}>
                      {({ field, form }: any) => (
                        <FormControl>
                          <Input {...field} size="sm" />
                          <ErrorMessage
                            name={`${name}[${index}].url`}
                            component="div"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="xs"
                      // onClick={() => handleRemoveContent(index)}
                    >
                      Remover
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default React.memo(ContentTableInput);
