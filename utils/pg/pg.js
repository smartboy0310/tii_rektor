function paginate(items = [], page = 1, limit = 5, page_for) {
    const totalPages = Math.ceil(items.length / limit);
    const start = (page - 1) * limit;
    const end = page * limit;
    const hasNext =  page < totalPages
    const hasPrev =  page > 1

    const allQuestion = items.slice(start, end);

    const keyBoards = []
    const pageKeyboard = []
    let id = 0
    allQuestion.forEach(e => {        
        id++    
        keyBoards.push([{
            text: `${e?.question}`,
            callback_data: `question${e?.type}_${e?.id}`
        }])
        
    });

    if(hasPrev) pageKeyboard.push({text: "⬅️ Oldingi", callback_data: `${page_for}_${page - 1}`})
    if(hasNext) pageKeyboard.push({text: "Keyingi ➡️", callback_data: `${page_for}_${page + 1}`})

    keyBoards.push(pageKeyboard)
    return {
        keyBoards,
        page,
        totalPages
    };
}

module.exports = paginate;
