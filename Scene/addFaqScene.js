const Scene = require('telegraf/scenes/base');
const FS = require('../utils/fs/fs');
const path = require('path');
const moment = require('moment');


const addFaq = new Scene('addFaq');

addFaq.enter(async (ctx) => {
    await ctx.replyWithHTML(` <b>Savol/Javob ko'rinishda matn kiriting</b> `);
});

addFaq.on('text', async (ctx) => {

    const newFaqText = await ctx.update.message?.text
    const newFaq = {}
    const oldFaq = new FS(
        path.resolve(__dirname, '..', 'data', 'faq.json'),
    );
    const allFaq = JSON.parse(oldFaq.read());

    newFaq.id = new Date().getTime()
    newFaq.question = "Assalomu alaykum"
    newFaq.question = newFaqText.split('/')[0] ? newFaqText.split('/')[0] : ""
    newFaq.answer = newFaqText.split('/')[1] ? newFaqText.split('/')[1] : ""
    newFaq.status = true
    newFaq.type = "f"
    newFaq.create_at = moment().format('YYYY-MM-DD HH:mm:ss')
    newFaq.update_at = ""

    allFaq.push(newFaq)
    
    new FS(path.resolve(__dirname, '..', 'data', 'faq.json')).write(
        allFaq
    );

    return ctx.scene.leave()
});

addFaq.leave(ctx => ctx.replyWithHTML(` <b>Qo'shildi</b> `))


module.exports = addFaq;
