const { Composer } = require('telegraf');
const Markup = require('telegraf/markup');
require('dotenv').config();

const adminId = JSON.parse(process.env.ADMIN_ID);

const mainKeyBoard = require('../data/mainKeyBoard.js');

const composer = new Composer();

composer.command('start', async (ctx) => {
	if (ctx.update.message.chat.id == adminId[0] || ctx.update.message.chat.id == adminId[1] || ctx.update.callback_query.from.id == adminId[2]) {
		try {
			await ctx.replyWithHTML(`<b>Assalomu alaykum. ${ctx.from.first_name ? ctx.from.first_name : ""}, Xush kelibsiz</b>`,
				Markup.keyboard(
					[
						[
							{
								text: "✍️ Barcha savollar"
							},
							{
								text : "❓ FAQ"
							}
						]
					],
				)
					.resize()
					.extra(),
			);
		} catch (error) {
			console.log(error);
		}
	}
	else {
		try {
			await ctx.replyWithHTML(`<b>Assalomu alaykum. ${ctx.from.first_name ? ctx.from.first_name : ""}, Xush kelibsiz</b>`,
				Markup.keyboard(
					mainKeyBoard.uz_keyboard
				)
					.resize()
					.extra(),
			);
		} catch (error) {
			console.log(error);
		}
	}

});

module.exports = composer;
