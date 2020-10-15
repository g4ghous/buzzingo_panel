import avatar2 from '../component/assets/images/users/avatar2.jpg';
import React, { Component } from 'react';
import { Serverurl, Serverurlimg } from '../Common/ServerUrl';
import axios from 'axios';
import $ from 'jquery';

export class GridContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            errorText: '',
            id: '',
            GuideId: '',
        }
    }

    componentDidMount() {
        var data;
        axios({
            method: 'get',
            url: Serverurl + 'contact_show',
            data: data,
            headers: {
                'Authorization': 'Bearer' + ' ' + localStorage.getItem('token'),
            },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }

        }).then(res => {
            console.log('res', res.data.data)
            console.log('hey', res.data)
            this.setState({
                data: res.data,
            })
            $(document).ready(function () {
                $('#datatable2').DataTable();
            });
            // console.log('data', res.data.data)
        }).catch((err) => {
            console.log(err)
            if (err) {
                // console.log('err', err.response)
                console.log({ err })
            }
        })
    }

    viewContact(id) {
        localStorage.setItem('contactId', id)
        console.log(id)
    }
    

    render() {
        return (
            <div>
                <div className="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-11 col-sm-11">
                            <div class="card">
                                <div class="card-body table-responsive">
                                    <div className="list-head-btn">
                                        <div className="head">
                                            <h4>List Messages</h4>
                                        </div>
                                    </div>
                                    <div class="table-3">
                                        <table id="datatable2" class="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Message</th>
                                                    <th>Actions</th>
                                                    
                                                </tr>
                                            </thead>


                                             <tbody>
                                                {this.state.data.map((contact) =>
                                                    <tr key={contact.id}>
                                                        <td>{contact.name}</td>
                                                        <td>{contact.email}</td>
                                                        <td>{contact.message}</td>
                                                         <td>
                                                            <div class="icon-pad">
                                                                <a href="/component/ViewContact" onClick={this.viewContact.bind(this, contact.id)}><i className="fas fa-eye"></i></a>
                                                                {/* <i className="fas fa-trash-alt"></i> */}
                                                            </div>
                                                        </td> 
                                                    </tr>
                                                )}

                                            </tbody> 
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GridContact

