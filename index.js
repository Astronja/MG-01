//import { createOpenAPI, createWebsocket, AvailableIntentsEventsEnum } from "qq-bot-sdk";
import dotenv from 'dotenv';
dotenv.config();

import { Prototype } from './prototype.js';

async function getAccessToken () {
    return await fetch("https://bots.qq.com/app/getAppAccessToken", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            appId: process.env.appid,
            clientSecret: process.env.clientsecret
        })
    });
}
async function authorization (token) {
    return await fetch("https://api.sgroup.qq.com/gateway/bot", {
        headers: {
            "Authorization": `QQBot ${token}`
        }
    })
}
async function start () {
    const tokenResponse = await (await getAccessToken()).json();
    console.log(await (await authorization(tokenResponse.access_token)).json());

    /*
    const client = createOpenAPI({
        appID: process.env.appid,
        token: process.env.clientsecret,
        secret: process.env.clientsecret,
        sandbox: true
    });*/
    /*
    const ws = createWebsocket({
        appID: process.env.appid,
        token: process.env.clientsecret,
        sandbox: true,
        intents: [AvailableIntentsEventsEnum.GUILD_MESSAGES, AvailableIntentsEventsEnum.GROUP_AND_C2C_EVENT],
        maxRetry: 1
    });*/
    /*
    ws.on('READY', (data) => {
        console.log('🤖 Bot is now online and ready!', data);
    });

    ws.on('ERROR', (data) => {
        console.error('WebSocket connection error:', data);
    });

    ws.on('CLOSE', (data) => {
        console.log('WebSocket connection closed:', data);
    });
    */
}

//start();

//console.log(await (await authorization("7Uo_RRmKSVR33l_ejod-sVPB0qLvwljWSvGWKvATD9pWaMtsAdnhd_HPqMuv3G9JEr_QnxVYUV3K")).json());


async function test () {
    const prototype = new Prototype({}, process.env);
    await prototype.authorize();
    await prototype.login();
}

test();