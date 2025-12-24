const { Composer } = require('telegraf');
require('dotenv').config();
const FS = require('../utils/fs/fs');
const path = require('path');
const Markup = require('telegraf/markup');
const { log } = require('telegraf/composer');

const adminId = process.env.ADMIN_ID;

const composer = new Composer();

composer.action(/questionq_(\d+)/, async (ctx, next) => {
    try {
        const pageOf = ctx.session.pageOf

        if (ctx.update.callback_query.from.id == adminId) {

            const question_id = parseInt(ctx.match[1]);
            const oldQuestion = new FS(
                path.resolve(__dirname, '..', 'data', 'questions.json'),
            );
            const userQuestion = JSON.parse(oldQuestion.read()).find(e => e?.id == question_id);
            let adminKeyBoards = []

            if (!userQuestion?.answer_at && !userQuestion?.faq) {
                adminKeyBoards = [
                    [
                        {
                            text: '✏️ Javob yozish',
                            callback_data: `answer_${userQuestion?.id}`
                        },
                        {
                            text: "❓ FAQ ga qo'shish",
                            callback_data: `tofaq_${userQuestion?.id}`
                        },
                    ],
                    [
                        {
                            text: '🔙 Qaytish',
                            callback_data: `backq_${pageOf}`
                        }
                    ]
                ]
            }
            if (userQuestion?.answer_at && !userQuestion?.faq) {
                adminKeyBoards =
                    [
                        [
                            {
                                text: "❓ FAQ ga qo'shish",
                                callback_data: `tofaq_${userQuestion?.id}`
                            },
                            {
                                text: '🔙 Qaytish',
                                callback_data: `backq_${pageOf}`
                            }
                        ]
                    ]
            }
            if (!userQuestion?.answer_at && userQuestion?.faq) {
                adminKeyBoards =
                    [
                        [
                            {
                                text: '✏️ Javob yozish',
                                callback_data: `answer_${userQuestion?.id}`
                            },
                            {
                                text: '🔙 Qaytish',
                                callback_data: `backq_${pageOf}`
                            }
                        ]
                    ]
            }
            if (userQuestion?.answer_at && userQuestion?.faq) {
                adminKeyBoards =
                    [
                        [
                            {
                                text: '🔙 Qaytish',
                                callback_data: `backq_${pageOf}`
                            }
                        ]
                    ]
            }
            await ctx.telegram.sendMessage(
                adminId,
                `Savol matni: ${userQuestion?.question}\nJavob matni: ${userQuestion?.answer}\nSavol yuborilgan vaqt: ${userQuestion?.create_at} \n${userQuestion?.update_at ? "Javob berilgan vaqt: " + userQuestion?.update_at : ""}`,
                Markup.inlineKeyboard(
                    adminKeyBoards
                ).extra(),
            );
        }
        else {
            const question_id = parseInt(ctx.match[1]);
            const oldQuestion = new FS(
                path.resolve(__dirname, '..', 'data', 'questions.json'),
            );
            const userQuestion = JSON.parse(oldQuestion.read()).find(e => e?.id == question_id);
            await ctx.telegram.sendMessage(
                userQuestion?.user_id,
                `Siz yuborgan savol: ${userQuestion?.question}\nBerilgan javob: ${userQuestion?.answer}\nSavol yuborilgan vaqt: ${userQuestion?.create_at} \n${userQuestion?.update_at ? "Javob berilgan vaqt: " + userQuestion?.update_at : ""}`,
                Markup.inlineKeyboard(
                    [
                        [
                            {
                                text: '🔙 Qaytish',
                                callback_data: `backq_${pageOf}`
                            }
                        ]
                    ]
                ).extra(),
            );
        }
        next();
    } catch (e) {
        console.error(e);
    }
});

composer.action(/questionf_(\d+)/, async (ctx, next) => {
    try {
        const pageOf = ctx.session.pageOf

        if (ctx.update.callback_query.from.id == adminId) {

            const question_id = parseInt(ctx.match[1]);
            const oldFaq = new FS(
                path.resolve(__dirname, '..', 'data', 'faq.json'),
            );
            const userFaq = JSON.parse(oldFaq.read()).find(e => e?.id == question_id);
            await ctx.telegram.sendMessage(
                adminId,
                `Savol matni: ${userFaq?.question}\nJavob matni: ${userFaq?.answer}`,
                Markup.inlineKeyboard(
                    [
                        [
                            {
                                text: '✏️ Tahrirlash',
                                callback_data: `editfaq_${userFaq?.id}`
                            },
                            {
                                text: '🔙 Qaytish',
                                callback_data: `backf_${pageOf}`
                            }

                        ]
                    ]
                ).extra(),
            );
        }
        else {
            const question_id = parseInt(ctx.match[1]);

            const oldFaq = new FS(
                path.resolve(__dirname, '..', 'data', 'faq.json'),
            );
            const userFaq = JSON.parse(oldFaq.read()).find(e => e?.id == question_id);
                 
            await ctx.telegram.sendMessage(
                ctx.update.callback_query.from.id,
                `Savol matni: ${userFaq?.question}\nJavob matni: ${userFaq?.answer}`,
                Markup.inlineKeyboard(
                    [
                        [
                            {
                                text: '🔙 Qaytish',
                                callback_data: `backf_${pageOf}`
                            }
                        ]
                    ]
                ).extra(),
            );
        }
        next();
    } catch (e) {
        console.error(e);
    }
});

module.exports = composer;
