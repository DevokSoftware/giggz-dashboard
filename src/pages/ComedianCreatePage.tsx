import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FieldInputProps,
  FormikProps,
} from "formik";
import { useEffect, useState } from "react";
import { Link as RouteLink, useParams } from "react-router-dom";
import { ComedianService, CreateComedianRequest } from "../services/openapi";
import useApi from "../services/useApi";
const ComedianCreatePage = () => {
  const { isLoading, error, handleRequest } = useApi();

  type FormFieldProps = {
    field: FieldInputProps<any>;
    form: FormikProps<CreateComedianRequest>;
  };

  const initialValues: CreateComedianRequest = {
    name: "",
  };

  const handleSubmit = async (values: CreateComedianRequest) => {
    await handleRequest(ComedianService.comediansPost(values));
  };
  // if (isLoading) {
  //   return (
  //     <Spinner
  //       thickness="4px"
  //       speed="0.65s"
  //       emptyColor="gray.200"
  //       color="green.600"
  //       size="xl"
  //     />
  //   );
  // }

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
              <Field name="instagram">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Instagram</FormLabel>
                    <Input {...field} size="sm" />
                    <ErrorMessage name="instagram" component="div" />
                  </FormControl>
                )}
              </Field>
              <Field name="twitter">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Twitter</FormLabel>
                    <Input {...field} size="sm" />
                    <ErrorMessage name="twitter" component="div" />
                  </FormControl>
                )}
              </Field>
              <Field name="tiktok">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Tiktok</FormLabel>
                    <Input {...field} size="sm" />
                    <ErrorMessage name="tiktok" component="div" />
                  </FormControl>
                )}
              </Field>
              <Field name="youtube">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Youtube</FormLabel>
                    <Input {...field} size="sm" />
                    <ErrorMessage name="youtube" component="div" />
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

export default ComedianCreatePage;
