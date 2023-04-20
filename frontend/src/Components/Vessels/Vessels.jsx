import { useLoaderData,useNavigation } from "react-router-dom";
import { useState } from "react";
import VesselsTable from "./VesselsTable";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import VesselType from "./VesselType";

export const Vessels = () => {
    const vesselsFetch = useLoaderData();
    const navigation = useNavigation();
    const [vesselType, setVesselType] = useState('');

    if(navigation.state === "loading"){
        return <h3>Loading...</h3>
    }

    const handleTypeChange = (event) => {
        setVesselType(event.target.value);
    };

    return(
        <>
            <h2>Vessels page</h2>
            <VesselsTable vessels={vesselsFetch} />
            <Form.Group className="d-flex justify-content-center mx-auto" style={{ width: "90%" }}>
                <InputGroup>
                    <Form.Control placeholder="Name" aria-label="Name"/>
                    <Form.Control as="select" value={vesselType} onChange={handleTypeChange}>
                        <option value="">Select a vessel type...</option>
                        {VesselType.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </Form.Control>
                    <Form.Control placeholder="Flag" aria-label="Flag"/>
                    <Form.Control type='number' placeholder="IMO Number"/>
                    <Button variant="success">Add Vessel</Button>{' '}
                </InputGroup>
            </Form.Group>
        </>
        
    )
}

export const vesselsLoader = async () => {
    const response = await fetch('http://localhost:8080/api/vessel');
    const data = await response.json();
    return data;
}