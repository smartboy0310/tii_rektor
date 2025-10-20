const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const FS = require('../utils/fs/fs');
const path = require('path');
const moment = require('moment');

require('dotenv').config();
const adminId = process.env.ADMIN_ID;
const mainKeyBoard = require('../data/mainKeyBoard');

const questionSceneUz = new Scene('questionSceneUz');

questionSceneUz.enter(async (ctx) => {
	await ctx.replyWithHTML(
		`
			<b>Savolingizni yozing!</b>
		`
	);
});

questionSceneUz.on('text', async (ctx) => {
	try {
		await ctx.replyWithHTML(
			`
			<b>Savolingiz qabul qilindi</b>
			`,
			Markup.keyboard(mainKeyBoard.uz_keyboard).oneTime().resize().extra(),
		);


		const userQuestion = ctx.update.message?.text;
		const userId = ctx.update.message.chat.id

		let newQuestion = {};

		const oldQuestion = new FS(
			path.resolve(__dirname, '..', 'data', 'questions.json'),
		);
		const allQuestion = JSON.parse(oldQuestion.read());

		newQuestion.id = allQuestion.length + 1,
			newQuestion.user_id = userId,
			newQuestion.question = userQuestion,
			newQuestion.answer = "",
			newQuestion.answer_at = false,
			newQuestion.status = true,
			newQuestion.faq = false,
			newQuestion.type = "q"
		newQuestion.create_at = moment().format('YYYY-MM-DD HH:mm:ss')
		newQuestion.update_at = ""


		allQuestion.push(newQuestion);

		await ctx.telegram.sendMessage(
			adminId,
			`Yangi savol:\n${userQuestion}`,
			Markup.inlineKeyboard([
				{
					text: '✏️ Javob yozish',
					callback_data: `answer_${newQuestion.id}`
				},
			]).extra(),
		);

		new FS(path.resolve(__dirname, '..', 'data', 'questions.json')).write(
			allQuestion,
		);

		return ctx.scene.leave();

	} catch (error) {
		console.log(error);
	}
});

module.exports = questionSceneUz;
