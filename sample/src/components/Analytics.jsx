import React, { Component } from 'react';
import DemoColumn from './DemoColumn';
import StudentService from "./Service";


export class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectedOrganism: '',
            BioreactorType: '',
            tempQC: '',
            seedQC: '',
            mediumQC: '',
            cultureQC: '',

            SampleName: '',
            tempSample: '',
            seedSample: '',
            mediumSample: '',
            cultureSample: ''

        }

        this.QualityControl = this.QualityControl.bind(this);
        this.SampleLabelling = this.SampleLabelling.bind(this);
    }

    QualityControl = () => {
        let msg = `${this.state.SelectedOrganism},${this.state.BioreactorType},${this.state.tempQC},${this.state.seedQC},${this.state.mediumQC},${this.state.cultureQC * 60}`;
        console.log('Quality Control =>', msg);

    }

    SampleLabelling = () => {
        let msg = `${this.state.SampleName},${this.state.tempSample},${this.state.seedSample},${this.state.mediumSample},${this.state.cultureSample * 60}`;
        console.log("Sample Labelling =>", msg);

    }

    handleInput(event) {
        let { name, value } = event.target;
        console.log(name, "::", value);
        this.setState({
            [name]: value
        })
    }

    handleBioreactor(e) {
        console.log(e.target.value)
        this.setState({
            BioreactorType: e.target.value
        })

    }

    handleSampleName(e) {
        console.log(e.target.value)
        this.setState({
            SampleName: e.target.value
        })
    }

    handleChange(e) {
        console.log(e.target.value)
        this.setState({
            SelectedOrganism: e.target.value
        })

    }
    render() {
        return (<div>
            <div style={{ margin: '10px 0px 50px 0px' }}><h2 className="text-center" >LabLinks Analytics</h2></div>
            <h4 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Predict The Quality Control Test Result</h4>
            <DemoColumn style={{ width: "100%", justifyContent: "center", alignItems: "center" }} /><br /><br />
            <div class="form-row box" style={{ padding: "10px", display: "flex" }}>
                <div class="form-group col-md-4">
                    <label><b>NAME OF ORGANISM:</b></label>
                    <select class="form-control" value={this.state.SelectedOrganism} onChange={(e) => this.handleChange(e)}>
                        <option value="null" ></option>
                        <option value="Abrasilense">Abrasilense</option>
                        <option value="Azospirillum Brasilense">Azospirillum Brasilense</option>
                        <option value="Bacillus megaterium">Bacillus megaterium</option>
                        <option value="psuedomonas fluorescens">psuedomonas fluorescens</option>
                        <option value="Sacchromyces boulardii">Sacchromyces boulardii</option>
                        <option value="salmonella H antigen">salmonella H antigen</option>
                        <option value="Trichoderma viride">Trichoderma viride</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label ><b>BIOREACTOR SIZE TYPE:</b></label>
                    <select class="form-control" value={this.state.BioreactorType} onChange={(e) => this.handleBioreactor(e)}>
                        <option value="null"></option>
                        <option value="25L JERRY CAN">25L JERRY CAN</option>
                        <option value="2H TCC BAG">2H TCC BAG</option>
                        <option value="30H TCC BAG">30H TCC BAG</option>
                        <option value="30L JERRY CAN">30L JERRY CAN</option>
                        <option value="30L TCC BAG">30L TCC BAG</option>
                        <option value="35L JERRY CAN">35L JERRY CAN</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label ><b>TEMPERATURE INCUBATION</b></label>
                    <input type="text" maxlength="2" size="2" class="form-control" placeholder="°C" name="tempQC" value={this.state.tempQC} onChange={(event) => this.handleInput(event)} />
                </div>
                <div class="form-group col-md-2">
                    <label ><b>SEED QUANTITY</b></label>
                    <input type="text" maxlength="5" size="5" class="form-control" placeholder="ml" name="seedQC" value={this.state.seedQC} onChange={(event) => this.handleInput(event)} />
                </div>
                <div class="form-group col-md-2">
                    <label ><b>SEED QUANTITY</b></label>
                    <input type="text" maxlength="5" size="5" class="form-control" placeholder="ml" name="mediumQC" value={this.state.mediumQC} onChange={(event) => this.handleInput(event)} />
                </div>
                <div class="form-group col-md-2">
                    <label ><b>CULTURE TIME</b></label>
                    <input type="text" maxlength="4" size="4" class="form-control" placeholder="Hours" name="cultureQC" value={this.state.cultureQC} onChange={(event) => this.handleInput(event)} />
                </div>
                <div class="form-group col-md-2" style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "25px" }}>
                    <button type="button" class="btn btn-info" onClick={this.QualityControl}>Predict</button>
                </div>
                <div class="form-group col-sm-4" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <b>  Quality Control Test Result  </b>

                </div>
            </div><br /><br /><br /><br />
            <h4 style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", marginBottom: "20px" }}>Predict The Sample Labelling Quantity</h4>
            <div class="form-row box" style={{ padding: "10px", display: "flex" }}>
                <div class="form-group col-md-4">
                    <label><b>NAME OF ORGANISM:</b></label>
                    <select class="form-control" vlaue={this.state.SampleName} onChange={(e) => this.handleSampleName(e)}>
                        <option value="null" ></option>
                        <option value="Abrasilense">Abrasilense</option>
                        <option value="Azospirillum Brasilense">Azospirillum Brasilense</option>
                        <option value="Bacillus megaterium">Bacillus megaterium</option>
                        <option value="psuedomonas fluorescens">psuedomonas fluorescens</option>
                        <option value="Sacchromyces boulardii">Sacchromyces boulardii</option>
                        <option value="salmonella H antigen">salmonella H antigen</option>
                        <option value="Trichoderma viride">Trichoderma viride</option>
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label ><b>TEMPERATURE INCUBATION</b></label>
                    <input type="text" maxlength="2" size="2" class="form-control" placeholder="°C" name="tempSample" value={this.state.tempSample} onChange={(event) => this.handleInput(event)} />
                </div>
                <div class="form-group col-md-2">
                    <label ><b>SEED QUANTITY</b></label>
                    <input type="text" maxlength="5" size="5" class="form-control" placeholder="ml" name="seedSample" value={this.state.seedSample} onChange={(event) => this.handleInput(event)} />
                </div>
                <div class="form-group col-md-2">
                    <label ><b>SEED QUANTITY</b></label>
                    <input type="text" maxlength="5" size="5" class="form-control" placeholder="ml" name="mediumSample" value={this.state.mediumSample} onChange={(event) => this.handleInput(event)} />
                </div>
                <div class="form-group col-md-2">
                    <label ><b>CULTURE TIME</b></label>
                    <input type="text" maxlength="4" size="4" class="form-control" placeholder="Hours" name="cultureSample" value={this.state.cultureSample} onChange={(event) => this.handleInput(event)} />
                </div>
                <div class="form-group col-md-2" style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "25px" }}>
                    <button type="button" class="btn btn-info" onClick={this.SampleLabelling} >Predict</button>
                </div>
            </div>
            <br /> <br /> <br /><br />
        </div>);
    }

}