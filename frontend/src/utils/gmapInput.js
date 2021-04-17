import GoogleMapReact from 'google-map-react';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'react-admin';


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


function copyToClipboard(text) {
  const pre = document.createElement('pre');
  pre.style.userSelect = 'auto';
  pre.textContent = text;
  document.body.appendChild(pre);
  document.getSelection().selectAllChildren(pre);
  const result = document.execCommand('copy');
  document.body.removeChild(pre);
  return result;
}


export function GoogleMapsInput() {
  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  const [longitude, setLongitude] = useState(139.7744733);
  const [latitude, setLatitude] = useState(35.7022589);
  const [elevation, setElevation] = useState(0);
  const classes = useStyles();

  const getElv = (latlng) => {
    const google = window.google
    var locations = [latlng];
    var elevation = new google.maps.ElevationService();
    elevation.getElevationForLocations({
      locations: locations
    }, function (results, status) {
      if (status == google.maps.ElevationStatus.OK) {
        if (results[0].elevation) {
          var elevation = results[0].elevation;
          setElevation(elevation.toFixed(1));
        }
      };
    });
  }

  const setLatLngElv = ({ x, y, lat, lng, event }) => {
    setLongitude(lng.toFixed(6));
    setLatitude(lat.toFixed(6));
    getElv({ lat: lat, lng: lng });
  };

  const copyLongitude = () => { copyToClipboard(longitude) };
  const copyLatitude = () => { copyToClipboard(latitude) };
  const copyElevation = () => { copyToClipboard(elevation) };

  return (
    <div style={{ height: '500px', width: '800px', marginBottom: '200px' }}>
      <Typography>座標を指定したい位置をクリックしてください</Typography>
      <Typography>経度・緯度が更新されますので、下の入力欄にコピペしてください</Typography>
      <Typography>経度: {longitude} 緯度: {latitude} 標高: {elevation}</Typography>
      <Button label="経度をクリップボードにコピー" onClick={copyLongitude} variant="contained" color="primary" size="small" className={classes.margin} />
      <Button label="緯度をクリップボードにコピー" onClick={copyLatitude} variant="contained" color="primary" size="small" className={classes.margin} />
      <Button label="標高をクリップボードにコピー" onClick={copyElevation} variant="contained" color="primary" size="small" className={classes.margin} />
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAP_API_KEY }}
        defaultCenter={defaultLatLng}
        defaultZoom={4}
        onClick={setLatLngElv}
      />
    </div>
  );
}

export default GoogleMapsInput;