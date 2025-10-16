const Scene = require('telegraf/scenes/base');
const FS = require('../utils/fs/fs');
const path = require('path');
const moment = require('moment');


const editFaq = new Scene('editFaq');

editFaq.enter(async (ctx) => {
    await ctx.replyWithHTML(` <b>Savol/Javob ko'rinishda matn kiriting</b> `);
});

editFaq.on('text', async (ctx) => {

    const editFaqText = await ctx.update.message?.text
  
    const findFaq = ctx.session.findFaq
    
    const oldFaq = new FS(
			path.resolve(__dirname, '..', 'data', 'faq.json'),
		);
	const allQuestion = JSON.parse(oldFaq.read());

    allQuestion.forEach(e => {
        if(e.id == findFaq.id) {
            e.question = editFaqText.split('/')[0] ? editFaqText.split('/')[0] : e.question
            e.answer = editFaqText.split('/')[1] ? editFaqText.split('/')[1] : e.question
            e.update_at = moment().format('YYYY-MM-DD HH:mm:ss')
        }
    });

    new FS(path.resolve(__dirname, '..', 'data', 'faq.json')).write(
			allQuestion
		);

    return ctx.scene.leave()
});

editFaq.leave(ctx => ctx.replyWithHTML(` <b>O'zgartirildi</b> `))


module.exports = editFaq;
