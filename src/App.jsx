import "./App.css";
import {useEffect, useState} from "react";
import {Card, Button} from "react-bootstrap";

const Beer = ({ beer }) => {
  return (
    <div className="col-12">
      <Card className="beer-card flex-row">
        <Card.Header className="beer-header">
          <Card.Img className="beer-image" src={beer.image_url} />
        </Card.Header>
        <Card.Body className="beer-body">
          <Card.Title>{beer.name}</Card.Title>
          <Card.Subtitle className="beer-subtitle mb-2">{beer.tagline}</Card.Subtitle>
          <Card.Text>{beer.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

const NewBeerForm = () => {
  return (
    <div>
      Add new beer
    </div>
  )
}

const EmptyBeerPage = () => {
  return (
    <div className="no-beer">
      <div className="row">
        <div className="col-12">Nothing to see yet.</div>
        <div className="col-12"><a href="#">Click here</a> to add your first beer!</div>
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

const CustomBeersList = () => {
  return (
    <>
      <EmptyBeerPage />
    </>
  )
}

const BeersList = () => {
  const [tab, setTab] = useState("all")

  const changeTab = (tab) => {
    setTab(tab)
  };

  return (
    <div className="row">
      <div className="col-12 tabs">
        <span className={tab === "all" ? "active" : ""} onClick={() => changeTab("all")}>All Beers</span>
        <span className={tab === "custom" ? "active" : ""} onClick={() => changeTab("custom")}>My Beers</span>
        {tab === "custom" && <Button className="float-end" variant="primary">Add a new beer</Button>}
      </div>

      {tab === "all" && <GeneralBeersList />}
      {tab === "custom" && <CustomBeersList />}
    </div>
  )
}

export default BeersList
