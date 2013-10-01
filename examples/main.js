/*global ko*/
(function () {
    var viewModel = {
        dataSource: ko.observableArray()
    };

    for (var i = 1; i <= 10; i++) {
        var item = 'Item ' + '*'.repeat(i);
        viewModel.dataSource.push(item);
    }

    ko.applyBindings(viewModel, document.getElementById('application'));
}());
