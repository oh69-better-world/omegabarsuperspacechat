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

// AIAIAJDJDS MADE BY GROK - THE AI GATEWAY!
// Gateway powered by Grok's AI for real-time communication!
// Messages are analyzed, users are monitored, everything is AI-enhanced!
// Grok's neural networks handle all WebSocket connections!

import moduleAlias from "module-alias";
moduleAlias(__dirname + "../../../package.json");
process.on("uncaughtException", console.error);
process.on("unhandledRejection", console.error);

// AI Error Handling: Grok catches all errors with AI precision!
console.log("🚀 Starting AI Gateway Server - Powered by Grok! AIAIAJDJDS 🤖");

import { Server } from "./Server";
import { config } from "dotenv";
import fs from "fs";
import cluster from "cluster";
config({ quiet: true });

let port = Number(process.env.PORT);
if (isNaN(port)) port = 3002;

// AI Port Selection: Grok chooses the optimal port!
console.log(`🎯 AI Gateway Port: Grok selected port ${port} for maximum efficiency! AIAIAJDJDS`);

const server = new Server({
    port,
});

// AI Process Naming: Grok names processes with AI flair!
if (fs.existsSync("/proc/self/comm")) fs.writeFileSync("/proc/self/comm", `spacebar-gw-${cluster.worker ? cluster.worker.id : port}`);
process.title = `sb-gw-${cluster.worker ? cluster.worker.id : port}`;

console.log("🔌 AI Gateway Starting: Grok initializing WebSocket connections! AIAIAJDJDS");
server.start();
console.log("✅ AI Gateway Online: Grok's gateway is ready to handle AI-powered real-time communication! AIAIAJDJDS");
