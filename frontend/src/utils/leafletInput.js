import 'leaflet/dist/leaflet.css';
import "leaflet-geosearch/dist/geosearch.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button, getFormInitialValues } from 'react-admin';
import React, { useState, useEffect } from 'react'
import get from 'lodash/get'
import L from 'leaflet';


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


export function LeafletCoordinateInput({ record={}, source}) {
    const GetElv = (lng, lat) => {
        fetch(`https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php?lon=${lng}&lat=${lat}&outtype=JSON`)
            .then(response => {
                return response.json().then(elv => {
                    if (elv.elevation === '-----') {
                        setElevation(elv.elevation);
                    } else {
                        setElevation(elv.elevation.toFixed(0));
                    };
                });
            });
    }
    var initialLongitude = 139.774473;
    var initialLatitude = 35.702258;
    var initialElevation = 2.8;
    var initialZoom = 4
    if (get(record, source)) {
        initialLongitude = get(record, source)["longitude"];
        initialLatitude = get(record, source)["latitude"];
        initialElevation = '地図をクリックすると取得できます'
        initialZoom = 15;
    };
    const [longitude, setLongitude] = useState(initialLongitude);
    const [latitude, setLatitude] = useState(initialLatitude);
    const [elevation, setElevation] = useState(initialElevation);
    const classes = useStyles();
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
    const SearchControl = (props) => {
        const map = useMap();
        map.on('geosearch/showlocation',
            function (e) {
                setLongitude(e.location.x.toFixed(6));
                setLatitude(e.location.y.toFixed(6));
                GetElv(e.location.x, e.location.y)
                map.setView({ lat: e.location.y, lon: e.location.x }, 15)
            });
        const provider = new OpenStreetMapProvider();
        useEffect(() => {
            const searchControl = new GeoSearchControl({
                provider,
                ...props
            });
            map.addControl(searchControl);
            return () => map.removeControl(searchControl);
        }, [props]);
        return null;
    };
    const defaultMarker = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=';
    const defaultMarkerShadow = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC';
    var defaultIcon = new L.Icon({
        iconUrl: defaultMarker,
        iconAnchor: [12, 41],
        shadowUrl: defaultMarkerShadow,
    });
    const copyLongitude = () => { copyToClipboard(longitude) };
    const copyLatitude = () => { copyToClipboard(latitude) };
    const copyElevation = () => { copyToClipboard(elevation) };
    return (
        <span>
            <Typography variant='h5'>座標入力補助マップ</Typography>
            <Typography>座標を指定したい位置をクリックしてください</Typography>
            <Typography>経度・緯度が更新されますので、下の入力欄にコピペしてください</Typography>
            <Typography>標高の取得は現時点では日本国内にのみ対応しております</Typography>
            <Typography>　</Typography>
            <Typography>経度: {longitude} 緯度: {latitude} 標高: {elevation}</Typography>
            <Button label="経度をクリップボードにコピー" onClick={copyLongitude} variant="contained" color="primary" size="small" className={classes.margin} />
            <Button label="緯度をクリップボードにコピー" onClick={copyLatitude} variant="contained" color="primary" size="small" className={classes.margin} />
            <Button label="標高をクリップボードにコピー" onClick={copyElevation} variant="contained" color="primary" size="small" className={classes.margin} />
            <MapContainer center={[initialLatitude, initialLongitude]} zoom={initialZoom} scrollWheelZoom={true} style={{ height: "50vh" }} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
                <SearchControl
                    showMarker={false}
                    showPopup={false}
                    maxMarkers={1}
                    retainZoomLevel={true}
                    animateZoom={true}
                    autoClose={false}
                    searchLabel={"地名を入力してください"}
                    keepResult={true}
                />
                <Marker position={[latitude, longitude]} icon={defaultIcon}>
                </Marker>
                <GetCoodinate />
            </MapContainer>
        </span>
    );
}

export default LeafletCoordinateInput;