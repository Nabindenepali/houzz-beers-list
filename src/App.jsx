import "./App.css";
import {useEffect, useState} from "react";
import {Card, Button, Modal} from "react-bootstrap";
import beerImage from './assets/houz-beer.png';

const Beer = ({ beer }) => {
  return (
    <div className="col-12">
      <Card className="beer-card flex-row">
        <Card.Header className="beer-header">
          <Card.Img className={beer.image_url ? "beer-image" : "custom-beer-image"} src={beer.image_url || beerImage}/>
        </Card.Header>
        <Card.Body className="beer-body">
          <Card.Title>{beer.name}</Card.Title>
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
              <img className="custom-beer" src={beerImage} alt="Beer image"/>
            </div>
            <div className="col-12">
              <input
                id="name"
                className="input-row"
                type="text"
                placeholder="Beer name*"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <input
                id="genre"
                className="input-row"
                type="text"
                placeholder="Genre*"
                value={form.genre}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <textarea
                id="description"
                className="input-row"
                placeholder="Description*"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 btn-row">
              <Button variant="light" onClick={closeModal}>Cancel</Button>
              <Button type="submit" variant="primary">Save</Button>
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
      <div className="row">
        <div className="col-12">Nothing to see yet.</div>
        <div className="col-12"><a onClick={onAddFirstBeer}>Click here</a> to add your first beer!</div>
      </div>
    </div>
  )
}

const BeersView = ({ beers }) => {
  return (
    <div className="row">
      {beers.map((beer, i) => <Beer beer={beer} key={i}/>)}
    </div>
  )
}

const GeneralBeersList = () => {
  const [beers, setBeers] = useState([]);

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

  if (beers.length) {
    return (
      <>
        <BeersView beers={beers} />
        <div className="load-more text-center" onClick={onLoadMore}>
          <strong>Load More</strong>
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
  const [customBeers, setCustomBeers] = useState([]);

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
        {tab === "custom" && <Button className="float-end" variant="primary" onClick={() => setShowForm(true)}>Add a new beer</Button>}

        <NewBeerForm
          isOpen={showForm}
          closeModal={() => setShowForm(false)}
          onSubmit={addCustomBeer}
        />
      </div>

      {tab === "all" && <GeneralBeersList />}
      {tab === "custom" && <CustomBeersList beers={customBeers} onAddFirstBeer={() => setShowForm(true)}/>}
    </div>
  )
}

export default BeersList
