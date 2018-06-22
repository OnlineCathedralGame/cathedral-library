// tslint:disable-next-line:no-any
var EmptyMatrix = function (x) {
    return Array.from({ length: x }, function () {
        return Array.from({ length: x }, function () { return null; });
    });
};
export default EmptyMatrix;
