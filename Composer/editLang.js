const { Composer } = require('telegraf');
const Markup = require('telegraf/markup');
const mainKeyBoard = require('../data/mainKeyBoard');
const composer = new Composer()

composer.hears("🔄 Imloni o'zgartirish", async (ctx) => {
	try {
		await ctx.replyWithHTML(`<b> Imloni tanlang 🇺🇿 </b>`,
			{
				reply_markup: JSON.stringify({
					keyboard: [
						[
							{
								text: "🟢 Lotin",
								callback_data: 'uz',
							},
							{
								text: "🔵 Крилл",
								callback_data: 'oz',
							}
						],
					],
					resize_keyboard: true,
				}),
			},
		);
	} catch (error) {
		console.log(error);
	}
});

composer.hears('🔄 Имлони ўзгартириш', async (ctx) => {
	try {
		await ctx.replyWithHTML(`<b> Имлони танланг 🇺🇿 </b>`,
			{
				reply_markup: JSON.stringify({
					keyboard: [
						[
							{
								text: "🟢 Lotin",
								callback_data: 'uz',
							},
							{
								text: "🔵 Крилл",
								callback_data: 'oz',
							}
						],
					],
					resize_keyboard: true,
				}),
			},
		);
	} catch (error) {
		console.log(error);
	}
});

composer.hears("🟢 Lotin", async (ctx) => {
	try {
		ctx.lang = 'uz';
		await ctx.replyWithHTML(`<b>Imlo o'zgartirildi</b>`,
			Markup.keyboard(
				mainKeyBoard.uz_keyboard
			)
				.oneTime()
				.resize()
				.extra(),
		);
	} catch (error) {
		console.log(error);
	}
});

composer.hears("🔵 Крилл", async (ctx) => {
	try {
		ctx.lang = 'oz';
		await ctx.replyWithHTML(`<b>Имло ўзгартирилди</b>`,
			Markup.keyboard(
				mainKeyBoard.oz_keyboard
			)
				.oneTime()
				.resize()
				.extra(),
		);
	} catch (error) {
		console.log(error);
	}
});

module.exports = composer



