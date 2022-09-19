import EmployeesList from "./Components/Employees/EmployeesList";
import React, {Fragment, useEffect, useState} from "react";
import styled from 'styled-components';
import CreateOrEditEmployeeModal from "./Components/Employees/CreateOrEditEmployeeModal";

const StyledDivExample=styled.div`
      width:30%;
      margin-left:35%;
      margin-top:2%;
    `
const App = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getAllEmployees()
    }, [employees.length]);

    const getAllEmployees = () => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        fetch(
            "https://localhost:7163/GetAllEmployees",
            options
        ).then((employees) => employees.json())
            .then((employees) => setEmployees(employees));
    }

    return (
        <Fragment>
            <StyledDivExample>
                <CreateOrEditEmployeeModal getAllEmployees={getAllEmployees}  id={false} action={"Добавить работника"}/>
            </StyledDivExample>
            <EmployeesList employees={employees} getAllEmployees={getAllEmployees}/>
        </Fragment>
    );
};

export default App;
