const request = require("supertest");
const app = require("./index.js");
const Post = require("./models/Post.js");
const controllers = require("./controllers/Post.controllers.js")

describe('testing/create', ()=> {
    const post = {
        title: "Prueba",
        body: "body2"
    }
   
    beforeAll(async () => {
        await Post.deleteMany(); // Asegurarse que la colección esté vacía antes de las pruebas
    });

  
   
    it("Should create a  new post", async () => {
      
        const resPost = await request(app).post("/create").send(post).expect(201)
        expect(resPost._body._id).toBeDefined(); 
        expect(resPost._body.createdAt).toBeDefined(); 
        expect(resPost._body.updatedAt).toBeDefined();//, toBeDefined ayuda a validar el hecho de que ciertas propiedades en la respuesta existen,
        // lo que nos da confianza de que la creación del post se ha realizado correctamente y que se 
        //están devolviendo todos los datos necesarios.

    })

     it("Should not create a post if body is missing", async () => {//se puede crear un pos sin titulo pero no sin body
        const postWithoutBody = {
            title: "Prueba sin body"
            // body se omite intencionadamente
        };
        const resPost = await request(app).post("/create").send(postWithoutBody).expect(500); 
    
        expect(resPost.body.message).toEqual('there was a problem trying to create a post.');
    })

})
        
    afterAll(async () => {
        await Post.deleteMany(); // Limpiar la colección después de las pruebas
    });



describe("Get posts", () => {
    it("should get all posts", async () => {
        const res = await request(app)
            .get("/")
            .expect(200);
        expect(res.body).toBeInstanceOf(Array);
    });
 })

