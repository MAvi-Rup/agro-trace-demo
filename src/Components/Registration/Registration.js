import { useState, useRef } from 'react';
import { Person as UserIcon, CreditCard as CardIcon, Phone as PhoneIcon, LocationOn as LocationOnIcon, Business } from '@material-ui/icons';
import {
    TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid, makeStyles, FormHelperText,createTheme, ThemeProvider
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
}));

const Registration = () => {
    const classes = useStyles();
    const [registrationType, setRegistrationType] = useState('Farmer');
    const [dateOfEntry, setDateOfEntry] = useState(new Date().toISOString().substr(0, 10));
    const farmersNameRef = useRef('');
    const nidRef = useRef('');
    const phoneRef = useRef('');
    const areaRef = useRef('');
    const extensionCenterRef = useRef('');
    const villageNameRef = useRef('');
    const formRef = useRef(null);

    const handleRegistrationTypeChange = (event) => {
        setRegistrationType(event.target.value);
    };

    const handleDateOfEntryChange = (event) => {
        setDateOfEntry(event.target.value);
    };


    const handleRegisterClick = () => {
        const data = {
            registrationType,
            dateOfEntry,
            farmersName: farmersNameRef.current.value,
            nid: nidRef.current.value,
            phone: phoneRef.current.value,
            area: areaRef.current.value,
            extensionCenter: extensionCenterRef.current.value,
            villageName: villageNameRef.current.value,
        };
        console.log(data);
        formRef.current.reset();
    };

    const theme = createTheme({
        palette: {
          primary: {
            main: '#E7B10A',
          },
        },
      });

    return (
        <ThemeProvider theme={theme}>
            <form ref={formRef} className={classes.root} noValidate autoComplete="off" style={{ overflowX: 'hidden' }}>
                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item>
                        <h2>Add New</h2>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="registration-type-label">Registration Type</InputLabel>
                            <Select
                                labelId="registration-type-label"
                                id="registration-type"
                                value={registrationType}
                                label="Registration Type"
                                onChange={handleRegistrationTypeChange}
                            >
                                <MenuItem value="Farmer">Farmer</MenuItem>
                                <MenuItem value="Buyer">Buyer</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                            <FormHelperText>Select the registration type</FormHelperText>
                        </FormControl>

                    </Grid>
                    <Grid item>
                        <TextField
                            id="date-of-entry"
                            label="Date of Entry"
                            type="date"
                            defaultValue={new Date().toISOString().substr(0, 10)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleDateOfEntryChange}
                            
                            
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="farmers-name"
                            label="Farmer's Name"
                            inputRef={farmersNameRef}
                            InputProps={{
                                endAdornment: <UserIcon style={{ color: '#E7B10A' }}/>,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="nid-number"
                            label="NID Number"
                            inputRef={nidRef}
                            InputProps={{
                                endAdornment: <CardIcon style={{ color: '#E7B10A' }}/>,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="phone-number"
                            label="Phone Number"
                            inputRef={phoneRef}
                            InputProps={{
                                endAdornment: <PhoneIcon style={{ color: '#E7B10A' }}/>,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="area"
                            label="Area"
                            inputRef={areaRef}
                            InputProps={{
                                endAdornment: <LocationOnIcon style={{ color: '#E7B10A' }}/>,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="extension-center"
                            label="Extension Center"
                            inputRef={extensionCenterRef}
                            InputProps={{
                                endAdornment: <Business style={{ color: '#E7B10A' }}/>,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="village-name"
                            label="Village Name"
                            inputRef={villageNameRef}
                            InputProps={{
                                endAdornment: <LocationOnIcon style={{ color: '#E7B10A' }}/>,
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleRegisterClick}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </ThemeProvider>

    );
};

export default Registration;
