/**
 * Copyright 2024 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { beforeEach, expect } from "vitest";
import { ApiCallTool } from "@/tools/apicall/apicall.js";
import { ToolInputValidationError } from "@/tools/base.js";
import path from "path";

describe("Api", () => {
  let instance: ApiCallTool;

  // Simple API spec for a cat fact API
  // Assisted by WCA@IBM
// Latest GenAI contribution: ibm/granite-20b-code-instruct-v2


  let cat_spec: any = '{\
    "openapi": "3.0.0",\
    "info": {\
      "title": "Cat Facts API",\
      "description": "A simple API for cat facts",\
      "version": "1.0.0"\
    },\
    "servers": [\
      {\
        "url": "https://catfact.ninja",\
        "description": "Production server"\
      }\
    ],\
    "paths": {\
      "/fact": {\
        "get": {\
          "summary": "Get a random cat fact",\
          "description": "Returns a random cat fact.",\
          "responses": {\
            "200": {\
              "description": "Successful response",\
              "content": {\
                "application/json": {\
                  "schema": {\
                    "$ref": "#/components/schemas/Fact"\
                  }\
                }\
              }\
            }\
          }\
        }\
      }\
    },\
    "components": {\
      "schemas": {\
        "Fact": {\
          "type": "object",\
          "properties": {\
            "fact": {\
              "type": "string",\
              "description": "The cat fact"\
            }\
          }\
        }\
      }\
    }\
  }';
 
  beforeEach(() => {
    instance = new ApiCallTool( 
      {
        name: "Cat Facts",
        description: "A simple API for cat facts",
        openApiSchema: cat_spec
      } 
    );
  });

  it("Runs", async () => {
    const response = await instance.run(
      {
        path: "/fact",
        method: "get"
      },
      {
        signal: AbortSignal.timeout(60 * 1000),
        retryOptions: {},
      },
    );

    expect(response.isEmpty()).toBe(false);

    // happy to just get a response for now
    //expect(response.result).toMatchObject({
    //  latitude: expect.any(Number),
    //  longitude: expect.any(Number),
    //  generationtime_ms: expect.any(Number),
    //  utc_offset_seconds: 0,
    //  timezone: "UTC",
    //  timezone_abbreviation: "UTC",
    //});
  });

  //t("Throws", async () => {
  //  await expect(
  //    instance.run({
  //      location: { name: "Prague" },
  //      start_date: "123",
  //    }),
  //  ).rejects.toThrowError(ToolInputValidationError);
  //});

  //it("Throws for unknown location", async () => {
  //  await expect(
  //    instance.run({
  //      location: { name: "ABCDEFGH" },
  //      start_date: "2024-01-01",
  //    }),
  //  ).rejects.toThrowErrorMatchingInlineSnapshot(`ToolError: Location 'ABCDEFGH' was not found.`);
  //});
});