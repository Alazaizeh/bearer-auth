"use strict";

const supertest = require("supertest");
const { server } = require("../src/server.js");
const request = supertest(server);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://pfwvsseb:nsW3ouLEURu7OyQ_rDA7sJ8s13aeOTt7@tai.db.elephantsql.com/pfwvsseb",
  {}
);

const { Users } = require("../src/models/index");

describe("express server", () => {
  it("should response with 404 on a bad route", async () => {
    // arrange
    let param = "/notfound";
    let status = 404;
    // act
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
  });
  it("should response with 404 on a bad method", async () => {
    // arrange
    let param = "/";
    let status = 404;
    // act
    const response = await request.post(param);
    // assert
    expect(response.status).toBe(status);
  });
  it("should check 500 errors", async () => {
    // arrange
    let param = "/bad";
    let status = 500;
    // act
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
  });
  // --------------------------------------
  it("should POST to /signup to create a new user", async () => {
    // arrange
    let param = "/signup";
    let status = 201;
    // act
    const response = await request
      .post(param)
      .auth(`Test${Math.floor(Math.random() * 100)}`, "xxx");
    // assert
    expect(response.status).toBe(status);
    expect(response.body).toHaveProperty("username");
  });
  it("should POST to /signin to login as a user (use basic auth)", async () => {
    // arrange
    let param = "/signin";
    let status = 200;
    // act
    const response = await request.post(param).auth("gg", "gg");

    // assert
    expect(response.status).toBe(status);
    expect(response.body).toHaveProperty("username");
  });

  it("should POST to /signin rise error if user or password wrong", async () => {
    // arrange
    let param = "/signin";
    let status = 500;
    // act
    const response = await request.post(param).auth("gg", "dd");

    // assert
    expect(response.status).toBe(status);
  });

  it("should POST to /signup rise an error if user exsit", async () => {
    // arrange
    let param = "/signup";
    let status = 401;
    // act
    const response = await request.post(param).auth(`gg`, "gg");
    // assert
    expect(response.status).toBe(status);
  });

  let userInfo = {
    username: "omar",
    password: "123",
  };

  it("should attach a teken on find", async () => {
    //arrange

    //act
    let userr = await Users.findOne({ where: { username: userInfo.username } });
    let decodedJwt = jwt.decode(userr.token);

    // assert
    expect(userr.username).toEqual(userInfo.username);
    expect(userr.token).toBeTruthy();
    expect(decodedJwt.username).toEqual(userInfo.username);
  });
});
