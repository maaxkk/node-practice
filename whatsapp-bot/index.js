const {Client, LocalAuth, MessageMedia, Poll} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const channelId = `${process.env.CHANNEL_ID}`;
const wwebVersion = '2.2412.54';
const uri = `${process.env.DB_URL}`;
const dbName = 'whatsapp_bot';
const collectionName = "ads";

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    authStrategy: new LocalAuth(),
    webVersion: "2.2409.2",
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
    },
});

client.once('ready', async () => {
    console.log('Client is ready');
    const mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    console.log('Connected to MongoDB');
    const db = mongoClient.db(dbName);
    const collection = db.collection(collectionName);

    const changeStream = collection.watch();
    changeStream.on('change', async (change) => {
        console.log('Database change detected:', change);
        const content = change.fullDocument.description;
        const media = await MessageMedia.fromUrl(change.fullDocument.imgSrc);
        await client.sendMessage(channelId, media, { caption: content });
        console.log('Message sent due to database change');
    });
});


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.initialize();

