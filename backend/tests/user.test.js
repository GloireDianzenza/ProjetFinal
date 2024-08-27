
const request = require("supertest");
const app = require("../app");

describe("Users",()=>{
    test("Should return an array with all the users",async ()=>{
        const res = await request(app).get("/api/user/");
        expect(res.statusCode).toEqual(200);
        console.log(res.body);
    });
    
    test("Should return the requested user with the correct password",async ()=>{
        const res = await request(app).post("/api/user/single/").send({email:"test@gmail.com",password:"1234"});
        expect(res.statusCode).toEqual(200);
        console.log(res.body);
    });
    
    test("Should return the requested user with the correct id",async ()=>{
        const res = await request(app).get("/api/user/user/2/");
        expect(res.statusCode).toEqual(200);
        console.log(res.body);
    });
    
    test("Should return all the admins",async ()=>{
        const res = await request(app).get("/api/user/admin/");
        expect(res.statusCode).toEqual(200);
        console.log(res.body);
    });
});