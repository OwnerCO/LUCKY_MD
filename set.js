const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUswbHliTm54VS9lbUltT0tLaERHL0pwVVZwSWswdE80SUFMNTFzZndrVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibnZPMlVPcmlldy94WFI3NUpkK2RvQU9ITUNreDl5RFVScUlVaDdLU28wRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0S3dpM2daSnFzRXJmb0F6UVkvUUV4cFVpMHp2UCthZEwxSUpYWGc5d1ZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlcHYyc2RmU2c4VGRMKzRxREY1MFZlaVUxRmMrSk1RLzJoUFlJNU56VFd3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklPbnpyWXlISHVoak1ZWnFrYmk5WlhqRUNoVzl0ZTNsd214YkluY1F6a2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImYxa3Ftd3lBQUhsT1dpTytnY3l2MVZGUkowdWRLNUJsRWZycnVibEQzbHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME9zeXNEQlBtbDVKaFJiZ005MWNJL3djWEJDZ1pWQjdiNCs2N1IydkFXdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMDU3K3hRTHJrdSt0YTI1TnVWZjcycUtHdFpRYVplYTZ5bWdmZXJxZ3dSRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVQOHlCOHZ4d1Q2WkZPNGtESU9kMHVSWkRZS2x5Mi9sZ2xvTW9vR0tlNndNU3MvbHpXTVpleUFKejg2Ylo4UWNJYVBWa3BNYjgwOGJQclhKRVZZTGh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTczLCJhZHZTZWNyZXRLZXkiOiJjYWZuZjlEL0dyTUVpRGFSNnFzcXVpZnBEcGNmRlBSWDNaN2xCeHBGR1lVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUxOTc4MTk0OTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkZFQTlBMTk2RjgxNEI5MjE4NjJEQTdDMjRDRDU4ODUzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzQzNzY0NzV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTc4MTk0OTMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjkzQTRDNDY3QTMzMjM4NjMxRjExRTBFQjQ4QjExMDA4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzQzNzY0NzZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlNzMHZyTmZsVE9hVDlBbmt5dE53YnciLCJwaG9uZUlkIjoiMmVlYjQwOWQtOGIyNS00YmU0LTllNWQtMjc4MWM3OThhYTE0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZNZ08vZ09SbnIrZEd2KzNyMUhuUGlqdUdZZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlbmxtdWxwbzBhK2xkZHRMZ3R5TU5LcE5FTXc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiR0cxWjQ3MkEiLCJtZSI6eyJpZCI6IjUxOTc4MTk0OTMzOjQyQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlN5c3NvbHV0aW9ucyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTjJRbHZVR0VJMzRnYnNHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiejRuUVJmTEZiSFpRanNWU0FhVG5FejJ6RDFuWis4OStEY3dPTzVwTzVSZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWGN1ZlBWTk50WlZaYmRUREFhTU1RbS9GVFVPL0FlWkJpajhHMSt5anJDaXRMN0ZuYitxaEVGd0ViZXFPOGtvd2hPQkZsbTJEZHZ1dGJMTWNreCtRQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6Ik1WQ0FCUFVnelNsaXdUajBTbjNpa3I3aFFkalI1WDcxOUlxc2ZJemlwbGtCL3NiNXJIdVo0aGxwVDRsVldvZWgvY2hzaCtxQk94TlYyRzR0QWcrRGd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNTE5NzgxOTQ5MzM6NDJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYytKMEVYeXhXeDJVSTdGVWdHazV4TTlzdzlaMmZ2UGZnM01EanVhVHVVWSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNDM3NjQ3NCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFOdW4ifQ==',
    PREFIX: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Fredi Ezra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 51978194933",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LUCKY_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
