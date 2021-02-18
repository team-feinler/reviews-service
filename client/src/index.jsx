import React from "react";
import ReactDOM from "react-dom";
import Summary from './components/Summary.jsx';
import Reviews from './components/Reviews.jsx';
import styled from 'styled-components';
import "./components/style.css";

const AmazonHomeContainer = styled.div`
    margin: 0 auto;
    min-width: 1000px;
    max-width: 1500px;
    background-color: #fff;
}`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //productId: 1005
      productId: null
    };
    this.getProductIdFromUrl = this.getProductIdFromUrl.bind(this);

  }

  // need to discuss with TM
  // componentDidMount() {
  //   this.getProductIdFromUrl();
  //   this.setState({
  //     productId: 1060
  //   });

  //   console.log('CDM state : ', this.state);


  // }

  //get data
  getProductIdFromUrl() {
    var url = window.location.href;
    // url = url.substring(0, url.length - 1);
    // let countSlash = [...url].filter(char => char === '/');
    //let productIdVal = (countSlash.length === 3) ? url.substring(url.lastIndexOf('/') + 1) : 1000;
    let productIdVal = url.split('/')[3] || 1000;

    // need to discuss with TM
    // this.setState({
    //   productId: productIdVal
    // });
    // console.log('productIdVal: ', productIdVal);
    // console.log('state : ', this.state);

    return productIdVal;

  }




  render() {
    return (
      <AmazonHomeContainer>
        <div><hr /></div>
        <div className="flex-container">
          {/* <div className="flex-item-left"><Summary productId={this.state.productId} /></div>
          <div className="flex-item-right"><Reviews productId={this.state.productId} /></div> */}
          <div className="flex-item-left"><Summary productId={this.getProductIdFromUrl()} /></div>
          <div className="flex-item-right"><Reviews productId={this.getProductIdFromUrl()} /></div>
        </div>
      </AmazonHomeContainer>


    );
  }
}

ReactDOM.render(<App />, document.getElementById('CustomerReviews'));
