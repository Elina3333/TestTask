import React, {Fragment, useState} from 'react';
import Button from "../UI/Button/Button";
import EmployeeModal from "../UI/Modal/EmployeeModal";

const CreateOrEditEmployeeModal = (props) => {

    const [modal,setModal]=useState(false)

    const closeModalHandler = () => {
        setModal(false)
    }

    const openModalHandler = () => {
        setModal(true)
    }

    return (
        <Fragment>
            {modal &&  <EmployeeModal getAllEmployees={props.getAllEmployees} key={props.id} id={props.id} onCloseModal={closeModalHandler}/>}
            {!modal &&  <Button onClick={openModalHandler}>{props.action}</Button>}
        </Fragment>
    );
};

export default CreateOrEditEmployeeModal;