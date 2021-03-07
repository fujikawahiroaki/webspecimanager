import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react'


export function LeafletCoordinateInput() {
    const [longitude, setLongitude] = useState(139.774473);
    const [latitude, setLatitude] = useState(35.702258);
    const [elevation, setElevation] = useState(0);

    const GetElv = (lng, lat) => {
        fetch(`https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php?lon=${lng}&lat=${lat}&outtype=JSON`)
            .then(response => {
            return response.json().then(elv => {
                setElevation(elv.elevation);
            });
        });
    }

    const GetCoodinate = () => {
        const map = useMapEvents({
            click: (e) => {
                setLongitude(e.latlng.lng.toFixed(6));
                setLatitude(e.latlng.lat.toFixed(6));
                GetElv(e.latlng.lng, e.latlng.lat);
            },
        })
        return null
    };

    return (
        <div>
            <Typography variant='h5'>座標入力補助マップ</Typography>
            <Typography>座標を指定したい位置をクリックしてください</Typography>
            <Typography>経度・緯度が更新されますので、下の入力欄にコピペしてください</Typography>
            <Typography>標高の取得は現時点では日本国内にのみ対応しております</Typography>
            <Typography>経度: {longitude} 緯度: {latitude} 標高: {elevation}</Typography>
            <MapContainer center={[35.7022589, 139.7744733]} zoom={4} scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
                <GetCoodinate />
            </MapContainer>
        </div>
    );
}

export default LeafletCoordinateInput;