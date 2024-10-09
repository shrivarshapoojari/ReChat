import { User } from "../models/user.model.js";
import {faker}from "@faker-js/faker"

const createUser=async(numUser)=>{
    try{
        const userPromise=[];
        for (let i=0;i<numUser;i++)
        {
            const tempUser=User.create({
                name:faker.person.fullName(),
                username:faker.internet.userName(),
                bio:faker.lorem.sentence(),
                password:"pass",
                avatar:{
                    url:faker.image.avatar(),
                    public_id:faker.system.fileName()
                }
            })


            userPromise.push(tempUser)
        }

        await Promise.all(userPromise)
            console.log(numUser)
            process.exit()

    }catch(e){
         console.log(e)
    }
}

export {createUser}