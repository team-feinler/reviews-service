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
    this.getProductIdFromUrl();

  }

  componentDidMount() {


  }

  //get data
  getProductIdFromUrl() {
    var url = window.location.href;
    console.log('url: ', url);
    url = url.substring(0, url.length - 1);
    let countSlash = [...url].filter(char => char === '/');
    console.log('countSlash: ', countSlash);
    let productIdVal = (countSlash.length === 3) ? url.substring(url.lastIndexOf('/') + 1) : 1000;
    console.log(productIdVal);

    this.state = {
      productId: parseInt(productIdVal)
    };

  }


  render() {
    return (
      <div>
        <div className="flex-container">
          <div className="flex-item-left"><Summary productId={this.state.productId} /></div>
          <div className="flex-item-right"><Reviews productId={this.state.productId} /></div>
        </div>
      </div>


    );
  }
}

ReactDOM.render(<App />, document.getElementById('CustomerReviews'));
