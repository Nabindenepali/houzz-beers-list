import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import beerImage from "../assets/houz-beer.png";

const NewBeerForm = ({ isOpen, closeModal, onSubmit }) => {
  const INITIAL_STATE = {
    name: "",
    genre: "",
    description: ""
  };

  const [form, setForm] = useState(INITIAL_STATE);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(form);
    setForm(INITIAL_STATE);
    closeModal();
  };

  return (
    <Modal
      show={isOpen}
      onHide={closeModal}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h5>Add a New Beer</h5>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12">
              <img className="custom-beer form-control" src={beerImage} alt="Beer image"/>
            </div>
            <div className="col-12">
              <input
                id="name"
                className="input-row form-control"
                type="text"
                placeholder="Beer name*"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <input
                id="genre"
                className="input-row form-control"
                type="text"
                placeholder="Genre*"
                value={form.genre}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <textarea
                rows="4"
                id="description"
                className="input-row form-control"
                placeholder="Description*"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 btn-row">
              <span className="btn-cancel" onClick={closeModal}>Cancel</span>
              <Button className="btn-save" type="submit" variant="primary">Save</Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NewBeerForm;
