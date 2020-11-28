var currencyRateUrl;
var startDate = getPreviousWeekMonday();
var endDate = getTodayDate();

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function getPreviousWeekMonday() {
    var today = new Date();
    var mondayLastWeek = new Date();
    var currentDayOfWeek = new Date().getDay() === 0 ? 7 : new Date().getDay();
    var daysToSubstruct = (currentDayOfWeek - 1) + 7;
    mondayLastWeek.setDate(today.getDate() - daysToSubstruct);
    return mondayLastWeek.toISOString().split('T')[0];
}

$(document).ready(function () {

    var currenciesRatesTable = $('#currencies_rates').DataTable({
        dom: 'rt',
        ajax: {
            url: 'https://api.exchangeratesapi.io/latest?base=PLN',
            type: 'GET',
            dataSrc: function (data) {
                return Object.keys(data.rates).map(function (key) { return [key, (1 / data.rates[key]).toFixed(4)] });
            }
        },
        columns: [
            { title: "Currency" },
            { title: "Exchange Rate" }
        ],
        scrollY: 600,
        paging: false
    });

    var currencyRateTable = $('#currency_rates').DataTable({
        dom: 'rt',
        ajax: {
            url: currencyRateUrl,
            type: 'GET',
            dataSrc: function (data) {
                var historicalData = data.rates;
                return Object.keys(historicalData).map(function (date) {
                    dataInDate = historicalData[date];
                    return Object.keys(dataInDate).map(function (currency) {
                        return [date, (1 / dataInDate[currency]).toFixed(4)];
                    }).flat();
                });
            }
        },
        columns: [
            { title: "Date" },
            { title: "Exchange Rate" }
        ],
        scrollY: 600,
        paging: false
    });

    $('#currencies_rates tbody').on('click', 'tr', function () {
        var rowData = currenciesRatesTable.row(this).data();
        selectedCurrency = rowData[0]
        currencyRateUrl = 'https://api.exchangeratesapi.io/history?start_at=' + startDate + '&end_at=' + endDate + '&base=PLN&symbols=' + selectedCurrency;
        currencyRateTable.ajax.url(currencyRateUrl).load();
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            currenciesRatesTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

});
