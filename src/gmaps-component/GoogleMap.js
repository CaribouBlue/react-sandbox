import React from 'react';
import { cordsFromAddress } from './helpers';

export default class extends React.Component {
  constructor(props) {
    super(props);
    
    this.allMarkers = [];

    this.state = {
      center: null,
      markers: this.props.markers || [],
      zoom: this.props.zoom || 3,
    };
  }

  componentWillMount() {
    // set a map center on the state
    this.setCenter();
  }

  componentDidMount() {
    // Create google map
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: this.state.zoom,
      center: this.state.center,
    });
    // If onIdle prop was given ... set map idle listener 
    if (this.props.onIdle)
      window.google.maps.event.addListener(this.map, 'idle', () =>
        this.props.onIdle(this.map, this.allMarkers)
      );
    // Add markers to map
    this.setMarkers();
  }

  componentDidUpdate(prevProps, prevState) {
    // if map props have changed ... then update the state to reflect changes
    if (JSON.stringify(this.props) !== JSON.stringify(prevProps)) {
      this.setState({
        markers: this.props.markers || [],
        zoom: this.props.zoom || 3,
      });
      this.setCenter();
    }

    //if the state has changed ... then update the map to reflect changes
    if (JSON.stringify(this.state) !== JSON.stringify(prevState)) {
      //handle zoom changes
      if (this.map.getZoom() !== this.state.zoom)
        this.map.setZoom(this.state.zoom);
      //handle center changes
      if (JSON.stringify(prevState.center) !== JSON.stringify(this.state.center))
        this.map.panTo(this.state.center);
      //handle changes to markers (can only add markers)
      if (JSON.stringify(this.state.markers) !== JSON.stringify(prevState.markers))
        this.setMarkers();
    }
  }

  setCenter() {
    // if a center has been provided ... 
    if (this.props.center) {
      // if it is a string address ...
      if (typeof this.props.center === 'string') {
        // convert string address to cords obj and set state
        cordsFromAddress(this.props.center, this.props.apiKey)
          .then(cords => {
            console.log(cords);
            this.setState({ center: cords });
          });
      } else {
        // else set state
        this.setState({ center: this.props.center });
      }
    } else {
      //else set state with default
      this.setState({ center: {lat: -25.363, lng: 131.044} });
    }
  }

  setMarkers() {
    this.state.markers.forEach((marker, i) => {
      // check the type of position entered ... if string it is an address
      if (typeof marker.position === 'string') {
        // Convert address string into cords obj
        cordsFromAddress(marker.position, this.props.apiKey)
          .then(cords => {
            marker.position = cords;
            //set the marker
            this.setMarker(marker);
          })
      // ... if it is an object then the position is cordinates
      } else if (typeof marker.position === 'object'){
        // set the marker
        this.setMarker(marker);      
      }
    });
  }

  setMarker(marker) {
    // Create new marker on map
    const m = new window.google.maps.Marker({
      position: marker.position,
      animation:
        marker.animation === 'drop' ?
          window.google.maps.Animation.DROP :
            marker.animation === 'bounce' ?
              window.google.maps.Animation.BOUNCE : null,
      title: marker.title,
      label: marker.label,
      map: this.map,
      icon: marker.icon,
    });
    // Add click event listener to marker
    window.google.maps.event.addListener(m, 'click', marker.onClick);
    // Add marker to Array of all markers
    this.allMarkers.push(m);
  }

  render() {
    return (
      <div
        style={this.props.containerStyle}
        className={this.props.containerClassName}
      >
        <div
          id='map'
          style={{
            width: this.props.dimensions ? this.props.dimensions[0] : '500px',
            height: this.props.dimensions ? this.props.dimensions[1] : '500px',
            ...this.props.mapStyle,
          }}
          className={this.props.mapClassName}
        >
        </div>
      </div>
    );
  }
}
