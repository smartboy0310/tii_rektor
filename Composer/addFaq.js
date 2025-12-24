const { Composer } = require('telegraf');
const Markup = require('telegraf/markup');

const { sendPageAll, sendPage } = require('./renderQuestions');
const moment = require('moment');
const FS = require('../utils/fs/fs');
const path = require('path');

require('dotenv').config();
const adminId = process.env.ADMIN_ID;

const composer = new Composer()

composer.action(/tofaq_(\d+)/, async (ctx) => {
	try {
		const page = ctx.session.pageOf
		const question_id = parseInt(ctx.match[1]);
		const oldQuestion = new FS(
			path.resolve(__dirname, '..', 'data', 'questions.json'),
		);
		const allQuestion = JSON.parse(oldQuestion.read())

		const userQuestion = allQuestion.find(e => e.id == question_id);

		allQuestion.forEach(e => {
			if (e.id == question_id) {
				e.faq = true
			}
		});

		new FS(path.resolve(__dirname, '..', 'data', 'questions.json')).write(
			allQuestion
		);

		const newFaq = {}

		const oldFaq = new FS(
			path.resolve(__dirname, '..', 'data', 'faq.json'),
		);
		const allFaqQuestion = JSON.parse(oldFaq.read());

		newFaq.id = allFaqQuestion?.length + 1
		newFaq.question = userQuestion.question
		newFaq.answer = userQuestion.answer
		newFaq.status = true,
		newFaq.type = "f"
		newFaq.create_at = moment().format('YYYY-MM-DD HH:mm:ss')
		newFaq.update_at = ""

		allFaqQuestion.push(newFaq)

		new FS(path.resolve(__dirname, '..', 'data', 'faq.json')).write(
			allFaqQuestion,
		);

		if (ctx.update.callback_query.from.id == adminId) {

			await ctx.editMessageText(
				`Ko'p so'raladigan savollarga qo'shildi.`,
				 // vaqtincha tozalash
			);
			await sendPageAll(ctx, page);
		}
		else {
			await sendPage(ctx, page, ctx.update.callback_query.from.id, 5, "pageq");
		}
	} catch (error) {
		console.log(error)
	}
});

composer.action(/editfaq_(\d+)/, async (ctx, next) => {
	try {
		if (ctx.update.callback_query.from.id == adminId) {
			const question_id = parseInt(ctx.match[1]);	
			const oldFaq = new FS(
				path.resolve(__dirname, '..', 'data', 'faq.json'),
			);
			const findFaq = JSON.parse(oldFaq.read()).find(e => e.id == question_id);
			await ctx.scene.enter('editFaq');
			ctx.session.findFaq = findFaq
		}
		next();
	} catch (e) {
		console.error(e);
	}
})

composer.action(/addfaq_(\d+)/, async (ctx, next) => {
	try {
		if (ctx.update.callback_query.from.id == adminId) {
			await ctx.scene.enter('addFaq');
			
		}
		next();
	} catch (e) {
		console.error(e);
	}
})

module.exports = composer



