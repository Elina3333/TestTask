import React, {Fragment, useEffect, useState} from 'react';
import Button from "../Button/Button";
import Card from "../Card/Card";
import styles from './EmployeeModal.module.css'
import ReactDOM from "react-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {useForm} from "react-hook-form";

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onCloseModal}/>
}

const Modal = (props) => {

    const [employee, setEmployee] = useState({id: 0, name: '', phone: '', title: '', birthDay: new Date()})

    const [nameValidation,setNameValidation]=useState(true);
    const [titleValidation,setTitleValidation]=useState(true);
    const [phoneValidation,setPhoneValidation]=useState(true);

    useEffect(() => {
        if (!props.id)
            return;
       getEmployeeById()
    }, [employee.id]);

    const getEmployeeById = async () => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };
        await fetch("https://localhost:7163/GetEmployeeById/" + props.id, options)
            .then((employee) => employee.json())
            .then((employee) => setEmployee(employee));
    }


    const addEmployeeHandler = async (e) => {
        e.preventDefault();
        if(employee.name.length<2)
        {
            setNameValidation(false)
            return;
        }
        else {
            setNameValidation(true)
        }
        if(employee.phone.length<7)
        {
            setPhoneValidation(false)
            return;
        }
        else {
            setPhoneValidation(true)
        }
        if(employee.title.length<5)
        {
            setTitleValidation(false)
            return;
        }
        else {
            setTitleValidation(true)
        }
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(employee),
        };
        await fetch("https://localhost:7163/AddOrEditEmployee", options);
        props.onCloseModal()
        props.getAllEmployees()
    }
    console.log(employee.name)
    return <Card className={styles.modal}>
        <form onSubmit={addEmployeeHandler} className={styles.input}>
            <label htmlFor='name'>??????</label>
            <input
                value={employee.name}
                id='name'
                onChange={(event) => (setEmployee({...employee, name: event.target.value}))}>
            </input>
            {!nameValidation && (
                <ErrorMessage>?????? ???????????? ???????? ???????????? 2 ????????????????</ErrorMessage>
            )}
            <label htmlFor='phone'>??????????????</label>
            <input id='phone'
                   type='text'
                   value={employee.phone}
                   onChange={(event) => (setEmployee({...employee, phone: event.target.value}))}/>
            {!phoneValidation && (
                <ErrorMessage>?????????????? ???????????? ???????? ???????????? 7 ????????????????</ErrorMessage>
            )}
            <label htmlFor='title'>??????????????????</label>
            <input id='title'
                   type='text'
                   value={employee.title}
                   onChange={(event) => (setEmployee({...employee, title: event.target.value}))}/>
            {!titleValidation && (
                <ErrorMessage>?????????????????????? ???????????? ???????? ???????????? 5 ????????????????</ErrorMessage>
            )}
            <label htmlFor='birthDay'>???????? ????????????????</label>
            <input id='birthDay'
                   type='date'
                   value={employee.birthDay}
                   onChange={(event) => (setEmployee({...employee, birthDay: event.target.value}))}/>
            {props.id ? <Button type='submit'>?????????????????? ??????????????????</Button> :
                <Button type='submit'>???????????????? ????????????????????????</Button>}
            <Button onClick={props.onCloseModal} type='button'>????????????</Button>
        </form>
    </Card>
}

const EmployeeModal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onCloseModal={props.onCloseModal}/>, document.getElementById('backdrop'))}
            {ReactDOM.createPortal(<Modal getAllEmployees={props.getAllEmployees} id={props.id}
                                          onCloseModal={props.onCloseModal}/>, document.getElementById('modal'))}
        </Fragment>
    );
};

export default EmployeeModal;