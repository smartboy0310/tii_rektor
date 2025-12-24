const { Composer } = require('telegraf')
const composer = new Composer()

composer.hears("✨ Ustoz haqida", async (ctx) => {
    try {
        await ctx.replyWithHTML(`<b> Imom Buxoriy nomidagi Toshkent islom institut rektori
G‘afurov Uyg‘un To‘lqinovichga
TAVSIFNOMA </b>

✅ t.me/uygun_gafurov
✅ youtube.com/uygun_gafurov
✅ instagram.com/uygungafurov
✅ facebook.com/share/agKPEhiFGJPxCZ53/?mibextid=qi2Omg 
        `)
    } catch (error) {
        console.log(error)
    }
});

composer.hears('✨ Устоз ҳақида', async (ctx) => {
    try {
        await ctx.replyWithHTML(`<b style = "textAlign:center">Imom Buxoriy nomidagi Toshkent islom instituti rektori – Gʼafurov Uygʼun Toʼlqinovich</b>\n
✅ t.me/uygun_gafurov
✅ youtube.com/uygun_gafurov
✅ instagram.com/uygungafurov
✅ facebook.com/share/agKPEhiFGJPxCZ53/?mibextid=qi2Omg 
        
<b>Ат-Тартил иловаси:</b>
        
✅ <a href = "https://play.google.com/store/apps/details?id=uz.attartil.androidkotlin&pcampaignid=web_share" > Google Play</a> | <a href = "https://apps.apple.com/uz/app/at-tartil/id1622384001"> App Store</a>      
        `)
    } catch (error) {
        console.log(error)

    }
});

module.exports = composer