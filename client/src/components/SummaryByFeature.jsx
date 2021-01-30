import React from 'react';

class SummaryByFeature extends React.Component {
  render() {
    return (
      <div>
        <div>How are rating calculated?</div>
        <div>---------------------------</div>
        <div>By feature</div>
        <div>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>Alexa Integration</td>
                <td>*****</td>
                <td>4.6</td>
              </tr>
              <tr>
                <td>Voice Recognition</td>
                <td>*****</td>
                <td>4.1</td>
              </tr>
            </tbody>

          </table>
        </div>

      </div>
    );

  };

}

export default SummaryByFeature;