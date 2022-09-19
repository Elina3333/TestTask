import React from 'react';
import CreateOrEditEmployeeModal from "./CreateOrEditEmployeeModal";
import Button from "../UI/Button/Button";

const EmployeeItem = (props) => {
    return (
        <li key={props.employee.id}>
            <div style={{marginLeft: '35%'}}>
                <p>Name: {props.employee.name}</p>
                <p>Phone: {props.employee.phone}</p>
                <p>Department: {props.employee.title}</p>
                <p>BirthDay: {props.employee.birthDay}</p>
            </div>
            <div style={{width: '50%', marginLeft: '25%', marginTop: '3%', padding: '1%'}}>
                <CreateOrEditEmployeeModal getAllEmployees={props.getAllEmployees} id={props.employee.id} action={"Редактировать"}/>
                <hr/>
                <Button onClick={() => props.deleteEmployee(props.employee.id)}>Удалить</Button>
            </div>
        </li>
    );
};

export default EmployeeItem;