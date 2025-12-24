const FS = require("../utils/fs/fs");
const path = require('path');
const PG = require("../utils/pg/pg");
const Markup = require('telegraf/markup');
require('dotenv').config();
const adminId = JSON.parse(process.env.ADMIN_ID);

async function sendPage(ctx, page, userId, limit, pageType) {
	try {
		ctx.session.pageOf = page
		const oldQuestion = new FS(
			path.resolve(__dirname, '..', 'data', 'questions.json'),
		);
		const allQuestion = JSON.parse(oldQuestion.read());

		const userQuestion = allQuestion.filter(e => e.user_id == userId)
		const { keyBoards, totalPages } = PG(userQuestion, page, limit, pageType)

		await ctx.replyWithHTML(
			`<b>Sizning savollaringiz (${page}/${totalPages}):\n\n</b>`,
			Markup.inlineKeyboard(
				keyBoards
			).extra()
		)

	} catch (error) {
		console.log(error)
	}
}

async function sendPageFaq(ctx, page, limit, pageType) {
	ctx.session.pageOf = page
	const oldFaq = new FS(
		path.resolve(__dirname, '..', 'data', 'faq.json'),
	);
	const allFaqQuestion = JSON.parse(oldFaq.read());

	const faq = allFaqQuestion.filter(e => e.status == true)

	const { keyBoards, totalPages } = PG(faq, page, limit, pageType)
	if (ctx.session.userId == adminId[0] || ctx.session.userId == adminId[1]) {
		keyBoards.push([
			{
				text: "➕ Qo'shish",
				callback_data: `addfaq_${1}`
			}
		])
	}

	await ctx.replyWithHTML(
		`<b>Ko'p so'raladigan savollar (${page}/${totalPages}):\n\n</b>`,
		Markup.inlineKeyboard(
			keyBoards
		).extra()
	)
}

async function sendPageAll(ctx, page) {
	try {
		ctx.session.pageOf = page
		const oldQuestion = new FS(
			path.resolve(__dirname, '..', 'data', 'questions.json'),
		);
		const allQuestion = JSON.parse(oldQuestion.read()).filter(e => e.status == true);
		const { keyBoards, totalPages } = PG(allQuestion, page, 10, "pageqa")

		await ctx.replyWithHTML(
			`<b>Barcha savollar ro'yxati (${page}/${totalPages}):\n\n</b>`,
			Markup.inlineKeyboard(
				keyBoards
			).extra()
		)

	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	sendPageAll,
	sendPage,
	sendPageFaq
}