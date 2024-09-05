const bcrypt = require("bcrypt");
const request = require("supertest");
const app = require("../app");

describe("Users",()=>{
    test("Should return an array with all the users",async ()=>{
        const res = await request(app).get("/api/user/");
        expect(res.statusCode).toEqual(200);
    });

    test("Should return the requested user with the correct password",async ()=>{
        const res = await request(app).post("/api/user/single/").send({email:"test@gmail.com",password:"1234"});
        expect(res.statusCode).toEqual(200);
    });

    test("Should return the requested user with the correct id",async ()=>{
        const res = await request(app).get("/api/user/user/2/");
        expect(res.statusCode).toEqual(200);
    });

    test("Should return all the admins",async ()=>{
        const res = await request(app).get("/api/user/admin/");
        expect(res.statusCode).toEqual(200);
    });

    // test("Should create an user",async ()=>{
    //     const res = await request(app).post("/api/user/").send({email:"tmp@gmail.com",password:"0000"});
    //     expect(res.statusCode).toEqual(201);
    // });

    // test("Should edit an user",async ()=>{
    //     const res = await request(app).put("/api/user/").send({id:15,email:"tmp2@gmail.com",password:"toto"});
    //     expect(res.statusCode).toEqual(201);
    // });

    // test("Should delete an user",async ()=>{
    //     const res = await request(app).delete("/api/user/").send({email:"tmp2@gmail.com"});
    //     expect(res.statusCode).toEqual(201);
    // });
});