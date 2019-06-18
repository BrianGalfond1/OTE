��# Okta Technical Exercise 2 - By Brian Galfond

A few notes to help with testing:

- I could not push my node_modules file to the github repository because it was too large. This includes all of the packages installed to run my program (Ex. okta's react package) but I don't think this will be a problem, they can be re-installed on the computer running the application

- I had a problem with CORS (cross-origin-resource-sharing) errors when trying to fetch resources using Okta's API. I tried a bunch of things but, I ultimately just disabled CORS in my browser to solve this problem so, if an admin page is stuck on "Loading..", it is probably that CORS error.

- Finally, my Okta dev url is https://dev-684166.okta.com and I made a bunch of users for testing. I'm not sure if you can access their credentials (you probably can) but just in case, here are a couple users, one admin and one regular, so you can sign in to the application:
User: john.smith@email.com         Password:  Password1
User: bob.cole@email.com            Password:  Password1

