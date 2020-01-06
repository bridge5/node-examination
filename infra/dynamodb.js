import AWS from "aws-sdk";
import { isEmpty } from "./dataType";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function call(action, params) {
  return dynamoDb[action](params).promise();
}

export function dbUpdate(params) {
  return dynamoDb["put"](params).promise();
}

export function dbGet(params) {
  return dynamoDb["get"](params).promise();
}

export function dbQuery(params) {
  return dynamoDb["query"](params).promise();
}

export function dbDelete(params) {
  return dynamoDb["delete"](params).promise();
}

export function update(params) {
  return dynamoDb["put"](params).promise();
}

export function get(params) {
  return dynamoDb["get"](params).promise();
}

export function query(params) {
  return dynamoDb["query"](params).promise();
}

export function remove(params) {
  return dynamoDb["delete"](params).promise();
}
