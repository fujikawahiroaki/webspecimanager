import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useDataProvider, useQuery, Loading, Error, useAuthState, useGetList } from 'react-admin';
import { PieChart, Cell, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const theme = {
    spacing: 8,
}


const TaxonGraph = () => {
    const dataProvider = useDataProvider();
    const [specimenPercentage, setSpecimenPercentage] = useState([{ family: "?", percentage: 100, count: 0 }]);
    const [selectTaxon, setSelectTaxon] = useState("family");
    const [collections, setCollections] = useState([]);
    const [targetCollection, setTargetCollection] = useState('')
    const [isAll, setIsAll] = useState(true);
    const COLORS = ['#800080', '#008b8b', '#6b8e23', '#ff7f50', '#778899', '#006400', '#ff8c00', '#lightpink', '#191970', '#f08080', '#8b4513'];
    useEffect(() => {
        dataProvider.getSpecimenPercentage('specimens/own-specimens', { target_taxon: selectTaxon, target_collection: targetCollection, is_all: isAll })
            .then(({ data }) => {
                setSpecimenPercentage(data.data);
            })
            .catch(error => {
                setSpecimenPercentage([{ family: "?", percentage: 100, count: 0 }]);
            })
        dataProvider.getInstitutionCodes('collection-settings/own-collection-settings')
            .then(({ data }) => {
                setCollections(data.data)
            })
            .catch(error => {
                setCollections([])
            })
    }, [selectTaxon, isAll, targetCollection])
    const taxonHandleChange = (event) => {
        setSelectTaxon(event.target.value);
    };
    const collectionHandleChange = (event) => {
        if (event.target.value == "all") {
            setTargetCollection('');
            setIsAll(true);
        } else {
            setTargetCollection(event.target.value);
            setIsAll(false);
        };
    };
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}%  標本数${payload[0].payload.payload.count}`}</label>
                </div>
            );
        }
        return null;
    };
    const renderLegend = (props) => {
        const { payload } = props;
        return (
            <ul>
                {
                    payload.map((entry, index) => (
                        <font color={entry.color}>
                            <li key={`item-${index}`}>{index + 1}: {entry.value} {entry.payload.percentage}％ 標本数{entry.payload.count}</li>
                        </font>
                    ))
                }
            </ul>
        );
    }
    return (
        <div>
            <Typography variant='h5'>所持タクソン割合グラフ</Typography>
            <Typography>指定コレクション内の標本数における指定分類階級(属以上)の各タクソンの割合(％)を可視化します</Typography>
            <Typography>上位10タクソンのみが表示され、11位以降はOtherにまとめられます</Typography>
            <Typography>グラフ上の各項目にマウスポインタをあてると、タクソン名と割合と標本数が表示されます</Typography>
            <Typography>　</Typography>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    分類階級の指定
                </InputLabel>
                <NativeSelect
                    defaultValue={"family"}
                    inputProps={{
                        name: 'taxon',
                        id: 'uncontrolled-native',
                    }}
                    onChange={taxonHandleChange}
                >
                    <option value={"kingdom"}>界</option>
                    <option value={"phylum"}>門</option>
                    <option value={"class_name"}>綱</option>
                    <option value={"order"}>目</option>
                    <option value={"suborder"}>亜目</option>
                    <option value={"family"}>科</option>
                    <option value={"subfamily"}>亜科</option>
                    <option value={"tribe"}>族</option>
                    <option value={"subtribe"}>亜族</option>
                    <option value={"genus"}>属</option>
                </NativeSelect>
            </FormControl>
            <Typography>　</Typography>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    コレクションの指定
                </InputLabel>
                <NativeSelect
                    defaultValue={''}
                    inputProps={{
                        name: 'collection',
                        id: 'uncontrolled-native',
                    }}
                    onChange={collectionHandleChange}
                >
                    <option value={"all"}>すべて</option>
                    {
                        collections.map(institution_code =>
                            <option value={institution_code}>{institution_code}</option>)
                    }
                </NativeSelect>
            </FormControl>
            <div style={{ width: '100%', height: 600 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={600} height={600}>
                        <Pie
                            dataKey="percentage"
                            nameKey="taxon"
                            isAnimationActive={false}
                            data={specimenPercentage}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                        >
                            {
                                specimenPercentage.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={renderLegend} layout="vertical" verticalAlign="middle" align="left"/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
};


const CollectPointGraph = () => {
    const dataProvider = useDataProvider();
    const [collectPointPercentage, setCollectPointPercentage] = useState([{ place: "?", percentage: 100, count: 0}]);
    const [selectPlace, setSelectPlace] = useState("collect_point_info__state_provice");
    const [collections, setCollections] = useState([]);
    const [targetCollection, setTargetCollection] = useState('')
    const [isAll, setIsAll] = useState(true);
    const COLORS = ['#800080', '#008b8b', '#6b8e23', '#ff7f50', '#778899', '#006400', '#ff8c00', '#lightpink', '#191970', '#f08080', '#8b4513'];
    useEffect(() => {
        dataProvider.getCollectPointPercentage('specimen/own-specimens', {target_place: selectPlace, target_collection: targetCollection, is_all: isAll})
        .then(({ data }) => {
            setCollectPointPercentage(data.data);
        }).catch(error => {
            setCollectPointPercentage([{ place: "?", percentage: 100, count: 0}])
        })
        dataProvider.getInstitutionCodes('collection-settings/own-collection-settings')
            .then(({ data }) => {
                setCollections(data.data)
            })
            .catch(error => {
                setCollections([])
            })
    }, [selectPlace, isAll, targetCollection])
    const placeHandleChange = (event) => {
        setSelectPlace(event.target.value);
    };
    const collectionHandleChange = (event) => {
        if (event.target.value == "all") {
            setTargetCollection('');
            setIsAll(true);
        } else {
            setTargetCollection(event.target.value);
            setIsAll(false);
        };
    };
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}%  標本数${payload[0].payload.payload.count}`}</label>
                </div>
            );
        }
        return null;
    };
    const renderLegend = (props) => {
        const { payload } = props;
        return (
            <ul>
                {
                    payload.map((entry, index) => (
                        <font color={entry.color}>
                            <li key={`item-${index}`}>{index + 1}: {entry.value} {entry.payload.percentage}％ 標本数{entry.payload.count}</li>
                        </font>
                    ))
                }
            </ul>
        );
    }
    return (
        <div>
            <Typography variant='h5'>採集地割合グラフ</Typography>
            <Typography>指定コレクション内の標本数における採集地の割合(％)を可視化します</Typography>
            <Typography>上位10採集地のみが表示され、11位以降はOtherにまとめられます</Typography>
            <Typography>グラフ上の各項目にマウスポインタをあてると、採集地名と割合と標本数が表示されます</Typography>
            <Typography>現時点では市名以下の詳細地名の分解に対応しておらず、市町村単位での割合表示ができません</Typography>
            <Typography>今後改善予定ですので、ご迷惑おかけしますがもうしばらくお待ちください</Typography>
            <Typography>　</Typography>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    地名階級の指定
                </InputLabel>
                <NativeSelect
                    defaultValue={"collect_point_info__state_provice"}
                    inputProps={{
                        name: 'place',
                        id: 'uncontrolled-native',
                    }}
                    onChange={placeHandleChange}
                >
                    <option value={"collect_point_info__country"}>国</option>
                    <option value={"collect_point_info__contient"}>大陸</option>
                    <option value={"collect_point_info__island_group"}>島群</option>
                    <option value={"collect_point_info__island"}>島</option>
                    <option value={"collect_point_info__state_provice"}>県(州)</option>
                    <option value={"collect_point_info__county"}>海外における群・区</option>
                    <option value={"collect_point_info__municipality"}>市名以下の詳細地名</option>
                    <option value={"collect_point_info__japanese_place_name"}>日本語地名(ラベル用)</option>
                    <option value={"collect_point_info__japanese_place_name_detail"}>日本語地名(詳細)</option>
                </NativeSelect>
            </FormControl>
            <Typography>　</Typography>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    コレクションの指定
                </InputLabel>
                <NativeSelect
                    defaultValue={''}
                    inputProps={{
                        name: 'collection',
                        id: 'uncontrolled-native',
                    }}
                    onChange={collectionHandleChange}
                >
                    <option value={"all"}>すべて</option>
                    {
                        collections.map(institution_code =>
                            <option value={institution_code}>{institution_code}</option>)
                    }
                </NativeSelect>
            </FormControl>
            <div style={{ width: '100%', height: 600 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={600} height={600}>
                        <Pie
                            dataKey="percentage"
                            nameKey="place"
                            isAnimationActive={false}
                            data={collectPointPercentage}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                        >
                            {
                                collectPointPercentage.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={renderLegend} layout="vertical" verticalAlign="middle" align="left"/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
};


export default () => {
    const { loading, authenticated } = useAuthState();
    if (loading || !localStorage.hasOwnProperty('wsat')) {
        return (
            <div>ログイン情報を読み込み中です.........</div>
        )
    }
    if (authenticated && localStorage.hasOwnProperty('wsat')) {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="WebSpecimanager" />
                        <CardContent>ようこそ</CardContent>
                        <CardContent>必ず<a href="https://www.webspecimanager.net/manual/" target="_blank" rel="noopener">マニュアル</a>をお読みになってからご利用ください</CardContent>
                        <CardContent>現時点ではSafariブラウザではラベルPDF生成機能がご利用頂けません。またInternet Explorerおよび旧型Edgeはサポートしておりません。Google Chrome、FireFox、Edge(新型)のいずれかからご利用ください。</CardContent>
                        <CardContent>現時点ではモバイル版では表示が崩れます。お手数ですが、当面はスマホからのご利用の際もPC版で表示するようお願いいたします。</CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <TaxonGraph />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <CollectPointGraph />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
};