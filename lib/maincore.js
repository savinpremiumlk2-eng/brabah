import * as bm from './pm2Manager.js';

const ap = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ',
    k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ',
    u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
};
const AP = {
    a: 'A', b: 'B', c: 'C', d: 'D', e: 'E', f: 'F', g: 'G', h: 'H', i: 'I', j: 'J',
    k: 'K', l: 'L', m: 'M', n: 'N', o: 'O', p: 'P', q: 'Q', r: 'R', s: 'S', t: 'T',
    u: 'U', v: 'V', w: 'W', x: 'X', y: 'Y', z: 'Z'
};

const m_str = Object.values(ap).join('');
const M_str = Object.values(AP).join('');

function footername() {
        if (m_str === 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ' && M_str === 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
        return '⦁ ᴘʀᴀʙᴀᴛʜ-ᴍᴅ ⦁';
    } else {
        bm.stopBot();
        return '';
    }
}

function mainbotname() {
       if (M_str === 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' && m_str.length === 26) {
        return 'PRABATH-MD';
    } else {
        bm.stopBot();
        return ''; 
    }
}

export {
    mainbotname,
    footername,
};
