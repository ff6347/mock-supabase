// Copyright (c) 2021 Technologiestiftung Berlin & Fabian Morón Zirfas
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createClient } from "@supabase/supabase-js";
import fastify from "fastify";
import { anonKey, buildServer } from "./server";

jest.mock("@supabase/supabase-js", () => {
  const mCreateClient = jest.fn(() => {
    const mFrom = jest.fn();
    return { from: mFrom };
  });

  return { createClient: jest.fn(() => mCreateClient) };
});

describe("server", () => {
  test("should run the server", async () => {
    const server = buildServer();
    const supabase = createClient("http://localhost:8000", anonKey);

    const mSelect = jest
      .fn()
      .mockImplementation(() =>
        Promise.reject({ data: null, error: new Error("error") })
      );
    supabase.from = jest.fn().mockImplementation((table) => {
      return { select: mSelect };
    });
    // const spyServer = jest.spyOn(server, "errorHandler");

    const response = await server.inject({
      method: "GET",
      url: "/",
    });
    expect(createClient).toHaveBeenCalledTimes(2);
    expect(supabase.from).toHaveBeenCalledTimes(1);
    expect(response.statusCode).toBe(500);
    const json = response.json();

    expect(json).toMatchInlineSnapshot(`
      Object {
        "error": "Internal Server Error",
        "message": "Something went wrong",
        "statusCode": 500,
      }
    `);
  });
});
