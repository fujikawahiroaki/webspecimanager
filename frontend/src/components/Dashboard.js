import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { useDataProvider, useQuery, Loading, Error, useAuthState } from 'react-admin';


const theme = {
    spacing: 8,
}


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
                <Grid item xs>
                    <Card>
                        <CardHeader title="WebSpecimanager" />
                        <CardContent>ようこそ</CardContent>
                        <CardContent>必ず<a href="https://www.webspecimanager.net/manual/" target="_blank" rel="noopener">マニュアル</a>をお読みになってからご利用ください</CardContent>
                        <CardContent>現時点ではSafariブラウザではラベルPDF生成機能がご利用頂けません。またInternet Explorerおよび旧型Edgeはサポートしておりません。Google Chrome、FireFox、Edge(新型)のいずれかからご利用ください。</CardContent>
                        <CardContent>現時点ではモバイル版では表示が崩れます。お手数ですが、当面はスマホからのご利用の際もPC版で表示するようお願いいたします。</CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
};