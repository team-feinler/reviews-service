import React from 'react';
import StarRating from 'react-star-rating-component';
import styled from 'styled-components';

const CollapsibleLabel = styled.a`
  box-sizing: border-box;
  color: rgb(0, 113, 133);
  cursor: pointer;
  display: inline-block;
  font-family: "Amazon Ember", Arial, sans-serif;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  outline-color: rgb(0, 113, 133);
  outline-style: none;
  outline-width: 0px;
  padding-left: 11px;
  position: relative;
  text-decoration-color: rgb(0, 113, 133);
  text-decoration-line: none;
  text-decoration-style: solid;
  text-decoration-thickness: auto;
  text-size-adjust: 100%;
`;

const FeatureLabeltd = styled.td`
  border-collapse: collapse;
  box-sizing: border-box;
  color: rgb(15, 17, 17);
  font-family: "Amazon Ember", Arial, sans-serif;
  font-size: 14px;
  height: auto;
  line-height: 20px;
  text-size-adjust: 100%;
  padding-right: 75px;`;

class SummaryByFeature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleOpen: false,
      featureToggleOpen: true
    };

    this.toggleCollapsible = this.toggleCollapsible.bind(this);
    this.toggleFeatureCollapsible = this.toggleFeatureCollapsible.bind(this);
    this.hideShowFeatureCollapssible = this.hideShowFeatureCollapssible.bind(this);

  }

  componentDidMount() {
    //this.hideShowFeatureCollapssible();
  }

  //on click, shows the text for rate calculation
  toggleCollapsible(event) {
    this.setState({
      collapsibleOpen: !this.state.collapsibleOpen
    });

  }

  toggleFeatureCollapsible(event) {
    this.setState({
      featureToggleOpen: !this.state.featureToggleOpen
    });
    this.hideShowFeatureCollapssible();
  }

  hideShowFeatureCollapssible() {
    if (this.state.featureToggleOpen) {
      document.getElementById('valueForMoney').style.display = 'none';
      document.getElementById('qualityOfMaterial').style.display = 'none';
      document.getElementById('batteryLife').style.display = 'none';
    } else {
      document.getElementById('valueForMoney').style.display = '';
      document.getElementById('qualityOfMaterial').style.display = '';
      document.getElementById('batteryLife').style.display = '';
    }
  }

  render() {
    const summaryByFeature = this.props.summaryByFeature;
    //console.log('summaryByFeature: ', summaryByFeature);
    return (
      <div>
        <div>
          <CollapsibleLabel onClick={(event) => this.toggleCollapsible(event)}> {!this.state.collapsibleOpen ? (<i className="fa fa-angle-down"></i>) : (<i className="fa fa-angle-up"></i>)}
          How are ratings calculated ?</CollapsibleLabel>
          {this.state.collapsibleOpen ? (<div> To calculate the overall star rating and percentage breakdown by star, we don’t use a simple average. Instead, our system considers things like how recent a review is and if the reviewer bought the item on Amazon. It also analyzes reviews to verify trustworthiness.</div>) : null}

        </div>
        <div><hr /></div>
        <div><h3>By feature</h3></div>
        <div>
          <table>
            <thead></thead>
            <tbody>
              {Object.entries(summaryByFeature).map(([key, value]) => {
                // console.log('Object.entries: ', key);
                return (
                  <tr id={key}>
                    <FeatureLabeltd>{key}</FeatureLabeltd>
                    <td><StarRating
                      name="rate1"
                      starCount={5}
                      value={value ? parseFloat(value) : 0}
                      starColor="#FFA500"
                    // editing=false
                    />
                    </td>
                    <td>{value}</td>
                  </tr>

                )
              })}

            </tbody>

          </table>
        </div>

        <div>
          <CollapsibleLabel onClick={(event) => this.toggleFeatureCollapsible(event)}> {!this.state.featureToggleOpen ? (<i className="fa fa-angle-down"></i>) : (<i className="fa fa-angle-up"></i>)}
            {!this.state.featureToggleOpen ? 'See more' : 'See Less'}</CollapsibleLabel>
        </div>
        <div><hr /></div>

      </div>
    );

  };

}

export default SummaryByFeature;