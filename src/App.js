import React from 'react';
import logo from './logo.svg';
import './App.css';
import Zipcode from './components/Zipcode'

class App extends React.Component {

constructor(props){
  super(props);
  
  //create references to the input box (where will be grabbing data from, hence the reference)
  //creates reference to the child component because we will be calling a function in the child from here...
  //...(the function that builds the layout for the zip/city input, assuming it is correct)
  this.inputRef = React.createRef();
  this.zipRef = React.createRef();

  this.state = {
      currentZipcode: 0, //default zip code
  }
}

//when component is loaded/mounted, we want to focus on it by default so user can start typing automatically
componentDidMount() { 
  this.inputRef.current.focus();
}

//button onClick is in this function, but we are specifying that we want to call the child's function
//since we have a reference to the child, we are able to do this
lookupZipInChildFunc = () => {
this.setState({currentZipCode: this.inputRef.current.value}, 
  () => {this.zipRef.current.lookupZip(this.state.currentZipCode);})
}




render() {
  return (
    <div className="App">
      <h1 style = {{textAlign: 'center'}}>Zip Code and City Searcher</h1>

      <center style = {{marginTop: '30px'}}>
        <input type = "text"  ref = {this.inputRef} placeholder = "Enter a zip code or city"/>
        <button style = {{marginLeft: '5px'}} onClick = {this.lookupZipInChildFunc}>Lookup</button>

        </center>


      
      <Zipcode ref = {this.zipRef}/>


    </div>
  );
}
}


export default App;
