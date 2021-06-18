import React, {
    createElement,
    useRef,
    useEffect,
    useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar} from '@material-ui/core';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory } from 'react-router-dom';
import { useCheckAuth } from 'ra-core';
import { defaultTheme, AppBar, Notification } from 'react-admin';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LoginForm from '../components/LoginForm';


const useStyles = makeStyles(
    (theme) => ({
        main: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default,
        },
        card: {
            marginTop: '6em',
            justifyContent: 'center',
            alignItems: 'center',
        },
        avatar: {
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
        },
        icon: {
            backgroundColor: theme.palette.secondary[500],
        },
    }),
    { name: 'RaLogin' }
);


const LoginPage = props => {
    const {
        theme,
        title,
        classes: classesOverride,
        className,
        children,
        notification,
        staticContext,
        backgroundImage,
        ...rest
    } = props;
    const containerRef = useRef();
    const classes = useStyles(props);
    const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);
    let backgroundImageLoaded = false;
    const checkAuth = useCheckAuth();
    const history = useHistory();
    useEffect(() => {
        checkAuth({}, false)
            .then(() => {
                // already authenticated, redirect to the home page
                history.push('/');
            })
            .catch(() => {
                // not authenticated, stay on the login page
            });
    }, [checkAuth, history]);

    const updateBackgroundImage = () => {
        if (!backgroundImageLoaded && containerRef.current) {
            containerRef.current.style.backgroundImage = `url(${backgroundImage})`;
            backgroundImageLoaded = true;
        }
    };

    // Load background image asynchronously to speed up time to interactive
    const lazyLoadBackgroundImage = () => {
        if (backgroundImage) {
            const img = new Image();
            img.onload = updateBackgroundImage;
            img.src = backgroundImage;
        }
    };

    useEffect(() => {
        if (!backgroundImageLoaded) {
            lazyLoadBackgroundImage();
        }
    });

    return (
        <ThemeProvider theme={muiTheme}>
            <AppBar>WebSpecimanager</AppBar>
            <div className={classes.main}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography>安全のため、10時間に1回自動ログアウトされます</Typography>
                        &nbsp;
                        <Typography>Safari、Internet Explorer、旧型Edgeではご利用頂けません。Google Chrome、FireFox、Edge(新型)のいずれかからご利用ください。</Typography>
                        &nbsp;
                        <Typography>現時点ではモバイル版では表示が崩れます。お手数ですが、当面はスマホやタブレットからご利用の際もPC版で表示するようお願いいたします。</Typography>
                    </CardContent>
                    <div className={classes.avatar}>
                        <Avatar className={classes.icon}>
                            <LockIcon />
                        </Avatar>
                    </div>
                    <LoginForm />
                </Card>
                {notification ? createElement(notification) : null}
            </div>
        </ThemeProvider>
    );
};

LoginPage.propTypes = {
    backgroundImage: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    theme: PropTypes.object,
    staticContext: PropTypes.object,
};

LoginPage.defaultProps = {
    theme: defaultTheme,
    notification: Notification,
};


export default LoginPage;