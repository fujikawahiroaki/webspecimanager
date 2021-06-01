import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDataProvider, useGetList, useQuery, Loading, Error, useAuthState } from 'react-admin';
import { PieChart, Cell, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';


export const SearchListInput = () => {
    const dataProvider = useDataProvider();
    const [targetName, setTargetName] = useState("");
    const [targetTaxon, setTargetTaxon] = useState("japanese_name")
    const [taxonList, setTaxonList] = useState([]);
    const searchButtonHandleChange = () => {
        dataProvider.getList('taxa/shared-taxa', {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'genus', order: 'ASC' },
            filter: { genus: targetName },
        })
        .then(({ data }) => {
            console.log(data);
        })
        .catch(error => {
            setTaxonList([]);
            console.log("エラー")
        })
    }
    return (
        <div>
            <TextField onChange={(event) => setTargetName(event.target.value)} />
            <Button onClick={searchButtonHandleChange} variant="contained">検索</Button>
        </div>
    )
};

export default SearchListInput;