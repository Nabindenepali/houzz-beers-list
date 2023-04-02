import Beer from "./Beer.jsx";

const BeersView = ({ beers }) => {
  return (
    <>
      {beers.map((beer, i) => <Beer beer={beer} key={i}/>)}
    </>
  )
};

export default BeersView;