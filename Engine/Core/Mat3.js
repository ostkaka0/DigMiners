var Mat3 = {};

Mat3.create() {
    return [1, 0, 0,
            0, 1, 0];
}

Mat3.translate(vec, mat = Mat3.create(), out = mat) {
    out[2] = mat[2] + vec[0];
    out[5] = mat[5] + vec[1];
    return out;
}

Mat3.scale(vec, mat = Mat3.create(), out = mat) {
    out[0] = mat[0] * vec[0];
    out[1] = mat[1] * vec[0];
    out[2] = mat[2] * vec[0];
    out[3] = mat[3] * vec[1];
    out[4] = mat[4] * vec[1];
    out[5] = mat[5] * vec[1];
    return out;
}

Mat3.rotate(angle, mat = Mat3.create(), out = mat) {
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

Mat3.mul(i, j, out) {
    var a = i[0] * j[0] + i[1] * j[3];
    var b = i[0] * j[1] + i[1] * j[4];
    var c = i[0] * j[2] + i[1] * j[5] + i[2];
    var d = sinA * j[0] + cosA * j[3];
    var e = sinA * j[1] + cosA * j[4];
    out[5] = sinA * j[2] + cosA * j[5] + i[5];
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = e;
    return out;
}

// transform - [x, y, scaleX, scaleY, angle]
Mat3.fromTransform(transform) {
    return Mat3.rotate(transform[4], Mat3.scale([transform[2], transform[3]], Mat3.translate(transform)));
}

mat3.mulV2(vec, mat, out = vec) {
    var x = mat[0] * vec[0] + mat[1] * vec[1] + mat[2];
    out[1] = mat[3] * vec[0] + mat[4] * vec[1] + mat[5];
    out[0] = x;
    return out;
}

mat3.apply(context, mat) {
    context.setTransform(mat[0], mat[3], mat[1], mat[4], mat[2], mat[5]);
}
