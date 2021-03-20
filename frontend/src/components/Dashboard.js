import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

export default () => (
    <Card>
        <CardHeader title="WebSpecimanager" />
        <CardContent>ようこそ</CardContent>
        <CardContent>メンテナンスのために3月21日早朝4時〜6時の間、システムを一時停止いたします。ご迷惑をおかけしますが、本サービスの性能向上のためご協力お願いいたします。</CardContent>
        <CardContent>必ず<a href="https://www.webspecimanager.net/manual/" target="_blank" rel="noopener">マニュアル</a>をお読みになってからご利用ください</CardContent>
        <CardContent>現時点ではSafariブラウザではラベルPDF生成機能がご利用頂けません。またInternet Explorerおよび旧型Edgeはサポートしておりません。Google Chrome、FireFox、Edge(新型)のいずれかからご利用ください。</CardContent>
        <CardContent>現時点ではモバイル版では表示が崩れます。お手数ですが、当面はスマホからのご利用の際もPC版で表示するようお願いいたします。</CardContent>
    </Card>
);
