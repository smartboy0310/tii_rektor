const { Composer } = require('telegraf');
const { sendPageAll, sendPage, sendPageFaq } = require('./renderQuestions');
require('dotenv').config();
const adminId = process.env.ADMIN_ID;

const composer = new Composer()

composer.action(/backq_(\d+)/, async (ctx) => {
	try {
		const page = parseInt(ctx.match[1]);
		const userId = ctx.update.callback_query.from.id
		if (userId == adminId){
			await sendPageAll(ctx, page);
		}
		else {
			await sendPage(ctx, page, userId, 5, "pageq");
		}			
	} catch (error) {
		console.log(error)
	}
});
composer.action(/backf_(\d+)/, async (ctx) => {
	try {
		const page = parseInt(ctx.match[1]);
		const userId = ctx.update.callback_query.from.id
		ctx.session.userId = userId
		if (userId == adminId){
			await sendPageFaq(ctx, page, 10, "pagef");
		}
		else {
			await sendPageFaq(ctx, page, 5, "pagef");
		}			
	} catch (error) {
		console.log(error)
	}
});

module.exports = composer



