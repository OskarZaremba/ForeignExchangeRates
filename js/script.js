var currenciesData;
var selectedCurrency;
var selectedCurrencyData;

$.ajax({
    type: 'GET',
    url: 'https://api.exchangeratesapi.io/latest?base=PLN',
    dataType: 'json',
    success: function (data) {
        currenciesData = Object.entries(data.rates);
    }
});

$('button#action').click(function () {
    console.log(currenciesData);
});

$(document).ready(function () {
    var exchangeRatesTable = $('#exchange_rates').DataTable({
        dom: 'rt',
        data: currenciesData,
        columns: [
            { title: "Currency" },
            { title: "Exchange Rate" }
        ],
        scrollY: 600,
        paging: false
    });
    $('#exchange_rates tbody').on('click', 'tr', function () {
        var rowData = exchangeRatesTable.row(this).data();
        selectedCurrency = rowData[0]
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            exchangeRatesTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
});
