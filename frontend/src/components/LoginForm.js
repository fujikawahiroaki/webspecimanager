import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userLogin as userLoginAction} from 'react-admin';

import { withStyles, createStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';


const styles = ({ spacing }) =>
    createStyles({
        button: {
            width: '100%',
        },
    });

const LoginForm = ({ classes, userLogin }) => {
    useEffect(() => {
        const location = window.location.href;
        const url = new URL(window.location.href);
        const { searchParams } = url;
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        // If code is present, we came back from the provider
        if (code && state) {
            userLogin({ location });
        }
    }, [userLogin]);

    const handleLogin = () => {
        userLogin(); // Do not provide code, just trigger the redirection
    };

    return (
        <div>
            <CardActions style={{alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    onClick={handleLogin}
                >
                    ログイン
                </Button>
            </CardActions>
        </div>
    );
}

const mapDispatchToProps = {
    userLogin: userLoginAction,
}

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(LoginForm));