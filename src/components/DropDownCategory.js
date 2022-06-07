import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { deleteCategoryApi, newCategory } from "../utils/https/vehicles";
import "../pages/Vehicles/Vehicles.css";

function DropDownCategory({
  selected,
  setSelectedCategory,
  data,
  onDeleteCategory
}) {
  const token = useSelector((state) => state.auth.userData.token);
  const [isActive, setisActive] = useState(false);
  const [values, setValues] = useState([]);
  const [idValues, setIdValues] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handlerShowModal = () => {
    setShowModal(!showModal);
  };

  // const handlerDeleteCategory = ()

  const getValues = useCallback(() => {
    if (data.length !== 0) {
      let tempValue = [];
      let tempId = [];

      data.map((item) => {
        tempValue.push(Object.values(item)[1]);
        tempId.push(Object.values(item)[0]);
        return tempValue;
      });

      // console.log("TEMPVALUE MASUK", dataTemp);
      if (tempValue.length !== 0 && tempId.length !== 0) {
        setValues(tempValue);
        setIdValues(tempId);
      }
    }
  }, [data]);

  useEffect(() => {
    getValues();
  }, [getValues]);

  return (
    <div className='dropdown-category'>
      <div
        className='dropdown-btn-category'
        onClick={(e) => setisActive(!isActive)}
      >
        {data.length !== 0 ? selected : "Add Item To"}
        {isActive ? (
          <i className='fa-solid fa-chevron-down fs-4'></i>
        ) : (
          <i className='fa-solid fa-chevron-up fs-4'></i>
        )}
      </div>
      {isActive && (
        <div className='dropdown-content-category'>
          <div className='dropdown-item-category item-header'>
            Choose Category
          </div>
          {values.length !== 0 &&
            values.map((value, idx) => {
              return (
                <div
                  className='dropdown-item-category'
                  onClick={(e) => {
                    setSelectedCategory(value);
                    setisActive(false);
                  }}
                  key={idx}
                >
                  {value}
                  <div
                    className='icon-item-category'
                    onClick={onDeleteCategory}
                  >
                    <i className='fa-solid fa-trash icon-item'></i>
                  </div>
                </div>
              );
            })}

          <div
            className='dropdown-item-category item-add-category'
            onClick={handlerShowModal}
          >
            <i className='fa-solid fa-plus me-3'></i>Add Category
          </div>
        </div>
      )}
      <NewCategory show={showModal} handlerModal={handlerShowModal} />
    </div>
  );
}

function NewCategory({ show, handlerModal }) {
  return (
    <Modal show={show} onHide={handlerModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>New Vehicle Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
            <Form.Label>Category</Form.Label>
            <Form.Control type='text' autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={handlerModal}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DropDownCategory;
