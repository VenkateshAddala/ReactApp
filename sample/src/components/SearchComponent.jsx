import "antd/dist/antd.css";
import React, { Component } from 'react';
import { Modal, Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import Service from './Service';
import { SearchOutlined, EyeInvisibleOutlined, EyeTwoTone, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";


class SearchComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchText: '',
            searchedColumn: '',
            visible: false,
            deletevisible: false,
            isPassword: '',
            isDeletePassword: '',
            modal_Class: '',
            delete_Class: '',
            list: [],
            record_Id: ''
        }
        this.addDetails = this.addDetails.bind(this);
        this.editDetails = this.editDetails.bind(this);
        this.deleteDetails = this.deleteDetails.bind(this);
    }

    showModal = (id) => {
        this.setState({
            record_Id: id,
            visible: true
        });
    };
    deleteModal = (id) => {
        this.setState({
            record_Id: id,
            deletevisible: true
        });
    };


    handleCancel = e => {
        console.log(e);
        this.state.modal_Class = '';
        this.setState({
            visible: false
        });
    };
    handleDeleteCancel = e => {
        console.log(e);
        this.state.delete_Class = '';
        this.setState({
            deletevisible: false
        });
    };


    componentDidMount() {

        Service.getDetails().then((res) => {
            let result = res.data;
            console.log(result)
            this.setState({ list: result })
        })

    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    addDetails() {
        this.props.history.push('/');
    };
    async editDetails(id, password) {
        console.log(id)
        let isTrue = false;
        await Service.getPassword(password).then((res) => {
            console.log(res);
            isTrue = res.data;
            if (isTrue === true) {
                this.setState({ isPassword: isTrue });

            } else {
                this.setState({ isPassword: '' });
            }
            console.log(this.state.isPassword)
            console.log(isTrue)
        })

        if (isTrue === true) {
            console.log("Record ::: ", id)
            localStorage.setItem("Checked", id);
            localStorage.setItem("pageReload", id);
            this.props.history.push(`/Update_Details/${id}`);
        }

        /* console.log("Record ::: ", id)
        await this.props.history.push(`/Update_Details/${id}`); */
    }

    async deleteDetails(id, password) {
        console.log(id)
        //console.log(password)
        let isTrue = false;
        await Service.getPassword(password).then((res) => {
            console.log(res);
            isTrue = res.data;
            if (isTrue == true) {
                this.setState({ isDeletePassword: isTrue });
                this.state.delete_Class = '';
            } else {
                this.setState({ isDeletePassword: '' });
                this.state.delete_Class = '';
            }
            console.log(this.state.isDeletePassword)
            console.log(isTrue)
        })

        if (isTrue === true) {
            Service.deleteDetail(id).then((res) => {
                this.setState({ list: this.state.list.filter((_) => _.id !== id) })
                this.props.history.push(`/Get_Details`);
            })
        }

        this.setState({
            deletevisible: false
        });
    }


    render() {
        const columns = [
            {
                title: 'MC',
                dataIndex: 'id',
                key: 'name',
                width: '10%',
                ...this.getColumnSearchProps('id'),
            },
            {
                title: 'Date',
                dataIndex: 'mcDate',
                key: 'age',
                width: '15%',
                ...this.getColumnSearchProps('mcDate'),
            },
            {
                title: 'Name Of Organism',
                dataIndex: 'nameOfOrganism',
                key: 'nameOfOrganism',
                width: '25%',
                ...this.getColumnSearchProps('nameOfOrganism'),
            },
            {
                title: 'Modified Date',
                dataIndex: 'updatedDate',
                key: 'updatedDate',
                // width: '10%',

            },
            {
                title: 'Actions',
                dataIndex: 'id',
                key: 'id',
                width: '25%',
                render: (record) =>
                    <div>
                        <button class="form-group " style={{ marginLeft: '30px' }} className="btn btn-info" onClick={() => this.showModal(record)}  >Edit</button>

                        <button style={{ marginLeft: '20px', marginTop: '3px' }} className="btn btn-danger" onClick={() => this.deleteModal(record)} /* onClick={() => { this.deleteDetails(record) }} */>Delete</button>

                    </div>
            }
        ];
        return (<div >
            <div style={{ margin: '5px 0px 50px 0px' }}><h2 className="text-center" >Microbial Records</h2></div>
            <div class="form-group col-md-3">
                <button className="btn btn-primary" onClick={this.addDetails}>Insert New Record</button>

            </div>
            <Modal
                title="Enter Password to continue"
                visible={this.state.visible}
                onOk={() => this.editDetails(this.state.record_Id, this.state.modal_Class)}
                onCancel={this.handleCancel}
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                style={{ width: "50px" }}
            >
                <Space direction="vertical">
                    <Input.Password
                        placeholder="input password"
                        name="modal_Class"
                        value={this.state.modal_Class}
                        class="form-control"
                        onChange={(event) => this.setState({ modal_Class: event.target.value })}
                        iconRender={visible =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Space>{
                    this.state.isPassword !== true && this.state.modal_Class !== '' ? 'Enter Correct Password' : ''
                }
            </Modal>
            <Modal

                title="Are you sure want to delete this record?"
                visible={this.state.deletevisible}
                icon={<ExclamationCircleOutlined />}
                okText="Yes"
                cancelText="No"
                okButtonProps={{ disabled: false }}
                cancelButtonProps={{ disabled: false }}
                onOk={() => this.deleteDetails(this.state.record_Id, this.state.delete_Class)}
                onCancel={this.handleDeleteCancel}
            >
                <Space direction="vertical">
                    <Input.Password
                        placeholder="input password"
                        name="delete_Class"
                        value={this.state.delete_Class}
                        class="form-control"
                        onChange={(event) => this.setState({ delete_Class: event.target.value })}
                        iconRender={visible =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Space>{
                    this.state.isPassword !== true && this.state.delete_Class !== '' ? 'Enter Correct Password' : ''
                }</Modal>
            <Table
                columns={columns}
                bordered
                className="table-striped box"
                dataSource={this.state.list}
            /><br /><br />
        </div>
        );
    }
}
export default SearchComponent;