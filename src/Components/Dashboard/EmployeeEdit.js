import React, { useState, useEffect } from "react";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,Button,Grid,Typography,Box,Paper,
} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        width: "75%",
        padding: theme.spacing(4),
        backgroundColor: "#f5f5f5",
    },
    form: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    buttonContainer: {
        marginTop: theme.spacing(2),
        textAlign: "right",
    },
}));


function EmployeeEdit() {
    const classes = useStyles();
    const { id } = useParams();
    const history = useNavigate();

    const [employee, setEmployee] = useState({
        user: "",date: "",farmersName: "",nid: "",phone: "",area: "",extensionCenter: "",villageName: "",
    });

    useEffect(() => {
        axios
            .get(`http://localhost:5001/edit-farmers/${id}`)
            .then((response) => {
                setEmployee(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleChange = (event) => {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/edit-farmers/${id}`, employee)
            .then((response) => {
                console.log(response.data);
                history("/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        
            <Paper className={classes.root}>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">Edit Employee</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={() => history("/")}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="User"
                                name="user"
                                value={employee.user}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Date"
                                name="date"
                                value={employee.date}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="farmersName"
                                value={employee.farmersName}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="NID"
                                name="nid"
                                value={employee.nid}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone"
                                name="phone"
                                value={employee.phone}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Area"
                                name="area"
                                value={employee.area}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Extension Center"
                                name="extensionCenter"
                                value={employee.extensionCenter}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Village Name"
                                name="villageName"
                                value={employee.villageName}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        
    );
}

export default EmployeeEdit;






