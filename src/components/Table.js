import React from 'react';
import '../css/Table.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = 'https://personal-budget-app-2.herokuapp.com';

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.conditionalFormatting = this.conditionalFormatting.bind(this);
        this.addNewRow = this.addNewRow.bind(this);
        this.cancelInput = this.cancelInput.bind(this);
        this.saveInput = this.saveInput.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
    }

    componentDidMount() {
        this.conditionalFormatting();
    }

    componentDidUpdate() {
        this.conditionalFormatting();
    }

    conditionalFormatting = () => {
        const differenceArray = Array.from(document.getElementsByClassName(this.props.title + '-difference'));
    
        differenceArray.map((item) => {
            const value = parseFloat(item.textContent.slice(1));
            if((value > 0 && this.props.title === 'Expenses') || (value < 0 && this.props.title === 'Income')) {
                item.style.color = 'green';
            }
            else if(value !== 0){
                item.style.color = 'red';
            }
        })
    }

    addNewRow(event) {
        event.preventDefault();

        document.getElementById(this.props.title + '-button').style.display = 'none';
        document.getElementById(this.props.title + '-save').style.display = 'block';
        document.getElementById(this.props.title + '-cancel').style.display = 'block';

        const table = document.getElementById(this.props.title);
        const rows = document.getElementsByClassName(this.props.title + '-rows');

        const row = table.insertRow(rows.length + 1);

        const nameInput = row.insertCell(0);
        const plannedInput = row.insertCell(1);
        const actualInput = row.insertCell(2);
        const difference = row.insertCell(3);

        nameInput.innerHTML = '<input id="name-input" className="input-field" type="text" />';
        plannedInput.innerHTML = '<input id="planned-input" className="input-field" type="text" />';
        actualInput.innerHTML = '<input id="actual-input" className="input-field" type="text" />';
    }

    saveInput(event) {

        const name = document.getElementById('name-input').value;
        const planned = parseFloat(document.getElementById('planned-input').value);
        const actual = parseFloat(document.getElementById('actual-input').value);

        if(name === '' || planned === '' || actual === '') {
            window.alert('Please fill out all applicable fields before saving.');
            return;
        }

        if(typeof planned !== 'number' || typeof actual !== 'number') {
            window.alert('Please only enter numbers for the planned and actual fields.');
            return;
        }

        const data = {
            "name": name,
            "planned": planned,
            "actual": actual
        }

        axios.post(url + this.props.path, data)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });

    }

    saveEdit(event) {
        const elements = Array.from(document.getElementsByClassName('input-field-edit'));
        const id = event.target.parentElement.parentElement.id;

        const name = elements[0].value;
        const planned = parseFloat(elements[1].value.replace('$', ''));
        const actual = parseFloat(elements[2].value.replace('$',''));

        if(name === '' || planned === '' || actual === '') {
            window.alert('Please fill out all applicable fields before saving.');
            return;
        }

        if(typeof planned !== 'number' || typeof actual !== 'number') {
            window.alert('Please only enter numbers for the planned and actual fields.');
            return;
        }

        const data = {
            "name": name,
            "planned": planned,
            "actual": actual
        }

        axios.put(`${url}${this.props.path}/${id}`, data)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    cancelEdit(event) {
        const elements = Array.from(document.getElementsByClassName('input-field-edit'));

        const row = event.target.parentElement.parentElement;
        const id = row.id;
        const cellsArray = Array.from(row.cells);

        document.getElementById(this.props.title + id + '-edit-button').style.display = 'block';
        document.getElementById(this.props.title + id + '-delete-button').style.display = 'block';
        document.getElementById(this.props.title + id + '-edit-save').style.display = 'none';
        document.getElementById(this.props.title + id + '-edit-cancel').style.display = 'none';

        for(let i = 0; i < 3; i++) {
            cellsArray[i].innerHTML = elements[i].value;
        }

    }

    editItem(event) {
        const row = event.target.parentElement.parentElement;
        const id = row.id;
        const cellsArray = Array.from(row.cells);

        document.getElementById(this.props.title + id + '-edit-button').style.display = 'none';
        document.getElementById(this.props.title + id + '-delete-button').style.display = 'none';
        document.getElementById(this.props.title + id + '-edit-save').style.display = 'block';
        document.getElementById(this.props.title + id + '-edit-cancel').style.display = 'block';

        
        for(let i = 0; i < 3; i++) {
            const value = cellsArray[i].innerText;

            cellsArray[i].innerHTML = `<input class="input-field-edit" type="text" value="${value}" />`;
        }
    }

    deleteItem(event) {
        const id = event.target.parentElement.parentElement.id;

        axios.delete(`${url}${this.props.path}/${id}`)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });

        console.log(event.target.parentElement.parentElement.id);
    }

    cancelInput(event) {
        event.preventDefault();

        document.getElementById(this.props.title + '-button').style.display = 'block';
        document.getElementById(this.props.title + '-save').style.display = 'none';
        document.getElementById(this.props.title + '-cancel').style.display = 'none';


        const table = document.getElementById(this.props.title);
        const rows = document.getElementsByClassName(this.props.title + '-rows');


        table.deleteRow(rows.length + 1);
    }

    render() {

        return ( 
        <div className="table-div">
            <h2 className='title text-left'>{this.props.title}</h2>
            <table id={this.props.title}>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Planned</th>
                        <th>Actual</th>
                        <th>Difference</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.props.array.map((item) => {
                        return <tr key={item.id} id={item.id} className={this.props.title + '-rows'}>
                            <td>{item.name}</td>
                            <td>${item.planned}</td>
                            <td>${item.actual}</td>
                            <td className={this.props.title + "-difference"}>${item.difference}</td>
                            <td className="buttons-column">
                                <button id={this.props.title + item.id + '-edit-button'} className='edit-button edit-buttons buttons btn btn-primary' onClick={this.editItem}>Edit</button>
                                <button id={this.props.title + item.id + '-delete-button'} className='delete-button edit-buttons buttons btn btn-primary' onClick={this.deleteItem}>Delete</button>

                                <button id={this.props.title + item.id + '-edit-save'} className='edit-buttons btn btn-primary' style={{display: 'none'}} onClick={this.saveEdit}>Save</button>
                                <button id={this.props.title + item.id + '-edit-cancel'} className='edit-buttons btn btn-primary' style={{display: 'none'}} onClick={this.cancelEdit}>Cancel</button>
                            </td>
                        </tr>
                    })
                    }
                </tbody>
            </table>

            <div>
                <button id={this.props.title + '-button'} className='table-buttons btn btn-primary' onClick={this.addNewRow}>{this.props.button}</button>
                <button id={this.props.title + '-save'} className='table-buttons btn btn-primary' style={{display: 'none'}} onClick={this.saveInput}>Save</button>
                <button id={this.props.title + '-cancel'} className='table-buttons btn btn-primary' style={{display: 'none'}} onClick={this.cancelInput}>Cancel</button>
            </div>
        </div>
    )}
    
}

export default Table;