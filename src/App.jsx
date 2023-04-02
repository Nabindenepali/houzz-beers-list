import "./App.css";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import NewBeerForm from "./components/NewBeerForm.jsx";
import GeneralBeersList from "./components/GeneralBeersList.jsx";
import CustomBeersList from "./components/CustomBeersList.jsx";

const BeersList = () => {
  const [tab, setTab] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [beers, setBeers] = useState([]);
  const [customBeers, setCustomBeers] = useState([]);

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

  const changeTab = (tab) => {
    setTab(tab)
  };

  const addCustomBeer = (newBeer) => {
    setCustomBeers([...customBeers, newBeer]);
  };

  return (
    <div className="row">
      <div className="col-12 tabs">
        <span className={tab === "all" ? "active" : ""} onClick={() => changeTab("all")}>All Beers</span>
        <span className={tab === "custom" ? "active" : ""} onClick={() => changeTab("custom")}>My Beers</span>
        {tab === "custom" && <Button
          className="btn-new-beer"
          variant="primary"
          onClick={() => setShowForm(true)}>Add a new beer</Button>
        }

        <NewBeerForm
          isOpen={showForm}
          closeModal={() => setShowForm(false)}
          onSubmit={addCustomBeer}
        />
      </div>

      {tab === "all" && <GeneralBeersList
        beers={beers}
        onLoadMore={onLoadMore} />
      }

      {tab === "custom" && <CustomBeersList
        beers={customBeers}
        onAddFirstBeer={() => setShowForm(true)}/>
      }
    </div>
  )
};

export default BeersList;
