import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { LeafletCoordinateInput } from '../../utils/leafletInput';


export const SideMap = ({ record }) => (
    <Card style={{ width: '40vw', margin: '1em' }}>
        <CardContent>
            {record && (
                <LeafletCoordinateInput record={record} source="location" />
            )}
        </CardContent>
    </Card>
);


export default SideMap;