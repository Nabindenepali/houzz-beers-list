import {Card} from "react-bootstrap";
import beerImage from "../assets/houz-beer.png";

const CustomBeerImage = () => {
  return (
    <Card.Img
      className="custom-beer-image"
      src={beerImage}
    />
  )
};

export default CustomBeerImage;