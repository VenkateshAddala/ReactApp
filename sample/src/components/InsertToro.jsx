import React, { Component } from 'react';
import { Collapse, DatePicker, Radio, Checkbox, Divider, Modal } from 'antd';
import { Button } from '@material-ui/core';
import StudentService from './Service';
import '../App.css';
import DeleteIcon from '@material-ui/icons/Delete';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { PlusOutlined, MinusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import moment from 'moment';

const { confirm } = Modal;
const { Panel } = Collapse;

export class InsertToro extends Component {
    constructor(props) {
        super(props)
        this.state = {

            startDate: new Date(),

            FirstRadio: '',

            tcc: '',
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

        }
        this.viewDetails = this.viewDetails.bind(this);
        this.handleTccChange = this.handleTccChange.bind(this);

    }

    saveDetails = () => {
        let givenId = this.state.tcc;
        console.log(this.state.tcc)
        let err;
        // console.log("Entered save details..........")
        let details = {
            id: this.state.tcc, tccDate: this.state.tccDate, pp_ss_Micromatrix: this.state.pp_ss_Micromatrix,
            pvc_pp_gl_ss_suspension: this.state.pvc_pp_gl_ss_suspension, torocellSystemIdNo: this.state.torocellSystemIdNo,
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

        // axios.post("http://localhost:8083/micro_control/insert_micro", details).then(res => console.log(res))
        if (this.state.tcc !== '' && this.state.tccDate !== '' && this.state.pp_ss_Micromatrix !== '' && this.state.pvc_pp_gl_ss_suspension !== '') {
            StudentService.postToro(details).then((res) => {
                console.log(details)
                console.log(res.status)
                if (res.status === 200) {
                    confirm({
                        title: `ID: ${givenId} `,
                        icon: <ExclamationCircleOutlined />,
                        content: "Successfully saved...",
                        onOk() {
                            console.log("OK");
                            this.props.history.push('/Insert_Toro');

                        },
                        onCancel() {
                            console.log("Cancel");
                            this.props.history.push('/Insert_Toro');
                        }
                    });
                }
            }).catch(error => {
                err = error.response.status;
                console.log(error.response.status);

                confirm({
                    title: "Data didn't loaded...",
                    icon: <ExclamationCircleOutlined />,
                    content: "Try again (or) Enter new Id...",
                    onOk() {
                        console.log("OK");
                        this.props.history.push('/Insert_Toro');
                    },
                    onCancel() {
                        console.log("Cancel");
                        this.props.history.push('/Insert_Toro');
                    }
                });

            })

            // this.props.history.push('/Insert_Toro');
        }
    }


    sampleTccUI() {
        return this.state.sampleTccDayList.map((index, ii) =>
            <Collapse accordion style={{ borderRadius: "5px" }} >
                <Panel header={`Sample TCC ${ii}`} key={ii}>
                    <div class="form-group col-md-25" key={ii}>

                        <div class="form-row">
                            <div class="form-group col-md-1">
                                <label><b>Date: </b></label></div>
                            <div class="form-group col-md-4">
                                <DatePicker
                                    id="date"
                                    name="date"
                                    class="form-control"

                                    style={{ width: "70%", height: "100%", borderRadius: "4px" }}

                                    onSelect={(date, dateString) => this.handleSampleDateChange(ii, "date", date, dateString)}

                                />
                            </div>
                    &nbsp;
                    <div class="form-group col-md-4">
                                <label><b>Sample Quantity: 10ml x 2 tubes : </b></label>
                                <Checkbox
                                    name="sampleQuantity"
                                    class="form-control"
                                    value="sampleQuantity"

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

                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Online</b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="phManual1"
                                        class="form-control"
                                        value="phManual1"

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

                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b> Online </b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="doManual1"
                                        class="form-control"
                                        value="doManual1"

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

                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Online</b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="phManual2"
                                        class="form-control"
                                        value="phManual2"

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

                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b> Online </b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="doManual2"
                                        class="form-control"
                                        value="doManual2"

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

                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b>Online</b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="phManual3"
                                        class="form-control"
                                        value="phManual3"

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

                                        onChange={(event) => this.handleSampleCheck(ii, event)}
                                    ><b> Online </b></Checkbox><b>/</b>
                                    <Checkbox
                                        placeholder="TCC"
                                        name="doManual3"
                                        class="form-control"
                                        value="doManual3"

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
            </ Collapse>
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
    handleSampleDateChange(index, dateS, date, dateString) {
        console.log(dateS, '::', dateString)
        let d = "00:00";
        if (date !== null) {
            d = new Date(date._d);
        }
        console.log(d)
        let values = [...this.state.sampleTccDayList];
        //console.log(values);
        let [name, value] = [dateS, d];
        values[index] = { ...values[index], [name]: value };
        console.log(values);
        this.setState({ sampleTccDayList: values });
    }


    async addSampleTcc(event) {
        event.preventDefault();
        const fields = [...this.state.sampleTccDayList];
        //console.log(fields)
        //await fields.push({phattTime: '', ph: '', phAlkali: '' });
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
        //await fields.push({phattTime: '', ph: '', phAlkali: '' });
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


    async handleTccChange(event) {
        let id = event.target.value;
        console.log(id);
        await this.setState({ tcc: event.target.value })
        if (id !== null) {
            await StudentService.putToro(this.state.tcc).then((res) => {
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
                    console.log(err)
                }

            })
        }
    }


    onChange4 = e => {
        let val = e.target.value
        this.setState({ FirstRadio: val })
        console.log(val)
        if (val == "pvc_true") {

            this.state.pvc_pp_gl_ss_suspension = "pvc_true"
            this.state.pp_ss_Micromatrix = "pp_false"


            console.log("pvc_pp_gl_ss_suspension  :::  ", this.state.pvc_pp_gl_ss_suspension)
            console.log("pp_ss_Micromatrix  :::  ", this.state.pp_ss_Micromatrix)
        }
        else {
            this.state.pvc_pp_gl_ss_suspension = "pvc_false"
            this.state.pp_ss_Micromatrix = "pp_true"

            console.log("pvc_pp_gl_ss_suspension  :::  ", this.state.pvc_pp_gl_ss_suspension)
            console.log("pp_ss_Micromatrix  :::  ", this.state.pp_ss_Micromatrix)
        }
        // console.log(this.state.pp_ss_Micromatrix);
        // console.log(this.state.pvc_pp_gl_ss_suspension);
    };

    viewDetails() {
        this.props.history.push('/Get_Toro_Records');
    }
    /*  onChange = (e, checkedValues) => {
                    console.log(e.target.value)
         console.log("checked = ", checkedValues);
     } */
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
        const { FirstRadio } = this.state;
        const optionsWithDisabled = [
            { label: "PVC/PP/GL/SS SUSPENSION", value: "pvc_true" },
            { label: "PP/SS MACROMATRIX", value: "pp_true", default: true }
        ];
        /* const options = [
            {label: "pvc", value: "pvc", name: "pvc" },
            {label: "pp", value: "pp", name: "pp" },
            {label: "ss_small_lit", value: "ss_small_lit", name: "ss_small_lit" },
            {label: "ss_big_lit", value: "ss_big_lit", name: "ss_big_lit" },
            {label: "conditional_vessel", value: "conditional_vessel", name: "conditional_vessel" }
        ]; */

        return (<div class="form-group col-md-16 ">
            <div style={{ margin: '10px 0px 50px 0px' }}><h1 className="text-center" >Torocell Cell Culture</h1></div>
            <div>
                <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-primary" onClick={this.viewDetails}>View Records</button>
            </div>
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
                            onChange={(event) => this.handleTccChange(event)}
                        />
                    </div>&nbsp;
                    <Radio.Group
                        options={optionsWithDisabled}
                        onChange={this.onChange4}
                        value={FirstRadio}
                        optionType="button"
                        style={{ padding: "30px 7% 0 0" }}
                        buttonStyle="solid"
                        required
                        defaultValue="">
                    </Radio.Group>&nbsp;

                    <div class="form-group col-md-3">
                        <label><b>Date: </b></label>

                        <DatePicker
                            id="date"
                            name="tccdate"
                            class="form-control"
                            style={{ width: "100%", height: "57%", borderRadius: "4px" }}
                            /*  data-date-format="dd-mm-yyyy" */
                            required
                            onChange={(date, dateString) => { this.setState({ tccDate: dateString }) }}

                        />
                    </div>
                </div>   <br />
                <br />
                <div class="form-row box" style={{ padding: "10px" }}>
                    <div class="form-group col-md-4">
                        <label><b>TOROCELL SYSTEM ID NO :  </b></label>
                        <input
                            type="text"
                            placeholder="torocell System Id"
                            class="form-control"
                            name="torocellSystemIdNo"
                            // style={{ width: "70%" }}
                            value={this.state.passageNo}
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
                            // style={{ width: "70%" }}
                            value={this.state.barcode}
                            onChange={(event) => this.setState({ barcode: event.target.value })}
                        />
                    </div>
                </div><br /><br />
                <div class="form-row  box" style={{ padding: "10px" }}>
                    <div class="form-group col-md-5">
                        <h6><b>Details Of Assembly:</b> Mark 	&#10004; as appropriate.</h6>
                    </div>
                    <br />
                    <div class="form-group col-md-18" style={{ paddingBottom: "20px" }}>
                        <span class="form-group col-md-2 ">  <label><b>VESSEL TYPE :  </b></label></span>
                        <span class="form-group col-md-2"><Checkbox value={"pvc"} onChange={(e) => this.onVesselChange("pvc", e)}><b>PVC</b></Checkbox></span>
                        <span class="form-group col-md-2"><Checkbox value={"pp"} onChange={(e) => this.onVesselChange("pp", e)}><b>PP</b></Checkbox></span>
                        <span class="form-group col-md-2"><Checkbox value={"ss_small_lit"} onChange={(e) => this.onVesselChange("ss_small_lit", e)}><b>SS Small Lit</b></Checkbox></span>
                        <span class="form-group col-md-2"><Checkbox value={"ss_big_lit"} onChange={(e) => this.onVesselChange("ss_big_lit", e)}><b>SS Big Lit</b></Checkbox></span>
                        <span class="form-group col-md-3"><Checkbox value={"conditional_vessel"} onChange={(e) => this.onVesselChange("conditional_vessel", e)}><b>Conditional Vessel</b></Checkbox></span>
                        <span class="form-group col-md-2"></span><span class="form-group col-md-2"></span>{/* <Checkbox.Group options={options} style={{ fontWeight: "bold", fontSize: "15px" }} onChange={(e)=> this.onChange(e)} /> */}
                    </div >
                </div ><br />
                <h6><label><b>PORTS:  </b></label></h6>
                <div class="form-row d-flex justify-content-center box" style={{ padding: "10px" }}>
                    <div class="form-group col-md-3">
                        <label><b>No. of Inlet ports</b></label>
                        <input
                            type="text"
                            placeholder="no. of inlet ports"
                            class="form-control"
                            name="noOfInletPorts"
                            value={this.state.noOfInletPorts}
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
                            value={this.state.noOfOutletPorts}
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
                            value={this.state.cellSpreader}
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
                            value={this.state.cellSamplerCoverSlip}
                            onChange={(event) => this.setState({ portObj: { ...this.state.portObj, cellSamplerCoverSlip: event.target.value } })}
                        />
                    </div>

                </div><br /><br />
                <h6><label><b>MATRIX :  </b></label></h6>
                <div class="box form-row d-flex justify-content-center" style={{ padding: "10px" }}>
                    <div class="form-group col-md-2 col-example text-left">
                        <label><b>No. of Matrix</b></label>
                        <input
                            type="text"
                            placeholder="no. of matrix"
                            class="form-control"
                            name="noOfMatrix"
                            value={this.state.noOfMatrix}
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
                            value={this.state.otherTypeDetails}
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
                            value={this.state.otherTypeValue}
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
                            value={this.state.carbonateLeft}
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
                            value={this.state.carbonateRight}
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
                            value={this.state.noOFSensor}
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
                            value={this.state.ph_make}
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
                            value={this.state.do_Make}
                            type="text"
                            onChange={(event) => this.setState({ sensorObj: { ...this.state.sensorObj, do_Make: event.target.value } })}
                        />
                    </div>
                </div>
                <br /> <br />
                <div class="form-row box" style={{ padding: "10px" }}>
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
                                value={this.state.bagIrradiated}
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
                                value={this.state.vesselSterilizedOn}
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
                                value={this.state.sterilizationRunno}
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
                                value={this.state.irradationBatchNo}
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
                                value={this.state.method}
                                onChange={(event) => this.setState({ bioReactorContainer: { ...this.state.bioReactorContainer, method: event.target.value } })}
                            /> </div>
                        <div class="form-group col-md ">
                            <label class="my-1 mr-2"><b>QC Check Of Sterility:</b></label>
                            <input
                                type="text"
                                placeholder="QC Check Of Sterility"
                                name="qcCheckofSterility"
                                class="form-control"
                                value={this.state.qcCheckofSterility}
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
                <h6 ><label><b>Cell List :  </b></label></h6>
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
                            placeholder="serum"
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
                    <label class="col-sm-3 col-form-label"><b>Method of Setting up of Culture :</b></label>

                    <div class="col-sm-9" style={{ paddingRight: "5%" }}>
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
                                    value={this.state.name1}
                                    onChange={(event) => this.setState({ cultureSetUpBy: { ...this.state.cultureSetUpBy, name1: event.target.value } })}
                                /></div>
                            <div class="form-group"><label><b>Name : </b></label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name2"
                                    class="form-control"
                                    value={this.state.name2}
                                    onChange={(event) => this.setState({ cultureSetUpBy: { ...this.state.cultureSetUpBy, name2: event.target.value } })}
                                /></div>
                        </span>
                        <span class="form-group col-md-4">
                            <div class="form-group">
                                <label><b>Designation :</b> </label>
                                <input
                                    type="text"
                                    placeholder="Designation "
                                    class="form-control"
                                    name="designation1"
                                    value={this.state.designation1}
                                    onChange={(event) => this.setState({ cultureSetUpBy: { ...this.state.cultureSetUpBy, designation1: event.target.value } })}
                                />
                            </div>
                            <div class="form-group">
                                <label><b>Designation :</b> </label>
                                <input
                                    type="text"
                                    placeholder="Designation "
                                    name="designation2"
                                    class="form-control"
                                    value={this.state.designation2}
                                    onChange={(event) => this.setState({ cultureSetUpBy: { ...this.state.cultureSetUpBy, designation2: event.target.value } })}
                                />
                            </div>
                        </span>
                    </div><br />

                </div><br /><br />
                <div class="form-row box" style={{ padding: "10px" }}>
                    <div class="form-group col " >

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


                    <div class="form-group row">
                        <span class="col-sm-4"><label><b>Prepared by:</b> </label>
                            <input
                                type="text"
                                placeholder=" Prep. by Name"
                                class="form-control"
                                name="preparedby"
                                value={this.state.preparedby}
                                onChange={(event) => this.setState({ control_Approval: { ...this.state.control_Approval, preparedby: event.target.value } })}
                            /></span>
                        <span class="col-sm-4">
                            <label><b>Dept. Head: </b></label>
                            <input
                                type="text"
                                placeholder="Dept. Head"
                                class="form-control"
                                name="deptHead"
                                value={this.state.deptHead}
                                onChange={(event) => this.setState({ control_Approval: { ...this.state.control_Approval, deptHead: event.target.value } })}
                            />
                        </span>
                        <span class="col-sm-4">
                            <label><b>QAD:</b> </label>
                            <input
                                type="text"
                                placeholder="QAD"
                                class="form-control"
                                name="qad"
                                value={this.state.qad}
                                onChange={(event) => this.setState({ control_Approval: { ...this.state.control_Approval, qad: event.target.value } })}
                            />
                        </span>
                    </div>
                </div><br /><br />
                <button style={{ margin: '10px 0px 15px 0px' }} className="btn btn-success" onClick={() => this.saveDetails()}>Save</button>
            </form >
        </div >
        )
    }
}
