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
    // console.log('getProductIdFromUrl called');
    //this.getProductIdFromUrl();

  }

  componentDidMount() {
    console.log('componentDidMount ');
    // this.getProductIdFromUrl();


  }

  //get data
  getProductIdFromUrl() {
    var url = window.location.href;
    console.log('url: ', url);
    url = url.substring(0, url.length - 1);
    let countSlash = [...url].filter(char => char === '/');
    console.log('countSlash: ', countSlash);
    let productIdVal = (countSlash.length === 3) ? url.substring(url.lastIndexOf('/') + 1) : 1000;
    let v1 = url.split('/')[3] || 1000;
    console.log(productIdVal);
    console.log(v1);

    // this.state = {
    //   productId: parseInt(productIdVal)
    // };

    // this.setState({
    //   productId: parseInt(productIdVal)
    // });
    return v1;

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
