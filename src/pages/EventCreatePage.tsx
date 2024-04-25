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

import {
  ComedianResponse,
  ComedianService,
  CreateEventRequest,
  EventService,
  Location,
  LocationService,
} from "../services/openapi";
import useApi from "../services/useApi";
import { GroupBase, MultiValue, OptionBase, Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
interface SelectOption extends OptionBase {
  label: string;
  value: number;
}
type FormFieldProps = {
  field: FieldInputProps<any>;
  form: FormikProps<CreateEventRequest>;
};

const EventCreatePage = () => {
  const { isLoading, error, handleRequest } = useApi();
  const [locations, setLocations] = useState<SelectOption[]>();
  const [comedians, setComedians] = useState<SelectOption[]>([]);

  const initialValues: CreateEventRequest = {
    name: "",
  };
  useEffect(() => {
    const fetchLocationsAndComedians = async () => {
      try {
        const locationsResponse = await handleRequest(
          LocationService.locationsGet({})
        );

        const locationsOptions =
          locationsResponse?.map((location: Location) => ({
            label: location.name,
            value: location.id as unknown as number,
          })) || [];
        setLocations(locationsOptions || []);

        const comediansResponse = await handleRequest(
          ComedianService.comediansGet({}, {})
        );

        const comediansOptions =
          comediansResponse?.content?.map((comedian: ComedianResponse) => ({
            label: comedian.name,
            value: comedian.id as unknown as number,
          })) || [];
        setComedians(comediansOptions || []);
      } catch (error) {
        // TODO handle this errors in a generic way
        console.error(error);
      }
    };
    fetchLocationsAndComedians();
  }, [handleRequest]);

  const handleSubmit = async (values: CreateEventRequest) => {
    await handleRequest(EventService.eventsPost(values));
  };

  const handleFileChange = (event: any, setFieldValue: any) => {
    const file = event.currentTarget.files[0];
    if (file) {
      // Convert file to base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("poster", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateFormComedianIds = (
    event: MultiValue<SelectOption>,
    setFieldValue: any
  ) => {
    const ids: number[] = [];
    console.log(event);
    event.forEach((option) => {
      ids.push(option.value);
    });

    setFieldValue("comedianIds", ids);
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
              <Field name="poster">
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
              <Field name="url">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Url</FormLabel>
                    <Input {...field} size="sm" />
                    <ErrorMessage name="url" component="div" />
                  </FormControl>
                )}
              </Field>
              <Field name="date">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Data</FormLabel>

                    <ReactDatePicker
                      selected={field.value ? new Date(field.value) : null} // Ensure field.value is a valid Date object
                      onChange={(date) => form.setFieldValue("date", date)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                    <ErrorMessage name="date" component="div" />
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Descrição</FormLabel>
                    <Input {...field} size="sm" />
                    <ErrorMessage name="description" component="div" />
                  </FormControl>
                )}
              </Field>
              <Field name="locationId">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Localizacao</FormLabel>
                    <Select<SelectOption, false, GroupBase<SelectOption>>
                      options={locations}
                      onChange={(event) => {
                        form.setFieldValue("locationId", event?.value);
                      }}
                      // onInputChange={(e) => setComedianNameSearch(e)}
                      // className={classes.selectComedian}
                      // useBasicStyles
                      // chakraStyles={chakraStyles}
                      // value={eventFilters.comedian}}
                    />
                    <ErrorMessage name="locationId" component="div" />
                  </FormControl>
                )}
              </Field>
              <Field name="comedianIds">
                {({ field, form }: FormFieldProps) => (
                  <FormControl>
                    <FormLabel>Comediantes</FormLabel>
                    <Select<SelectOption, true, GroupBase<SelectOption>>
                      // {...field}
                      isMulti
                      options={comedians}
                      onChange={(event) => {
                        updateFormComedianIds(event, form.setFieldValue);
                      }}
                      // onInputChange={(e) => setComedianNameSearch(e)}
                      // className={classes.selectComedian}
                      // useBasicStyles
                      // chakraStyles={chakraStyles}
                      // value={eventFilters.comedian}}
                    />
                    <ErrorMessage name="description" component="div" />
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

export default EventCreatePage;
