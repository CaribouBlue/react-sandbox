import React from 'react';
import GoogleMap from './GoogleMap';

export default () => {
  const exampleMarkers = [
    {
      position: 'Australia',       
        // Cord Obj; or Address String
      label: '',           
        // String
      title: '',          
        // String
      animation: 'drop',  
        // String = 'drop', 'bounce'; or null
      onClick: () => {},  
        // Function
    },
  ];

  const exampleContainerStyle = {
    display: 'flex',
    width: '100vw',
    justifyContent: 'center',
  };

  const exampleMapStyle = {
    borderRadius: '100%',
  };

  return (
    <div>
      <GoogleMap
        apiKey={'AIzaSyBQ7ZDAvEChRLH4lKfwER1ONGUIQ78Th5M'}    
          // *String: google provided API key
        center={null}                   
          // Obj: { lat: Number, lng: Number }; Default = {lat: -25.363, lng: 131.044}
        zoom={null}                     
          // Number: 1 - 20; Default = 3
        markers={exampleMarkers}               
          // Array: [Marker Objects]
        dimensions={null}               
          // Array: [width (String), height (String)]; Default = ['500px', '500px']
        containerStyle={exampleContainerStyle} 
          // Object: style for div around the map
        containerClassName={null}         
          // String: class name for div around the map
        mapStyle={exampleMapStyle}                   
          // Object: style for map
        mapClassName={null}               
          // String: class name for map
        onIdle={null}   
          // Function(map, markers)
      />
      <div
        style={{
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          marginTop: '20px',
          flexDirection: 'column',
          fontWeight: 'bold',
        }}
      >
        <p>The Code:</p>
        <img src="/code-ex.png" />
      </div>
    </div>
  );
}
