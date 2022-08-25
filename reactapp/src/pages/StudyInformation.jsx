import './StudyInformation.css'
import React from 'react'
import {Outlet, Route, Routes} from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import {Button, Card, Divider, ThemeProvider} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LockIcon from '@mui/icons-material/Lock';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GitHubIcon from '@mui/icons-material/GitHub';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Grid from '@mui/material/Unstable_Grid2';
import {TextField} from "@mui/material";
import Box from '@mui/material/Box';

const TITLE1 = 'Study Information'
const EXPLANATION1 = "Basic information of the study. This information will be presented to participants upon joining your study."

const TITLE2 = 'Database Configuration'
const EXPLANATION2 = "Where will the study data be stored? Please insert credentials for a user with INSERT only privilege to the specified database to proceed."
const EXPLANATION3 = "If it is your first time setting up a study, please provide your database's ROOT credentials and click the INITIALISE DATABASE button to setup the tables and a user with INSERT only privilege for this database."
export const StudyInformation = () => {
    // return <div>This is Blank page</div>;
    return(
        <div>
            <div className={'main_vertical_layout'}>

                {/*<p className={'main_title'}>{TITLE}</p>*/}
                <p className={'title'}>{TITLE1}</p>
                <p className={'explanation'}>{EXPLANATION1}</p>

                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>study title*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="The title of your study" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>description*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="A short description of your study" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Researcher's first name*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="First name" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Researcher's last name*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Last name" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Researcher's email*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="example@email.com" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                </Box>

                <p className={'title'}>{TITLE2}</p>
                <p className={'explanation'}>{EXPLANATION2}</p>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Host / Server IP*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="e.g. 139.130.4.5" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Port number*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="e.g. 3306" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Database name*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Database name" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>INSERT-only username*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Username" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>INSERT-only password*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Password" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                </Box>


                <p className={'explanation'}>{EXPLANATION3}</p>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Root username</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Root username" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={300}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Root password</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Root password" variant="outlined" style={{ width: 300}} />
                       </Grid>
                    </Grid>

                </Box>
            </div>


        </div>

        // <div>Study Information</div>

    )

}

export default StudyInformation;