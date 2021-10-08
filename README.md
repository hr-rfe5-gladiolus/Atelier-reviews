# SDC-reviews
> An API microservice that supports the ratings and reviews component of a large front-end e-commerce website.

# Table of Contents

1. [Description](#description)
2. [Requirements](#requirements)
3. [Setting Up Repository on a Local Machine](#setting-up-repository-on-local-machine)

# Description
> Build the server and database for single service which supports the a large front-end e-commerce website, and optimize it to handle large quantities of data and traffic.

# Requirements
- Node v14+
- Express
- Jest
- node-postgres
- PostgreSQL

# Setting Up Repository on a Local Machine
- [ ] `npm install`
- [ ] install postgres on your OS
- [ ] create a super user role with login permission and a password
- [ ] create a database with the same name as the role
- [ ] `vim ./server/database/index.js` and change user and password to the role and password you just created
- [ ] `psql -f ./server/database/schema.sql`
