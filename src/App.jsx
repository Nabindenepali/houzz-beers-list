import "./App.css";
import {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import downArrow from "./assets/down-arrow.png";

const Beer = ({ beer }) => {
  return (
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
    <div>
      There are no beers here dude
    </div>
  )
}

const BeersView = ({ beers }) => {
  return (
    <div>
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
      Custom beers list
      <BeersView />
    </>
  )
}

const BeersList = () => {
  return (
    <>
      <h4>All Beers</h4>
      <GeneralBeersList />
    </>
  )
}

export default BeersList
