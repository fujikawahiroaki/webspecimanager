import GoogleMapReact from 'google-map-react';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react'


export function GoogleMapsInput() {
  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  const [longitude, setLongitude] = useState(139.7744733);
  const [latitude, setLatitude] = useState(35.7022589);

  const setLatLng = ({ x, y, lat, lng, event }) => {
    setLongitude(lng.toFixed(6));
    setLatitude(lat.toFixed(6));
  };

  return (
    <div style={{ height: '500px', width: '800px', marginBottom: '200px'}}>
      <Typography>座標を指定したい位置をクリックしてください</Typography>
      <Typography>経度・緯度が更新されますので、下の入力欄にコピペしてください</Typography>
      <Typography>現在API設定の都合で最初にエラーポップアップが表示され薄暗い画面になってしまいます。</Typography>
      <Typography>ご不便をおかけして申し訳ございません。</Typography>
      <Typography>経度: {longitude} 緯度: {latitude}</Typography>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAP_API_KEY }}
        defaultCenter={defaultLatLng}
        defaultZoom={10}
        onClick={setLatLng}
      />
    </div>
  );
}

export default GoogleMapsInput;