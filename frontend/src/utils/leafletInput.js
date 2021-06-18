import 'leaflet/dist/leaflet.css';
import "leaflet-geosearch/dist/geosearch.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button, getFormInitialValues, useDataProvider } from 'react-admin';
import React, { useState, useEffect } from 'react'
import { toHebon, toZenKana, toHiragana } from 'jaconv'
import get from 'lodash/get'
import L from 'leaflet';
import { MUNI_ARRAY } from './muni';
import { result } from 'lodash';

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


export function LeafletCoordinateInput({ record = {}, source }) {
    const dataProvider = useDataProvider();
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
    const deleteAza = (name) => {
        if (name[0] === "字") {
            return name.slice(1);
        } else {
            return name.replace("大字", "");
        };
    };
    const GetPlaceName = (lng, lat) => {
        fetch(`https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lng}`)
            .then(response => {
                return response.json().then(results => {
                    if (results.hasOwnProperty('results')) {
                        var muniCd = results.results.muniCd;
                        if (muniCd[0] === "0") {
                            muniCd = muniCd.slice(1);
                        };
                        const names = {
                            "pref": MUNI_ARRAY[muniCd].split(',')[1],
                            "city": MUNI_ARRAY[muniCd].split(',')[3],
                            "munic": deleteAza(results.results.lv01Nm)
                        }
                        setPlaceName(`${names["pref"]} ${names["city"]} ${names["munic"]}`)
                        dataProvider.getReverceZipCode('collect-points/own-collect-points', { for_reverce_zipcode: `${names["city"]}${names["munic"]}`, filter: {} })
                            .then(({ data }) => {
                                try {
                                    const checkName = (components) => {
                                        if (components[1].includes(names["city"]) && names["munic"].includes(components[2])) {
                                            return true;
                                        } else {
                                            return false;
                                        };
                                    };
                                    const searchResult = data.data.items.find(item => checkName(item.components));
                                    setPlaceName(`${names["pref"]} ${names["city"]} ${names["munic"]}`)
                                    setCityKana(toHiragana(toZenKana(searchResult.componentskana[1])));
                                    setMunicKana(toHiragana(toZenKana(searchResult.componentskana[2])));
                                } catch (e) {
                                    const checkName = (components) => {
                                        if (components[1].includes(names["city"])) {
                                            return true;
                                        } else {
                                            return false;
                                        };
                                    };
                                    const searchResult = data.data.items.find(item => checkName(item.components));
                                    setPlaceName(`${names["pref"]} ${names["city"]} ${names["munic"]}`)
                                    setCityKana(toHiragana(toZenKana(searchResult.componentskana[1])));
                                    setMunicKana("詳細地名の読みがなが取得できませんでした");
                                };
                            })
                            .catch(error => {
                                setCityKana("市町村名の読みがなが取得できませんでした")
                                setMunicKana("詳細地名の読みがなが取得できませんでした")
                            })
                    } else {
                        setPlaceName("地名を取得できませんでした")
                        setCityKana("市町村名の読みがなが取得できませんでした")
                        setMunicKana("詳細地名の読みがなが取得できませんでした")
                    };
                });
            });
    }
    var initialLongitude = 139.774473;
    var initialLatitude = 35.702258;
    var initialElevation = 2.8;
    var initialPlaceName = "東京都大東区秋葉原";
    var initialCityKana = "たいとうく";
    var initialMunicKana = "あきはばら"
    var initialZoom = 4;
    if (get(record, source)) {
        initialLongitude = get(record, source)["longitude"];
        initialLatitude = get(record, source)["latitude"];
        initialPlaceName = get(record, source)["state_provice"] + get(record, source)["municipality"];
        initialElevation = '地図をクリックすると取得できます'
        initialZoom = 15;
    };
    const [longitude, setLongitude] = useState(initialLongitude);
    const [latitude, setLatitude] = useState(initialLatitude);
    const [elevation, setElevation] = useState(initialElevation);
    const [placeName, setPlaceName] = useState(initialPlaceName);
    const [cityKana, setCityKana] = useState(initialCityKana);
    const [municKana, setMunicKana] = useState(initialMunicKana);
    const classes = useStyles();
    useEffect(() => {
        GetPlaceName(longitude, latitude);
    }, [longitude, latitude]);
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
                GetElv(e.location.x, e.location.y);
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
    const CityToHebon = (name) => {
        if (name === "市町村名の読みがなが取得できませんでした") {
            return "ローマ字化できませんでした"
        } else {
            var cityName = toHebon(name);
            if (cityName.slice(-3) === 'SHI') {
                cityName = cityName.slice(0, -3) + '-SHI';
            } else if (cityName.slice(-3) === 'CHO') {
                cityName = cityName.slice(0, -3) + '-CHŌ';
            } else if (cityName.slice(-5) === 'MACHI') {
                cityName = cityName.slice(0, -5) + '-MACHI';
            } else if (cityName.slice(-4) === 'MURA') {
                cityName = cityName.slice(0, -4) + '-MURA';
            } else if (cityName.slice(-3) === 'SON') {
                cityName = cityName.slice(0, -3) + '-SON';
            } else if (cityName.slice(-2) === 'KU') {
                cityName = cityName.slice(0 ,-2) + '-KU';
            };
            return cityName.charAt(0) + cityName.slice(1).toLowerCase();
        };
    };
    const MunicToHebon = (name) => {
        if (name === "詳細地名の読みがなが取得できませんでした") {
            return "ローマ字化できませんでした"
        } else {
            return toHebon(name).charAt(0) + toHebon(name).slice(1).toLowerCase();
        };
    };
    const copyLongitude = () => { copyToClipboard(longitude) };
    const copyLatitude = () => { copyToClipboard(latitude) };
    const copyElevation = () => { copyToClipboard(elevation) };
    const copyPlaceName = () => { copyToClipboard(placeName) };
    const copyCity = () => {copyToClipboard(CityToHebon(cityKana))};
    const copyMunic = () => {copyToClipboard(MunicToHebon(municKana))};
    const copyCityMunic = () => {copyToClipboard(`${CityToHebon(cityKana)}, ${MunicToHebon(municKana)}`)}
    return (
        <span>
            <Typography variant='h5'>地点情報入力補助マップ</Typography>
            <Typography>情報を取得したい地点をクリックしてください</Typography>
            <Typography>標高および地名の取得は現時点では日本国内にのみ対応しております</Typography>
            <Typography>読みがなおよびローマ字の取得はエラーが起きやすいです</Typography>
            <Typography>詳細地名の読みがなおよびローマ字には「群」「町」などが含まれますが、その切り出し・分割が現時点ではできておりませんので、お手数おかけしますがコピペ後に調整お願いいたします</Typography>
            <Typography>　</Typography>
            <Typography>経度: {longitude} 緯度: {latitude} 標高: {elevation}</Typography>
            <Typography>地名: {placeName}</Typography>
            <Typography>市町村名の読みがな: {cityKana}</Typography>
            <Typography>詳細地名の読みがな: {municKana}</Typography>
            <Typography>市町村名のヘボン式ローマ字: {CityToHebon(cityKana)}</Typography>
            <Typography>詳細地名のヘボン式ローマ字: {MunicToHebon(municKana)}</Typography>
            <Typography>地名のヘボン式ローマ字(カンマ区切り連結): {CityToHebon(cityKana)}, {MunicToHebon(municKana)}</Typography>
            <Button label="経度をコピー" onClick={copyLongitude} variant="contained" color="primary" size="small" className={classes.margin} />
            <Button label="緯度をコピー" onClick={copyLatitude} variant="contained" color="primary" size="small" className={classes.margin} />
            <Button label="標高をコピー" onClick={copyElevation} variant="contained" color="primary" size="small" className={classes.margin} />
            <Button label="地名をコピー" onClick={copyPlaceName} variant="contained" color="primary" size="small" className={classes.margin} />
            <Button label="市町村名(ローマ字)をコピー" onClick={copyCity} variant="contained" color="primary" size="small" className={classes.margin} />
            <Button label="詳細地名(ローマ字)をコピー" onClick={copyMunic} variant="contained" color="primary" size="small" className={classes.margin} />
            <Button label="地名のローマ字(カンマ区切り)をコピー" onClick={copyCityMunic} variant="contained" color="primary" size="small" className={classes.margin} />
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