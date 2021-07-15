/* import React, { Component } from 'react';
import StudentService from './StudentService';

class ListDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            filterList: null,
            filterValues: []
        }
        this.addDetails = this.addDetails.bind(this);
        this.editDetails = this.editDetails.bind(this);
        this.deleteDetails = this.deleteDetails.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    addDetails() {
        this.props.history.push('/Insert_Details');
    }
    editDetails(id) {
        this.props.history.push(`/Update_Details/${id}`);
    }
    deleteDetails(id) {

        StudentService.deleteDetail(id).then((res) => {
            this.setState({ list: this.state.list.filter((_) => _.id !== id) })
        })
    }

    componentDidMount() {
        StudentService.getDetails().then((res) => {
            this.setState({ list: res.data })
            let filterValues = this.state.list.filter(
                (value) => {
                    return value.id === this.state.filterList !== -1;
                }
            );
            this.setState({ filterValues })
            // this.setState({ filterList: res.data })
        })
    }
    /*  handleChange(event) {
         const { filterValue } = event.target.value;
         console.log(filterValue);
         this.setState(prevState => {
             const filterList = this.state.list.filter(obj => obj.id.includes(filterValue));
             return { filterList };
         });
     }
    async updateSearch(event) {
        console.log(event.target.value)
        await this.setState({ filterList: event.target.value.toString() })
        /*  let filterValues = this.state.list.filter(
           (value) => {
               return value.id === this.state.filterList !== -1;
           }
       );
       await this.setState({filterValues})
       await console.log(this.state.filterValues)
    }

    async handleSelect(event) {
        /*   await this.setState({ filterList: event.target.value.toString() })
        let filterValues = this.state.list.filter(
            (value) => {
                return value.id === this.state.filterList !== -1;
            }
        )
        await this.setState({ filterValues })
        await console.log(this.state.filterValues)
    }

    render() {
        // let filterValues = this.state.list.filter(
        //     (value) => {
        //         return value.id === this.state.filterList !== -1;
        //     }
        // );
        return (

            <div >
                <div style={{ margin: '5px 0px 50px 0px' }}><h2 className="text-center" >Microbial Records</h2></div>
                <div class="form-row" >
                    {<div class="form-group col-md-3">
                        {/* <input type="text"
                            class="form-control"
                            value={this.state.filterList}
                            placeholder="Search by MC..."
                            onChange={(event) => this.updateSearch(event)} />

                    </div>}
                    <div class="form-group col-md-7"></div>
                    <div class="form-group col-md-2">
                        <button className="btn btn-primary" onClick={this.addDetails}>Insert New Record</button>

                    </div>
                </div >

                <table style={{ margin: '20px 0px 0px 0px' }} className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>MC</th>
                            <th>Date</th>
                            <th>Name Of Organism</th>
                            <th>Modified Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.filterValues.map(
                                student =>
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.mcDate}</td>
                                        <td>{student.nameOfOrganism}</td>
                                        <td>{student.updatedDate}</td>
                                        <td>
                                            <button class="form-group col-md-3" style={{ marginLeft: '30px' }} className="btn btn-info" onClick={() => { this.editDetails(student.id) }}>Edit</button>
                                            <button style={{ marginLeft: '20px', marginTop: '3px' }} className="btn btn-danger" onClick={() => { this.deleteDetails(student.id) }}>Delete</button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>

            </div>
        );
    }
}

export default ListDetails; */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Select campaign settings...';
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown stepIndex';
    }
}

export default function HorizontalLabelPositionBelowStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset}>Reset</Button>
                    </div>
                ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                >
                                    Back
              </Button>
                                <Button variant="contained" color="primary" onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
