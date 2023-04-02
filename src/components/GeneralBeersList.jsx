import BeersView from "./BeersView.jsx";

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
};

export default GeneralBeersList;