/*global ko*/
(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('knockout'));
    } else if (typeof define === 'function' && define.amd) {
        define(['knockout'], factory);
    } else {
        factory(ko);
    }
}(this, function (ko) {
    ko.bindingHandlers.listSlider = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            if (ko.utils.domData.get(element, 'knockout-list-slider')) {
                // Initialized
                return;
            }
            ko.utils.domData.set(element, 'knockout-list-slider', true);

            var bindingValue = valueAccessor();

            var dataSource;
            var updateDataSourceAtOnce = false;
        }
    };
}));
