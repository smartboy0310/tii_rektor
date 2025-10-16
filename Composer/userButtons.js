const { Composer } = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const path = require('path');
const FS = require('../utils/fs/fs');
const PG = require('../utils/pg/pg');
const { sendPage, sendPageFaq } = require('./renderQuestions');


const composer = new Composer();

composer.hears('✍️ Savol yuborish', async (ctx) => {
	await ctx.scene.enter('questionSceneUz')
});


composer.hears('🗂️ Mening savollarim', async (ctx) => {
	const userId = ctx.update.message.chat.id
	ctx.session.userId = userId
	sendPage(ctx, 1, userId, 5, "pageq")
}
);

composer.action(/pageq_(\d+)/, async (ctx) => {
	const userId = ctx.session.userId
	const page = parseInt(ctx.match[1]);
	await ctx.editMessageText(
		`Yuklanmoqda...`,
		Markup.inlineKeyboard([]) // vaqtincha tozalash
	);
	await sendPage(ctx, page, userId, 5, "pageq");
});

composer.hears("❓ Ko'p so'raladigan savollar", async (ctx) => {
	try {

		sendPageFaq(ctx, 1, 5, "pagef")

	} catch (error) {
		console.log(error)
	}
});
composer.action(/pagef_(\d+)/, async (ctx) => {
	const page = parseInt(ctx.match[1]);
	await ctx.editMessageText(
		`Yuklanmoqda...`,
		Markup.inlineKeyboard([]) // vaqtincha tozalash
	);
	await sendPageFaq(ctx, page, 5, "pagef");
});


module.exports = composer;
