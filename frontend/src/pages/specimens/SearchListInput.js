import * as React from 'react';
import { useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDataProvider, useInput, SelectInput, useRecordContext } from 'react-admin';


export const SearchListInput = props => {
    const dataProvider = useDataProvider();
    const [genus, setGenus] = useState('');
    const [species, setSpecies] = useState('');
    const [subSpecies, setSubspecies] = useState('');
    const [japaneseName, setJapaneseName] = useState('');
    const [taxonList, setTaxonList] = useState([]);
    const [searchStateLabel, setSearchStateLabel] = useState('検索結果')
    const [currentName, setCurrentName] = useState('')
    const {
        input,
        meta: { touched, error }
    } = useInput(props);
    const record = useRecordContext(props);
    useEffect(() => {
        if (record.record.hasOwnProperty('default_taxon_info')) {
            if (record.record.default_taxon_info) {
                dataProvider.getOne('taxa/shared-taxa', {
                    id: record.record.default_taxon_info
                })
                    .then(({ data }) => {
                        setCurrentName(`現在のデータ: ${data.scientific_name}`);
                    })
                    .catch(error => {
                        setCurrentName('')
                    })
            }
        }
    }, [])
    const searchButtonHandleChange = () => {
        setSearchStateLabel('読み込み中...')
        dataProvider.getList('taxa/shared-taxa', {
            pagination: { page: 1, perPage: 1000 },
            sort: { field: genus, order: 'ASC' },
            filter: { genus: genus, species: species, subspecies: subSpecies, japanese_name: japaneseName },
        })
            .then(({ data }) => {
                setTaxonList(data);
                setSearchStateLabel('読み込み完了');
            })
            .catch(error => {
                setTaxonList([]);
            })
    }
    return (
        <div>
            &nbsp;
            <Typography variant='h6'>{props.label}</Typography>
            <Typography>属・種・亜種・和名のいずれか(組み合わせ入力可能)から検索し、検索結果リストから選択してください</Typography>
            <Typography>部分一致で検索されます 検索結果は最大1000件まで表示されます</Typography>
            <Typography>{currentName}</Typography>
            <FormControl>
                <TextField onChange={(event) => setGenus(event.target.value)} label='属' variant="filled" size="small" />
                <TextField onChange={(event) => setSpecies(event.target.value)} label='種' variant="filled" size="small" />
                <TextField onChange={(event) => setSubspecies(event.target.value)} label='亜種' variant="filled" size="small" />
                <TextField onChange={(event) => setJapaneseName(event.target.value)} label='和名' variant="filled" size="small" />
                <Button onClick={searchButtonHandleChange} variant="contained">検索</Button>
                <SelectInput
                    source={props.source}
                    resettable={true}
                    defaultValue={null}
                    allowEmpty={true}
                    label={searchStateLabel}
                    helperText='検索結果から選択してください'
                    choices={taxonList.map(taxon => { return { id: taxon.id, name: taxon.scientific_name } })} />
            </FormControl>
        </div>
    )
};

export default SearchListInput;