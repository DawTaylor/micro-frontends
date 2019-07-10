import React, { Component } from 'react';
import propTypes from 'prop-types';

import { GreenRecos } from './GreenRecos';

import { recos } from './recos';

export default class App extends Component {
  render() {
    const { sku } = this.props;
    const reco = recos[sku || 't_porsche'];
    return (
      <div>
        <h1>teste</h1>
        <GreenRecos reco={reco} />
      </div>
    )
  }
}

App.defaultProps = {
  sku: 't_porsche',
}

App.propTypes = {
  sku: propTypes.string,
}