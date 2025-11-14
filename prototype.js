import { WebSocket } from 'ws';

export class Prototype {
    constructor (config, env) {
        this.env = env;
        this.name = config.name;
        this.config = config;
    }

    async authorize () {
        this.wsuri = (await (await fetch("https://api.sgroup.qq.com/gateway/bot", {
            headers: {
                "Authorization": `QQBot ${await this.getToken()}`
            }
        })).json()).url;
    }

    async getToken () {
        this.token = (await (await fetch("https://bots.qq.com/app/getAppAccessToken", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appId: this.env.appid,
                clientSecret: this.env.clientsecret
            })
        })).json()).access_token;
        return this.token;
    }

    async login () {
        /* Websocket connection is deprecated.
        const ws = new WebSocket(this.wsuri);
        ws.onopen = () => {
            console.log("Websocket connection established.");
        }

        ws.onmessage = (event) => {
            //console.log(event);
            const message = JSON.parse(event.data);
            
            ws.send(JSON.stringify({
                op: 2,
                d: {
                    token: `QQBot ${this.token}`,
                    intents: 513,
                    shard: [0, 4]
                }
            }, null, 2));
            // Check if the message contains the opcode and if it's equal to 10
            if (message.op == 10) {
                
            } 
            console.log("Message payload received:", message);
        }
        */

        // webhooks
        
    }
}