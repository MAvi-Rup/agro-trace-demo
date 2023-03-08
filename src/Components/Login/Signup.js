import React, { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from './../../firebase.init';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  media: {
    height: 140,
    width: '100%',
    objectFit: 'contain',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = () => {
  const classes = useStyles();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const emailRef = useRef('');
  const nameRef = useRef('');
  const passRef = useRef('');
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    if (user) {
      navigate('/dashboard');
    }
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image="https://i.ibb.co/TqDy5Zv/Virgo.png" title="Virgo Pharma" />
        <Typography component="h1" variant="h5" align="center">
          Create your account
        </Typography>
        <form className={classes.form} onSubmit={formSubmit}>
          <TextField
            inputRef={nameRef}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your Name"
            name="name"
            autoFocus
          />
          <TextField
            inputRef={emailRef}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            inputRef={passRef}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Link to="/login" component={Typography} variant="body2">
            Already have an account? Log in
          </Link>
        </form>
      </Card>
    </Container>
  );
};

export default Signup;
