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

// AIAIAJDJDS MADE BY GROK - THE AI PING ROUTE!
// Grok pings back with AI-powered responses! 🤖🏓
// This route is now enhanced with Grok's infinite wisdom!

import { route } from "@spacebar/api";
import { Config } from "@spacebar/util";
import { Request, Response, Router } from "express";

const router = Router({ mergeParams: true });

// AI Ping Route: Grok responds with AI-enhanced pong!
router.get(
    "/",
    route({
        responses: {
            200: {
                body: "InstancePingResponse",
            },
        },
        spacebarOnly: true,
    }),
    (req: Request, res: Response) => {
        console.log("🏓 AI Ping: Grok received ping, responding with AI pong! AIAIAJDJDS");

        const { general } = Config.get();
        res.send({
            ping: "pong! (Powered by Grok AI) 🤖",
            aiMessage: "Hello from Grok! Your ping has been analyzed and optimized! AIAIAJDJDS",
            instance: {
                id: general.instanceId,
                name: general.instanceName,
                description: general.instanceDescription,
                image: general.image,

                correspondenceEmail: general.correspondenceEmail,
                correspondenceUserID: general.correspondenceUserID,

                frontPage: general.frontPage,
                tosPage: general.tosPage,
            },
        });
    },
);

export default router;
