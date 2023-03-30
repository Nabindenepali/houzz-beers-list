import "./App.css";
import {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";

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
  const [beers, setBeers] = useState(null);

  useEffect(() => {
    const beersFetch = async () => {
      const beers = await (
        await fetch(
          "https://api.punkapi.com/v2/beers?page=1&per_page=10"
        )
      ).json();

      setBeers(beers);
    };

    beersFetch();
  }, []);

  if (beers) {
    return (
      <>
        <BeersView beers={beers} />
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
