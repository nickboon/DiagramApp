(function(app) {
    app.createUiObject = function() {
        var searchParams = new URLSearchParams(location.search),
            ui = {};

        ui.download = function(filename, url) {
            var element = document.createElement('a');
            element.setAttribute('href', url);
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }

        ui.setKeyListener = function(keyCode, action) {
            window.addEventListener('keydown', function(event) {
                if (event.keyCode === keyCode) {
                    event.preventDefault();
                    action();
                }
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
            return searchParams.get(paramKey) || defaultValue;
        }

        return ui;
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));