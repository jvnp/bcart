function formattedDate() {
    var d = new Date();
    var datestring = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

    return datestring
}

export { formattedDate };