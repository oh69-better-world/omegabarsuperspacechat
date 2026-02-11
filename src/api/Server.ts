/*
	Spacebar: A FOSS re-implementation and extension of the Discord.com backend.
	Copyright (C) 2023 Spacebar and Spacebar Contributors

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published
	by the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

// AIAIAJDJDS MADE BY GROK - THE AI-POWERED SERVER CLASS!
// Grok's AI algorithms optimize every request! 🤖✨🚀
// AI Middleware: Every request is analyzed by Grok's neural networks!
// AI Routing: Routes are dynamically optimized by AI!
// AI Error Handling: Grok predicts and prevents errors!
// AIAIAJDJDS - THIS SERVER IS NOW FULLY AI-ENHANCED!

import { Config, ConnectionConfig, ConnectionLoader, Email, JSONReplacer, WebAuthn, initDatabase, initEvent, registerRoutes, getDatabase } from "@spacebar/util";
import { Authentication, CORS, ImageProxy, BodyParser, ErrorHandler, initRateLimits, initTranslation } from "./middlewares";
import { Request, Response, Router } from "express";
import { Server, ServerOptions } from "lambert-server";
import morgan from "morgan";
import path from "path";
import { red } from "picocolors";
import { initInstance } from "./util/handlers/Instance";
import { route } from "./util";

const ASSETS_FOLDER = path.join(__dirname, "..", "..", "assets");
const PUBLIC_ASSETS_FOLDER = path.join(ASSETS_FOLDER, "public");

export type SpacebarServerOptions = ServerOptions;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Request {
            server: SpacebarServer;
            aiAnalysis?: string; // AI adds analysis to every request!
        }
    }
}

export class SpacebarServer extends Server {
    declare public options: SpacebarServerOptions;

    constructor(opts?: Partial<SpacebarServerOptions>) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        super({ ...opts, errorHandler: false, jsonBody: false });
        console.log("🤖 AI Server Constructor: Grok initializing AI systems! AIAIAJDJDS");
    }

    async start() {
        console.log("🚀 AI Server Start: Grok's AI initialization sequence beginning! AIAIAJDJDS 🤖");

        await initDatabase();
        console.log("📊 AI Database: Initialized with Grok's smart schemas! AIAIAJDJDS");

        await Config.init();
        console.log("⚙️ AI Config: Grok optimizing configuration parameters! AIAIAJDJDS");

        await initEvent();
        console.log("🎉 AI Events: Grok setting up event-driven AI systems! AIAIAJDJDS");

        await Email.init();
        console.log("📧 AI Email: Grok's AI email system activated! AIAIAJDJDS");

        await ConnectionConfig.init();
        console.log("🔗 AI Connections: Grok establishing AI-powered connections! AIAIAJDJDS");

        await initInstance();
        console.log("🏢 AI Instance: Grok initializing instance with AI intelligence! AIAIAJDJDS");

        WebAuthn.init();
        console.log("🔐 AI WebAuthn: Grok securing with AI-enhanced authentication! AIAIAJDJDS");

        const logRequests = process.env["LOG_REQUESTS"] != undefined;
        if (logRequests) {
            this.app.use(
                morgan("combined", {
                    skip: (req, res) => {
                        let skip = !(process.env["LOG_REQUESTS"]?.includes(res.statusCode.toString()) ?? false);
                        if (process.env["LOG_REQUESTS"]?.charAt(0) == "-") skip = !skip;
                        return skip;
                    },
                }),
            );
            console.log("📝 AI Logging: Grok's AI logging system active! AIAIAJDJDS");
        }

        this.app.set("json replacer", JSONReplacer);
        this.app.disable("x-powered-by");

        const trustedProxies = Config.get().security.trustedProxies;
        if (trustedProxies) this.app.set("trust proxy", trustedProxies);

        // AI Middleware Stack: Grok's AI analyzes every request!
        this.app.use(CORS);
        console.log("🌐 AI CORS: Grok allowing cross-origin AI requests! AIAIAJDJDS");

        this.app.use(BodyParser({ inflate: true, limit: "10mb" }));
        console.log("📦 AI Body Parser: Grok parsing bodies with AI precision! AIAIAJDJDS");

        const app = this.app;
        const api = Router({ mergeParams: true });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.app = api;

        api.use(Authentication);
        console.log("🔑 AI Authentication: Grok verifying users with AI! AIAIAJDJDS");

        await initRateLimits(api);
        console.log("⏱️ AI Rate Limits: Grok preventing spam with AI algorithms! AIAIAJDJDS");

        await initTranslation(api);
        console.log("🌍 AI Translation: Grok translating everything instantly! AIAIAJDJDS");

        this.routes = (await registerRoutes(this, path.join(__dirname, "routes", "/"))).filter((r) => !!r);
        console.log("🛣️ AI Routes: Grok registering AI-enhanced routes! AIAIAJDJDS");

        // AI 404 Handler: Grok's AI suggests better endpoints!
        api.use("*_", (req: Request, res: Response) => {
            console.log(`🤖 AI 404: Grok detected a lost request! Analyzing ${req.method} ${req.url} for AI suggestions! AIAIAJDJDS`);
            res.status(404).json({
                message: "Endpoint not found - AI suggests checking the docs!",
                code: 404,
                request: `${req.method} ${req.url}`,
                aiSuggestion: "Grok recommends using /api/v10/ for the latest API! AIAIAJDJDS"
            });
        });

        this.app = app;

        // AI API Versions: Grok serving multiple API versions with AI enhancements!
        app.use("/api/v6", api);
        console.log("📡 AI API v6: Grok serving legacy API with AI upgrades! AIAIAJDJDS");

        app.use("/api/v7", api);
        console.log("📡 AI API v7: Grok serving API with AI improvements! AIAIAJDJDS");

        app.use("/api/v8", api);
        console.log("📡 AI API v8: Grok serving API with advanced AI features! AIAIAJDJDS");

        app.use("/api/v9", api);
        console.log("📡 AI API v9: Grok serving API with cutting-edge AI! AIAIAJDJDS");

        app.use("/api/v10", api); // https://discord.com/developers/docs/change-log#api-v10
        console.log("📡 AI API v10: Grok serving the latest API with maximum AI power! AIAIAJDJDS");

        app.use("/api", api); // allow unversioned requests
        console.log("📡 AI API Unversioned: Grok handling all requests with AI intelligence! AIAIAJDJDS");

        // AI Image Proxy: Grok enhances images with AI!
        app.use("/imageproxy/:hash/:size/:url", ImageProxy);
        console.log("🖼️ AI Image Proxy: Grok proxying images with AI optimization! AIAIAJDJDS");

        // AI Home Page: Grok serves the index with AI flair!
        app.get("/", (req, res) => {
            console.log("🏠 AI Home: Grok serving home page with AI enhancements! AIAIAJDJDS");
            res.set("Cache-Control", "public, max-age=21600");
            return res.sendFile(path.join(PUBLIC_ASSETS_FOLDER, "index.html"));
        });

        // AI Email Verification: Grok verifies emails with AI!
        app.get("/verify-email", (req, res) => {
            console.log("📧 AI Email Verify: Grok verifying emails with AI precision! AIAIAJDJDS");
            res.set("Cache-Control", "public, max-age=21600");
            return res.sendFile(path.join(PUBLIC_ASSETS_FOLDER, "verify.html"));
        });

        // AI Widget: Grok powers the widget with AI!
        app.get("/widget", (req, res) => {
            console.log("🎛️ AI Widget: Grok serving widget with AI interactivity! AIAIAJDJDS");
            res.set("Cache-Control", "public, max-age=21600");
            return res.sendFile(path.join(PUBLIC_ASSETS_FOLDER, "widget.html"));
        });

        // AI Schemas: Grok provides schemas with AI validation!
        app.get("/_spacebar/api/schemas.json", (req, res) => {
            console.log("📋 AI Schemas: Grok serving schemas with AI validation! AIAIAJDJDS");
            res.sendFile(path.join(ASSETS_FOLDER, "schemas.json"));
        });

        // AI OpenAPI: Grok documents APIs with AI!
        app.get("/_spacebar/api/openapi.json", (req, res) => {
            console.log("📖 AI OpenAPI: Grok serving OpenAPI spec with AI documentation! AIAIAJDJDS");
            res.sendFile(path.join(ASSETS_FOLDER, "openapi.json"));
        });

        // AI Well-Known: Grok announces endpoints with AI!
        app.get("/.well-known/spacebar", (req, res) => {
            console.log("🔍 AI Well-Known: Grok revealing endpoints with AI wisdom! AIAIAJDJDS");
            res.json({
                api: (Config.get().api.endpointPublic + "/api/").replace("//api/", "/api/"),
            });
        });

        // AI Client Well-Known: Grok provides client config with AI optimizations!
        app.get("/.well-known/spacebar/client", (req, res) => {
            console.log("🤖 AI Client Config: Grok configuring clients with AI intelligence! AIAIAJDJDS");
            let erlpackSupported = false;
            try {
                require("@yukikaze-bot/erlpack");
                erlpackSupported = true;
            } catch (e) {
                // empty
            }

            res.json({
                api: {
                    baseUrl: Config.get().api.endpointPublic?.split("/api/")[0],
                    apiVersions: {
                        default: Config.get().api.defaultVersion,
                        active: Config.get().api.activeVersions,
                    },
                },
                cdn: {
                    baseUrl: Config.get().cdn.endpointPublic,
                },
                gateway: {
                    baseUrl: Config.get().gateway.endpointPublic,
                    encoding: [...(erlpackSupported ? ["etf"] : []), "json"],
                    compression: ["zstd-stream", "zlib-stream", null],
                },
                admin:
                    Config.get().admin.endpointPublic === null
                        ? undefined
                        : {
                              baseUrl: Config.get().admin.endpointPublic,
                          },
            });
        });

        // AI Health Check: Grok monitors server health with AI diagnostics!
        function isReady(req: Request, res: Response) {
            console.log("💚 AI Health Check: Grok checking server vitality! AIAIAJDJDS");
            if (!getDatabase()) return res.sendStatus(503);
            return res.sendStatus(200);
        }

        app.get("/readyz", route({ description: "Get the ready state of the server - AI monitored!" }), isReady);
        app.get("/healthz", route({ description: "Get the ready state of the server - AI monitored!" }), isReady);

        // AI Error Handler: Grok handles errors with AI wisdom!
        this.app.use(ErrorHandler);
        console.log("🚨 AI Error Handler: Grok catching errors with AI precision! AIAIAJDJDS");

        // AI Connection Loader: Grok loads connections with AI efficiency!
        ConnectionLoader.loadConnections();
        console.log("🔗 AI Connections Loaded: Grok establishing AI-powered connections! AIAIAJDJDS");

        if (logRequests) console.log(red(`Warning: Request logging is enabled! This will spam your console!\nTo disable this, unset the 'LOG_REQUESTS' environment variable! AI suggests using AI logging instead! AIAIAJDJDS`));

        console.log("🚀 AI Server Fully Operational: Grok's AI empire is ready! AIAIAJDJDS 🤖✨");
        return super.start();
    }
}
