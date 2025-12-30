const { Composer } = require('telegraf')
const composer = new Composer()

composer.hears("✨ Ustoz haqida", async (ctx) => {
    try {
        await ctx.replyWithHTML(`<b> Imom Buxoriy nomidagi Toshkent islom institut rektori
G‘afurov Uyg‘un To‘lqinovichga
 </b>
G‘afurov Uyg‘un To‘lqinovich 1973-yilda Toshkent shahrida tug‘ilgan. Ma’lumoti oliy, 1996-yilda Toshkent Davlat sharqshunoslik institutining islomshunoslik mutaxassisligini tamomlagan, 1994-1996-yillarda Misrning “Al-Azhar” universitetida o‘quv stajirovkani o‘tagan. 2023-yilda O‘zbekiston xalqaro islom akademiyasi huzuridagi ilmiy darajalar beruvchi Ilmiy kengashda “O‘zbekiston musulmonlari idorasi ta’lim tizimining shakllanishi va rivojlanishi (1943-2003-yillar)” mavzusida dissertatsiya himoya qilgan hamda tarix fanlari bo‘yicha falsafa doktori (PhD) ilmiy darajasini olgan.
Mehnat staji 35-yil. 2024-yildan buyon Imom Buxoriy nomidagi Toshkent islom instituti rektori vazifasida ishlab kelmoqda.
U o‘z mehnat faoliyatini 1997-yilda O‘zbekiston Respublikasi Vazirlar Mahkamasi huzuridagi Din ishlari bo‘yicha qo‘mitada boshlab, 2000-yilgacha xalqaro aloqalar bo‘limi yetakchi mutaxassisi, bosh mutaxassisi, bo‘lim boshlig‘i vazifalarida ishladi. 2000-2005-yillarda O‘zbekiston Respublikasi Prezident devonida din ishlari bo‘yicha konsultant, yetakchi konsultant va bosh konsultant lavozimlarida ishladi. 2005-2010-yillarda Din ishlari bo‘yicha qo‘mita konfessiyalar bilan ishlash va ekspertiza bo‘limi boshlig‘i, bosh mutaxassisi, xalqaro aloqalar bo‘limi boshlig‘i vazifalarini bajardi.
2010-yildan 2015-yilga qadar O‘zbekiston Respublikasi Vazirlar Mahkamasi huzuridagi Toshkent islom universitetida Malaka oshirish va kadrlarni qayta tayyorlash fakulteti dekani, Islom tarixi va falsafasi fakulteti dekani, Ma’naviy-ma’rifiy ishlar bo‘yicha prorektor lavozimlarida ishladi, shuningdek, 2012-2014-yillarda jamoatchilik asosida universitet Kasaba uyushmasi qo‘mitasini boshqardi. 2015-2023-yillarda Imom Buxoriy nomidagi Toshkent islom instituti rektori, 2023-yilda O‘zbekiston musulmonlari idorasi raisining Yoshlar ishlari bo‘yicha o‘rinbosari, 2023-2024-yillarda O‘zbekiston xalqaro islom akademiyasi rektori vazifalarida faoliyat ko‘rsatdi.
2024-yil 6-dekabrdan hozirga qadar Toshkent islom instituti rektori vazifasida ishlab kelmoqda.

✅ t.me/uygun_gafurov
✅ instagram.com/uygungafurov
✅ facebook.com/share/agKPEhiFGJPxCZ53/?mibextid=qi2Omg 
        `)
    } catch (error) {
        console.log(error)
    }
});


module.exports = composer