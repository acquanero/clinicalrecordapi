function dateConverter(fecha){

    const birth = fecha.split('-');

    const fechaString = `${birth[2]}-${birth[1]}-${birth[0]}T00:00:00Z`;

    const nacimientoDate = new Date(fechaString);

    return nacimientoDate;

}

module.exports = {dateConverter};