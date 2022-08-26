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
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel';
import {blue} from "@mui/material/colors";



const TITLE1 = 'Study Information'
const EXPLANATION1 = "Basic information of the study. This information will be presented to participants upon joining your study."

const TITLE2 = 'Database Configuration'
const EXPLANATION2 = "Where will the study data be stored? Please insert credentials for a user with INSERT only privilege to the specified database to proceed."
const EXPLANATION3 = "If it is your first time setting up a study, please provide your database's ROOT credentials and click the INITIALISE DATABASE button to setup the tables and a user with INSERT only privilege for this database."
const no_password_explanation = "By clicking this checkbox, you are selecting to not include the MySQL INSERT-only user password in the JSON study config file used by AWARE-Light. You will instead provide the password to study users who will then input it manually into AWARE-Light when they sign up to the study."
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
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>study title*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="The title of your study" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>description*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="A short description of your study" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Researcher's first name*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="First name" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Researcher's last name*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Last name" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Researcher's email*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="example@email.com" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>

                </Box>

                <p className={'title'}>{TITLE2}</p>
                <p className={'explanation'}>{EXPLANATION2}</p>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Host / Server IP*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="e.g. 139.130.4.5" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Port number*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="e.g. 3306" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Database name*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Database name" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>INSERT-only username*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Username" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>INSERT-only password*</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Password" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>



                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                        </Grid>
                        <Grid width={500}>
                            <FormControlLabel control={<Checkbox />} label="No password in JSON file" />
                            <p style={{fontSize: '1 rem'}}>{no_password_explanation}</p>
                        </Grid>
                    </Grid>
                    <Button variant="contained">TEST CONNECTION</Button>
                </Box>


                <p className={'explanation'}>{EXPLANATION3}</p>
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Root username</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Root username" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>

                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <p style={{fontSize: '1 rem', color: 'black'}}>Root password</p>
                        </Grid>
                        <Grid width={300}>
                            <TextField id="outlined-basic" label="Root password" variant="outlined" style={{ width: 600}} />
                       </Grid>
                    </Grid>

                </Box>

                <Box sx={{ width: '100%' }} mt={2}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid width={250}>
                            <Button variant="contained">INITIALIZE DATABASE</Button>
                        </Grid>
                        <Grid width={300}></Grid>
                    </Grid>
                </Box>

                <Box sx={{ width: '100%' }} mt={5} marginBottom={5}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 23 }} justifyContent="flex-end">
                        <Button variant="contained">NEXT STEP: QUESTIONS</Button>
                        {/*<Grid width={500}></Grid>*/}
                        {/*<Grid width={500}>*/}
                        {/*    */}
                        {/*</Grid>*/}

                    </Grid>
                </Box>



            </div>


        </div>

        // <div>Study Information</div>

    )

}

export default StudyInformation;