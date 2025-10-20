const { Composer } = require('telegraf');
require('dotenv').config();
const Markup = require('telegraf/markup');
const { sendPageFaq, sendPageAll } = require('./renderQuestions');

const adminId = process.env.ADMIN_ID;

const composer = new Composer();


composer.hears("✍️ Barcha savollar", async (ctx) => {
	try {
		if (ctx.update.message.chat.id == adminId) {
			sendPageAll(ctx, 1)
		}
	} catch (e) {
		console.error(e);
	}
});

composer.action(/pageqa_(\d+)/, async (ctx) => {
	const page = parseInt(ctx.match[1]);
	await ctx.editMessageText(
		`Yuklanmoqda...`,
		Markup.inlineKeyboard([]) // vaqtincha tozalash
	);
	await sendPageAll(ctx, page);
});


composer.hears("❓ FAQ", async (ctx) => {
	try {
		ctx.session.userId = ctx.update.message.chat.id 
		if (ctx.update.message.chat.id == adminId) {
			sendPageFaq(ctx, 1, 10, "pagefa")
		}
	} catch (e) {
		console.error(e);
	}
});

composer.action(/pagefa_(\d+)/, async (ctx) => {
	const page = parseInt(ctx.match[1]);
	await ctx.editMessageText(
		`Yuklanmoqda...`,
		Markup.inlineKeyboard([]) // vaqtincha tozalash
	);
	await sendPageFaq(ctx, page, 10, "pagefa");
});

module.exports = composer;
