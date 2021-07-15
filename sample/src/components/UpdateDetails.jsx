import React, { Component } from 'react'
import { withRouter } from "react-router";
import Service from './Service';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import DeleteIcon from '@material-ui/icons/Delete';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

class UpdateDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {

            mc: this.props.match.params.id,
            mcDate: '',
            passageNo: '',
            barCode: '',
            nameOfOrganism: '',
            source: '',
            seedUsedAndQtyMedium: '',
            mcCardOfSeed: '',
            timeOfSetting: '',
            tempIncubation: '',
            medium: '',
            mediumR: '',
            otherAdditives: '',
            otherAdditivesR: '',
            alkali: '',
            alkaliR: '',
            acid: '',
            acidR: '',
            glassContainer: {},
            bioReactor: {},
            phController: [],
            setPhValue: '',
            do2Controller: [],
            do2value: '',
            remarksOnAeration: [],
            doneBy: '',
            sampleLabelling: [],
            qcControllTest: [],
            generalRemarkOFCulture: '',
            detailsofharvesting: '',
            reffDownStreamProcessing: '',
            donebyname1: '',
            donebyname2: '',
            preparedby: '',
            preparedByDate: '',
            deptHead: '',
            deptHeadDate: '',
            qad: '',
            qadDate: ''
        }

        this.updateDetails = this.updateDetails.bind(this);
        this.viewDetails = this.viewDetails.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleControlChange = this.handleControlChange.bind(this);
        this.removecontrolClick = this.removecontrolClick.bind(this);
        this.handleRemarksChange = this.handleRemarksChange.bind(this);
        this.removeRemarksClick = this.removeRemarksClick.bind(this);
        // this.handleTime_date = this.handleTime_date.bind(this);

    }

    componentDidMount() {
        if (localStorage.getItem("Checked") !== "") {
            if (localStorage.getItem("pageReload") !== "") {
                localStorage.setItem("pageReload", "")
                window.location.reload(false);
            } else {
                localStorage.setItem("pageReload", "")
                Service.putDetails(this.state.mc).then((res) => {
                    let micro = res.data;
                    console.log(micro);
                    this.setState({
                        mc: micro.id, mcDate: micro.mcDate, passageNo: micro.passageNo,
                        barCode: micro.barCode, nameOfOrganism: micro.nameOfOrganism,
                        source: micro.source, seedUsedAndQtyMedium: micro.seedUsedAndQtyMedium, mcCardOfSeed: micro.mcCardOfSeed,
                        timeOfSetting: micro.timeOfSetting, tempIncubation: micro.tempIncubation, medium: micro.medium, mediumR: micro.mediumR,
                        otherAdditives: micro.otherAdditives, otherAdditivesR: micro.otherAdditivesR, alkali: micro.alkali,
                        alkaliR: micro.alkaliR, acid: micro.acid, acidR: micro.acidR, glassContainer: micro.glassContainer, bioReactor: micro.bioReactor,
                        phController: micro.phController, setPhValue: micro.setPhValue, do2Controller: micro.do2Controller,
                        do2value: micro.do2value, remarksOnAeration: micro.remarksOnAeration, doneBy: micro.doneBy, sampleLabelling: micro.sampleLabelling,
                        qcControllTest: micro.qcControllTest, generalRemarkOFCulture: micro.generalRemarkOFCulture, detailsofharvesting: micro.detailsofharvesting,
                        reffDownStreamProcessing: micro.reffDownStreamProcessing, donebyname1: micro.donebyname1, donebyname2: micro.donebyname2,
                        preparedby: micro.preparedby, preparedByDate: micro.preparedByDate, deptHead: micro.deptHead, deptHeadDate: micro.deptHeadDate,
                        qad: micro.qad, qadDate: micro.qadDate
                    })
                });
            }

        } else {
            this.props.history.push("/Get_Details")
        }
    }

    updateDetails = (event) => {
        event.preventDefault();
        let details = {
            passageNo: this.state.passageNo, barCode: this.state.barCode, source: this.state.source,
            seedUsedAndQtyMedium: this.state.seedUsedAndQtyMedium, mcCardOfSeed: this.state.mcCardOfSeed,
            timeOfSetting: this.state.timeOfSetting, tempIncubation: this.state.tempIncubation,
            medium: this.state.medium, mediumR: this.state.mediumR, otherAdditives: this.state.otherAdditives,
            otherAdditivesR: this.state.otherAdditivesR, alkali: this.state.alkali, alkaliR: this.state.alkaliR,
            acid: this.state.acid, acidR: this.state.acidR, glassContainer: this.state.glassContainer,
            bioReactor: this.state.bioReactor, phController: this.state.phController, setPhValue: this.state.setPhValue,
            do2Controller: this.state.do2Controller, do2value: this.state.do2value, remarksOnAeration: this.state.remarksOnAeration,
            doneBy: this.state.doneBy, sampleLabelling: this.state.sampleLabelling, qcControllTest: this.state.qcControllTest,
            generalRemarkOFCulture: this.state.generalRemarkOFCulture, detailsofharvesting: this.state.detailsofharvesting,
            reffDownStreamProcessing: this.state.reffDownStreamProcessing, donebyname1: this.state.donebyname1,
            donebyname2: this.state.donebyname2, preparedby: this.state.preparedby, preparedByDate: this.state.preparedByDate,
            deptHead: this.state.deptHead, deptHeadDate: this.state.deptHeadDate, qad: this.state.qad, qadDate: this.state.qadDate
        };
        console.log('Details=>' + JSON.stringify(details));
        Service.updateDetails(details, this.state.mc).then((res) => {
            localStorage.setItem("Checked", "")
            this.props.history.push('/Get_Details');
        })
    }



    createUI() {
        return this.state.phController.map((index, ii) =>
            <div class="form-row" key={ii}>&nbsp;&nbsp;{index.phattTime === null ? <TimePicker use12Hours format="h:mm A" defaultValue={""} name="phattTime" class="form-control col" style={{ margin: '5px 15px 10px 0px', height: "38px" }}
                placeholder="At Time" onChange={(time, timeString) => this.handleDateChange(ii, "phattTime", time, timeString)} />
                : <TimePicker use12Hours format="h:mm A" value={moment(index.phattTime)} name="phattTime" class="form-control col" style={{ margin: '5px 15px 10px 0px', height: "38px" }}
                    placeholder="At Time" onChange={(time, timeString) => this.handleDateChange(ii, "phattTime", time, timeString)} />}

                <input type="text" name="ph" class="form-control col" value={index.ph} style={{ margin: '5px 10px 10px 0px' }}
                    placeholder="PH" onChange={(event) => this.handleChange(ii, event)} />
                <div class="form-group col-md-6">
                    <input type="text" class="form-control col" name="phAlkali" value={index.phAlkali} style={{ margin: '5px 10px 10px 0px' }}
                        placeholder="Alkali/Acid addition" onChange={(event) => this.handleChange(ii, event)} />
                </div>
                <DeleteIcon style={{ fontSize: "45" }} onClick={(event) => this.removeClick(ii, event)} />
            </div>
        )
    }
    controlUI() {
        return this.state.do2Controller.map((index, ii) =>
            <div class="form-row" key={ii}>&nbsp;&nbsp;{index.do2AtTime === null ?
                <TimePicker use12Hours format="h:mm A" defaultValue={""} name="do2AtTime" class="form-control col" style={{ margin: '5px 10px 10px 0px', height: "38px" }}
                    placeholder="At Time" onChange={(time, timeString) => this.handleControlDateChange(ii, "do2AtTime", time, timeString)} />
                : <TimePicker use12Hours format="h:mm A" value={moment(index.do2AtTime)} name="do2AtTime" class="form-control col" style={{ margin: '5px 10px 10px 0px', height: "38px" }}
                    placeholder="At Time" onChange={(time, timeString) => this.handleControlDateChange(ii, "do2AtTime", time, timeString)} />}
                <input type="text" name="o2" class="form-control col" value={index.o2} style={{ margin: '5px 10px 10px 0px' }}
                    placeholder="O2" onChange={(event) => this.handleControlChange(ii, event)} />
                <span class="form-group col-md-6">
                    <input type="text" name="gasOrAirAddition" class="form-control col" value={index.gasOrAirAddition} style={{ margin: '5px 10px 10px 0px' }}
                        placeholder="gas/air addition" onChange={(event) => this.handleControlChange(ii, event)} />
                </span>
                <DeleteIcon style={{ fontSize: "45" }} onClick={(event) => this.removecontrolClick(ii, event)} />
            </div>
        )
    }

    remarksUI() {
        return this.state.remarksOnAeration.map((index, ii) =>
            <div class="form-row" key={ii}>
                <span class="form-group col-md-3">{index.aerationDate === null ?
                    <DatePicker name="aerationDate" class="form-control col" defaultValue={""} style={{ margin: '5px 10px 10px 0px', height: "38px", width: "100%" }}
                        placeholder="Select date" onChange={(date, dateString) => this.handleRemarksDateChange(ii, "aerationDate", date, dateString)} />
                    : <DatePicker name="aerationDate" class="form-control col" value={moment(index.aerationDate)} style={{ margin: '5px 10px 10px 0px', height: "38px", width: "100%" }}
                        placeholder="Select date" onChange={(date, dateString) => this.handleRemarksDateChange(ii, "aerationDate", date, dateString)} />}
                </span>
                <span class="form-group col-md-2">{index.aerationTime === null ?
                    <TimePicker use12Hours format="h:mm A" name="aerationTime" defaultValue={""} class="form-control col" style={{ margin: '5px 10px 10px 0px', height: "38px", width: "100%" }}
                        placeholder="Time" onChange={(time, timeString) => this.handleRemarksDateChange(ii, "aerationTime", time, timeString)} />
                    : <TimePicker use12Hours format="h:mm A" name="aerationTime" value={moment(index.aerationTime)} class="form-control col" style={{ margin: '5px 10px 10px 0px', height: "38px", width: "100%" }}
                        placeholder="Time" onChange={(time, timeString) => this.handleRemarksDateChange(ii, "aerationTime", time, timeString)} />}
                </span>
                <div class="form-group col-md-6">
                    <input type="text" name="aerationDetails" class="form-control col" value={index.aerationDetails} style={{ margin: '5px 10px 10px 0px' }}
                        placeholder="Details of addition" onChange={(event) => this.handleRemarksChange(ii, event)} />
                </div>
                <DeleteIcon style={{ fontSize: "45" }} onClick={(event) => this.removeRemarksClick(ii, event)} />
            </div>
        )
    }

    sampleLabelUI() {
        return this.state.sampleLabelling.map((index, ii) =>
            <div class="form-row" key={ii}>
                <div class="form-group col-md-2">{index.sampleLabellingDate === null ?
                    <DatePicker name="sampleLabellingDate" class="form-control col" defaultValue={""} style={{ margin: '5px 10px 10px 0px', height: "38px", width: "100%" }}
                        placeholder="Date" onChange={(date, dateString) => this.handleSampledateChange(ii, "sampleLabellingDate", date, dateString)} />
                    : <DatePicker name="sampleLabellingDate" class="form-control col" value={moment(index.sampleLabellingDate)} style={{ margin: '5px 10px 10px 0px', height: "38px", width: "100%" }}
                        placeholder="Date" onChange={(date, dateString) => this.handleSampledateChange(ii, "sampleLabellingDate", date, dateString)} />}
                </div>&nbsp;&nbsp;{index.sampleLabellingTime === null ?
                    <TimePicker use12Hours format="h:mm A" name="sampleLabellingTime" defaultValue={""} class="form-control col" style={{ margin: '5px 10px 10px 0px', height: "38px" }}
                        placeholder="Time" onChange={(time, timeString) => this.handleSampledateChange(ii, "sampleLabellingTime", time, timeString)} />
                    : <TimePicker use12Hours format="h:mm A" name="sampleLabellingTime" value={moment(index.sampleLabellingTime)} class="form-control col" style={{ margin: '5px 10px 10px 0px', height: "38px" }}
                        placeholder="Time" onChange={(time, timeString) => this.handleSampledateChange(ii, "sampleLabellingTime", time, timeString)} />}
                <input type="text" name="sampleLabellingQty" class="form-control col" value={index.sampleLabellingQty} style={{ margin: '5px 10px 10px 0px' }}
                    placeholder="Qty(ml)" onChange={(event) => this.handleSampleChange(ii, event)} />
                <div class="form-group col-md-5">
                    <input type="text" name="sampleLabellingDetails" class="form-control col" value={index.sampleLabellingDetails} style={{ margin: '5px 10px 10px 0px' }}
                        placeholder="Details of Sample" onChange={(event) => this.handleSampleChange(ii, event)} />
                </div>
                <DeleteIcon style={{ fontSize: "45" }} onClick={(event) => this.removeSampleClick(ii, event)} />
            </div>
        )
    }

    qcControlUI() {
        return this.state.qcControllTest.map((index, ii) =>
            <div class="form-row" key={ii}>
                <div class="form-group col-md-2">
                    <input type="number" name="qcSampleNo" class="form-control col" value={index.qcSampleNo} style={{ margin: '5px 10px 10px 0px' }}
                        placeholder="sample no" onChange={(event) => this.handleQcChange(ii, event)} />
                </div>
                <div class="form-group col-md-3">
                    <input type="text" name="nameOFTest" class="form-control col" value={index.nameOFTest} style={{ margin: '5px 10px 10px 0px' }}
                        placeholder="Name" onChange={(event) => this.handleQcChange(ii, event)} />
                </div>
                <div class="form-group col-md-2">
                    <input type="number" name="qcRefNo" class="form-control col" value={index.qcRefNo} style={{ margin: '5px 10px 10px 0px' }}
                        placeholder="Ref.no" onChange={(event) => this.handleQcChange(ii, event)} />
                </div>
                <div class="form-group col-md-4">
                    <input type="text" name="qcresult" class="form-control col" value={index.qcresult} style={{ margin: '5px 10px 10px 0px' }}
                        placeholder="Result" onChange={(event) => this.handleQcChange(ii, event)} />
                </div>
                <DeleteIcon style={{ fontSize: "45" }} onClick={(event) => this.removeQcClick(ii, event)} />
            </div>
        )
    }


    async addClick(event) {
        event.preventDefault();
        const fields = [...this.state.phController];

        await console.log("Fields :::: ", fields)
        if (fields.length === 0) {
            await this.setState({ phController: [...this.state.phController, fields] })
        } else {
            await this.setState({ phController: [...this.state.phController, {}] })
        }

        await console.log(this.state.phController);
    }

    async addcontrolClick(event) {
        event.preventDefault();
        const fields = [...this.state.do2Controller];

        if (fields.length === 0) {
            await this.setState({ do2Controller: [...this.state.do2Controller, fields] })
        } else {
            await this.setState({ do2Controller: [...this.state.do2Controller, {}] })
        }

        await console.log(this.state.do2Controller);
    }
    async addRemarksClick(event) {
        event.preventDefault();
        const fields = [...this.state.remarksOnAeration];

        if (fields.length === 0) {
            await this.setState({ remarksOnAeration: [...this.state.remarksOnAeration, fields] })
        } else {
            await this.setState({ remarksOnAeration: [...this.state.remarksOnAeration, {}] })
        }

        await console.log(this.state.remarksOnAeration);
    }
    async addSampleClick(event) {
        event.preventDefault();
        const fields = [...this.state.sampleLabelling];

        if (fields.length === 0) {
            await this.setState({ sampleLabelling: [...this.state.sampleLabelling, fields] })
        } else {
            await this.setState({ sampleLabelling: [...this.state.sampleLabelling, {}] })
        }

        await console.log(this.state.sampleLabelling);
    }

    async addQCControlClick(event) {
        event.preventDefault();
        const fields = [...this.state.qcControllTest];

        if (fields.length === 0) {
            await this.setState({ qcControllTest: [...this.state.qcControllTest, fields] })
        } else {
            await this.setState({ qcControllTest: [...this.state.qcControllTest, {}] })
        }

        await console.log(this.state.qcControllTest);
    }


    async removeClick(index, event) {
        event.preventDefault();
        let values = [...this.state.phController];
        await values.splice(index, 1);
        await this.setState({ phController: values });
        console.log(values);

    }
    async removecontrolClick(index, event) {
        event.preventDefault();
        let values = [...this.state.do2Controller];
        await values.splice(index, 1);
        await this.setState({ do2Controller: values });
        console.log(values);

    }
    async removeRemarksClick(index, event) {
        event.preventDefault();
        let values = [...this.state.remarksOnAeration];
        await values.splice(index, 1);
        await this.setState({ remarksOnAeration: values });
        console.log(values);

    }
    async removeSampleClick(index, event) {
        event.preventDefault();
        let values = [...this.state.sampleLabelling];
        await values.splice(index, 1);
        await this.setState({ sampleLabelling: values });
        console.log(values);

    }
    async removeQcClick(index, event) {
        event.preventDefault();
        let values = [...this.state.qcControllTest];
        await values.splice(index, 1);
        await this.setState({ qcControllTest: values });
        console.log(values);

    }
    handleDateChange(index, dateS, time, timeString) {
        console.log(time, '::', timeString)
        let d = null;
        if (time !== null && time._d !== null) {
            d = new Date(time._d);
        }
        let values = [...this.state.phController];
        let [name, value] = [dateS, d];
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ phController: values });
    }

    handleChange(index, event) {

        let values = [...this.state.phController];

        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ phController: values });
    }
    handleControlDateChange(index, dateS, time, timeString) {
        console.log(time, " :: ", timeString)
        let d = null;
        if (time !== null && time._d !== null) {
            d = new Date(time._d);
        }
        console.log(d)
        let values = [...this.state.do2Controller];

        let [name, value] = [dateS, d];
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ do2Controller: values });
    }
    handleControlChange(index, event) {

        let values = [...this.state.do2Controller];

        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ do2Controller: values });
    }
    handleRemarksDateChange(index, dateS, time_date, time_dateString) {
        console.log(time_date, " :: ", time_dateString)
        let d = null;
        if (time_date !== null && time_date._d !== null) {
            d = new Date(time_date._d);
        }
        console.log(d)
        let values = [...this.state.remarksOnAeration];

        let [name, value] = [dateS, d];
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ remarksOnAeration: values });
    }
    handleRemarksChange(index, event) {

        let values = [...this.state.remarksOnAeration];

        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ remarksOnAeration: values });
    }
    handleSampledateChange(index, dateS, time_date, time_dateString) {
        console.log(time_date, " :: ", time_dateString)
        let d = null;
        if (time_date !== null && time_date._d !== null) {
            d = new Date(time_date._d);
        }
        console.log(d)
        let values = [...this.state.sampleLabelling];
        console.log(values);
        let [name, value] = [dateS, d];
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ sampleLabelling: values });
    }
    handleSampleChange(index, event) {

        let values = [...this.state.sampleLabelling];

        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ sampleLabelling: values });
    }
    handleQcChange(index, event) {

        let values = [...this.state.qcControllTest];

        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ qcControllTest: values });
    }
    handleDateState(name, date, dateString) {
        console.log(date, "::", dateString)
        let d = null
        if (date !== null && date._d !== null) {
            d = new Date(date._d);
            this.setState({ [name]: d })
        } else {
            this.setState({ [name]: "" })
        }
        console.log(d)

        console.log(name, "::", d)
    }


    viewDetails() {
        this.props.history.push('/Get_Details');
    }

    render() {
        return (
            <div class="form-group col-md-16">
                <div style={{ margin: '5px 0px 80px 0px' }}><h1 className="text-center" >Microbial</h1></div>
                <form style={{ marginTop: '20px' }}  >
                    <div class="form-row box" style={{ padding: "10px" }}>
                        <div class="form-group col-md-4">
                            <label><b>MC: </b></label>
                            <input
                                type="number"
                                placeholder="MC"
                                name="mc"
                                class="form-control"
                                value={this.state.mc}
                                required
                                disabled
                            />
                        </div>
                        <div class="form-group col-sm-4"></div>
                        <div class="form-group col-md-4">
                            <label><b>Date: </b></label>
                            <DatePicker
                                name="mcDate"
                                class="form-control"

                                value={moment(this.state.mcDate)}
                                style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                required
                                disabled
                            />
                        </div>
                    </div><br /><br />
                    <div class="form-row box" style={{ padding: "10px" }}>
                        <div class="form-group col-md-4">
                            <label><b>Passage:  </b></label>
                            <input
                                type="text"
                                placeholder="passage"
                                class="form-control"
                                name="passageNo"
                                value={this.state.passageNo}
                                onChange={(event) => this.setState({ passageNo: event.target.value })}
                            />
                        </div>
                        <div class="form-group col-md-4">
                            <label><b>Barcode: </b> </label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="barcode"
                                name="barCode"
                                value={this.state.barCode}
                                onChange={(event) => this.setState({ barCode: event.target.value })}
                            />
                        </div>
                        <div class="form-group col-md-4">
                            <label><b>Name of Organism:  </b></label>
                            <input
                                type="text"
                                placeholder="Name of organism"
                                class="form-control"
                                name="nameOfOrganism"
                                value={this.state.nameOfOrganism}

                                required
                                disabled
                            />
                        </div>
                    </div><br /><br />
                    <div class="form-row box" style={{ padding: "10px" }}>

                        <div class="form-group col-md-4">
                            <label><b>Source: </b></label>
                            <input
                                type="text"
                                placeholder="source"
                                class="form-control"
                                name="source"
                                value={this.state.source}
                                onChange={(event) => this.setState({ source: event.target.value })}
                            />
                        </div>


                        <div class="form-group col-md-4 ">
                            <label><b>Seed Used & Quantity Medium:</b> </label>
                            <input
                                type="text"
                                placeholder="seed used & Qty"
                                class="form-control"
                                name="seedUsedAndQtyMedium"
                                value={this.state.seedUsedAndQtyMedium}
                                onChange={(event) => this.setState({ seedUsedAndQtyMedium: event.target.value })}
                            />
                        </div>
                        <div class="form-group col-md-4">
                            <label><b>MC card of seed : </b></label>
                            <input
                                type="text"
                                placeholder="MC card of seed"
                                name="mcCardOfSeed"
                                class="form-control "
                                value={this.state.mcCardOfSeed}
                                onChange={(event) => this.setState({ mcCardOfSeed: event.target.value })}
                            />
                        </div>
                    </div><br /><br />
                    <div class="form-row box" style={{ padding: "10px" }}>
                        <div class="form-group col-md-4">
                            <label><b>Time of Setting up :</b></label>{this.state.timeOfSetting === "" ?
                                <TimePicker use12Hours format="h:mm A"
                                    placeholder="Time of Setting up"
                                    name="timeOfSetting"
                                    class="form-control"
                                    defaultValue={""}
                                    style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                    onChange={(time, timeString) => this.handleDateState("timeOfSetting", time, timeString)}
                                /> : <TimePicker use12Hours format="h:mm A"
                                    placeholder="Time of Setting up"
                                    name="timeOfSetting"
                                    class="form-control"
                                    value={moment(this.state.timeOfSetting)}
                                    style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                    onChange={(time, timeString) => this.handleDateState("timeOfSetting", time, timeString)}
                                />}
                        </div><div class="form-group col-md-4"></div>
                        <div class="form-group col-md-4">
                            <label><b>Temp. Incubation(\B0C):</b></label>
                            <input
                                type="text"
                                placeholder="Temp. incubation"
                                class="form-control"
                                name="tempIncubation"
                                value={this.state.tempIncubation}
                                onChange={(event) => this.setState({ tempIncubation: event.target.value })}
                            /></div>
                    </div><br /><br />
                    <div class="form-row  box" style={{ padding: "10px" }}>
                        <div class="form-group col-md-3 ">
                            <label><b>Medium :</b></label>
                            <input
                                type="text"
                                placeholder="Medium"
                                class="form-control"
                                name="medium"
                                value={this.state.medium}
                                onChange={(event) => this.setState({ medium: event.target.value })}
                            />
                        </div>
                        <div class="form-group col-md-3 ">
                            <label><b>Medium R:</b></label>
                            <input
                                type="text"
                                placeholder="Medium R"
                                class="form-control"
                                name="mediumR"
                                value={this.state.mediumR}
                                onChange={(event) => this.setState({ mediumR: event.target.value })}
                            />
                        </div>
                        <div class="form-group col-md-3 ">
                            <label><b>Other Additives:</b></label>
                            <input
                                type="text"
                                placeholder="Other Additives"
                                class="form-control"
                                name="otherAdditives"
                                value={this.state.otherAdditives}
                                onChange={(event) => this.setState({ otherAdditives: event.target.value })}
                            />
                        </div>
                        <div class="form-group col-md-3 ">
                            <label><b>Other Additives R:</b></label>
                            <input
                                type="text"
                                placeholder="Other Additives R"
                                class="form-control"
                                name="otherAdditivesR"
                                value={this.state.otherAdditivesR}
                                onChange={(event) => this.setState({ otherAdditivesR: event.target.value })}
                            />
                        </div>
                    </div><br /><br />
                    <div class="form-row box" style={{ padding: "10px" }}>
                        <div class="form-group col-md-3 ">
                            <label><b>Alkali:</b></label>
                            <input
                                type="text"
                                placeholder="alkali"
                                class="form-control"
                                name="alkali"
                                value={this.state.alkali}
                                onChange={(event) => this.setState({ alkali: event.target.value })}
                            />
                        </div>
                        <div class="form-group col-md-3 ">
                            <label><b>Alkali R:</b></label>
                            <input
                                type="text"
                                placeholder="alkali R"
                                class="form-control"
                                name="alkaliR"
                                value={this.state.alkaliR}
                                onChange={(event) => this.setState({ alkaliR: event.target.value })}
                            />
                        </div>
                        <div class="form-group col-md-3 ">
                            <label><b>Acid:</b></label>
                            <input
                                type="text"
                                placeholder="acid"
                                class="form-control"
                                name="acid"
                                value={this.state.acid}
                                onChange={(event) => this.setState({ acid: event.target.value })}
                            />
                        </div>
                        <div class="form-group col-md-3 ">
                            <label><b>Acid R:</b></label>
                            <input
                                type="text"
                                placeholder="acid R"
                                class="form-control"
                                name="acidR"
                                value={this.state.acidR}
                                onChange={(event) => this.setState({ acidR: event.target.value })}
                            />
                        </div>
                    </div>
                    <br /><br />
                    <div class="form-row box d-flex justify-content-center box" style={{ padding: "10px" }}>
                        <span class="form-group col-md-6 "><h5><b>If Glass Container</b> </h5>
                            <div class="form-group col-md-7 ">
                                <label class="my-1 mr-2"><b>Type of Container :</b></label>

                                <input
                                    type="text"
                                    placeholder="type of Container"
                                    name="typeOfContainer"
                                    class="form-control"
                                    value={this.state.glassContainer.typeOfContainer}
                                    onChange={(event) => this.setState({ glassContainer: { ...this.state.glassContainer, typeOfContainer: event.target.value } })}
                                />
                            </div>
                            <div class="form-group col-md-7 ">
                                <label class="my-1 mr-2"><b>No.of.Container:</b></label>
                                <input
                                    type="text"
                                    placeholder="no.of.Container"
                                    name="numberOfContainer"
                                    class="form-control"
                                    value={this.state.glassContainer.numberOfContainer}
                                    onChange={(event) => this.setState({ glassContainer: { ...this.state.glassContainer, numberOfContainer: event.target.value } })}
                                />
                            </div>
                            <div class="form-group col-md-7 ">
                                <label class="my-1 mr-2"><b>Agitation Type & speed:</b></label>
                                <input
                                    type="text"
                                    placeholder="agitation type & speed"
                                    name="agitationTypeSpeed"
                                    class="form-control"
                                    value={this.state.glassContainer.agitationTypeSpeed}
                                    onChange={(event) => this.setState({ glassContainer: { ...this.state.glassContainer, agitationTypeSpeed: event.target.value } })}
                                />
                            </div>
                        </span>
                        <span class="form-group col-md-6 "><h5><b>If Bioreactor : </b></h5>
                            <div class="form-group col-md-7 ">
                                <label class="my-1 mr-2"><b>Type & Size :</b></label>
                                <input
                                    type="text"
                                    placeholder="bioreactor type & size"
                                    name="bioreactorTypeSize"
                                    class="form-control"
                                    value={this.state.bioReactor.bioreactorTypeSize}
                                    onChange={(event) => this.setState({ bioReactor: { ...this.state.bioReactor, bioreactorTypeSize: event.target.value } })}
                                />
                            </div>
                            <div class="form-group col-md-7 ">
                                <label class="my-1 mr-2"><b>Type Agitation/Tilt angle :</b></label>
                                <input
                                    type="text"
                                    placeholder="no.of.Container"
                                    name="typeAgitationOrTiltAngle"
                                    class="form-control"
                                    value={this.state.bioReactor.typeAgitationOrTiltAngle}
                                    onChange={(event) => this.setState({ bioReactor: { ...this.state.bioReactor, typeAgitationOrTiltAngle: event.target.value } })}
                                /> </div>
                            <div class="form-group col-md-7 ">
                                <label class="my-1 mr-2"><b>Agitation speed :</b></label>
                                <input
                                    type="text"
                                    placeholder="agitation type & speed"
                                    name="agitationSpeed"
                                    class="form-control"
                                    value={this.state.bioReactor.agitationSpeed}
                                    onChange={(event) => this.setState({ bioReactor: { ...this.state.bioReactor, agitationSpeed: event.target.value } })}
                                />
                            </div>
                        </span>
                    </div><br /><br />
                    <label class="my-1 mr-2"><h5><b>PH CONTROL :</b></h5></label><br />
                    <div class="form-row box" style={{ padding: "10px" }}>
                        <div class="form-group col-md-10">
                            <div> {this.createUI()} </div>
                            <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-primary" onClick={this.addClick.bind(this)}>Add more</button>
                            <div class="form-group row"><label class="col-sm-5  col-form-label"><b>If continuous monitoring, the set pH value is :</b></label>
                                <div class="col-sm-3"><input
                                    type="text"
                                    placeholder="set Ph Value"
                                    name="setPhValue"
                                    class="form-control"
                                    value={this.state.setPhValue}
                                    onChange={(event) => this.setState({ setPhValue: event.target.value })}
                                />
                                </div>
                            </div>
                        </div>
                    </div><br /><br />

                    <label class="my-1 mr-2"> <h5><b>DO2 CONTROL  :</b></h5></label><br />
                    <div class="form-row box" style={{ padding: "10px" }}>
                        <div class="form-group col-md-10">
                            <div> {this.controlUI()} </div>
                            <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-primary" onClick={this.addcontrolClick.bind(this)}>Add more</button>
                            <br />
                            <div class="form-group row">
                                <label class="col-sm-5  col-form-label"><b>If continuous monitoring, the set DO2 value is  :</b></label>
                                <div class="col-sm-3">
                                    <input
                                        type="text"
                                        placeholder="set DO 2 Value"
                                        name="do2value"
                                        class="form-control"
                                        value={this.state.do2value}
                                        onChange={(event) => this.setState({ do2value: event.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div><br /><br />

                    <label class="my-1 mr-2"> <h5><b> Remarks of Aeration :</b></h5></label>
                    <div class="form-row box" style={{ padding: "10px" }}>
                        <div class="form-group col-md-10">
                            <div> {this.remarksUI()} </div>
                            <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-primary" onClick={this.addRemarksClick.bind(this)}>Add more</button>
                            <div class="form-group row">
                                <label class="col-sm-5  col-form-label"><b> Remarks of Aeration, Done By Name :</b></label>
                                <div class="col-sm-3">
                                    <input
                                        type="text"
                                        placeholder="name"
                                        name="doneBy"
                                        class="form-control"
                                        value={this.state.doneBy}
                                        onChange={(event) => this.setState({ doneBy: event.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div><br /><br />

                    <label class="my-1 mr-2"><h5><b> Sample Labelling  :</b></h5></label>
                    <div class="form-row box" style={{ padding: "10px" }}>
                        <div class="form-group col-md-10">
                            <div> {this.sampleLabelUI()} </div>
                            <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-primary" onClick={this.addSampleClick.bind(this)}>Add more</button>

                        </div>
                    </div><br /><br />
                    <label class="my-1 mr-2"> <h5><b>QC Control Tests   :</b></h5></label>
                    <div class="form-row box" style={{ padding: "10px" }}>
                        <div class="form-group col-md-10">
                            <div> {this.qcControlUI()} </div>
                            <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-primary" onClick={this.addQCControlClick.bind(this)}>Add more</button>

                        </div>
                    </div><br /><br />


                    <div class="form-row box" style={{ padding: "10px" }}>
                        <label class="form-group col-sm-3 col-form-label"><b>General Remarks Of Culture :</b>
                        </label>
                        <div class="col-sm-9">
                            <input
                                type="text"
                                placeholder="Remarks of Culture"
                                class="form-control"
                                name="generalRemarkOFCulture"
                                value={this.state.generalRemarkOFCulture}
                                onChange={(event) => this.setState({ generalRemarkOFCulture: event.target.value })}
                            />
                        </div>
                        <br />

                        <label class=" col-sm-3 col-form-label"><b>Details Of Harvesting:</b></label>
                        <div class="form-group col-sm-9"  >
                            <TextareaAutosize
                                aria-label="minimum height"
                                type="text"
                                rowsMin={15}
                                class="form-control"
                                name="detailsofharvesting"
                                value={this.state.detailsofharvesting}
                                placeholder="Details of Harvesting"
                                onChange={(event) => this.setState({ detailsofharvesting: event.target.value })}
                            />
                        </div>
                        <br />

                        <label class="form-group col-sm-3 col-form-label"><b>Reference Of Down Stream Processing:</b></label>
                        <div class="form-group col-sm-9">
                            <input
                                type="text"
                                placeholder="reference of down stream processing"
                                name="reffDownStreamProcessing"
                                class="form-control"
                                value={this.state.reffDownStreamProcessing}
                                onChange={(event) => this.setState({ reffDownStreamProcessing: event.target.value })}
                            />
                        </div><br />
                        <div class="form-group row d-flex justify-content-center">
                            <span class="col-sm-6">
                                <label><b>Done By Name 1:</b> </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    class="form-control"
                                    name="donebyname1"
                                    value={this.state.donebyname1}
                                    onChange={(event) => this.setState({ donebyname1: event.target.value })}
                                />
                            </span>

                            <span class="col-sm-6">
                                <label ><b>Done By Name 2:</b> </label>

                                <input
                                    type="text"
                                    placeholder="Name"
                                    class="form-control"
                                    name="donebyname2"
                                    value={this.state.donebyname2}
                                    onChange={(event) => this.setState({ donebyname2: event.target.value })}
                                />
                            </span>

                        </div>
                    </div>
                    <br />
                    <div class="box form-row d-flex justify-content-center" style={{ padding: "10px" }}>
                        <h5><b>Control & Approval :</b></h5>
                        &nbsp;&nbsp; &nbsp;&nbsp;
                        <div class="form-group col">
                            <div class="form-group row">
                                <span class="col-sm-3"><label><b>Prepared by:</b></label>
                                    <input
                                        type="text"
                                        placeholder=" Prep. by Name"
                                        class="form-control"
                                        name="preparedby"
                                        value={this.state.preparedby}
                                        onChange={(event) => this.setState({ preparedby: event.target.value })}
                                    /></span>
                                <span class="col-sm-3">
                                    <label><b>Date: </b></label>{this.state.preparedByDate === "" ?
                                        <DatePicker
                                            type="Date"
                                            placeholder="Select Date"
                                            class="form-control"
                                            name="preparedByDate"
                                            defaultValue={""}
                                            style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                            onChange={(date, dateString) => { this.handleDateState("preparedByDate", date, dateString) }}
                                        /> : <DatePicker
                                            type="Date"
                                            placeholder="Select Date"
                                            class="form-control"
                                            name="preparedByDate"
                                            value={moment(this.state.preparedByDate)}
                                            style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                            onChange={(date, dateString) => { this.handleDateState("preparedByDate", date, dateString) }}
                                        />}
                                </span>
                            </div>
                            <div class="form-group row">
                                <span class="col-sm-3"><label><b>Dept. Head: </b></label>
                                    <input
                                        type="text"
                                        placeholder="Dept. Head Name"
                                        name="deptHead"
                                        class="form-control"
                                        value={this.state.deptHead}
                                        onChange={(event) => this.setState({ deptHead: event.target.value })}
                                    /></span>
                                <span class="col-sm-3">
                                    <label><b>Date: </b></label>
                                    {this.state.deptHeadDate === "" ?
                                        <DatePicker
                                            type="Date"
                                            format="YYYY-MM-DD"
                                            placeholder="Select Date"
                                            defaultValue={''}
                                            name="deptHeadDate"
                                            class="form-control"
                                            //  value= moment(this.state.deptHeadDate) : ''}
                                            style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                            onChange={(date, dateString) => { this.handleDateState("deptHeadDate", date, dateString) }}
                                        /> : <DatePicker
                                            type="Date"
                                            format="YYYY-MM-DD"
                                            placeholder="Select Date"
                                            //defaultValue={''}
                                            name="deptHeadDate"
                                            class="form-control"
                                            value={moment(this.state.deptHeadDate)}
                                            style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                            onChange={(date, dateString) => { this.handleDateState("deptHeadDate", date, dateString) }}
                                        />}
                                </span>
                            </div>
                            <div class="form-group row">
                                <span class="col-sm-3"><label class="row-sm-3"><b>QAD:</b> </label>
                                    <input
                                        type="text"
                                        placeholder="QAD Name"
                                        name="qad"
                                        class="form-control"
                                        value={this.state.qad}
                                        onChange={(event) => this.setState({ qad: event.target.value })}
                                    /></span>
                                <span class="col-sm-3">
                                    <label><b>Date: </b></label>{this.state.qadDate === "" ?
                                        <DatePicker
                                            dateFormat="YYYY-MM-DD"
                                            placeholder="Select Date"
                                            name="qadDate"
                                            defaultValue={''}
                                            style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                            class="form-control"
                                            onChange={(date, dateString) => { this.handleDateState("qadDate", date, dateString) }}
                                        /> : <DatePicker
                                            dateFormat="YYYY-MM-DD"
                                            placeholder="Select Date"
                                            name="qadDate"
                                            value={moment(this.state.qadDate)}
                                            style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                            class="form-control"
                                            onChange={(date, dateString) => { this.handleDateState("qadDate", date, dateString) }}
                                        />}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-success" type="submit" onClick={this.updateDetails}>Update</button>
                </form>

            </div >
        );
    }
}

export default UpdateDetails;