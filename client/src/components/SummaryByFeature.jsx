import React from 'react';
import StarRating from 'react-star-rating-component';

class SummaryByFeature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsibleOpen: false,
      featureToggleOpen: false
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
    console.log('summaryByFeature: ', summaryByFeature);
    return (
      <div>
        <div>
          <a onClick={(event) => this.toggleCollapsible(event)}> {!this.state.collapsibleOpen ? (<i class="fa fa-angle-down"></i>) : (<i class="fa fa-angle-up"></i>)}
          How are ratings calculated ?</a>
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
                    <td class="padding-on-right">{key}</td>
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
          <a onClick={(event) => this.toggleFeatureCollapsible(event)}> {!this.state.featureToggleOpen ? (<i class="fa fa-angle-down"></i>) : (<i class="fa fa-angle-up"></i>)}
            {!this.state.featureToggleOpen ? 'See more' : 'See Less'}</a>
        </div>
        <div><hr /></div>

      </div>
    );

  };

}

export default SummaryByFeature;