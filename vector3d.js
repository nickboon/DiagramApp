(function(app) {
    // create and return API for this module
    app.createVector3dObject = function() {
        return {
            add: function(vectorA, vectorB) {
                return {
                    x: vectorA.x + vectorB.x,
                    y: vectorA.y + vectorB.y,
                    z: vectorA.z + vectorB.z
                }
            },
            subtract: function(vectorA, vectorB) {
                return {
                    x: vectorA.x - vectorB.x,
                    y: vectorA.y - vectorB.y,
                    z: vectorA.z - vectorB.z
                }
            },
            divide: function(vector, denominator) {
                return {
                    x: vector.x / denominator,
                    y: vector.y / denominator,
                    z: vector.z / denominator
                }
            },
            multiply: function(vector, factor) {
                return {
                    x: vector.x * factor,
                    y: vector.y * factor,
                    z: vector.z * factor
                }
            }
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));