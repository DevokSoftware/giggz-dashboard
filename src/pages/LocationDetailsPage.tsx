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
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type FormFieldProps = {
  field: FieldInputProps<any>;
  form: FormikProps<Location>;
};

const LocationDetailsPage = () => {
  const { isLoading, error, handleRequest } = useApi();
  const { locationId } = useParams();
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    if (locationId) {
      const fetchLocation = async () => {
        try {
          const locationResponse = await handleRequest(
            LocationService.locationsLocationIdGet(parseInt(locationId, 10))
          );
          setLocation(locationResponse);
        } catch (error) {
          // TODO handle this errors in a generic way
          console.error(error);
        }
      };
      fetchLocation();
    }
  }, [handleRequest]);

  const handleSubmit = async (values: LocationInput) => {
    await handleRequest(
      LocationService.locationsLocationIdPut(
        locationId as unknown as number,
        values
      )
    );
    if (locationId) {
      const locationResponse = await handleRequest(
        LocationService.locationsLocationIdGet(parseInt(locationId, 10))
      );
      setLocation(locationResponse);
    }
  };

  if (!location) {
    return <></>;
  }

  return (
    <Box
      pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
      pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
      maxW="1000px"
      mx="auto"
      mt={4}
    >
      <Stack spacing={3}>
        <Formik initialValues={location} onSubmit={handleSubmit}>
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
                Editar
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
};

export default LocationDetailsPage;
