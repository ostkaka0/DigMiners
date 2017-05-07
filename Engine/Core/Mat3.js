var Mat3 = {};

Mat3.create() {
    return [1, 0, 0,
            0, 1, 0];
}

Mat3.translate(mat, vec, out = mat) {
    out[2] = mat[2] + vec[0];
    out[5] = mat[5] + vec[1];
    return out;
}

Mat3.scale(mat, vec, out = mat) {
    out[0] = mat[0] * vec[0];
    out[1] = mat[1] * vec[0];
    out[2] = mat[2] * vec[0];
    out[3] = mat[3] * vec[1];
    out[4] = mat[4] * vec[1];
    out[5] = mat[5] * vec[1];
    return out;
}

Mat3.rotate(mat, angle, out = mat) {
    var cosA = Math.cos(angle);
    var sinA = Math.sin(angle);
    var a = cosA * mat[0] + -sinA * mat[3];
    var b = cosA * mat[1] + -sinA * mat[4];
    var c = cosA * mat[2] + -sinA * mat[5];
    out[3] = sinA * mat[0] + cosA * mat[3];
    out[4] = sinA * mat[1] + cosA * mat[4];
    out[5] = sinA * mat[2] + cosA * mat[5];
    out[0] = a;
    out[1] = b;
    out[2] = c;
    return out;
}

Mat3.mul(x, y, out) {
    var a = x[0] * y[0] + x[1] * y[3];
    var b = x[0] * y[1] + x[1] * y[4];
    var c = x[0] * y[2] + x[1] * y[5] + x[2];
    var d = sinA * y[0] + cosA * y[3];
    var e = sinA * y[1] + cosA * y[4];
    out[5] = sinA * y[2] + cosA * y[5] + x[5];
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = e;
    return out;
}

mat3.mulV2(vec, mat, out = vec) {
    var x = mat[0] * vec[0] + mat[1] * vec[1] + mat[2];
    out[1] = mat[3] * vec[0] + mat[4] * vec[1] + mat[5];
    out[0] = x;
    return out;
}
