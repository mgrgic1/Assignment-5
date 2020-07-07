import React, {Component} from 'react';
import axios from 'axios';

class Zipcode extends Component{

    constructor(props){
        super(props);
    
        //zip code info and city info are separate to keep things clean
        
        //there are two booleans states (specifying if the result was found)
        //based on how i set up the render code below, ONLY ONE boolean state can be active at a time
        //if no boolean states are active, this means that user typed an incorrect city/zip
        this.state = {
            zipCodeInfo: [],
            cityInfo: [],
            zipExists: false,
            cityExists: false,
        }

    }

    //sends a request to the API to check if the input (num) exists
        //if the zip/city exists, we mark it as found and request data from the api
    //if it does not exist, we set both city and zip booleans to false (extremely important, if only one was active we would)...
    //...have inconsistencies when looking up cities or zips one after another
lookupZip = (num) => {

    //if num is an integer, we go to one specific URL and follow this code path
    //stores array info from what pageRes sends back to us
    if(parseInt(Number(num)) == num) {

        axios.get(`http://ctp-zip-api.herokuapp.com/zip/`+num)
        .then(pageRes => {
            this.setState({zipCodeInfo: pageRes.data});
            this.setState({cityExists: false});
            this.setState({exists: true});
        })
        .catch(error => {
            this.setState({exists: false});
            this.setState({cityExists: false});

        })
    }
    
    //if num is NOT an integer, it is a string, and we uppercase it (as per the API layout) to fetch the proper URL
    //stores array info from what pageRes sends back to us
    else {
        axios.get(`http://ctp-zip-api.herokuapp.com/city/`+num.toUpperCase())
        .then(pageRes => {
            this.setState({cityInfo: pageRes.data});
            this.setState({exists: false});
            this.setState({cityExists: true});
        })
        .catch(error => {
            this.setState({cityExists: false});
            this.setState({exists: false});
        })
    }
}

//builds the zip layout ASSUMING the correct zip was entered
buildZipLayout = () => {
return (
    this.state.zipCodeInfo.map(zip => <div id = "results" key = {zip.RecordNumber}>
        <div id = "locationText">{zip.LocationText}</div>
        <div>
            <p>State: {zip.State}</p>
            <p>Coordinates: {zip.Lat}, {zip.Long}</p>
            <p>Population (estimated): {zip.EstimatedPopulation == "" ? "(not recorded?)" : zip.EstimatedPopulation}</p>
            <p>Total Wages: ${zip.TotalWages == "" ? "(not recorded?)" : zip.TotalWages}</p>
            <a id = "link" href = {"https://www.google.com/search?q=" + zip.LocationText.replace(" ", "+")}>View City on Google</a>
        </div>
        
        
        </div>)
)

} //end buildZipLayout


//builds the city layout ASSUMING the correct city was entered
buildCityLayout = () => {
return (
    this.state.cityInfo.map((value,index) => <div key = {index} id = "results">
        {value}
        <a id = "link" href = {"https://www.google.com/search?q=" + value}>View Zip on Google</a>
    </div>)
)

}


render() {

    //consts will allow us to render the appropriate result
    //based on if the state exists or not
    //(cant access it directly cause then error is thrown :( )
    const doesZipExist = this.state.exists
    const doesCityExist = this.state.cityExists

    if(doesZipExist) {
    return (
        <div>
           <p style = {{marginLeft:'5px'}}>I found {this.state.zipCodeInfo.length} results:</p>
            {this.buildZipLayout()}

        </div>
    );
    }

    else if(doesCityExist) {
        return (
            <div>
           <p style = {{marginLeft:'5px'}}>I found {this.state.cityInfo.length} results:</p>
            {this.buildCityLayout()}
            </div>
        );
    }

    else{
    return (
        <div>
            <p style = {{marginLeft:'5px'}}>Enter a valid zip code or city</p>
        </div>


    )

    }



}




    
}

export default Zipcode