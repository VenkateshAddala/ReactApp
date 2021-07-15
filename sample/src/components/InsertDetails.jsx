import React, { Component } from 'react';
import Service from './Service';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Modal, TimePicker, DatePicker } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const { confirm } = Modal;

export default class InsertDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mc: '',
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
            glassContainer: {

            },
            bioReactor: {

            },
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
        this.baseState = this.state;
        this.saveDetails = this.saveDetails.bind(this);
        this.viewDetails = this.viewDetails.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleControlChange = this.handleControlChange.bind(this);
        this.removecontrolClick = this.removecontrolClick.bind(this);
        this.handleRemarksChange = this.handleRemarksChange.bind(this);
        this.removeRemarksClick = this.removeRemarksClick.bind(this);
        this.handleMcChange = this.handleMcChange.bind(this);

    }
    viewDetails() {
        this.props.history.push('/Get_Details');
    }
    saveDetails = () => {
        if (this.state.mc !== '' && this.state.mcDate !== '' && this.state.nameOfOrganism !== '') {
            confirm({
                title: "Data with same ID already exists",
                icon: <ExclamationCircleOutlined />,
                content: "Enter new Id...",
                onOk() {
                    console.log("OK");
                    this.props.history.push('/');
                },
                onCancel() {
                    console.log("Cancel");
                }
            });
        }
        console.log(this.state.mcDate)

        let err;
        let details = {
            id: this.state.mc, mcDate: this.state.mcDate, passageNo: this.state.passageNo,
            barCode: this.state.barCode, nameOfOrganism: this.state.nameOfOrganism, source: this.state.source,
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
        console.log('Details=>', JSON.stringify(details));

        // axios.post("http://localhost:8083/micro_control/insert_micro", details).then(res => console.log(res))
        if (this.state.mc !== '' && this.state.mcDate !== '' && this.state.nameOfOrganism !== '') {
            Service.postDetails(details).then((res) => {
                console.log(details)
                console.log(res.status)

            }).catch(error => {
                err = error.response.status;
                console.log(error.response.status);
            })
            if (err !== 200) {
                // window.alert("As ID already exists Entered details cannot be saved!!!")
                confirm({
                    title: "Data with same ID already exists",
                    icon: <ExclamationCircleOutlined />,
                    content: "Duplication is not allowed.",
                    onOk() {
                        console.log("OK");
                        this.props.history.push('/');
                    },
                    onCancel() {
                        console.log("Cancel");
                    }
                });
            }
            // this.props.history.push('/');
        }
    }



    createUI() {
        return this.state.phController.map((index, ii) =>
            <div class="form-row" key={ii}>&nbsp;&nbsp;
                <TimePicker use12Hours format="h:mm A" name="phattTime" class="form-control col" style={{ margin: '5px 15px 10px 0px', height: "38px" }}
                    placeholder="At Time" onChange={(time, timeString) => this.handleDateChange(ii, "phattTime", time, timeString)} />
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
            <div class="form-row" key={ii}>&nbsp;&nbsp;
                <TimePicker use12Hours format="h:mm A" name="do2AtTime" class="form-control col" style={{ margin: '5px 10px 10px 0px', height: "38px" }}
                    placeholder="At Time" onChange={(time, timeString) => this.handleControlDateChange(ii, "do2AtTime", time, timeString)} />
                <input type="text" name="o2" class="form-control col" value={index.o2} style={{ margin: '5px 10px 10px 0px' }}
                    placeholder="O2" onChange={(event) => this.handleControlChange(ii, event)} />
                <div class="form-group col-md-6">
                    <input type="text" name="gasOrAirAddition" class="form-control col" value={index.gasOrAirAddition} style={{ margin: '5px 10px 10px 0px' }}
                        placeholder="gas/air addition" onChange={(event) => this.handleControlChange(ii, event)} />
                </div>
                <DeleteIcon style={{ fontSize: "45" }} onClick={(event) => this.removecontrolClick(ii, event)} />

            </div>
        )
    }

    remarksUI() {
        return this.state.remarksOnAeration.map((index, ii) =>
            <div class="form-row" key={ii}>
                <span class="form-group col-md-2">
                    <DatePicker name="aerationDate" class="form-control col" style={{ margin: '5px 10px 10px 0px', height: "38px", width: "100%" }}
                        placeholder="Date" onChange={(date, dateString) => this.handleRemarksDateChange(ii, "aerationDate", date, dateString)} />
                </span>&nbsp;&nbsp;&nbsp;
                <span class="form-group col-md-3">
                    <TimePicker use12Hours format="h:mm A" name="aerationTime" class="form-control col" style={{ margin: '5px 10px 10px 0px', height: "38px", width: "100%" }}
                        placeholder="Time" onChange={(time, timeString) => this.handleRemarksDateChange(ii, "aerationTime", time, timeString)} />
                </span>&nbsp;&nbsp;&nbsp;
                <div class="form-group col-md-6">
                    <input type="text" name="aerationDetails" class="form-control col" value={index.aerationDetails} style={{ margin: '5px 10px 10px 0px', width: "100%" }}
                        placeholder="Details of addition" onChange={(event) => this.handleRemarksChange(ii, event)} />
                </div>
                <DeleteIcon style={{ fontSize: "45" }} onClick={(event) => this.removeRemarksClick(ii, event)} />
            </div>
        )
    }

    sampleLabelUI() {
        return this.state.sampleLabelling.map((index, ii) =>
            <div class="form-row" key={ii}>
                <div class="form-group col-md-2">
                    <DatePicker name="sampleLabellingDate" class="form-control col" style={{ margin: '5px 10px 10px 0px', height: "38px", width: "100%" }}
                        placeholder="Date" onChange={(date, dateString) => this.handleSampledateChange(ii, "sampleLabellingDate", date, dateString)} />
                </div>&nbsp;&nbsp;
                <TimePicker use12Hours format="h:mm A" name="sampleLabellingTime" class="form-control col" style={{ margin: '5px 10px 10px 0px', height: "38px" }}
                    placeholder="Time" onChange={(time, timeString) => this.handleSampledateChange(ii, "sampleLabellingTime", time, timeString)} />
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
                        placeholder="sample no" onChange={(event) => this.handleQcChange(ii, event)} /></div>
                <div class="form-group col-md-3">
                    <input type="text" name="nameOFTest" class="form-control col" value={index.nameOFTest} style={{ margin: '5px 10px 10px 0px' }}
                        placeholder="Name" onChange={(event) => this.handleQcChange(ii, event)} />
                </div>
                <div class="form-group col-md-2">
                    <input type="number" name="qcRefNo" class="form-control col" value={index.qcRefNo} style={{ margin: '5px 10px 10px 0px' }}
                        placeholder="Ref.no" onChange={(event) => this.handleQcChange(ii, event)} />
                </div>
                <div class="form-group col-md-4">
                    <input type="text" name="qcresult" class="form-control col" value={index.qcresult} style={{ margin: '5px 10px 10px 0px', width: "100%" }}
                        placeholder="Result" onChange={(event) => this.handleQcChange(ii, event)} />
                </div>



                <DeleteIcon style={{ fontSize: "45" }} onClick={(event) => this.removeQcClick(ii, event)} />
            </div>
        )
    }


    async addClick(event) {
        event.preventDefault();
        const fields = [...this.state.phController];
        //console.log(fields)
        //await fields.push({ phattTime: '', ph: '', phAlkali: '' });
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
        //console.log(fields)
        //await fields.push({ phattTime: '', ph: '', phAlkali: '' });
        //await console.log("Fields :::: ", fields)
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
        //console.log(fields)
        //await fields.push({ phattTime: '', ph: '', phAlkali: '' });
        //await console.log("Fields :::: ", fields)
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
        //console.log(fields)
        //await fields.push({ phattTime: '', ph: '', phAlkali: '' });
        //await console.log("Fields :::: ", fields)
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
        //console.log(fields)
        //await fields.push({ phattTime: '', ph: '', phAlkali: '' });
        //await console.log("Fields :::: ", fields)
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
    handleDateChange(index, dateS, time, datestring) {
        console.log(time, '::', datestring)
        let d = "";
        if (time !== null) {
            d = new Date(time._d);
        }
        // console.log(d)
        let values = [...this.state.phController];
        //console.log(values);
        let [name, value] = [dateS, d];
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ phController: values });
    }

    handleChange(index, event) {
        console.log(index, " :: ", event.target.value)
        let values = [...this.state.phController];
        //console.log(values);
        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ phController: values });
    }
    handleControlDateChange(index, date, time, datestring) {
        //console.log(index," :: ",event.target.value)
        let d = "00:00";
        if (time !== null) {
            d = new Date(time._d);
        }
        //console.log(d)
        let values = [...this.state.do2Controller];
        //console.log(values);
        let [name, value] = [date, d];
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ do2Controller: values });
    }
    handleControlChange(index, event) {
        //console.log(index," :: ",event.target.value)
        let values = [...this.state.do2Controller];
        //console.log(values);
        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ do2Controller: values });
    }
    handleRemarksDateChange(index, dateS, date, dateString) {
        //console.log(index," :: ",event.target.value)
        let d = null;
        if (date !== null && date._d !== null) {
            d = new Date(date._d);
        }
        let values = [...this.state.remarksOnAeration];
        console.log(d);
        let [name, value] = [dateS, d];
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ remarksOnAeration: values });
    }

    handleRemarksChange(index, event) {
        //console.log(index," :: ",event.target.value)
        let values = [...this.state.remarksOnAeration];
        //console.log(values);
        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ remarksOnAeration: values });
    }


    handleSampledateChange(index, dateS, date, datestring) {
        console.log(date, " :: ", datestring)
        // console.log(date)
        let d = "00:00";
        if (date !== null) {
            d = new Date(date._d);
        }
        let values = [...this.state.sampleLabelling];
        console.log(values);
        let [name, value] = [dateS, d];
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ sampleLabelling: values });
    }

    handleSampleChange(index, event) {
        //  console.log(date, " :: ", datestring)
        // console.log(date)
        let values = [...this.state.sampleLabelling];
        console.log(values);
        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ sampleLabelling: values });
    }
    handleQcChange(index, event) {
        //console.log(index," :: ",event.target.value)
        let values = [...this.state.qcControllTest];
        //console.log(values);
        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ qcControllTest: values });
    }



    async handleMcChange(event) {
        let id = event.target.value;
        console.log(id);
        await this.setState({ mc: event.target.value })
        if (id !== null) {
            await Service.putDetails(this.state.mc).then((res) => {
                try {
                    if (res.data.id !== null) {
                        // alert(`Id: ${res.data.id} already exists`);
                        confirm({
                            title: `ID ${res.data.id} already exists`,
                            icon: <ExclamationCircleOutlined />,
                            content: "Enter New ID!!!",
                            onOk() {
                                console.log("OK");
                                window.location.reload(false);
                            },
                            onCancel() {
                                console.log("Cancel");
                            }
                        });
                    }
                } catch (err) {
                    console.log("")
                }

            })
        }
    }

    render() {
        return (
            <div  >
                <div style={{ margin: '5px 0px 50px 0px' }}><h1 className="text-center" >Microbial Cell Culture</h1></div>
                <div>
                    <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-primary" onClick={this.viewDetails}>View Records</button>
                </div>
                <form style={{ marginTop: '20px' }} onSubmit={this.saveDetails} >
                    <div class="form-row box" style={{ padding: "10px" }}>
                        <div class="form-group col-md-4">
                            <label><b>MC: </b></label>
                            <input
                                type="number"
                                placeholder="MC"
                                name="mc"
                                class="form-control"
                                /*   className="form-control" */
                                value={this.state.mc}
                                required
                                onChange={(event) => this.handleMcChange(event)}
                            />
                        </div>
                        <div class="form-group col-sm-4"></div>
                        <div class="form-group col-md-4">
                            <label><b>Date: </b></label>

                            <DatePicker
                                required
                                id="date"
                                name="mcDate"
                                class="form-control"
                                style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                /*  data-date-format="dd-mm-yyyy" */

                                onChange={(date, dateString) => { this.setState({ mcDate: dateString }) }}

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
                                onChange={(event) => this.setState({ nameOfOrganism: event.target.value })}
                                required
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
                            <label><b>Seed Used &Quantity Medium</b> </label>
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
                        <div class="form-group col-md-5">
                            <label><b>Time of Setting up :</b></label>
                            <TimePicker use12Hours format="h:mm A"
                                placeholder="Time of Setting up"
                                name="timeOfSetting"
                                class="form-control"

                                style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                onSelect={(time, timeString) => { this.setState({ timeOfSetting: time._d }) }}
                            />
                        </div><div class="form-group col-md-2"></div>
                        <div class="form-group col-md-5">
                            <label><b>Temp. Incubation(\B0C):</b></label>
                            <input
                                type="text"
                                placeholder="Temp. incubation"
                                class="form-control"
                                name="tempIncubation"
                                value={this.state.tempIncubation}
                                onChange={(event) => this.setState({ tempIncubation: event.target.value })}
                            />
                        </div>

                    </div><br /><br />
                    <div class="form-row box" style={{ padding: "10px" }}>
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
                    <br /> <br />
                    <div class="form-row  d-flex justify-content-center box" style={{ padding: "10px" }}>
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
                                <label class="col-sm-5  col-form-label"><b>If continuous monitoring,set DO2 value is  :</b></label>
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

                        <label class="form-group col-sm-3 col-form-label"><b>General Remarks Of Culture:</b></label>
                        <div class="col-sm-9">
                            <input
                                type="text"
                                placeholder="Remarks of Culture"
                                name="generalRemarkOFCulture"
                                class="form-control"
                                value={this.state.generalRemarkOFCulture}
                                onChange={(event) => this.setState({ generalRemarkOFCulture: event.target.value })}
                            /> </div>
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
                            /> </div>
                        <br />
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

                    <br /><br />


                    <div class="box form-row d-flex justify-content-center" style={{ padding: "10px" }}>
                        <h5><b>Control & Approval :</b></h5>
                       &nbsp;&nbsp; &nbsp;&nbsp;
                        <div class="form-group col">
                            <div class="form-group row">
                                <span class="col-sm-3"><label><b>Prepared by:</b> </label>
                                    <input
                                        type="text"
                                        placeholder=" Prep. by Name"
                                        class="form-control"
                                        name="preparedby"
                                        value={this.state.preparedby}
                                        onChange={(event) => this.setState({ preparedby: event.target.value })}
                                    /></span>
                                <span class="col-sm-3">
                                    <label><b>Date: </b></label>
                                    <DatePicker
                                        type="Date"
                                        placeholder="Select Date"
                                        class="form-control"
                                        name="preparedByDate"
                                        style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                        onChange={(date, dateString) => { this.setState({ preparedByDate: dateString }) }}
                                    />
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
                                    <DatePicker
                                        type="Date"
                                        placeholder="Select Date"
                                        name="deptHeadDate"
                                        class="form-control"
                                        style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                        onChange={(date, dateString) => { this.setState({ deptHeadDate: dateString }) }}
                                    />
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
                                    <label><b>Date: </b></label>
                                    <DatePicker
                                        type="Date"
                                        placeholder="Select Date"
                                        name="qadDate"
                                        style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                                        class="form-control"
                                        onChange={(date, dateString) => { this.setState({ qadDate: dateString }) }}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-success" type="submit">Save</button>
                </form>

            </div >
        );
    }
}



