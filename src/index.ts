import { PrismaClient } from "@prisma/client";
import { Elysia,t } from "elysia";
const prisma = new PrismaClient()
const app = new Elysia()
.decorate('db',prisma)
.get("/", () => "Hello Elysia")
.get("/manchester",async()=>{
  return "Hello World"
})

.get("/", async () => {
  return "Unatisha"
})

.get("/products", async ({db}) => {
  const products = await db.products.findMany({})

  return products
} )

.post("/yo",async({body,db})=>{
  const {name}=body
  const products = await db.products.create({
    data: {name:name}
  })

  return products
},{
  body:t.Object({
    name:t.String(),
  })
})


.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);



