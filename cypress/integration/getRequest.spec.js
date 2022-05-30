/// <reference types="Cypress" />


let env = require('../../env.json')
describe("Testing Get Request ",function(){

    it("getting all users" , function(){
        cy.request({
            url:"https://gorest.co.in/public/v2/users",
            method:"GET"
        }).then((response)=>{

            expect (response.status).eq(200) // the status of our response 

            

        })


    })

    it("getting single user",function(){
        cy.request({
            url:"https://gorest.co.in/public/v2/users/8787",
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

            expect (response.body).have.property("id")
            expect (response.body).have.property("name")
            expect (response.body).have.property("email")
            expect (response.body).have.property("gender")
            expect (response.body).have.property("status")

        })

    })

})