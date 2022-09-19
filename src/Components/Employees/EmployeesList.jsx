import React, {useEffect, useState} from 'react';
import Card from "../UI/Card/Card";
import styles from './EmployeesList.module.css'
import Button from "../UI/Button/Button";
import CreateOrEditEmployeeModal from "./CreateOrEditEmployeeModal";
import EmployeeItem from "./EmployeeItem";

const EmployeesList = (props) => {

    const deleteEmployee = async (id) => {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        await fetch(
            "https://localhost:7163/DeleteEmployee?id=" + id,
            options
        );
        props.getAllEmployees()
    }

    return (
        <Card className={styles.employees}>
            <ul>
                {props.employees.length < 1 && <h3>У вас пока нет работников :(</h3>}
                {props.employees.map((employee) => (
                    <EmployeeItem
                        key={employee.id}
                        employee={employee}
                        getAllEmployees={props.getAllEmployees}
                        deleteEmployee={deleteEmployee}/>
                ))}
            </ul>
        </Card>
    );
};

export default EmployeesList;