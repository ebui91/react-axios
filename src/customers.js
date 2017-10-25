import axios from "axios";
import apiURL from "./api.js"

export const getCustomerList=()=>{
  return axios.get(apiURL)
  .then(res=> res.data);
}

export const postCustomer=(newCust)=>{
  return axios.post(apiURL, newCust)
  .then(res=> res.data);
}

export const getCustomer=(id)=>{
  return axios.get(apiURL + id)
  .then(res=> res.data);
}

export const updateCustomer=(id, obj)=>{
  return axios.patch(apiURL + id, obj)
  .then(res=> res.data);
}

export const deleteCustomer=(id)=>{
  return axios.delete(apiURL + id)
  .then(res=> res.data);
}
