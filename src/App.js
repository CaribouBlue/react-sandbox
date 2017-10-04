import React, { Component } from 'react';
import DragBox from './drag/DragBox';
import GlobalMapView from './gmaps-component/GlobalMapView';

class App extends Component {
  render() {
    return (
      <div>
        <GlobalMapView />
      </div>
    );
  }
}

export default App;
