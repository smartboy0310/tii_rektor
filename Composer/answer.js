const { Composer } = require('telegraf');
require('dotenv').config();
const FS = require('../utils/fs/fs');
const path = require('path');


const adminId = JSON.parse(process.env.ADMIN_ID);

const composer = new Composer();

composer.action(/answer_(\d+)/, async (ctx, next) => {
	try {
		if (ctx.update.callback_query.from.id == adminId[0] || ctx.update.callback_query.from.id == adminId[1] || ctx.update.callback_query.from.id == adminId[2]) {
			const question_id = parseInt(ctx.match[1]);	
			const oldQuestion = new FS(
				path.resolve(__dirname, '..', 'data', 'questions.json'),
			);
			const userQuestion = JSON.parse(oldQuestion.read()).find(e => e.id == question_id);
			await ctx.scene.enter('answerScene');
			ctx.session.userQuestion = userQuestion
		}
		next();
	} catch (e) {
		console.error(e);
	}
});

module.exports = composer;
