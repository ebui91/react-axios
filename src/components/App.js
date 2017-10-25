import React, { Component } from 'react';
import './App.css';

import Header from './Header/Header';
import List from './List/List';
import Workspace from './Workspace/Workspace';
import {getCustomerList, postCustomer, getCustomer, updateCustomer, deleteCustomer} from "../customers.js";


class App extends Component {
  constructor() {
    super()
    this.state = {
      customerList: undefined,
      initialLoad: true,
      creating: false,
      currentCustomer: null
    }
    this.startNewCustomer= this.startNewCustomer.bind(this);
    //solution says this.postCustomer= this.createCustomer.bind(this); for some reason?
    this.createCustomer= this.createCustomer.bind(this);
    this.selectCustomer= this.selectCustomer.bind(this);
    this.saveEdit= this.saveEdit.bind(this);
    this.removeCustomer= this.removeCustomer.bind(this);
  }

  componentDidMount(){
    getCustomerList().
    then((list)=> {
      this.setState({customerList: list});
    })
  }

  startNewCustomer(){
    this.setState({creating: true, initialLoad: false, currentCustomer: null});
  }

  /*createCustomer(customer){
    postCustomer(customer)
    .then(response)=> getCustomerList()
    .then(list)=> this.setState({customerList: , initialLoad: true});
  }*/
  createCustomer(customer){
    postCustomer(customer).then(response=>{
      getCustomerList().then(list=>{
        this.setState({
          initialLoad:true,
          creating: false,
          customerList: list
        })
      })
    })
  }

  selectCustomer(id){
    getCustomer(id).then(response=>{
      this.setState({currentCustomer: response, initialLoad: false});
    })
  }

  saveEdit(id, obj) {
    updateCustomer(id, obj).then(updatedCustomer=>{
      getCustomerList().then(list=>{
        this.setState({
          customerList: list,
          currentCustomer: updatedCustomer
        })
      })
    })
  }

  removeCustomer(id){
    deleteCustomer(id).then(deleted=>{
      getCustomerList().then(list=>{
        this.setState({customerList: list,
          currentCustomer: null,
          initialLoad: true
        })
      })
    })
  }


  render() {
    return (
      <div>
        <Header />
        <div className="App__container">
          {
            this.state.customerList ?
            <List
              customerList={this.state.customerList || []}
              startNewCustomer={this.startNewCustomer}
              selectCustomer={this.selectCustomer}
              />
            : null
          }
          <Workspace initialLoad={this.state.initialLoad}
                    currentCustomer={this.state.currentCustomer}
                    creating={this.state.creating}
                    createCustomer={this.createCustomer}
                    saveEdit={this.saveEdit}
                    removeCustomer={this.removeCustomer}
                  />
        </div>
      </div>
    )
  }
}

export default App;
