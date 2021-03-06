import React,{useState,useEffect} from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,

  
} from "@material-ui/core";
import InfoBox from './InfoBox';
import Table from './Table';
import {sortData} from './util';
import LineGraph from './LineGraph';
import Map from "./Map"; 
import "leaflet/dist/leaflet.css";

function App() {

  const [countries,setCountries]=useState([]);
  const[country, setCountry]=useState(['worldwide']); //default selection of coumtry is worldwide
  const [countryInfo, setCountryInfo] = useState({});
  const[tableData,setTableData]=useState([]);//if says the .map is not a function cehck if usestateis->usestate({});for constant if it is initilized in array first obj needs to in a array befor using map function 
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);


  //if the different country is selected then to change the setountry to that selected country
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
   

    const url =
    countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      await fetch(url)
      .then((response) => response.json())
      .then((data) => {
      
      
      setCountry(countryCode);
      setCountryInfo(data);

      
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
      });
  };

  console.log("the data issdsadsd here",mapCenter);

  console.log("the data is here",tableData);


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      
      
       
        
      });
  }, []);


 







  //fetching the the ai data/ getting th erequest as jason and maping the country and value
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            
          }));
        

      
         const sortedData= sortData(data);
         setTableData(sortedData);
         setCountries(countries);
        setMapCountries(data);
                /*setTableData(data);*/
        
          
        });
    };

    
    getCountriesData();
  }, []);




  return (
    <div className="app">
      <div className="app__left">
            <h1>COVID19-TRACKER</h1>
                      
            {/*header*/ }
            {/*title plus dropdown*/ }
            <FormControl className="app__dropdown">
                  <Select variant="outlined" onChange={onCountryChange}  value={country} >

                      <MenuItem value="worldwide">Worldwide</MenuItem>  
                            {/** loop through all the country and show them in dop down 
                             * calling https://disease.sh/docs/#/COVID-19%3A%20Worldometers/get_v3_covid_19_countries
                                * api
                                        */}
                          {countries.map((country) => (
                                <MenuItem value={country.value}>{country.name}</MenuItem>
                              ))}

              
                  </Select>
            </FormControl>

              <div className="app__stats">

                <InfoBox title="CoronaVirus Cases" 
                cases={countryInfo.todayCases} 
                total={countryInfo.cases}/>

                <InfoBox title="Recovered"  
                cases={countryInfo.todayRecovered} 
                total={countryInfo.recovered}/>

                <InfoBox title="Deaths"  
                cases={countryInfo.todayDeaths} 
                total={countryInfo.deaths}/>

      
              </div>

            
          

                <Map
                 countries={mapCountries}
               
                center1={mapCenter}

                
                zoom1={mapZoom}/>
                {/*map*/ }

               
    </div>
   

    <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />

            <h3>GRAPH</h3>
            <LineGraph />
        
          </div>
        </CardContent>
      </Card>
   </div> 
  );
}


export default App;
