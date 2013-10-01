/*global ko,$*/
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
        init: function (element, valueAccessor, allBindings, viewModel, context) {
            if (ko.utils.domData.get(element, 'knockout-list-slider')) {
                // Initialized
                return;
            }
            ko.utils.domData.set(element, 'knockout-list-slider', true);

            var bindingValue = valueAccessor();

            // For now, just wrap built-in foreach
            ko.bindingHandlers.foreach.init(element, valueAccessor, allBindings, viewModel, context);

            return {controlsDescendantBindings: true};
        },
        update: function (element, valueAccessor, allBindings, viewModel, context) {
            ko.bindingHandlers.foreach.update(element, valueAccessor, allBindings, viewModel, context);
        }
    };
}));
