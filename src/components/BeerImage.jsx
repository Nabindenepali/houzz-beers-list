import {Card, Tooltip, OverlayTrigger} from "react-bootstrap";

const BeerImage = ({ beer }) => {
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
};

export default BeerImage;