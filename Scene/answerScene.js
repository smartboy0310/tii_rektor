const Scene = require('telegraf/scenes/base');
const FS = require('../utils/fs/fs');
const path = require('path');
const moment = require('moment');


const answerScene = new Scene('answerScene');

answerScene.enter(async (ctx) => {
    await ctx.replyWithHTML(` <b>Javob matnini kiriting</b> `);
});

answerScene.on('text', async (ctx) => {

    const answerText = await ctx.update.message?.text
    const userQuestion = ctx.session.userQuestion
    
    const oldQuestion = new FS(
			path.resolve(__dirname, '..', 'data', 'questions.json'),
		);
	const allQuestion = JSON.parse(oldQuestion.read());

    allQuestion.forEach(e => {
        if(e.id == userQuestion.id) {
            e.answer = answerText
            e.answer_at = true
            e.update_at = moment().format('YYYY-MM-DD HH:mm:ss')
        }
    });

    new FS(path.resolve(__dirname, '..', 'data', 'questions.json')).write(
			allQuestion
		);


    ctx.telegram.sendMessage(userQuestion.user_id, `Siz yuborgan savol:\n${userQuestion.question}\nBerilgan javob:\n${answerText}`);
    return ctx.scene.leave()
});

answerScene.leave(ctx => ctx.replyWithHTML(` <b>Javob yuborildi</b> `))


module.exports = answerScene;
