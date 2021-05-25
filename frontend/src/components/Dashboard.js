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
import { useDataProvider, useQuery, Loading, Error, useAuthState } from 'react-admin';
import { PieChart, Cell, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const theme = {
    spacing: 8,
}


const TaxonGraph = () => {
    const dataProvider = useDataProvider();
    const [specimenPercentage, setSpecimenPercentage] = useState([{ family: "?", percentage: 100 }]);
    const [selectTaxon, setSelectTaxon] = useState("family")
    const COLORS = ['#800080', '#008b8b', '#6b8e23', '#ff7f50', '#778899', '#006400', '#ff8c00', '#lightpink', '#191970', '#f08080', '#8b4513'];
    useEffect(() => {
        dataProvider.getSpecimenPercentage('specimens/own-specimens', { target_taxon: selectTaxon, target_collection: 'FHC', is_all: 'true' })
            .then(({ data }) => {
                setSpecimenPercentage(data.data);
            })
            .catch(error => {
                setSpecimenPercentage([{ family: "?", percentage: 100 }]);
            })
    }, [selectTaxon])
    const handleChange = (event) => {
        setSelectTaxon(event.target.value);
    };
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }
        return null;
    };
    return (
        <div>
            <Typography variant='h5'>所持タクソングラフ</Typography>
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
                    onChange={handleChange}
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
                    <option value={"subgenus"}>亜属</option>
                    <option value={"species"}>種</option>
                    <option value={"subspecies"}>亜種</option>
                </NativeSelect>
            </FormControl>
            <div style={{ width: '100%', height: 500 }}>
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
                            label
                        >
                            {
                                specimenPercentage.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Tooltip content={<CustomTooltip />}/>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
};


export default () => {
    const { loading, authenticated } = useAuthState();
    if (loading) {
        return (
            <div>ログイン情報を読み込み中です.........</div>
        )
    }
    if (authenticated) {
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
            </Grid>
        );
    }
};