const request = require("supertest");
const app = require("../app");

describe("Comments",()=>{
    test("Should return an array with all the comments",async ()=>{
        const res = await request(app).get("/api/comment/");
        expect(res.statusCode).toEqual(200);
    });
    
    test("Should edit a comment",async ()=>{
        const res = await request(app).put("/api/comment/6").send({value:"Testing"});
        expect(res.statusCode).toEqual(201);
    });
    
    test("Should remove a comment",async ()=>{
        const res = await request(app).delete("/api/comment/6");
        expect(res.statusCode).toEqual(201);
    });
    
    test("Should return a specific comment",async ()=>{
        const res = await request(app).get("/api/comment/4");
        expect(res.statusCode).toEqual(200);
    });
    
    test("Should return an array with all the comments associated with a post",async ()=>{
        const res = await request(app).post("/api/comment/list/").send({id:5});
        expect(res.statusCode).toEqual(200);
    });
});