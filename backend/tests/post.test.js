const request = require("supertest");
const app = require("../app");

describe("Posts",()=>{
    test("Should return an array with all the posts ordered",async ()=>{
        const res = await request(app).get("/api/post/");
        expect(res.statusCode).toEqual(200);
    });
   
    test("Should return a post by ID",async ()=>{
        const res = await request(app).get("/api/post/1");
        expect(res.statusCode).toEqual(200);
    });
    
    test("Should return all posts from user",async ()=>{
        const res = await request(app).post("/api/post/user").send({email:"test@gmail.com"});
        expect(res.statusCode).toEqual(200);
    });
    
    // test("Should add a post",async ()=>{
    //     const res = await request(app).post("/api/post").send({email:"test@gmail.com",texte:"text",image:null});
    //     expect(res.statusCode).toEqual(201);
    // });

    // test("Should edit a post",async ()=>{
    //     const res = await request(app).put("/api/post").send({id:4,texte:null,image:null});
    //     expect(res.statusCode).toEqual(201);
    // });
    
    // test("Should delete a post",async ()=>{
    //     const res = await request(app).delete("/api/post").send({id:4});
    //     expect(res.statusCode).toEqual(201);
    // });
});