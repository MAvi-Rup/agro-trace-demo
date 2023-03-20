import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Paper,
    Grid,
    Typography,
    TextField,
    Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "50%",
        margin: "auto",
        padding: theme.spacing(3),
        backgroundColor: "#F7EABE",
        boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.2)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.3)",
        },
    },
    form: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
        backgroundColor: "#3F51B5",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#2E3B8D",
        },
    },
}));

const EmployeeEdit = () => {
    const classes = useStyles();
    const history = useNavigate();
    const { id } = useParams();

    const [employee, setEmployee] = useState({
        user: "",
        date: "",
        farmersName: "",
        nid: "",
        phone: "",
        area: "",
        extensionCenter: "",
        villageName: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:5001/edit-farmers/${id}`).then((res) => {
            setEmployee(res.data);
        });
    }, []);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5001/update-farmer/${id}`, employee).then(() => {
            history("/dashboard/all-user");
        });
    };

    return (
        <Paper className={classes.root}>
            <Grid container justify="space-between" alignItems="center">
                <Grid item>
                    <Typography variant="h4">Edit Employee</Typography>
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={() => history.push("/")}>
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
                            value={employee.area} onChange={handleChange}
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            className={classes.button}
                        >
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>

    );
}



export default EmployeeEdit;
