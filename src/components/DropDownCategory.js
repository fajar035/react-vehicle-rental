import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { newCategory } from "../utils/https/vehicles";
import "../pages/Vehicles/Vehicles.css";
import Swal from "sweetalert2";
import Loading from "../components/Loading/Loading";

function DropDownCategory({
  selected,
  setSelectedCategory,
  data,
  onDeleteCategory,
  idCategory,
  category,
  handlerUpdateCategory
}) {
  const [isActive, setisActive] = useState(false);
  const [values, setValues] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handlerDropDown = () => {
    setisActive(!isActive);
  };

  const handlerShowModal = () => {
    setShowModal(!showModal);
  };

  const getValues = useCallback(() => {
    if (data.length !== 0) {
      let tempValue = [];
      let tempId = [];

      data.map((item) => {
        tempValue.push(Object.values(item)[1]);
        tempId.push(Object.values(item)[0]);
        return tempValue;
      });

      if (tempValue.length !== 0 && tempId.length !== 0) {
        setValues(tempValue);
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
              if (category[idx].category === selected) {
                idCategory(category[idx].id);
              }
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
                    <div className='wrapper-span-delete'>
                      <span className='span-delete'>
                        If you want to delete, please select a
                        category first
                      </span>
                    </div>
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
      <NewCategory
        show={showModal}
        handlerModal={handlerShowModal}
        handlerDropDown={handlerDropDown}
        handlerUpdateCategory={handlerUpdateCategory}
      />
    </div>
  );
}

function NewCategory({
  show,
  handlerModal,
  handlerDropDown,
  handlerUpdateCategory
}) {
  const token = useSelector((state) => state.auth.userData.token);
  const [categoryValue, setCategoryValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handlerSubmit = () => {
    const body = {
      category: categoryValue
    };
    if (categoryValue.length !== 0) {
      newCategory(body, token)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.result.message,
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
          }).then((result) => {
            if (result.isConfirmed) {
              handlerModal(false);
              handlerDropDown(false);
              handlerUpdateCategory(true);
              setIsLoading(false);
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            position: "top-right",
            icon: "error",
            title: "Failed to add category",
            showConfirmButton: true
          });
          setIsLoading(true);
          console.log(err);
        });
    }
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Modal show={show} onHide={handlerModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Vehicle Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlInput1'
            >
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                autoFocus
                className='form-input-category'
                autoComplete='off'
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='warning' onClick={handlerSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DropDownCategory;
