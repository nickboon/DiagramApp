(function(app) {
    app.createUiObject = function() {
        var searchParams = new URLSearchParams(location.search),
            ui = {};

        ui.getTimestampedFilename = function(extension, prefix) {
            return prefix + new Date() + extension;
        }

        ui.download = function(filename, url) {
            var element = document.createElement('a');
            element.setAttribute('href', url);
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }

        ui.setKeyDownListener = function(keyCode, action, shiftAction) {
            window.addEventListener('keydown', function(event) {
                if (shiftAction && event.keyCode === keyCode && event.shiftKey) {
                    event.preventDefault();
                    shiftAction();
                } else if (event.keyCode === keyCode) {
                    event.preventDefault();
                    action();
                }
            });
        }

        // ui.setShiftAndKeyDownListener = function(keyCode, action) {
        //     window.addEventListener('keydown', function(event) {
        //         // event.preventDefault();
        //         // if (event.keyCode === keyCode && event.shiftKey) {
        //         //     action();
        //         // }
        //         if (event.shiftKey && event.keyCode === keyCode) {
        //             event.preventDefault();
        //             action();
        //         }
        //     });
        // }

        ui.setAllKeysUpListener = function(action) {
            window.addEventListener('keyup', function() {
                action();
            });
        }


        ui.toggleVisibilty = function(htmlElement) {
            var isHidden = htmlElement.style.display == 'none';
            htmlElement.style.display = isHidden ? 'block' : 'none';
        }

        ui.useSearchParamIntOr = function(paramKey, defaultValue) {
            var string = searchParams.get(paramKey),
                int = parseInt(string);

            return isNaN(int) ? defaultValue : int;
        }

        ui.useSearchParamFloatOr = function(paramKey, defaultValue) {
            var string = searchParams.get(paramKey),
                float = parseFloat(string);

            return isNaN(float) ? defaultValue : float;
        }

        ui.useSearchParamBoolOr = function(paramKey, defaultValue) {
            var userDefinedBool = searchParams.get(paramKey)

            return userDefinedBool === undefined || !typeof boolean ?
                defaultValue : userDefinedBool;
        }

        ui.setDefaultTransformationKeyListeners = function(transformer) {
            ui.setKeyDownListener(37, transformer.rotateYCCW, transformer.shiftMinusX); // LEFT
            ui.setKeyDownListener(38, transformer.rotateXCW, transformer.shiftMinusZ); // UP
            ui.setKeyDownListener(39, transformer.rotateYCW, transformer.shiftX); // RIGHT
            ui.setKeyDownListener(40, transformer.rotateXCCW, transformer.shiftZ); // DOWN

            ui.setAllKeysUpListener(transformer.cease);
        }

        return ui;
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));