const EmptyBeerPage = ({ onAddFirstBeer }) => {
  return (
    <div className="no-beer">
      <div className="col-12">Nothing to see yet.</div>
      <div className="col-12"><a onClick={onAddFirstBeer}>Click here</a> to add your first beer!</div>
    </div>
  )
};

export default EmptyBeerPage;