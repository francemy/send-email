import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
let res;
async function main() {
   res = await prisma.user.findMany()
   
   
   
   
  /* .create({

    data : {
      nomeuser: "test",  
      email : "cvbxcbvc",      
      palavrapasse  : "fdhdghdg",
      autenticacao : "fghf",
    }
  })*/

}

main()
  .then(async () => {
    console.log(res)
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("error: ",e)
    await prisma.$disconnect()
    process.exit(1)
  })