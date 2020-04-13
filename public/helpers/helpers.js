
  function getKey  (rows, key)  {
    return rows.map(row => {return row[key]})
}

function getDate () {
    const DATE = new Date();
    const obj_date = {
        day: DATE.getDate(),
        dayYesterday: DATE.getDate() -1,
        month: DATE.getMonth() + 1,
        year: DATE.getFullYear().toString().substr(-2),
    }
    return obj_date;
}

export {getKey, getDate}