import React from "react";
import ReactDOM from "react-dom";
import Summary from './components/Summary.jsx';
import Reviews from './components/Reviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div className="flex-container">
          <div className="flex-item-left"><Summary /></div>
          <div className="flex-item-right"><Reviews /></div>

        </div>

      </div>


    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
