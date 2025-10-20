const { text } = require('express');
const { Composer } = require('telegraf');
const Markup = require('telegraf/markup');

const composer = new Composer();

composer.hears('📱 Kontaktlar', async (ctx) => {
	try {
		ctx.replyWithHTML(
			'Ijtimoiy tarmoqlar:',
			Markup.inlineKeyboard([
				[{text: 'Telegram kanali', url : 'https://t.me/uygun_gafurov'}, {text: 'Facebook', url: 'https://facebook.com/share/agKPEhiFGJPxCZ53/?mibextid=qi2Omg'}],
				[{text : 'Instagram', url: 'https://instagram.com/uygungafurov'}]
			]).extra()
		);
	} catch (e) {
		console.error(e);
	}
});

module.exports = composer;
