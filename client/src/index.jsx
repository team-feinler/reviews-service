import React from "react";
import ReactDOM from "react-dom";
import Summary from './components/Summary.jsx';
import Reviews from './components/Reviews.jsx';
import "./components/style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null
    };

    this.getProductIdFromUrl = this.getProductIdFromUrl.bind(this);

  }


  //get data
  getProductIdFromUrl() {
    var url = window.location.href;
    // url = url.substring(0, url.length - 1);
    // let countSlash = [...url].filter(char => char === '/');
    //let productIdVal = (countSlash.length === 3) ? url.substring(url.lastIndexOf('/') + 1) : 1000;
    let productIdVal = url.split('/')[3] || 1000;
    return productIdVal;

  }


  render() {
    return (
      <div>
        <div className="flex-container">
          <div className="flex-item-left"><Summary productId={this.getProductIdFromUrl()} /></div>
          <div className="flex-item-right"><Reviews productId={this.getProductIdFromUrl()} /></div>
        </div>
      </div>


    );
  }
}

ReactDOM.render(<App />, document.getElementById('CustomerReviews'));
