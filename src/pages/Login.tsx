import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
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
import useApi from "../services/useApi";
import { AuthenticationService, LoginRequest } from "../services/openapi";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { handleRequest } = useApi();
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  type FormFieldProps = {
    field: FieldInputProps<any>;
    form: FormikProps<LoginRequest>;
  };

  const handleSubmit = async (
    values: LoginRequest,
    { setSubmitting, setFieldError }: FormikHelpers<LoginRequest>
  ) => {
    try {
      const loginResponse = await handleRequest(
        AuthenticationService.loginPost(values)
      );

      localStorage.setItem("accessToken", loginResponse?.accessToken || "");
      navigate(`/comedians`);
    } catch (error) {
      setFieldError("password", "Invalid username or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Center
      mt="4"
      pl={{ base: 3, sm: 5, md: 10, lg: 20 }}
      pr={{ base: 3, sm: 5, md: 10, lg: 20 }}
      maxW="700px"
      mx="auto"
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form style={{ width: "100%" }}>
            <Field name="username">
              {({ field, form }: FormFieldProps) => (
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input {...field} size="sm" />
                  <ErrorMessage name="username" component="div" />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: FormFieldProps) => (
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} size="sm" type="password" />
                  <ErrorMessage name="password" component="div" />
                </FormControl>
              )}
            </Field>

            <Box mt={3} textAlign="center">
              <Button
                colorScheme="teal"
                size="sm"
                type="submit"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Center>
  );
};

export default Login;
