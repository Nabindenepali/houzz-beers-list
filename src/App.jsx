import "./App.css";
import {useEffect, useState} from "react";
import {Card, Button, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import beerImage from './assets/houz-beer.png';

const GeneralBeerImage = ({ beer }) => {
  return (
    <OverlayTrigger
      key="top"
      placement="top"
      overlay={
        <Tooltip id="tooltip-top" style={{position: "fixed"}}>
          Ingredients: {Object.keys(beer.ingredients).join(", ")}
        </Tooltip>
      }
    >
      <Card.Img
        className={"beer-image"}
        src={beer.image_url}
      />
    </OverlayTrigger>
  )
}

const CustomBeerImage = () => {
  return (
    <Card.Img
      className="custom-beer-image"
      src={beerImage}
    />
  )
}

const Beer = ({ beer }) => {
  return (
    <div className="col-12">
      <Card border="light" className="beer-card flex-row">
        <Card.Header className="beer-header">
          {
            beer.image_url ?
            <GeneralBeerImage beer={beer}/> :
            <CustomBeerImage/>
          }
        </Card.Header>
        <Card.Body className="beer-body">
          <Card.Title><h3>{beer.name}</h3></Card.Title>
          <Card.Subtitle className="beer-subtitle mb-2">{beer.tagline || beer.genre}</Card.Subtitle>
          <Card.Text>{beer.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

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
}

const EmptyBeerPage = ({ onAddFirstBeer }) => {
  return (
    <div className="no-beer">
      <div className="col-12">Nothing to see yet.</div>
      <div className="col-12"><a onClick={onAddFirstBeer}>Click here</a> to add your first beer!</div>
    </div>
  )
}

const BeersView = ({ beers }) => {
  return (
    <>
      {beers.map((beer, i) => <Beer beer={beer} key={i}/>)}
    </>
  )
}

const GeneralBeersList = ({ beers, onLoadMore }) => {
  if (beers.length) {
    return (
      <>
        <BeersView beers={beers} />
        <div className="load-more text-center" onClick={onLoadMore}>
          <strong>Load More&nbsp;</strong>
          <div className="arrow"><strong>^</strong></div>
        </div>
      </>
    )
  }
}

const CustomBeersList = ({ beers, onAddFirstBeer }) => {
  return (
    <>
      {
        beers.length ?
        <BeersView beers={beers} /> :
        <EmptyBeerPage onAddFirstBeer={onAddFirstBeer}/>
      }
    </>
  )
}

const BeersList = () => {
  const [tab, setTab] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [beers, setBeers] = useState([]);
  const [customBeers, setCustomBeers] = useState([]);

  let page = 1;

  const beersFetch = async () => {
    const data = await (
      await fetch(
        `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`
      )
    ).json();

    setBeers([...beers, ...data]);
  };

  useEffect(() => {
    beersFetch();
  }, []);

  const onLoadMore = () => {
    page++;
    beersFetch();
  };

  const changeTab = (tab) => {
    setTab(tab)
  };

  const addCustomBeer = (newBeer) => {
    setCustomBeers([...customBeers, newBeer]);
  };

  return (
    <div className="row">
      <div className="col-12 tabs">
        <span className={tab === "all" ? "active" : ""} onClick={() => changeTab("all")}>All Beers</span>
        <span className={tab === "custom" ? "active" : ""} onClick={() => changeTab("custom")}>My Beers</span>
        {tab === "custom" && <Button
          className="btn-new-beer"
          variant="primary"
          onClick={() => setShowForm(true)}>Add a new beer</Button>
        }

        <NewBeerForm
          isOpen={showForm}
          closeModal={() => setShowForm(false)}
          onSubmit={addCustomBeer}
        />
      </div>

      {tab === "all" && <GeneralBeersList
        beers={beers}
        onLoadMore={onLoadMore} />
      }

      {tab === "custom" && <CustomBeersList
        beers={customBeers}
        onAddFirstBeer={() => setShowForm(true)}/>
      }
    </div>
  )
}

export default BeersList
