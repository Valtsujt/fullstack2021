import React from "react";
import axios from "axios";
//import { Container, Table, Button } from "semantic-ui-react";
import { Button, Card, Container, } from "semantic-ui-react";
// import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
// import AddPatientModal from "../AddPatientModal";
import { Entry, Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
// import HealthRatingBar from "../components/HealthRatingBar";
import { modifyPatient, useStateValue } from "../state";
import { useParams } from "react-router";
import { Icon } from "semantic-ui-react";
import AddEntryModal from "./modalindex";
import { EntryFormValues } from "./addEntryForm";







const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [{ patients, diagnosises }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    const { dischargeDate, criteria, ...val } = values;
    const entry = { ...val, discharge: { date: dischargeDate, criteria: criteria } };
    console.log(entry);
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
      dispatch(modifyPatient(newPatient));
      closeModal();
      setPatient(newPatient);
    } catch (e) {
      console.log(e);
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data || 'Unknown error');
    }
  };
  React.useEffect(() => {

    const fetchPatientList = async () => {
      if (patients[id]?.ssn) {
        setPatient(patients[id]);
      } else {
        try {
          const { data: patientfromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(modifyPatient(patientfromApi));
          setPatient(patientfromApi);
        } catch (e) {
          console.error(e);
        }
      }

    };
    void fetchPatientList();
  }, [dispatch]);

  const getIcon = (gender: Gender | undefined) => {
    if (gender == "male") {
      return "mars";
    } else if (gender == "female") {
      return "venus";
    } else {
      return "genderless";
    }
  };

  interface entryProps {
    entry: Entry;
  }
  const getHealthIconColor = (num: number) => {
    if (num == 0) {
      return "green";
    } else if (num == 1) {
      return "yellow";
    } else {
      return "black";
    }
  };
  const EntryDetails = (props: entryProps) => {
    const e = props.entry;
    switch (e.type) {
      case "HealthCheck":
        return (<Card>
          <Card.Content>
            <p><b>{e.date} < Icon name="user doctor" /></b></p>
            <p> <i>{e.description}</i></p>
            <ul>
              {e.diagnosisCodes?.map(code => {

                return <li key={code}> {code} : {diagnosises.find(d => d.code === code)?.name} </li>;
              })}

            </ul>
            <Icon name="heart" color={getHealthIconColor(e.healthCheckRating)}></Icon>
          </Card.Content>
        </Card>);

      case "Hospital":
        return (<Card>
          <Card.Content>
            <p><b>{e.date} < Icon name="hospital" /></b></p>
            <p> <i>{e.description}</i></p>
            <ul>
              {e.diagnosisCodes?.map(code => {

                return <li key={code}> {code} : {diagnosises.find(d => d.code === code)?.name} </li>;
              })}
            </ul>
          </Card.Content>
        </Card>);
      case "OccupationalHealthcare":
        return (<Card>
          <Card.Content>
            <p><b>{e.date} < Icon name="stethoscope" />{e.employerName}</b></p>
            <p><i>{e.description}</i></p>
            <ul>
              {e.diagnosisCodes?.map(code => {

                return <li key={code}> {code} : {diagnosises.find(d => d.code === code)?.name} </li>;
              })}
            </ul>
          </Card.Content>
        </Card>);
    }
  };
  return (
    <div className="App">
      <Container >
        <h2>{patient?.name} <Icon name={getIcon(patient?.gender)}></Icon></h2>
        <p>ssn: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
      </Container>
      <Container >
        <h3>entries</h3>
        {patient?.entries?.map(e => {
          return (
            <Card.Group key={e.id}>
              <EntryDetails entry={e} />
            </Card.Group>
          );
        })}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>

    </div>
  );
};

export default PatientPage;
