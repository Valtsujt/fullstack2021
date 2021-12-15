import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField ,DiagnosisSelection } from "../AddPatientModal/FormField";
import { HospitalEntry } from "../types";

import { useStateValue } from "../state";

interface EntryFormValues2 extends HospitalEntry {
    dischargeDate: string,
    criteria: string
}
export type EntryFormValues = Omit<EntryFormValues2, "id" | "discharge">;
interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

// const genderOptions: GenderOption[] = [
//   { value: Gender.Male, label: "Male" },
//   { value: Gender.Female, label: "Female" },
//   { value: Gender.Other, label: "Other" }
// ];



const EntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosises }] = useStateValue();
    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                type: "Hospital",
                dischargeDate: "",
                criteria: "",
                diagnosisCodes: []
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const formationError = "Field is formatted wrong";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                } 
                const dateReg = /^\d{4}[-]\d{2}[-]\d{2}$/;
                if(!dateReg.exec(values.date)) {
                    errors.date = formationError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.dischargeDate) {
                    errors.dischargeDate = requiredError;
                }
                if(!dateReg.exec(values.dischargeDate)) {
                    errors.dischargeDate = formationError;
                }
                if (!values.criteria) {
                    errors.criteria = requiredError;
                }
                return errors;
            }}
        >
           {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="description"
                            placeholder="description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Entry date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Occupation"
                            placeholder="Occupation"
                            name="occupation"
                            component={TextField}
                        />
                        <Field
                            label="dischargeDate"
                            placeholder="YYYY-MM-DD"
                            name="dischargeDate"
                            component={TextField}
                        />
                        <Field
                            label="criteria"
                            placeholder="criteria"
                            name="criteria"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosises)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default EntryForm;
