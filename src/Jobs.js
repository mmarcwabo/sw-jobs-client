import React from "react";
import Typography from '@material-ui/core/Typography';
import Job from './Job';
import JobModal from './JobModal';

//Mobile stepper for pagination
import { makeStyles } from '@material-ui/styles';
import useTheme from '@material-ui/core/styles/useTheme';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        flexGrow: 1,
    },
});


export default function Jobs({ jobs }) {

    //Modal 
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({ });
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //Pagination
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    //step 0 -- 0 to 49
    //step 1 -- 50 to 99
    //And so on
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50);

    const jobsOnPage = jobs.slice(activeStep * 50, activeStep * 50 + 50);

    //for customization purpose let show a job
    //to know json data keys

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    //for debug and developpement purposes
    //console.log('Job is :', jobs[0]);


    return (
        <div className={'jobs'}>
            <JobModal open={open} job={selectedJob} handleClose={handleClose} /> 
            <Typography variant="h4" component="h1">
                Entry Level Software Jobs
       </Typography>
            <Typography variant="h6" component="h1">
                Found {numJobs} jobs
       </Typography>
            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={()=>{
                        handleClickOpen();
                        selectJob(job)
                    }}
                        />
                )
            }
            <div>Page {activeStep + 1} of {numPages}</div>
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numPages - 1}>
                        Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
                }
            />
        </div>

    )

}