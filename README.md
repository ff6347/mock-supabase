<!--
 Copyright (c) 2021 Technologiestiftung Berlin & Fabian Morón Zirfas
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# Mocking Supabase in Tests

This repo is some exploration on how to mock supabase in tests using Jest. This should not be the default. With this setup you can run integration tests. We only use this to test error routes on the fastify server, since creating an error on prurpose is hard.

The wired thing is that jest does not recognize the coverage here and I can not spy an `server.httpErrors.internalServerError();` either. (╯°□°）╯︵ ┻━┻)

## How to

Run on (MacOS)

```bash
cd supabase
docker compose up
```

On Linux use `docker-compose up`

Wait until your Kong, Auth, Postgrest and Postgres containers are ready

```bash
npm test
```