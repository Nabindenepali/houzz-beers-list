import BeersView from "./BeersView.jsx";
import EmptyBeerPage from "./EmptyBeerPage.jsx";

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
};

export default CustomBeersList;