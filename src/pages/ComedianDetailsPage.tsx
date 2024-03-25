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
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FieldInputProps,
  FormikProps,
  FieldArray,
} from "formik";
import { useEffect, useState } from "react";
import { Link as RouteLink, useParams } from "react-router-dom";
import {
  ComedianResponse,
  ComedianService,
  UpdateComedianRequest,
} from "../services/openapi";
import useApi from "../services/useApi";
import ContentTableInput from "../components/ContentTableInput";
const ComedianDetailsPage = () => {
  const { comedianId } = useParams();
  const [comedian, setComedian] = useState<ComedianResponse>();
  const { isLoading, error, handleRequest } = useApi();
  useEffect(() => {
    if (comedianId) {
      const fetchComedian = async () => {
        try {
          const comedianResponse = await handleRequest(
            ComedianService.comediansComedianIdGet(parseInt(comedianId, 10))
          );
          setComedian(comedianResponse);
        } catch (error) {
          // TODO handle this errors in a generic way
          console.error(error);
        }
      };
      fetchComedian();
    }
  }, [handleRequest]);

  type FormFieldProps = {
    field: FieldInputProps<any>;
    form: FormikProps<UpdateComedianRequest>;
  };

  const handleSubmit = async (values: UpdateComedianRequest) => {
    await handleRequest(
      ComedianService.comediansComedianIdPut(
        comedianId as unknown as number,
        values
      )
    );
    if (comedianId) {
      const comedianResponse = await handleRequest(
        ComedianService.comediansComedianIdGet(parseInt(comedianId, 10))
      );
      setComedian(comedianResponse);
    }
  };

  // const handleRemoveContent = (index: number) => {
  //   const updatedContents = [...comedian.contents];
  //   updatedContents.splice(index, 1);
  //   setComedian((prevState) => ({ ...prevState, contents: updatedContents }));
  // };

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="green.600"
        size="xl"
      />
    );
  }
  if (!comedian) {
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
        <Formik initialValues={comedian} onSubmit={handleSubmit}>
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
              <Box mt={6}>
                <FieldArray name="contents">
                  {(arrayHelpers) => (
                    <ContentTableInput
                      name="contents"
                      handleAdd={arrayHelpers.push}
                      handleRemove={arrayHelpers.remove}
                    />
                  )}
                </FieldArray>
              </Box>
              <Button mt={4} colorScheme="green" type="submit">
                Guardar
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Box>
  );
};

export default ComedianDetailsPage;
