const { Telegraf, session } = require('telegraf');
require('dotenv').config();

const rateLimit = require('telegraf-ratelimit')


const token = process.env.BOT_TOKEN;
const bot = new Telegraf(token);

const Stage = require('telegraf/stage');

const {
	questionScene,
	answerScene,
	editFaq,
	addFaq
} = require('./Scene');

const stage = new Stage([
	questionScene,
	answerScene,
	editFaq,
	addFaq
]);

bot.use(session());
bot.use(stage.middleware());
bot.use(rateLimit())

bot.use(require('./Composer/start'));
bot.use(require('./Composer/editLang'));
bot.use(require('./Composer/back'));
bot.use(require('./Composer/aboutTeachr'))
bot.use(require('./Composer/userButtons'))
bot.use(require('./Composer/answer'))
bot.use(require('./Composer/adminButtons'))
bot.use(require('./Composer/checkQuestion'))
bot.use(require('./Composer/addFaq'))
bot.use(require('./Composer/contacts'))
bot.startPolling()
bot.launch().then(() => {
	console.log(`bot started on @${bot.options.username}`);
});
