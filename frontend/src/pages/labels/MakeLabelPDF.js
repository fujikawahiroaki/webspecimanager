import * as React from 'react';
import {
    Button,
    useMutation, Loading, Error
} from 'react-admin';


export const MakePDFButton = ({ record }) => {
    const [mutate, { loading }] = useMutation();
    const pdfLink = event => mutate({
        type: 'getLabelPdf',
        resource: 'label-maker/own-labels',
        payload: {id: record.id},
    });
    return <Button
        label="ラベルPDF生成"
        onClick={pdfLink}
        disabled={loading}
    />;
};

export default MakePDFButton;