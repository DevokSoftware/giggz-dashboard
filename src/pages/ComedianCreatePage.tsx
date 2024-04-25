import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
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

import { ComedianService, CreateComedianRequest } from "../services/openapi";
import useApi from "../services/useApi";
import { useAnimation } from "framer-motion";
const ComedianCreatePage = () => {
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();
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
  const handleFileChange = (event: any, setFieldValue: any) => {
    const file = event.currentTarget.files[0];
    if (file) {
      // Convert file to base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("picture", reader.result);
      };
      reader.readAsDataURL(file);
    }
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
              <Field name="picture">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <Box>
                      <Input
                        type="file"
                        height="100%"
                        width="100%"
                        position="absolute"
                        top="0"
                        left="0"
                        opacity="0"
                        aria-hidden="true"
                        accept="image/*"
                        onDragEnter={startAnimation}
                        onDragLeave={stopAnimation}
                        onChange={(event) =>
                          handleFileChange(event, form.setFieldValue)
                        }
                      />
                      <Image
                        borderRadius="full"
                        src={field.value}
                        mx="auto"
                        //modify this boxShadow
                        boxShadow="3px 3px 13px 2px rgb(0 128 0 / 20%)"
                        border={`2px solid white`}
                        boxSize={{
                          base: "120px",
                          sm: "120px",
                          md: "150px",
                          lg: "200px",
                        }}
                        objectFit="cover"
                      />
                    </Box>
                  </FormControl>
                )}
              </Field>
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
