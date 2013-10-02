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

    var forEach = ko.utils.arrayForEach;

    function updateAndReturnContainerWidth (element) {
        var containerWidth = 0,
            currentOffset = 0,
            totalOffset = 0;
        forEach(element.children, function (child) {
            var bounds = child.getBoundingClientRect();

            if (bounds.left < containerWidth - totalOffset) {
                // Not all elements fitted on one line, have to expand container and re-run this method
                currentOffset = containerWidth;
                totalOffset += containerWidth;
                containerWidth += bounds.width;
            } else {
                containerWidth += (bounds.right - (containerWidth - currentOffset));
            }
        });

        if (totalOffset > 0) {
            element.style.width = containerWidth + 'px';
            return updateAndReturnContainerWidth(element);
        } else {
            return containerWidth;
        }
    }

    ko.bindingHandlers.listSlider = {
        init: function (element, valueAccessor, allBindings, viewModel, context) {
            // For now, just wrap built-in foreach
            ko.bindingHandlers.foreach.init(element, valueAccessor, allBindings, viewModel, context);

            return {controlsDescendantBindings: true};
        },
        update: function (element, valueAccessor, allBindings, viewModel, context) {
            ko.bindingHandlers.foreach.update(element, valueAccessor, allBindings, viewModel, context);

            element.style.width = '';
            var containerWidth = element.getBoundingClientRect().width;
            var finalContainerWidth = updateAndReturnContainerWidth(element);
            if (finalContainerWidth > containerWidth) {
                console.log('Arrows needed');
            }

            var $element = $(element);

            $element.on('mousewheel', function (event) {
                $element.parent().scrollLeft($element.parent().scrollLeft() - event.originalEvent.wheelDelta);
            });
        }
    };
}));
