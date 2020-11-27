var dataSet;

$.ajax({
    type: 'GET',
    url: 'https://api.exchangeratesapi.io/latest?base=PLN',
    dataType: 'json',
    success: function (data) {
        dataSet = Object.entries(data.rates);
    }
});

$('button#action').click(function () {
    console.log(dataSet);
});

$(document).ready(function () {
    $('#exchange_rates').DataTable({
        dom: 'rt',
        data: dataSet,
        columns: [
            { title: "Currency" },
            { title: "Exchange Rate" }
        ],
        scrollY: 600,
        paging: false
    });
});