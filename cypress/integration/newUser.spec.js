/// <reference types="Cypress" />


/* 
  1- create new user using the help of fixture and make sure we are creating the user with 201 status 
  2- make the email reandom 
  3- check with get request the user created at 1 step 
*/
import { v4 as uuidv4 } from 'uuid';
let env = require('../../env.json')
describe("creating new user " , function(){

    const user = require('../fixtures/example.json')
    
    
    let emailUser  = uuidv4() + "@gmail.com" // to get reandom emails we using help from the library uuid

    it("testing api end point  by creatying new user " , function(){

        

        cy.request({
            // 1- creating the user with the help of fixtures file information 
            url:"https://gorest.co.in/public/v2/users",
            method:"POST",
            headers:{
                /*
                 the Token Is Secret To have your Own Make An Account At the Website : https://gorest.co.in/
                 */
                "Authorization" : "Bearer " +  env.TOKEN 
            },
            body:{
          
                "name": user.name,
                "email": emailUser,
                "gender": user.gender,
                "status": user.status
            
            }
        }).then((response)=>{
            expect (response.status).eq(201) // the status of our response  should be 201 
            cy.log(JSON.stringify(response)) // this will show us the response we get from the server 
        }).then((response)=>{
            let userId = response.body.id // capture the user id 
           // 3-  making get request with the same user id 
           cy.request({
            url:"https://gorest.co.in/public/v2/users/" + userId ,
            method:"GET",
            headers:{
                /*
                 the Token Is Secret To have your Own Make An Account At the Website : https://gorest.co.in/
                 */
                "Authorization" : "Bearer " +  env.TOKEN 
            },
            
            }).then((response)=>{

                expect (response.status).eq(200) // the status of our response 

                // every user should have id name email  gender status 

                expect (response.body).have.property("id",userId)
                expect (response.body).have.property("name",user.name)
                expect (response.body).have.property("email",emailUser)
                expect (response.body).have.property("gender",user.gender)
                expect (response.body).have.property("status",user.status)

            })
        })

        
    })

   

})