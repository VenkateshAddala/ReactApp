import React, { Component, Fragment } from 'react';
import { Collapse, DatePicker, Radio, Checkbox, Divider, Modal } from 'antd';
import { Button } from '@material-ui/core';
import Service from './Service';
import DeleteIcon from '@material-ui/icons/Delete';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { PlusOutlined, MinusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import moment from 'moment';


const { confirm } = Modal;
const { Panel } = Collapse;


export class UpdateToro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            FirstRadio: '',

            tcc: this.props.match.params.id,
            tccDate: '',
            pp_ss_Micromatrix: '',
            pvc_pp_gl_ss_suspension: '',
            torocellSystemIdNo: '',
            barcode: '',
            vesselTypeObj: {},
            portObj: {},
            matrixObj: {},
            sensorObj: {},
            remarks_OnTheSystem: '',
            bioReactorContainer: {},
            cells: '',
            passageno: '',
            source: '',

            cellCmList: [],

            trypsin_R: '',
            mediumOfCell: '',
            mediumnOfCell_R: '',
            serum: '',
            serum_r: '',
            totalNoofCellseeded: '',
            cellsPerML: '',
            cellsPerSqCm: '',
            medium: '',
            medium_R: '',
            serumNo: '',
            serumPercentage: '',
            serumNo_R: '',
            sodiumbiCarbonate: '',
            antibiotics1: '',
            antibiotics1_R: '',
            antibiotics2: '',
            antibiotics2_R: '',
            other: '',
            other_r: '',
            totalVolumeOfMedium: '',
            settingUpCulture: '',
            cultureSetUpBy: {},

            sampleTccDayList: [],

            terminationCulture: '',
            summary: '',
            control_Approval: {},
            dateString: ''
        }
        this.updateToro = this.updateToro.bind(this);
        this.viewDetails = this.viewDetails.bind(this);

    }

    componentDidMount() {
        //window.location.reload(false);

        if (localStorage.getItem("isChecked") !== "") {
            if (localStorage.getItem("Reload") !== "") {
                localStorage.setItem("Reload", "")
                window.location.reload(false);
            } else {

                Service.putToro(this.state.tcc).then((res) => {
                    let micro = res.data;
                    console.log(micro);
                    this.setState({
                        tcc: micro.id, tccDate: micro.tccDate, pp_ss_Micromatrix: micro.pp_ss_Micromatrix,
                        pvc_pp_gl_ss_suspension: micro.pvc_pp_gl_ss_suspension,
                        torocellSystemIdNo: micro.torocellSystemIdNo, barcode: micro.barcode, vesselTypeObj: micro.vesselTypeObj,
                        portObj: micro.portObj, matrixObj: micro.matrixObj, sensorObj: micro.sensorObj,
                        remarks_OnTheSystem: micro.remarks_OnTheSystem, bioReactorContainer: micro.bioReactorContainer, cells: micro.cells,
                        passageno: micro.passageno, source: micro.source, cellCmList: micro.cellCmList,
                        trypsin_R: micro.trypsin_R, mediumOfCell: micro.mediumOfCell, mediumnOfCell_R: micro.mediumnOfCell_R,
                        serum: micro.serum, serum_r: micro.serum_r, totalNoofCellseeded: micro.totalNoofCellseeded,
                        cellsPerML: micro.cellsPerML, cellsPerSqCm: micro.cellsPerSqCm, medium: micro.medium,
                        medium_R: micro.medium_R, serumNo: micro.serumNo, serumPercentage: micro.serumPercentage,
                        serumNo_R: micro.serumNo_R, sodiumbiCarbonate: micro.sodiumbiCarbonate,
                        antibiotics1: micro.antibiotics1, antibiotics1_R: micro.antibiotics1_R,
                        antibiotics2: micro.antibiotics2, antibiotics2_R: micro.antibiotics2_R, other: micro.other,
                        other_r: micro.other_r, totalVolumeOfMedium: micro.totalVolumeOfMedium, settingUpCulture: micro.settingUpCulture,
                        cultureSetUpBy: micro.cultureSetUpBy, sampleTccDayList: micro.sampleTccDayList, terminationCulture: micro.terminationCulture,
                        summary: micro.summary, control_Approval: micro.control_Approval

                    })

                });
            }
        } else {
            this.props.history.push("/Get_Toro_Records")
        }
    }

    updateToro = (event) => {
        event.preventDefault();
        let err;
        // console.log("Entered save details..........")
        let details = {
            pp_ss_Micromatrix: this.state.pp_ss_Micromatrix, pvc_pp_gl_ss_suspension: this.state.pvc_pp_gl_ss_suspension,
            torocellSystemIdNo: this.state.torocellSystemIdNo,
            barcode: this.state.barcode, vesselTypeObj: this.state.vesselTypeObj, portObj: this.state.portObj,
            matrixObj: this.state.matrixObj, sensorObj: this.state.sensorObj,
            remarks_OnTheSystem: this.state.remarks_OnTheSystem, bioReactorContainer: this.state.bioReactorContainer, cells: this.state.cells,
            passageno: this.state.passageno, source: this.state.source, cellCmList: this.state.cellCmList,
            trypsin_R: this.state.trypsin_R, mediumOfCell: this.state.mediumOfCell, mediumnOfCell_R: this.state.mediumnOfCell_R,
            serum: this.state.serum, serum_r: this.state.serum_r, totalNoofCellseeded: this.state.totalNoofCellseeded,
            cellsPerML: this.state.cellsPerML, cellsPerSqCm: this.state.cellsPerSqCm, medium: this.state.medium,
            medium_R: this.state.medium_R, serumNo: this.state.serumNo, serumPercentage: this.state.serumPercentage,
            serumNo_R: this.state.serumNo_R, sodiumbiCarbonate: this.state.sodiumbiCarbonate,
            antibiotics1: this.state.antibiotics1, antibiotics1_R: this.state.antibiotics1_R,
            antibiotics2: this.state.antibiotics2, antibiotics2_R: this.state.antibiotics2_R, other: this.state.other,
            other_r: this.state.other_r, totalVolumeOfMedium: this.state.totalVolumeOfMedium, settingUpCulture: this.state.settingUpCulture,
            cultureSetUpBy: this.state.cultureSetUpBy, sampleTccDayList: this.state.sampleTccDayList, terminationCulture: this.state.terminationCulture,
            summary: this.state.summary, control_Approval: this.state.control_Approval

        };
        console.log('Details=>', JSON.stringify(details));

        Service.updateToro(details, this.state.tcc).then((res) => {
            localStorage.setItem("isChecked", "")
            this.props.history.push('/Get_Toro_Records');
        })
    }


    sampleTccUI() {
        return this.state.sampleTccDayList.map((index, ii) =>
            <Collapse accordion style={{ borderRadius: "5px" }} >
                <Panel header={`Sample TCC ${ii}  `} key={ii}>
                    <div class="form-group col-md-25" key={ii}>

                        <div class="form-row">
                            <div class="form-group col-md-1">
                                <label><b>Date: </b></label></div>
                            <div class="form-group col-md-4">{index.date === null ?
                                < DatePicker
                                    id="date"
                                    name="date"
                                    class="form-control"
                                    defaultValue={''}
                                    style={{ width: "70%", height: "100%", borderRadius: "4px" }}
                                    /*  data-date-format="dd-mm-yyyy" */

                                    onChange={(date, dateString) => this.handleSampleDateChange(ii, "date", date, dateString)}
                                /> :
                                < DatePicker
                                    id="date"
                                    name="date"
                                    class="form-control"
                                    value={moment(index.date)}
                                    style={{ width: "70%", height: "100%", borderRadius: "4px" }}


                                    onChange={(date, dateString) => this.handleSampleDateChange(ii, "date", date, dateString)}
                                />}
                            </div>
                    &nbsp;
                    <div class="form-group col-md-4">
                                <label><b>Sample Quantity: 10ml x 2 tubes : </b></label>
                                <Checkbox
                                    name="sampleQuantity"
                                    class="form-control"
                                    value="sampleQuantity"
                                    checked={index.sampleQuantity == "sampleQuantity" ? true : false}
                                    onChange={(event) => this.handleSampleCheck(ii, event)}
                                />
                            </div>&nbsp;
                    <DeleteIcon style={{ fontSize: "45" }} onClick={(event) => this.removeSampleTCC(ii, event)} />
                            <div class="form-row" style={{ paddingTop: "50px" }}>

                                <div class="form-group col-md-2">
                                    <label><b>Hour-1</b></label>
                                    <input
                                        type="text"
                                        placeholder="Hours"
                                        class="form-control"
                                        name="hours1"
                                        value={index.hours1}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}
                                    />
                                </div>
                                <div class="form-group col-md-2">
                                    <label><b>Appearance:</b></label>
                                    <input
                                        type="text"
                                        placeholder="of Culture fluid"
                                        class="form-control"
                                        name="physicalApperence1"
                                        value={index.physicalApperence1}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}

                                    />
                                </div>
                                <div class="form-group col-md-4">
                                    <label><b>pH Culture fluid (</b></label>&nbsp;
                            <Checkbox
                                        placeholder="TCC"
                                        name="phOnline1"
                                        class="form-control"
                                        value="phOnline1"
                                        checked={index.phOnline1 == "phOnline1" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Online</b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="phManual1"
                                        class="form-control"
                                        value="phManual1"
                                        checked={index.phManual1 == "phManual1" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Manual)</b></Checkbox>
                                    <input
                                        type="text"
                                        placeholder="pH Culture fluid"
                                        class="form-control"
                                        name="ph_Culture1"
                                        value={index.ph_Culture1}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}

                                    />
                                </div>
                                <div class="form-group col-md-4">
                                    <label><b>dO2 Culture fluid (</b></label>&nbsp;
                            <Checkbox
                                        placeholder="TCC"
                                        name="doOnline1"
                                        class="form-control"
                                        value="doOnline1"
                                        checked={index.doOnline1 == "doOnline1" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b> Online </b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="doManual1"
                                        class="form-control"
                                        value="doManual1"
                                        checked={index.doManual1 == "doManual1" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Manual)</b></Checkbox>
                                    <input
                                        type="text"
                                        placeholder="Cell spreader"
                                        class="form-control"
                                        name="do2_Culture1"
                                        value={index.do2_Culture1}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}

                                    />
                                </div>
                                <Divider />
                                <div class="form-group col-md-2">
                                    <label><b>Hour-2</b></label>
                                    <input
                                        type="text"
                                        placeholder="Hours"
                                        class="form-control"
                                        name="hours2"
                                        value={index.hours2}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}

                                    />
                                </div>
                                <div class="form-group col-md-2">
                                    <label><b>Appearance:</b></label>
                                    <input
                                        type="text"
                                        placeholder="of Culture fluid"
                                        class="form-control"
                                        name="physicalApperence2"
                                        value={index.physicalApperence2}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}

                                    />
                                </div>
                                <div class="form-group col-md-4">
                                    <label><b>pH Culture fluid (</b></label>&nbsp;
                            <Checkbox
                                        placeholder="TCC"
                                        name="phOnline2"
                                        class="form-control"
                                        value="phOnline2"
                                        checked={index.phOnline2 === "phOnline2" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Online</b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="phManual2"
                                        class="form-control"
                                        value="phManual2"
                                        checked={index.phManual2 === "phManual2" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Manual)</b></Checkbox>
                                    <input
                                        type="text"
                                        placeholder="pH culture"
                                        class="form-control"
                                        name="ph_Culture2"
                                        value={index.ph_Culture2}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}

                                    />
                                </div>
                                <div class="form-group col-md-4">
                                    <label><b>dO2 Culture fluid (</b></label>&nbsp;
                            <Checkbox
                                        placeholder="TCC"
                                        name="doOnline2"
                                        class="form-control"
                                        value="doOnline2"
                                        checked={index.doOnline2 === "doOnline2" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b> Online </b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="doManual2"
                                        class="form-control"
                                        value="doManual2"
                                        checked={index.doManual2 === "doManual2" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Manual)</b></Checkbox>
                                    <input
                                        type="text"
                                        placeholder="dO2 culture"
                                        class="form-control"
                                        name="do2_Culture2"
                                        value={index.do2_Culture2}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}

                                    />
                                </div>
                                <Divider />
                                <div class="form-group col-md-2">
                                    <label><b>Hour-3</b></label>
                                    <input
                                        type="text"
                                        placeholder="Hours"
                                        class="form-control"
                                        name="hours3"
                                        value={index.hours3}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}

                                    />
                                </div>
                                <div class="form-group col-md-2">
                                    <label><b>Appearance:</b></label>
                                    <input
                                        type="text"
                                        placeholder="of Culture fluid"
                                        class="form-control"
                                        name="physicalApperence3"
                                        value={index.physicalApperence3}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}

                                    />
                                </div>
                                <div class="form-group col-md-4">
                                    <label><b>pH Culture fluid (</b></label>&nbsp;
                            <Checkbox
                                        placeholder="TCC"
                                        name="phOnline3"
                                        class="form-control"
                                        value="phOnline3"
                                        checked={index.phOnline3 === "phOnline3" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Online</b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="phManual3"
                                        class="form-control"
                                        value="doOnline3"
                                        checked={index.doOnline3 === "doOnline3" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Manual)</b></Checkbox>
                                    <input
                                        type="text"
                                        placeholder="pH culture"
                                        class="form-control"
                                        name="ph_Culture3"
                                        value={index.ph_Culture3}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}

                                    />
                                </div>
                                <div class="form-group col-md-4">
                                    <label><b>dO2 Culture fluid (</b></label>&nbsp;
                            <Checkbox
                                        placeholder="TCC"
                                        name="doOnline3"
                                        class="form-control"
                                        value="doOnline3"
                                        checked={index.doOnline3 === "doOnline3" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b> Online </b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="doManual3"
                                        class="form-control"
                                        value="doManual3"
                                        checked={index.doManual3 === "doManual3" ? true : false}
                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Manual)</b></Checkbox>
                                    <input
                                        type="text"
                                        placeholder="dO2 culture"
                                        class="form-control"
                                        name="do2_Culture3"
                                        value={index.do2_Culture3}
                                        onChange={(event) => this.handleSampleCellInput(ii, event)}

                                    />
                                </div>
                            </div><br /><br />
                            <br />

                        </div><div class="form-group row">
                            <label class="col-sm-4 col-form-label"><b>Glucose concentration - Test Method:</b></label>
                            <div class="col-sm-8">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="glucoseConcentration"
                                    value={index.glucoseConcentration}
                                    placeholder="Glucose concentration - Test Method"
                                    onChange={(event) => this.handleSampleCellInput(ii, event)}
                                />
                            </div>
                        </div><br /><br /><br />
                        <h6><label><b>OD Standards :  </b></label></h6>
                        <div class="form-row">
                            <div class="form-group col-md-2">
                                <label><b>100μg /ml</b></label>
                                <input
                                    type="text"
                                    placeholder="Per ml"
                                    class="form-control"
                                    name="hundredG"
                                    value={index.hundredG}
                                    onChange={(event) => this.handleSampleCellInput(ii, event)}

                                />
                            </div>
                            <div class="form-group col-md-2">
                                <label><b>200μg /ml</b></label>
                                <input
                                    type="text"
                                    placeholder="Per ml"
                                    class="form-control"
                                    name="twoHundredG"
                                    value={index.twoHundredG}
                                    onChange={(event) => this.handleSampleCellInput(ii, event)}

                                />
                            </div>
                            <div class="form-group col-md-2">
                                <label><b>300μg /ml</b></label>
                                <input
                                    type="text"
                                    placeholder="Per ml"
                                    class="form-control"
                                    name="threeHundredG"
                                    value={index.threeHundredG}
                                    onChange={(event) => this.handleSampleCellInput(ii, event)}

                                />
                            </div>
                            <div class="form-group col-md-2">
                                <label><b>400μg /ml</b></label>
                                <input
                                    type="text"
                                    placeholder="Per ml"
                                    class="form-control"
                                    name="fourHundredG"
                                    value={index.fourHundredG}
                                    onChange={(event) => this.handleSampleCellInput(ii, event)}

                                />
                            </div>
                            <div class="form-group col-md-2">
                                <label><b>500μg /ml</b></label>
                                <input
                                    type="text"
                                    placeholder="Per ml"
                                    class="form-control"
                                    name="fiveHundredG"
                                    value={index.fiveHundredG}
                                    onChange={(event) => this.handleSampleCellInput(ii, event)}

                                />
                            </div>
                            <div class="form-group col-md-2">
                                <label><b>600μg /ml</b></label>
                                <input
                                    type="text"
                                    placeholder="Per ml"
                                    class="form-control"
                                    name="sixHundredG"
                                    value={index.sixHundredG}
                                    onChange={(event) => this.handleSampleCellInput(ii, event)}

                                />
                            </div>
                        </div><br />



                        <br />
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label><b>Gms/L  :  </b></label>
                                <input
                                    type="text"
                                    placeholder="Gms/L "
                                    class="form-control"
                                    name="gmsL"
                                    value={index.gmsL}
                                    onChange={(event) => this.handleSampleCellInput(ii, event)}
                                />
                            </div>
                            <div class="form-group col-md-6">
                                <label><b>OD of Test Sample: </b> </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="OD of Test Sample"
                                    name="odOfSample"
                                    value={index.odOfSample}
                                    onChange={(event) => this.handleSampleCellInput(ii, event)}
                                />
                            </div>
                        </div><br />
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label"><b>Media Conditioning, Additions and Remarks :</b></label>
                            <div class="col-sm-9">
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    type="text"
                                    rowsMin={10}
                                    class="form-control"
                                    name="mediaConditioning_AdditionAndRemark"
                                    value={index.mediaConditioning_AdditionAndRemark}
                                    placeholder="Media Conditioning, Additions and Remarks"
                                    onChange={(event) => this.handleSampleCellInput(ii, event)}
                                />
                            </div>
                        </div><br /></div>
                </Panel>
            </Collapse>

        )
    }

    handleSampleCellInput(index, event) {
        console.log(index)
        let values = [...this.state.sampleTccDayList];
        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value }
        console.log(values)
        this.setState({ sampleTccDayList: values });
    }

    handleSampleCheck(index, event) {
        let check = event.target.checked
        if (check) {
            let values = [...this.state.sampleTccDayList];
            let { name, value } = event.target;
            values[index] = { ...values[index], [name]: value }
            console.log(values)
            this.setState({ sampleTccDayList: values });

        } else {
            let values = [...this.state.sampleTccDayList];
            let { name, value } = event.target;
            values[index] = { ...values[index], [name]: null }
            console.log(values)
            this.setState({ sampleTccDayList: values });

        }
    }
    handleSampleDateChange(index, dateS, date, datestring) {
        console.log(date, '::', datestring)
        let d = null;
        if (date !== null && date._d !== null) {
            d = new Date(date._d);
        }
        let values = [...this.state.sampleTccDayList];
        let [name, value] = [dateS, d];
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ sampleTccDayList: values });
    }


    async addSampleTcc(event) {
        event.preventDefault();
        const fields = [...this.state.sampleTccDayList];
        //console.log(fields)
        //await fields.push({ phattTime: '', ph: '', phAlkali: '' });
        await console.log("Fields :::: ", fields)
        if (fields.length === 0) {
            await this.setState({ sampleTccDayList: [...this.state.sampleTccDayList, fields] })
        } else {
            await this.setState({ sampleTccDayList: [...this.state.sampleTccDayList, {}] })
        }

        await console.log(this.state.sampleTccDayList);
    }

    async removeSampleTCC(index, event) {
        event.preventDefault();
        let values = [...this.state.sampleTccDayList];
        await values.splice(index, 1);
        await this.setState({ sampleTccDayList: values });
        console.log(values);
    }


    cellListUI() {
        return this.state.cellCmList.map((index, ii) =>
            <Tbody key={ii}>
                <Tr>
                    <Td>
                        <input
                            type="text"
                            placeholder="CM No"
                            class="form-control"
                            name="cmNo"
                            value={index.cmNo}
                            onChange={(event) => this.handleCellChange(ii, event)}
                        />
                    </Td>
                    <Td>
                        <input
                            type="text"
                            placeholder="No. of Containers"
                            class="form-control"
                            name="noOfContainer"
                            value={index.noOfContainer}
                            onChange={(event) => this.handleCellChange(ii, event)}
                        />
                    </Td>

                    <Td>
                        <input
                            type="text"
                            placeholder="Yield/Cont."
                            class="form-control"
                            name="yieldCount"
                            value={index.yieldCount}
                            onChange={(event) => this.handleCellChange(ii, event)}
                        />
                    </Td>
                    <Td>
                        <input
                            type="text"
                            placeholder="Cell Yield/sq.cm"
                            class="form-control"
                            name="cellYield"
                            value={index.cellYield}
                            onChange={(event) => this.handleCellChange(ii, event)}
                        />
                    </Td>
                    <Td>
                        <input
                            type="text"
                            placeholder="Total cell"
                            class="form-control"
                            name="cellCount"
                            value={index.cellCount}
                            onChange={(event) => this.handleCellChange(ii, event)}
                        />
                    </Td>
                    <Td> <MinusOutlined style={{ fontSize: "30px" }} onClick={(event) => this.removeCellList(ii, event)} /></Td>
                </Tr>
            </Tbody>
        )
    }

    handleCellChange(index, event) {
        let values = [...this.state.cellCmList];
        //console.log(values);
        let { name, value } = event.target;
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ cellCmList: values });
    }

    async addCellList(event) {
        event.preventDefault();
        const fields = [...this.state.cellCmList];
        //console.log(fields)
        //await fields.push({ phattTime: '', ph: '', phAlkali: '' });
        await console.log("Fields :::: ", fields)
        if (fields.length === 0) {
            await this.setState({ cellCmList: [...this.state.cellCmList, fields] })
        } else {
            await this.setState({ cellCmList: [...this.state.cellCmList, {}] })
        }

        await console.log(this.state.cellCmList);
    }

    async removeCellList(index, event) {
        event.preventDefault();
        let values = [...this.state.cellCmList];
        await values.splice(index, 1);
        await this.setState({ cellCmList: values });
        console.log(values);
    }






    viewDetails() {
        this.props.history.push('/Get_Toro_Records');
    }

    onVesselChange = (text, e) => {

        if (e.target.checked == true) {
            console.log(e.target.checked)
            this.setState({ vesselTypeObj: { ...this.state.vesselTypeObj, [text]: e.target.value } })
            console.log(text, "::", e.target.value);
        } else {
            console.log(e.target.checked)
            this.setState({ vesselTypeObj: { ...this.state.vesselTypeObj, [text]: null } })
            console.log(text, "::", null);
        }
        console.log(this.state.vesselTypeObj)
    }
    onChange4 = e => {
        let val = e.target.value
        this.setState({ FirstRadio: val })
        console.log(val)
        if (val == "pvc_true") {
            this.setState({
                pvc_pp_gl_ss_suspension: "pvc_true",
                pp_ss_Micromatrix: "pp_false"
            })


            console.log("pvc_pp_gl_ss_suspension  :::  ", this.state.pvc_pp_gl_ss_suspension)
            console.log("pp_ss_Micromatrix  :::  ", this.state.pp_ss_Micromatrix)
        }
        else {
            this.setState({
                pvc_pp_gl_ss_suspension: "pvc_false",
                pp_ss_Micromatrix: "pp_true"
            })

            console.log("pvc_pp_gl_ss_suspension  :::  ", this.state.pvc_pp_gl_ss_suspension)
            console.log("pp_ss_Micromatrix  :::  ", this.state.pp_ss_Micromatrix)
        }
        // console.log(this.state.pp_ss_Micromatrix);
        // console.log(this.state.pvc_pp_gl_ss_suspension);
    };
    onPhChange = (e) => {
        let check = e.target.checked
        if (check) {

            console.log("Ph make = ", e.target.value);
            this.setState({ sensorObj: { ...this.state.sensorObj, pH: e.target.value } })
        } else {
            this.state.pH = null;
            console.log("Ph make = ", this.state.pH)
            this.setState({ sensorObj: { ...this.state.sensorObj, pH: null } })
        }
    }
    onDoChange = (e) => {
        let check = e.target.checked
        if (check) {
            console.log("Do make = ", e.target.value);
            this.setState({ sensorObj: { ...this.state.sensorObj, dO: e.target.value } })
        } else {
            this.state.dO = null;
            console.log("Do make = ", this.state.dO)
            this.setState({ sensorObj: { ...this.state.sensorObj, dO: null } })
        }

    }

    render() {
        const { FirstRadio } = this.state
        const optionsWithDisabled = [
            { label: "PVC/PP/GL/SS SUSPENSION", value: "pvc_true", name: "pvc_pp_gl_ss_suspension" },
            { label: "PP/SS MACROMATRIX", value: "pp_true", name: "pp_ss_Micromatrix" }
        ];

        return (<div class="form-group col-md-16">
            <div style={{ margin: '5px 0px 50px 0px' }}><h1 className="text-center" >Torocell</h1></div>

            <form style={{ marginTop: '20px' }}>
                <div class="form-row box" style={{ padding: "10px" }}>
                    <div class="form-group col-md-3" style={{ paddingRight: "7%" }}>
                        <label><b>TCC: </b></label>
                        <input
                            type="number"
                            placeholder="TCC"
                            name="tcc"
                            class="form-control"
                            value={this.state.tcc}
                            required
                            disabled

                        />
                    </div>&nbsp;

                    <Radio.Group
                        options={optionsWithDisabled}
                        value={this.state.pvc_pp_gl_ss_suspension == "pvc_true" ? this.state.pvc_pp_gl_ss_suspension : this.state.pp_ss_Micromatrix}
                        onChange={this.onChange4}
                        style={{ padding: "30px 7% 0 0" }}
                        buttonStyle="solid"
                        optionType="button"
                        required
                    >

                    </Radio.Group>
                        &nbsp;
                    <div class="form-group col-md-3">
                        <label><b>Date: </b></label>

                        <DatePicker
                            id="date"
                            name="tccdate"
                            class="form-control"
                            value={moment(this.state.tccdate)}
                            style={{ width: "100%", height: "57%", borderRadius: "4px" }}

                            required
                            disabled


                        />
                    </div>
                </div>
                <br /><br />
                <div class="form-row box" style={{ padding: "10px" }}>
                    <div class="form-group col-md-4">
                        <label><b>TOROCELL SYSTEM ID NO :  </b></label>
                        <input
                            type="text"
                            placeholder="torocell System Id"
                            class="form-control"
                            name="torocellSystemIdNo"
                            value={this.state.torocellSystemIdNo}
                            onChange={(event) => this.setState({ torocellSystemIdNo: event.target.value })}
                        />
                    </div>
                    <div class="form-group col-sm-3"></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div class="form-group col-md-4">
                        <label><b>Barcode: </b> </label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="barcode"
                            name="barcode"
                            value={this.state.barcode}
                            onChange={(event) => this.setState({ barcode: event.target.value })}
                        />
                    </div>
                </div><br /><br />
                <div class="form-row box" style={{ padding: "10px" }}>
                    <div class="form-group col-md-5">
                        <h6><b>Details Of Assembly:</b> Mark 	&#10004; as appropriate.</h6>
                    </div>
                    <div class="form-group col-md-18">
                        <span class="form-group col-md-2">   <label><b>VESSEL TYPE :  </b></label></span>
                        <span class="form-group col-md-2"> <Checkbox name="pvc" checked={this.state.vesselTypeObj.pvc == "pvc" ? true : false} value={"pvc"} onChange={(e) => this.onVesselChange("pvc", e)}><b>PVC</b></Checkbox></span>
                        <span class="form-group col-md-2"> <Checkbox name="pp" checked={this.state.vesselTypeObj.pp == "pp" ? true : false} value={"pp"} onChange={(e) => this.onVesselChange("pp", e)}><b>PP</b></Checkbox></span>
                        <span class="form-group col-md-2"> <Checkbox name="ss_small_lit" checked={this.state.vesselTypeObj.ss_small_lit == "ss_small_lit" ? true : false} value={"ss_small_lit"} onChange={(e) => this.onVesselChange("ss_small_lit", e)}><b>SS Small Lit</b></Checkbox></span>
                        <span class="form-group col-md-2"> <Checkbox name="ss_big_lit" checked={this.state.vesselTypeObj.ss_big_lit == "ss_big_lit" ? true : false} value={"ss_big_lit"} onChange={(e) => this.onVesselChange("ss_big_lit", e)}><b>SS Big Lit</b></Checkbox></span>
                        <span class="form-group col-md-2"> <Checkbox name="conditional_vessel" checked={this.state.vesselTypeObj.conditional_vessel == "conditional_vessel" ? true : false} value={"conditional_vessel"} onChange={(e) => this.onVesselChange("conditional_vessel", e)}><b>Conditional Vessel</b></Checkbox></span>

                    </div>
                </div><br />
                <h6><label><b>PORTS:  </b></label></h6>
                <div class="form-row d-flex justify-content-center box" style={{ padding: "10px" }}>

                    <div class="form-group col-md-3">
                        <label><b>No. of Inlet ports</b></label>
                        <input
                            type="text"
                            placeholder="no. of inlet ports"
                            class="form-control"
                            name="noOfInletPorts"
                            value={this.state.portObj.noOfInletPorts}
                            onChange={(event) => this.setState({ portObj: { ...this.state.portObj, noOfInletPorts: event.target.value } })}

                        />
                    </div>
                    <div class="form-group col-md-3">
                        <label><b>No. of Outlet Ports(Dipping)</b></label>
                        <input
                            type="text"
                            placeholder="no. of outlet ports"
                            class="form-control"
                            name="noOfOutletPorts"
                            value={this.state.portObj.noOfOutletPorts}
                            onChange={(event) => this.setState({ portObj: { ...this.state.portObj, noOfOutletPorts: event.target.value } })}

                        />
                    </div>
                    <div class="form-group col-md-3">
                        <label><b>Cell Spreader</b></label>
                        <input
                            type="text"
                            placeholder="Cell spreader"
                            class="form-control"
                            name="cellSpreader"
                            value={this.state.portObj.cellSpreader}
                            onChange={(event) => this.setState({ portObj: { ...this.state.portObj, cellSpreader: event.target.value } })}

                        />
                    </div>
                    <div class="form-group col-md-3">
                        <label><b>Cell Sampler CoverSlip</b></label>
                        <input
                            type="text"
                            placeholder="Cell Sampler"
                            class="form-control"
                            name="cellSamplerCoverSlip"
                            value={this.state.portObj.cellSamplerCoverSlip}
                            onChange={(event) => this.setState({ portObj: { ...this.state.portObj, cellSamplerCoverSlip: event.target.value } })}

                        />
                    </div>

                </div><br /><br />
                <h6><label><b>MATRIX :  </b></label></h6>
                <div class="form-row d-flex justify-content-center box" style={{ padding: "10px" }}>
                    <div class="form-group col-md-2 col-example text-left">
                        <label><b>No. of Matrix</b></label>
                        <input
                            type="text"
                            placeholder="no. of matrix"
                            class="form-control"
                            name="noOfMatrix"
                            value={this.state.matrixObj.noOfMatrix}
                            onChange={(event) => this.setState({ matrixObj: { ...this.state.matrixObj, noOfMatrix: event.target.value } })}

                        />
                    </div><span class="form-group col-md-0"></span>
                    <span class="form-group col-md-0"></span>
                    <div class="form-group col-md-2">
                        <label><b>Other Type Details</b></label>
                        <input
                            type="text"
                            placeholder="Other Type Details"
                            class="form-control"
                            name="otherTypeDetails"
                            value={this.state.matrixObj.otherTypeDetails}
                            onChange={(event) => this.setState({ matrixObj: { ...this.state.matrixObj, otherTypeDetails: event.target.value } })}

                        />
                    </div><span class="form-group col-md-0"></span>
                    <span class="form-group col-md-0"></span>
                    <div class="form-group col-md-2">
                        <label><b>OtherType Value</b></label>
                        <input
                            type="text"
                            placeholder="OtherType Value"
                            class="form-control"
                            name="otherTypeValue"
                            value={this.state.matrixObj.otherTypeValue}
                            onChange={(event) => this.setState({ matrixObj: { ...this.state.matrixObj, otherTypeValue: event.target.value } })}

                        />
                    </div><span class="form-group col-md-0"></span>
                    <span class="form-group col-md-0"></span>
                    <div class="form-group col-md-2">
                        <label><b>Carbonate Left</b></label>
                        <input
                            type="text"
                            placeholder="Carbonate Left"
                            class="form-control"
                            name="carbonateLeft"
                            value={this.state.matrixObj.carbonateLeft}
                            onChange={(event) => this.setState({ matrixObj: { ...this.state.matrixObj, carbonateLeft: event.target.value } })}

                        />
                    </div><span class="form-group col-md-0"></span>
                    <span class="form-group col-md-0"></span>
                    <div class="form-group col-md-2">
                        <label><b>Carbonate Right</b></label>
                        <input
                            type="text"
                            placeholder="Carbonate Right"
                            class="form-control"
                            name="carbonateRight"
                            value={this.state.matrixObj.carbonateRight}
                            onChange={(event) => this.setState({ matrixObj: { ...this.state.matrixObj, carbonateRight: event.target.value } })}

                        />
                    </div>
                </div><br /><br />
                <h6><label><b>SENSORS :  </b></label></h6>
                <div class="form-row  d-flex justify-content-center box" style={{ padding: "10px" }}>
                    <div class="form-group col-md-2">
                        <label><b>No. of Sensors:  </b></label>
                        <input
                            type="text"
                            placeholder="no. of sensors"
                            class="form-control"
                            name="noOFSensor"
                            value={this.state.sensorObj.noOFSensor}
                            onChange={(event) => this.setState({ sensorObj: { ...this.state.sensorObj, noOFSensor: event.target.value } })}

                        />
                    </div><span class="form-group col-md-0"></span>
                    <span class="form-group col-md-0"></span>&nbsp;&nbsp;

                        <div class="form-group col-md-4 h">
                        <Checkbox value={"Ph make"} onChange={this.onPhChange}><b>pH</b>Make</Checkbox>
                        <span class="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;

                        <label for="make">&nbsp;</label>
                        <input
                            class="form-control"
                            placeholder="pH Make"
                            name="pH_make"
                            value={this.state.sensorObj.ph_make}
                            type="text"
                            onChange={(event) => this.setState({ sensorObj: { ...this.state.sensorObj, pH_make: event.target.value } })}
                        />
                    </div><span class="form-group col-md-0"></span>
                    <span class="form-group col-md-0"></span>&nbsp;&nbsp;
                        <span class="form-group col-md-0"></span>
                    <div class="form-group col-md-4 h">
                        <Checkbox value={"Do make"} onChange={this.onDoChange}><b>DO</b>Make</Checkbox>
                        <span class="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;

                        <label for="make">&nbsp;</label>
                        <input
                            class="form-control"
                            placeholder="Do Make"
                            name="do_Make"
                            value={this.state.sensorObj.do_Make}
                            type="text"
                            onChange={(event) => this.setState({ sensorObj: { ...this.state.sensorObj, do_Make: event.target.value } })}
                        />
                    </div>
                </div>
                <br /><br />
                <div class="form-row box" style={{ padding: "10px" }} >
                    <label class="col-sm-3 col-form-label"><b>Remarks on the system.Details of AIR/GAS connections, Air Pumps etc:</b></label>
                    <div class="col-sm-9">
                        <TextareaAutosize
                            aria-label="minimum height"
                            type="text"
                            rowsMin={15}
                            class="form-control"
                            name="remarks_OnTheSystem"
                            value={this.state.remarks_OnTheSystem}
                            placeholder="Remarks on the system.Details of AIR/GAS connections, Air Pumps etc"
                            onChange={(event) => this.setState({ remarks_OnTheSystem: event.target.value })}
                        />
                    </div>
                </div><br /><br />
                <div class="form-col " style={{ padding: "10px" }}><h5 class="text-center" style={{ padding: "10px" }} ><b>PREPARATION OF BIOREACTOR CONTAINER</b></h5></div>
                <div class="form-row d-flex justify-content-center box" style={{ padding: "10px" }}>
                    <span class="form-group col-md-4 ">
                        <div class="form-group col-md ">
                            <label class="my-1 mr-2"><b>If Bag-Bag irradiated:</b></label>
                            <input
                                type="text"
                                placeholder="if bag irradiated"
                                name="bagIrradiated"
                                class="form-control"
                                value={this.state.bioReactorContainer.bagIrradiated}
                                onChange={(event) => this.setState({ bioReactorContainer: { ...this.state.bioReactorContainer, bagIrradiated: event.target.value } })}
                            />
                        </div>
                        <div class="form-group col-md ">
                            <label class="my-1 mr-2"><b>If Vessel-Sterilized on:</b></label>
                            <input
                                type="text"
                                placeholder="if vessel sterilized on"
                                name="vesselSterilizedOn"
                                class="form-control"
                                value={this.state.bioReactorContainer.vesselSterilizedOn}
                                onChange={(event) => this.setState({ bioReactorContainer: { ...this.state.bioReactorContainer, vesselSterilizedOn: event.target.value } })}
                            />
                        </div>
                        <div class="form-group col-md ">
                            <label class="my-1 mr-2"><b>Sterilization Run No :</b></label>
                            <input
                                type="text"
                                placeholder="sterilization run no."
                                name="sterilizationRunno"
                                class="form-control"
                                value={this.state.bioReactorContainer.sterilizationRunno}
                                onChange={(event) => this.setState({ bioReactorContainer: { ...this.state.bioReactorContainer, sterilizationRunno: event.target.value } })}
                            />
                        </div>
                    </span><span class="form-group col-md-3">
                    </span>
                    <span class="form-group col-md-4 ">
                        <div class="form-group col-md ">
                            <label class="my-1 mr-2"><b>Irradation Batch No:</b></label>
                            <input
                                type="text"
                                placeholder="irradation batch no"
                                name="irradationBatchNo"
                                class="form-control"
                                value={this.state.bioReactorContainer.irradationBatchNo}
                                onChange={(event) => this.setState({ bioReactorContainer: { ...this.state.bioReactorContainer, irradationBatchNo: event.target.value } })}
                            />
                        </div>
                        <div class="form-group col-md ">
                            <label class="my-1 mr-2"><b>Method:</b></label>
                            <input
                                type="text"
                                placeholder="method"
                                name="method"
                                class="form-control"
                                value={this.state.bioReactorContainer.method}
                                onChange={(event) => this.setState({ bioReactorContainer: { ...this.state.bioReactorContainer, method: event.target.value } })}
                            /> </div>
                        <div class="form-group col-md ">
                            <label class="my-1 mr-2"><b>QC Check Of Sterility:</b></label>
                            <input
                                type="text"
                                placeholder="QC Check Of Sterility"
                                name="qcCheckofSterility"
                                class="form-control"
                                value={this.state.bioReactorContainer.qcCheckofSterility}
                                onChange={(event) => this.setState({ bioReactorContainer: { ...this.state.bioReactorContainer, qcCheckofSterility: event.target.value } })}
                            />
                        </div>
                    </span>
                </div><br /><br />
                <div class="form-row box" style={{ padding: "10px" }}>
                    <div class="form-group col-md-3">
                        <label><b>Cells:  </b></label>
                        <input
                            type="text"
                            placeholder="cells"
                            class="form-control"
                            name="cells"
                            value={this.state.cells}
                            onChange={(event) => this.setState({ cells: event.target.value })}

                        />
                    </div><span class="form-group col-md-0"></span>

                    <div class="form-group col-md-4 h">

                        <span class="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;

                        <label for="make"><b>Passage No. :</b></label>
                        <input

                            class="form-control"
                            placeholder="passage no."
                            name="passageno"
                            value={this.state.passageno}
                            type="text"
                            onChange={(event) => this.setState({ passageno: event.target.value })}
                        />
                    </div><span class="form-group col-md-0"></span>
                    <div class="form-group col-md-4 h">

                        <span class="glyphicon glyphicon-ok"></span>&nbsp;&nbsp;

                        <label for="make"><b>Source :</b></label>
                        <input
                            class="form-control"
                            placeholder="source"
                            name="source"
                            value={this.state.source}
                            type="text"
                            onChange={(event) => this.setState({ source: event.target.value })}
                        />
                    </div>
                </div>
                <br /><br />
                <h6><label><b>Cell List :  </b></label></h6>
                <div class="form-row col-md-15 box" style={{ padding: "10px" }}>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>CM No </Th>
                                <Th>No. of Containers</Th>
                                <Th>Yield/Cont.</Th>
                                <Th>Cell Yield/sq.cm :</Th>
                                <Th>Total cell</Th>
                                <Th><PlusOutlined style={{ fontSize: "30px" }} onClick={this.addCellList.bind(this)} /></Th>
                            </Tr>
                        </Thead>
                        <br />
                        {this.cellListUI()}
                        <br /><br />

                    </Table>
                </div><br /><br /><br />


                <div class="form-row col-md-15 box" style={{ padding: "10px" }}>

                    <div class="form-group col-md-3">
                        <label><b>Trypsin :</b></label>
                        <input
                            type="text"
                            placeholder="Trypsin_R"
                            class="form-control"
                            name="trypsin_R"
                            value={this.state.trypsin_R}
                            onChange={(event) => this.setState({ trypsin_R: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-2">
                        <label><b>Medium Of cells:</b></label>
                        <input
                            type="text"
                            placeholder="Medium Of cells:"
                            class="form-control"
                            name="mediumOfCell"
                            value={this.state.mediumOfCell}
                            onChange={(event) => this.setState({ mediumOfCell: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-2">
                        <label><b>Medium Of cells R:</b></label>
                        <input
                            type="text"
                            placeholder="Medium Of cells R"
                            class="form-control"
                            name="mediumnOfCell_R"
                            value={this.state.mediumnOfCell_R}
                            onChange={(event) => this.setState({ mediumnOfCell_R: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-2">
                        <label><b>Serum : <b>In %</b></b></label>
                        <input
                            type="text"
                            placeholder="Serum"
                            class="form-control"
                            name="serum"

                            value={this.state.serum}
                            onChange={(event) => this.setState({ serum: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-2">
                        <label><b>Serum R :</b></label>
                        <input
                            type="text"
                            placeholder="serum R"
                            class="form-control"
                            name="serum_r"
                            value={this.state.serum_r}
                            onChange={(event) => this.setState({ serum_r: event.target.value })}

                        />
                    </div>
                </div><br /><br />

                <div class="form-row box" style={{ padding: "10px" }}>
                    <div class="form-group col-md-3">
                        <label><b>Total No. of Cells Seeded:  </b></label>
                        <input
                            type="text"
                            placeholder="Total No. of Cells Seeded"
                            class="form-control"
                            name="totalNoofCellseeded"
                            value={this.state.totalNoofCellseeded}
                            onChange={(event) => this.setState({ totalNoofCellseeded: event.target.value })}

                        />
                    </div>&nbsp;&nbsp;

                        <div class="form-group col-md-4 h">

                        <span class="glyphicon glyphicon-ok"></span>

                        <label for="make"><b>Cells Per ml :</b></label>
                        <input

                            class="form-control"
                            placeholder="Cells Per ml"
                            name="cellsPerML"
                            value={this.state.cellsPerML}
                            type="text"
                            onChange={(event) => this.setState({ cellsPerML: event.target.value })}
                        />
                    </div>&nbsp;&nbsp;
                        <div class="form-group col-md-4 h">

                        <span class="glyphicon glyphicon-ok"></span>

                        <label for="make"><b>Cells per Sq.Cm :</b></label>
                        <input
                            class="form-control"
                            placeholder="Cells per Sq.Cm"
                            name="cellsPerSqCm"
                            value={this.state.cellsPerSqCm}
                            type="text"
                            onChange={(event) => this.setState({ cellsPerSqCm: event.target.value })}
                        />
                    </div>
                </div>
                <br /><br />
                <div class="form-row box" style={{ padding: "10px" }}>

                    <div class="form-group col-md-2">
                        <label><b>Medium :</b></label>
                        <input
                            type="text"
                            placeholder="medium"
                            class="form-control"
                            name="medium"
                            value={this.state.medium}
                            onChange={(event) => this.setState({ medium: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-3">
                        <label><b>Medium R:</b></label>
                        <input
                            type="text"
                            placeholder="Medium R"
                            class="form-control"
                            name="medium_R"
                            value={this.state.medium_R}
                            onChange={(event) => this.setState({ medium_R: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-1">
                        <label><b>Serum  :</b></label>
                        <input
                            type="text"
                            placeholder="serum no."
                            class="form-control"
                            name="serumNo"
                            value={this.state.serumNo}
                            onChange={(event) => this.setState({ serumNo: event.target.value })}

                        />
                    </div>
                    <div class="form-group col-md-1">
                        <label><b> %  </b></label>
                        <input
                            type="text"
                            placeholder="%"
                            class="form-control"
                            name="serumPercentage"
                            value={this.state.serumPercentage}
                            onChange={(event) => this.setState({ serumPercentage: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-2">
                        <label><b>Serum R:</b></label>
                        <input
                            type="text"
                            placeholder="Serum r"
                            class="form-control"
                            name="serumNo_R"
                            value={this.state.serumNo_R}
                            onChange={(event) => this.setState({ serumNo_R: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-2">
                        <label><b>Sodium Bicarbonate :</b></label>
                        <input
                            type="text"
                            placeholder="Sodium Bicarbonate R"
                            class="form-control"
                            name="sodiumbiCarbonate"
                            value={this.state.sodiumbiCarbonate}
                            onChange={(event) => this.setState({ sodiumbiCarbonate: event.target.value })}

                        />
                    </div>
                </div><br /><br />

                <div class="form-row box" style={{ padding: "10px" }}>

                    <div class="form-group col-md-2">
                        <label><b>Antibiotics 1 :</b></label>
                        <input
                            type="text"
                            placeholder="Antibiotics 1"
                            class="form-control"
                            name="antibiotics1"
                            value={this.state.antibiotics1}
                            onChange={(event) => this.setState({ antibiotics1: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-1" >
                        <label><b> R:</b></label>
                        <input
                            type="text"
                            placeholder="R"
                            class="form-control"
                            name="antibiotics1_R"
                            value={this.state.antibiotics1_R}
                            onChange={(event) => this.setState({ antibiotics1_R: event.target.value })}

                        />
                    </div>&nbsp;&nbsp;
                    <div class="form-group col-md-2">
                        <label><b>Antibiotics 2  :</b></label>
                        <input
                            type="text"
                            placeholder="Antibiotics 2"
                            class="form-control"
                            name="antibiotics2"
                            value={this.state.antibiotics2}
                            onChange={(event) => this.setState({ antibiotics2: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-1" >
                        <label><b>  R:  </b></label>
                        <input
                            type="text"
                            placeholder="R"
                            class="form-control"
                            name="antibiotics2_R"
                            value={this.state.antibiotics2_R}
                            onChange={(event) => this.setState({ antibiotics2_R: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-3">
                        <label><b>Other :</b></label>
                        <input
                            type="text"
                            placeholder="other"
                            class="form-control"
                            name="other"
                            value={this.state.other}
                            onChange={(event) => this.setState({ other: event.target.value })}

                        />
                    </div>&nbsp;
                    <div class="form-group col-md-2">
                        <label><b>Other R :</b></label>
                        <input
                            type="text"
                            placeholder="other R"
                            class="form-control"
                            name="other_r"
                            value={this.state.other_r}
                            onChange={(event) => this.setState({ other_r: event.target.value })}

                        />
                    </div>
                </div><br /><br />
                <div class="form-row box" style={{ padding: "10px" }}>

                    <label class="col-sm-4 col-form-label"><b>Total Volume of Medium for Initiating the Culture </b></label>
                    <span class="col-sm-0"></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <div class="col-sm-7">
                        <input
                            type="text"
                            class="form-control"
                            name="totalVolumeOfMedium"
                            value={this.state.totalVolumeOfMedium}
                            placeholder="Total Volume of Medium for Initiating the Culture"
                            onChange={(event) => this.setState({ totalVolumeOfMedium: event.target.value })}
                        />
                    </div>
                </div><br /><br />
                <div class="form-row box" style={{ padding: "10px" }}>
                    <label class="col-sm-3 col-form-label"><b>Method of Setting up of Culture ::</b></label>
                    <div class="col-sm-9">
                        <TextareaAutosize
                            aria-label="minimum height"
                            type="text"
                            rowsMin={10}
                            class="form-control"
                            name="settingUpCulture"
                            value={this.state.settingUpCulture}
                            placeholder="Method of Setting up of Culture"
                            onChange={(event) => this.setState({ settingUpCulture: event.target.value })}
                        />
                    </div>
                </div><br /><br />
                <div class="form-row box" style={{ padding: "10px" }}>
                    <h5><b>Culture Set up By :</b></h5>
                    <br />
                    <div class="form-group col d-flex justify-content-center">
                        <span class="form-group col-md-4">
                            <div class="form-group"><label><b>Name : </b></label>
                                <input
                                    type="text"
                                    placeholder="Name "
                                    class="form-control"
                                    name="name1"
                                    value={this.state.cultureSetUpBy.name1}
                                    onChange={(event) => this.setState({ cultureSetUpBy: { ...this.state.cultureSetUpBy, name1: event.target.value } })}
                                /></div>

                            <div class="form-group"><label><b>Name : </b></label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name2"
                                    class="form-control"
                                    value={this.state.cultureSetUpBy.name2}
                                    onChange={(event) => this.setState({ cultureSetUpBy: { ...this.state.cultureSetUpBy, name2: event.target.value } })}
                                /></div>


                        </span>
                        <span class="form-group col-md-4">
                            <div class="form-group">
                                <label><b>Designation :</b></label>
                                <input
                                    type="text"
                                    placeholder="Designation "
                                    class="form-control"
                                    name="designation1"
                                    value={this.state.cultureSetUpBy.designation1}
                                    onChange={(event) => this.setState({ cultureSetUpBy: { ...this.state.cultureSetUpBy, designation1: event.target.value } })}
                                /></div>
                            <div class="form-group">
                                <label><b>Designation :</b></label>
                                <input
                                    type="text"
                                    placeholder="Designation "
                                    name="designation2"
                                    class="form-control"
                                    value={this.state.cultureSetUpBy.designation2}
                                    onChange={(event) => this.setState({ cultureSetUpBy: { ...this.state.cultureSetUpBy, designation2: event.target.value } })}
                                />
                            </div>
                        </span>
                    </div><br />
                </div><br /><br />
                <div class="form-row box" style={{ padding: "10px" }}>
                    <div class="form-group col">
                        {this.sampleTccUI()}
                        <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-primary" onClick={this.addSampleTcc.bind(this)} >Add Days</button>
                    </div><br />
                </div><br /><br />





                <div class="form-row box" style={{ padding: "10px" }}>
                    <label class="col-sm-3 col-form-label"><b>TERMINATION OF CULTURE:</b></label>
                    <div class="col-sm-9" style={{ paddingRight: "5%" }}>
                        <TextareaAutosize
                            aria-label="minimum height"
                            type="text"
                            rowsMin={15}
                            class="form-control"
                            name="terminationCulture"
                            value={this.state.terminationCulture}
                            placeholder="Termination Of Culture"
                            onChange={(event) => this.setState({ terminationCulture: event.target.value })}
                        />
                    </div>
                </div><br /><br />
                <div class="form-row box" style={{ padding: "10px" }}>
                    <label class="col-sm-3 col-form-label"><b>SUMMARY :</b></label>
                    <div class="col-sm-9" style={{ paddingRight: "5%" }}>
                        <TextareaAutosize
                            aria-label="minimum height"
                            type="text"
                            rowsMin={15}
                            class="form-control"
                            name="summary"
                            value={this.state.summary}
                            placeholder="Summary"
                            onChange={(event) => this.setState({ summary: event.target.value })}
                        />
                    </div>
                </div><br /><br />
                <div class="form-row box" style={{ padding: "10px" }}>
                    <h5><b>Control & Approval</b> : This Form comes to effect from 1st january 2014.</h5>
                    <br /><br /><br />

                    <div class="form-group row d-flex justify-content-center">
                        <span class="col-sm-4"><label><b>Prepared by:</b></label>
                            <input
                                type="text"
                                placeholder=" Prep. by Name"
                                class="form-control"
                                name="preparedby"
                                value={this.state.control_Approval.preparedby}
                                onChange={(event) => this.setState({ control_Approval: { ...this.state.control_Approval, preparedby: event.target.value } })}
                            /></span>
                        <span class="col-sm-4">
                            <label><b>Dept. Head: </b></label>
                            <input
                                type="text"
                                placeholder="Dept. Head"
                                class="form-control"
                                name="deptHead"
                                value={this.state.control_Approval.deptHead}
                                onChange={(event) => this.setState({ control_Approval: { ...this.state.control_Approval, deptHead: event.target.value } })}
                            />
                        </span>
                        <span class="col-sm-4">
                            <label><b>QAD:</b></label>
                            <input
                                type="text"
                                placeholder="QAD"
                                class="form-control"
                                name="qad"
                                value={this.state.control_Approval.qad}
                                onChange={(event) => this.setState({ control_Approval: { ...this.state.control_Approval, qad: event.target.value } })}
                            />
                        </span>

                    </div>
                </div>
                <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-success" type="submit" onClick={this.updateToro}>Update</button>
            </form>
        </div >
        )
    }
}
