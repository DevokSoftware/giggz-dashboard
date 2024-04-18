import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldInputProps,
  FormikProps,
} from "formik";

import { Location, LocationInput, LocationService } from "../services/openapi";
import useApi from "../services/useApi";

type FormFieldProps = {
  field: FieldInputProps<any>;
  form: FormikProps<Location>;
};

const LocationCreatePage = () => {
  const { isLoading, error, handleRequest } = useApi();

  const initialValues: LocationInput = {
    name: "",
    city: "",
  };

  const handleSubmit = async (values: LocationInput) => {
    await handleRequest(LocationService.locationsPost(values));
  };

  return (
    <Box
      pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
      pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
      maxW="1000px"
      mx="auto"
      mt={4}
    >
      <Stack spacing={3}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <Field name="name">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Nome</FormLabel>
                    <Input {...field} size="sm" />
                    <ErrorMessage name="name" component="div" />
                  </FormControl>
                )}
              </Field>
              <Field name="city">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Cidade</FormLabel>
                    <Input {...field} size="sm" />
                    <ErrorMessage name="city" component="div" />
                  </FormControl>
                )}
              </Field>
              <Field name="street">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Rua</FormLabel>
                    <Input {...field} size="sm" />
                    <ErrorMessage name="street" component="div" />
                  </FormControl>
                )}
              </Field>
              <Field name="number">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Número</FormLabel>
                    <Input {...field} size="sm" />
                    <ErrorMessage name="number" component="div" />
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme="green" type="submit">
                Criar
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
};

export default LocationCreatePage;
