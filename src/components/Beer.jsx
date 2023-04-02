import {Card} from "react-bootstrap";
import BeerImage from "./BeerImage.jsx";
import CustomBeerImage from "./CustomBeerImage.jsx";

const Beer = ({ beer }) => {
  return (
    <div className="col-12">
      <Card border="light" className="beer-card flex-row">
        <Card.Header className="beer-header">
          {
            beer.image_url ?
              <BeerImage beer={beer}/> :
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
};

export default Beer;