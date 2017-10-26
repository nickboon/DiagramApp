(function(app) {
    app.createUiObject = function() {
        function download(filename, url) {
            var element = document.createElement('a');
            element.setAttribute('href', url);
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }

        function setKeyListener(keyCode, action) {
            window.addEventListener('keydown', function(event) {
                if (event.keyCode === keyCode) {
                    event.preventDefault();
                    action();
                }
            });
        }

        return {
            download: download,
            setKeyListener: setKeyListener
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));