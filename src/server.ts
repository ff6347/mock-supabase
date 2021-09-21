// Copyright (c) 2021 Technologiestiftung Berlin & Fabian Morón Zirfas
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import fastify, { FastifyInstance } from "fastify";
import fastifySensible from "fastify-sensible";
import fastifyBlipp from "fastify-blipp";
import { createClient } from "@supabase/supabase-js";
export const anonKey =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYyNzIwODU0MCwiZXhwIjoxOTc0MzYzNzQwLCJhdWQiOiIiLCJzdWIiOiIiLCJyb2xlIjoiYW5vbiJ9.sUHErUOiKZ3nHQIxy-7jND6B80Uzf9G4NtMLmL6HXPQ";
// Create a single supabase client for interacting with your database
const supabase = createClient("http://localhost:8000", anonKey);
const server = fastify({ logger: true });

// Declare a route

export const buildServer: () => FastifyInstance = () => {
  server.register(fastifySensible);
  server.register(fastifyBlipp);
  server.get("/", async (_request, reply) => {
    const { data, error } = await supabase.from("cat").select();
    console.log(data, error);
    if (error) {
      throw server.httpErrors.internalServerError();
    }

    reply.send(data);
  });
  return server;
};
