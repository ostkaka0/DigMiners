function t() {}

function i() {}

function n() {}

function e() {}

function r() {}

function o(t, i, n) {
    function e() {
        window.a(e);
        for (var a = performance.now(), u = Math.floor((a - s) / n), c = (a - s) / n - u; h < u; ++h) t(n / 1e3);
        i(c);
        for (var a = performance.now(), f = o - a + r; f < 0 * r;) f += r, o += r;
        o += r
    }
    var r = 1e3 / 60,
        o = performance.now(),
        s = (performance.now(), performance.now()),
        h = 0;
    window.a(e)
}

function s(t, i) {
    for (var n = !0, e = 0; e < i.length; ++e) i[e].b || (n &= i[e].c(t));
    if (!n) return null;
    for (var r = t.d(), e = 0; e < i.length; ++e) t.e(r, i[e].b);
    return t.f(r), r
}! function(t) {
    function i(t, i, n) {
        this.g = t, this.h = i, this.i = n
    }

    function n(t) {
        return t * t * t * (t * (6 * t - 15) + 10)
    }

    function e(t, i, n) {
        return (1 - n) * t + n * i
    }
    var r = t.j = {};
    i.prototype.k = function(t, i) {
        return this.g * t + this.h * i
    }, i.prototype.l = function(t, i, n) {
        return this.g * t + this.h * i + this.i * n
    };
    var o = [new i(1, 1, 0), new i(-1, 1, 0), new i(1, -1, 0), new i(-1, -1, 0), new i(1, 0, 1), new i(-1, 0, 1), new i(1, 0, -1), new i(-1, 0, -1), new i(0, 1, 1), new i(0, -1, 1), new i(0, 1, -1), new i(0, -1, -1)],
        s = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180],
        h = new Array(512),
        a = new Array(512);
    r.m = function(t) {
        t > 0 && t < 1 && (t *= 65536), t = Math.floor(t), t < 256 && (t |= t << 8);
        for (var i = 0; i < 256; i++) {
            var n;
            n = 1 & i ? s[i] ^ 255 & t : s[i] ^ t >> 8 & 255, h[i] = h[i + 256] = n, a[i] = a[i + 256] = o[n % 12]
        }
    }, r.m(0);
    var u = .5 * (Math.sqrt(3) - 1),
        c = (3 - Math.sqrt(3)) / 6,
        f = 1 / 3,
        l = 1 / 6;
    r.n = function(t, i) {
        var n, e, r, o, s, f = (t + i) * u,
            l = Math.floor(t + f),
            p = Math.floor(i + f),
            v = (l + p) * c,
            y = t - l + v,
            d = i - p + v;
        y > d ? (o = 1, s = 0) : (o = 0, s = 1);
        var g = y - o + c,
            m = d - s + c,
            b = y - 1 + 2 * c,
            w = d - 1 + 2 * c;
        l &= 255, p &= 255;
        var x = a[l + h[p]],
            C = a[l + o + h[p + s]],
            M = a[l + 1 + h[p + 1]],
            F = .5 - y * y - d * d;
        F < 0 ? n = 0 : (F *= F, n = F * F * x.k(y, d));
        var z = .5 - g * g - m * m;
        z < 0 ? e = 0 : (z *= z, e = z * z * C.k(g, m));
        var I = .5 - b * b - w * w;
        return I < 0 ? r = 0 : (I *= I, r = I * I * M.k(b, w)), 70 * (n + e + r)
    }, r.o = function(t, i, n) {
        var e, r, o, s, u, c, p, v, y, d, g = (t + i + n) * f,
            m = Math.floor(t + g),
            b = Math.floor(i + g),
            w = Math.floor(n + g),
            x = (m + b + w) * l,
            C = t - m + x,
            M = i - b + x,
            F = n - w + x;
        C >= M ? M >= F ? (u = 1, c = 0, p = 0, v = 1, y = 1, d = 0) : C >= F ? (u = 1, c = 0, p = 0, v = 1, y = 0, d = 1) : (u = 0, c = 0, p = 1, v = 1, y = 0, d = 1) : M < F ? (u = 0, c = 0, p = 1, v = 0, y = 1, d = 1) : C < F ? (u = 0, c = 1, p = 0, v = 0, y = 1, d = 1) : (u = 0, c = 1, p = 0, v = 1, y = 1, d = 0);
        var z = C - u + l,
            I = M - c + l,
            j = F - p + l,
            T = C - v + 2 * l,
            K = M - y + 2 * l,
            U = F - d + 2 * l,
            O = C - 1 + 3 * l,
            W = M - 1 + 3 * l,
            _ = F - 1 + 3 * l;
        m &= 255, b &= 255, w &= 255;
        var A = a[m + h[b + h[w]]],
            D = a[m + u + h[b + c + h[w + p]]],
            S = a[m + v + h[b + y + h[w + d]]],
            L = a[m + 1 + h[b + 1 + h[w + 1]]],
            X = .6 - C * C - M * M - F * F;
        X < 0 ? e = 0 : (X *= X, e = X * X * A.l(C, M, F));
        var P = .6 - z * z - I * I - j * j;
        P < 0 ? r = 0 : (P *= P, r = P * P * D.l(z, I, j));
        var E = .6 - T * T - K * K - U * U;
        E < 0 ? o = 0 : (E *= E, o = E * E * S.l(T, K, U));
        var k = .6 - O * O - W * W - _ * _;
        return k < 0 ? s = 0 : (k *= k, s = k * k * L.l(O, W, _)), 32 * (e + r + o + s)
    }, r.p = function(t, i) {
        var r = Math.floor(t),
            o = Math.floor(i);
        t -= r, i -= o, r = 255 & r, o = 255 & o;
        var s = a[r + h[o]].k(t, i),
            u = a[r + h[o + 1]].k(t, i - 1),
            c = a[r + 1 + h[o]].k(t - 1, i),
            f = a[r + 1 + h[o + 1]].k(t - 1, i - 1),
            l = n(t);
        return e(e(s, c, l), e(u, f, l), n(i))
    }, r.q = function(t, i, r) {
        var o = Math.floor(t),
            s = Math.floor(i),
            u = Math.floor(r);
        t -= o, i -= s, r -= u, o = 255 & o, s = 255 & s, u = 255 & u;
        var c = a[o + h[s + h[u]]].l(t, i, r),
            f = a[o + h[s + h[u + 1]]].l(t, i, r - 1),
            l = a[o + h[s + 1 + h[u]]].l(t, i - 1, r),
            p = a[o + h[s + 1 + h[u + 1]]].l(t, i - 1, r - 1),
            v = a[o + 1 + h[s + h[u]]].l(t - 1, i, r),
            y = a[o + 1 + h[s + h[u + 1]]].l(t - 1, i, r - 1),
            d = a[o + 1 + h[s + 1 + h[u]]].l(t - 1, i - 1, r),
            g = a[o + 1 + h[s + 1 + h[u + 1]]].l(t - 1, i - 1, r - 1),
            m = n(t),
            b = n(i),
            w = n(r);
        return e(e(e(c, v, m), e(f, y, m), w), e(e(l, d, m), e(p, g, m), w), b)
    }
}(this), ! function(t, i) {
    "use strict";
    "object" == typeof module && "object" == typeof module.r ? module.r = t.s ? i(t, !0) : function(t) {
        if (!t.s) throw new Error("jQuery requires a window with a document");
        return i(t)
    } : i(t)
}("undefined" != typeof window ? window : this, function(t, i) {
    "use strict";

    function n(t, i) {
        i = i || it;
        var n = i.t("script");
        n.u = t, i.y.x(n).w.v(n)
    }

    function e(t) {
        var i = !!t && "length" in t && t.length,
            n = vt.z(t);
        return "function" !== n && !vt.A(t) && ("array" === n || 0 === i || "number" == typeof i && i > 0 && i - 1 in t)
    }

    function r(t, i, n) {
        return vt.B(i) ? vt.C(t, function(t, e) {
            return !!i.call(t, e, t) !== n
        }) : i.D ? vt.C(t, function(t) {
            return t === i !== n
        }) : "string" != typeof i ? vt.C(t, function(t) {
            return st.call(i, t) > -1 !== n
        }) : Ft.test(i) ? vt.filter(i, t, n) : (i = vt.filter(i, t), vt.C(t, function(t) {
            return st.call(i, t) > -1 !== n && 1 === t.D
        }))
    }

    function o(t, i) {
        for (;
            (t = t[i]) && 1 !== t.D;);
        return t
    }

    function s(t) {
        var i = {};
        return vt.F(t.match(Ut) || [], function(t, n) {
            i[n] = !0
        }), i
    }

    function h(t) {
        return t
    }

    function a(t) {
        throw t
    }

    function u(t, i, n) {
        var e;
        try {
            t && vt.B(e = t.G) ? e.call(t).I(i).H(n) : t && vt.B(e = t.J) ? e.call(t, i, n) : i.call(void 0, t)
        } catch (t) {
            n.call(void 0, t)
        }
    }

    function c() {
        it.K("DOMContentLoaded", c), t.K("load", c), vt.L()
    }

    function f() {
        this.M = vt.M + f.N++
    }

    function l(t) {
        return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : Lt.test(t) ? JSON.parse(t) : t)
    }

    function p(t, i, n) {
        var e;
        if (void 0 === n && 1 === t.D)
            if (e = "data-" + i.replace(Xt, "-$&").toLowerCase(), n = t.O(e), "string" == typeof n) {
                try {
                    n = l(n)
                } catch (t) {}
                St.P(t, i, n)
            } else n = void 0;
        return n
    }

    function v(t, i, n, e) {
        var r, o = 1,
            s = 20,
            h = e ? function() {
                return e.Q()
            } : function() {
                return vt.R(t, i, "")
            },
            a = h(),
            u = n && n[3] || (vt.S[i] ? "" : "px"),
            c = (vt.S[i] || "px" !== u && +a) && Et.exec(vt.R(t, i));
        if (c && c[3] !== u) {
            u = u || c[3], n = n || [], c = +a || 1;
            do o = o || ".5", c /= o, vt.T(t, i, c + u); while (o !== (o = h() / a) && 1 !== o && --s)
        }
        return n && (c = +c || +a || 0, r = n[1] ? c + (n[1] + 1) * n[2] : +n[2], e && (e.U = u, e.V = c, e.W = r)), r
    }

    function y(t) {
        var i, n = t.X,
            e = t.Y,
            r = Rt[e];
        return r ? r : (i = n.Z.x(n.t(e)), r = vt.R(i, "display"), i.w.v(i), "none" === r && (r = "block"), Rt[e] = r, r)
    }

    function d(t, i) {
        for (var n, e, r = [], o = 0, s = t.length; o < s; o++) e = t[o], e.T && (n = e.T.$, i ? ("none" === n && (r[o] = Dt._(e, "display") || null, r[o] || (e.T.$ = "")), "" === e.T.$ && Yt(e) && (r[o] = y(e))) : "none" !== n && (r[o] = "none", Dt.P(e, "display", n)));
        for (o = 0; o < s; o++) null != r[o] && (t[o].T.$ = r[o]);
        return t
    }

    function g(t, i) {
        var n;
        return n = "undefined" != typeof t.aa ? t.aa(i || "*") : "undefined" != typeof t.ba ? t.ba(i || "*") : [], void 0 === i || i && vt.Y(t, i) ? vt.ca([t], n) : n
    }

    function m(t, i) {
        for (var n = 0, e = t.length; n < e; n++) Dt.P(t[n], "globalEval", !i || Dt._(i[n], "globalEval"))
    }

    function b(t, i, n, e, r) {
        for (var o, s, h, a, u, c, f = i.da(), l = [], p = 0, v = t.length; p < v; p++)
            if (o = t[p], o || 0 === o)
                if ("object" === vt.z(o)) vt.ca(l, o.D ? [o] : o);
                else if (Qt.test(o)) {
            for (s = s || f.x(i.t("div")), h = (Bt.exec(o) || ["", ""])[1].toLowerCase(), a = Gt[h] || Gt.ea, s.fa = a[1] + vt.ga(o) + a[2], c = a[0]; c--;) s = s.ha;
            vt.ca(l, s.ia), s = f.ja, s.ka = ""
        } else l.push(i.la(o));
        for (f.ka = "", p = 0; o = l[p++];)
            if (e && vt.ma(o, e) > -1) r && r.push(o);
            else if (u = vt.na(o.X, o), s = g(f.x(o), "script"), u && m(s), n)
            for (c = 0; o = s[c++];) Ht.test(o.z || "") && n.push(o);
        return f
    }

    function w() {
        return !0
    }

    function x() {
        return !1
    }

    function C() {
        try {
            return it.oa
        } catch (t) {}
    }

    function M(t, i, n, e, r, o) {
        var s, h;
        if ("object" == typeof i) {
            "string" != typeof n && (e = e || n, n = void 0);
            for (h in i) M(t, h, n, e, i[h], o);
            return t
        }
        if (null == e && null == r ? (r = n, e = n = void 0) : null == r && ("string" == typeof n ? (r = e, e = void 0) : (r = e, e = n, n = void 0)), r === !1) r = x;
        else if (!r) return t;
        return 1 === o && (s = r, r = function(t) {
            return vt().pa(t), s.apply(this, arguments)
        }, r.qa = s.qa || (s.qa = vt.qa++)), t.F(function() {
            vt.sa.ra(this, i, r, e, n)
        })
    }

    function F(t, i) {
        return vt.Y(t, "table") && vt.Y(11 !== i.D ? i : i.ja, "tr") ? t.aa("tbody")[0] || t : t
    }

    function z(t) {
        return t.z = (null !== t.O("type")) + "/" + t.z, t
    }

    function I(t) {
        var i = ei.exec(t.z);
        return i ? t.z = i[1] : t.ta("type"), t
    }

    function j(t, i) {
        var n, e, r, o, s, h, a, u;
        if (1 === i.D) {
            if (Dt.ua(t) && (o = Dt.va(t), s = Dt.P(i, o), u = o.wa)) {
                delete s.xa, s.wa = {};
                for (r in u)
                    for (n = 0, e = u[r].length; n < e; n++) vt.sa.ra(i, r, u[r][n])
            }
            St.ua(t) && (h = St.va(t), a = vt.ya({}, h), St.P(i, a))
        }
    }

    function T(t, i) {
        var n = i.Y.toLowerCase();
        "input" === n && Nt.test(t.z) ? i.za = t.za : "input" !== n && "textarea" !== n || (i.Aa = t.Aa)
    }

    function K(t, i, e, r) {
        i = rt.apply([], i);
        var o, s, h, a, u, c, f = 0,
            l = t.length,
            p = l - 1,
            v = i[0],
            y = vt.B(v);
        if (y || l > 1 && "string" == typeof v && !lt.Ba && ni.test(v)) return t.F(function(n) {
            var o = t.Ca(n);
            y && (i[0] = v.call(this, n, o.Da())), K(o, i, e, r)
        });
        if (l && (o = b(i, t[0].X, !1, t, r), s = o.ja, 1 === o.ia.length && (o = s), s || r)) {
            for (h = vt.map(g(o, "script"), z), a = h.length; f < l; f++) u = o, f !== p && (u = vt.Ea(u, !0, !0), a && vt.ca(h, g(u, "script"))), e.call(t[f], u, f);
            if (a)
                for (c = h[h.length - 1].X, vt.map(h, I), f = 0; f < a; f++) u = h[f], Ht.test(u.z || "") && !Dt.va(u, "globalEval") && vt.na(c, u) && (u.Fa ? vt.Ga && vt.Ga(u.Fa) : n(u.ka.replace(ri, ""), c))
        }
        return t
    }

    function U(t, i, n) {
        for (var e, r = i ? vt.filter(i, t) : t, o = 0; null != (e = r[o]); o++) n || 1 !== e.D || vt.Ha(g(e)), e.w && (n && vt.na(e.X, e) && m(g(e, "script")), e.w.v(e));
        return t
    }

    function O(t, i, n) {
        var e, r, o, s, h = t.T;
        return n = n || hi(t), n && (s = n.Ia(i) || n[i], "" !== s || vt.na(t.X, t) || (s = vt.T(t, i)), !lt.Ja() && si.test(s) && oi.test(i) && (e = h.Ka, r = h.La, o = h.Ma, h.La = h.Ma = h.Ka = s, s = n.Ka, h.Ka = e, h.La = r, h.Ma = o)), void 0 !== s ? s + "" : s
    }

    function W(t, i) {
        return {
            _: function() {
                return t() ? void delete this._ : (this._ = i).apply(this, arguments)
            }
        }
    }

    function _(t) {
        if (t in li) return t;
        for (var i = t[0].toUpperCase() + t.slice(1), n = fi.length; n--;)
            if (t = fi[n] + i, t in li) return t
    }

    function A(t, i, n) {
        var e = Et.exec(i);
        return e ? Math.max(0, e[2] - (n || 0)) + (e[3] || "px") : i
    }

    function D(t, i, n, e, r) {
        var o, s = 0;
        for (o = n === (e ? "border" : "content") ? 4 : "width" === i ? 1 : 0; o < 4; o += 2) "margin" === n && (s += vt.R(t, n + kt[o], !0, r)), e ? ("content" === n && (s -= vt.R(t, "padding" + kt[o], !0, r)), "margin" !== n && (s -= vt.R(t, "border" + kt[o] + "Width", !0, r))) : (s += vt.R(t, "padding" + kt[o], !0, r), "padding" !== n && (s += vt.R(t, "border" + kt[o] + "Width", !0, r)));
        return s
    }

    function S(t, i, n) {
        var e, r = !0,
            o = hi(t),
            s = "border-box" === vt.R(t, "boxSizing", !1, o);
        if (t.Na().length && (e = t.Oa()[i]), e <= 0 || null == e) {
            if (e = O(t, i, o), (e < 0 || null == e) && (e = t.T[i]), si.test(e)) return e;
            r = s && (lt.Pa() || e === t.T[i]), e = parseFloat(e) || 0
        }
        return e + D(t, i, n || (s ? "border" : "content"), r, o) + "px"
    }

    function L(t, i, n, e, r) {
        return new L.prototype.Qa(t, i, n, e, r)
    }

    function X() {
        vi && (t.a(X), vt.Sa.Ra())
    }

    function P() {
        return t.Ta(function() {
            pi = void 0
        }), pi = vt.now()
    }

    function E(t, i) {
        var n, e = 0,
            r = {
                Ua: t
            };
        for (i = i ? 1 : 0; e < 4; e += 2 - i) n = kt[e], r["margin" + n] = r["padding" + n] = t;
        return i && (r.Va = r.Ka = t), r
    }

    function k(t, i, n) {
        for (var e, r = (R.Wa[i] || []).concat(R.Wa["Xa"]), o = 0, s = r.length; o < s; o++)
            if (e = r[o].call(n, i, t)) return e
    }

    function Y(t, i, n) {
        var e, r, o, s, h, a, u, c, f = "width" in i || "height" in i,
            l = this,
            p = {},
            v = t.T,
            y = t.D && Yt(t),
            g = Dt._(t, "fxshow");
        n.Ya || (s = vt.Za(t, "fx"), null == s.$a && (s.$a = 0, h = s.ab._a, s.ab._a = function() {
            s.$a || h()
        }), s.$a++, l.bb(function() {
            l.bb(function() {
                s.$a--, vt.Ya(t, "fx").length || s.ab._a()
            })
        }));
        for (e in i)
            if (r = i[e], yi.test(r)) {
                if (delete i[e], o = o || "toggle" === r, r === (y ? "hide" : "show")) {
                    if ("show" !== r || !g || void 0 === g[e]) continue;
                    y = !0
                }
                p[e] = g && g[e] || vt.T(t, e)
            }
        if (a = !vt.cb(i), a || !vt.cb(p)) {
            f && 1 === t.D && (n.db = [v.db, v.eb, v.fb], u = g && g.$, null == u && (u = Dt._(t, "display")), c = vt.R(t, "display"), "none" === c && (u ? c = u : (d([t], !0), u = t.T.$ || u, c = vt.R(t, "display"), d([t]))), ("inline" === c || "inline-block" === c && null != u) && "none" === vt.R(t, "float") && (a || (l.I(function() {
                v.$ = u
            }), null == u && (c = v.$, u = "none" === c ? "" : c)), v.$ = "inline-block")), n.db && (v.db = "hidden", l.bb(function() {
                v.db = n.db[0], v.eb = n.db[1], v.fb = n.db[2]
            })), a = !1;
            for (e in p) a || (g ? "hidden" in g && (y = g.gb) : g = Dt.va(t, "fxshow", {
                $: u
            }), o && (g.gb = !y), y && d([t], !0), l.I(function() {
                y || d([t]), Dt.hb(t, "fxshow");
                for (e in p) vt.T(t, e, p[e])
            })), a = k(y ? g[e] : 0, e, l), e in g || (g[e] = a.V, y && (a.W = a.V, a.V = 0))
        }
    }

    function V(t, i) {
        var n, e, r, o, s;
        for (n in t)
            if (e = vt.ib(n), r = i[e], o = t[n], vt.isArray(o) && (r = o[1], o = t[n] = o[0]), n !== e && (t[e] = o, delete t[n]), s = vt.jb[e], s && "expand" in s) {
                o = s.kb(o), delete t[e];
                for (n in o) n in t || (t[n] = o[n], i[n] = r)
            } else i[e] = r
    }

    function R(t, i, n) {
        var e, r, o = 0,
            s = R.lb.length,
            h = vt.mb().bb(function() {
                delete a.nb
            }),
            a = function() {
                if (r) return !1;
                for (var i = pi || P(), n = Math.max(0, u.ob + u.pb - i), e = n / u.pb || 0, o = 1 - e, s = 0, a = u.qb.length; s < a; s++) u.qb[s].rb(o);
                return h.sb(t, [u, o, n]), o < 1 && a ? n : (h.tb(t, [u]), !1)
            },
            u = h.G({
                nb: t,
                ub: vt.ya({}, i),
                vb: vt.ya(!0, {
                    wb: {},
                    xb: vt.xb.ea
                }, n),
                yb: i,
                zb: n,
                ob: pi || P(),
                pb: n.pb,
                qb: [],
                Ab: function(i, n) {
                    var e = vt.Bb(t, u.vb, i, n, u.vb.wb[i] || u.vb.xb);
                    return u.qb.push(e), e
                },
                Cb: function(i) {
                    var n = 0,
                        e = i ? u.qb.length : 0;
                    if (r) return this;
                    for (r = !0; n < e; n++) u.qb[n].rb(1);
                    return i ? (h.sb(t, [u, 1, 0]), h.tb(t, [u, i])) : h.Db(t, [u, i]), this
                }
            }),
            c = u.ub;
        for (V(c, u.vb.wb); o < s; o++)
            if (e = R.lb[o].call(u, t, c, u.vb)) return vt.B(e.Cb) && (vt.Za(u.nb, u.vb.Ya).Cb = vt.Eb(e.Cb, e)), e;
        return vt.map(c, k, u), vt.B(u.vb.V) && u.vb.V.call(t, u), vt.Sa.Fb(vt.ya(a, {
            nb: t,
            Gb: u,
            Ya: u.vb.Ya
        })), u.Hb(u.vb.Hb).I(u.vb.I, u.vb.Ib).H(u.vb.H).bb(u.vb.bb)
    }

    function N(t) {
        var i = t.match(Ut) || [];
        return i.join(" ")
    }

    function B(t) {
        return t.O && t.O("class") || ""
    }

    function H(t, i, n, e) {
        var r;
        if (vt.isArray(i)) vt.F(i, function(i, r) {
            n || Ii.test(t) ? e(t, r) : H(t + "[" + ("object" == typeof r && null != r ? i : "") + "]", r, n, e)
        });
        else if (n || "object" !== vt.z(i)) e(t, i);
        else
            for (r in i) H(t + "[" + r + "]", i[r], n, e)
    }

    function G(t) {
        return function(i, n) {
            "string" != typeof i && (n = i, i = "*");
            var e, r = 0,
                o = i.toLowerCase().match(Ut) || [];
            if (vt.B(n))
                for (; e = o[r++];) "+" === e[0] ? (e = e.slice(1) || "*", (t[e] = t[e] || []).unshift(n)) : (t[e] = t[e] || []).push(n)
        }
    }

    function Q(t, i, n, e) {
        function r(h) {
            var a;
            return o[h] = !0, vt.F(t[h] || [], function(t, h) {
                var u = h(i, n, e);
                return "string" != typeof u || s || o[u] ? s ? !(a = u) : void 0 : (i.Jb.unshift(u), r(u), !1)
            }), a
        }
        var o = {},
            s = t === Xi;
        return r(i.Jb[0]) || !o["Xa"] && r("*")
    }

    function $(t, i) {
        var n, e, r = vt.Lb.Kb || {};
        for (n in i) void 0 !== i[n] && ((r[n] ? t : e || (e = {}))[n] = i[n]);
        return e && vt.ya(!0, t, e), t
    }

    function Z(t, i, n) {
        for (var e, r, o, s, h = t.Mb, a = t.Jb;
            "*" === a[0];) a.shift(), void 0 === e && (e = t.Nb || i.Ob("Content-Type"));
        if (e)
            for (r in h)
                if (h[r] && h[r].test(e)) {
                    a.unshift(r);
                    break
                }
        if (a[0] in n) o = a[0];
        else {
            for (r in n) {
                if (!a[0] || t.Pb[r + " " + a[0]]) {
                    o = r;
                    break
                }
                s || (s = r)
            }
            o = o || s
        }
        if (o) return o !== a[0] && a.unshift(o), n[o]
    }

    function q(t, i, n, e) {
        var r, o, s, h, a, u = {},
            c = t.Jb.slice();
        if (c[1])
            for (s in t.Pb) u[s.toLowerCase()] = t.Pb[s];
        for (o = c.shift(); o;)
            if (t.Qb[o] && (n[t.Qb[o]] = i), !a && e && t.Rb && (i = t.Rb(i, t.Sb)), a = o, o = c.shift())
                if ("*" === o) o = a;
                else if ("*" !== a && a !== o) {
            if (s = u[a + " " + o] || u["* " + o], !s)
                for (r in u)
                    if (h = r.split(" "), h[1] === o && (s = u[a + " " + h[0]] || u["* " + h[0]])) {
                        s === !0 ? s = u[r] : u[r] !== !0 && (o = h[0], c.unshift(h[1]));
                        break
                    }
            if (s !== !0)
                if (s && t.Tb) i = s(i);
                else try {
                    i = s(i)
                } catch (t) {
                    return {
                        Ub: "parsererror",
                        Vb: s ? t : "No conversion from " + a + " to " + o
                    }
                }
        }
        return {
            Ub: "success",
            Wb: i
        }
    }

    function J(t) {
        return vt.A(t) ? t : 9 === t.D && t.Xb
    }
    var tt = [],
        it = t.s,
        nt = Object.getPrototypeOf,
        et = tt.slice,
        rt = tt.concat,
        ot = tt.push,
        st = tt.indexOf,
        ht = {},
        at = ht.toString,
        ut = ht.hasOwnProperty,
        ct = ut.toString,
        ft = ct.call(Object),
        lt = {},
        pt = "3.1.1",
        vt = function(t, i) {
            return new vt.Yb.Qa(t, i)
        },
        yt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        dt = /^-ms-/,
        gt = /-([a-z])/g,
        mt = function(t, i) {
            return i.toUpperCase()
        };
    vt.Yb = vt.prototype = {
        Zb: pt,
        constructor: vt,
        length: 0,
        $b: function() {
            return et.call(this)
        },
        _: function(t) {
            return null == t ? et.call(this) : t < 0 ? this[t + this.length] : this[t]
        },
        _b: function(t) {
            var i = vt.ca(this.constructor(), t);
            return i.ac = this, i
        },
        F: function(t) {
            return vt.F(this, t)
        },
        map: function(t) {
            return this._b(vt.map(this, function(i, n) {
                return t.call(i, n, i)
            }))
        },
        slice: function() {
            return this._b(et.apply(this, arguments))
        },
        bc: function() {
            return this.Ca(0)
        },
        cc: function() {
            return this.Ca(-1)
        },
        Ca: function(t) {
            var i = this.length,
                n = +t + (t < 0 ? i : 0);
            return this._b(n >= 0 && n < i ? [this[n]] : [])
        },
        W: function() {
            return this.ac || this.constructor()
        },
        push: ot,
        sort: tt.sort,
        splice: tt.splice
    }, vt.ya = vt.Yb.ya = function() {
        var t, i, n, e, r, o, s = arguments[0] || {},
            h = 1,
            a = arguments.length,
            u = !1;
        for ("boolean" == typeof s && (u = s, s = arguments[h] || {}, h++), "object" == typeof s || vt.B(s) || (s = {}), h === a && (s = this, h--); h < a; h++)
            if (null != (t = arguments[h]))
                for (i in t) n = s[i], e = t[i], s !== e && (u && e && (vt.dc(e) || (r = vt.isArray(e))) ? (r ? (r = !1, o = n && vt.isArray(n) ? n : []) : o = n && vt.dc(n) ? n : {}, s[i] = vt.ya(u, o, e)) : void 0 !== e && (s[i] = e));
        return s
    }, vt.ya({
        M: "jQuery" + (pt + Math.random()).replace(/\D/g, ""),
        ec: !0,
        Vb: function(t) {
            throw new Error(t)
        },
        fc: function() {},
        B: function(t) {
            return "function" === vt.z(t)
        },
        isArray: Array.isArray,
        A: function(t) {
            return null != t && t === t.gc
        },
        hc: function(t) {
            var i = vt.z(t);
            return ("number" === i || "string" === i) && !isNaN(t - parseFloat(t))
        },
        dc: function(t) {
            var i, n;
            return !(!t || "[object Object]" !== at.call(t) || (i = nt(t)) && (n = ut.call(i, "constructor") && i.constructor, "function" != typeof n || ct.call(n) !== ft))
        },
        cb: function(t) {
            var i;
            for (i in t) return !1;
            return !0
        },
        z: function(t) {
            return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? ht[at.call(t)] || "object" : typeof t
        },
        ic: function(t) {
            n(t)
        },
        ib: function(t) {
            return t.replace(dt, "ms-").replace(gt, mt)
        },
        Y: function(t, i) {
            return t.Y && t.Y.toLowerCase() === i.toLowerCase()
        },
        F: function(t, i) {
            var n, r = 0;
            if (e(t))
                for (n = t.length; r < n && i.call(t[r], r, t[r]) !== !1; r++);
            else
                for (r in t)
                    if (i.call(t[r], r, t[r]) === !1) break; return t
        },
        trim: function(t) {
            return null == t ? "" : (t + "").replace(yt, "")
        },
        jc: function(t, i) {
            var n = i || [];
            return null != t && (e(Object(t)) ? vt.ca(n, "string" == typeof t ? [t] : t) : ot.call(n, t)), n
        },
        ma: function(t, i, n) {
            return null == i ? -1 : st.call(i, t, n)
        },
        ca: function(t, i) {
            for (var n = +i.length, e = 0, r = t.length; e < n; e++) t[r++] = i[e];
            return t.length = r, t
        },
        C: function(t, i, n) {
            for (var e, r = [], o = 0, s = t.length, h = !n; o < s; o++) e = !i(t[o], o), e !== h && r.push(t[o]);
            return r
        },
        map: function(t, i, n) {
            var r, o, s = 0,
                h = [];
            if (e(t))
                for (r = t.length; s < r; s++) o = i(t[s], s, n), null != o && h.push(o);
            else
                for (s in t) o = i(t[s], s, n), null != o && h.push(o);
            return rt.apply([], h)
        },
        qa: 1,
        Eb: function(t, i) {
            var n, e, r;
            if ("string" == typeof i && (n = t[i], i = t, t = n), vt.B(t)) return e = et.call(arguments, 2), r = function() {
                return t.apply(i || this, e.concat(et.call(arguments)))
            }, r.qa = t.qa = t.qa || vt.qa++, r
        },
        now: Date.now,
        kc: lt
    }), "function" == typeof Symbol && (vt.Yb[Symbol.lc] = tt[Symbol.lc]), vt.F("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, i) {
        ht["[object " + i + "]"] = i.toLowerCase()
    });
    var bt = function(t) {
        function i(t, i, n, e) {
            var r, o, s, h, a, u, c, l = i && i.X,
                v = i ? i.D : 9;
            if (n = n || [], "string" != typeof t || !t || 1 !== v && 9 !== v && 11 !== v) return n;
            if (!e && ((i ? i.X || i : k) !== _ && W(i), i = i || _, D)) {
                if (11 !== v && (a = gt.exec(t)))
                    if (r = a[1]) {
                        if (9 === v) {
                            if (!(s = i.mc(r))) return n;
                            if (s.nc === r) return n.push(s), n
                        } else if (l && (s = l.mc(r)) && P(i, s) && s.nc === r) return n.push(s), n
                    } else {
                        if (a[2]) return q.apply(n, i.aa(t)), n;
                        if ((r = a[3]) && C.oc && i.oc) return q.apply(n, i.oc(r)), n
                    }
                if (C.pc && !B[t + " "] && (!S || !S.test(t))) {
                    if (1 !== v) l = i, c = t;
                    else if ("object" !== i.Y.toLowerCase()) {
                        for ((h = i.O("id")) ? h = h.replace(xt, Ct) : i.qc("id", h = E), u = I(t), o = u.length; o--;) u[o] = "#" + h + " " + p(u[o]);
                        c = u.join(","), l = mt.test(t) && f(i.w) || i
                    }
                    if (c) try {
                        return q.apply(n, l.ba(c)), n
                    } catch (t) {} finally {
                        h === E && i.ta("id")
                    }
                }
            }
            return T(t.replace(ht, "$1"), i, n, e)
        }

        function n() {
            function t(n, e) {
                return i.push(n + " ") > M.rc && delete t[i.shift()], t[n + " "] = e
            }
            var i = [];
            return t
        }

        function e(t) {
            return t[E] = !0, t
        }

        function r(t) {
            var i = _.t("fieldset");
            try {
                return !!t(i)
            } catch (t) {
                return !1
            } finally {
                i.w && i.w.v(i), i = null
            }
        }

        function o(t, i) {
            for (var n = t.split("|"), e = n.length; e--;) M.sc[n[e]] = i
        }

        function s(t, i) {
            var n = i && t,
                e = n && 1 === t.D && 1 === i.D && t.tc - i.tc;
            if (e) return e;
            if (n)
                for (; n = n.uc;)
                    if (n === i) return -1;
            return t ? 1 : -1
        }

        function h(t) {
            return function(i) {
                var n = i.Y.toLowerCase();
                return "input" === n && i.z === t
            }
        }

        function a(t) {
            return function(i) {
                var n = i.Y.toLowerCase();
                return ("input" === n || "button" === n) && i.z === t
            }
        }

        function u(t) {
            return function(i) {
                return "form" in i ? i.w && i.vc === !1 ? "label" in i ? "label" in i.w ? i.w.vc === t : i.vc === t : i.wc === t || i.wc !== !t && Ft(i) === t : i.vc === t : "label" in i && i.vc === t
            }
        }

        function c(t) {
            return e(function(i) {
                return i = +i, e(function(n, e) {
                    for (var r, o = t([], n.length, i), s = o.length; s--;) n[r = o[s]] && (n[r] = !(e[r] = n[r]))
                })
            })
        }

        function f(t) {
            return t && "undefined" != typeof t.aa && t
        }

        function l() {}

        function p(t) {
            for (var i = 0, n = t.length, e = ""; i < n; i++) e += t[i].xc;
            return e
        }

        function v(t, i, n) {
            var e = i.yc,
                r = i.zc,
                o = r || e,
                s = n && "parentNode" === o,
                h = V++;
            return i.bc ? function(i, n, r) {
                for (; i = i[e];)
                    if (1 === i.D || s) return t(i, n, r);
                return !1
            } : function(i, n, a) {
                var u, c, f, l = [Y, h];
                if (a) {
                    for (; i = i[e];)
                        if ((1 === i.D || s) && t(i, n, a)) return !0
                } else
                    for (; i = i[e];)
                        if (1 === i.D || s)
                            if (f = i[E] || (i[E] = {}), c = f[i.Ac] || (f[i.Ac] = {}), r && r === i.Y.toLowerCase()) i = i[e] || i;
                            else {
                                if ((u = c[o]) && u[0] === Y && u[1] === h) return l[2] = u[2];
                                if (c[o] = l, l[2] = t(i, n, a)) return !0
                            } return !1
            }
        }

        function y(t) {
            return t.length > 1 ? function(i, n, e) {
                for (var r = t.length; r--;)
                    if (!t[r](i, n, e)) return !1;
                return !0
            } : t[0]
        }

        function d(t, n, e) {
            for (var r = 0, o = n.length; r < o; r++) i(t, n[r], e);
            return e
        }

        function g(t, i, n, e, r) {
            for (var o, s = [], h = 0, a = t.length, u = null != i; h < a; h++)(o = t[h]) && (n && !n(o, e, r) || (s.push(o), u && i.push(h)));
            return s
        }

        function m(t, i, n, r, o, s) {
            return r && !r[E] && (r = m(r)), o && !o[E] && (o = m(o, s)), e(function(e, s, h, a) {
                var u, c, f, l = [],
                    p = [],
                    v = s.length,
                    y = e || d(i || "*", h.D ? [h] : h, []),
                    m = !t || !e && i ? y : g(y, l, t, h, a),
                    b = n ? o || (e ? t : v || r) ? [] : s : m;
                if (n && n(m, b, h, a), r)
                    for (u = g(b, p), r(u, [], h, a), c = u.length; c--;)(f = u[c]) && (b[p[c]] = !(m[p[c]] = f));
                if (e) {
                    if (o || t) {
                        if (o) {
                            for (u = [], c = b.length; c--;)(f = b[c]) && u.push(m[c] = f);
                            o(null, b = [], u, a)
                        }
                        for (c = b.length; c--;)(f = b[c]) && (u = o ? tt(e, f) : l[c]) > -1 && (e[u] = !(s[u] = f))
                    }
                } else b = g(b === s ? b.splice(v, b.length) : b), o ? o(null, s, b, a) : q.apply(s, b)
            })
        }

        function b(t) {
            for (var i, n, e, r = t.length, o = M.Bc[t[0].z], s = o || M.Bc["Cc"], h = o ? 1 : 0, a = v(function(t) {
                    return t === i
                }, s, !0), u = v(function(t) {
                    return tt(i, t) > -1
                }, s, !0), c = [function(t, n, e) {
                    var r = !o && (e || n !== K) || ((i = n).D ? a(t, n, e) : u(t, n, e));
                    return i = null, r
                }]; h < r; h++)
                if (n = M.Bc[t[h].z]) c = [v(y(c), n)];
                else {
                    if (n = M.filter[t[h].z].apply(null, t[h].Dc), n[E]) {
                        for (e = ++h; e < r && !M.Bc[t[e].z]; e++);
                        return m(h > 1 && y(c), h > 1 && p(t.slice(0, h - 1).concat({
                            xc: " " === t[h - 2].z ? "*" : ""
                        })).replace(ht, "$1"), n, h < e && b(t.slice(h, e)), e < r && b(t = t.slice(e)), e < r && p(t))
                    }
                    c.push(n)
                }
            return y(c)
        }

        function w(t, n) {
            var r = n.length > 0,
                o = t.length > 0,
                s = function(e, s, h, a, u) {
                    var c, f, l, p = 0,
                        v = "0",
                        y = e && [],
                        d = [],
                        m = K,
                        b = e || o && M.Fc.Ec("*", u),
                        w = Y += null == m ? 1 : Math.random() || .1,
                        x = b.length;
                    for (u && (K = s === _ || s || u); v !== x && null != (c = b[v]); v++) {
                        if (o && c) {
                            for (f = 0, s || c.X === _ || (W(c), h = !D); l = t[f++];)
                                if (l(c, s || _, h)) {
                                    a.push(c);
                                    break
                                }
                            u && (Y = w)
                        }
                        r && ((c = !l && c) && p--, e && y.push(c))
                    }
                    if (p += v, r && v !== p) {
                        for (f = 0; l = n[f++];) l(y, d, s, h);
                        if (e) {
                            if (p > 0)
                                for (; v--;) y[v] || d[v] || (d[v] = $.call(a));
                            d = g(d)
                        }
                        q.apply(a, d), u && !e && d.length > 0 && p + n.length > 1 && i.Gc(a)
                    }
                    return u && (Y = w, K = m), y
                };
            return r ? e(s) : s
        }
        var x, C, M, F, z, I, j, T, K, U, O, W, _, A, D, S, L, X, P, E = "sizzle" + 1 * new Date,
            k = t.s,
            Y = 0,
            V = 0,
            R = n(),
            N = n(),
            B = n(),
            H = function(t, i) {
                return t === i && (O = !0), 0
            },
            G = {}.hasOwnProperty,
            Q = [],
            $ = Q.pop,
            Z = Q.push,
            q = Q.push,
            J = Q.slice,
            tt = function(t, i) {
                for (var n = 0, e = t.length; n < e; n++)
                    if (t[n] === i) return n;
                return -1
            },
            it = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            nt = "[\\x20\\t\\r\\n\\f]",
            et = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            rt = "\\[" + nt + "*(" + et + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + et + "))|)" + nt + "*\\]",
            ot = ":(" + et + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + rt + ")*)|.*)\\)|)",
            st = new RegExp(nt + "+", "g"),
            ht = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
            at = new RegExp("^" + nt + "*," + nt + "*"),
            ut = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
            ct = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"),
            ft = new RegExp(ot),
            lt = new RegExp("^" + et + "$"),
            pt = {
                Hc: new RegExp("^#(" + et + ")"),
                Ic: new RegExp("^\\.(" + et + ")"),
                Ec: new RegExp("^(" + et + "|[*])"),
                Jc: new RegExp("^" + rt),
                Kc: new RegExp("^" + ot),
                Lc: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                Mc: new RegExp("^(?:" + it + ")$", "i"),
                Nc: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
            },
            vt = /^(?:input|select|textarea|button)$/i,
            yt = /^h\d$/i,
            dt = /^[^{]+\{\s*\[native \w/,
            gt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            mt = /[+~]/,
            bt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"),
            wt = function(t, i, n) {
                var e = "0x" + i - 65536;
                return e !== e || n ? i : e < 0 ? String.fromCharCode(e + 65536) : String.fromCharCode(e >> 10 | 55296, 1023 & e | 56320)
            },
            xt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            Ct = function(t, i) {
                return i ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
            },
            Mt = function() {
                W()
            },
            Ft = v(function(t) {
                return t.vc === !0 && ("form" in t || "label" in t)
            }, {
                yc: "parentNode",
                zc: "legend"
            });
        try {
            q.apply(Q = J.call(k.ia), k.ia), Q[k.ia.length].D
        } catch (t) {
            q = {
                apply: Q.length ? function(t, i) {
                    Z.apply(t, J.call(i))
                } : function(t, i) {
                    for (var n = t.length, e = 0; t[n++] = i[e++];);
                    t.length = n - 1
                }
            }
        }
        C = i.kc = {}, z = i.Oc = function(t) {
            var i = t && (t.X || t).Pc;
            return !!i && "HTML" !== i.Y
        }, W = i.Qc = function(t) {
            var i, n, e = t ? t.X || t : k;
            return e !== _ && 9 === e.D && e.Pc ? (_ = e, A = _.Pc, D = !z(_), k !== _ && (n = _.Xb) && n.Rc !== n && (n.Sc ? n.Sc("unload", Mt, !1) : n.Tc && n.Tc("onunload", Mt)), C.Uc = r(function(t) {
                return t.Vc = "i", !t.O("className")
            }), C.aa = r(function(t) {
                return t.x(_.Wc("")), !t.aa("*").length
            }), C.oc = dt.test(_.oc), C.Xc = r(function(t) {
                return A.x(t).nc = E, !_.Yc || !_.Yc(E).length
            }), C.Xc ? (M.filter.Hc = function(t) {
                var i = t.replace(bt, wt);
                return function(t) {
                    return t.O("id") === i
                }
            }, M.Fc.Hc = function(t, i) {
                if ("undefined" != typeof i.mc && D) {
                    var n = i.mc(t);
                    return n ? [n] : []
                }
            }) : (M.filter.Hc = function(t) {
                var i = t.replace(bt, wt);
                return function(t) {
                    var n = "undefined" != typeof t.Zc && t.Zc("id");
                    return n && n.xc === i
                }
            }, M.Fc.Hc = function(t, i) {
                if ("undefined" != typeof i.mc && D) {
                    var n, e, r, o = i.mc(t);
                    if (o) {
                        if (n = o.Zc("id"), n && n.xc === t) return [o];
                        for (r = i.Yc(t), e = 0; o = r[e++];)
                            if (n = o.Zc("id"), n && n.xc === t) return [o]
                    }
                    return []
                }
            }), M.Fc.Ec = C.aa ? function(t, i) {
                return "undefined" != typeof i.aa ? i.aa(t) : C.pc ? i.ba(t) : void 0
            } : function(t, i) {
                var n, e = [],
                    r = 0,
                    o = i.aa(t);
                if ("*" === t) {
                    for (; n = o[r++];) 1 === n.D && e.push(n);
                    return e
                }
                return o
            }, M.Fc.Ic = C.oc && function(t, i) {
                if ("undefined" != typeof i.oc && D) return i.oc(t)
            }, L = [], S = [], (C.pc = dt.test(_.ba)) && (r(function(t) {
                A.x(t).fa = "<a id='" + E + "'></a><select id='" + E + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.ba("[msallowcapture^='']").length && S.push("[*^$]=" + nt + "*(?:''|\"\")"), t.ba("[selected]").length || S.push("\\[" + nt + "*(?:value|" + it + ")"), t.ba("[id~=" + E + "-]").length || S.push("~="), t.ba(":checked").length || S.push(":checked"), t.ba("a#" + E + "+*").length || S.push(".#.+[+~]")
            }), r(function(t) {
                t.fa = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var i = _.t("input");
                i.qc("type", "hidden"), t.x(i).qc("name", "D"), t.ba("[name=d]").length && S.push("name" + nt + "*[*^$|!~]?="), 2 !== t.ba(":enabled").length && S.push(":enabled", ":disabled"), A.x(t).vc = !0, 2 !== t.ba(":disabled").length && S.push(":enabled", ":disabled"), t.ba("*,:x"), S.push(",.*:")
            })), (C.$c = dt.test(X = A.Dc || A._c || A.ad || A.bd || A.cd)) && r(function(t) {
                C.dd = X.call(t, "*"), X.call(t, "[s!='']:x"), L.push("!=", ot)
            }), S = S.length && new RegExp(S.join("|")), L = L.length && new RegExp(L.join("|")), i = dt.test(A.ed), P = i || dt.test(A.na) ? function(t, i) {
                var n = 9 === t.D ? t.Pc : t,
                    e = i && i.w;
                return t === e || !(!e || 1 !== e.D || !(n.na ? n.na(e) : t.ed && 16 & t.ed(e)))
            } : function(t, i) {
                if (i)
                    for (; i = i.w;)
                        if (i === t) return !0;
                return !1
            }, H = i ? function(t, i) {
                if (t === i) return O = !0, 0;
                var n = !t.ed - !i.ed;
                return n ? n : (n = (t.X || t) === (i.X || i) ? t.ed(i) : 1, 1 & n || !C.fd && i.ed(t) === n ? t === _ || t.X === k && P(k, t) ? -1 : i === _ || i.X === k && P(k, i) ? 1 : U ? tt(U, t) - tt(U, i) : 0 : 4 & n ? -1 : 1)
            } : function(t, i) {
                if (t === i) return O = !0, 0;
                var n, e = 0,
                    r = t.w,
                    o = i.w,
                    h = [t],
                    a = [i];
                if (!r || !o) return t === _ ? -1 : i === _ ? 1 : r ? -1 : o ? 1 : U ? tt(U, t) - tt(U, i) : 0;
                if (r === o) return s(t, i);
                for (n = t; n = n.w;) h.unshift(n);
                for (n = i; n = n.w;) a.unshift(n);
                for (; h[e] === a[e];) e++;
                return e ? s(h[e], a[e]) : h[e] === k ? -1 : a[e] === k ? 1 : 0
            }, _) : _
        }, i.Dc = function(t, n) {
            return i(t, null, null, n)
        }, i.$c = function(t, n) {
            if ((t.X || t) !== _ && W(t), n = n.replace(ct, "='$1']"), C.$c && D && !B[n + " "] && (!L || !L.test(n)) && (!S || !S.test(n))) try {
                var e = X.call(t, n);
                if (e || C.dd || t.s && 11 !== t.s.D) return e
            } catch (t) {}
            return i(n, _, null, [t]).length > 0
        }, i.na = function(t, i) {
            return (t.X || t) !== _ && W(t), P(t, i)
        }, i.gd = function(t, i) {
            (t.X || t) !== _ && W(t);
            var n = M.sc[i.toLowerCase()],
                e = n && G.call(M.sc, i.toLowerCase()) ? n(t, i, !D) : void 0;
            return void 0 !== e ? e : C.Uc || !D ? t.O(i) : (e = t.Zc(i)) && e.hd ? e.xc : null
        }, i.id = function(t) {
            return (t + "").replace(xt, Ct)
        }, i.Vb = function(t) {
            throw new Error("Syntax error, unrecognized expression: " + t)
        }, i.Gc = function(t) {
            var i, n = [],
                e = 0,
                r = 0;
            if (O = !C.jd, U = !C.kd && t.slice(0), t.sort(H), O) {
                for (; i = t[r++];) i === t[r] && (e = n.push(r));
                for (; e--;) t.splice(n[e], 1)
            }
            return U = null, t
        }, F = i.ld = function(t) {
            var i, n = "",
                e = 0,
                r = t.D;
            if (r) {
                if (1 === r || 9 === r || 11 === r) {
                    if ("string" == typeof t.ka) return t.ka;
                    for (t = t.ja; t; t = t.uc) n += F(t)
                } else if (3 === r || 4 === r) return t.md
            } else
                for (; i = t[e++];) n += F(i);
            return n
        }, M = i.nd = {
            rc: 50,
            od: e,
            match: pt,
            sc: {},
            Fc: {},
            Bc: {
                pd: {
                    yc: "parentNode",
                    bc: !0
                },
                Cc: {
                    yc: "parentNode"
                },
                qd: {
                    yc: "previousSibling",
                    bc: !0
                },
                rd: {
                    yc: "previousSibling"
                }
            },
            sd: {
                Jc: function(t) {
                    return t[1] = t[1].replace(bt, wt), t[3] = (t[3] || t[4] || t[5] || "").replace(bt, wt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                },
                Lc: function(t) {
                    return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || i.Vb(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && i.Vb(t[0]), t
                },
                Kc: function(t) {
                    var i, n = !t[6] && t[2];
                    return pt.Lc.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && ft.test(n) && (i = I(n, !0)) && (i = n.indexOf(")", n.length - i) - n.length) && (t[0] = t[0].slice(0, i), t[2] = n.slice(0, i)), t.slice(0, 3))
                }
            },
            filter: {
                Ec: function(t) {
                    var i = t.replace(bt, wt).toLowerCase();
                    return "*" === t ? function() {
                        return !0
                    } : function(t) {
                        return t.Y && t.Y.toLowerCase() === i
                    }
                },
                Ic: function(t) {
                    var i = R[t + " "];
                    return i || (i = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && R(t, function(t) {
                        return i.test("string" == typeof t.Vc && t.Vc || "undefined" != typeof t.O && t.O("class") || "")
                    })
                },
                Jc: function(t, n, e) {
                    return function(r) {
                        var o = i.gd(r, t);
                        return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === e : "!=" === n ? o !== e : "^=" === n ? e && 0 === o.indexOf(e) : "*=" === n ? e && o.indexOf(e) > -1 : "$=" === n ? e && o.slice(-e.length) === e : "~=" === n ? (" " + o.replace(st, " ") + " ").indexOf(e) > -1 : "|=" === n && (o === e || o.slice(0, e.length + 1) === e + "-"))
                    }
                },
                Lc: function(t, i, n, e, r) {
                    var o = "nth" !== t.slice(0, 3),
                        s = "last" !== t.slice(-4),
                        h = "of-type" === i;
                    return 1 === e && 0 === r ? function(t) {
                        return !!t.w
                    } : function(i, n, a) {
                        var u, c, f, l, p, v, y = o !== s ? "nextSibling" : "previousSibling",
                            d = i.w,
                            g = h && i.Y.toLowerCase(),
                            m = !a && !h,
                            b = !1;
                        if (d) {
                            if (o) {
                                for (; y;) {
                                    for (l = i; l = l[y];)
                                        if (h ? l.Y.toLowerCase() === g : 1 === l.D) return !1;
                                    v = y = "only" === t && !v && "nextSibling"
                                }
                                return !0
                            }
                            if (v = [s ? d.ja : d.ha], s && m) {
                                for (l = d, f = l[E] || (l[E] = {}), c = f[l.Ac] || (f[l.Ac] = {}), u = c[t] || [], p = u[0] === Y && u[1], b = p && u[2], l = p && d.ia[p]; l = ++p && l && l[y] || (b = p = 0) || v.pop();)
                                    if (1 === l.D && ++b && l === i) {
                                        c[t] = [Y, p, b];
                                        break
                                    }
                            } else if (m && (l = i, f = l[E] || (l[E] = {}), c = f[l.Ac] || (f[l.Ac] = {}), u = c[t] || [], p = u[0] === Y && u[1], b = p), b === !1)
                                for (;
                                    (l = ++p && l && l[y] || (b = p = 0) || v.pop()) && ((h ? l.Y.toLowerCase() !== g : 1 !== l.D) || !++b || (m && (f = l[E] || (l[E] = {}), c = f[l.Ac] || (f[l.Ac] = {}), c[t] = [Y, b]), l !== i)););
                            return b -= r, b === e || b % e === 0 && b / e >= 0
                        }
                    }
                },
                Kc: function(t, n) {
                    var r, o = M.td[t] || M.ud[t.toLowerCase()] || i.Vb("unsupported pseudo: " + t);
                    return o[E] ? o(n) : o.length > 1 ? (r = [t, t, "", n], M.ud.hasOwnProperty(t.toLowerCase()) ? e(function(t, i) {
                        for (var e, r = o(t, n), s = r.length; s--;) e = tt(t, r[s]), t[e] = !(i[e] = r[s])
                    }) : function(t) {
                        return o(t, 0, r)
                    }) : o
                }
            },
            td: {
                vd: e(function(t) {
                    var i = [],
                        n = [],
                        r = j(t.replace(ht, "$1"));
                    return r[E] ? e(function(t, i, n, e) {
                        for (var o, s = r(t, null, e, []), h = t.length; h--;)(o = s[h]) && (t[h] = !(i[h] = o))
                    }) : function(t, e, o) {
                        return i[0] = t, r(i, null, o, n), i[0] = null, !n.pop()
                    }
                }),
                wd: e(function(t) {
                    return function(n) {
                        return i(t, n).length > 0
                    }
                }),
                na: e(function(t) {
                    return t = t.replace(bt, wt),
                        function(i) {
                            return (i.ka || i.xd || F(i)).indexOf(t) > -1
                        }
                }),
                yd: e(function(t) {
                    return lt.test(t || "") || i.Vb("unsupported lang: " + t), t = t.replace(bt, wt).toLowerCase(),
                        function(i) {
                            var n;
                            do
                                if (n = D ? i.yd : i.O("xml:lang") || i.O("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-");
                            while ((i = i.w) && 1 === i.D);
                            return !1
                        }
                }),
                zd: function(i) {
                    var n = t.Ad && t.Ad.Bd;
                    return n && n.slice(1) === i.nc
                },
                Cd: function(t) {
                    return t === A
                },
                Dd: function(t) {
                    return t === _.oa && (!_.Ed || _.Ed()) && !!(t.z || t.Fd || ~t.Gd)
                },
                Hd: u(!1),
                vc: u(!0),
                za: function(t) {
                    var i = t.Y.toLowerCase();
                    return "input" === i && !!t.za || "option" === i && !!t.Id
                },
                Id: function(t) {
                    return t.w && t.w.Jd, t.Id === !0
                },
                ab: function(t) {
                    for (t = t.ja; t; t = t.uc)
                        if (t.D < 6) return !1;
                    return !0
                },
                Kd: function(t) {
                    return !M.td.ab(t)
                },
                Ld: function(t) {
                    return yt.test(t.Y)
                },
                input: function(t) {
                    return vt.test(t.Y)
                },
                Md: function(t) {
                    var i = t.Y.toLowerCase();
                    return "input" === i && "button" === t.z || "button" === i
                },
                u: function(t) {
                    var i;
                    return "input" === t.Y.toLowerCase() && "text" === t.z && (null == (i = t.O("type")) || "text" === i.toLowerCase())
                },
                bc: c(function() {
                    return [0]
                }),
                cc: c(function(t, i) {
                    return [i - 1]
                }),
                Ca: c(function(t, i, n) {
                    return [n < 0 ? n + i : n]
                }),
                Nd: c(function(t, i) {
                    for (var n = 0; n < i; n += 2) t.push(n);
                    return t
                }),
                Od: c(function(t, i) {
                    for (var n = 1; n < i; n += 2) t.push(n);
                    return t
                }),
                Pd: c(function(t, i, n) {
                    for (var e = n < 0 ? n + i : n; --e >= 0;) t.push(e);
                    return t
                }),
                Qd: c(function(t, i, n) {
                    for (var e = n < 0 ? n + i : n; ++e < i;) t.push(e);
                    return t
                })
            }
        }, M.td.Rd = M.td.Ca;
        for (x in {
                Sd: !0,
                Td: !0,
                Ud: !0,
                Vd: !0,
                Wd: !0
            }) M.td[x] = h(x);
        for (x in {
                Xd: !0,
                Yd: !0
            }) M.td[x] = a(x);
        return l.prototype = M.Zd = M.td, M.ud = new l, I = i.$d = function(t, n) {
            var e, r, o, s, h, a, u, c = N[t + " "];
            if (c) return n ? 0 : c.slice(0);
            for (h = t, a = [], u = M.sd; h;) {
                e && !(r = at.exec(h)) || (r && (h = h.slice(r[0].length) || h), a.push(o = [])), e = !1, (r = ut.exec(h)) && (e = r.shift(), o.push({
                    xc: e,
                    z: r[0].replace(ht, " ")
                }), h = h.slice(e.length));
                for (s in M.filter) !(r = pt[s].exec(h)) || u[s] && !(r = u[s](r)) || (e = r.shift(), o.push({
                    xc: e,
                    z: s,
                    Dc: r
                }), h = h.slice(e.length));
                if (!e) break
            }
            return n ? h.length : h ? i.Vb(t) : N(t, a).slice(0)
        }, j = i.compile = function(t, i) {
            var n, e = [],
                r = [],
                o = B[t + " "];
            if (!o) {
                for (i || (i = I(t)), n = i.length; n--;) o = b(i[n]), o[E] ? e.push(o) : r.push(o);
                o = B(t, w(r, e)), o._d = t
            }
            return o
        }, T = i.ae = function(t, i, n, e) {
            var r, o, s, h, a, u = "function" == typeof t && t,
                c = !e && I(t = u._d || t);
            if (n = n || [], 1 === c.length) {
                if (o = c[0] = c[0].slice(0), o.length > 2 && "ID" === (s = o[0]).z && 9 === i.D && D && M.Bc[o[1].z]) {
                    if (i = (M.Fc.Hc(s.Dc[0].replace(bt, wt), i) || [])[0], !i) return n;
                    u && (i = i.w), t = t.slice(o.shift().xc.length)
                }
                for (r = pt.Nc.test(t) ? 0 : o.length; r-- && (s = o[r], !M.Bc[h = s.z]);)
                    if ((a = M.Fc[h]) && (e = a(s.Dc[0].replace(bt, wt), mt.test(o[0].z) && f(i.w) || i))) {
                        if (o.splice(r, 1), t = e.length && p(o), !t) return q.apply(n, e), n;
                        break
                    }
            }
            return (u || j(t, c))(e, i, !D, n, !i || mt.test(t) && f(i.w) || i), n
        }, C.kd = E.split("").sort(H).join("") === E, C.jd = !!O, W(), C.fd = r(function(t) {
            return 1 & t.ed(_.t("fieldset"))
        }), r(function(t) {
            return t.fa = "<a href='#'></a>", "#" === t.ja.O("href")
        }) || o("type|href|height|width", function(t, i, n) {
            if (!n) return t.O(i, "type" === i.toLowerCase() ? 1 : 2)
        }), C.Uc && r(function(t) {
            return t.fa = "<input/>", t.ja.qc("value", ""), "" === t.ja.O("value")
        }) || o("value", function(t, i, n) {
            if (!n && "input" === t.Y.toLowerCase()) return t.Aa
        }), r(function(t) {
            return null == t.O("disabled")
        }) || o(it, function(t, i, n) {
            var e;
            if (!n) return t[i] === !0 ? i.toLowerCase() : (e = t.Zc(i)) && e.hd ? e.xc : null
        }), i
    }(t);
    vt.Fc = bt, vt.be = bt.nd, vt.be["ce"] = vt.be.td, vt.Gc = vt.de = bt.Gc, vt.u = bt.ld, vt.ee = bt.Oc, vt.na = bt.na, vt.fe = bt.id;
    var wt = function(t, i, n) {
            for (var e = [], r = void 0 !== n;
                (t = t[i]) && 9 !== t.D;)
                if (1 === t.D) {
                    if (r && vt(t).is(n)) break;
                    e.push(t)
                }
            return e
        },
        xt = function(t, i) {
            for (var n = []; t; t = t.uc) 1 === t.D && t !== i && n.push(t);
            return n
        },
        Ct = vt.be.match.Nc,
        Mt = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
        Ft = /^.[^:#\[\.,]*$/;
    vt.filter = function(t, i, n) {
        var e = i[0];
        return n && (t = ":not(" + t + ")"), 1 === i.length && 1 === e.D ? vt.Fc.$c(e, t) ? [e] : [] : vt.Fc.Dc(t, vt.C(i, function(t) {
            return 1 === t.D
        }))
    }, vt.Yb.ya({
        Fc: function(t) {
            var i, n, e = this.length,
                r = this;
            if ("string" != typeof t) return this._b(vt(t).filter(function() {
                for (i = 0; i < e; i++)
                    if (vt.na(r[i], this)) return !0
            }));
            for (n = this._b([]), i = 0; i < e; i++) vt.Fc(t, r[i], n);
            return e > 1 ? vt.Gc(n) : n
        },
        filter: function(t) {
            return this._b(r(this, t || [], !1))
        },
        vd: function(t) {
            return this._b(r(this, t || [], !0))
        },
        is: function(t) {
            return !!r(this, "string" == typeof t && Ct.test(t) ? vt(t) : t || [], !1).length
        }
    });
    var zt, It = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
        jt = vt.Yb.Qa = function(t, i, n) {
            var e, r;
            if (!t) return this;
            if (n = n || zt, "string" == typeof t) {
                if (e = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : It.exec(t), !e || !e[1] && i) return !i || i.Zb ? (i || n).Fc(t) : this.constructor(i).Fc(t);
                if (e[1]) {
                    if (i = i instanceof vt ? i[0] : i, vt.ca(this, vt.ge(e[1], i && i.D ? i.X || i : it, !0)), Mt.test(e[1]) && vt.dc(i))
                        for (e in i) vt.B(this[e]) ? this[e](i[e]) : this.gd(e, i[e]);
                    return this
                }
                return r = it.mc(e[2]), r && (this[0] = r, this.length = 1), this
            }
            return t.D ? (this[0] = t, this.length = 1, this) : vt.B(t) ? void 0 !== n.L ? n.L(t) : t(vt) : vt.jc(t, this)
        };
    jt.prototype = vt.Yb, zt = vt(it);
    var Tt = /^(?:parents|prev(?:Until|All))/,
        Kt = {
            he: !0,
            Mb: !0,
            zc: !0,
            ie: !0
        };
    vt.Yb.ya({
        wd: function(t) {
            var i = vt(t, this),
                n = i.length;
            return this.filter(function() {
                for (var t = 0; t < n; t++)
                    if (vt.na(this, i[t])) return !0
            })
        },
        je: function(t, i) {
            var n, e = 0,
                r = this.length,
                o = [],
                s = "string" != typeof t && vt(t);
            if (!Ct.test(t))
                for (; e < r; e++)
                    for (n = this[e]; n && n !== i; n = n.w)
                        if (n.D < 11 && (s ? s.ke(n) > -1 : 1 === n.D && vt.Fc.$c(n, t))) {
                            o.push(n);
                            break
                        }
            return this._b(o.length > 1 ? vt.Gc(o) : o)
        },
        ke: function(t) {
            return t ? "string" == typeof t ? st.call(vt(t), this[0]) : st.call(this, t.Zb ? t[0] : t) : this[0] && this[0].w ? this.bc().le().length : -1
        },
        ra: function(t, i) {
            return this._b(vt.Gc(vt.ca(this._(), vt(t, i))))
        },
        me: function(t) {
            return this.ra(null == t ? this.ac : this.ac.filter(t))
        }
    }), vt.F({
        Kd: function(t) {
            var i = t.w;
            return i && 11 !== i.D ? i : null
        },
        ne: function(t) {
            return wt(t, "parentNode")
        },
        oe: function(t, i, n) {
            return wt(t, "parentNode", n)
        },
        zc: function(t) {
            return o(t, "nextSibling")
        },
        ie: function(t) {
            return o(t, "previousSibling")
        },
        pe: function(t) {
            return wt(t, "nextSibling")
        },
        le: function(t) {
            return wt(t, "previousSibling")
        },
        qe: function(t, i, n) {
            return wt(t, "nextSibling", n)
        },
        re: function(t, i, n) {
            return wt(t, "previousSibling", n)
        },
        se: function(t) {
            return xt((t.w || {}).ja, t)
        },
        he: function(t) {
            return xt(t.ja)
        },
        Mb: function(t) {
            return t.te || vt.ca([], t.ia)
        }
    }, function(t, i) {
        vt.Yb[t] = function(n, e) {
            var r = vt.map(this, i, n);
            return "Until" !== t.slice(-5) && (e = n), e && "string" == typeof e && (r = vt.filter(e, r)), this.length > 1 && (Kt[t] || vt.Gc(r), Tt.test(t) && r.reverse()), this._b(r)
        }
    });
    var Ut = /[^\x20\t\r\n\f]+/g;
    vt.ue = function(t) {
        t = "string" == typeof t ? s(t) : vt.ya({}, t);
        var i, n, e, r, o = [],
            h = [],
            a = -1,
            u = function() {
                for (r = t.ve, e = i = !0; h.length; a = -1)
                    for (n = h.shift(); ++a < o.length;) o[a].apply(n[0], n[1]) === !1 && t.we && (a = o.length, n = !1);
                t.xe || (n = !1), i = !1, r && (o = n ? [] : "")
            },
            c = {
                ra: function() {
                    return o && (n && !i && (a = o.length - 1, h.push(n)), function i(n) {
                        vt.F(n, function(n, e) {
                            vt.B(e) ? t.de && c.wd(e) || o.push(e) : e && e.length && "string" !== vt.z(e) && i(e)
                        })
                    }(arguments), n && !i && u()), this
                },
                hb: function() {
                    return vt.F(arguments, function(t, i) {
                        for (var n;
                            (n = vt.ma(i, o, n)) > -1;) o.splice(n, 1), n <= a && a--
                    }), this
                },
                wd: function(t) {
                    return t ? vt.ma(t, o) > -1 : o.length > 0
                },
                ab: function() {
                    return o && (o = []), this
                },
                ye: function() {
                    return r = h = [], o = n = "", this
                },
                vc: function() {
                    return !o
                },
                ze: function() {
                    return r = h = [], n || i || (o = n = ""), this
                },
                Ae: function() {
                    return !!r
                },
                Be: function(t, n) {
                    return r || (n = n || [], n = [t, n.slice ? n.slice() : n], h.push(n), i || u()), this
                },
                _a: function() {
                    return c.Be(this, arguments), this
                },
                Ce: function() {
                    return !!e
                }
            };
        return c
    }, vt.ya({
        mb: function(i) {
            var n = [
                    ["notify", "progress", vt.ue("memory"), vt.ue("memory"), 2],
                    ["resolve", "done", vt.ue("once memory"), vt.ue("once memory"), 0, "resolved"],
                    ["reject", "fail", vt.ue("once memory"), vt.ue("once memory"), 1, "rejected"]
                ],
                e = "pending",
                r = {
                    Ub: function() {
                        return e
                    },
                    bb: function() {
                        return o.I(arguments).H(arguments), this
                    },
                    De: function(t) {
                        return r.J(null, t)
                    },
                    Ee: function() {
                        var t = arguments;
                        return vt.mb(function(i) {
                            vt.F(n, function(n, e) {
                                var r = vt.B(t[e[4]]) && t[e[4]];
                                o[e[1]](function() {
                                    var t = r && r.apply(this, arguments);
                                    t && vt.B(t.G) ? t.G().Hb(i.Fe).I(i.Ge).H(i.He) : i[e[0] + "With"](this, r ? [t] : arguments)
                                })
                            }), t = null
                        }).G()
                    },
                    J: function(i, e, r) {
                        function o(i, n, e, r) {
                            return function() {
                                var u = this,
                                    c = arguments,
                                    f = function() {
                                        var t, f;
                                        if (!(i < s)) {
                                            if (t = e.apply(u, c), t === n.G()) throw new TypeError("Thenable self-resolution");
                                            f = t && ("object" == typeof t || "function" == typeof t) && t.J, vt.B(f) ? r ? f.call(t, o(s, n, h, r), o(s, n, a, r)) : (s++, f.call(t, o(s, n, h, r), o(s, n, a, r), o(s, n, h, n.sb))) : (e !== h && (u = void 0, c = [t]), (r || n.tb)(u, c))
                                        }
                                    },
                                    l = r ? f : function() {
                                        try {
                                            f()
                                        } catch (t) {
                                            vt.mb.Ie && vt.mb.Ie(t, l.Je), i + 1 >= s && (e !== a && (u = void 0, c = [t]), n.Db(u, c))
                                        }
                                    };
                                i ? l() : (vt.mb.Ke && (l.Je = vt.mb.Ke()), t.Ta(l))
                            }
                        }
                        var s = 0;
                        return vt.mb(function(t) {
                            n[0][3].ra(o(0, t, vt.B(r) ? r : h, t.sb)), n[1][3].ra(o(0, t, vt.B(i) ? i : h)), n[2][3].ra(o(0, t, vt.B(e) ? e : a))
                        }).G()
                    },
                    G: function(t) {
                        return null != t ? vt.ya(t, r) : r
                    }
                },
                o = {};
            return vt.F(n, function(t, i) {
                var s = i[2],
                    h = i[5];
                r[i[1]] = s.ra, h && s.ra(function() {
                    e = h
                }, n[3 - t][2].ye, n[0][2].ze), s.ra(i[3]._a), o[i[0]] = function() {
                    return o[i[0] + "With"](this === o ? void 0 : this, arguments), this
                }, o[i[0] + "With"] = s.Be
            }), r.G(o), i && i.call(o, o), o
        },
        Le: function(t) {
            var i = arguments.length,
                n = i,
                e = Array(n),
                r = et.call(arguments),
                o = vt.mb(),
                s = function(t) {
                    return function(n) {
                        e[t] = this, r[t] = arguments.length > 1 ? et.call(arguments) : n, --i || o.tb(e, r)
                    }
                };
            if (i <= 1 && (u(t, o.I(s(n)).Ge, o.He), "pending" === o.Ub() || vt.B(r[n] && r[n].J))) return o.J();
            for (; n--;) u(r[n], s(n), o.He);
            return o.G()
        }
    });
    var Ot = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    vt.mb.Ie = function(i, n) {
        t.Me && t.Me.Ne && i && Ot.test(i.name) && t.Me.Ne("jQuery.Deferred exception: " + i.message, i.Oe, n)
    }, vt.Pe = function(i) {
        t.Ta(function() {
            throw i
        })
    };
    var Wt = vt.mb();
    vt.Yb.L = function(t) {
        return Wt.J(t).De(function(t) {
            vt.Pe(t)
        }), this
    }, vt.ya({
        ec: !1,
        Qe: 1,
        Re: function(t) {
            t ? vt.Qe++ : vt.L(!0)
        },
        L: function(t) {
            (t === !0 ? --vt.Qe : vt.ec) || (vt.ec = !0, t !== !0 && --vt.Qe > 0 || Wt.tb(it, [vt]))
        }
    }), vt.L.J = Wt.J, "complete" === it.Se || "loading" !== it.Se && !it.Pc.Te ? t.Ta(vt.L) : (it.Sc("DOMContentLoaded", c), t.Sc("load", c));
    var _t = function(t, i, n, e, r, o, s) {
            var h = 0,
                a = t.length,
                u = null == n;
            if ("object" === vt.z(n)) {
                r = !0;
                for (h in n) _t(t, i, h, n[h], !0, o, s)
            } else if (void 0 !== e && (r = !0, vt.B(e) || (s = !0), u && (s ? (i.call(t, e), i = null) : (u = i, i = function(t, i, n) {
                    return u.call(vt(t), n)
                })), i))
                for (; h < a; h++) i(t[h], n, s ? e : e.call(t[h], h, i(t[h], n)));
            return r ? t : u ? i.call(t) : a ? i(t[0], n) : o
        },
        At = function(t) {
            return 1 === t.D || 9 === t.D || !+t.D
        };
    f.N = 1, f.prototype = {
        Ue: function(t) {
            var i = t[this.M];
            return i || (i = {}, At(t) && (t.D ? t[this.M] = i : Object.defineProperty(t, this.M, {
                xc: i,
                Ve: !0
            }))), i
        },
        P: function(t, i, n) {
            var e, r = this.Ue(t);
            if ("string" == typeof i) r[vt.ib(i)] = n;
            else
                for (e in i) r[vt.ib(e)] = i[e];
            return r
        },
        _: function(t, i) {
            return void 0 === i ? this.Ue(t) : t[this.M] && t[this.M][vt.ib(i)]
        },
        va: function(t, i, n) {
            return void 0 === i || i && "string" == typeof i && void 0 === n ? this._(t, i) : (this.P(t, i, n), void 0 !== n ? n : i)
        },
        hb: function(t, i) {
            var n, e = t[this.M];
            if (void 0 !== e) {
                if (void 0 !== i) {
                    vt.isArray(i) ? i = i.map(vt.ib) : (i = vt.ib(i), i = i in e ? [i] : i.match(Ut) || []), n = i.length;
                    for (; n--;) delete e[i[n]]
                }(void 0 === i || vt.cb(e)) && (t.D ? t[this.M] = void 0 : delete t[this.M])
            }
        },
        ua: function(t) {
            var i = t[this.M];
            return void 0 !== i && !vt.cb(i)
        }
    };
    var Dt = new f,
        St = new f,
        Lt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Xt = /[A-Z]/g;
    vt.ya({
        ua: function(t) {
            return St.ua(t) || Dt.ua(t)
        },
        Wb: function(t, i, n) {
            return St.va(t, i, n)
        },
        We: function(t, i) {
            St.hb(t, i)
        },
        Xe: function(t, i, n) {
            return Dt.va(t, i, n)
        },
        Ye: function(t, i) {
            Dt.hb(t, i)
        }
    }), vt.Yb.ya({
        Wb: function(t, i) {
            var n, e, r, o = this[0],
                s = o && o.Uc;
            if (void 0 === t) {
                if (this.length && (r = St._(o), 1 === o.D && !Dt._(o, "hasDataAttrs"))) {
                    for (n = s.length; n--;) s[n] && (e = s[n].name, 0 === e.indexOf("data-") && (e = vt.ib(e.slice(5)), p(o, e, r[e])));
                    Dt.P(o, "hasDataAttrs", !0)
                }
                return r
            }
            return "object" == typeof t ? this.F(function() {
                St.P(this, t)
            }) : _t(this, function(i) {
                var n;
                if (o && void 0 === i) {
                    if (n = St._(o, t), void 0 !== n) return n;
                    if (n = p(o, t), void 0 !== n) return n
                } else this.F(function() {
                    St.P(this, t, i)
                })
            }, null, i, arguments.length > 1, null, !0)
        },
        We: function(t) {
            return this.F(function() {
                St.hb(this, t)
            })
        }
    }), vt.ya({
        Ya: function(t, i, n) {
            var e;
            if (t) return i = (i || "fx") + "queue", e = Dt._(t, i), n && (!e || vt.isArray(n) ? e = Dt.va(t, i, vt.jc(n)) : e.push(n)), e || []
        },
        Ze: function(t, i) {
            i = i || "fx";
            var n = vt.Ya(t, i),
                e = n.length,
                r = n.shift(),
                o = vt.Za(t, i),
                s = function() {
                    vt.Ze(t, i)
                };
            "inprogress" === r && (r = n.shift(), e--), r && ("fx" === i && n.unshift("inprogress"), delete o.Cb, r.call(t, s, o)), !e && o && o.ab._a()
        },
        Za: function(t, i) {
            var n = i + "queueHooks";
            return Dt._(t, n) || Dt.va(t, n, {
                ab: vt.ue("once memory").ra(function() {
                    Dt.hb(t, [i + "queue", n])
                })
            })
        }
    }), vt.Yb.ya({
        Ya: function(t, i) {
            var n = 2;
            return "string" != typeof t && (i = t, t = "fx", n--), arguments.length < n ? vt.Ya(this[0], t) : void 0 === i ? this : this.F(function() {
                var n = vt.Ya(this, t, i);
                vt.Za(this, t), "fx" === t && "inprogress" !== n[0] && vt.Ze(this, t)
            })
        },
        Ze: function(t) {
            return this.F(function() {
                vt.Ze(this, t)
            })
        },
        $e: function(t) {
            return this.Ya(t || "fx", [])
        },
        G: function(t, i) {
            var n, e = 1,
                r = vt.mb(),
                o = this,
                s = this.length,
                h = function() {
                    --e || r.tb(o, [o])
                };
            for ("string" != typeof t && (i = t, t = void 0), t = t || "fx"; s--;) n = Dt._(o[s], t + "queueHooks"), n && n.ab && (e++, n.ab.ra(h));
            return h(), r.G(i)
        }
    });
    var Pt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Et = new RegExp("^(?:([+-])=|)(" + Pt + ")([a-z%]*)$", "i"),
        kt = ["Top", "Right", "Bottom", "Left"],
        Yt = function(t, i) {
            return t = i || t, "none" === t.T.$ || "" === t.T.$ && vt.na(t.X, t) && "none" === vt.R(t, "display")
        },
        Vt = function(t, i, n, e) {
            var r, o, s = {};
            for (o in i) s[o] = t.T[o], t.T[o] = i[o];
            r = n.apply(t, e || []);
            for (o in i) t.T[o] = s[o];
            return r
        },
        Rt = {};
    vt.Yb.ya({
        _e: function() {
            return d(this, !0)
        },
        af: function() {
            return d(this)
        },
        bf: function(t) {
            return "boolean" == typeof t ? t ? this._e() : this.af() : this.F(function() {
                Yt(this) ? vt(this)._e() : vt(this).af()
            })
        }
    });
    var Nt = /^(?:checkbox|radio)$/i,
        Bt = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        Ht = /^$|\/(?:java|ecma)script/i,
        Gt = {
            cf: [1, "<select multiple='multiple'>", "</select>"],
            df: [1, "<table>", "</table>"],
            ef: [2, "<table><colgroup>", "</colgroup></table>"],
            ff: [2, "<table><tbody>", "</tbody></table>"],
            gf: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            ea: [0, "", ""]
        };
    Gt.hf = Gt.cf, Gt.if = Gt.jf = Gt.kf = Gt.lf = Gt.df, Gt.mf = Gt.gf;
    var Qt = /<|&#?\w+;/;
    ! function() {
        var t = it.da(),
            i = t.x(it.t("div")),
            n = it.t("input");
        n.qc("type", "radio"), n.qc("checked", "checked"), n.qc("name", "t"), i.x(n), lt.Ba = i.nf(!0).nf(!0).ha.za, i.fa = "<textarea>x</textarea>", lt.of = !!i.nf(!0).ha.Aa
    }();
    var $t = it.Pc,
        Zt = /^key/,
        qt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Jt = /^([^.]*)(?:\.(.+)|)/;
    vt.sa = {
        global: {},
        ra: function(t, i, n, e, r) {
            var o, s, h, a, u, c, f, l, p, v, y, d = Dt._(t);
            if (d)
                for (n.pf && (o = n, n = o.pf, r = o._d), r && vt.Fc.$c($t, r), n.qa || (n.qa = vt.qa++), (a = d.wa) || (a = d.wa = {}), (s = d.xa) || (s = d.xa = function(i) {
                        return "undefined" != typeof vt && vt.sa.qf !== i.z ? vt.sa.rf.apply(t, arguments) : void 0
                    }), i = (i || "").match(Ut) || [""], u = i.length; u--;) h = Jt.exec(i[u]) || [], p = y = h[1], v = (h[2] || "").split(".").sort(), p && (f = vt.sa.sf[p] || {}, p = (r ? f.tf : f.uf) || p, f = vt.sa.sf[p] || {}, c = vt.ya({
                    z: p,
                    vf: y,
                    Wb: e,
                    pf: n,
                    qa: n.qa,
                    _d: r,
                    Nc: r && vt.be.match.Nc.test(r),
                    wf: v.join(".")
                }, o), (l = a[p]) || (l = a[p] = [], l.xf = 0, f.yf && f.yf.call(t, e, v, s) !== !1 || t.Sc && t.Sc(p, s)), f.ra && (f.ra.call(t, c), c.pf.qa || (c.pf.qa = n.qa)), r ? l.splice(l.xf++, 0, c) : l.push(c), vt.sa.global[p] = !0)
        },
        hb: function(t, i, n, e, r) {
            var o, s, h, a, u, c, f, l, p, v, y, d = Dt.ua(t) && Dt._(t);
            if (d && (a = d.wa)) {
                for (i = (i || "").match(Ut) || [""], u = i.length; u--;)
                    if (h = Jt.exec(i[u]) || [], p = y = h[1], v = (h[2] || "").split(".").sort(), p) {
                        for (f = vt.sa.sf[p] || {}, p = (e ? f.tf : f.uf) || p, l = a[p] || [], h = h[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = l.length; o--;) c = l[o], !r && y !== c.vf || n && n.qa !== c.qa || h && !h.test(c.wf) || e && e !== c._d && ("**" !== e || !c._d) || (l.splice(o, 1), c._d && l.xf--, f.hb && f.hb.call(t, c));
                        s && !l.length && (f.zf && f.zf.call(t, v, d.xa) !== !1 || vt.Af(t, p, d.xa), delete a[p])
                    } else
                        for (p in a) vt.sa.hb(t, p + i[u], n, e, !0);
                vt.cb(a) && Dt.hb(t, "handle events")
            }
        },
        rf: function(t) {
            var i, n, e, r, o, s, h = vt.sa.Bf(t),
                a = new Array(arguments.length),
                u = (Dt._(this, "events") || {})[h.z] || [],
                c = vt.sa.sf[h.z] || {};
            for (a[0] = h, i = 1; i < arguments.length; i++) a[i] = arguments[i];
            if (h.Cf = this, !c.Df || c.Df.call(this, h) !== !1) {
                for (s = vt.sa.Ef.call(this, h, u), i = 0;
                    (r = s[i++]) && !h.Ff();)
                    for (h.Gf = r.nb, n = 0;
                        (o = r.Ef[n++]) && !h.Hf();) h.If && !h.If.test(o.wf) || (h.Jf = o, h.Wb = o.Wb, e = ((vt.sa.sf[o.vf] || {}).xa || o.pf).apply(r.nb, a), void 0 !== e && (h.Kf = e) === !1 && (h.Lf(), h.Mf()));
                return c.Nf && c.Nf.call(this, h), h.Kf
            }
        },
        Ef: function(t, i) {
            var n, e, r, o, s, h = [],
                a = i.xf,
                u = t.zd;
            if (a && u.D && !("click" === t.z && t.Md >= 1))
                for (; u !== this; u = u.w || this)
                    if (1 === u.D && ("click" !== t.z || u.vc !== !0)) {
                        for (o = [], s = {}, n = 0; n < a; n++) e = i[n], r = e._d + " ", void 0 === s[r] && (s[r] = e.Nc ? vt(r, this).ke(u) > -1 : vt.Fc(r, this, null, [u]).length), s[r] && o.push(e);
                        o.length && h.push({
                            nb: u,
                            Ef: o
                        })
                    }
            return u = this, a < i.length && h.push({
                nb: u,
                Ef: i.slice(a)
            }), h
        },
        Of: function(t, i) {
            Object.defineProperty(vt.Pf.prototype, t, {
                Qf: !0,
                Ve: !0,
                _: vt.B(i) ? function() {
                    if (this.Rf) return i(this.Rf)
                } : function() {
                    if (this.Rf) return this.Rf[t]
                },
                P: function(i) {
                    Object.defineProperty(this, t, {
                        Qf: !0,
                        Ve: !0,
                        Sf: !0,
                        xc: i
                    })
                }
            })
        },
        Bf: function(t) {
            return t[vt.M] ? t : new vt.Pf(t)
        },
        sf: {
            Tf: {
                Uf: !0
            },
            Dd: {
                Vf: function() {
                    if (this !== C() && this.Dd) return this.Dd(), !1
                },
                tf: "focusin"
            },
            Wf: {
                Vf: function() {
                    if (this === C() && this.Wf) return this.Wf(), !1
                },
                tf: "focusout"
            },
            Xf: {
                Vf: function() {
                    if ("checkbox" === this.z && this.Xf && vt.Y(this, "input")) return this.Xf(), !1
                },
                ea: function(t) {
                    return vt.Y(t.zd, "a")
                }
            },
            Yf: {
                Nf: function(t) {
                    void 0 !== t.Kf && t.Rf && (t.Rf.Zf = t.Kf)
                }
            }
        }
    }, vt.Af = function(t, i, n) {
        t.K && t.K(i, n)
    }, vt.Pf = function(t, i) {
        return this instanceof vt.Pf ? (t && t.z ? (this.Rf = t, this.z = t.z, this.$f = t._f || void 0 === t._f && t.Zf === !1 ? w : x, this.zd = t.zd && 3 === t.zd.D ? t.zd.w : t.zd, this.Gf = t.Gf, this.ag = t.ag) : this.z = t, i && vt.ya(this, i), this.bg = t && t.bg || vt.now(), void(this[vt.M] = !0)) : new vt.Pf(t, i)
    }, vt.Pf.prototype = {
        constructor: vt.Pf,
        $f: x,
        Ff: x,
        Hf: x,
        cg: !1,
        Lf: function() {
            var t = this.Rf;
            this.$f = w, t && !this.cg && t.Lf()
        },
        Mf: function() {
            var t = this.Rf;
            this.Ff = w, t && !this.cg && t.Mf()
        },
        dg: function() {
            var t = this.Rf;
            this.Hf = w, t && !this.cg && t.dg(), this.Mf()
        }
    }, vt.F({
        eg: !0,
        fg: !0,
        gg: !0,
        hg: !0,
        ig: !0,
        jg: !0,
        kg: !0,
        lg: !0,
        mg: !0,
        ng: !0,
        og: !0,
        pg: !0,
        qg: !0,
        rg: !0,
        sg: !0,
        tg: !0,
        Md: !0,
        ug: !0,
        vg: !0,
        wg: !0,
        xg: !0,
        yg: !0,
        zg: !0,
        Ag: !0,
        Bg: !0,
        Cg: !0,
        Dg: !0,
        Eg: !0,
        Fg: !0,
        Gg: function(t) {
            var i = t.Md;
            return null == t.Gg && Zt.test(t.z) ? null != t.rg ? t.rg : t.tg : !t.Gg && void 0 !== i && qt.test(t.z) ? 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0 : t.Gg
        }
    }, vt.sa.Of), vt.F({
        Hg: "mouseover",
        Ig: "mouseout",
        Jg: "pointerover",
        Kg: "pointerout"
    }, function(t, i) {
        vt.sa.sf[t] = {
            tf: i,
            uf: i,
            xa: function(t) {
                var n, e = this,
                    r = t.ag,
                    o = t.Jf;
                return r && (r === e || vt.na(e, r)) || (t.z = o.vf, n = o.pf.apply(this, arguments), t.z = i), n
            }
        }
    }), vt.Yb.ya({
        Lg: function(t, i, n, e) {
            return M(this, t, i, n, e)
        },
        Mg: function(t, i, n, e) {
            return M(this, t, i, n, e, 1)
        },
        pa: function(t, i, n) {
            var e, r;
            if (t && t.Lf && t.Jf) return e = t.Jf, vt(t.Cf).pa(e.wf ? e.vf + "." + e.wf : e.vf, e._d, e.pf), this;
            if ("object" == typeof t) {
                for (r in t) this.pa(r, i, t[r]);
                return this
            }
            return i !== !1 && "function" != typeof i || (n = i, i = void 0), n === !1 && (n = x), this.F(function() {
                vt.sa.hb(this, t, n, i)
            })
        }
    });
    var ti = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        ii = /<script|<style|<link/i,
        ni = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ei = /^true\/(.*)/,
        ri = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    vt.ya({
        ga: function(t) {
            return t.replace(ti, "<$1></$2>")
        },
        Ea: function(t, i, n) {
            var e, r, o, s, h = t.nf(!0),
                a = vt.na(t.X, t);
            if (!(lt.of || 1 !== t.D && 11 !== t.D || vt.ee(t)))
                for (s = g(h), o = g(t), e = 0, r = o.length; e < r; e++) T(o[e], s[e]);
            if (i)
                if (n)
                    for (o = o || g(t), s = s || g(h), e = 0, r = o.length; e < r; e++) j(o[e], s[e]);
                else j(t, h);
            return s = g(h, "script"), s.length > 0 && m(s, !a && g(t, "script")), h
        },
        Ha: function(t) {
            for (var i, n, e, r = vt.sa.sf, o = 0; void 0 !== (n = t[o]); o++)
                if (At(n)) {
                    if (i = n[Dt.M]) {
                        if (i.wa)
                            for (e in i.wa) r[e] ? vt.sa.hb(n, e) : vt.Af(n, e, i.xa);
                        n[Dt.M] = void 0
                    }
                    n[St.M] && (n[St.M] = void 0)
                }
        }
    }), vt.Yb.ya({
        Ng: function(t) {
            return U(this, t, !0)
        },
        hb: function(t) {
            return U(this, t)
        },
        u: function(t) {
            return _t(this, function(t) {
                return void 0 === t ? vt.u(this) : this.ab().F(function() {
                    1 !== this.D && 11 !== this.D && 9 !== this.D || (this.ka = t)
                })
            }, null, t, arguments.length)
        },
        Og: function() {
            return K(this, arguments, function(t) {
                if (1 === this.D || 11 === this.D || 9 === this.D) {
                    var i = F(this, t);
                    i.x(t)
                }
            })
        },
        Pg: function() {
            return K(this, arguments, function(t) {
                if (1 === this.D || 11 === this.D || 9 === this.D) {
                    var i = F(this, t);
                    i.Qg(t, i.ja)
                }
            })
        },
        Rg: function() {
            return K(this, arguments, function(t) {
                this.w && this.w.Qg(t, this)
            })
        },
        Sg: function() {
            return K(this, arguments, function(t) {
                this.w && this.w.Qg(t, this.uc)
            })
        },
        ab: function() {
            for (var t, i = 0; null != (t = this[i]); i++) 1 === t.D && (vt.Ha(g(t, !1)), t.ka = "");
            return this
        },
        Ea: function(t, i) {
            return t = null != t && t, i = null == i ? t : i, this.map(function() {
                return vt.Ea(this, t, i)
            })
        },
        Da: function(t) {
            return _t(this, function(t) {
                var i = this[0] || {},
                    n = 0,
                    e = this.length;
                if (void 0 === t && 1 === i.D) return i.fa;
                if ("string" == typeof t && !ii.test(t) && !Gt[(Bt.exec(t) || ["", ""])[1].toLowerCase()]) {
                    t = vt.ga(t);
                    try {
                        for (; n < e; n++) i = this[n] || {}, 1 === i.D && (vt.Ha(g(i, !1)), i.fa = t);
                        i = 0
                    } catch (t) {}
                }
                i && this.ab().Og(t)
            }, null, t, arguments.length)
        },
        Tg: function() {
            var t = [];
            return K(this, arguments, function(i) {
                var n = this.w;
                vt.ma(this, t) < 0 && (vt.Ha(g(this)), n && n.Ug(i, this))
            }, t)
        }
    }), vt.F({
        Vg: "append",
        Wg: "prepend",
        Qg: "before",
        Xg: "after",
        Yg: "replaceWith"
    }, function(t, i) {
        vt.Yb[t] = function(t) {
            for (var n, e = [], r = vt(t), o = r.length - 1, s = 0; s <= o; s++) n = s === o ? this : this.Ea(!0), vt(r[s])[i](n), ot.apply(e, n._());
            return this._b(e)
        }
    });
    var oi = /^margin/,
        si = new RegExp("^(" + Pt + ")(?!px)[a-z%]+$", "i"),
        hi = function(i) {
            var n = i.X.Xb;
            return n && n.Zg || (n = t), n.$g(i)
        };
    ! function() {
        function i() {
            if (h) {
                h.T._g = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", h.fa = "", $t.x(s);
                var i = t.$g(h);
                n = "1%" !== i.Rc, o = "2px" === i.ah, e = "4px" === i.Ka, h.T.bh = "50%", r = "4px" === i.bh, $t.v(s), h = null
            }
        }
        var n, e, r, o, s = it.t("div"),
            h = it.t("div");
        h.T && (h.T.ch = "content-box", h.nf(!0).T.ch = "", lt.dh = "content-box" === h.T.ch, s.T._g = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", s.x(h), vt.ya(lt, {
            eh: function() {
                return i(), n
            },
            Pa: function() {
                return i(), e
            },
            Ja: function() {
                return i(), r
            },
            fh: function() {
                return i(), o
            }
        }))
    }();
    var ai = /^(none|table(?!-c[ea]).+)/,
        ui = {
            gh: "absolute",
            hh: "hidden",
            $: "block"
        },
        ci = {
            ih: "0",
            jh: "400"
        },
        fi = ["Webkit", "Moz", "ms"],
        li = it.t("div").T;
    vt.ya({
        jb: {
            Va: {
                _: function(t, i) {
                    if (i) {
                        var n = O(t, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        S: {
            kh: !0,
            lh: !0,
            mh: !0,
            nh: !0,
            oh: !0,
            jh: !0,
            ph: !0,
            Va: !0,
            qh: !0,
            rh: !0,
            sh: !0,
            th: !0,
            uh: !0
        },
        vh: {
            wh: "cssFloat"
        },
        T: function(t, i, n, e) {
            if (t && 3 !== t.D && 8 !== t.D && t.T) {
                var r, o, s, h = vt.ib(i),
                    a = t.T;
                return i = vt.vh[h] || (vt.vh[h] = _(h) || h), s = vt.jb[i] || vt.jb[h], void 0 === n ? s && "get" in s && void 0 !== (r = s._(t, !1, e)) ? r : a[i] : (o = typeof n, "string" === o && (r = Et.exec(n)) && r[1] && (n = v(t, i, r), o = "number"), void(null != n && n === n && ("number" === o && (n += r && r[3] || (vt.S[h] ? "" : "px")), lt.dh || "" !== n || 0 !== i.indexOf("background") || (a[i] = "inherit"), s && "set" in s && void 0 === (n = s.P(t, n, e)) || (a[i] = n))))
            }
        },
        R: function(t, i, n, e) {
            var r, o, s, h = vt.ib(i);
            return i = vt.vh[h] || (vt.vh[h] = _(h) || h), s = vt.jb[i] || vt.jb[h], s && "get" in s && (r = s._(t, !0, n)), void 0 === r && (r = O(t, i, e)), "normal" === r && i in ci && (r = ci[i]), "" === n || n ? (o = parseFloat(r), n === !0 || isFinite(o) ? o || 0 : r) : r
        }
    }), vt.F(["height", "width"], function(t, i) {
        vt.jb[i] = {
            _: function(t, n, e) {
                if (n) return !ai.test(vt.R(t, "display")) || t.Na().length && t.Oa().Ka ? S(t, i, e) : Vt(t, ui, function() {
                    return S(t, i, e)
                })
            },
            P: function(t, n, e) {
                var r, o = e && hi(t),
                    s = e && D(t, i, e, "border-box" === vt.R(t, "boxSizing", !1, o), o);
                return s && (r = Et.exec(n)) && "px" !== (r[3] || "px") && (t.T[i] = n, n = vt.R(t, i)), A(t, n, s)
            }
        }
    }), vt.jb.ah = W(lt.fh, function(t, i) {
        if (i) return (parseFloat(O(t, "marginLeft")) || t.Oa().xh - Vt(t, {
            ah: 0
        }, function() {
            return t.Oa().xh
        })) + "px"
    }), vt.F({
        yh: "",
        zh: "",
        Ah: "Width"
    }, function(t, i) {
        vt.jb[t + i] = {
            kb: function(n) {
                for (var e = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; e < 4; e++) r[t + kt[e] + i] = o[e] || o[e - 2] || o[0];
                return r
            }
        }, oi.test(t) || (vt.jb[t + i].P = A)
    }), vt.Yb.ya({
        R: function(t, i) {
            return _t(this, function(t, i, n) {
                var e, r, o = {},
                    s = 0;
                if (vt.isArray(i)) {
                    for (e = hi(t), r = i.length; s < r; s++) o[i[s]] = vt.R(t, i[s], !1, e);
                    return o
                }
                return void 0 !== n ? vt.T(t, i, n) : vt.R(t, i)
            }, t, i, arguments.length > 1)
        }
    }), vt.Bb = L, L.prototype = {
        constructor: L,
        Qa: function(t, i, n, e, r, o) {
            this.nb = t, this.Bh = n, this.xb = r || vt.xb.ea, this.Ch = i, this.V = this.now = this.Q(), this.W = e, this.U = o || (vt.S[n] ? "" : "px")
        },
        Q: function() {
            var t = L.Dh[this.Bh];
            return t && t._ ? t._(this) : L.Dh.ea._(this)
        },
        rb: function(t) {
            var i, n = L.Dh[this.Bh];
            return this.Ch.pb ? this.Eh = i = vt.xb[this.xb](t, this.Ch.pb * t, 0, 1, this.Ch.pb) : this.Eh = i = t, this.now = (this.W - this.V) * i + this.V, this.Ch.Fh && this.Ch.Fh.call(this.nb, this.now, this), n && n.P ? n.P(this) : L.Dh.ea.P(this), this
        }
    }, L.prototype.Qa.prototype = L.prototype, L.Dh = {
        ea: {
            _: function(t) {
                var i;
                return 1 !== t.nb.D || null != t.nb[t.Bh] && null == t.nb.T[t.Bh] ? t.nb[t.Bh] : (i = vt.R(t.nb, t.Bh, ""), i && "auto" !== i ? i : 0)
            },
            P: function(t) {
                vt.Sa.Fh[t.Bh] ? vt.Sa.Fh[t.Bh](t) : 1 !== t.nb.D || null == t.nb.T[vt.vh[t.Bh]] && !vt.jb[t.Bh] ? t.nb[t.Bh] = t.now : vt.T(t.nb, t.Bh, t.now + t.U)
            }
        }
    }, L.Dh.Gh = L.Dh.Hh = {
        P: function(t) {
            t.nb.D && t.nb.w && (t.nb[t.Bh] = t.now)
        }
    }, vt.xb = {
        Ih: function(t) {
            return t
        },
        Jh: function(t) {
            return .5 - Math.cos(t * Math.PI) / 2
        },
        ea: "swing"
    }, vt.Sa = L.prototype.Qa, vt.Sa.Fh = {};
    var pi, vi, yi = /^(?:toggle|show|hide)$/,
        di = /queueHooks$/;
    vt.Kh = vt.ya(R, {
            Wa: {
                Xa: [function(t, i) {
                    var n = this.Ab(t, i);
                    return v(n.nb, t, Et.exec(i), n), n
                }]
            },
            Lh: function(t, i) {
                vt.B(t) ? (i = t, t = ["*"]) : t = t.match(Ut);
                for (var n, e = 0, r = t.length; e < r; e++) n = t[e], R.Wa[n] = R.Wa[n] || [], R.Wa[n].unshift(i)
            },
            lb: [Y],
            Mh: function(t, i) {
                i ? R.lb.unshift(t) : R.lb.push(t)
            }
        }), vt.Nh = function(t, i, n) {
            var e = t && "object" == typeof t ? vt.ya({}, t) : {
                Ib: n || !n && i || vt.B(t) && t,
                pb: t,
                xb: n && i || i && !vt.B(i) && i
            };
            return vt.Sa.pa || it.gb ? e.pb = 0 : "number" != typeof e.pb && (e.pb in vt.Sa.Oh ? e.pb = vt.Sa.Oh[e.pb] : e.pb = vt.Sa.Oh.ea), null != e.Ya && e.Ya !== !0 || (e.Ya = "fx"), e.Ph = e.Ib, e.Ib = function() {
                vt.B(e.Ph) && e.Ph.call(this), e.Ya && vt.Ze(this, e.Ya)
            }, e
        }, vt.Yb.ya({
            Qh: function(t, i, n, e) {
                return this.filter(Yt).R("opacity", 0)._e().W().Rh({
                    Va: i
                }, t, n, e)
            },
            Rh: function(t, i, n, e) {
                var r = vt.cb(t),
                    o = vt.Nh(i, n, e),
                    s = function() {
                        var i = R(this, vt.ya({}, t), o);
                        (r || Dt._(this, "finish")) && i.Cb(!0)
                    };
                return s.Sh = s, r || o.Ya === !1 ? this.F(s) : this.Ya(o.Ya, s)
            },
            Cb: function(t, i, n) {
                var e = function(t) {
                    var i = t.Cb;
                    delete t.Cb, i(n)
                };
                return "string" != typeof t && (n = i, i = t, t = void 0), i && t !== !1 && this.Ya(t || "fx", []), this.F(function() {
                    var i = !0,
                        r = null != t && t + "queueHooks",
                        o = vt.Th,
                        s = Dt._(this);
                    if (r) s[r] && s[r].Cb && e(s[r]);
                    else
                        for (r in s) s[r] && s[r].Cb && di.test(r) && e(s[r]);
                    for (r = o.length; r--;) o[r].nb !== this || null != t && o[r].Ya !== t || (o[r].Gb.Cb(n), i = !1, o.splice(r, 1));
                    !i && n || vt.Ze(this, t)
                })
            },
            Sh: function(t) {
                return t !== !1 && (t = t || "fx"), this.F(function() {
                    var i, n = Dt._(this),
                        e = n[t + "queue"],
                        r = n[t + "queueHooks"],
                        o = vt.Th,
                        s = e ? e.length : 0;
                    for (n.Sh = !0, vt.Ya(this, t, []), r && r.Cb && r.Cb.call(this, !0), i = o.length; i--;) o[i].nb === this && o[i].Ya === t && (o[i].Gb.Cb(!0), o.splice(i, 1));
                    for (i = 0; i < s; i++) e[i] && e[i].Sh && e[i].Sh.call(this);
                    delete n.Sh
                })
            }
        }), vt.F(["toggle", "show", "hide"], function(t, i) {
            var n = vt.Yb[i];
            vt.Yb[i] = function(t, e, r) {
                return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.Rh(E(i, !0), t, e, r)
            }
        }), vt.F({
            Uh: E("show"),
            Vh: E("hide"),
            Wh: E("toggle"),
            Xh: {
                Va: "show"
            },
            Yh: {
                Va: "hide"
            },
            Zh: {
                Va: "toggle"
            }
        }, function(t, i) {
            vt.Yb[t] = function(t, n, e) {
                return this.Rh(i, t, n, e)
            }
        }), vt.Th = [], vt.Sa.Ra = function() {
            var t, i = 0,
                n = vt.Th;
            for (pi = vt.now(); i < n.length; i++) t = n[i], t() || n[i] !== t || n.splice(i--, 1);
            n.length || vt.Sa.Cb(), pi = void 0
        }, vt.Sa.Fb = function(t) {
            vt.Th.push(t), t() ? vt.Sa.V() : vt.Th.pop()
        }, vt.Sa.$h = 13, vt.Sa.V = function() {
            vi || (vi = t.a ? t.a(X) : t._h(vt.Sa.Ra, vt.Sa.$h))
        }, vt.Sa.Cb = function() {
            t.ai ? t.ai(vi) : t.bi(vi), vi = null
        }, vt.Sa.Oh = {
            ci: 600,
            di: 200,
            ea: 400
        }, vt.Yb.ei = function(i, n) {
            return i = vt.Sa ? vt.Sa.Oh[i] || i : i, n = n || "fx", this.Ya(n, function(n, e) {
                var r = t.Ta(n, i);
                e.Cb = function() {
                    t.fi(r)
                }
            })
        },
        function() {
            var t = it.t("input"),
                i = it.t("select"),
                n = i.x(it.t("option"));
            t.z = "checkbox", lt.gi = "" !== t.xc, lt.hi = n.Id, t = it.t("input"), t.xc = "t", t.z = "radio", lt.ii = "t" === t.xc
        }();
    var gi, mi = vt.be.sc;
    vt.Yb.ya({
        gd: function(t, i) {
            return _t(this, vt.gd, t, i, arguments.length > 1)
        },
        ji: function(t) {
            return this.F(function() {
                vt.ji(this, t)
            })
        }
    }), vt.ya({
        gd: function(t, i, n) {
            var e, r, o = t.D;
            if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof t.O ? vt.Bh(t, i, n) : (1 === o && vt.ee(t) || (r = vt.ki[i.toLowerCase()] || (vt.be.match.Mc.test(i) ? gi : void 0)), void 0 !== n ? null === n ? void vt.ji(t, i) : r && "set" in r && void 0 !== (e = r.P(t, n, i)) ? e : (t.qc(i, n + ""), n) : r && "get" in r && null !== (e = r._(t, i)) ? e : (e = vt.Fc.gd(t, i), null == e ? void 0 : e))
        },
        ki: {
            z: {
                P: function(t, i) {
                    if (!lt.ii && "radio" === i && vt.Y(t, "input")) {
                        var n = t.xc;
                        return t.qc("type", i), n && (t.xc = n), i
                    }
                }
            }
        },
        ji: function(t, i) {
            var n, e = 0,
                r = i && i.match(Ut);
            if (r && 1 === t.D)
                for (; n = r[e++];) t.ta(n)
        }
    }), gi = {
        P: function(t, i, n) {
            return i === !1 ? vt.ji(t, n) : t.qc(n, n), n
        }
    }, vt.F(vt.be.match.Mc.source.match(/\w+/g), function(t, i) {
        var n = mi[i] || vt.Fc.gd;
        mi[i] = function(t, i, e) {
            var r, o, s = i.toLowerCase();
            return e || (o = mi[s], mi[s] = r, r = null != n(t, i, e) ? s : null, mi[s] = o), r
        }
    });
    var bi = /^(?:input|select|textarea|button)$/i,
        wi = /^(?:a|area)$/i;
    vt.Yb.ya({
        Bh: function(t, i) {
            return _t(this, vt.Bh, t, i, arguments.length > 1)
        },
        li: function(t) {
            return this.F(function() {
                delete this[vt.mi[t] || t]
            })
        }
    }), vt.ya({
        Bh: function(t, i, n) {
            var e, r, o = t.D;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && vt.ee(t) || (i = vt.mi[i] || i, r = vt.Dh[i]), void 0 !== n ? r && "set" in r && void 0 !== (e = r.P(t, n, i)) ? e : t[i] = n : r && "get" in r && null !== (e = r._(t, i)) ? e : t[i]
        },
        Dh: {
            Gd: {
                _: function(t) {
                    var i = vt.Fc.gd(t, "tabindex");
                    return i ? parseInt(i, 10) : bi.test(t.Y) || wi.test(t.Y) && t.Fd ? 0 : -1
                }
            }
        },
        mi: {
            ni: "htmlFor",
            oi: "className"
        }
    }), lt.hi || (vt.Dh.Id = {
        _: function(t) {
            var i = t.w;
            return i && i.w && i.w.Jd, null
        },
        P: function(t) {
            var i = t.w;
            i && (i.Jd, i.w && i.w.Jd)
        }
    }), vt.F(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        vt.mi[this.toLowerCase()] = this
    }), vt.Yb.ya({
        pi: function(t) {
            var i, n, e, r, o, s, h, a = 0;
            if (vt.B(t)) return this.F(function(i) {
                vt(this).pi(t.call(this, i, B(this)))
            });
            if ("string" == typeof t && t)
                for (i = t.match(Ut) || []; n = this[a++];)
                    if (r = B(n), e = 1 === n.D && " " + N(r) + " ") {
                        for (s = 0; o = i[s++];) e.indexOf(" " + o + " ") < 0 && (e += o + " ");
                        h = N(e), r !== h && n.qc("class", h)
                    }
            return this
        },
        qi: function(t) {
            var i, n, e, r, o, s, h, a = 0;
            if (vt.B(t)) return this.F(function(i) {
                vt(this).qi(t.call(this, i, B(this)))
            });
            if (!arguments.length) return this.gd("class", "");
            if ("string" == typeof t && t)
                for (i = t.match(Ut) || []; n = this[a++];)
                    if (r = B(n), e = 1 === n.D && " " + N(r) + " ") {
                        for (s = 0; o = i[s++];)
                            for (; e.indexOf(" " + o + " ") > -1;) e = e.replace(" " + o + " ", " ");
                        h = N(e), r !== h && n.qc("class", h)
                    }
            return this
        },
        ri: function(t, i) {
            var n = typeof t;
            return "boolean" == typeof i && "string" === n ? i ? this.pi(t) : this.qi(t) : vt.B(t) ? this.F(function(n) {
                vt(this).ri(t.call(this, n, B(this), i), i)
            }) : this.F(function() {
                var i, e, r, o;
                if ("string" === n)
                    for (e = 0, r = vt(this), o = t.match(Ut) || []; i = o[e++];) r.si(i) ? r.qi(i) : r.pi(i);
                else void 0 !== t && "boolean" !== n || (i = B(this), i && Dt.P(this, "__className__", i), this.qc && this.qc("class", i || t === !1 ? "" : Dt._(this, "__className__") || ""))
            })
        },
        si: function(t) {
            var i, n, e = 0;
            for (i = " " + t + " "; n = this[e++];)
                if (1 === n.D && (" " + N(B(n)) + " ").indexOf(i) > -1) return !0;
            return !1
        }
    });
    var xi = /\r/g;
    vt.Yb.ya({
        ti: function(t) {
            var i, n, e, r = this[0];
            return arguments.length ? (e = vt.B(t), this.F(function(n) {
                var r;
                1 === this.D && (r = e ? t.call(this, n, vt(this).ti()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : vt.isArray(r) && (r = vt.map(r, function(t) {
                    return null == t ? "" : t + ""
                })), i = vt.ui[this.z] || vt.ui[this.Y.toLowerCase()], i && "set" in i && void 0 !== i.P(this, r, "value") || (this.xc = r))
            })) : r ? (i = vt.ui[r.z] || vt.ui[r.Y.toLowerCase()], i && "get" in i && void 0 !== (n = i._(r, "value")) ? n : (n = r.xc, "string" == typeof n ? n.replace(xi, "") : null == n ? "" : n)) : void 0
        }
    }), vt.ya({
        ui: {
            cf: {
                _: function(t) {
                    var i = vt.Fc.gd(t, "value");
                    return null != i ? i : N(vt.u(t))
                }
            },
            ae: {
                _: function(t) {
                    var i, n, e, r = t.Ch,
                        o = t.Jd,
                        s = "select-one" === t.z,
                        h = s ? null : [],
                        a = s ? o + 1 : r.length;
                    for (e = o < 0 ? a : s ? o : 0; e < a; e++)
                        if (n = r[e], (n.Id || e === o) && !n.vc && (!n.w.vc || !vt.Y(n.w, "optgroup"))) {
                            if (i = vt(n).ti(), s) return i;
                            h.push(i)
                        }
                    return h
                },
                P: function(t, i) {
                    for (var n, e, r = t.Ch, o = vt.jc(i), s = r.length; s--;) e = r[s], (e.Id = vt.ma(vt.ui.cf._(e), o) > -1) && (n = !0);
                    return n || (t.Jd = -1), o
                }
            }
        }
    }), vt.F(["radio", "checkbox"], function() {
        vt.ui[this] = {
            P: function(t, i) {
                if (vt.isArray(i)) return t.za = vt.ma(vt(t).ti(), i) > -1
            }
        }, lt.gi || (vt.ui[this]._ = function(t) {
            return null === t.O("value") ? "on" : t.xc
        })
    });
    var Ci = /^(?:focusinfocus|focusoutblur)$/;
    vt.ya(vt.sa, {
        Vf: function(i, n, e, r) {
            var o, s, h, a, u, c, f, l = [e || it],
                p = ut.call(i, "type") ? i.z : i,
                v = ut.call(i, "namespace") ? i.wf.split(".") : [];
            if (s = h = e = e || it, 3 !== e.D && 8 !== e.D && !Ci.test(p + vt.sa.qf) && (p.indexOf(".") > -1 && (v = p.split("."), p = v.shift(), v.sort()), u = p.indexOf(":") < 0 && "on" + p, i = i[vt.M] ? i : new vt.Pf(p, "object" == typeof i && i), i.vi = r ? 2 : 3, i.wf = v.join("."), i.If = i.wf ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, i.Kf = void 0, i.zd || (i.zd = e), n = null == n ? [i] : vt.jc(n, [i]), f = vt.sa.sf[p] || {}, r || !f.Vf || f.Vf.apply(e, n) !== !1)) {
                if (!r && !f.Uf && !vt.A(e)) {
                    for (a = f.tf || p, Ci.test(a + p) || (s = s.w); s; s = s.w) l.push(s), h = s;
                    h === (e.X || it) && l.push(h.Xb || h.wi || t)
                }
                for (o = 0;
                    (s = l[o++]) && !i.Ff();) i.z = o > 1 ? a : f.uf || p, c = (Dt._(s, "events") || {})[i.z] && Dt._(s, "handle"), c && c.apply(s, n), c = u && s[u], c && c.apply && At(s) && (i.Kf = c.apply(s, n), i.Kf === !1 && i.Lf());
                return i.z = p, r || i.$f() || f.ea && f.ea.apply(l.pop(), n) !== !1 || !At(e) || u && vt.B(e[p]) && !vt.A(e) && (h = e[u], h && (e[u] = null), vt.sa.qf = p, e[p](), vt.sa.qf = void 0, h && (e[u] = h)), i.Kf
            }
        },
        xi: function(t, i, n) {
            var e = vt.ya(new vt.Pf, n, {
                z: t,
                cg: !0
            });
            vt.sa.Vf(e, null, i)
        }
    }), vt.Yb.ya({
        Vf: function(t, i) {
            return this.F(function() {
                vt.sa.Vf(t, i, this)
            })
        },
        yi: function(t, i) {
            var n = this[0];
            if (n) return vt.sa.Vf(t, i, n, !0)
        }
    }), vt.F("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(t, i) {
        vt.Yb[i] = function(t, n) {
            return arguments.length > 0 ? this.Lg(i, null, t, n) : this.Vf(i)
        }
    }), vt.Yb.ya({
        zi: function(t, i) {
            return this.Hg(t).Ig(i || t)
        }
    }), lt.Ai = "onfocusin" in t, lt.Ai || vt.F({
        Dd: "focusin",
        Wf: "focusout"
    }, function(t, i) {
        var n = function(t) {
            vt.sa.xi(i, t.zd, vt.sa.Bf(t))
        };
        vt.sa.sf[i] = {
            yf: function() {
                var e = this.X || this,
                    r = Dt.va(e, i);
                r || e.Sc(t, n, !0), Dt.va(e, i, (r || 0) + 1)
            },
            zf: function() {
                var e = this.X || this,
                    r = Dt.va(e, i) - 1;
                r ? Dt.va(e, i, r) : (e.K(t, n, !0), Dt.hb(e, i))
            }
        }
    });
    var Mi = t.Ad,
        Fi = vt.now(),
        zi = /\?/;
    vt.Bi = function(i) {
        var n;
        if (!i || "string" != typeof i) return null;
        try {
            n = (new t.Di).Ci(i, "text/xml")
        } catch (t) {
            n = void 0
        }
        return n && !n.aa("parsererror").length || vt.Vb("Invalid XML: " + i), n
    };
    var Ii = /\[\]$/,
        ji = /\r?\n/g,
        Ti = /^(?:submit|button|image|reset|file)$/i,
        Ki = /^(?:input|select|textarea|keygen)/i;
    vt.Ei = function(t, i) {
        var n, e = [],
            r = function(t, i) {
                var n = vt.B(i) ? i() : i;
                e[e.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (vt.isArray(t) || t.Zb && !vt.dc(t)) vt.F(t, function() {
            r(this.name, this.xc)
        });
        else
            for (n in t) H(n, t[n], i, r);
        return e.join("&")
    }, vt.Yb.ya({
        Fi: function() {
            return vt.Ei(this.Gi())
        },
        Gi: function() {
            return this.map(function() {
                var t = vt.Bh(this, "elements");
                return t ? vt.jc(t) : this
            }).filter(function() {
                var t = this.z;
                return this.name && !vt(this).is(":disabled") && Ki.test(this.Y) && !Ti.test(t) && (this.za || !Nt.test(t))
            }).map(function(t, i) {
                var n = vt(this).ti();
                return null == n ? null : vt.isArray(n) ? vt.map(n, function(t) {
                    return {
                        name: i.name,
                        xc: t.replace(ji, "\r\n")
                    }
                }) : {
                    name: i.name,
                    xc: n.replace(ji, "\r\n")
                }
            })._()
        }
    });
    var Ui = /%20/g,
        Oi = /#.*$/,
        Wi = /([?&])_=[^&]*/,
        _i = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Ai = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Di = /^(?:GET|HEAD)$/,
        Si = /^\/\//,
        Li = {},
        Xi = {},
        Pi = "*/".concat("*"),
        Ei = it.t("a");
    Ei.Fd = Mi.Fd, vt.ya({
        Hi: 0,
        Ii: {},
        Ji: {},
        Lb: {
            Ki: Mi.Fd,
            z: "GET",
            Li: Ai.test(Mi.Mi),
            global: !0,
            Ni: !0,
            Oi: !0,
            Pi: "application/x-www-form-urlencoded; charset=UTF-8",
            Qi: {
                Xa: Pi,
                u: "text/plain",
                Da: "text/html",
                Ri: "application/xml, text/xml",
                Si: "application/json, text/javascript"
            },
            Mb: {
                Ri: /\bxml\b/,
                Da: /\bhtml/,
                Si: /\bjson\b/
            },
            Qb: {
                Ri: "responseXML",
                u: "responseText",
                Si: "responseJSON"
            },
            Pb: {
                Ti: String,
                Ui: !0,
                Vi: JSON.parse,
                Wi: vt.Bi
            },
            Kb: {
                Ki: !0,
                Xi: !0
            }
        },
        Yi: function(t, i) {
            return i ? $($(t, vt.Lb), i) : $(vt.Lb, t)
        },
        Zi: G(Li),
        $i: G(Xi),
        _i: function(i, n) {
            function e(i, n, e, h) {
                var u, l, p, w, x, C = n;
                c || (c = !0, a && t.fi(a), r = void 0, s = h || "", M.Se = i > 0 ? 4 : 0, u = i >= 200 && i < 300 || 304 === i, e && (w = Z(v, M, e)), w = q(v, w, M, u), u ? (v.aj && (x = M.Ob("Last-Modified"), x && (vt.Ii[o] = x), x = M.Ob("etag"), x && (vt.Ji[o] = x)), 204 === i || "HEAD" === v.z ? C = "nocontent" : 304 === i ? C = "notmodified" : (C = w.Ub, l = w.Wb, p = w.Vb, u = !p)) : (p = C, !i && C || (C = "error", i < 0 && (i = 0))), M.bj = i, M.cj = (n || C) + "", u ? g.tb(y, [l, C, M]) : g.Db(y, [M, C, p]), M.dj(b), b = void 0, f && d.Vf(u ? "ajaxSuccess" : "ajaxError", [M, v, u ? l : p]), m.Be(y, [M, C]), f && (d.Vf("ajaxComplete", [M, v]), --vt.Hi || vt.sa.Vf("ajaxStop")))
            }
            "object" == typeof i && (n = i, i = void 0), n = n || {};
            var r, o, s, h, a, u, c, f, l, p, v = vt.Yi({}, n),
                y = v.Xi || v,
                d = v.Xi && (y.D || y.Zb) ? vt(y) : vt.sa,
                g = vt.mb(),
                m = vt.ue("once memory"),
                b = v.dj || {},
                w = {},
                x = {},
                C = "canceled",
                M = {
                    Se: 0,
                    Ob: function(t) {
                        var i;
                        if (c) {
                            if (!h)
                                for (h = {}; i = _i.exec(s);) h[i[1].toLowerCase()] = i[2];
                            i = h[t.toLowerCase()]
                        }
                        return null == i ? null : i
                    },
                    ej: function() {
                        return c ? s : null
                    },
                    fj: function(t, i) {
                        return null == c && (t = x[t.toLowerCase()] = x[t.toLowerCase()] || t, w[t] = i), this
                    },
                    gj: function(t) {
                        return null == c && (v.Nb = t), this
                    },
                    dj: function(t) {
                        var i;
                        if (t)
                            if (c) M.bb(t[M.bj]);
                            else
                                for (i in t) b[i] = [b[i], t[i]];
                        return this
                    },
                    hj: function(t) {
                        var i = t || C;
                        return r && r.hj(i), e(0, i), this
                    }
                };
            if (g.G(M), v.Ki = ((i || v.Ki || Mi.Fd) + "").replace(Si, Mi.Mi + "//"), v.z = n.ij || n.z || v.ij || v.z, v.Jb = (v.Sb || "*").toLowerCase().match(Ut) || [""], null == v.jj) {
                u = it.t("a");
                try {
                    u.Fd = v.Ki, u.Fd = u.Fd, v.jj = Ei.Mi + "//" + Ei.kj != u.Mi + "//" + u.kj
                } catch (t) {
                    v.jj = !0
                }
            }
            if (v.Wb && v.Ni && "string" != typeof v.Wb && (v.Wb = vt.Ei(v.Wb, v.lj)), Q(Li, v, n, M), c) return M;
            f = vt.sa && v.global, f && 0 === vt.Hi++ && vt.sa.Vf("ajaxStart"), v.z = v.z.toUpperCase(), v.mj = !Di.test(v.z), o = v.Ki.replace(Oi, ""), v.mj ? v.Wb && v.Ni && 0 === (v.Pi || "").indexOf("application/x-www-form-urlencoded") && (v.Wb = v.Wb.replace(Ui, "+")) : (p = v.Ki.slice(o.length), v.Wb && (o += (zi.test(o) ? "&" : "?") + v.Wb, delete v.Wb), v.Ue === !1 && (o = o.replace(Wi, "$1"), p = (zi.test(o) ? "&" : "?") + "_=" + Fi++ + p), v.Ki = o + p), v.aj && (vt.Ii[o] && M.fj("If-Modified-Since", vt.Ii[o]), vt.Ji[o] && M.fj("If-None-Match", vt.Ji[o])), (v.Wb && v.mj && v.Pi !== !1 || n.Pi) && M.fj("Content-Type", v.Pi), M.fj("Accept", v.Jb[0] && v.Qi[v.Jb[0]] ? v.Qi[v.Jb[0]] + ("*" !== v.Jb[0] ? ", " + Pi + "; q=0.01" : "") : v.Qi["Xa"]);
            for (l in v.nj) M.fj(l, v.nj[l]);
            if (v.oj && (v.oj.call(y, M, v) === !1 || c)) return M.hj();
            if (C = "abort", m.ra(v.Ib), M.I(v.pj), M.H(v.Vb), r = Q(Xi, v, n, M)) {
                if (M.Se = 1, f && d.Vf("ajaxSend", [M, v]), c) return M;
                v.Oi && v.qj > 0 && (a = t.Ta(function() {
                    M.hj("timeout")
                }, v.qj));
                try {
                    c = !1, r.rj(w, e)
                } catch (t) {
                    if (c) throw t;
                    e(-1, t)
                }
            } else e(-1, "No Transport");
            return M
        },
        sj: function(t, i, n) {
            return vt._(t, i, n, "json")
        },
        tj: function(t, i) {
            return vt._(t, void 0, i, "script")
        }
    }), vt.F(["get", "post"], function(t, i) {
        vt[i] = function(t, n, e, r) {
            return vt.B(n) && (r = r || e, e = n, n = void 0), vt._i(vt.ya({
                Ki: t,
                z: i,
                Sb: r,
                Wb: n,
                pj: e
            }, vt.dc(t) && t))
        }
    }), vt.Ga = function(t) {
        return vt._i({
            Ki: t,
            z: "GET",
            Sb: "script",
            Ue: !0,
            Oi: !1,
            global: !1,
            Tb: !0
        })
    }, vt.Yb.ya({
        uj: function(t) {
            var i;
            return this[0] && (vt.B(t) && (t = t.call(this[0])), i = vt(t, this[0].X).Ca(0).Ea(!0), this[0].w && i.Qg(this[0]), i.map(function() {
                for (var t = this; t.vj;) t = t.vj;
                return t
            }).Og(this)), this
        },
        wj: function(t) {
            return vt.B(t) ? this.F(function(i) {
                vt(this).wj(t.call(this, i))
            }) : this.F(function() {
                var i = vt(this),
                    n = i.Mb();
                n.length ? n.uj(t) : i.Og(t)
            })
        },
        xj: function(t) {
            var i = vt.B(t);
            return this.F(function(n) {
                vt(this).uj(i ? t.call(this, n) : t)
            })
        },
        yj: function(t) {
            return this.Kd(t).vd("body").F(function() {
                vt(this).Tg(this.ia)
            }), this
        }
    }), vt.be.td.gb = function(t) {
        return !vt.be.td.zj(t)
    }, vt.be.td.zj = function(t) {
        return !!(t.Aj || t.Bj || t.Na().length)
    }, vt.Lb.Cj = function() {
        try {
            return new t.Dj
        } catch (t) {}
    };
    var ki = {
            0: 200,
            1223: 204
        },
        Yi = vt.Lb.Cj();
    lt.Ej = !!Yi && "withCredentials" in Yi, lt._i = Yi = !!Yi, vt.$i(function(i) {
        var n, e;
        if (lt.Ej || Yi && !i.jj) return {
            rj: function(r, o) {
                var s, h = i.Cj();
                if (h.Fj(i.z, i.Ki, i.Oi, i.Gj, i.Vd), i.Hj)
                    for (s in i.Hj) h[s] = i.Hj[s];
                i.Nb && h.gj && h.gj(i.Nb), i.jj || r["Ij"] || (r["Ij"] = "XMLHttpRequest");
                for (s in r) h.fj(s, r[s]);
                n = function(t) {
                    return function() {
                        n && (n = e = h.Jj = h.Kj = h.Lj = h.Mj = null, "abort" === t ? h.hj() : "error" === t ? "number" != typeof h.bj ? o(0, "error") : o(h.bj, h.cj) : o(ki[h.bj] || h.bj, h.cj, "text" !== (h.Nj || "text") || "string" != typeof h.Oj ? {
                            Pj: h.Qj
                        } : {
                            u: h.Oj
                        }, h.ej()))
                    }
                }, h.Jj = n(), e = h.Kj = n("error"), void 0 !== h.Lj ? h.Lj = e : h.Mj = function() {
                    4 === h.Se && t.Ta(function() {
                        n && e()
                    })
                }, n = n("abort");
                try {
                    h.rj(i.mj && i.Wb || null)
                } catch (t) {
                    if (n) throw t
                }
            },
            hj: function() {
                n && n()
            }
        }
    }), vt.Zi(function(t) {
        t.jj && (t.Mb.Rj = !1)
    }), vt.Yi({
        Qi: {
            Rj: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        Mb: {
            Rj: /\b(?:java|ecma)script\b/
        },
        Pb: {
            Sj: function(t) {
                return vt.ic(t), t
            }
        }
    }), vt.Zi("script", function(t) {
        void 0 === t.Ue && (t.Ue = !1), t.jj && (t.z = "GET")
    }), vt.$i("script", function(t) {
        if (t.jj) {
            var i, n;
            return {
                rj: function(e, r) {
                    i = vt("<script>").Bh({
                        Tj: t.Uj,
                        Fa: t.Ki
                    }).Lg("load error", n = function(t) {
                        i.hb(), n = null, t && r("error" === t.z ? 404 : 200, t.z)
                    }), it.y.x(i[0])
                },
                hj: function() {
                    n && n()
                }
            }
        }
    });
    var Vi = [],
        Ri = /(=)\?(?=&|$)|\?\?/;
    vt.Yi({
        Vj: "callback",
        Wj: function() {
            var t = Vi.pop() || vt.M + "_" + Fi++;
            return this[t] = !0, t
        }
    }), vt.Zi("json jsonp", function(i, n, e) {
        var r, o, s, h = i.Vj !== !1 && (Ri.test(i.Ki) ? "url" : "string" == typeof i.Wb && 0 === (i.Pi || "").indexOf("application/x-www-form-urlencoded") && Ri.test(i.Wb) && "data");
        if (h || "jsonp" === i.Jb[0]) return r = i.Wj = vt.B(i.Wj) ? i.Wj() : i.Wj, h ? i[h] = i[h].replace(Ri, "$1" + r) : i.Vj !== !1 && (i.Ki += (zi.test(i.Ki) ? "&" : "?") + i.Vj + "=" + r), i.Pb["Xj"] = function() {
            return s || vt.Vb(r + " was not called"), s[0]
        }, i.Jb[0] = "json", o = t[r], t[r] = function() {
            s = arguments
        }, e.bb(function() {
            void 0 === o ? vt(t).li(r) : t[r] = o, i[r] && (i.Wj = n.Wj, Vi.push(r)), s && vt.B(o) && o(s[0]), s = o = void 0
        }), "script"
    }), lt.Yj = function() {
        var t = it.Zj.Yj("").Z;
        return t.fa = "<form></form><form></form>", 2 === t.ia.length
    }(), vt.ge = function(t, i, n) {
        if ("string" != typeof t) return [];
        "boolean" == typeof i && (n = i, i = !1);
        var e, r, o;
        return i || (lt.Yj ? (i = it.Zj.Yj(""), e = i.t("base"), e.Fd = it.Ad.Fd, i.y.x(e)) : i = it), r = Mt.exec(t), o = !n && [], r ? [i.t(r[1])] : (r = b([t], i, o), o && o.length && vt(o).hb(), vt.ca([], r.ia))
    }, vt.Yb.Tf = function(t, i, n) {
        var e, r, o, s = this,
            h = t.indexOf(" ");
        return h > -1 && (e = N(t.slice(h)), t = t.slice(0, h)), vt.B(i) ? (n = i, i = void 0) : i && "object" == typeof i && (r = "POST"), s.length > 0 && vt._i({
            Ki: t,
            z: r || "GET",
            Sb: "html",
            Wb: i
        }).I(function(t) {
            o = arguments, s.Da(e ? vt("<div>").Og(vt.ge(t)).Fc(e) : t)
        }).bb(n && function(t, i) {
            s.F(function() {
                n.apply(this, o || [t.Oj, i, t])
            })
        }), this
    }, vt.F(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, i) {
        vt.Yb[i] = function(t) {
            return this.Lg(i, t)
        }
    }), vt.be.td.$j = function(t) {
        return vt.C(vt.Th, function(i) {
            return t === i.nb
        }).length
    }, vt._j = {
        ak: function(t, i, n) {
            var e, r, o, s, h, a, u, c = vt.R(t, "position"),
                f = vt(t),
                l = {};
            "static" === c && (t.T.gh = "relative"), h = f._j(), o = vt.R(t, "top"), a = vt.R(t, "left"), u = ("absolute" === c || "fixed" === c) && (o + a).indexOf("auto") > -1, u ? (e = f.gh(), s = e.Rc, r = e.xh) : (s = parseFloat(o) || 0, r = parseFloat(a) || 0), vt.B(i) && (i = i.call(t, n, vt.ya({}, h))), null != i.Rc && (l.Rc = i.Rc - h.Rc + s), null != i.xh && (l.xh = i.xh - h.xh + r), "using" in i ? i.bk.call(t, l) : f.R(l)
        }
    }, vt.Yb.ya({
        _j: function(t) {
            if (arguments.length) return void 0 === t ? this : this.F(function(i) {
                vt._j.ak(this, t, i)
            });
            var i, n, e, r, o = this[0];
            return o ? o.Na().length ? (e = o.Oa(), e.Ka || e.Ua ? (r = o.X, n = J(r), i = r.Pc, {
                Rc: e.Rc + n.ck - i.dk,
                xh: e.xh + n.ek - i.fk
            }) : e) : {
                Rc: 0,
                xh: 0
            } : void 0
        },
        gh: function() {
            if (this[0]) {
                var t, i, n = this[0],
                    e = {
                        Rc: 0,
                        xh: 0
                    };
                return "fixed" === vt.R(n, "position") ? i = n.Oa() : (t = this.gk(), i = this._j(), vt.Y(t[0], "html") || (e = t._j()), e = {
                    Rc: e.Rc + vt.R(t[0], "borderTopWidth", !0),
                    xh: e.xh + vt.R(t[0], "borderLeftWidth", !0)
                }), {
                    Rc: i.Rc - e.Rc - vt.R(n, "marginTop", !0),
                    xh: i.xh - e.xh - vt.R(n, "marginLeft", !0)
                }
            }
        },
        gk: function() {
            return this.map(function() {
                for (var t = this.gk; t && "static" === vt.R(t, "position");) t = t.gk;
                return t || $t
            })
        }
    }), vt.F({
        Hh: "pageXOffset",
        Gh: "pageYOffset"
    }, function(t, i) {
        var n = "pageYOffset" === i;
        vt.Yb[t] = function(e) {
            return _t(this, function(t, e, r) {
                var o = J(t);
                return void 0 === r ? o ? o[i] : t[e] : void(o ? o.hk(n ? o.ek : r, n ? r : o.ck) : t[e] = r)
            }, t, e, arguments.length)
        }
    }), vt.F(["top", "left"], function(t, i) {
        vt.jb[i] = W(lt.eh, function(t, n) {
            if (n) return n = O(t, i), si.test(n) ? vt(t).gh()[i] + "px" : n
        })
    }), vt.F({
        ik: "height",
        jk: "width"
    }, function(t, i) {
        vt.F({
            zh: "inner" + t,
            kk: i,
            lk: "outer" + t
        }, function(n, e) {
            vt.Yb[e] = function(r, o) {
                var s = arguments.length && (n || "boolean" != typeof r),
                    h = n || (r === !0 || o === !0 ? "margin" : "border");
                return _t(this, function(i, n, r) {
                    var o;
                    return vt.A(i) ? 0 === e.indexOf("outer") ? i["inner" + t] : i.s.Pc["client" + t] : 9 === i.D ? (o = i.Pc, Math.max(i.Z["scroll" + t], o["scroll" + t], i.Z["offset" + t], o["offset" + t], o["client" + t])) : void 0 === r ? vt.R(i, n, h) : vt.T(i, n, r, h)
                }, i, s ? r : void 0, s)
            }
        })
    }), vt.Yb.ya({
        bind: function(t, i, n) {
            return this.Lg(t, null, i, n)
        },
        mk: function(t, i) {
            return this.pa(t, null, i)
        },
        nk: function(t, i, n, e) {
            return this.Lg(i, t, n, e)
        },
        ok: function(t, i, n) {
            return 1 === arguments.length ? this.pa(t, "**") : this.pa(i, t || "**", n)
        }
    }), vt.pk = JSON.parse, "function" == typeof define && define.qk && define("jquery", [], function() {
        return vt
    });
    var Ni = t.rk,
        Bi = t.sk;
    return vt.tk = function(i) {
        return t.sk === vt && (t.sk = Bi), i && t.rk === vt && (t.rk = Ni), vt
    }, i || (t.rk = t.sk = vt), vt
}),
function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.r = t();
    else if ("function" == typeof define && define.qk) define([], t);
    else {
        var i;
        i = "undefined" != typeof window ? window : "undefined" != typeof I ? I : "undefined" != typeof self ? self : this, i.uk = t()
    }
}(function() {
    var t;
    return function t(i, n, e) {
        function r(s, h) {
            if (!n[s]) {
                if (!i[s]) {
                    var a = "function" == typeof require && require;
                    if (!h && a) return a(s, !0);
                    if (o) return o(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw u.vk = "MODULE_NOT_FOUND", u
                }
                var c = n[s] = {
                    r: {}
                };
                i[s][0].call(c.r, function(t) {
                    var n = i[s][1][t];
                    return r(n ? n : t)
                }, c, c.r, t, i, n, e)
            }
            return n[s].r
        }
        for (var o = "function" == typeof require && require, s = 0; s < e.length; s++) r(e[s]);
        return r
    }({
        1: [function(t, i, n) {
            "use strict";

            function e(t) {
                return t && t.wk ? t : {
                    xk: t
                }
            }

            function r(t, i, n, e) {
                (0, s.xk)(i)(t, (0, a.xk)(n), e)
            }
            Object.defineProperty(n, "__esModule", {
                xc: !0
            }), n.xk = r;
            var o = t("./internal/eachOfLimit"),
                s = e(o),
                h = t("./internal/withoutIndex"),
                a = e(h);
            i.r = n.xk
        }, {
            yk: 5,
            zk: 12
        }],
        2: [function(t, i, n) {
            "use strict";

            function e(t) {
                return t && t.wk ? t : {
                    xk: t
                }
            }
            Object.defineProperty(n, "__esModule", {
                xc: !0
            });
            var r = t("./eachLimit"),
                o = e(r),
                s = t("./internal/doLimit"),
                h = e(s);
            n.xk = (0, h.xk)(o.xk, 1), i.r = n.xk
        }, {
            Ak: 1,
            Bk: 4
        }],
        3: [function(t, i, n) {
            "use strict";

            function e() {
                this.y = this.Ck = null, this.length = 0
            }

            function r(t, i) {
                t.length = 1, t.y = t.Ck = i
            }
            Object.defineProperty(n, "__esModule", {
                xc: !0
            }), n.xk = e, e.prototype.Dk = function(t) {
                return t.ie ? t.ie.zc = t.zc : this.y = t.zc, t.zc ? t.zc.ie = t.ie : this.Ck = t.ie, t.ie = t.zc = null, this.length -= 1, t
            }, e.prototype.ab = e, e.prototype.Xg = function(t, i) {
                i.ie = t, i.zc = t.zc, t.zc ? t.zc.ie = i : this.Ck = i, t.zc = i, this.length += 1
            }, e.prototype.Qg = function(t, i) {
                i.ie = t.ie, i.zc = t, t.ie ? t.ie.zc = i : this.y = i, t.ie = i, this.length += 1
            }, e.prototype.unshift = function(t) {
                this.y ? this.Qg(this.y, t) : r(this, t)
            }, e.prototype.push = function(t) {
                this.Ck ? this.Xg(this.Ck, t) : r(this, t)
            }, e.prototype.shift = function() {
                return this.y && this.Dk(this.y)
            }, e.prototype.pop = function() {
                return this.Ck && this.Dk(this.Ck)
            }, i.r = n.xk
        }, {}],
        4: [function(t, i, n) {
            "use strict";

            function e(t, i) {
                return function(n, e, r) {
                    return t(n, i, e, r)
                }
            }
            Object.defineProperty(n, "__esModule", {
                xc: !0
            }), n.xk = e, i.r = n.xk
        }, {}],
        5: [function(t, i, n) {
            "use strict";

            function e(t) {
                return t && t.wk ? t : {
                    xk: t
                }
            }

            function r(t) {
                return function(i, n, e) {
                    function r(t) {
                        if (f -= 1, t) u = !0, e(t);
                        else {
                            if (u && f <= 0) return e(null);
                            o()
                        }
                    }

                    function o() {
                        for (; f < t && !u;) {
                            var i = h();
                            if (null === i) return u = !0, void(f <= 0 && e(null));
                            f += 1, n(i.xc, i.sg, (0, l.xk)(r))
                        }
                    }
                    if (e = (0, a.xk)(e || s.xk), t <= 0 || !i) return e(null);
                    var h = (0, c.xk)(i),
                        u = !1,
                        f = 0;
                    o()
                }
            }
            Object.defineProperty(n, "__esModule", {
                xc: !0
            }), n.xk = r;
            var o = t("lodash/noop"),
                s = e(o),
                h = t("./once"),
                a = e(h),
                u = t("./iterator"),
                c = e(u),
                f = t("./onlyOnce"),
                l = e(f);
            i.r = n.xk
        }, {
            Ek: 7,
            Fk: 8,
            Gk: 9,
            Hk: 38
        }],
        6: [function(t, i, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                xc: !0
            }), n.xk = function(t) {
                return e && t[e] && t[e]()
            };
            var e = "function" == typeof Symbol && Symbol.lc;
            i.r = n.xk
        }, {}],
        7: [function(t, i, n) {
            "use strict";

            function e(t) {
                return t && t.wk ? t : {
                    xk: t
                }
            }

            function r(t) {
                var i = -1,
                    n = t.length;
                return function() {
                    return ++i < n ? {
                        xc: t[i],
                        sg: i
                    } : null
                }
            }

            function o(t) {
                var i = -1;
                return function() {
                    var n = t.zc();
                    return n.I ? null : (i++, {
                        xc: n.xc,
                        sg: i
                    })
                }
            }

            function s(t) {
                var i = (0, p.xk)(t),
                    n = -1,
                    e = i.length;
                return function() {
                    var r = i[++n];
                    return n < e ? {
                        xc: t[r],
                        sg: r
                    } : null
                }
            }

            function h(t) {
                if ((0, u.xk)(t)) return r(t);
                var i = (0, f.xk)(t);
                return i ? o(i) : s(t)
            }
            Object.defineProperty(n, "__esModule", {
                xc: !0
            }), n.xk = h;
            var a = t("lodash/isArrayLike"),
                u = e(a),
                c = t("./getIterator"),
                f = e(c),
                l = t("lodash/keys"),
                p = e(l);
            i.r = n.xk
        }, {
            Ik: 6,
            Jk: 30,
            Kk: 37
        }],
        8: [function(t, i, n) {
            "use strict";

            function e(t) {
                return function() {
                    if (null !== t) {
                        var i = t;
                        t = null, i.apply(this, arguments)
                    }
                }
            }
            Object.defineProperty(n, "__esModule", {
                xc: !0
            }), n.xk = e, i.r = n.xk
        }, {}],
        9: [function(t, i, n) {
            "use strict";

            function e(t) {
                return function() {
                    if (null === t) throw new Error("Callback was already called.");
                    var i = t;
                    t = null, i.apply(this, arguments)
                }
            }
            Object.defineProperty(n, "__esModule", {
                xc: !0
            }), n.xk = e, i.r = n.xk
        }, {}],
        10: [function(t, i, n) {
            "use strict";

            function e(t) {
                return t && t.wk ? t : {
                    xk: t
                }
            }

            function r(t, i, n) {
                function e(t, i, n) {
                    if (null != n && "function" != typeof n) throw new Error("task callback must be a function");
                    return u.Lk = !0, (0, a.xk)(t) || (t = [t]), 0 === t.length && u.Mk() ? (0, d.xk)(function() {
                        u.Nk()
                    }) : ((0, s.xk)(t, function(t) {
                        var e = {
                            Wb: t,
                            Ok: n || c.xk
                        };
                        i ? u.Pk.unshift(e) : u.Pk.push(e)
                    }), void(0, d.xk)(u.Qk))
                }

                function r(t) {
                    return (0, l.xk)(function(i) {
                        o -= 1, (0, s.xk)(t, function(t) {
                            (0, s.xk)(h, function(i, n) {
                                if (i === t) return h.splice(n, 1), !1
                            }), t.Ok.apply(t, i), null != i[0] && u.Vb(i[0], t.Wb)
                        }), o <= u.Rk - u.Sk && u.Tk(), u.Mk() && u.Nk(), u.Qk()
                    })
                }
                if (null == i) i = 1;
                else if (0 === i) throw new Error("Concurrency must not be zero");
                var o = 0,
                    h = [],
                    u = {
                        Pk: new m.xk,
                        Rk: i,
                        Uk: n,
                        Vk: c.xk,
                        Tk: c.xk,
                        Sk: i / 4,
                        ab: c.xk,
                        Nk: c.xk,
                        Vb: c.xk,
                        Lk: !1,
                        Wk: !1,
                        push: function(t, i) {
                            e(t, !1, i)
                        },
                        Xk: function() {
                            u.Nk = c.xk, u.Pk.ab()
                        },
                        unshift: function(t, i) {
                            e(t, !0, i)
                        },
                        Qk: function() {
                            for (; !u.Wk && o < u.Rk && u.Pk.length;) {
                                var i = [],
                                    n = [],
                                    e = u.Pk.length;
                                u.Uk && (e = Math.min(e, u.Uk));
                                for (var s = 0; s < e; s++) {
                                    var a = u.Pk.shift();
                                    i.push(a), n.push(a.Wb)
                                }
                                0 === u.Pk.length && u.ab(), o += 1, h.push(i[0]), o === u.Rk && u.Vk();
                                var c = (0, v.xk)(r(i));
                                t(n, c)
                            }
                        },
                        length: function() {
                            return u.Pk.length
                        },
                        Yk: function() {
                            return o
                        },
                        Zk: function() {
                            return h
                        },
                        Mk: function() {
                            return u.Pk.length + o === 0
                        },
                        $k: function() {
                            u.Wk = !0
                        },
                        _k: function() {
                            if (u.Wk !== !1) {
                                u.Wk = !1;
                                for (var t = Math.min(u.Rk, u.Pk.length), i = 1; i <= t; i++)(0, d.xk)(u.Qk)
                            }
                        }
                    };
                return u
            }
            Object.defineProperty(n, "__esModule", {
                xc: !0
            }), n.xk = r;
            var o = t("lodash/_arrayEach"),
                s = e(o),
                h = t("lodash/isArray"),
                a = e(h),
                u = t("lodash/noop"),
                c = e(u),
                f = t("lodash/rest"),
                l = e(f),
                p = t("./onlyOnce"),
                v = e(p),
                y = t("./setImmediate"),
                d = e(y),
                g = t("./DoublyLinkedList"),
                m = e(g);
            i.r = n.xk
        }, {
            al: 3,
            Gk: 9,
            bl: 11,
            cl: 19,
            dl: 29,
            Hk: 38,
            el: 39
        }],
        11: [function(t, i, n) {
            (function(i) {
                "use strict";

                function e(t) {
                    return t && t.wk ? t : {
                        xk: t
                    }
                }

                function r(t) {
                    setTimeout(t, 0)
                }

                function o(t) {
                    return (0, a.xk)(function(i, n) {
                        t(function() {
                            i.apply(null, n)
                        })
                    })
                }
                Object.defineProperty(n, "__esModule", {
                    xc: !0
                }), n.fl = n.gl = void 0, n.hl = r, n.xj = o;
                var s, h = t("lodash/rest"),
                    a = e(h),
                    u = n.gl = "function" == typeof setImmediate && setImmediate,
                    c = n.fl = "object" == typeof i && "function" == typeof i.il;
                s = u ? setImmediate : c ? i.il : r, n.xk = o(s)
            }).call(this, t("_process"))
        }, {
            jl: 61,
            el: 39
        }],
        12: [function(t, i, n) {
            "use strict";

            function e(t) {
                return function(i, n, e) {
                    return t(i, e)
                }
            }
            Object.defineProperty(n, "__esModule", {
                xc: !0
            }), n.xk = e, i.r = n.xk
        }, {}],
        13: [function(t, i, n) {
            "use strict";

            function e(t) {
                return t && t.wk ? t : {
                    xk: t
                }
            }
            Object.defineProperty(n, "__esModule", {
                xc: !0
            }), n.xk = function(t, i) {
                return (0, o.xk)(function(i, n) {
                    t(i[0], n)
                }, i, 1)
            };
            var r = t("./internal/queue"),
                o = e(r);
            i.r = n.xk
        }, {
            kl: 10
        }],
        14: [function(t, i, n) {
            "use strict";
            "use restrict";

            function e(t) {
                var i = 32;
                return t &= -t, t && i--, 65535 & t && (i -= 16), 16711935 & t && (i -= 8), 252645135 & t && (i -= 4), 858993459 & t && (i -= 2), 1431655765 & t && (i -= 1), i
            }
            var r = 32;
            n.ll = r, n.ml = 2147483647, n.nl = -1 << r - 1, n.sign = function(t) {
                return (t > 0) - (t < 0)
            }, n.abs = function(t) {
                var i = t >> r - 1;
                return (t ^ i) - i
            }, n.min = function(t, i) {
                return i ^ (t ^ i) & -(t < i)
            }, n.max = function(t, i) {
                return t ^ (t ^ i) & -(t < i)
            }, n.ol = function(t) {
                return !(t & t - 1 || !t)
            }, n.log2 = function(t) {
                var i, n;
                return i = (t > 65535) << 4, t >>>= i, n = (t > 255) << 3, t >>>= n, i |= n, n = (t > 15) << 2, t >>>= n, i |= n, n = (t > 3) << 1, t >>>= n, i |= n, i | t >> 1
            }, n.log10 = function(t) {
                return t >= 1e9 ? 9 : t >= 1e8 ? 8 : t >= 1e7 ? 7 : t >= 1e6 ? 6 : t >= 1e5 ? 5 : t >= 1e4 ? 4 : t >= 1e3 ? 3 : t >= 100 ? 2 : t >= 10 ? 1 : 0
            }, n.pl = function(t) {
                return t -= t >>> 1 & 1431655765, t = (858993459 & t) + (t >>> 2 & 858993459), 16843009 * (t + (t >>> 4) & 252645135) >>> 24
            }, n.ql = e, n.rl = function(t) {
                return t += 0 === t, --t, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t + 1
            }, n.sl = function(t) {
                return t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t - (t >>> 1)
            }, n.tl = function(t) {
                return t ^= t >>> 16, t ^= t >>> 8, t ^= t >>> 4, t &= 15, 27030 >>> t & 1
            };
            var o = new Array(256);
            ! function(t) {
                for (var i = 0; i < 256; ++i) {
                    var n = i,
                        e = i,
                        r = 7;
                    for (n >>>= 1; n; n >>>= 1) e <<= 1, e |= 1 & n, --r;
                    t[i] = e << r & 255
                }
            }(o), n.reverse = function(t) {
                return o[255 & t] << 24 | o[t >>> 8 & 255] << 16 | o[t >>> 16 & 255] << 8 | o[t >>> 24 & 255]
            }, n.ul = function(t, i) {
                return t &= 65535, t = 16711935 & (t | t << 8), t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), i &= 65535, i = 16711935 & (i | i << 8), i = 252645135 & (i | i << 4), i = 858993459 & (i | i << 2), i = 1431655765 & (i | i << 1), t | i << 1
            }, n.vl = function(t, i) {
                return t = t >>> i & 1431655765, t = 858993459 & (t | t >>> 1), t = 252645135 & (t | t >>> 2), t = 16711935 & (t | t >>> 4), t = 65535 & (t | t >>> 16), t << 16 >> 16
            }, n.wl = function(t, i, n) {
                return t &= 1023, t = 4278190335 & (t | t << 16), t = 251719695 & (t | t << 8), t = 3272356035 & (t | t << 4), t = 1227133513 & (t | t << 2), i &= 1023, i = 4278190335 & (i | i << 16), i = 251719695 & (i | i << 8), i = 3272356035 & (i | i << 4), i = 1227133513 & (i | i << 2), t |= i << 1, n &= 1023, n = 4278190335 & (n | n << 16), n = 251719695 & (n | n << 8), n = 3272356035 & (n | n << 4), n = 1227133513 & (n | n << 2), t | n << 2
            }, n.xl = function(t, i) {
                return t = t >>> i & 1227133513, t = 3272356035 & (t | t >>> 2), t = 251719695 & (t | t >>> 4), t = 4278190335 & (t | t >>> 8), t = 1023 & (t | t >>> 16), t << 22 >> 22
            }, n.yl = function(t) {
                var i = t | t - 1;
                return i + 1 | (~i & -~i) - 1 >>> e(t) + 1
            }
        }, {}],
        15: [function(t, i, n) {
            "use strict";

            function e(t, i, n) {
                n = n || 2;
                var e = i && i.length,
                    o = e ? i[0] * n : t.length,
                    h = r(t, 0, o, n, !0),
                    a = [];
                if (!h) return a;
                var u, c, l, p, v, y, d;
                if (e && (h = f(t, i, h, n)), t.length > 80 * n) {
                    u = l = t[0], c = p = t[1];
                    for (var g = n; g < o; g += n) v = t[g], y = t[g + 1], v < u && (u = v), y < c && (c = y), v > l && (l = v), y > p && (p = y);
                    d = Math.max(l - u, p - c)
                }
                return s(h, a, n, u, c, d), a
            }

            function r(t, i, n, e, r) {
                var o, s;
                if (r === O(t, i, n, e) > 0)
                    for (o = i; o < n; o += e) s = T(o, t[o], t[o + 1], s);
                else
                    for (o = n - e; o >= i; o -= e) s = T(o, t[o], t[o + 1], s);
                return s && C(s, s.zc) && (K(s), s = s.zc), s
            }

            function o(t, i) {
                if (!t) return t;
                i || (i = t);
                var n, e = t;
                do
                    if (n = !1, e.zl || !C(e, e.zc) && 0 !== x(e.ie, e, e.zc)) e = e.zc;
                    else {
                        if (K(e), e = i = e.ie, e === e.zc) return null;
                        n = !0
                    }
                while (n || e !== i);
                return i
            }

            function s(t, i, n, e, r, f, l) {
                if (t) {
                    !l && f && y(t, e, r, f);
                    for (var p, v, d = t; t.ie !== t.zc;)
                        if (p = t.ie, v = t.zc, f ? a(t, e, r, f) : h(t)) i.push(p.Al / n), i.push(t.Al / n), i.push(v.Al / n), K(t), t = v.zc, d = v.zc;
                        else if (t = v, t === d) {
                        l ? 1 === l ? (t = u(t, i, n), s(t, i, n, e, r, f, 2)) : 2 === l && c(t, i, n, e, r, f) : s(o(t), i, n, e, r, f, 1);
                        break
                    }
                }
            }

            function h(t) {
                var i = t.ie,
                    n = t,
                    e = t.zc;
                if (x(i, n, e) >= 0) return !1;
                for (var r = t.zc.zc; r !== t.ie;) {
                    if (b(i.g, i.h, n.g, n.h, e.g, e.h, r.g, r.h) && x(r.ie, r, r.zc) >= 0) return !1;
                    r = r.zc
                }
                return !0
            }

            function a(t, i, n, e) {
                var r = t.ie,
                    o = t,
                    s = t.zc;
                if (x(r, o, s) >= 0) return !1;
                for (var h = r.g < o.g ? r.g < s.g ? r.g : s.g : o.g < s.g ? o.g : s.g, a = r.h < o.h ? r.h < s.h ? r.h : s.h : o.h < s.h ? o.h : s.h, u = r.g > o.g ? r.g > s.g ? r.g : s.g : o.g > s.g ? o.g : s.g, c = r.h > o.h ? r.h > s.h ? r.h : s.h : o.h > s.h ? o.h : s.h, f = g(h, a, i, n, e), l = g(u, c, i, n, e), p = t.Bl; p && p.i <= l;) {
                    if (p !== t.ie && p !== t.zc && b(r.g, r.h, o.g, o.h, s.g, s.h, p.g, p.h) && x(p.ie, p, p.zc) >= 0) return !1;
                    p = p.Bl
                }
                for (p = t.Cl; p && p.i >= f;) {
                    if (p !== t.ie && p !== t.zc && b(r.g, r.h, o.g, o.h, s.g, s.h, p.g, p.h) && x(p.ie, p, p.zc) >= 0) return !1;
                    p = p.Cl
                }
                return !0
            }

            function u(t, i, n) {
                var e = t;
                do {
                    var r = e.ie,
                        o = e.zc.zc;
                    !C(r, o) && M(r, e, e.zc, o) && z(r, o) && z(o, r) && (i.push(r.Al / n), i.push(e.Al / n), i.push(o.Al / n), K(e), K(e.zc), e = t = o), e = e.zc
                } while (e !== t);
                return e
            }

            function c(t, i, n, e, r, h) {
                var a = t;
                do {
                    for (var u = a.zc.zc; u !== a.ie;) {
                        if (a.Al !== u.Al && w(a, u)) {
                            var c = j(a, u);
                            return a = o(a, a.zc), c = o(c, c.zc), s(a, i, n, e, r, h), void s(c, i, n, e, r, h)
                        }
                        u = u.zc
                    }
                    a = a.zc
                } while (a !== t)
            }

            function f(t, i, n, e) {
                var s, h, a, u, c, f = [];
                for (s = 0, h = i.length; s < h; s++) a = i[s] * e, u = s < h - 1 ? i[s + 1] * e : t.length, c = r(t, a, u, e, !1), c === c.zc && (c.zl = !0), f.push(m(c));
                for (f.sort(l), s = 0; s < f.length; s++) p(f[s], n), n = o(n, n.zc);
                return n
            }

            function l(t, i) {
                return t.g - i.g
            }

            function p(t, i) {
                if (i = v(t, i)) {
                    var n = j(i, t);
                    o(n, n.zc)
                }
            }

            function v(t, i) {
                var n, e = i,
                    r = t.g,
                    o = t.h,
                    s = -(1 / 0);
                do {
                    if (o <= e.h && o >= e.zc.h) {
                        var h = e.g + (o - e.h) * (e.zc.g - e.g) / (e.zc.h - e.h);
                        if (h <= r && h > s) {
                            if (s = h, h === r) {
                                if (o === e.h) return e;
                                if (o === e.zc.h) return e.zc
                            }
                            n = e.g < e.zc.g ? e : e.zc
                        }
                    }
                    e = e.zc
                } while (e !== i);
                if (!n) return null;
                if (r === s) return n.ie;
                var a, u = n,
                    c = n.g,
                    f = n.h,
                    l = 1 / 0;
                for (e = n.zc; e !== u;) r >= e.g && e.g >= c && b(o < f ? r : s, o, c, f, o < f ? s : r, o, e.g, e.h) && (a = Math.abs(o - e.h) / (r - e.g), (a < l || a === l && e.g > n.g) && z(e, t) && (n = e, l = a)), e = e.zc;
                return n
            }

            function y(t, i, n, e) {
                var r = t;
                do null === r.i && (r.i = g(r.g, r.h, i, n, e)), r.Cl = r.ie, r.Bl = r.zc, r = r.zc; while (r !== t);
                r.Cl.Bl = null, r.Cl = null, d(r)
            }

            function d(t) {
                var i, n, e, r, o, s, h, a, u = 1;
                do {
                    for (n = t, t = null, o = null, s = 0; n;) {
                        for (s++, e = n, h = 0, i = 0; i < u && (h++, e = e.Bl, e); i++);
                        for (a = u; h > 0 || a > 0 && e;) 0 === h ? (r = e, e = e.Bl, a--) : 0 !== a && e ? n.i <= e.i ? (r = n, n = n.Bl, h--) : (r = e, e = e.Bl, a--) : (r = n, n = n.Bl, h--), o ? o.Bl = r : t = r, r.Cl = o, o = r;
                        n = e
                    }
                    o.Bl = null, u *= 2
                } while (s > 1);
                return t
            }

            function g(t, i, n, e, r) {
                return t = 32767 * (t - n) / r, i = 32767 * (i - e) / r, t = 16711935 & (t | t << 8), t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), i = 16711935 & (i | i << 8), i = 252645135 & (i | i << 4), i = 858993459 & (i | i << 2), i = 1431655765 & (i | i << 1), t | i << 1
            }

            function m(t) {
                var i = t,
                    n = t;
                do i.g < n.g && (n = i), i = i.zc; while (i !== t);
                return n
            }

            function b(t, i, n, e, r, o, s, h) {
                return (r - s) * (i - h) - (t - s) * (o - h) >= 0 && (t - s) * (e - h) - (n - s) * (i - h) >= 0 && (n - s) * (o - h) - (r - s) * (e - h) >= 0
            }

            function w(t, i) {
                return t.zc.Al !== i.Al && t.ie.Al !== i.Al && !F(t, i) && z(t, i) && z(i, t) && I(t, i)
            }

            function x(t, i, n) {
                return (i.h - t.h) * (n.g - i.g) - (i.g - t.g) * (n.h - i.h)
            }

            function C(t, i) {
                return t.g === i.g && t.h === i.h
            }

            function M(t, i, n, e) {
                return !!(C(t, i) && C(n, e) || C(t, e) && C(n, i)) || x(t, i, n) > 0 != x(t, i, e) > 0 && x(n, e, t) > 0 != x(n, e, i) > 0
            }

            function F(t, i) {
                var n = t;
                do {
                    if (n.Al !== t.Al && n.zc.Al !== t.Al && n.Al !== i.Al && n.zc.Al !== i.Al && M(n, n.zc, t, i)) return !0;
                    n = n.zc
                } while (n !== t);
                return !1
            }

            function z(t, i) {
                return x(t.ie, t, t.zc) < 0 ? x(t, i, t.zc) >= 0 && x(t, t.ie, i) >= 0 : x(t, i, t.ie) < 0 || x(t, t.zc, i) < 0
            }

            function I(t, i) {
                var n = t,
                    e = !1,
                    r = (t.g + i.g) / 2,
                    o = (t.h + i.h) / 2;
                do n.h > o != n.zc.h > o && r < (n.zc.g - n.g) * (o - n.h) / (n.zc.h - n.h) + n.g && (e = !e), n = n.zc; while (n !== t);
                return e
            }

            function j(t, i) {
                var n = new U(t.Al, t.g, t.h),
                    e = new U(i.Al, i.g, i.h),
                    r = t.zc,
                    o = i.ie;
                return t.zc = i, i.ie = t, n.zc = r, r.ie = n, e.zc = n, n.ie = e, o.zc = e, e.ie = o, e
            }

            function T(t, i, n, e) {
                var r = new U(t, i, n);
                return e ? (r.zc = e.zc, r.ie = e, e.zc.ie = r, e.zc = r) : (r.ie = r, r.zc = r), r
            }

            function K(t) {
                t.zc.ie = t.ie, t.ie.zc = t.zc, t.Cl && (t.Cl.Bl = t.Bl), t.Bl && (t.Bl.Cl = t.Cl)
            }

            function U(t, i, n) {
                this.Al = t, this.g = i, this.h = n, this.ie = null, this.zc = null, this.i = null, this.Cl = null, this.Bl = null, this.zl = !1
            }

            function O(t, i, n, e) {
                for (var r = 0, o = i, s = n - e; o < n; o += e) r += (t[s] - t[o]) * (t[o + 1] + t[s + 1]), s = o;
                return r
            }
            i.r = e, e.Dl = function(t, i, n, e) {
                var r = i && i.length,
                    o = r ? i[0] * n : t.length,
                    s = Math.abs(O(t, 0, o, n));
                if (r)
                    for (var h = 0, a = i.length; h < a; h++) {
                        var u = i[h] * n,
                            c = h < a - 1 ? i[h + 1] * n : t.length;
                        s -= Math.abs(O(t, u, c, n))
                    }
                var f = 0;
                for (h = 0; h < e.length; h += 3) {
                    var l = e[h] * n,
                        p = e[h + 1] * n,
                        v = e[h + 2] * n;
                    f += Math.abs((t[l] - t[v]) * (t[p + 1] - t[l + 1]) - (t[l] - t[p]) * (t[v + 1] - t[l + 1]))
                }
                return 0 === s && 0 === f ? 0 : Math.abs((f - s) / s)
            }, e.El = function(t) {
                for (var i = t[0][0].length, n = {
                        Fl: [],
                        Gl: [],
                        Hl: i
                    }, e = 0, r = 0; r < t.length; r++) {
                    for (var o = 0; o < t[r].length; o++)
                        for (var s = 0; s < i; s++) n.Fl.push(t[r][o][s]);
                    r > 0 && (e += t[r - 1].length, n.Gl.push(e))
                }
                return n
            }
        }, {}],
        16: [function(t, i, n) {
            "use strict";

            function e(t, i, n) {
                this.Yb = t, this.Xi = i, this.ve = n || !1
            }

            function r() {}
            var o = Object.prototype.hasOwnProperty,
                s = "function" != typeof Object.create && "~";
            r.prototype.Il = void 0, r.prototype.Jl = function() {
                var t, i = this.Il,
                    n = [];
                if (!i) return n;
                for (t in i) o.call(i, t) && n.push(s ? t.slice(1) : t);
                return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(i)) : n
            }, r.prototype.Kl = function(t, i) {
                var n = s ? s + t : t,
                    e = this.Il && this.Il[n];
                if (i) return !!e;
                if (!e) return [];
                if (e.Yb) return [e.Yb];
                for (var r = 0, o = e.length, h = new Array(o); r < o; r++) h[r] = e[r].Yb;
                return h
            }, r.prototype.Ll = function(t, i, n, e, r, o) {
                var h = s ? s + t : t;
                if (!this.Il || !this.Il[h]) return !1;
                var a, u, c = this.Il[h],
                    f = arguments.length;
                if ("function" == typeof c.Yb) {
                    switch (c.ve && this.Ml(t, c.Yb, void 0, !0), f) {
                        case 1:
                            return c.Yb.call(c.Xi), !0;
                        case 2:
                            return c.Yb.call(c.Xi, i), !0;
                        case 3:
                            return c.Yb.call(c.Xi, i, n), !0;
                        case 4:
                            return c.Yb.call(c.Xi, i, n, e), !0;
                        case 5:
                            return c.Yb.call(c.Xi, i, n, e, r), !0;
                        case 6:
                            return c.Yb.call(c.Xi, i, n, e, r, o), !0
                    }
                    for (u = 1, a = new Array(f - 1); u < f; u++) a[u - 1] = arguments[u];
                    c.Yb.apply(c.Xi, a)
                } else {
                    var l, p = c.length;
                    for (u = 0; u < p; u++) switch (c[u].ve && this.Ml(t, c[u].Yb, void 0, !0), f) {
                        case 1:
                            c[u].Yb.call(c[u].Xi);
                            break;
                        case 2:
                            c[u].Yb.call(c[u].Xi, i);
                            break;
                        case 3:
                            c[u].Yb.call(c[u].Xi, i, n);
                            break;
                        default:
                            if (!a)
                                for (l = 1, a = new Array(f - 1); l < f; l++) a[l - 1] = arguments[l];
                            c[u].Yb.apply(c[u].Xi, a)
                    }
                }
                return !0
            }, r.prototype.Lg = function(t, i, n) {
                var r = new e(i, n || this),
                    o = s ? s + t : t;
                return this.Il || (this.Il = s ? {} : Object.create(null)), this.Il[o] ? this.Il[o].Yb ? this.Il[o] = [this.Il[o], r] : this.Il[o].push(r) : this.Il[o] = r, this
            }, r.prototype.ve = function(t, i, n) {
                var r = new e(i, n || this, !0),
                    o = s ? s + t : t;
                return this.Il || (this.Il = s ? {} : Object.create(null)), this.Il[o] ? this.Il[o].Yb ? this.Il[o] = [this.Il[o], r] : this.Il[o].push(r) : this.Il[o] = r, this
            }, r.prototype.Ml = function(t, i, n, e) {
                var r = s ? s + t : t;
                if (!this.Il || !this.Il[r]) return this;
                var o = this.Il[r],
                    h = [];
                if (i)
                    if (o.Yb)(o.Yb !== i || e && !o.ve || n && o.Xi !== n) && h.push(o);
                    else
                        for (var a = 0, u = o.length; a < u; a++)(o[a].Yb !== i || e && !o[a].ve || n && o[a].Xi !== n) && h.push(o[a]);
                return h.length ? this.Il[r] = 1 === h.length ? h[0] : h : delete this.Il[r], this
            }, r.prototype.Nl = function(t) {
                return this.Il ? (t ? delete this.Il[s ? s + t : t] : this.Il = s ? {} : Object.create(null), this) : this
            }, r.prototype.pa = r.prototype.Ml, r.prototype.Ol = r.prototype.Lg, r.prototype.Pl = function() {
                return this
            }, r.Ql = s, "undefined" != typeof i && (i.r = r)
        }, {}],
        17: [function(i, n, e) {
            ! function(i) {
                var e = /iPhone/i,
                    r = /iPod/i,
                    o = /iPad/i,
                    s = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
                    h = /Android/i,
                    a = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
                    u = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
                    c = /IEMobile/i,
                    f = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
                    l = /BlackBerry/i,
                    p = /BB10/i,
                    v = /Opera Mini/i,
                    y = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
                    d = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
                    g = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
                    m = function(t, i) {
                        return t.test(i)
                    },
                    b = function(t) {
                        var i = t || navigator.Rl,
                            n = i.split("[FBAN");
                        if ("undefined" != typeof n[1] && (i = n[0]), n = i.split("Twitter"), "undefined" != typeof n[1] && (i = n[0]), this.Sl = {
                                Tl: m(e, i),
                                Ul: m(r, i),
                                Vl: !m(e, i) && m(o, i),
                                Wl: m(e, i) || m(r, i) || m(o, i)
                            }, this.Xl = {
                                Tl: m(a, i),
                                Vl: !m(a, i) && m(u, i),
                                Wl: m(a, i) || m(u, i)
                            }, this.Yl = {
                                Tl: m(a, i) || m(s, i),
                                Vl: !m(a, i) && !m(s, i) && (m(u, i) || m(h, i)),
                                Wl: m(a, i) || m(u, i) || m(s, i) || m(h, i)
                            }, this.Zl = {
                                Tl: m(c, i),
                                Vl: m(f, i),
                                Wl: m(c, i) || m(f, i)
                            }, this.$l = {
                                _l: m(l, i),
                                am: m(p, i),
                                bm: m(v, i),
                                cm: m(d, i),
                                dm: m(y, i),
                                Wl: m(l, i) || m(p, i) || m(v, i) || m(d, i) || m(y, i)
                            }, this.em = m(g, i), this.fm = this.Sl.Wl || this.Yl.Wl || this.Zl.Wl || this.$l.Wl || this.em, this.Tl = this.Sl.Tl || this.Yl.Tl || this.Zl.Tl, this.Vl = this.Sl.Vl || this.Yl.Vl || this.Zl.Vl, "undefined" == typeof window) return this
                    },
                    w = function() {
                        var t = new b;
                        return t.gm = b, t
                    };
                "undefined" != typeof n && n.r && "undefined" == typeof window ? n.r = b : "undefined" != typeof n && n.r && "undefined" != typeof window ? n.r = w() : "function" == typeof t && t.qk ? t("isMobile", [], i.hm = w()) : i.hm = w()
            }(this)
        }, {}],
        18: [function(t, i, n) {
            function e(t, i, n) {
                switch (n.length) {
                    case 0:
                        return t.call(i);
                    case 1:
                        return t.call(i, n[0]);
                    case 2:
                        return t.call(i, n[0], n[1]);
                    case 3:
                        return t.call(i, n[0], n[1], n[2])
                }
                return t.apply(i, n)
            }
            i.r = e
        }, {}],
        19: [function(t, i, n) {
            function e(t, i) {
                for (var n = -1, e = t ? t.length : 0; ++n < e && i(t[n], n, t) !== !1;);
                return t
            }
            i.r = e
        }, {}],
        20: [function(t, i, n) {
            function e(t, i) {
                var n = s(t) || o(t) ? r(t.length, String) : [],
                    e = n.length,
                    a = !!e;
                for (var c in t) !i && !u.call(t, c) || a && ("length" == c || h(c, e)) || n.push(c);
                return n
            }
            var r = t("./_baseTimes"),
                o = t("./isArguments"),
                s = t("./isArray"),
                h = t("./_isIndex"),
                a = Object.prototype,
                u = a.hasOwnProperty;
            i.r = e
        }, {
            im: 23,
            jm: 24,
            km: 28,
            lm: 29
        }],
        21: [function(t, i, n) {
            function e(t) {
                if (!r(t)) return o(t);
                var i = [];
                for (var n in Object(t)) h.call(t, n) && "constructor" != n && i.push(n);
                return i
            }
            var r = t("./_isPrototype"),
                o = t("./_nativeKeys"),
                s = Object.prototype,
                h = s.hasOwnProperty;
            i.r = e
        }, {
            mm: 25,
            nm: 26
        }],
        22: [function(t, i, n) {
            function e(t, i) {
                return i = o(void 0 === i ? t.length - 1 : i, 0),
                    function() {
                        for (var n = arguments, e = -1, s = o(n.length - i, 0), h = Array(s); ++e < s;) h[e] = n[i + e];
                        e = -1;
                        for (var a = Array(i + 1); ++e < i;) a[e] = n[e];
                        return a[i] = h, r(t, this, a)
                    }
            }
            var r = t("./_apply"),
                o = Math.max;
            i.r = e
        }, {
            om: 18
        }],
        23: [function(t, i, n) {
            function e(t, i) {
                for (var n = -1, e = Array(t); ++n < t;) e[n] = i(n);
                return e
            }
            i.r = e
        }, {}],
        24: [function(t, i, n) {
            function e(t, i) {
                return i = null == i ? r : i, !!i && ("number" == typeof t || o.test(t)) && t > -1 && t % 1 == 0 && t < i
            }
            var r = 9007199254740991,
                o = /^(?:0|[1-9]\d*)$/;
            i.r = e
        }, {}],
        25: [function(t, i, n) {
            function e(t) {
                var i = t && t.constructor,
                    n = "function" == typeof i && i.prototype || r;
                return t === n
            }
            var r = Object.prototype;
            i.r = e
        }, {}],
        26: [function(t, i, n) {
            var e = t("./_overArg"),
                r = e(Object.keys, Object);
            i.r = r
        }, {
            pm: 27
        }],
        27: [function(t, i, n) {
            function e(t, i) {
                return function(n) {
                    return t(i(n))
                }
            }
            i.r = e
        }, {}],
        28: [function(t, i, n) {
            function e(t) {
                return r(t) && h.call(t, "callee") && (!u.call(t, "callee") || a.call(t) == o)
            }
            var r = t("./isArrayLikeObject"),
                o = "[object Arguments]",
                s = Object.prototype,
                h = s.hasOwnProperty,
                a = s.toString,
                u = s.propertyIsEnumerable;
            i.r = e
        }, {
            qm: 31
        }],
        29: [function(t, i, n) {
            var e = Array.isArray;
            i.r = e
        }, {}],
        30: [function(t, i, n) {
            function e(t) {
                return null != t && o(t.length) && !r(t)
            }
            var r = t("./isFunction"),
                o = t("./isLength");
            i.r = e
        }, {
            rm: 32,
            sm: 33
        }],
        31: [function(t, i, n) {
            function e(t) {
                return o(t) && r(t)
            }
            var r = t("./isArrayLike"),
                o = t("./isObjectLike");
            i.r = e
        }, {
            tm: 30,
            um: 35
        }],
        32: [function(t, i, n) {
            function e(t) {
                var i = r(t) ? a.call(t) : "";
                return i == o || i == s
            }
            var r = t("./isObject"),
                o = "[object Function]",
                s = "[object GeneratorFunction]",
                h = Object.prototype,
                a = h.toString;
            i.r = e
        }, {
            vm: 34
        }],
        33: [function(t, i, n) {
            function e(t) {
                return "number" == typeof t && t > -1 && t % 1 == 0 && t <= r
            }
            var r = 9007199254740991;
            i.r = e
        }, {}],
        34: [function(t, i, n) {
            function e(t) {
                var i = typeof t;
                return !!t && ("object" == i || "function" == i)
            }
            i.r = e
        }, {}],
        35: [function(t, i, n) {
            function e(t) {
                return !!t && "object" == typeof t
            }
            i.r = e
        }, {}],
        36: [function(t, i, n) {
            function e(t) {
                return "symbol" == typeof t || r(t) && h.call(t) == o
            }
            var r = t("./isObjectLike"),
                o = "[object Symbol]",
                s = Object.prototype,
                h = s.toString;
            i.r = e
        }, {
            um: 35
        }],
        37: [function(t, i, n) {
            function e(t) {
                return s(t) ? r(t) : o(t)
            }
            var r = t("./_arrayLikeKeys"),
                o = t("./_baseKeys"),
                s = t("./isArrayLike");
            i.r = e
        }, {
            wm: 20,
            xm: 21,
            tm: 30
        }],
        38: [function(t, i, n) {
            function e() {}
            i.r = e
        }, {}],
        39: [function(t, i, n) {
            function e(t, i) {
                if ("function" != typeof t) throw new TypeError(s);
                return i = void 0 === i ? i : o(i), r(t, i)
            }
            var r = t("./_baseRest"),
                o = t("./toInteger"),
                s = "Expected a function";
            i.r = e
        }, {
            ym: 22,
            zm: 41
        }],
        40: [function(t, i, n) {
            function e(t) {
                if (!t) return 0 === t ? t : 0;
                if (t = r(t), t === o || t === -o) {
                    var i = t < 0 ? -1 : 1;
                    return i * s
                }
                return t === t ? t : 0
            }
            var r = t("./toNumber"),
                o = 1 / 0,
                s = 1.7976931348623157e308;
            i.r = e;
        }, {
            Am: 42
        }],
        41: [function(t, i, n) {
            function e(t) {
                var i = r(t),
                    n = i % 1;
                return i === i ? n ? i - n : i : 0
            }
            var r = t("./toFinite");
            i.r = e
        }, {
            Bm: 40
        }],
        42: [function(t, i, n) {
            function e(t) {
                if ("number" == typeof t) return t;
                if (o(t)) return s;
                if (r(t)) {
                    var i = "function" == typeof t.valueOf ? t.valueOf() : t;
                    t = r(i) ? i + "" : i
                }
                if ("string" != typeof t) return 0 === t ? t : +t;
                t = t.replace(h, "");
                var n = u.test(t);
                return n || c.test(t) ? f(t.slice(2), n ? 2 : 8) : a.test(t) ? s : +t
            }
            var r = t("./isObject"),
                o = t("./isSymbol"),
                s = NaN,
                h = /^\s+|\s+$/g,
                a = /^[-+]0x[0-9a-f]+$/i,
                u = /^0b[01]+$/i,
                c = /^0o[0-7]+$/i,
                f = parseInt;
            i.r = e
        }, {
            vm: 34,
            Cm: 36
        }],
        43: [function(t, i, n) {
            "use strict";

            function e(t) {
                if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(t)
            }

            function r() {
                try {
                    if (!Object.Dm) return !1;
                    var t = new String("abc");
                    if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
                    for (var i = {}, n = 0; n < 10; n++) i["_" + String.fromCharCode(n)] = n;
                    var e = Object.getOwnPropertyNames(i).map(function(t) {
                        return i[t]
                    });
                    if ("0123456789" !== e.join("")) return !1;
                    var r = {};
                    return "abcdefghijklmnopqrst".split("").forEach(function(t) {
                        r[t] = t
                    }), "abcdefghijklmnopqrst" === Object.keys(Object.Dm({}, r)).join("")
                } catch (t) {
                    return !1
                }
            }
            var o = Object.prototype.hasOwnProperty,
                s = Object.prototype.propertyIsEnumerable;
            i.r = r() ? Object.Dm : function(t, i) {
                for (var n, r, h = e(t), a = 1; a < arguments.length; a++) {
                    n = Object(arguments[a]);
                    for (var u in n) o.call(n, u) && (h[u] = n[u]);
                    if (Object.getOwnPropertySymbols) {
                        r = Object.getOwnPropertySymbols(n);
                        for (var c = 0; c < r.length; c++) s.call(n, r[c]) && (h[r[c]] = n[r[c]])
                    }
                }
                return h
            }
        }, {}],
        44: [function(t, i, n) {
            (function(t) {
                function i(t, i) {
                    for (var n = 0, e = t.length - 1; e >= 0; e--) {
                        var r = t[e];
                        "." === r ? t.splice(e, 1) : ".." === r ? (t.splice(e, 1), n++) : n && (t.splice(e, 1), n--)
                    }
                    if (i)
                        for (; n--; n) t.unshift("..");
                    return t
                }

                function e(t, i) {
                    if (t.filter) return t.filter(i);
                    for (var n = [], e = 0; e < t.length; e++) i(t[e], e, t) && n.push(t[e]);
                    return n
                }
                var r = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
                    o = function(t) {
                        return r.exec(t).slice(1)
                    };
                n.Ge = function() {
                    for (var n = "", r = !1, o = arguments.length - 1; o >= -1 && !r; o--) {
                        var s = o >= 0 ? arguments[o] : t.Em();
                        if ("string" != typeof s) throw new TypeError("Arguments to path.resolve must be strings");
                        s && (n = s + "/" + n, r = "/" === s.charAt(0))
                    }
                    return n = i(e(n.split("/"), function(t) {
                        return !!t
                    }), !r).join("/"), (r ? "/" : "") + n || "."
                }, n.normalize = function(t) {
                    var r = n.Fm(t),
                        o = "/" === s(t, -1);
                    return t = i(e(t.split("/"), function(t) {
                        return !!t
                    }), !r).join("/"), t || r || (t = "."), t && o && (t += "/"), (r ? "/" : "") + t
                }, n.Fm = function(t) {
                    return "/" === t.charAt(0)
                }, n.join = function() {
                    var t = Array.prototype.slice.call(arguments, 0);
                    return n.normalize(e(t, function(t, i) {
                        if ("string" != typeof t) throw new TypeError("Arguments to path.join must be strings");
                        return t
                    }).join("/"))
                }, n.Bc = function(t, i) {
                    function e(t) {
                        for (var i = 0; i < t.length && "" === t[i]; i++);
                        for (var n = t.length - 1; n >= 0 && "" === t[n]; n--);
                        return i > n ? [] : t.slice(i, n - i + 1)
                    }
                    t = n.Ge(t).substr(1), i = n.Ge(i).substr(1);
                    for (var r = e(t.split("/")), o = e(i.split("/")), s = Math.min(r.length, o.length), h = s, a = 0; a < s; a++)
                        if (r[a] !== o[a]) {
                            h = a;
                            break
                        }
                    for (var u = [], a = h; a < r.length; a++) u.push("..");
                    return u = u.concat(o.slice(h)), u.join("/")
                }, n.Gm = "/", n.Hm = ":", n.Im = function(t) {
                    var i = o(t),
                        n = i[0],
                        e = i[1];
                    return n || e ? (e && (e = e.substr(0, e.length - 1)), n + e) : "."
                }, n.Jm = function(t, i) {
                    var n = o(t)[2];
                    return i && n.substr(-1 * i.length) === i && (n = n.substr(0, n.length - i.length)), n
                }, n.Km = function(t) {
                    return o(t)[3]
                };
                var s = "b" === "ab".substr(-1) ? function(t, i, n) {
                    return t.substr(i, n)
                } : function(t, i, n) {
                    return i < 0 && (i = t.length + i), t.substr(i, n)
                }
            }).call(this, t("_process"))
        }, {
            jl: 61
        }],
        45: [function(t, i, n) {
            var e = new ArrayBuffer(0),
                r = function(t, i, n, r) {
                    this.Lm = t, this.Sk = t.Mm(), this.z = i || t.Nm, this.Om = r || t.Pm, this.Wb = e, n && this.Qm(n)
                };
            r.prototype.Qm = function(t, i, n) {
                n || this.bind();
                var e = this.Lm;
                t = t || this.Wb, i = i || 0, this.Wb.Rm >= t.Rm ? e.Sm(this.z, i, t) : e.Tm(this.z, t, this.Om), this.Wb = t
            }, r.prototype.bind = function() {
                var t = this.Lm;
                t.Um(this.z, this.Sk)
            }, r.Vm = function(t, i, n) {
                return new r(t, t.Nm, i, n)
            }, r.Wm = function(t, i, n) {
                return new r(t, t.Xm, i, n)
            }, r.create = function(t, i, n, e) {
                return new r(t, i, e)
            }, r.prototype.Ym = function() {
                this.Lm.Zm(this.Sk)
            }, i.r = r
        }, {}],
        46: [function(t, i, n) {
            var e = t("./GLTexture"),
                r = function(t, i, n) {
                    this.Lm = t, this.$m = t._m(), this.an = null, this.bn = null, this.Ka = i || 100, this.Ua = n || 100
                };
            r.prototype.cn = function(t) {
                var i = this.Lm;
                this.bn = t || new e(i), this.bn.bind(), this.bind(), i.dn(i.en, i.fn, i.gn, this.bn.bn, 0)
            }, r.prototype.hn = function() {
                if (!this.an) {
                    var t = this.Lm;
                    this.an = t.in(), t.jn(t.kn, this.an), t.ln(t.en, t.mn, t.kn, this.an), t.nn(t.kn, t.on, this.Ka, this.Ua)
                }
            }, r.prototype.pn = function(t, i, n, e) {
                this.bind();
                var r = this.Lm;
                r.qn(t, i, n, e), r.pn(r.rn)
            }, r.prototype.bind = function() {
                var t = this.Lm;
                this.bn && this.bn.mk(), t.sn(t.en, this.$m)
            }, r.prototype.mk = function() {
                var t = this.Lm;
                t.sn(t.en, null)
            }, r.prototype.tn = function(t, i) {
                var n = this.Lm;
                this.Ka = t, this.Ua = i, this.bn && this.bn.un(null, t, i), this.an && (n.jn(n.kn, this.an), n.nn(n.kn, n.on, t, i))
            }, r.prototype.Ym = function() {
                var t = this.Lm;
                this.bn && this.bn.Ym(), t.vn(this.$m), this.Lm = null, this.an = null, this.bn = null
            }, r.wn = function(t, i, n) {
                var o = e.xn(t, null, i, n);
                o.yn(), o.zn();
                var s = new r(t, i, n);
                return s.cn(o), s.mk(), s
            }, r.An = function(t, i, n, o) {
                var s = new e.xn(t, o, i, n);
                s.yn(), s.zn();
                var h = new r(t, i, n);
                return h.cn(s), h.mk(), h
            }, i.r = r
        }, {
            Bn: 48
        }],
        47: [function(t, i, n) {
            var e = t("./shader/compileProgram"),
                r = t("./shader/extractAttributes"),
                o = t("./shader/extractUniforms"),
                s = t("./shader/generateUniformAccessObject"),
                h = function(t, i, n) {
                    this.Lm = t, this.Cn = e(t, i, n), this.Uc = r(t, this.Cn);
                    var h = o(t, this.Cn);
                    this.Dn = s(t, h)
                };
            h.prototype.bind = function() {
                this.Lm.En(this.Cn)
            }, h.prototype.Ym = function() {}, i.r = h
        }, {
            Fn: 53,
            Gn: 55,
            Hn: 56,
            In: 57
        }],
        48: [function(t, i, n) {
            var e = function(t, i, n, e, r) {
                this.Lm = t, this.bn = t.Jn(), this.Kn = !1, this.Ln = !1, this.Ka = i || 0, this.Ua = n || 0, this.Mn = e || t.Nn, this.z = r || t.On
            };
            e.prototype.Qm = function(t) {
                this.bind();
                var i = this.Lm;
                this.Ka = t.Pn || t.Ka, this.Ua = t.Qn || t.Ua, i.Rn(i.Sn, this.Ln), i.Tn(i.gn, 0, this.Mn, this.Mn, this.z, t)
            };
            var r = !1;
            e.prototype.un = function(t, i, n) {
                this.bind();
                var e = this.Lm;
                if (this.Ka = i || this.Ka, this.Ua = n || this.Ua, t instanceof Float32Array) {
                    if (!r) {
                        var o = e.Un("OES_texture_float");
                        if (!o) throw new Error("floating point textures not available");
                        r = !0
                    }
                    this.z = e.Vn
                } else this.z = e.On;
                e.Rn(e.Sn, this.Ln), e.Tn(e.gn, 0, this.Mn, this.Ka, this.Ua, 0, this.Mn, this.z, t || null)
            }, e.prototype.bind = function(t) {
                var i = this.Lm;
                void 0 !== t && i.Wn(i.Xn + t), i.Yn(i.gn, this.bn)
            }, e.prototype.mk = function() {
                var t = this.Lm;
                t.Yn(t.gn, null)
            }, e.prototype.Zn = function(t) {
                var i = this.Lm;
                this.bind(), this.Kn ? i.$n(i.gn, i._n, t ? i.ao : i.bo) : i.$n(i.gn, i._n, t ? i.co : i.do)
            }, e.prototype.eo = function(t) {
                var i = this.Lm;
                this.bind(), i.$n(i.gn, i.fo, t ? i.co : i.do)
            }, e.prototype.go = function() {
                var t = this.Lm;
                this.bind(), this.Kn = !0, t.ho(t.gn)
            }, e.prototype.io = function() {
                this.Zn(!0), this.eo(!0)
            }, e.prototype.yn = function() {
                this.Zn(!1), this.eo(!1)
            }, e.prototype.zn = function() {
                var t = this.Lm;
                this.bind(), t.$n(t.gn, t.jo, t.ko), t.$n(t.gn, t.lo, t.ko)
            }, e.prototype.mo = function() {
                var t = this.Lm;
                this.bind(), t.$n(t.gn, t.jo, t.no), t.$n(t.gn, t.lo, t.no)
            }, e.prototype.oo = function() {
                var t = this.Lm;
                this.bind(), t.$n(t.gn, t.jo, t.po), t.$n(t.gn, t.lo, t.po)
            }, e.prototype.Ym = function() {
                var t = this.Lm;
                t.qo(this.bn)
            }, e.ro = function(t, i, n) {
                var r = new e(t);
                return r.Ln = n || !1, r.Qm(i), r
            }, e.xn = function(t, i, n, r) {
                var o = new e(t);
                return o.un(i, n, r), o
            }, i.r = e
        }, {}],
        49: [function(t, i, n) {
            function e(t, i) {
                if (this.so = null, e.to || (this.so = t.Un("OES_vertex_array_object") || t.Un("MOZ_OES_vertex_array_object") || t.Un("WEBKIT_OES_vertex_array_object")), this.uo = i, this.so) {
                    this.vo = this.so.wo();
                    var n = t.xo(t.yo);
                    this.uo = {
                        zo: new Array(n),
                        Ao: new Array(n)
                    }
                }
                this.Lm = t, this.Uc = [], this.Bo = null, this.Co = !1
            }
            var r = t("./setVertexAttribArrays");
            e.prototype.constructor = e, i.r = e, e.to = !1, e.prototype.bind = function() {
                return this.vo ? (this.so.Do(this.vo), this.Co && (this.Co = !1, this.Eo())) : this.Eo(), this
            }, e.prototype.mk = function() {
                return this.vo && this.so.Do(null), this
            }, e.prototype.Eo = function() {
                for (var t = this.Lm, i = null, n = 0; n < this.Uc.length; n++) {
                    var e = this.Uc[n];
                    i !== e.Sk && (e.Sk.bind(), i = e.Sk), t.Fo(e.Go.Ad, e.Go.Ho, e.z || t.Vn, e.Io || !1, e.Jo || 0, e.V || 0)
                }
                return r(t, this.Uc, this.uo), this.Bo.bind(), this
            }, e.prototype.Ko = function(t, i, n, e, r, o) {
                return this.Uc.push({
                    Sk: t,
                    Go: i,
                    Ad: i.Ad,
                    z: n || this.Lm.Vn,
                    Io: e || !1,
                    Jo: r || 0,
                    V: o || 0
                }), this.Co = !0, this
            }, e.prototype.Lo = function(t) {
                return this.Bo = t, this.Co = !0, this
            }, e.prototype.pn = function() {
                return this.vo && this.so.Do(this.vo), this.Uc.length = 0, this.Bo = null, this
            }, e.prototype.Mo = function(t, i, n) {
                var e = this.Lm;
                return e.No(t, i, e.Oo, n || 0), this
            }, e.prototype.Ym = function() {
                this.Lm = null, this.Bo = null, this.Uc = null, this.uo = null, this.vo && this.so.Po(this.vo), this.so = null, this.vo = null
            }
        }, {
            Qo: 52
        }],
        50: [function(t, i, n) {
            var e = function(t, i) {
                var n = t.Ro("webgl", i) || t.Ro("experimental-webgl", i);
                if (!n) throw new Error("This browser does not support webGL. Try using the canvas renderer");
                return n
            };
            i.r = e
        }, {}],
        51: [function(t, i, n) {
            var e = {
                So: t("./createContext"),
                To: t("./setVertexAttribArrays"),
                Uo: t("./GLBuffer"),
                Vo: t("./GLFramebuffer"),
                Wo: t("./GLShader"),
                Xo: t("./GLTexture"),
                Yo: t("./VertexArrayObject"),
                b: t("./shader")
            };
            "undefined" != typeof i && i.r && (i.r = e), "undefined" != typeof window && (window.Zo = {
                Lm: e
            })
        }, {
            $o: 45,
            _o: 46,
            ap: 47,
            Bn: 48,
            bp: 49,
            cp: 50,
            Qo: 52,
            dp: 58
        }],
        52: [function(t, i, n) {
            var e = function(t, i, n) {
                var e;
                if (n) {
                    var r = n.zo,
                        o = n.Ao;
                    for (e = 0; e < r.length; e++) r[e] = !1;
                    for (e = 0; e < i.length; e++) r[i[e].Go.Ad] = !0;
                    for (e = 0; e < o.length; e++) o[e] !== r[e] && (o[e] = r[e], n.Ao[e] ? t.ep(e) : t.fp(e))
                } else
                    for (e = 0; e < i.length; e++) {
                        var s = i[e];
                        t.ep(s.Go.Ad)
                    }
            };
            i.r = e
        }, {}],
        53: [function(t, i, n) {
            var e = function(t, i, n) {
                    var e = r(t, t.gp, i),
                        o = r(t, t.hp, n),
                        s = t.d();
                    return t.e(s, e), t.e(s, o), t.f(s), t.ip(s, t.jp) || (console.Vb("Pixi.js Error: Could not initialize shader."), console.Vb("gl.VALIDATE_STATUS", t.ip(s, t.kp)), console.Vb("gl.getError()", t.lp()), "" !== t.mp(s) && console.Ne("Pixi.js Warning: gl.getProgramInfoLog()", t.mp(s)), t.np(s), s = null), t.op(e), t.op(o), s
                },
                r = function(t, i, n) {
                    var e = t.pp(i);
                    return t.qp(e, n), t.rp(e), t.sp(e, t.tp) ? e : (console.log(t.up(e)), null)
                };
            i.r = e
        }, {}],
        54: [function(t, i, n) {
            var e = function(t, i) {
                    switch (t) {
                        case "float":
                            return 0;
                        case "vec2":
                            return new Float32Array(2 * i);
                        case "vec3":
                            return new Float32Array(3 * i);
                        case "vec4":
                            return new Float32Array(4 * i);
                        case "int":
                        case "sampler2D":
                            return 0;
                        case "ivec2":
                            return new Int32Array(2 * i);
                        case "ivec3":
                            return new Int32Array(3 * i);
                        case "ivec4":
                            return new Int32Array(4 * i);
                        case "bool":
                            return !1;
                        case "bvec2":
                            return r(2 * i);
                        case "bvec3":
                            return r(3 * i);
                        case "bvec4":
                            return r(4 * i);
                        case "mat2":
                            return new Float32Array([1, 0, 0, 1]);
                        case "mat3":
                            return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
                        case "mat4":
                            return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                    }
                },
                r = function(t) {
                    for (var i = new Array(t), n = 0; n < i.length; n++) i[n] = !1;
                    return i
                };
            i.r = e
        }, {}],
        55: [function(t, i, n) {
            var e = t("./mapType"),
                r = t("./mapSize"),
                o = function(t, i) {
                    for (var n = {}, o = t.ip(i, t.vp), h = 0; h < o; h++) {
                        var a = t.wp(i, h),
                            u = e(t, a.z);
                        n[a.name] = {
                            z: u,
                            Ho: r(u),
                            Ad: t.xp(i, a.name),
                            yp: s
                        }
                    }
                    return n
                },
                s = function(t, i, n, e) {
                    f.Fo(this.Ad, this.Ho, t || f.Vn, i || !1, n || 0, e || 0)
                };
            i.r = o
        }, {
            zp: 59,
            Ap: 60
        }],
        56: [function(t, i, n) {
            var e = t("./mapType"),
                r = t("./defaultValue"),
                o = function(t, i) {
                    for (var n = {}, o = t.ip(i, t.Bp), s = 0; s < o; s++) {
                        var h = t.Cp(i, s),
                            a = h.name.replace(/\[.*?\]/, ""),
                            u = e(t, h.z);
                        n[a] = {
                            z: u,
                            Ho: h.Ho,
                            Ad: t.Dp(i, a),
                            xc: r(u, h.Ho)
                        }
                    }
                    return n
                };
            i.r = o
        }, {
            Ep: 54,
            Ap: 60
        }],
        57: [function(t, i, n) {
            var e = function(t, i) {
                    var n = {
                        Wb: {}
                    };
                    n.Lm = t;
                    for (var e = Object.keys(i), h = 0; h < e.length; h++) {
                        var a = e[h],
                            u = a.split("."),
                            c = u[u.length - 1],
                            f = s(u, n),
                            l = i[a];
                        f.Wb[c] = l, f.Lm = t, Object.defineProperty(f, c, {
                            _: r(c),
                            P: o(c, l)
                        })
                    }
                    return n
                },
                r = function(t) {
                    var i = h.replace("%%", t);
                    return new Function(i)
                },
                o = function(t, i) {
                    var n, e = a.replace(/%%/g, t);
                    return n = 1 === i.Ho ? u[i.z] : c[i.z], n && (e += "\nthis.gl." + n + ";"), new Function("value", e)
                },
                s = function(t, i) {
                    for (var n = i, e = 0; e < t.length - 1; e++) {
                        var r = n[t[e]] || {
                            Wb: {}
                        };
                        n[t[e]] = r, n = r
                    }
                    return n
                },
                h = ["return this.data.%%.value;"].join("\n"),
                a = ["this.data.%%.value = value;", "var location = this.data.%%.location;"].join("\n"),
                u = {
                    wh: "uniform1f(location, value)",
                    Fp: "uniform2f(location, value[0], value[1])",
                    Gp: "uniform3f(location, value[0], value[1], value[2])",
                    Hp: "uniform4f(location, value[0], value[1], value[2], value[3])",
                    Ip: "uniform1i(location, value)",
                    Jp: "uniform2i(location, value[0], value[1])",
                    Kp: "uniform3i(location, value[0], value[1], value[2])",
                    Lp: "uniform4i(location, value[0], value[1], value[2], value[3])",
                    Mc: "uniform1i(location, value)",
                    Mp: "uniform2i(location, value[0], value[1])",
                    Np: "uniform3i(location, value[0], value[1], value[2])",
                    Op: "uniform4i(location, value[0], value[1], value[2], value[3])",
                    Pp: "uniformMatrix2fv(location, false, value)",
                    Qp: "uniformMatrix3fv(location, false, value)",
                    Rp: "uniformMatrix4fv(location, false, value)",
                    Sp: "uniform1i(location, value)"
                },
                c = {
                    wh: "uniform1fv(location, value)",
                    Fp: "uniform2fv(location, value)",
                    Gp: "uniform3fv(location, value)",
                    Hp: "uniform4fv(location, value)",
                    Ip: "uniform1iv(location, value)",
                    Jp: "uniform2iv(location, value)",
                    Kp: "uniform3iv(location, value)",
                    Lp: "uniform4iv(location, value)",
                    Mc: "uniform1iv(location, value)",
                    Mp: "uniform2iv(location, value)",
                    Np: "uniform3iv(location, value)",
                    Op: "uniform4iv(location, value)",
                    Sp: "uniform1iv(location, value)"
                };
            i.r = e
        }, {}],
        58: [function(t, i, n) {
            i.r = {
                Tp: t("./compileProgram"),
                Aa: t("./defaultValue"),
                Up: t("./extractAttributes"),
                Vp: t("./extractUniforms"),
                Wp: t("./generateUniformAccessObject"),
                Xp: t("./mapSize"),
                Yp: t("./mapType")
            }
        }, {
            Zp: 53,
            Ep: 54,
            $p: 55,
            _p: 56,
            aq: 57,
            zp: 59,
            Ap: 60
        }],
        59: [function(t, i, n) {
            var e = function(t) {
                    return r[t]
                },
                r = {
                    wh: 1,
                    Fp: 2,
                    Gp: 3,
                    Hp: 4,
                    Ip: 1,
                    Jp: 2,
                    Kp: 3,
                    Lp: 4,
                    Mc: 1,
                    Mp: 2,
                    Np: 3,
                    Op: 4,
                    Pp: 4,
                    Qp: 9,
                    Rp: 16,
                    Sp: 1
                };
            i.r = e
        }, {}],
        60: [function(t, i, n) {
            var e = function(t, i) {
                    if (!r) {
                        var n = Object.keys(o);
                        r = {};
                        for (var e = 0; e < n.length; ++e) {
                            var s = n[e];
                            r[t[s]] = o[s]
                        }
                    }
                    return r[i]
                },
                r = null,
                o = {
                    Vn: "float",
                    bq: "vec2",
                    cq: "vec3",
                    dq: "vec4",
                    eq: "int",
                    fq: "ivec2",
                    gq: "ivec3",
                    hq: "ivec4",
                    iq: "bool",
                    jq: "bvec2",
                    kq: "bvec3",
                    lq: "bvec4",
                    mq: "mat2",
                    nq: "mat3",
                    oq: "mat4",
                    pq: "sampler2D"
                };
            i.r = e
        }, {}],
        61: [function(t, i, n) {
            function e() {
                throw new Error("setTimeout has not been defined")
            }

            function r() {
                throw new Error("clearTimeout has not been defined")
            }

            function o(t) {
                if (f === setTimeout) return setTimeout(t, 0);
                if ((f === e || !f) && setTimeout) return f = setTimeout, setTimeout(t, 0);
                try {
                    return f(t, 0)
                } catch (i) {
                    try {
                        return f.call(null, t, 0)
                    } catch (i) {
                        return f.call(this, t, 0)
                    }
                }
            }

            function s(t) {
                if (l === clearTimeout) return clearTimeout(t);
                if ((l === r || !l) && clearTimeout) return l = clearTimeout, clearTimeout(t);
                try {
                    return l(t)
                } catch (i) {
                    try {
                        return l.call(null, t)
                    } catch (i) {
                        return l.call(this, t)
                    }
                }
            }

            function h() {
                d && v && (d = !1, v.length ? y = v.concat(y) : g = -1, y.length && a())
            }

            function a() {
                if (!d) {
                    var t = o(h);
                    d = !0;
                    for (var i = y.length; i;) {
                        for (v = y, y = []; ++g < i;) v && v[g].rb();
                        g = -1, i = y.length
                    }
                    v = null, d = !1, s(t)
                }
            }

            function u(t, i) {
                this.qq = t, this.rq = i
            }

            function c() {}
            var f, l, p = i.r = {};
            ! function() {
                try {
                    f = "function" == typeof setTimeout ? setTimeout : e
                } catch (t) {
                    f = e
                }
                try {
                    l = "function" == typeof clearTimeout ? clearTimeout : r
                } catch (t) {
                    l = r
                }
            }();
            var v, y = [],
                d = !1,
                g = -1;
            p.il = function(t) {
                var i = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++) i[n - 1] = arguments[n];
                y.push(new u(t, i)), 1 !== y.length || d || o(a)
            }, u.prototype.rb = function() {
                this.qq.apply(null, this.rq)
            }, p.sq = "browser", p.tq = !0, p.uq = {}, p.vq = [], p.wq = "", p.xq = {}, p.Lg = c, p.Ol = c, p.ve = c, p.pa = c, p.Ml = c, p.Nl = c, p.Ll = c, p.yq = function(t) {
                throw new Error("process.binding is not supported")
            }, p.Em = function() {
                return "/"
            }, p.zq = function(t) {
                throw new Error("process.chdir is not supported")
            }, p.Aq = function() {
                return 0
            }
        }, {}],
        62: [function(i, n, e) {
            (function(i) {
                ! function(r) {
                    function o(t) {
                        throw new RangeError(A[t])
                    }

                    function s(t, i) {
                        for (var n = t.length, e = []; n--;) e[n] = i(t[n]);
                        return e
                    }

                    function h(t, i) {
                        var n = t.split("@"),
                            e = "";
                        n.length > 1 && (e = n[0] + "@", t = n[1]), t = t.replace(_, ".");
                        var r = t.split("."),
                            o = s(r, i).join(".");
                        return e + o
                    }

                    function a(t) {
                        for (var i, n, e = [], r = 0, o = t.length; r < o;) i = t.charCodeAt(r++), i >= 55296 && i <= 56319 && r < o ? (n = t.charCodeAt(r++), 56320 == (64512 & n) ? e.push(((1023 & i) << 10) + (1023 & n) + 65536) : (e.push(i), r--)) : e.push(i);
                        return e
                    }

                    function u(t) {
                        return s(t, function(t) {
                            var i = "";
                            return t > 65535 && (t -= 65536, i += L(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), i += L(t)
                        }).join("")
                    }

                    function c(t) {
                        return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : M
                    }

                    function f(t, i) {
                        return t + 22 + 75 * (t < 26) - ((0 != i) << 5)
                    }

                    function l(t, i, n) {
                        var e = 0;
                        for (t = n ? S(t / j) : t >> 1, t += S(t / i); t > D * z >> 1; e += M) t = S(t / D);
                        return S(e + (D + 1) * t / (t + I))
                    }

                    function p(t) {
                        var i, n, e, r, s, h, a, f, p, v, y = [],
                            d = t.length,
                            g = 0,
                            m = K,
                            b = T;
                        for (n = t.lastIndexOf(U), n < 0 && (n = 0), e = 0; e < n; ++e) t.charCodeAt(e) >= 128 && o("not-basic"), y.push(t.charCodeAt(e));
                        for (r = n > 0 ? n + 1 : 0; r < d;) {
                            for (s = g, h = 1, a = M; r >= d && o("invalid-input"), f = c(t.charCodeAt(r++)), (f >= M || f > S((C - g) / h)) && o("overflow"), g += f * h, p = a <= b ? F : a >= b + z ? z : a - b, !(f < p); a += M) v = M - p, h > S(C / v) && o("overflow"), h *= v;
                            i = y.length + 1, b = l(g - s, i, 0 == s), S(g / i) > C - m && o("overflow"), m += S(g / i), g %= i, y.splice(g++, 0, m)
                        }
                        return u(y)
                    }

                    function v(t) {
                        var i, n, e, r, s, h, u, c, p, v, y, d, g, m, b, w = [];
                        for (t = a(t), d = t.length, i = K, n = 0, s = T, h = 0; h < d; ++h) y = t[h], y < 128 && w.push(L(y));
                        for (e = r = w.length, r && w.push(U); e < d;) {
                            for (u = C, h = 0; h < d; ++h) y = t[h], y >= i && y < u && (u = y);
                            for (g = e + 1, u - i > S((C - n) / g) && o("overflow"), n += (u - i) * g, i = u, h = 0; h < d; ++h)
                                if (y = t[h], y < i && ++n > C && o("overflow"), y == i) {
                                    for (c = n, p = M; v = p <= s ? F : p >= s + z ? z : p - s, !(c < v); p += M) b = c - v, m = M - v, w.push(L(f(v + b % m, 0))), c = S(b / m);
                                    w.push(L(f(c, 0))), s = l(n, g, e == r), n = 0, ++e
                                }++n, ++i
                        }
                        return w.join("")
                    }

                    function y(t) {
                        return h(t, function(t) {
                            return O.test(t) ? p(t.slice(4).toLowerCase()) : t
                        })
                    }

                    function d(t) {
                        return h(t, function(t) {
                            return W.test(t) ? "xn--" + v(t) : t
                        })
                    }
                    var g = "object" == typeof e && e && !e.D && e,
                        m = "object" == typeof n && n && !n.D && n,
                        b = "object" == typeof i && i;
                    b.global !== b && b.gc !== b && b.Bq !== b || (r = b);
                    var w, x, C = 2147483647,
                        M = 36,
                        F = 1,
                        z = 26,
                        I = 38,
                        j = 700,
                        T = 72,
                        K = 128,
                        U = "-",
                        O = /^xn--/,
                        W = /[^\x20-\x7E]/,
                        _ = /[\x2E\u3002\uFF0E\uFF61]/g,
                        A = {
                            db: "Overflow: input needs wider integers to process",
                            Cq: "Illegal input >= 0x80 (not a basic code point)",
                            Dq: "Invalid input"
                        },
                        D = M - F,
                        S = Math.floor,
                        L = String.fromCharCode;
                    if (w = {
                            wq: "1.4.1",
                            Eq: {
                                Fq: a,
                                Gq: u
                            },
                            Fq: p,
                            Gq: v,
                            Hq: d,
                            Iq: y
                        }, "function" == typeof t && "object" == typeof t.qk && t.qk) t("punycode", function() {
                        return w
                    });
                    else if (g && m)
                        if (n.r == g) m.r = w;
                        else
                            for (x in w) w.hasOwnProperty(x) && (g[x] = w[x]);
                    else r.Jq = w
                }(this)
            }).call(this, "undefined" != typeof I ? I : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        63: [function(t, i, n) {
            "use strict";

            function e(t, i) {
                return Object.prototype.hasOwnProperty.call(t, i)
            }
            i.r = function(t, i, n, o) {
                i = i || "&", n = n || "=";
                var s = {};
                if ("string" != typeof t || 0 === t.length) return s;
                var h = /\+/g;
                t = t.split(i);
                var a = 1e3;
                o && "number" == typeof o.Kq && (a = o.Kq);
                var u = t.length;
                a > 0 && u > a && (u = a);
                for (var c = 0; c < u; ++c) {
                    var f, l, p, v, y = t[c].replace(h, "%20"),
                        d = y.indexOf(n);
                    d >= 0 ? (f = y.substr(0, d), l = y.substr(d + 1)) : (f = y, l = ""), p = decodeURIComponent(f), v = decodeURIComponent(l), e(s, p) ? r(s[p]) ? s[p].push(v) : s[p] = [s[p], v] : s[p] = v
                }
                return s
            };
            var r = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }
        }, {}],
        64: [function(t, i, n) {
            "use strict";

            function e(t, i) {
                if (t.map) return t.map(i);
                for (var n = [], e = 0; e < t.length; e++) n.push(i(t[e], e));
                return n
            }
            var r = function(t) {
                switch (typeof t) {
                    case "string":
                        return t;
                    case "boolean":
                        return t ? "true" : "false";
                    case "number":
                        return isFinite(t) ? t : "";
                    default:
                        return ""
                }
            };
            i.r = function(t, i, n, h) {
                return i = i || "&", n = n || "=", null === t && (t = void 0), "object" == typeof t ? e(s(t), function(s) {
                    var h = encodeURIComponent(r(s)) + n;
                    return o(t[s]) ? e(t[s], function(t) {
                        return h + encodeURIComponent(r(t))
                    }).join(i) : h + encodeURIComponent(r(t[s]))
                }).join(i) : h ? encodeURIComponent(r(h)) + n + encodeURIComponent(r(t)) : ""
            };
            var o = Array.isArray || function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                },
                s = Object.keys || function(t) {
                    var i = [];
                    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && i.push(n);
                    return i
                }
        }, {}],
        65: [function(t, i, n) {
            "use strict";
            n.Fq = n.parse = t("./decode"), n.Gq = n.Lq = t("./encode")
        }, {
            Mq: 63,
            Nq: 64
        }],
        66: [function(t, i, n) {
            "use strict";

            function e(t, i) {
                a.call(this), i = i || u, this.Oq = t || "", this.Hb = 0, this.Pq = !1, this.Qq = 0, this.Rq = [], this.Sq = [], this.Tq = this.Uq.bind(this), this.Vq = [], this.Wq = 0, this.Xq = r(this.Tq, i), this.Yq = {}
            }
            var r = t("async/queue"),
                o = t("async/eachSeries"),
                s = t("url"),
                h = t("./Resource"),
                a = t("eventemitter3"),
                u = 10,
                c = 100;
            e.prototype = Object.create(a.prototype), e.prototype.constructor = e, i.r = e, e.prototype.ra = e.prototype.Zq = function(t, i, n, e) {
                if (Array.isArray(t)) {
                    for (var r = 0; r < t.length; ++r) this.ra(t[r]);
                    return this
                }
                if ("object" == typeof t && (e = i || t.Ok || t.$q, n = t, i = t.Ki, t = t.name || t.sg || t.Ki), "string" != typeof i && (e = n, n = i, i = t), "string" != typeof i) throw new Error("No url passed to add resource to loader.");
                if ("function" == typeof n && (e = n, n = null), this.Yq[t]) throw new Error('Resource with name "' + t + '" already exists.');
                return i = this._q(i), this.Yq[t] = new h(t, i, n), "function" == typeof e && this.Yq[t].ve("afterMiddleware", e), this.Wq++, this.Xq.Lk ? (this.Xq.push(this.Yq[t]), this.Qq = (c - this.Hb) / (this.Xq.length() + this.Xq.Yk())) : (this.Vq.push(this.Yq[t]), this.Qq = c / this.Vq.length), this
            }, e.prototype.Rg = e.prototype.ar = function(t) {
                return this.Rq.push(t), this
            }, e.prototype.Sg = e.prototype.br = function(t) {
                return this.Sq.push(t), this
            }, e.prototype.Yd = function() {
                this.Hb = 0, this.Pq = !1, this.Qq = 0, this.Vq.length = 0, this.Wq = 0, this.Xq.Xk(), this.Xq.Lk = !1;
                for (var t in this.Yq) {
                    var i = this.Yq[t];
                    i.pa("complete", this.cr, this), i.dr && i.hj()
                }
                return this.Yq = {}, this
            }, e.prototype.Tf = function(t) {
                if ("function" == typeof t && this.ve("complete", t), this.Xq.Lk) return this;
                this.Ll("start", this), this.Pq = !0;
                for (var i = 0; i < this.Vq.length; ++i) this.Xq.push(this.Vq[i]);
                return this.Vq.length = 0, this
            }, e.prototype._q = function(t) {
                var i = s.parse(t);
                return i.Mi || !i.er || 0 === i.er.indexOf("//") ? t : this.Oq.length && this.Oq.lastIndexOf("/") !== this.Oq.length - 1 && "/" !== t.charAt(0) ? this.Oq + "/" + t : this.Oq + t
            }, e.prototype.Uq = function(t, i) {
                var n = this;
                t.fr = i, o(this.Rq, function(i, e) {
                    i.call(n, t, function() {
                        e(t.gr ? {} : null)
                    })
                }, function() {
                    t.gr ? n.cr(t) : (t.ve("complete", n.cr, n), t.Tf())
                })
            }, e.prototype.hr = function() {
                this.Pq = !1, this.Ll("complete", this, this.Yq)
            }, e.prototype.cr = function(t) {
                var i = this;
                o(this.Sq, function(n, e) {
                    n.call(i, t, e)
                }, function() {
                    t.Ll("afterMiddleware", t), i.Wq--, i.Hb += i.Qq, i.Ll("progress", i, t), t.Vb ? i.Ll("error", t.Vb, i, t) : i.Ll("load", i, t), 0 === i.Wq && (i.Hb = 100, i.hr())
                }), t.fr()
            }, e.ir = h.ir, e.jr = h.jr
        }, {
            kr: 67,
            lr: 2,
            mr: 13,
            nr: 16,
            Ki: 72
        }],
        67: [function(t, i, n) {
            "use strict";

            function e(t, i, n) {
                if (s.call(this), n = n || {}, "string" != typeof t || "string" != typeof i) throw new Error("Both name and url are required for constructing a resource.");
                this.name = t, this.Ki = i, this.or = 0 === this.Ki.indexOf("data:"), this.Wb = null, this.pr = n.pr === !0 ? "anonymous" : n.pr, this.qr = n.qr || this.rr(), this.sr = n.sr, this.tr = n.tr || {}, this.Vb = null, this.Cj = null, this.ur = !1, this.vr = !1, this.wr = !1, this.xr = !1, this.yr = !1, this.gr = !1, this.dr = !1, this.fr = null, this.zr = this.Ib.bind(this), this.Ar = this.Br.bind(this), this.Cr = this.Dr.bind(this), this.Er = this.Fr.bind(this), this.Gr = this.Hr.bind(this), this.Ir = this.Jr.bind(this), this.Kr = this.Lr.bind(this)
            }

            function r(t) {
                return t.toString().replace("object ", "")
            }

            function o(t, i, n) {
                i && 0 === i.indexOf(".") && (i = i.substring(1)), i && (t[i] = n)
            }
            var s = t("eventemitter3"),
                h = t("url"),
                a = !(!window.Mr || "withCredentials" in new XMLHttpRequest),
                u = null,
                c = 0,
                f = 200,
                l = 204;
            e.prototype = Object.create(s.prototype), e.prototype.constructor = e, i.r = e, e.prototype.Ib = function() {
                if (this.Wb && this.Wb.K && (this.Wb.K("error", this.Ar, !1), this.Wb.K("load", this.zr, !1), this.Wb.K("progress", this.Cr, !1), this.Wb.K("canplaythrough", this.zr, !1)), this.Cj && (this.Cj.K ? (this.Cj.K("error", this.Er, !1), this.Cj.K("abort", this.Gr, !1), this.Cj.K("progress", this.Cr, !1), this.Cj.K("load", this.Ir, !1)) : (this.Cj.Kj = null, this.Cj.Nr = null, this.Cj.Or = null, this.Cj.Jj = null)), this.gr) throw new Error("Complete called again for an already completed resource.");
                this.gr = !0, this.dr = !1, this.Ll("complete", this)
            }, e.prototype.hj = function(t) {
                if (!this.Vb) {
                    if (this.Vb = new Error(t), this.Cj) this.Cj.hj();
                    else if (this.Pr) this.Pr.hj();
                    else if (this.Wb)
                        if ("undefined" != typeof this.Wb.Fa) this.Wb.Fa = "";
                        else
                            for (; this.Wb.ja;) this.Wb.v(this.Wb.ja);
                    this.Ib()
                }
            }, e.prototype.Tf = function(t) {
                if (!this.dr)
                    if (this.gr) {
                        if (t) {
                            var i = this;
                            setTimeout(function() {
                                t(i)
                            }, 1)
                        }
                    } else switch (t && this.ve("complete", t), this.dr = !0, this.Ll("start", this), this.pr !== !1 && "string" == typeof this.pr || (this.pr = this.Qr(this.Ki)), this.qr) {
                        case e.ir.Rr:
                            this.Sr("image");
                            break;
                        case e.ir.Tr:
                            this.Ur("audio");
                            break;
                        case e.ir.Vr:
                            this.Ur("video");
                            break;
                        case e.ir.Wr:
                        default:
                            a && this.pr ? this.Xr() : this.Yr()
                    }
            }, e.prototype.Sr = function(t) {
                this.tr.Zr ? this.Wb = this.tr.Zr : "image" === t && "undefined" != typeof window.$r ? this.Wb = new Image : this.Wb = document.t(t), this.pr && (this.Wb.pr = this.pr), this.tr._r || (this.Wb.Fa = this.Ki);
                var i = "is" + t[0].toUpperCase() + t.substring(1);
                this[i] === !1 && (this[i] = !0), this.Wb.Sc("error", this.Ar, !1), this.Wb.Sc("load", this.zr, !1), this.Wb.Sc("progress", this.Cr, !1)
            }, e.prototype.Ur = function(t) {
                if (this.tr.Zr ? this.Wb = this.tr.Zr : "audio" === t && "undefined" != typeof window.as ? this.Wb = new Audio : this.Wb = document.t(t), null === this.Wb) return void this.hj("Unsupported element " + t);
                if (!this.tr._r)
                    if (navigator.bs) this.Wb.Fa = Array.isArray(this.Ki) ? this.Ki[0] : this.Ki;
                    else if (Array.isArray(this.Ki))
                    for (var i = 0; i < this.Ki.length; ++i) this.Wb.x(this.cs(t, this.Ki[i]));
                else this.Wb.x(this.cs(t, this.Ki));
                this["is" + t[0].toUpperCase() + t.substring(1)] = !0, this.Wb.Sc("error", this.Ar, !1), this.Wb.Sc("load", this.zr, !1), this.Wb.Sc("progress", this.Cr, !1), this.Wb.Sc("canplaythrough", this.zr, !1), this.Wb.Tf()
            }, e.prototype.Yr = function() {
                "string" != typeof this.sr && (this.sr = this.ds());
                var t = this.Cj = new XMLHttpRequest;
                t.Fj("GET", this.Ki, !0), this.sr === e.jr.es || this.sr === e.jr.fs ? t.Nj = e.jr.gs : t.Nj = this.sr, t.Sc("error", this.Er, !1), t.Sc("abort", this.Gr, !1), t.Sc("progress", this.Cr, !1), t.Sc("load", this.Ir, !1), t.rj()
            }, e.prototype.Xr = function() {
                "string" != typeof this.sr && (this.sr = this.ds());
                var t = this.Cj = new XDomainRequest;
                t.qj = 5e3, t.Kj = this.Er, t.Nr = this.Kr, t.Or = this.Cr, t.Jj = this.Ir, t.Fj("GET", this.Ki, !0), setTimeout(function() {
                    t.rj()
                }, 0)
            }, e.prototype.cs = function(t, i, n) {
                n || (n = t + "/" + i.substr(i.lastIndexOf(".") + 1));
                var e = document.t("source");
                return e.Fa = i, e.z = n, e
            }, e.prototype.Br = function(t) {
                this.hj("Failed to load element using " + t.zd.Y)
            }, e.prototype.Dr = function(t) {
                t && t.hs && this.Ll("progress", this, t.js / t.ks)
            }, e.prototype.Fr = function() {
                var t = this.Cj;
                this.hj(r(t) + " Request failed. Status: " + t.bj + ', text: "' + t.cj + '"')
            }, e.prototype.Hr = function() {
                this.hj(r(this.Cj) + " Request was aborted by the user.")
            }, e.prototype.Lr = function() {
                this.hj(r(this.Cj) + " Request timed out.")
            }, e.prototype.Jr = function() {
                var t = this.Cj,
                    i = "undefined" == typeof t.bj ? t.bj : f;
                if (!(i === f || i === l || i === c && t.Oj.length > 0)) return void this.hj("[" + t.bj + "]" + t.cj + ":" + t.ls);
                if (this.sr === e.jr.gs) this.Wb = t.Oj;
                else if (this.sr === e.jr.es) try {
                    this.Wb = JSON.parse(t.Oj), this.ur = !0
                } catch (t) {
                    return void this.hj("Error trying to parse loaded json:", t)
                } else if (this.sr === e.jr.fs) try {
                    if (window.Di) {
                        var n = new DOMParser;
                        this.Wb = n.Ci(t.Oj, "text/xml")
                    } else {
                        var r = document.t("div");
                        r.fa = t.Oj, this.Wb = r
                    }
                    this.vr = !0
                } catch (t) {
                    return void this.hj("Error trying to parse loaded xml:", t)
                } else this.Wb = t.Qj || t.Oj;
                this.Ib()
            }, e.prototype.Qr = function(t, i) {
                if (0 === t.indexOf("data:")) return "";
                i = i || window.Ad, u || (u = document.t("a")), u.Fd = t, t = h.parse(u.Fd);
                var n = !t.ms && "" === i.ms || t.ms === i.ms;
                return t.ns === i.ns && n && t.Mi === i.Mi ? "" : "anonymous"
            }, e.prototype.ds = function() {
                return e.os[this.ps()] || e.jr.gs
            }, e.prototype.rr = function() {
                return e.qs[this.ps()] || e.ir.Wr
            }, e.prototype.ps = function() {
                var t = this.Ki,
                    i = "";
                if (this.or) {
                    var n = t.indexOf("/");
                    i = t.substring(n + 1, t.indexOf(";", n))
                } else {
                    var e = t.indexOf("?");
                    e !== -1 && (t = t.substring(0, e)), i = t.substring(t.lastIndexOf(".") + 1)
                }
                return i.toLowerCase()
            }, e.prototype.rs = function(t) {
                switch (t) {
                    case e.jr.ss:
                        return "application/octet-binary";
                    case e.jr.ts:
                        return "application/blob";
                    case e.jr.fs:
                        return "application/xml";
                    case e.jr.es:
                        return "application/json";
                    case e.jr.us:
                    case e.jr.gs:
                    default:
                        return "text/plain"
                }
            }, e.ir = {
                Wr: 1,
                Rr: 2,
                Tr: 3,
                Vr: 4
            }, e.jr = {
                us: "text",
                ss: "arraybuffer",
                ts: "blob",
                fs: "document",
                es: "json",
                gs: "text"
            }, e.qs = {
                vs: e.ir.Rr,
                ws: e.ir.Rr,
                xs: e.ir.Rr,
                ys: e.ir.Rr,
                zs: e.ir.Rr,
                As: e.ir.Rr,
                Bs: e.ir.Rr,
                Cs: e.ir.Rr,
                Ds: e.ir.Rr,
                Es: e.ir.Rr
            }, e.os = {
                Fs: e.jr.fs,
                Da: e.jr.fs,
                Gs: e.jr.fs,
                Ri: e.jr.fs,
                Hs: e.jr.fs,
                Is: e.jr.fs,
                Js: e.jr.fs,
                vs: e.jr.ts,
                ws: e.jr.ts,
                xs: e.jr.ts,
                ys: e.jr.ts,
                zs: e.jr.ts,
                As: e.jr.ts,
                Bs: e.jr.ts,
                Cs: e.jr.ts,
                Ds: e.jr.ts,
                Si: e.jr.es,
                u: e.jr.gs,
                Ks: e.jr.gs
            }, e.Ls = function(t, i) {
                o(e.qs, t, i)
            }, e.Ms = function(t, i) {
                o(e.os, t, i)
            }
        }, {
            nr: 16,
            Ki: 72
        }],
        68: [function(t, i, n) {
            "use strict";
            i.r = {
                Ns: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                Os: function(t) {
                    for (var i, n = "", e = new Array(4), r = 0, o = 0, s = 0; r < t.length;) {
                        for (i = new Array(3), o = 0; o < i.length; o++) r < t.length ? i[o] = 255 & t.charCodeAt(r++) : i[o] = 0;
                        switch (e[0] = i[0] >> 2, e[1] = (3 & i[0]) << 4 | i[1] >> 4, e[2] = (15 & i[1]) << 2 | i[2] >> 6, e[3] = 63 & i[2], s = r - (t.length - 1)) {
                            case 2:
                                e[3] = 64, e[2] = 64;
                                break;
                            case 1:
                                e[3] = 64
                        }
                        for (o = 0; o < e.length; o++) n += this.Ns.charAt(e[o])
                    }
                    return n
                }
            }
        }, {}],
        69: [function(t, i, n) {
            "use strict";
            i.r = t("./Loader"), i.r.Ps = t("./Resource"), i.r.Qs = {
                Rs: {
                    xe: t("./middlewares/caching/memory")
                },
                Ss: {
                    Ts: t("./middlewares/parsing/blob")
                }
            }
        }, {
            Us: 66,
            kr: 67,
            Vs: 70,
            Ws: 71
        }],
        70: [function(t, i, n) {
            "use strict";
            var e = {};
            i.r = function() {
                return function(t, i) {
                    e[t.Ki] ? (t.Wb = e[t.Ki], t.Ib()) : t.ve("complete", function() {
                        e[this.Ki] = this.Wb
                    }), i()
                }
            }
        }, {}],
        71: [function(t, i, n) {
            "use strict";
            var e = t("../../Resource"),
                r = t("../../b64"),
                o = window.Xs || window.Ys;
            i.r = function() {
                return function(t, i) {
                    if (!t.Wb) return void i();
                    if (t.Cj && t.sr === e.jr.ts)
                        if (window.Zs && "string" != typeof t.Wb) {
                            if (0 === t.Wb.z.indexOf("image")) {
                                var n = o.$s(t.Wb);
                                return t.Ts = t.Wb, t.Wb = new Image, t.Wb.Fa = n, t.wr = !0, void(t.Wb.Jj = function() {
                                    o._s(n), t.Wb.Jj = null, i()
                                })
                            }
                        } else {
                            var s = t.Cj.Ob("content-type");
                            if (s && 0 === s.indexOf("image")) return t.Wb = new Image, t.Wb.Fa = "data:" + s + ";base64," + r.Os(t.Cj.Oj), t.wr = !0, void(t.Wb.Jj = function() {
                                t.Wb.Jj = null, i()
                            })
                        }
                    i()
                }
            }
        }, {
            at: 67,
            bt: 68
        }],
        72: [function(t, i, n) {
            "use strict";

            function e() {
                this.Mi = null, this.ct = null, this.dt = null, this.kj = null, this.ms = null, this.ns = null, this.Bd = null, this.search = null, this.et = null, this.er = null, this.ft = null, this.Fd = null
            }

            function r(t, i, n) {
                if (t && u.gt(t) && t instanceof e) return t;
                var r = new e;
                return r.parse(t, i, n), r
            }

            function o(t) {
                return u.ht(t) && (t = r(t)), t instanceof e ? t.Mn() : e.prototype.Mn.call(t)
            }

            function s(t, i) {
                return r(t, !1, !0).Ge(i)
            }

            function h(t, i) {
                return t ? r(t, !1, !0).it(i) : i
            }
            var a = t("punycode"),
                u = t("./util");
            n.parse = r, n.Ge = s, n.it = h, n.Mn = o, n.jt = e;
            var c = /^([a-z0-9.+-]+:)/i,
                f = /:[0-9]*$/,
                l = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
                p = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
                v = ["{", "}", "|", "\\", "^", "`"].concat(p),
                y = ["'"].concat(v),
                d = ["%", "/", "?", ";", "#"].concat(y),
                g = ["/", "?", "#"],
                m = 255,
                b = /^[+a-z0-9A-Z_-]{0,63}$/,
                w = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
                x = {
                    kt: !0,
                    lt: !0
                },
                C = {
                    kt: !0,
                    lt: !0
                },
                M = {
                    mt: !0,
                    nt: !0,
                    ot: !0,
                    pt: !0,
                    Ud: !0,
                    qt: !0,
                    rt: !0,
                    st: !0,
                    tt: !0,
                    ut: !0
                },
                F = t("querystring");
            e.prototype.parse = function(t, i, n) {
                if (!u.ht(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
                var e = t.indexOf("?"),
                    r = e !== -1 && e < t.indexOf("#") ? "?" : "#",
                    o = t.split(r),
                    s = /\\/g;
                o[0] = o[0].replace(s, "/"), t = o.join(r);
                var h = t;
                if (h = h.trim(), !n && 1 === t.split("#").length) {
                    var f = l.exec(h);
                    if (f) return this.ft = h, this.Fd = h, this.er = f[1], f[2] ? (this.search = f[2], i ? this.et = F.parse(this.search.substr(1)) : this.et = this.search.substr(1)) : i && (this.search = "", this.et = {}), this
                }
                var p = c.exec(h);
                if (p) {
                    p = p[0];
                    var v = p.toLowerCase();
                    this.Mi = v, h = h.substr(p.length)
                }
                if (n || p || h.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var z = "//" === h.substr(0, 2);
                    !z || p && C[p] || (h = h.substr(2), this.ct = !0)
                }
                if (!C[p] && (z || p && !M[p])) {
                    for (var I = -1, j = 0; j < g.length; j++) {
                        var T = h.indexOf(g[j]);
                        T !== -1 && (I === -1 || T < I) && (I = T)
                    }
                    var K, U;
                    U = I === -1 ? h.lastIndexOf("@") : h.lastIndexOf("@", I), U !== -1 && (K = h.slice(0, U), h = h.slice(U + 1), this.dt = decodeURIComponent(K)), I = -1;
                    for (var j = 0; j < d.length; j++) {
                        var T = h.indexOf(d[j]);
                        T !== -1 && (I === -1 || T < I) && (I = T)
                    }
                    I === -1 && (I = h.length), this.kj = h.slice(0, I), h = h.slice(I), this.vt(), this.ns = this.ns || "";
                    var O = "[" === this.ns[0] && "]" === this.ns[this.ns.length - 1];
                    if (!O)
                        for (var W = this.ns.split(/\./), j = 0, _ = W.length; j < _; j++) {
                            var A = W[j];
                            if (A && !A.match(b)) {
                                for (var D = "", S = 0, L = A.length; S < L; S++) D += A.charCodeAt(S) > 127 ? "x" : A[S];
                                if (!D.match(b)) {
                                    var X = W.slice(0, j),
                                        P = W.slice(j + 1),
                                        E = A.match(w);
                                    E && (X.push(E[1]), P.unshift(E[2])), P.length && (h = "/" + P.join(".") + h), this.ns = X.join(".");
                                    break
                                }
                            }
                        }
                    this.ns.length > m ? this.ns = "" : this.ns = this.ns.toLowerCase(), O || (this.ns = a.Hq(this.ns));
                    var k = this.ms ? ":" + this.ms : "",
                        Y = this.ns || "";
                    this.kj = Y + k, this.Fd += this.kj, O && (this.ns = this.ns.substr(1, this.ns.length - 2), "/" !== h[0] && (h = "/" + h))
                }
                if (!x[v])
                    for (var j = 0, _ = y.length; j < _; j++) {
                        var V = y[j];
                        if (h.indexOf(V) !== -1) {
                            var R = encodeURIComponent(V);
                            R === V && (R = escape(V)), h = h.split(V).join(R)
                        }
                    }
                var N = h.indexOf("#");
                N !== -1 && (this.Bd = h.substr(N), h = h.slice(0, N));
                var B = h.indexOf("?");
                if (B !== -1 ? (this.search = h.substr(B), this.et = h.substr(B + 1), i && (this.et = F.parse(this.et)), h = h.slice(0, B)) : i && (this.search = "", this.et = {}), h && (this.er = h), M[v] && this.ns && !this.er && (this.er = "/"), this.er || this.search) {
                    var k = this.er || "",
                        H = this.search || "";
                    this.ft = k + H
                }
                return this.Fd = this.Mn(), this
            }, e.prototype.Mn = function() {
                var t = this.dt || "";
                t && (t = encodeURIComponent(t), t = t.replace(/%3A/i, ":"), t += "@");
                var i = this.Mi || "",
                    n = this.er || "",
                    e = this.Bd || "",
                    r = !1,
                    o = "";
                this.kj ? r = t + this.kj : this.ns && (r = t + (this.ns.indexOf(":") === -1 ? this.ns : "[" + this.ns + "]"), this.ms && (r += ":" + this.ms)), this.et && u.gt(this.et) && Object.keys(this.et).length && (o = F.Lq(this.et));
                var s = this.search || o && "?" + o || "";
                return i && ":" !== i.substr(-1) && (i += ":"), this.ct || (!i || M[i]) && r !== !1 ? (r = "//" + (r || ""), n && "/" !== n.charAt(0) && (n = "/" + n)) : r || (r = ""), e && "#" !== e.charAt(0) && (e = "#" + e), s && "?" !== s.charAt(0) && (s = "?" + s), n = n.replace(/[?#]/g, function(t) {
                    return encodeURIComponent(t)
                }), s = s.replace("#", "%23"), i + r + n + s + e
            }, e.prototype.Ge = function(t) {
                return this.it(r(t, !1, !0)).Mn()
            }, e.prototype.it = function(t) {
                if (u.ht(t)) {
                    var i = new e;
                    i.parse(t, !1, !0), t = i
                }
                for (var n = new e, r = Object.keys(this), o = 0; o < r.length; o++) {
                    var s = r[o];
                    n[s] = this[s]
                }
                if (n.Bd = t.Bd, "" === t.Fd) return n.Fd = n.Mn(), n;
                if (t.ct && !t.Mi) {
                    for (var h = Object.keys(t), a = 0; a < h.length; a++) {
                        var c = h[a];
                        "protocol" !== c && (n[c] = t[c])
                    }
                    return M[n.Mi] && n.ns && !n.er && (n.ft = n.er = "/"), n.Fd = n.Mn(), n
                }
                if (t.Mi && t.Mi !== n.Mi) {
                    if (!M[t.Mi]) {
                        for (var f = Object.keys(t), l = 0; l < f.length; l++) {
                            var p = f[l];
                            n[p] = t[p]
                        }
                        return n.Fd = n.Mn(), n
                    }
                    if (n.Mi = t.Mi, t.kj || C[t.Mi]) n.er = t.er;
                    else {
                        for (var v = (t.er || "").split("/"); v.length && !(t.kj = v.shift()););
                        t.kj || (t.kj = ""), t.ns || (t.ns = ""), "" !== v[0] && v.unshift(""), v.length < 2 && v.unshift(""), n.er = v.join("/")
                    }
                    if (n.search = t.search, n.et = t.et, n.kj = t.kj || "", n.dt = t.dt, n.ns = t.ns || t.kj, n.ms = t.ms, n.er || n.search) {
                        var y = n.er || "",
                            d = n.search || "";
                        n.ft = y + d
                    }
                    return n.ct = n.ct || t.ct, n.Fd = n.Mn(), n
                }
                var g = n.er && "/" === n.er.charAt(0),
                    m = t.kj || t.er && "/" === t.er.charAt(0),
                    b = m || g || n.kj && t.er,
                    w = b,
                    x = n.er && n.er.split("/") || [],
                    v = t.er && t.er.split("/") || [],
                    F = n.Mi && !M[n.Mi];
                if (F && (n.ns = "", n.ms = null, n.kj && ("" === x[0] ? x[0] = n.kj : x.unshift(n.kj)), n.kj = "", t.Mi && (t.ns = null, t.ms = null, t.kj && ("" === v[0] ? v[0] = t.kj : v.unshift(t.kj)), t.kj = null), b = b && ("" === v[0] || "" === x[0])), m) n.kj = t.kj || "" === t.kj ? t.kj : n.kj, n.ns = t.ns || "" === t.ns ? t.ns : n.ns, n.search = t.search, n.et = t.et, x = v;
                else if (v.length) x || (x = []), x.pop(), x = x.concat(v), n.search = t.search, n.et = t.et;
                else if (!u.wt(t.search)) {
                    if (F) {
                        n.ns = n.kj = x.shift();
                        var z = !!(n.kj && n.kj.indexOf("@") > 0) && n.kj.split("@");
                        z && (n.dt = z.shift(), n.kj = n.ns = z.shift())
                    }
                    return n.search = t.search, n.et = t.et, u.xt(n.er) && u.xt(n.search) || (n.ft = (n.er ? n.er : "") + (n.search ? n.search : "")), n.Fd = n.Mn(), n
                }
                if (!x.length) return n.er = null, n.search ? n.ft = "/" + n.search : n.ft = null, n.Fd = n.Mn(), n;
                for (var I = x.slice(-1)[0], j = (n.kj || t.kj || x.length > 1) && ("." === I || ".." === I) || "" === I, T = 0, K = x.length; K >= 0; K--) I = x[K], "." === I ? x.splice(K, 1) : ".." === I ? (x.splice(K, 1), T++) : T && (x.splice(K, 1), T--);
                if (!b && !w)
                    for (; T--; T) x.unshift("..");
                !b || "" === x[0] || x[0] && "/" === x[0].charAt(0) || x.unshift(""), j && "/" !== x.join("/").substr(-1) && x.push("");
                var U = "" === x[0] || x[0] && "/" === x[0].charAt(0);
                if (F) {
                    n.ns = n.kj = U ? "" : x.length ? x.shift() : "";
                    var z = !!(n.kj && n.kj.indexOf("@") > 0) && n.kj.split("@");
                    z && (n.dt = z.shift(), n.kj = n.ns = z.shift())
                }
                return b = b || n.kj && x.length, b && !U && x.unshift(""), x.length ? n.er = x.join("/") : (n.er = null, n.ft = null), u.xt(n.er) && u.xt(n.search) || (n.ft = (n.er ? n.er : "") + (n.search ? n.search : "")), n.dt = t.dt || n.dt, n.ct = n.ct || t.ct, n.Fd = n.Mn(), n
            }, e.prototype.vt = function() {
                var t = this.kj,
                    i = f.exec(t);
                i && (i = i[0], ":" !== i && (this.ms = i.substr(1)), t = t.substr(0, t.length - i.length)), t && (this.ns = t)
            }
        }, {
            yt: 73,
            Jq: 62,
            zt: 65
        }],
        73: [function(t, i, n) {
            "use strict";
            i.r = {
                ht: function(t) {
                    return "string" == typeof t
                },
                gt: function(t) {
                    return "object" == typeof t && null !== t
                },
                xt: function(t) {
                    return null === t
                },
                wt: function(t) {
                    return null == t
                }
            }
        }, {}],
        74: [function(t, i, n) {
            function e(t) {
                (o.Vl || o.Tl) && this.At();
                var i = document.t("div");
                i.T.Ka = "100px", i.T.Ua = "100px", i.T.gh = "absolute", i.T.Rc = 0, i.T.xh = 0, i.T.th = 2, this.Bt = i, this.Ct = [], this.Dt = 0, this.Et = !1, this.Ft = t, this.he = [], this.Gt = this.Gt.bind(this), this.Ht = this.Ht.bind(this), this.It = !1, this.Jt = !1, window.Sc("keydown", this.Gt, !1)
            }
            var r = t("../core"),
                o = t("ismobilejs");
            Object.Dm(r.Kt.prototype, t("./accessibleTarget")), e.prototype.constructor = e, i.r = e, e.prototype.At = function() {
                var t = document.t("button");
                t.T.Ka = "1px", t.T.Ua = "1px", t.T.gh = "absolute", t.T.Rc = "-1000px", t.T.xh = "-1000px", t.T.th = 2, t.T.Lt = "#FF0000", t.sq = "HOOK DIV", t.Sc("focus", function() {
                    this.Jt = !0, this.Eo(), document.Z.v(t)
                }.bind(this)), document.Z.x(t)
            }, e.prototype.Eo = function() {
                this.It || (this.It = !0, window.s.Sc("mousemove", this.Ht, !0), window.K("keydown", this.Gt, !1), this.Ft.Lg("postrender", this.Mt, this), this.Ft.pg.w && this.Ft.pg.w.x(this.Bt))
            }, e.prototype.Nt = function() {
                this.It && !this.Jt && (this.It = !1, window.s.K("mousemove", this.Ht), window.Sc("keydown", this.Gt, !1), this.Ft.pa("postrender", this.Mt), this.Bt.w && this.Bt.w.v(this.Bt))
            }, e.prototype.Ot = function(t) {
                if (t.zj) {
                    t.Pt && t.Qt && (t.Rt || this.St(t), t.Dt = this.Dt);
                    for (var i = t.he, n = i.length - 1; n >= 0; n--) this.Ot(i[n])
                }
            }, e.prototype.Mt = function() {
                if (this.Ft.Tt) {
                    this.Ot(this.Ft.Ut);
                    var t = this.Ft.pg.Oa(),
                        i = t.Ka / this.Ft.Ka,
                        n = t.Ua / this.Ft.Ua,
                        e = this.Bt;
                    e.T.xh = t.xh + "px", e.T.Rc = t.Rc + "px", e.T.Ka = this.Ft.Ka + "px", e.T.Ua = this.Ft.Ua + "px";
                    for (var o = 0; o < this.he.length; o++) {
                        var s = this.he[o];
                        if (s.Dt !== this.Dt) s.Rt = !1, r.Wt.Vt(this.he, o, 1), this.Bt.v(s.Xt), this.Ct.push(s.Xt), s.Xt = null, o--, 0 === this.he.length && this.Nt();
                        else {
                            e = s.Xt;
                            var h = s.Yt,
                                a = s.Zt;
                            s.Yt ? (e.T.xh = (a.$t + h.g * a._t) * i + "px", e.T.Rc = (a.au + h.h * a.bu) * n + "px", e.T.Ka = h.Ka * a._t * i + "px", e.T.Ua = h.Ua * a.bu * n + "px") : (h = s.cu(), this.du(h), e.T.xh = h.g * i + "px", e.T.Rc = h.h * n + "px", e.T.Ka = h.Ka * i + "px", e.T.Ua = h.Ua * n + "px")
                        }
                    }
                    this.Dt++
                }
            }, e.prototype.du = function(t) {
                t.g < 0 && (t.Ka += t.g, t.g = 0), t.h < 0 && (t.Ua += t.h, t.h = 0), t.g + t.Ka > this.Ft.Ka && (t.Ka = this.Ft.Ka - t.g), t.h + t.Ua > this.Ft.Ua && (t.Ua = this.Ft.Ua - t.h)
            }, e.prototype.St = function(t) {
                var i = this.Ct.pop();
                i || (i = document.t("button"), i.T.Ka = "100px", i.T.Ua = "100px", i.T.Lt = this.Et ? "rgba(255,0,0,0.5)" : "transparent", i.T.gh = "absolute", i.T.th = 2, i.T.eu = "none", i.Sc("click", this.fu.bind(this)), i.Sc("focus", this.gu.bind(this)), i.Sc("focusout", this.hu.bind(this))), t.iu ? i.sq = t.iu : t.iu || t.ju || (i.sq = "displayObject " + this.Gd), t.ju && i.qc("aria-label", t.ju), t.Rt = !0, t.Xt = i, i.ku = t, this.he.push(t), this.Bt.x(t.Xt), t.Xt.Gd = t.Gd
            }, e.prototype.fu = function(t) {
                var i = this.Ft.mu.lu;
                i.nu(t.zd.ku, "click", i.ou)
            }, e.prototype.gu = function(t) {
                var i = this.Ft.mu.lu;
                i.nu(t.zd.ku, "mouseover", i.ou)
            }, e.prototype.hu = function(t) {
                var i = this.Ft.mu.lu;
                i.nu(t.zd.ku, "mouseout", i.ou)
            }, e.prototype.Gt = function(t) {
                9 === t.tg && this.Eo()
            }, e.prototype.Ht = function() {
                this.Nt()
            }, e.prototype.Ym = function() {
                this.Bt = null;
                for (var t = 0; t < this.he.length; t++) this.he[t].Bt = null;
                window.s.K("mousemove", this.Ht), window.K("keydown", this.Gt), this.Ct = null, this.he = null, this.Ft = null
            }, r.qu.pu("accessibility", e), r.ru.pu("accessibility", e)
        }, {
            su: 97,
            tu: 75,
            uu: 17
        }],
        75: [function(t, i, n) {
            var e = {
                Pt: !1,
                iu: null,
                ju: null,
                Gd: 0,
                Rt: !1,
                Xt: !1
            };
            i.r = e
        }, {}],
        76: [function(t, i, n) {
            i.r = {
                vu: t("./accessibleTarget"),
                wu: t("./AccessibilityManager")
            }
        }, {
            xu: 74,
            tu: 75
        }],
        77: [function(t, i, n) {
            function e(t) {
                if (t instanceof Array) {
                    if ("precision" !== t[0].substring(0, 9)) {
                        var i = t.slice(0);
                        return i.unshift("precision " + o.yu.us + " float;"), i
                    }
                } else if ("precision" !== t.substring(0, 9)) return "precision " + o.yu.us + " float;\n" + t;
                return t
            }
            var r = t("pixi-gl-core").Wo,
                o = t("./const"),
                s = function(t, i, n) {
                    r.call(this, t, e(i), e(n))
                };
            s.prototype = Object.create(r.prototype), s.prototype.constructor = s, i.r = s
        }, {
            zu: 78,
            Au: 51
        }],
        78: [function(t, i, n) {
            var e = {
                Bu: "4.0.1",
                Cu: 2 * Math.PI,
                Du: 180 / Math.PI,
                Eu: Math.PI / 180,
                Fu: .06,
                Gu: {
                    Hu: 0,
                    Iu: 1,
                    Ju: 2
                },
                Ku: {
                    Lu: 0,
                    Mu: 1,
                    Nu: 2,
                    Ou: 3,
                    Pu: 4,
                    Qu: 5,
                    Ru: 6,
                    Su: 7,
                    Tu: 8,
                    Uu: 9,
                    Vu: 10,
                    Wu: 11,
                    Xu: 12,
                    Yu: 13,
                    Zu: 14,
                    $u: 15,
                    _u: 16
                },
                av: {
                    bv: 0,
                    cv: 1,
                    dv: 2,
                    ev: 3,
                    fv: 4,
                    gv: 5,
                    hv: 6
                },
                iv: {
                    us: 0,
                    co: 0,
                    do: 1
                },
                jv: {
                    us: 0,
                    kv: 0,
                    no: 1,
                    po: 2
                },
                lv: {
                    us: 0,
                    mv: 0,
                    nv: 1
                },
                ov: !0,
                pv: /@(.+)x/,
                qv: 1,
                rv: 1,
                sv: {
                    pg: null,
                    tv: 1,
                    uv: !1,
                    vv: !1,
                    wv: !1,
                    xv: !1,
                    Lt: 0,
                    yv: !0,
                    zv: !1,
                    Av: !1
                },
                Bv: {
                    Cv: 0,
                    Dv: 1,
                    Ev: 2,
                    Fv: 3,
                    Gv: 4
                },
                yu: {
                    us: "mediump",
                    Hv: "lowp",
                    Iv: "mediump",
                    Jv: "highp"
                },
                Kv: {
                    us: 0,
                    Lv: 0,
                    Mv: 1
                },
                Nv: {
                    Ov: 0,
                    Pv: 1
                },
                Qv: 4096,
                Rv: t("./utils/maxRecommendedTextures")(32)
            };
            i.r = e
        }, {
            Sv: 152
        }],
        79: [function(t, i, n) {
            function e() {
                this.Tv = 1 / 0, this.Uv = 1 / 0, this.Vv = -(1 / 0), this.Wv = -(1 / 0), this.Xv = null
            }
            var r = t("../math"),
                o = r.Yv;
            e.prototype.constructor = e, i.r = e, e.prototype.Zv = function() {
                return this.Tv > this.Vv || this.Uv > this.Wv
            }, e.prototype.pn = function() {
                this.$v++, this.Tv = 1 / 0, this.Uv = 1 / 0, this.Vv = -(1 / 0), this.Wv = -(1 / 0)
            }, e.prototype._v = function(t) {
                return this.Tv > this.Vv || this.Uv > this.Wv ? o.aw : (t = t || new o(0, 0, 1, 1), t.g = this.Tv, t.h = this.Uv, t.Ka = this.Vv - this.Tv, t.Ua = this.Wv - this.Uv, t)
            }, e.prototype.bw = function(t) {
                this.Tv = Math.min(this.Tv, t.g), this.Vv = Math.max(this.Vv, t.g), this.Uv = Math.min(this.Uv, t.h), this.Wv = Math.max(this.Wv, t.h)
            }, e.prototype.cw = function(t) {
                var i = this.Tv,
                    n = this.Uv,
                    e = this.Vv,
                    r = this.Wv,
                    o = t[0],
                    s = t[1];
                i = o < i ? o : i, n = s < n ? s : n, e = o > e ? o : e, r = s > r ? s : r, o = t[2], s = t[3], i = o < i ? o : i, n = s < n ? s : n, e = o > e ? o : e, r = s > r ? s : r, o = t[4], s = t[5], i = o < i ? o : i, n = s < n ? s : n, e = o > e ? o : e, r = s > r ? s : r, o = t[6], s = t[7], i = o < i ? o : i, n = s < n ? s : n, e = o > e ? o : e, r = s > r ? s : r, this.Tv = i, this.Uv = n, this.Vv = e, this.Wv = r
            }, e.prototype.dw = function(t, i, n, e, r) {
                var o = t.Zt,
                    s = o._t,
                    h = o.ew,
                    a = o.fw,
                    u = o.bu,
                    c = o.$t,
                    f = o.au,
                    l = this.Tv,
                    p = this.Uv,
                    v = this.Vv,
                    y = this.Wv,
                    d = s * i + a * n + c,
                    g = h * i + u * n + f;
                l = d < l ? d : l, p = g < p ? g : p, v = d > v ? d : v, y = g > y ? g : y, d = s * e + a * n + c, g = h * e + u * n + f, l = d < l ? d : l, p = g < p ? g : p, v = d > v ? d : v, y = g > y ? g : y, d = s * i + a * r + c, g = h * i + u * r + f, l = d < l ? d : l, p = g < p ? g : p, v = d > v ? d : v, y = g > y ? g : y, d = s * e + a * r + c, g = h * e + u * r + f, l = d < l ? d : l, p = g < p ? g : p, v = d > v ? d : v, y = g > y ? g : y, this.Tv = l, this.Uv = p, this.Vv = v, this.Wv = y
            }, e.prototype.gw = function(t, i, n, e) {
                for (var r = t.Zt, o = r._t, s = r.ew, h = r.fw, a = r.bu, u = r.$t, c = r.au, f = this.Tv, l = this.Uv, p = this.Vv, v = this.Wv, y = n; y < e; y += 2) {
                    var d = i[y],
                        g = i[y + 1],
                        m = o * d + h * g + u,
                        b = a * g + s * d + c;
                    f = m < f ? m : f, l = b < l ? b : l, p = m > p ? m : p, v = b > v ? b : v
                }
                this.Tv = f, this.Uv = l, this.Vv = p, this.Wv = v
            }, e.prototype.hw = function(t) {
                var i = this.Tv,
                    n = this.Uv,
                    e = this.Vv,
                    r = this.Wv;
                this.Tv = t.Tv < i ? t.Tv : i, this.Uv = t.Uv < n ? t.Uv : n, this.Vv = t.Vv > e ? t.Vv : e, this.Wv = t.Wv > r ? t.Wv : r
            }
        }, {
            iw: 102
        }],
        80: [function(t, i, n) {
            function e() {
                o.call(this), this.he = []
            }
            var r = t("../utils"),
                o = t("./DisplayObject");
            e.prototype = Object.create(o.prototype), e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                Ka: {
                    _: function() {
                        return this.jw.g * this.kw().Ka
                    },
                    P: function(t) {
                        var i = this.kw().Ka;
                        0 !== i ? this.jw.g = t / i : this.jw.g = 1, this.lw = t
                    }
                },
                Ua: {
                    _: function() {
                        return this.jw.h * this.kw().Ua
                    },
                    P: function(t) {
                        var i = this.kw().Ua;
                        0 !== i ? this.jw.h = t / i : this.jw.h = 1, this.mw = t
                    }
                }
            }), e.prototype.nw = function() {}, e.prototype.St = function(t) {
                var i = arguments.length;
                if (i > 1)
                    for (var n = 0; n < i; n++) this.St(arguments[n]);
                else t.Kd && t.Kd.v(t), t.Kd = this, this.pw.ow = -1, this.he.push(t), this.nw(this.he.length - 1), t.Ll("added", this);
                return t
            }, e.prototype.qw = function(t, i) {
                if (i >= 0 && i <= this.he.length) return t.Kd && t.Kd.v(t), t.Kd = this, this.he.splice(i, 0, t), this.nw(i), t.Ll("added", this), t;
                throw new Error(t + "addChildAt: The index " + i + " supplied is out of bounds " + this.he.length)
            }, e.prototype.rw = function(t, i) {
                if (t !== i) {
                    var n = this.sw(t),
                        e = this.sw(i);
                    if (n < 0 || e < 0) throw new Error("swapChildren: Both the supplied DisplayObjects must be children of the caller.");
                    this.he[n] = i, this.he[e] = t, this.nw(n < e ? n : e)
                }
            }, e.prototype.sw = function(t) {
                var i = this.he.indexOf(t);
                if (i === -1) throw new Error("The supplied DisplayObject must be a child of the caller");
                return i
            }, e.prototype.tw = function(t, i) {
                if (i < 0 || i >= this.he.length) throw new Error("The supplied index is out of bounds");
                var n = this.sw(t);
                r.Vt(this.he, n, 1), this.he.splice(i, 0, t), this.nw(i)
            }, e.prototype.uw = function(t) {
                if (t < 0 || t >= this.he.length) throw new Error("getChildAt: Supplied index " + t + " does not exist in the child list, or the supplied DisplayObject is not a child of the caller");
                return this.he[t]
            }, e.prototype.v = function(t) {
                var i = arguments.length;
                if (i > 1)
                    for (var n = 0; n < i; n++) this.v(arguments[n]);
                else {
                    var e = this.he.indexOf(t);
                    if (e === -1) return;
                    t.Kd = null, r.Vt(this.he, e, 1), this.nw(e), t.Ll("removed", this)
                }
                return t
            }, e.prototype.vw = function(t) {
                var i = this.uw(t);
                return i.Kd = null, r.Vt(this.he, t, 1), this.nw(t), i.Ll("removed", this), i
            }, e.prototype.ww = function(t, i) {
                var n, e, r = t || 0,
                    o = "number" == typeof i ? i : this.he.length,
                    s = o - r;
                if (s > 0 && s <= o) {
                    for (n = this.he.splice(r, s), e = 0; e < n.length; ++e) n[e].Kd = null;
                    for (this.nw(t), e = 0; e < n.length; ++e) n[e].Ll("removed", this);
                    return n
                }
                if (0 === s && 0 === this.he.length) return [];
                throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
            }, e.prototype.xw = function() {
                if (this.yw++, this.zj) {
                    this.pw.xw(this.Kd.pw), this.zw = this.Aw * this.Kd.zw;
                    for (var t = 0, i = this.he.length; t < i; ++t) this.he[t].xw()
                }
            }, e.prototype.Bw = e.prototype.xw, e.prototype.Cw = function() {
                if (this.Dw.pn(), this.zj) {
                    this.Ew();
                    for (var t = 0; t < this.he.length; t++) {
                        var i = this.he[t];
                        i.Cw(), this.Dw.hw(i.Dw)
                    }
                    this.yw = this.Fw
                }
            }, e.prototype.Ew = function() {}, e.prototype.Gw = function(t) {
                if (this.zj && !(this.zw <= 0) && this.Hw)
                    if (this.Iw || this.Jw) this.Kw(t);
                    else {
                        this.Lw(t);
                        for (var i = 0, n = this.he.length; i < n; ++i) this.he[i].Gw(t)
                    }
            }, e.prototype.Kw = function(t) {
                t.Nw.Mw();
                var i, n, e = this.Jw,
                    r = this.Iw;
                if (e) {
                    for (this.Ow || (this.Ow = []), this.Ow.length = 0, i = 0; i < e.length; i++) e[i].Hd && this.Ow.push(e[i]);
                    this.Ow.length && t.Qw.Pw(this, this.Ow)
                }
                for (r && t.Sw.Rw(this, this.Iw), t.Nw.V(), this.Lw(t), i = 0, n = this.he.length; i < n; i++) this.he[i].Gw(t);
                t.Nw.Mw(), r && t.Sw.Tw(this, this.Iw), e && this.Ow && this.Ow.length && t.Qw.Uw(), t.Nw.V()
            }, e.prototype.Lw = function(t) {}, e.prototype.Vw = function(t) {}, e.prototype.Ww = function(t) {
                if (this.zj && !(this.Aw <= 0) && this.Hw) {
                    this.Iw && t.Sw.Rw(this.Iw), this.Vw(t);
                    for (var i = 0, n = this.he.length; i < n; ++i) this.he[i].Ww(t);
                    this.Iw && t.Sw.Tw(t)
                }
            }, e.prototype.Ym = function(t) {
                o.prototype.Ym.call(this);
                var i = "boolean" == typeof t ? t : t && t.he,
                    n = this.he;
                if (this.he = null, i)
                    for (var e = n.length - 1; e >= 0; e--) {
                        var r = n[e];
                        r.Kd = null, r.Ym(t)
                    }
            }
        }, {
            Xw: 151,
            Yw: 81
        }],
        81: [function(t, i, n) {
            function e() {
                r.call(this);
                var t = o.Kv.us === o.Kv.Lv ? s : h;
                this.pw = new t, this.Aw = 1, this.zj = !0, this.Hw = !0, this.Kd = null, this.zw = 1, this.Zw = null, this.Jw = null, this.Ow = null, this.Dw = new a, this.yw = 0, this.Fw = -1, this.$w = null, this._w = null, this.Iw = null
            }
            var r = t("eventemitter3"),
                o = t("../const"),
                s = t("./TransformStatic"),
                h = t("./Transform"),
                a = t("./Bounds"),
                u = t("../math"),
                c = new e;
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                g: {
                    _: function() {
                        return this.gh.g
                    },
                    P: function(t) {
                        this.pw.gh.g = t
                    }
                },
                h: {
                    _: function() {
                        return this.gh.h
                    },
                    P: function(t) {
                        this.pw.gh.h = t
                    }
                },
                Zt: {
                    _: function() {
                        return this.pw.Zt
                    }
                },
                ax: {
                    _: function() {
                        return this.pw.ax
                    }
                },
                gh: {
                    _: function() {
                        return this.pw.gh
                    },
                    P: function(t) {
                        this.pw.gh.bx(t)
                    }
                },
                jw: {
                    _: function() {
                        return this.pw.jw
                    },
                    P: function(t) {
                        this.pw.jw.bx(t)
                    }
                },
                cx: {
                    _: function() {
                        return this.pw.cx
                    },
                    P: function(t) {
                        this.pw.cx.bx(t)
                    }
                },
                dx: {
                    _: function() {
                        return this.pw.dx
                    },
                    P: function(t) {
                        this.pw.dx.bx(t)
                    }
                },
                ex: {
                    _: function() {
                        return this.pw.ex
                    },
                    P: function(t) {
                        this.pw.ex = t
                    }
                },
                fx: {
                    _: function() {
                        var t = this;
                        do {
                            if (!t.zj) return !1;
                            t = t.Kd
                        } while (t);
                        return !0
                    }
                },
                gx: {
                    _: function() {
                        return this.Iw
                    },
                    P: function(t) {
                        this.Iw && (this.Iw.Hw = !0), this.Iw = t, this.Iw && (this.Iw.Hw = !1)
                    }
                },
                Zd: {
                    _: function() {
                        return this.Jw && this.Jw.slice()
                    },
                    P: function(t) {
                        this.Jw = t && t.slice()
                    }
                }
            }), e.prototype.xw = function() {
                this.pw.xw(this.Kd.pw), this.zw = this.Aw * this.Kd.zw, this.Dw.$v++
            }, e.prototype.hx = e.prototype.xw, e.prototype.ix = function() {
                this.Kd ? (this.Kd.ix(), this.pw.xw(this.Kd.pw)) : this.pw.xw(c.pw)
            }, e.prototype.cu = function(t, i) {
                return t || (this.Kd ? (this.ix(), this.xw()) : (this.Kd = c, this.Kd.pw.jx++, this.xw(), this.Kd = null)), this.yw !== this.Fw && this.Cw(), i || (this.$w || (this.$w = new u.Yv), i = this.$w), this.Dw._v(i)
            }, e.prototype.kw = function(t) {
                var i = this.pw,
                    n = this.Kd;
                this.Kd = null, this.pw = c.pw, t || (this._w || (this._w = new u.Yv), t = this._w);
                var e = this.cu(!1, t);
                return this.Kd = n, this.pw = i, e
            }, e.prototype.kx = function(t, i, n) {
                return n || (this.ix(), this.Kd ? this.hx() : (this.Kd = c, this.hx(), this.Kd = null)), this.Zt.apply(t, i)
            }, e.prototype.lx = function(t, i, n, e) {
                return i && (t = i.kx(t, n, e)), e || (this.ix(), this.Kd ? this.hx() : (this.Kd = c, this.hx(), this.Kd = null)), this.Zt.mx(t, n)
            }, e.prototype.Gw = function(t) {}, e.prototype.Ww = function(t) {}, e.prototype.nx = function(t) {
                if (!t || !t.St) throw new Error("setParent: Argument must be a Container");
                return t.St(this), t
            }, e.prototype.ox = function(t, i, n, e, r, o, s, h, a) {
                return this.gh.g = t || 0, this.gh.h = i || 0, this.jw.g = n ? n : 1, this.jw.h = e ? e : 1, this.ex = r || 0, this.dx.g = o || 0, this.dx.h = s || 0, this.cx.g = h || 0, this.cx.h = a || 0, this
            }, e.prototype.Ym = function() {
                this.Nl(), this.Kd && this.Kd.v(this), this.pw = null, this.Kd = null, this.Dw = null, this.px = null, this.Iw = null, this.Zw = null, this.Qt = !1, this.qx = !1
            }
        }, {
            rx: 78,
            iw: 102,
            sx: 79,
            tx: 82,
            ux: 84,
            nr: 16
        }],
        82: [function(t, i, n) {
            function e() {
                o.call(this), this.gh = new r.vx(0, 0), this.jw = new r.vx(1, 1), this.dx = new r.wx(this.xx, this, 0, 0), this.cx = new r.vx(0, 0), this.yx = 0, this.zx = Math.sin(0), this.Ax = Math.cos(0), this.Bx = Math.cos(0), this.Cx = Math.sin(0), this.Dx = Math.sin(0), this.Ex = Math.cos(0)
            }
            var r = t("../math"),
                o = t("./TransformBase");
            e.prototype = Object.create(o.prototype), e.prototype.constructor = e, e.prototype.xx = function() {
                this.Bx = Math.cos(this.dx.h), this.Cx = Math.sin(this.dx.h), this.Dx = Math.sin(this.dx.g), this.Ex = Math.cos(this.dx.g)
            }, e.prototype.Fx = function() {
                var t, i, n, e, r = this.ax;
                t = this.Ax * this.jw.g, i = this.zx * this.jw.g, n = -this.zx * this.jw.h, e = this.Ax * this.jw.h, r._t = this.Bx * t + this.Cx * n, r.ew = this.Bx * i + this.Cx * e, r.fw = this.Dx * t + this.Ex * n, r.bu = this.Dx * i + this.Ex * e
            }, e.prototype.xw = function(t) {
                var i, n, e, r, o = t.Zt,
                    s = this.Zt,
                    h = this.ax;
                i = this.Ax * this.jw.g, n = this.zx * this.jw.g, e = -this.zx * this.jw.h, r = this.Ax * this.jw.h, h._t = this.Bx * i + this.Cx * e, h.ew = this.Bx * n + this.Cx * r, h.fw = this.Dx * i + this.Ex * e, h.bu = this.Dx * n + this.Ex * r, h.$t = this.gh.g - (this.cx.g * h._t + this.cx.h * h.fw), h.au = this.gh.h - (this.cx.g * h.ew + this.cx.h * h.bu), s._t = h._t * o._t + h.ew * o.fw, s.ew = h._t * o.ew + h.ew * o.bu, s.fw = h.fw * o._t + h.bu * o.fw, s.bu = h.fw * o.ew + h.bu * o.bu, s.$t = h.$t * o._t + h.au * o.fw + o.$t, s.au = h.$t * o.ew + h.au * o.bu + o.au, this.jx++
            }, e.prototype.Gx = function(t) {
                t.Hx(this)
            }, Object.defineProperties(e.prototype, {
                ex: {
                    _: function() {
                        return this.yx
                    },
                    P: function(t) {
                        this.yx = t, this.zx = Math.sin(t), this.Ax = Math.cos(t)
                    }
                }
            }), i.r = e
        }, {
            iw: 102,
            Ix: 83
        }],
        83: [function(t, i, n) {
            function e() {
                this.Zt = new r.Jx, this.ax = new r.Jx, this.jx = 0
            }
            var r = t("../math");
            e.prototype.constructor = e, e.prototype.Fx = function() {}, e.prototype.xw = function(t) {
                var i = t.Zt,
                    n = this.Zt,
                    e = this.ax;
                n._t = e._t * i._t + e.ew * i.fw, n.ew = e._t * i.ew + e.ew * i.bu, n.fw = e.fw * i._t + e.bu * i.fw, n.bu = e.fw * i.ew + e.bu * i.bu, n.$t = e.$t * i._t + e.au * i.fw + i.$t, n.au = e.$t * i.ew + e.au * i.bu + i.au, this.jx++
            }, e.prototype.Kx = e.prototype.xw, e.Lx = new e, i.r = e
        }, {
            iw: 102
        }],
        84: [function(t, i, n) {
            function e() {
                o.call(this), this.gh = new r.wx(this.Mx, this, 0, 0), this.jw = new r.wx(this.Mx, this, 1, 1), this.cx = new r.wx(this.Mx, this, 0, 0), this.dx = new r.wx(this.xx, this, 0, 0), this.yx = 0, this.zx = Math.sin(0), this.Ax = Math.cos(0), this.Bx = Math.cos(0), this.Cx = Math.sin(0), this.Dx = Math.sin(0), this.Ex = Math.cos(0), this.Nx = 0, this.Ox = 0
            }
            var r = t("../math"),
                o = t("./TransformBase");
            e.prototype = Object.create(o.prototype), e.prototype.constructor = e, e.prototype.Mx = function() {
                this.Nx++
            }, e.prototype.xx = function() {
                this.Bx = Math.cos(this.dx.Px), this.Cx = Math.sin(this.dx.Px), this.Dx = Math.sin(this.dx.Qx), this.Ex = Math.cos(this.dx.Qx), this.Nx++
            }, e.prototype.Fx = function() {
                var t = this.ax;
                if (this.Nx !== this.Ox) {
                    var i, n, e, r;
                    i = this.Ax * this.jw.Qx, n = this.zx * this.jw.Qx, e = -this.zx * this.jw.Px, r = this.Ax * this.jw.Px, t._t = this.Bx * i + this.Cx * e, t.ew = this.Bx * n + this.Cx * r, t.fw = this.Dx * i + this.Ex * e, t.bu = this.Dx * n + this.Ex * r, t.$t = this.gh.Qx - (this.cx.Qx * t._t + this.cx.Px * t.fw), t.au = this.gh.Px - (this.cx.Qx * t.ew + this.cx.Px * t.bu), this.Ox = this.Nx, this.ow = -1
                }
            }, e.prototype.xw = function(t) {
                var i = t.Zt,
                    n = this.Zt,
                    e = this.ax;
                if (this.Nx !== this.Ox) {
                    var r, o, s, h;
                    r = this.Ax * this.jw.Qx, o = this.zx * this.jw.Qx, s = -this.zx * this.jw.Px, h = this.Ax * this.jw.Px, e._t = this.Bx * r + this.Cx * s, e.ew = this.Bx * o + this.Cx * h, e.fw = this.Dx * r + this.Ex * s, e.bu = this.Dx * o + this.Ex * h, e.$t = this.gh.Qx - (this.cx.Qx * e._t + this.cx.Px * e.fw), e.au = this.gh.Px - (this.cx.Qx * e.ew + this.cx.Px * e.bu), this.Ox = this.Nx, this.ow = -1
                }
                this.ow !== t.jx && (n._t = e._t * i._t + e.ew * i.fw, n.ew = e._t * i.ew + e.ew * i.bu, n.fw = e.fw * i._t + e.bu * i.fw, n.bu = e.fw * i.ew + e.bu * i.bu, n.$t = e.$t * i._t + e.au * i.fw + i.$t, n.au = e.$t * i.ew + e.au * i.bu + i.au, this.ow = t.jx, this.jx++)
            }, e.prototype.Gx = function(t) {
                t.Hx(this), this.Nx++
            }, Object.defineProperties(e.prototype, {
                ex: {
                    _: function() {
                        return this.yx
                    },
                    P: function(t) {
                        this.yx = t, this.zx = Math.sin(t), this.Ax = Math.cos(t), this.Nx++
                    }
                }
            }), i.r = e
        }, {
            iw: 102,
            Ix: 83
        }],
        85: [function(t, i, n) {
            function e() {
                o.call(this), this.Rx = 1, this.Sx = 0, this.Tx = 0, this.Ux = [], this.Vx = 16777215, this.Wx = 16777215, this.Xx = f.Ku.Lu, this.Yx = null, this.Zx = {}, this.$x = !1, this._x = 0, this.ay = new p, this.Co = 0, this.by = -1, this.cy = 0, this.dy = -1, this.ey = !1, this.fy = null, this.gy = !1
            }
            var r, o = t("../display/Container"),
                s = t("../textures/RenderTexture"),
                h = t("../textures/Texture"),
                a = t("./GraphicsData"),
                u = t("../sprites/Sprite"),
                c = t("../math"),
                f = t("../const"),
                l = t("../utils"),
                p = t("../display/Bounds"),
                v = t("./utils/bezierCurveTo"),
                y = t("../renderers/canvas/CanvasRenderer"),
                d = new c.Jx,
                g = new c.vx,
                m = new Float32Array(4),
                b = new Float32Array(4);
            e.hy = null, e.prototype = Object.create(o.prototype), e.prototype.constructor = e, i.r = e, e.prototype.Ea = function() {
                var t = new e;
                t.Hw = this.Hw, t.Rx = this.Rx, t.Sx = this.Sx, t.Tx = this.Tx, t.Vx = this.Vx, t.Xx = this.Xx, t.$x = this.$x, t._x = this._x, t.Co = 0, t.ey = this.ey;
                for (var i = 0; i < this.Ux.length; ++i) t.Ux.push(this.Ux[i].Ea());
                return t.Yx = t.Ux[t.Ux.length - 1], t.iy(), t
            }, e.prototype.jy = function(t, i, n) {
                if (this.Sx = t || 0, this.Tx = i || 0, this.ky = void 0 === n ? 1 : n, this.Yx)
                    if (this.Yx.my.ly.length) {
                        var e = new c.ny(this.Yx.my.ly.slice(-2));
                        e.oy = !1, this.py(e)
                    } else this.Yx.Sx = this.Sx, this.Yx.Tx = this.Tx, this.Yx.ky = this.ky;
                return this
            }, e.prototype.qy = function(t, i) {
                var n = new c.ny([t, i]);
                return n.oy = !1, this.py(n), this
            }, e.prototype.ry = function(t, i) {
                return this.Yx.my.ly.push(t, i), this.Co++, this
            }, e.prototype.sy = function(t, i, n, e) {
                this.Yx ? 0 === this.Yx.my.ly.length && (this.Yx.my.ly = [0, 0]) : this.qy(0, 0);
                var r, o, s = 20,
                    h = this.Yx.my.ly;
                0 === h.length && this.qy(0, 0);
                for (var a = h[h.length - 2], u = h[h.length - 1], c = 0, f = 1; f <= s; ++f) c = f / s, r = a + (t - a) * c, o = u + (i - u) * c, h.push(r + (t + (n - t) * c - r) * c, o + (i + (e - i) * c - o) * c);
                return this.Co++, this
            }, e.prototype.ty = function(t, i, n, e, r, o) {
                this.Yx ? 0 === this.Yx.my.ly.length && (this.Yx.my.ly = [0, 0]) : this.qy(0, 0);
                var s = this.Yx.my.ly,
                    h = s[s.length - 2],
                    a = s[s.length - 1];
                return s.length -= 2, v(h, a, t, i, n, e, r, o, s), this.Co++, this
            }, e.prototype.uy = function(t, i, n, e, r) {
                this.Yx ? 0 === this.Yx.my.ly.length && this.Yx.my.ly.push(t, i) : this.qy(t, i);
                var o = this.Yx.my.ly,
                    s = o[o.length - 2],
                    h = o[o.length - 1],
                    a = h - i,
                    u = s - t,
                    c = e - i,
                    f = n - t,
                    l = Math.abs(a * f - u * c);
                if (l < 1e-8 || 0 === r) o[o.length - 2] === t && o[o.length - 1] === i || o.push(t, i);
                else {
                    var p = a * a + u * u,
                        v = c * c + f * f,
                        y = a * c + u * f,
                        d = r * Math.sqrt(p) / l,
                        g = r * Math.sqrt(v) / l,
                        m = d * y / p,
                        b = g * y / v,
                        w = d * f + g * u,
                        x = d * c + g * a,
                        C = u * (g + m),
                        M = a * (g + m),
                        F = f * (d + b),
                        z = c * (d + b),
                        I = Math.atan2(M - x, C - w),
                        j = Math.atan2(z - x, F - w);
                    this.vy(w + t, x + i, r, I, j, u * c > f * a)
                }
                return this.Co++, this
            }, e.prototype.vy = function(t, i, n, e, r, o) {
                if (o = o || !1, e === r) return this;
                !o && r <= e ? r += 2 * Math.PI : o && e <= r && (e += 2 * Math.PI);
                var s = o ? (e - r) * -1 : r - e,
                    h = 40 * Math.ceil(Math.abs(s) / (2 * Math.PI));
                if (0 === s) return this;
                var a = t + Math.cos(e) * n,
                    u = i + Math.sin(e) * n;
                this.Yx ? this.Yx.my.ly.push(a, u) : this.qy(a, u);
                for (var c = this.Yx.my.ly, f = s / (2 * h), l = 2 * f, p = Math.cos(f), v = Math.sin(f), y = h - 1, d = y % 1 / y, g = 0; g <= y; g++) {
                    var m = g + d * g,
                        b = f + e + l * m,
                        w = Math.cos(b),
                        x = -Math.sin(b);
                    c.push((p * w + v * x) * n + t, (p * -x + v * w) * n + i)
                }
                return this.Co++, this
            }, e.prototype.wy = function(t, i) {
                return this.xy = !0, this.yy = t || 0, this.Rx = void 0 === i ? 1 : i, this.Yx && this.Yx.my.ly.length <= 2 && (this.Yx.zy = this.xy, this.Yx.yy = this.yy, this.Yx.Rx = this.Rx), this
            }, e.prototype.Ay = function() {
                return this.xy = !1, this.yy = null, this.Rx = 1, this
            }, e.prototype.By = function(t, i, n, e) {
                return this.py(new c.Yv(t, i, n, e)), this
            }, e.prototype.Cy = function(t, i, n, e, r) {
                return this.py(new c.Dy(t, i, n, e, r)), this
            }, e.prototype.Ey = function(t, i, n) {
                return this.py(new c.Fy(t, i, n)), this
            }, e.prototype.Gy = function(t, i, n, e) {
                return this.py(new c.Hy(t, i, n, e)), this
            }, e.prototype.Iy = function(t) {
                var i = t,
                    n = !0;
                if (i instanceof c.ny && (n = i.oy, i = i.ly), !Array.isArray(i)) {
                    i = new Array(arguments.length);
                    for (var e = 0; e < i.length; ++e) i[e] = arguments[e]
                }
                var r = new c.ny(i);
                return r.oy = n, this.py(r), this
            }, e.prototype.pn = function() {
                return this.Sx = 0, this.xy = !1, this.Co++, this.cy++, this.Ux = [], this
            }, e.prototype.Jy = function() {
                return 1 === this.Ux.length && this.Ux[0].my.z === f.Bv.Dv && !this.Ux[0].Sx
            }, e.prototype.Lw = function(t) {
                this.Co !== this.by && (this.by = this.Co, this.gy = this.Jy()), this.gy ? this.Ky(t) : (t.Ly(t.mu.My), t.mu.My.Ny(this))
            }, e.prototype.Ky = function(t) {
                var i = this.Ux[0].my;
                if (!this.fy) {
                    if (!e.hy) {
                        e.hy = s.create(10, 10);
                        var n = t.Oy;
                        t.Py(e.hy), t.pn([1, 1, 1, 1]), t.Qy(n)
                    }
                    this.fy = new u(e.hy)
                }
                if (16777215 === this.Vx) this.fy.Vx = this.Ux[0].yy;
                else {
                    var r = m,
                        o = b;
                    l.Ry(this.Ux[0].yy, r), l.Ry(this.Vx, o), r[0] *= o[0], r[1] *= o[1], r[2] *= o[2], this.fy.Vx = l.Sy(r)
                }
                this.fy.Aw = this.Ux[0].Rx, this.fy.zw = this.zw * this.fy.Aw, e.hy.Ty.Ka = i.Ka, e.hy.Ty.Ua = i.Ua, this.fy.pw.Zt = this.pw.Zt, this.fy.anchor.P(-i.g / i.Ka, -i.h / i.Ua), this.fy.Uy(), this.fy.Lw(t)
            }, e.prototype.Vw = function(t) {
                this.$x !== !0 && t.mu.My.Ny(this)
            }, e.prototype.Ew = function() {
                if (this.Hw) {
                    this.dy !== this.Co && (this.dy = this.Co, this.iy(), this.Co++, this.ey = !0);
                    var t = this.ay;
                    this.Dw.dw(this.pw, t.Tv, t.Uv, t.Vv, t.Wv)
                }
            }, e.prototype.Vy = function(t) {
                this.Zt.mx(t, g);
                for (var i = this.Ux, n = 0; n < i.length; n++) {
                    var e = i[n];
                    if (e.zy && e.my && e.my.na(g.g, g.h)) return !0
                }
                return !1
            }, e.prototype.iy = function() {
                var t = 1 / 0,
                    i = -(1 / 0),
                    n = 1 / 0,
                    e = -(1 / 0);
                if (this.Ux.length)
                    for (var r, o, s, h, a, u, c = 0; c < this.Ux.length; c++) {
                        var l = this.Ux[c],
                            p = l.z,
                            v = l.Sx;
                        if (r = l.my, p === f.Bv.Dv || p === f.Bv.Gv) s = r.g - v / 2, h = r.h - v / 2, a = r.Ka + v, u = r.Ua + v, t = s < t ? s : t, i = s + a > i ? s + a : i, n = h < n ? h : n, e = h + u > e ? h + u : e;
                        else if (p === f.Bv.Ev) s = r.g, h = r.h, a = r.Wy + v / 2, u = r.Wy + v / 2, t = s - a < t ? s - a : t, i = s + a > i ? s + a : i, n = h - u < n ? h - u : n, e = h + u > e ? h + u : e;
                        else if (p === f.Bv.Fv) s = r.g, h = r.h, a = r.Ka + v / 2, u = r.Ua + v / 2, t = s - a < t ? s - a : t, i = s + a > i ? s + a : i, n = h - u < n ? h - u : n, e = h + u > e ? h + u : e;
                        else {
                            o = r.ly;
                            for (var y = 0; y < o.length; y += 2) s = o[y], h = o[y + 1], t = s - v < t ? s - v : t, i = s + v > i ? s + v : i, n = h - v < n ? h - v : n, e = h + v > e ? h + v : e
                        }
                    } else t = 0, i = 0, n = 0, e = 0;
                var d = this._x;
                this.ay.Tv = t - d, this.ay.Vv = i + 2 * d, this.ay.Uv = n - d, this.ay.Wv = e + 2 * d
            }, e.prototype.py = function(t) {
                this.Yx && this.Yx.my.ly.length <= 2 && this.Ux.pop(), this.Yx = null;
                var i = new a(this.Sx, this.Tx, this.ky, this.yy, this.Rx, this.xy, t);
                return this.Ux.push(i), i.z === f.Bv.Cv && (i.my.oy = i.my.oy || this.xy, this.Yx = i), this.Co++, i
            }, e.prototype.Xy = function(t, i) {
                i = i || 1;
                var n = this.kw(),
                    e = new s.create(n.Ka * i, n.Ua * i);
                r || (r = new y), d.$t = -n.g, d.au = -n.h, r.Ny(this, e, !1, d);
                var o = h.Yy(e._y.$y.Zy, t);
                return o._y.tv = i, o
            }, e.prototype.az = function() {
                var t = this.Yx;
                return t && t.my && t.my.bz(), this
            }, e.prototype.cz = function() {
                var t = this.Ux.pop();
                return this.Yx = this.Ux[this.Ux.length - 1], this.Yx.cz(t.my), this.Yx = null, this
            }, e.prototype.Ym = function() {
                o.prototype.Ym.apply(this, arguments);
                for (var t = 0; t < this.Ux.length; ++t) this.Ux[t].Ym();
                for (var i in this.dz)
                    for (var n = 0; n < this.dz[i].Wb.length; ++n) this.dz[i].Wb[n].Ym();
                this.fy && this.fy.Ym(), this.Ux = null, this.Yx = null, this.dz = null, this.ay = null
            }
        }, {
            rx: 78,
            ez: 79,
            fz: 80,
            iw: 102,
            gz: 109,
            hz: 133,
            iz: 143,
            jz: 144,
            Xw: 151,
            kz: 86,
            lz: 88
        }],
        86: [function(t, i, n) {
            function e(t, i, n, e, r, o, s) {
                this.Sx = t, this.Tx = i, this.ky = n, this.mz = i, this.yy = e, this.Rx = r, this.nz = e, this.zy = o, this.Gl = [], this.my = s, this.z = s.z
            }
            e.prototype.constructor = e, i.r = e, e.prototype.Ea = function() {
                return new e(this.Sx, this.Tx, this.ky, this.yy, this.Rx, this.zy, this.my)
            }, e.prototype.cz = function(t) {
                this.Gl.push(t)
            }, e.prototype.Ym = function() {
                this.my = null, this.Gl = null
            }
        }, {}],
        87: [function(t, i, n) {
            function e(t) {
                this.Ft = t
            }
            var r = t("../../renderers/canvas/CanvasRenderer"),
                o = t("../../const");
            e.prototype.constructor = e, i.r = e, r.pu("graphics", e), e.prototype.Ny = function(t) {
                var i = this.Ft,
                    n = i.Xi,
                    e = t.zw,
                    r = t.pw.Zt,
                    s = i.tv;
                this.Wx !== this.Vx && (this.Co = !0), n.ox(r._t * s, r.ew * s, r.fw * s, r.bu * s, r.$t * s, r.au * s), t.Co && (this.oz(t), t.Co = !1), i.pz(t.Xx);
                for (var h = 0; h < t.Ux.length; h++) {
                    var a = t.Ux[h],
                        u = a.my,
                        c = a.nz,
                        f = a.mz;
                    if (n.Sx = a.Sx, a.z === o.Bv.Cv) {
                        n.qz(), this.rz(u.ly, u.oy, n);
                        for (var l = 0; l < a.Gl.length; l++) {
                            var p = a.Gl[l];
                            this.rz(p.ly, !0, n)
                        }
                        a.zy && (n.sz = a.Rx * e, n.tz = "#" + ("00000" + (0 | c).toString(16)).substr(-6), n.zy()), a.Sx && (n.sz = a.ky * e, n.uz = "#" + ("00000" + (0 | f).toString(16)).substr(-6), n.vz())
                    } else if (a.z === o.Bv.Dv)(a.yy || 0 === a.yy) && (n.sz = a.Rx * e, n.tz = "#" + ("00000" + (0 | c).toString(16)).substr(-6), n.wz(u.g, u.h, u.Ka, u.Ua)), a.Sx && (n.sz = a.ky * e, n.uz = "#" + ("00000" + (0 | f).toString(16)).substr(-6), n.xz(u.g, u.h, u.Ka, u.Ua));
                    else if (a.z === o.Bv.Ev) n.qz(), n.vy(u.g, u.h, u.Wy, 0, 2 * Math.PI), n.az(), a.zy && (n.sz = a.Rx * e, n.tz = "#" + ("00000" + (0 | c).toString(16)).substr(-6), n.zy()), a.Sx && (n.sz = a.ky * e, n.uz = "#" + ("00000" + (0 | f).toString(16)).substr(-6), n.vz());
                    else if (a.z === o.Bv.Fv) {
                        var v = 2 * u.Ka,
                            y = 2 * u.Ua,
                            d = u.g - v / 2,
                            g = u.h - y / 2;
                        n.qz();
                        var m = .5522848,
                            b = v / 2 * m,
                            w = y / 2 * m,
                            x = d + v,
                            C = g + y,
                            M = d + v / 2,
                            F = g + y / 2;
                        n.qy(d, F), n.ty(d, F - w, M - b, g, M, g), n.ty(M + b, g, x, F - w, x, F), n.ty(x, F + w, M + b, C, M, C), n.ty(M - b, C, d, F + w, d, F), n.az(), a.zy && (n.sz = a.Rx * e, n.tz = "#" + ("00000" + (0 | c).toString(16)).substr(-6), n.zy()), a.Sx && (n.sz = a.ky * e, n.uz = "#" + ("00000" + (0 | f).toString(16)).substr(-6), n.vz())
                    } else if (a.z === o.Bv.Gv) {
                        var z = u.g,
                            I = u.h,
                            j = u.Ka,
                            T = u.Ua,
                            K = u.Wy,
                            U = Math.min(j, T) / 2 | 0;
                        K = K > U ? U : K, n.qz(), n.qy(z, I + K), n.ry(z, I + T - K), n.sy(z, I + T, z + K, I + T), n.ry(z + j - K, I + T), n.sy(z + j, I + T, z + j, I + T - K), n.ry(z + j, I + K), n.sy(z + j, I, z + j - K, I), n.ry(z + K, I), n.sy(z, I, z, I + K), n.az(), (a.yy || 0 === a.yy) && (n.sz = a.Rx * e, n.tz = "#" + ("00000" + (0 | c).toString(16)).substr(-6), n.zy()), a.Sx && (n.sz = a.ky * e, n.uz = "#" + ("00000" + (0 | f).toString(16)).substr(-6), n.vz())
                    }
                }
            }, e.prototype.oz = function(t) {
                t.Wx = t.Vx;
                for (var i = (t.Vx >> 16 & 255) / 255, n = (t.Vx >> 8 & 255) / 255, e = (255 & t.Vx) / 255, r = 0; r < t.Ux.length; r++) {
                    var o = t.Ux[r],
                        s = 0 | o.yy,
                        h = 0 | o.Tx;
                    o.nz = ((s >> 16 & 255) / 255 * i * 255 << 16) + ((s >> 8 & 255) / 255 * n * 255 << 8) + (255 & s) / 255 * e * 255, o.mz = ((h >> 16 & 255) / 255 * i * 255 << 16) + ((h >> 8 & 255) / 255 * n * 255 << 8) + (255 & h) / 255 * e * 255
                }
            }, e.prototype.rz = function(t, i, n) {
                n.qy(t[0], t[1]);
                for (var e = 1; e < t.length / 2; e++) n.ry(t[2 * e], t[2 * e + 1]);
                i && n.az()
            }, e.prototype.Ym = function() {
                this.Ft = null
            }
        }, {
            yz: 78,
            zz: 109
        }],
        88: [function(t, i, n) {
            var e = function(t, i, n, e, r, o, s, h, a) {
                a = a || [];
                var u, c, f, l, p, v = 20;
                a.push(t, i);
                for (var y = 0, d = 1; d <= v; ++d) y = d / v, u = 1 - y, c = u * u, f = c * u, l = y * y, p = l * y, a.push(f * t + 3 * c * y * n + 3 * u * l * r + p * s, f * i + 3 * c * y * e + 3 * u * l * o + p * h);
                return a
            };
            i.r = e
        }, {}],
        89: [function(t, i, n) {
            function e(t) {
                s.call(this, t), this.Az = [], this.Bz = null, this.Lm = t.Lm, this.Cz = 0
            }
            var r = t("../../utils"),
                o = t("../../const"),
                s = t("../../renderers/webgl/utils/ObjectRenderer"),
                h = t("../../renderers/webgl/WebGLRenderer"),
                a = t("./WebGLGraphicsData"),
                u = t("./shaders/PrimitiveShader"),
                c = t("./utils/buildPoly"),
                f = t("./utils/buildRectangle"),
                l = t("./utils/buildRoundedRectangle"),
                p = t("./utils/buildCircle");
            e.prototype = Object.create(s.prototype), e.prototype.constructor = e, i.r = e, h.pu("graphics", e), e.prototype.Dz = function() {
                this.Lm = this.Ft.Lm, this.Cz = this.Ft.Cz, this.Bz = new u(this.Lm)
            }, e.prototype.Ym = function() {
                s.prototype.Ym.call(this);
                for (var t = 0; t < this.Az.length; ++t) this.Az[t].Ym();
                this.Az = null
            }, e.prototype.Ny = function(t) {
                var i, n = this.Ft,
                    e = n.Lm,
                    o = t.Zx[this.Cz];
                o && t.Co === o.Co || (this.Ez(t), o = t.Zx[this.Cz]);
                var s = this.Bz;
                n.Fz(s), n.Ub.pz(t.Xx);
                for (var h = 0, a = o.Wb.length; h < a; h++) {
                    i = o.Wb[h];
                    var u = i.b;
                    n.Fz(u), u.Dn.Gz = t.pw.Zt.$b(!0), u.Dn.Vx = r.Ry(t.Vx), u.Dn.Aw = t.zw, i.Hz.bind().Mo(e.gv, i.Iz.length).mk()
                }
            }, e.prototype.Ez = function(t) {
                var i = this.Ft.Lm,
                    n = t.Zx[this.Cz];
                n || (n = t.Zx[this.Cz] = {
                    lastIndex: 0,
                    Wb: [],
                    Lm: i,
                    cy: -1,
                    Co: -1
                }), n.Co = t.Co;
                var e;
                if (t.cy !== n.cy) {
                    for (n.cy = t.cy, e = 0; e < n.Wb.length; e++) {
                        var r = n.Wb[e];
                        this.Az.push(r)
                    }
                    n.Wb = [], n.lastIndex = 0
                }
                var s;
                for (e = n.lastIndex; e < t.Ux.length; e++) {
                    var h = t.Ux[e];
                    s = this.Jz(n, 0), h.z === o.Bv.Cv && c(h, s), h.z === o.Bv.Dv ? f(h, s) : h.z === o.Bv.Ev || h.z === o.Bv.Fv ? p(h, s) : h.z === o.Bv.Gv && l(h, s), n.lastIndex++
                }
                for (e = 0; e < n.Wb.length; e++) s = n.Wb[e], s.Co && s.Qm()
            }, e.prototype.Jz = function(t, i) {
                var n = t.Wb[t.Wb.length - 1];
                return (!n || n.ly.length > 32e4) && (n = this.Az.pop() || new a(this.Ft.Lm, this.Bz, this.Ft.Ub.Kz), n.Yd(i), t.Wb.push(n)), n.Co = !0, n
            }
        }, {
            yz: 78,
            Lz: 116,
            Mz: 126,
            Nz: 151,
            Oz: 90,
            Pz: 91,
            Qz: 92,
            Rz: 94,
            Sz: 95,
            Tz: 96
        }],
        90: [function(t, i, n) {
            function e(t, i, n) {
                this.Lm = t, this.Uz = [0, 0, 0], this.ly = [], this.Iz = [], this.Sk = r.Uo.Vm(t), this.Bo = r.Uo.Wm(t), this.Co = !0, this.Vz = null, this.Wz = null, this.b = i, this.Hz = new r.Yo(t, n).Lo(this.Bo).Ko(this.Sk, i.Uc.Xz, t.Vn, !1, 24, 0).Ko(this.Sk, i.Uc.Yz, t.Vn, !1, 24, 8)
            }
            var r = t("pixi-gl-core");
            e.prototype.constructor = e, i.r = e, e.prototype.Yd = function() {
                this.ly.length = 0, this.Iz.length = 0
            }, e.prototype.Qm = function() {
                this.Vz = new Float32Array(this.ly), this.Sk.Qm(this.Vz), this.Wz = new Uint16Array(this.Iz),
                    this.Bo.Qm(this.Wz), this.Co = !1
            }, e.prototype.Ym = function() {
                this.Uz = null, this.ly = null, this.Iz = null, this.Hz.Ym(), this.Sk.Ym(), this.Bo.Ym(), this.Lm = null, this.Sk = null, this.Bo = null, this.Vz = null, this.Wz = null
            }
        }, {
            Au: 51
        }],
        91: [function(t, i, n) {
            function e(t) {
                r.call(this, t, ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"].join("\n"), ["varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n"))
            }
            var r = t("../../../Shader");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e
        }, {
            Zz: 77
        }],
        92: [function(t, i, n) {
            var e = t("./buildLine"),
                r = t("../../../const"),
                o = t("../../../utils"),
                s = function(t, i) {
                    var n, s, h = t.my,
                        a = h.g,
                        u = h.h;
                    t.z === r.Bv.Ev ? (n = h.Wy, s = h.Wy) : (n = h.Ka, s = h.Ua);
                    var c = Math.floor(30 * Math.sqrt(h.Wy)) || Math.floor(15 * Math.sqrt(h.Ka + h.Ua)),
                        f = 2 * Math.PI / c,
                        l = 0;
                    if (t.zy) {
                        var p = o.Ry(t.yy),
                            v = t.Rx,
                            y = p[0] * v,
                            d = p[1] * v,
                            g = p[2] * v,
                            m = i.ly,
                            b = i.Iz,
                            w = m.length / 6;
                        for (b.push(w), l = 0; l < c + 1; l++) m.push(a, u, y, d, g, v), m.push(a + Math.sin(f * l) * n, u + Math.cos(f * l) * s, y, d, g, v), b.push(w++, w++);
                        b.push(w - 1)
                    }
                    if (t.Sx) {
                        var x = t.ly;
                        for (t.ly = [], l = 0; l < c + 1; l++) t.ly.push(a + Math.sin(f * l) * n, u + Math.cos(f * l) * s);
                        e(t, i), t.ly = x
                    }
                };
            i.r = s
        }, {
            $z: 78,
            _z: 151,
            aA: 93
        }],
        93: [function(t, i, n) {
            var e = t("../../../math"),
                r = t("../../../utils"),
                o = function(t, i) {
                    var n = 0,
                        o = t.ly;
                    if (0 !== o.length) {
                        var s = new e.vx(o[0], o[1]),
                            h = new e.vx(o[o.length - 2], o[o.length - 1]);
                        if (s.g === h.g && s.h === h.h) {
                            o = o.slice(), o.pop(), o.pop(), h = new e.vx(o[o.length - 2], o[o.length - 1]);
                            var a = h.g + .5 * (s.g - h.g),
                                u = h.h + .5 * (s.h - h.h);
                            o.unshift(a, u), o.push(a, u)
                        }
                        var c, f, l, p, v, y, d, g, m, b, w, x, C, M, F, z, I, j, T, K, U, O, W, _ = i.ly,
                            A = i.Iz,
                            D = o.length / 2,
                            S = o.length,
                            L = _.length / 6,
                            X = t.Sx / 2,
                            P = r.Ry(t.Tx),
                            E = t.ky,
                            k = P[0] * E,
                            Y = P[1] * E,
                            V = P[2] * E;
                        for (l = o[0], p = o[1], v = o[2], y = o[3], m = -(p - y), b = l - v, W = Math.sqrt(m * m + b * b), m /= W, b /= W, m *= X, b *= X, _.push(l - m, p - b, k, Y, V, E), _.push(l + m, p + b, k, Y, V, E), n = 1; n < D - 1; n++) l = o[2 * (n - 1)], p = o[2 * (n - 1) + 1], v = o[2 * n], y = o[2 * n + 1], d = o[2 * (n + 1)], g = o[2 * (n + 1) + 1], m = -(p - y), b = l - v, W = Math.sqrt(m * m + b * b), m /= W, b /= W, m *= X, b *= X, w = -(y - g), x = v - d, W = Math.sqrt(w * w + x * x), w /= W, x /= W, w *= X, x *= X, F = -b + p - (-b + y), z = -m + v - (-m + l), I = (-m + l) * (-b + y) - (-m + v) * (-b + p), j = -x + g - (-x + y), T = -w + v - (-w + d), K = (-w + d) * (-x + y) - (-w + v) * (-x + g), U = F * T - j * z, Math.abs(U) < .1 ? (U += 10.1, _.push(v - m, y - b, k, Y, V, E), _.push(v + m, y + b, k, Y, V, E)) : (c = (z * K - T * I) / U, f = (j * I - F * K) / U, O = (c - v) * (c - v) + (f - y) * (f - y), O > 19600 ? (C = m - w, M = b - x, W = Math.sqrt(C * C + M * M), C /= W, M /= W, C *= X, M *= X, _.push(v - C, y - M), _.push(k, Y, V, E), _.push(v + C, y + M), _.push(k, Y, V, E), _.push(v - C, y - M), _.push(k, Y, V, E), S++) : (_.push(c, f), _.push(k, Y, V, E), _.push(v - (c - v), y - (f - y)), _.push(k, Y, V, E)));
                        for (l = o[2 * (D - 2)], p = o[2 * (D - 2) + 1], v = o[2 * (D - 1)], y = o[2 * (D - 1) + 1], m = -(p - y), b = l - v, W = Math.sqrt(m * m + b * b), m /= W, b /= W, m *= X, b *= X, _.push(v - m, y - b), _.push(k, Y, V, E), _.push(v + m, y + b), _.push(k, Y, V, E), A.push(L), n = 0; n < S; n++) A.push(L++);
                        A.push(L - 1)
                    }
                };
            i.r = o
        }, {
            bA: 102,
            _z: 151
        }],
        94: [function(t, i, n) {
            var e = t("./buildLine"),
                r = t("../../../utils"),
                o = t("earcut"),
                s = function(t, i) {
                    t.ly = t.my.ly.slice();
                    var n = t.ly;
                    if (t.zy && n.length >= 6) {
                        for (var s = [], h = t.Gl, a = 0; a < h.length; a++) {
                            var u = h[a];
                            s.push(n.length / 2), n = n.concat(u.ly)
                        }
                        var c = i.ly,
                            f = i.Iz,
                            l = n.length / 2,
                            p = r.Ry(t.yy),
                            v = t.Rx,
                            y = p[0] * v,
                            d = p[1] * v,
                            g = p[2] * v,
                            m = o(n, s, 2);
                        if (!m) return;
                        var b = c.length / 6;
                        for (a = 0; a < m.length; a += 3) f.push(m[a] + b), f.push(m[a] + b), f.push(m[a + 1] + b), f.push(m[a + 2] + b), f.push(m[a + 2] + b);
                        for (a = 0; a < l; a++) c.push(n[2 * a], n[2 * a + 1], y, d, g, v)
                    }
                    t.Sx > 0 && e(t, i)
                };
            i.r = s
        }, {
            _z: 151,
            aA: 93,
            cA: 15
        }],
        95: [function(t, i, n) {
            var e = t("./buildLine"),
                r = t("../../../utils"),
                o = function(t, i) {
                    var n = t.my,
                        o = n.g,
                        s = n.h,
                        h = n.Ka,
                        a = n.Ua;
                    if (t.zy) {
                        var u = r.Ry(t.yy),
                            c = t.Rx,
                            f = u[0] * c,
                            l = u[1] * c,
                            p = u[2] * c,
                            v = i.ly,
                            y = i.Iz,
                            d = v.length / 6;
                        v.push(o, s), v.push(f, l, p, c), v.push(o + h, s), v.push(f, l, p, c), v.push(o, s + a), v.push(f, l, p, c), v.push(o + h, s + a), v.push(f, l, p, c), y.push(d, d, d + 1, d + 2, d + 3, d + 3)
                    }
                    if (t.Sx) {
                        var g = t.ly;
                        t.ly = [o, s, o + h, s, o + h, s + a, o, s + a, o, s], e(t, i), t.ly = g
                    }
                };
            i.r = o
        }, {
            _z: 151,
            aA: 93
        }],
        96: [function(t, i, n) {
            var e = t("earcut"),
                r = t("./buildLine"),
                o = t("../../../utils"),
                s = function(t, i) {
                    var n = t.my,
                        s = n.g,
                        a = n.h,
                        u = n.Ka,
                        c = n.Ua,
                        f = n.Wy,
                        l = [];
                    if (l.push(s, a + f), h(s, a + c - f, s, a + c, s + f, a + c, l), h(s + u - f, a + c, s + u, a + c, s + u, a + c - f, l), h(s + u, a + f, s + u, a, s + u - f, a, l), h(s + f, a, s, a, s, a + f + 1e-10, l), t.zy) {
                        var p = o.Ry(t.yy),
                            v = t.Rx,
                            y = p[0] * v,
                            d = p[1] * v,
                            g = p[2] * v,
                            m = i.ly,
                            b = i.Iz,
                            w = m.length / 6,
                            x = e(l, null, 2),
                            C = 0;
                        for (C = 0; C < x.length; C += 3) b.push(x[C] + w), b.push(x[C] + w), b.push(x[C + 1] + w), b.push(x[C + 2] + w), b.push(x[C + 2] + w);
                        for (C = 0; C < l.length; C++) m.push(l[C], l[++C], y, d, g, v)
                    }
                    if (t.Sx) {
                        var M = t.ly;
                        t.ly = l, r(t, i), t.ly = M
                    }
                },
                h = function(t, i, n, e, r, o, s) {
                    function h(t, i, n) {
                        var e = i - t;
                        return t + e * n
                    }
                    for (var a, u, c, f, l, p, v = 20, y = s || [], d = 0, g = 0; g <= v; g++) d = g / v, a = h(t, n, d), u = h(i, e, d), c = h(n, r, d), f = h(e, o, d), l = h(a, c, d), p = h(u, f, d), y.push(l, p);
                    return y
                };
            i.r = s
        }, {
            _z: 151,
            aA: 93,
            cA: 15
        }],
        97: [function(t, i, n) {
            var e = i.r = Object.Dm(t("./const"), t("./math"), {
                Wt: t("./utils"),
                dA: t("./ticker"),
                Kt: t("./display/DisplayObject"),
                eA: t("./display/Container"),
                fA: t("./display/Transform"),
                gA: t("./display/TransformStatic"),
                hA: t("./display/TransformBase"),
                iA: t("./sprites/Sprite"),
                jA: t("./sprites/canvas/CanvasSpriteRenderer"),
                kA: t("./sprites/canvas/CanvasTinter"),
                lA: t("./sprites/webgl/SpriteRenderer"),
                mA: t("./text/Text"),
                nA: t("./text/TextStyle"),
                oA: t("./graphics/Graphics"),
                pA: t("./graphics/GraphicsData"),
                qA: t("./graphics/webgl/GraphicsRenderer"),
                rA: t("./graphics/canvas/CanvasGraphicsRenderer"),
                sA: t("./textures/Texture"),
                tA: t("./textures/BaseTexture"),
                uA: t("./textures/RenderTexture"),
                vA: t("./textures/BaseRenderTexture"),
                wA: t("./textures/VideoBaseTexture"),
                xA: t("./textures/TextureUvs"),
                ru: t("./renderers/canvas/CanvasRenderer"),
                yA: t("./renderers/canvas/utils/CanvasRenderTarget"),
                zA: t("./Shader"),
                qu: t("./renderers/webgl/WebGLRenderer"),
                AA: t("./renderers/webgl/managers/WebGLManager"),
                BA: t("./renderers/webgl/utils/ObjectRenderer"),
                CA: t("./renderers/webgl/utils/RenderTarget"),
                DA: t("./renderers/webgl/utils/Quad"),
                EA: t("./renderers/webgl/filters/spriteMask/SpriteMaskFilter"),
                FA: t("./renderers/webgl/filters/Filter"),
                GA: t("pixi-gl-core"),
                HA: function(t, i, n, r) {
                    return t = t || 800, i = i || 600, !r && e.Wt.IA() ? new e.qu(t, i, n) : new e.ru(t, i, n)
                }
            })
        }, {
            JA: 77,
            zu: 78,
            KA: 80,
            LA: 81,
            MA: 82,
            NA: 83,
            OA: 84,
            PA: 85,
            QA: 86,
            RA: 87,
            SA: 89,
            TA: 102,
            UA: 109,
            VA: 111,
            WA: 116,
            XA: 118,
            YA: 121,
            ZA: 125,
            $A: 126,
            _A: 127,
            aB: 128,
            bB: 133,
            cB: 134,
            dB: 135,
            eB: 137,
            fB: 139,
            gB: 140,
            hB: 141,
            iB: 142,
            jB: 143,
            kB: 144,
            lB: 145,
            mB: 146,
            nB: 148,
            oB: 151,
            Au: 51
        }],
        98: [function(t, i, n) {
            function e(t) {
                return t < 0 ? -1 : t > 0 ? 1 : 0
            }

            function r() {
                for (var t = 0; t < 16; t++) {
                    var i = [];
                    f.push(i);
                    for (var n = 0; n < 16; n++)
                        for (var r = e(o[t] * o[n] + h[t] * s[n]), l = e(s[t] * o[n] + a[t] * s[n]), p = e(o[t] * h[n] + h[t] * a[n]), v = e(s[t] * h[n] + a[t] * a[n]), y = 0; y < 16; y++)
                            if (o[y] === r && s[y] === l && h[y] === p && a[y] === v) {
                                i.push(y);
                                break
                            }
                }
                for (t = 0; t < 16; t++) {
                    var d = new c;
                    d.P(o[t], s[t], h[t], a[t], 0, 0), u.push(d)
                }
            }
            var o = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
                s = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
                h = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
                a = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
                u = [],
                c = t("./Matrix"),
                f = [];
            r();
            var l = {
                E: 0,
                pB: 1,
                qB: 2,
                rB: 3,
                sB: 4,
                tB: 5,
                uB: 6,
                vB: 7,
                wB: 8,
                xB: 12,
                yB: function(t) {
                    return o[t]
                },
                zB: function(t) {
                    return s[t]
                },
                AB: function(t) {
                    return h[t]
                },
                BB: function(t) {
                    return a[t]
                },
                CB: function(t) {
                    return 8 & t ? 15 & t : 7 & -t
                },
                ra: function(t, i) {
                    return f[t][i]
                },
                sub: function(t, i) {
                    return f[t][l.CB(i)]
                },
                DB: function(t) {
                    return 4 ^ t
                },
                EB: function(t) {
                    return 2 === (3 & t)
                },
                FB: function(t, i) {
                    return 2 * Math.abs(t) <= Math.abs(i) ? i >= 0 ? l.qB : l.uB : 2 * Math.abs(i) <= Math.abs(t) ? t > 0 ? l.E : l.sB : i > 0 ? t > 0 ? l.pB : l.rB : t > 0 ? l.vB : l.tB
                },
                GB: function(t, i, n, e) {
                    var r = u[l.CB(i)];
                    n = n || 0, e = e || 0, r.$t = n, r.au = e, t.Og(r)
                }
            };
            i.r = l
        }, {
            HB: 99
        }],
        99: [function(t, i, n) {
            function e() {
                this._t = 1, this.ew = 0, this.fw = 0, this.bu = 1, this.$t = 0, this.au = 0, this.rq = null
            }
            var r = t("./Point");
            e.prototype.constructor = e, i.r = e, e.prototype.IB = function(t) {
                this._t = t[0], this.ew = t[1], this.fw = t[3], this.bu = t[4], this.$t = t[2], this.au = t[5]
            }, e.prototype.P = function(t, i, n, e, r, o) {
                return this._t = t, this.ew = i, this.fw = n, this.bu = e, this.$t = r, this.au = o, this
            }, e.prototype.$b = function(t, i) {
                this.rq || (this.rq = new Float32Array(9));
                var n = i || this.rq;
                return t ? (n[0] = this._t, n[1] = this.ew, n[2] = 0, n[3] = this.fw, n[4] = this.bu, n[5] = 0, n[6] = this.$t, n[7] = this.au, n[8] = 1) : (n[0] = this._t, n[1] = this.fw, n[2] = this.$t, n[3] = this.ew, n[4] = this.bu, n[5] = this.au, n[6] = 0, n[7] = 0, n[8] = 1), n
            }, e.prototype.apply = function(t, i) {
                i = i || new r;
                var n = t.g,
                    e = t.h;
                return i.g = this._t * n + this.fw * e + this.$t, i.h = this.ew * n + this.bu * e + this.au, i
            }, e.prototype.mx = function(t, i) {
                i = i || new r;
                var n = 1 / (this._t * this.bu + this.fw * -this.ew),
                    e = t.g,
                    o = t.h;
                return i.g = this.bu * n * e + -this.fw * n * o + (this.au * this.fw - this.$t * this.bu) * n, i.h = this._t * n * o + -this.ew * n * e + (-this.au * this._t + this.$t * this.ew) * n, i
            }, e.prototype.JB = function(t, i) {
                return this.$t += t, this.au += i, this
            }, e.prototype.jw = function(t, i) {
                return this._t *= t, this.bu *= i, this.fw *= t, this.ew *= i, this.$t *= t, this.au *= i, this
            }, e.prototype.KB = function(t) {
                var i = Math.cos(t),
                    n = Math.sin(t),
                    e = this._t,
                    r = this.fw,
                    o = this.$t;
                return this._t = e * i - this.ew * n, this.ew = e * n + this.ew * i, this.fw = r * i - this.bu * n, this.bu = r * n + this.bu * i, this.$t = o * i - this.au * n, this.au = o * n + this.au * i, this
            }, e.prototype.Og = function(t) {
                var i = this._t,
                    n = this.ew,
                    e = this.fw,
                    r = this.bu;
                return this._t = t._t * i + t.ew * e, this.ew = t._t * n + t.ew * r, this.fw = t.fw * i + t.bu * e, this.bu = t.fw * n + t.bu * r, this.$t = t.$t * i + t.au * e + this.$t, this.au = t.$t * n + t.au * r + this.au, this
            }, e.prototype.ox = function(t, i, n, e, r, o, s, h, a) {
                var u, c, f, l, p, v, y, d, g, m;
                return p = Math.sin(s), v = Math.cos(s), y = Math.cos(a), d = Math.sin(a), g = -Math.sin(h), m = Math.cos(h), u = v * r, c = p * r, f = -p * o, l = v * o, this._t = y * u + d * f, this.ew = y * c + d * l, this.fw = g * u + m * f, this.bu = g * c + m * l, this.$t = t + (n * u + e * f), this.au = i + (n * c + e * l), this
            }, e.prototype.Pg = function(t) {
                var i = this.$t;
                if (1 !== t._t || 0 !== t.ew || 0 !== t.fw || 1 !== t.bu) {
                    var n = this._t,
                        e = this.fw;
                    this._t = n * t._t + this.ew * t.fw, this.ew = n * t.ew + this.ew * t.bu, this.fw = e * t._t + this.bu * t.fw, this.bu = e * t.ew + this.bu * t.bu
                }
                return this.$t = i * t._t + this.au * t.fw + t.$t, this.au = i * t.ew + this.au * t.bu + t.au, this
            }, e.prototype.Hx = function(t) {
                var i = this._t,
                    n = this.ew,
                    e = this.fw,
                    r = this.bu,
                    o = Math.atan2(-e, r),
                    s = Math.atan2(n, i),
                    h = Math.abs(1 - o / s);
                return h < 1e-5 ? (t.ex = s, i < 0 && r >= 0 && (t.ex += t.ex <= 0 ? Math.PI : -Math.PI), t.dx.g = t.dx.h = 0) : (t.dx.g = o, t.dx.h = s), t.jw.g = Math.sqrt(i * i + n * n), t.jw.h = Math.sqrt(e * e + r * r), t.gh.g = this.$t, t.gh.h = this.au, t
            }, e.prototype.LB = function() {
                var t = this._t,
                    i = this.ew,
                    n = this.fw,
                    e = this.bu,
                    r = this.$t,
                    o = t * e - i * n;
                return this._t = e / o, this.ew = -i / o, this.fw = -n / o, this.bu = t / o, this.$t = (n * this.au - e * r) / o, this.au = -(t * this.au - i * r) / o, this
            }, e.prototype.MB = function() {
                return this._t = 1, this.ew = 0, this.fw = 0, this.bu = 1, this.$t = 0, this.au = 0, this
            }, e.prototype.Ea = function() {
                var t = new e;
                return t._t = this._t, t.ew = this.ew, t.fw = this.fw, t.bu = this.bu, t.$t = this.$t, t.au = this.au, t
            }, e.prototype.bx = function(t) {
                return t._t = this._t, t.ew = this.ew, t.fw = this.fw, t.bu = this.bu, t.$t = this.$t, t.au = this.au, t
            }, e.Lx = new e, e.NB = new e
        }, {
            OB: 101
        }],
        100: [function(t, i, n) {
            function e(t, i, n, e) {
                this.Qx = n || 0, this.Px = e || 0, this.PB = t, this.QB = i
            }
            e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                g: {
                    _: function() {
                        return this.Qx
                    },
                    P: function(t) {
                        this.Qx !== t && (this.Qx = t, this.PB.call(this.QB))
                    }
                },
                h: {
                    _: function() {
                        return this.Px
                    },
                    P: function(t) {
                        this.Px !== t && (this.Px = t, this.PB.call(this.QB))
                    }
                }
            }), e.prototype.P = function(t, i) {
                var n = t || 0,
                    e = i || (0 !== i ? n : 0);
                this.Qx === n && this.Px === e || (this.Qx = n, this.Px = e, this.PB.call(this.QB))
            }, e.prototype.bx = function(t) {
                this.Qx === t.g && this.Px === t.h || (this.Qx = t.g, this.Px = t.h, this.PB.call(this.QB))
            }
        }, {}],
        101: [function(t, i, n) {
            function e(t, i) {
                this.g = t || 0, this.h = i || 0
            }
            e.prototype.constructor = e, i.r = e, e.prototype.Ea = function() {
                return new e(this.g, this.h)
            }, e.prototype.bx = function(t) {
                this.P(t.g, t.h)
            }, e.prototype.RB = function(t) {
                return t.g === this.g && t.h === this.h
            }, e.prototype.P = function(t, i) {
                this.g = t || 0, this.h = i || (0 !== i ? this.g : 0)
            }
        }, {}],
        102: [function(t, i, n) {
            i.r = {
                vx: t("./Point"),
                wx: t("./ObservablePoint"),
                Jx: t("./Matrix"),
                SB: t("./GroupD8"),
                Fy: t("./shapes/Circle"),
                Hy: t("./shapes/Ellipse"),
                ny: t("./shapes/Polygon"),
                Yv: t("./shapes/Rectangle"),
                Dy: t("./shapes/RoundedRectangle")
            }
        }, {
            TB: 98,
            HB: 99,
            UB: 100,
            OB: 101,
            VB: 103,
            WB: 104,
            XB: 105,
            YB: 106,
            ZB: 107
        }],
        103: [function(t, i, n) {
            function e(t, i, n) {
                this.g = t || 0, this.h = i || 0, this.Wy = n || 0, this.z = o.Bv.Ev
            }
            var r = t("./Rectangle"),
                o = t("../../const");
            e.prototype.constructor = e, i.r = e, e.prototype.Ea = function() {
                return new e(this.g, this.h, this.Wy)
            }, e.prototype.na = function(t, i) {
                if (this.Wy <= 0) return !1;
                var n = this.g - t,
                    e = this.h - i,
                    r = this.Wy * this.Wy;
                return n *= n, e *= e, n + e <= r
            }, e.prototype.cu = function() {
                return new r(this.g - this.Wy, this.h - this.Wy, 2 * this.Wy, 2 * this.Wy)
            }
        }, {
            yz: 78,
            $B: 106
        }],
        104: [function(t, i, n) {
            function e(t, i, n, e) {
                this.g = t || 0, this.h = i || 0, this.Ka = n || 0, this.Ua = e || 0, this.z = o.Bv.Fv
            }
            var r = t("./Rectangle"),
                o = t("../../const");
            e.prototype.constructor = e, i.r = e, e.prototype.Ea = function() {
                return new e(this.g, this.h, this.Ka, this.Ua)
            }, e.prototype.na = function(t, i) {
                if (this.Ka <= 0 || this.Ua <= 0) return !1;
                var n = (t - this.g) / this.Ka,
                    e = (i - this.h) / this.Ua;
                return n *= n, e *= e, n + e <= 1
            }, e.prototype.cu = function() {
                return new r(this.g - this.Ka, this.h - this.Ua, this.Ka, this.Ua)
            }
        }, {
            yz: 78,
            $B: 106
        }],
        105: [function(t, i, n) {
            function e(t) {
                var i = t;
                if (!Array.isArray(i)) {
                    i = new Array(arguments.length);
                    for (var n = 0; n < i.length; ++n) i[n] = arguments[n]
                }
                if (i[0] instanceof r) {
                    for (var e = [], s = 0, h = i.length; s < h; s++) e.push(i[s].g, i[s].h);
                    i = e
                }
                this.oy = !0, this.ly = i, this.z = o.Bv.Cv
            }
            var r = t("../Point"),
                o = t("../../const");
            e.prototype.constructor = e, i.r = e, e.prototype.Ea = function() {
                return new e(this.ly.slice())
            }, e.prototype.bz = function() {
                var t = this.ly;
                t[0] === t[t.length - 2] && t[1] === t[t.length - 1] || t.push(t[0], t[1])
            }, e.prototype.na = function(t, i) {
                for (var n = !1, e = this.ly.length / 2, r = 0, o = e - 1; r < e; o = r++) {
                    var s = this.ly[2 * r],
                        h = this.ly[2 * r + 1],
                        a = this.ly[2 * o],
                        u = this.ly[2 * o + 1],
                        c = h > i != u > i && t < (a - s) * (i - h) / (u - h) + s;
                    c && (n = !n)
                }
                return n
            }
        }, {
            yz: 78,
            _B: 101
        }],
        106: [function(t, i, n) {
            function e(t, i, n, e) {
                this.g = t || 0, this.h = i || 0, this.Ka = n || 0, this.Ua = e || 0, this.z = r.Bv.Dv
            }
            var r = t("../../const");
            e.prototype.constructor = e, i.r = e, e.aw = new e(0, 0, 0, 0), e.prototype.Ea = function() {
                return new e(this.g, this.h, this.Ka, this.Ua)
            }, e.prototype.bx = function(t) {
                return this.g = t.g, this.h = t.h, this.Ka = t.Ka, this.Ua = t.Ua, this
            }, e.prototype.na = function(t, i) {
                return !(this.Ka <= 0 || this.Ua <= 0) && (t >= this.g && t < this.g + this.Ka && i >= this.h && i < this.h + this.Ua)
            }, e.prototype.aC = function(t, i) {
                t = t || 0, i = i || (0 !== i ? t : 0), this.g -= t, this.h -= i, this.Ka += 2 * t, this.Ua += 2 * i
            }, e.prototype.bC = function(t) {
                this.g < t.g && (this.Ka += this.g, this.Ka < 0 && (this.Ka = 0), this.g = t.g), this.h < t.h && (this.Ua += this.h, this.Ua < 0 && (this.Ua = 0), this.h = t.h), this.g + this.Ka > t.g + t.Ka && (this.Ka = t.Ka - this.g, this.Ka < 0 && (this.Ka = 0)), this.h + this.Ua > t.h + t.Ua && (this.Ua = t.Ua - this.h, this.Ua < 0 && (this.Ua = 0))
            }, e.prototype.cC = function(t) {
                if (t !== e.aw) {
                    var i = Math.min(this.g, t.g),
                        n = Math.max(this.g + this.Ka, t.g + t.Ka),
                        r = Math.min(this.h, t.h),
                        o = Math.max(this.h + this.Ua, t.h + t.Ua);
                    this.g = i, this.Ka = n - i, this.h = r, this.Ua = o - r
                }
            }
        }, {
            yz: 78
        }],
        107: [function(t, i, n) {
            function e(t, i, n, e, o) {
                this.g = t || 0, this.h = i || 0, this.Ka = n || 0, this.Ua = e || 0, this.Wy = o || 20, this.z = r.Bv.Gv
            }
            var r = t("../../const");
            e.prototype.constructor = e, i.r = e, e.prototype.Ea = function() {
                return new e(this.g, this.h, this.Ka, this.Ua, this.Wy)
            }, e.prototype.na = function(t, i) {
                return !(this.Ka <= 0 || this.Ua <= 0) && (t >= this.g && t <= this.g + this.Ka && i >= this.h && i <= this.h + this.Ua)
            }
        }, {
            yz: 78
        }],
        108: [function(t, i, n) {
            function e(t, i, n, e) {
                if (u.call(this), r.dC(t), e)
                    for (var o in s.sv) "undefined" == typeof e[o] && (e[o] = s.sv[o]);
                else e = s.sv;
                this.z = s.Gu.Hu, this.Ka = i || 800, this.Ua = n || 600, this.pg = e.pg || document.t("canvas"), this.tv = e.tv, this.xv = e.xv, this.wv = e.wv || !1, this.eC = null, this.zv = e.zv, this.yv = e.yv, this.Av = e.Av, this.fC = 0, this.gC = [0, 0, 0, 0], this.hC = "#000000", this.Lt = e.Lt || this.fC, this.iC = new h, this.Ut = this.iC
            }
            var r = t("../utils"),
                o = t("../math"),
                s = t("../const"),
                h = t("../display/Container"),
                a = t("../textures/RenderTexture"),
                u = t("eventemitter3"),
                c = new o.Jx;
            e.prototype = Object.create(u.prototype), e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                Lt: {
                    _: function() {
                        return this.fC
                    },
                    P: function(t) {
                        this.fC = t, this.hC = r.jC(t), r.Ry(t, this.gC)
                    }
                }
            }), e.prototype.tn = function(t, i) {
                this.Ka = t * this.tv, this.Ua = i * this.tv, this.pg.Ka = this.Ka, this.pg.Ua = this.Ua, this.wv && (this.pg.T.Ka = this.Ka / this.tv + "px", this.pg.T.Ua = this.Ua / this.tv + "px")
            }, e.prototype.kC = function(t, i, n) {
                var e = t.kw(),
                    r = a.create(0 | e.Ka, 0 | e.Ua, i, n);
                return c.$t = -e.g, c.au = -e.h, this.Ny(t, r, !1, c, !0), r
            }, e.prototype.Ym = function(t) {
                t && this.pg.w && this.pg.w.v(this.pg), this.z = s.Gu.Hu, this.Ka = 0, this.Ua = 0, this.pg = null, this.tv = 0, this.xv = !1, this.wv = !1, this.eC = null, this.zv = !1, this.yv = !1, this.Av = !1, this.fC = 0, this.gC = null, this.hC = null, this.Lt = 0, this.iC = null, this.Ut = null
            }
        }, {
            rx: 78,
            fz: 80,
            iw: 102,
            iz: 143,
            Xw: 151,
            nr: 16
        }],
        109: [function(t, i, n) {
            function e(t, i, n) {
                n = n || {}, r.call(this, "Canvas", t, i, n), this.z = u.Gu.Ju, this.lC = this.pg.Ro("2d", {
                    Aw: this.xv
                }), this.mC = this.tv, this.nC = !0, this.Sw = new o(this), this.oC = "imageSmoothingEnabled", this.lC.pC || (this.lC.qC ? this.oC = "webkitImageSmoothingEnabled" : this.lC.rC ? this.oC = "mozImageSmoothingEnabled" : this.lC.sC ? this.oC = "oImageSmoothingEnabled" : this.lC.tC && (this.oC = "msImageSmoothingEnabled")), this.uC(), this.eC = h(), this.vC = null, this.Xi = null, this.Tt = !1, this.tn(t, i)
            }
            var r = t("../SystemRenderer"),
                o = t("./utils/CanvasMaskManager"),
                s = t("./utils/CanvasRenderTarget"),
                h = t("./utils/mapCanvasBlendModesToPixi"),
                a = t("../../utils"),
                u = t("../../const");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, a.xC.wC(e), e.prototype.Ny = function(t, i, n, e, r) {
                if (this.pg) {
                    this.Tt = !i, this.Ll("prerender"), i ? (i = i._y || i, i.$y || (i.$y = new s(i.Ka, i.Ua, i.tv), i.source = i.$y.Zy, i.yC = !0), this.Xi = i.$y.Xi, this.tv = i.$y.tv) : (this.Xi = this.lC, this.tv = this.mC);
                    var o = this.Xi;
                    if (i || (this.Ut = t), !r) {
                        var h = t.Kd,
                            a = this.iC.pw.Zt;
                        e ? e.bx(a) : a.MB(), t.Kd = this.iC, t.xw(), t.Kd = h
                    }
                    o.ox(1, 0, 0, 1, 0, 0), o.sz = 1, o.zC = this.eC[u.Ku.Lu], navigator.bs && this.pg.AC && (o.tz = "black", o.pn()), (void 0 !== n ? n : this.yv) && this.Tt && (this.xv ? o.BC(0, 0, this.Ka, this.Ua) : (o.tz = this.hC, o.wz(0, 0, this.Ka, this.Ua)));
                    var c = this.Xi;
                    this.Xi = o, t.Ww(this), this.Xi = c, this.Ll("postrender")
                }
            }, e.prototype.pz = function(t) {
                this.vC !== t && (this.Xi.zC = this.eC[t])
            }, e.prototype.Ym = function(t) {
                this.CC(), r.prototype.Ym.call(this, t), this.Xi = null, this.nC = !0, this.Sw.Ym(), this.Sw = null, this.oC = null
            }, e.prototype.tn = function(t, i) {
                r.prototype.tn.call(this, t, i), this.oC && (this.lC[this.oC] = u.iv.us === u.iv.co)
            }
        }, {
            yz: 78,
            Nz: 151,
            DC: 108,
            EC: 110,
            FC: 111,
            GC: 113
        }],
        110: [function(t, i, n) {
            function e(t) {
                this.Ft = t
            }
            var r = t("../../../const");
            e.prototype.constructor = e, i.r = e, e.prototype.Rw = function(t) {
                var i = this.Ft;
                i.Xi.HC();
                var n = t.Aw,
                    e = t.pw.Zt,
                    r = i.tv;
                i.Xi.ox(e._t * r, e.ew * r, e.fw * r, e.bu * r, e.$t * r, e.au * r), t.IC || (this.JC(t), i.Xi.KC()), t.zw = n
            }, e.prototype.JC = function(t) {
                var i = this.Ft.Xi,
                    n = t.Ux.length;
                if (0 !== n) {
                    i.qz();
                    for (var e = 0; e < n; e++) {
                        var o = t.Ux[e],
                            s = o.my;
                        if (o.z === r.Bv.Cv) {
                            var h = s.ly;
                            i.qy(h[0], h[1]);
                            for (var a = 1; a < h.length / 2; a++) i.ry(h[2 * a], h[2 * a + 1]);
                            h[0] === h[h.length - 2] && h[1] === h[h.length - 1] && i.az()
                        } else if (o.z === r.Bv.Dv) i.Xv(s.g, s.h, s.Ka, s.Ua), i.az();
                        else if (o.z === r.Bv.Ev) i.vy(s.g, s.h, s.Wy, 0, 2 * Math.PI), i.az();
                        else if (o.z === r.Bv.Fv) {
                            var u = 2 * s.Ka,
                                c = 2 * s.Ua,
                                f = s.g - u / 2,
                                l = s.h - c / 2,
                                p = .5522848,
                                v = u / 2 * p,
                                y = c / 2 * p,
                                d = f + u,
                                g = l + c,
                                m = f + u / 2,
                                b = l + c / 2;
                            i.qy(f, b), i.ty(f, b - y, m - v, l, m, l), i.ty(m + v, l, d, b - y, d, b), i.ty(d, b + y, m + v, g, m, g), i.ty(m - v, g, f, b + y, f, b), i.az()
                        } else if (o.z === r.Bv.Gv) {
                            var w = s.g,
                                x = s.h,
                                C = s.Ka,
                                M = s.Ua,
                                F = s.Wy,
                                z = Math.min(C, M) / 2 | 0;
                            F = F > z ? z : F, i.qy(w, x + F), i.ry(w, x + M - F), i.sy(w, x + M, w + F, x + M), i.ry(w + C - F, x + M), i.sy(w + C, x + M, w + C, x + M - F), i.ry(w + C, x + F), i.sy(w + C, x, w + C - F, x), i.ry(w + F, x), i.sy(w, x, w, x + F), i.az()
                        }
                    }
                }
            }, e.prototype.Tw = function(t) {
                t.Xi.LC()
            }, e.prototype.Ym = function() {}
        }, {
            $z: 78
        }],
        111: [function(t, i, n) {
            function e(t, i, n) {
                this.Zy = document.t("canvas"), this.Xi = this.Zy.Ro("2d"), this.tv = n || r.qv, this.tn(t, i)
            }
            var r = t("../../../const");
            e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                Ka: {
                    _: function() {
                        return this.Zy.Ka
                    },
                    P: function(t) {
                        this.Zy.Ka = t
                    }
                },
                Ua: {
                    _: function() {
                        return this.Zy.Ua
                    },
                    P: function(t) {
                        this.Zy.Ua = t
                    }
                }
            }), e.prototype.pn = function() {
                this.Xi.ox(1, 0, 0, 1, 0, 0), this.Xi.BC(0, 0, this.Zy.Ka, this.Zy.Ua)
            }, e.prototype.tn = function(t, i) {
                this.Zy.Ka = t * this.tv, this.Zy.Ua = i * this.tv
            }, e.prototype.Ym = function() {
                this.Xi = null, this.Zy = null
            }
        }, {
            $z: 78
        }],
        112: [function(t, i, n) {
            var e = function(t) {
                    var i = document.t("canvas");
                    i.Ka = 6, i.Ua = 1;
                    var n = i.Ro("2d");
                    return n.tz = t, n.wz(0, 0, 6, 1), i
                },
                r = function() {
                    if ("undefined" == typeof document) return !1;
                    var t = e("#ff00ff"),
                        i = e("#ffff00"),
                        n = document.t("canvas");
                    n.Ka = 6, n.Ua = 1;
                    var r = n.Ro("2d");
                    r.zC = "multiply", r.MC(t, 0, 0), r.MC(i, 2, 0);
                    var o = r.NC(2, 0, 1, 1);
                    if (!o) return !1;
                    var s = o.Wb;
                    return 255 === s[0] && 0 === s[1] && 0 === s[2]
                };
            i.r = r
        }, {}],
        113: [function(t, i, n) {
            function e(t) {
                return t = t || [], o() ? (t[r.Ku.Lu] = "source-over", t[r.Ku.Mu] = "lighter", t[r.Ku.Nu] = "multiply", t[r.Ku.Ou] = "screen", t[r.Ku.Pu] = "overlay", t[r.Ku.Qu] = "darken", t[r.Ku.Ru] = "lighten", t[r.Ku.Su] = "color-dodge", t[r.Ku.Tu] = "color-burn", t[r.Ku.Uu] = "hard-light", t[r.Ku.Vu] = "soft-light", t[r.Ku.Wu] = "difference", t[r.Ku.Xu] = "exclusion", t[r.Ku.Yu] = "hue", t[r.Ku.Zu] = "saturate", t[r.Ku.$u] = "color", t[r.Ku._u] = "luminosity") : (t[r.Ku.Lu] = "source-over", t[r.Ku.Mu] = "lighter", t[r.Ku.Nu] = "source-over", t[r.Ku.Ou] = "source-over", t[r.Ku.Pu] = "source-over", t[r.Ku.Qu] = "source-over", t[r.Ku.Ru] = "source-over", t[r.Ku.Su] = "source-over", t[r.Ku.Tu] = "source-over", t[r.Ku.Uu] = "source-over", t[r.Ku.Vu] = "source-over", t[r.Ku.Wu] = "source-over", t[r.Ku.Xu] = "source-over", t[r.Ku.Yu] = "source-over", t[r.Ku.Zu] = "source-over", t[r.Ku.$u] = "source-over", t[r.Ku._u] = "source-over"), t
            }
            var r = t("../../../const"),
                o = t("./canUseNewCanvasBlendModes");
            i.r = e
        }, {
            $z: 78,
            OC: 112
        }],
        114: [function(t, i, n) {
            function e(t) {
                this.Ft = t, this.PC = 0, this.QC = 0, this.RC = 3600, this.SC = 600, this.TC = r.lv.us
            }
            var r = t("../../const");
            e.prototype.constructor = e, i.r = e, e.prototype.Mt = function() {
                this.PC++, this.TC !== r.lv.nv && (this.QC++, this.QC > this.SC && (this.QC = 0, this.rb()))
            }, e.prototype.rb = function() {
                var t, i, n = this.Ft.UC,
                    e = n.VC,
                    r = !1;
                for (t = 0; t < e.length; t++) {
                    var o = e[t];
                    !o.WC && this.PC - o.XC > this.RC && (n.YC(o, !0), e[t] = null, r = !0)
                }
                if (r) {
                    for (i = 0, t = 0; t < e.length; t++) null !== e[t] && (e[i++] = e[t]);
                    e.length = i
                }
            }, e.prototype.ZC = function(t) {
                var i = this.Ft.UC;
                t.IC && i.YC(t.IC, !0);
                for (var n = t.he.length - 1; n >= 0; n--) this.ZC(t.he[n])
            }
        }, {
            yz: 78
        }],
        115: [function(t, i, n) {
            var e = t("pixi-gl-core").Xo,
                r = t("../../const"),
                o = t("./utils/RenderTarget"),
                s = t("../../utils"),
                h = function(t) {
                    this.Ft = t, this.Lm = t.Lm, this.VC = []
                };
            h.prototype.Yn = function() {}, h.prototype.$C = function() {}, h.prototype._C = function(t) {
                t = t._y || t;
                var i = !!t.WC;
                if (t.aD) {
                    var n = t.bD[this.Ft.Cz];
                    if (n) i ? t.WC[this.Ft.Cz].tn(t.Ka, t.Ua) : n.Qm(t.source);
                    else {
                        if (i) {
                            var s = new o(this.Lm, t.Ka, t.Ua, t.cD, t.tv);
                            s.tn(t.Ka, t.Ua), t.WC[this.Ft.Cz] = s, n = s.bn
                        } else n = new e(this.Lm), n.Ln = !0, n.Qm(t.source);
                        t.bD[this.Ft.Cz] = n, t.Lg("update", this._C, this), t.Lg("dispose", this.YC, this), this.VC.push(t), t.dD ? (t.Kn && n.go(), t.eD === r.jv.kv ? n.zn() : t.eD === r.jv.no ? n.mo() : n.oo()) : n.zn(), t.cD === r.iv.do ? n.yn() : n.io()
                    }
                    return n
                }
            }, h.prototype.YC = function(t, i) {
                if (t = t._y || t, t.aD && t.bD[this.Ft.Cz] && (t.bD[this.Ft.Cz].Ym(), t.pa("update", this._C, this), t.pa("dispose", this.YC, this), delete t.bD[this.Ft.Cz], !i)) {
                    var n = this.VC.indexOf(t);
                    n !== -1 && s.Vt(this.VC, n, 1)
                }
            }, h.prototype.fD = function() {
                for (var t = 0; t < this.VC.length; ++t) {
                    var i = this.VC[t];
                    i.bD[this.Ft.Cz] && delete i.bD[this.Ft.Cz]
                }
            }, h.prototype.Ym = function() {
                for (var t = 0; t < this.VC.length; ++t) {
                    var i = this.VC[t];
                    this.YC(i, !0), i.pa("update", this._C, this), i.pa("dispose", this.YC, this)
                }
                this.VC = null
            }, i.r = h
        }, {
            yz: 78,
            Nz: 151,
            gD: 128,
            Au: 51
        }],
        116: [function(t, i, n) {
            function e(t, i, n) {
                n = n || {}, r.call(this, "WebGL", t, i, n), this.z = m.Gu.Iu, this.hD = this.hD.bind(this), this.iD = this.iD.bind(this), this.pg.Sc("webglcontextlost", this.hD, !1), this.pg.Sc("webglcontextrestored", this.iD, !1), this.jD = {
                    Aw: this.xv,
                    uv: n.uv,
                    kD: this.xv && "notMultiplied" !== this.xv,
                    an: !0,
                    zv: n.zv
                }, this.gC[3] = this.xv ? 0 : 1, this.Sw = new o(this), this.lD = new s(this), this.mD = new u(this), this.Nw = this.mD, this.uC(), n.Xi && y(n.Xi), this.Lm = n.Xi || p(this.pg, this.jD), this.Cz = b++, this.Ub = new l(this.Lm), this.Tt = !0, this.nD(), this.Qw = new h(this), this.oD = v(this.Lm), this.pD = null, this.Oy = null, this.qD = 999, this.rD = null, this.pz(0)
            }
            var r = t("../SystemRenderer"),
                o = t("./managers/MaskManager"),
                s = t("./managers/StencilManager"),
                h = t("./managers/FilterManager"),
                a = t("./utils/RenderTarget"),
                u = t("./utils/ObjectRenderer"),
                c = t("./TextureManager"),
                f = t("./TextureGarbageCollector"),
                l = t("./WebGLState"),
                p = t("pixi-gl-core").So,
                v = t("./utils/mapWebGLDrawModesToPixi"),
                y = t("./utils/validateContext"),
                d = t("../../utils"),
                g = t("pixi-gl-core"),
                m = t("../../const"),
                b = 0;
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, d.xC.wC(e), e.prototype.nD = function() {
                var t = this.Lm;
                this.UC = new c(this), this.sD = new f(this), this.Ub.tD(), this.uD = new a(t, this.Ka, this.Ua, null, this.tv, !0), this.uD.qn = this.gC, this.Qy(this.uD), this.Ll("context", t), this.tn(this.Ka, this.Ua)
            }, e.prototype.Ny = function(t, i, n, e, r) {
                if (this.Tt = !i, this.Ll("prerender"), this.Lm && !this.Lm.vD()) {
                    if (i || (this.Ut = t), !r) {
                        var o = t.Kd;
                        t.Kd = this.iC, t.xw(), t.Kd = o
                    }
                    this.Py(i, e), this.Nw.V(), (void 0 !== n ? n : this.yv) && this.Oy.pn(), t.Gw(this), this.Nw.Mw(), this.sD.Mt(), this.Ll("postrender")
                }
            }, e.prototype.Ly = function(t) {
                this.Nw !== t && (this.Nw.Cb(), this.Nw = t, this.Nw.V())
            }, e.prototype.Mw = function() {
                this.Ly(this.mD)
            }, e.prototype.tn = function(t, i) {
                r.prototype.tn.call(this, t, i), this.uD.tn(t, i), this.Oy === this.uD && (this.uD.Eo(), this.pD && (this.pD.Dn.wD = this.uD.wD.$b(!0)))
            }, e.prototype.pz = function(t) {
                this.Ub.pz(t)
            }, e.prototype.pn = function(t) {
                this.Oy.pn(t)
            }, e.prototype.ox = function(t) {
                this.Oy.pw = t
            }, e.prototype.Py = function(t, i) {
                var n;
                if (t) {
                    var e = t._y,
                        r = this.Lm;
                    e.WC[this.Cz] ? (this.qD = e.xD, r.Wn(r.Xn + e.xD), r.Yn(r.gn, null)) : (this.UC._C(e), r.Yn(r.gn, null)), n = e.WC[this.Cz], n.yD(t.zD)
                } else n = this.uD;
                return n.pw = i, this.Qy(n), this
            }, e.prototype.Qy = function(t) {
                return t !== this.Oy && (this.Oy = t, t.Eo(), this.pD && (this.pD.Dn.wD = t.wD.$b(!0)), this.lD.AD(t.BD)), this
            }, e.prototype.Fz = function(t) {
                return this.pD !== t && (this.pD = t, t.bind(), t.Dn.wD = this.Oy.wD.$b(!0)), this
            }, e.prototype.Yn = function(t, i) {
                t = t._y || t;
                var n = this.Lm;
                return i = i || 0, this.qD !== i && (this.qD = i, n.Wn(n.Xn + i)), this.rD = t, t.bD[this.Cz] ? (t.XC = this.sD.PC, t.bD[this.Cz].bind()) : this.UC._C(t), this
            }, e.prototype.CD = function() {
                return new g.Yo(this.Lm, this.Ub.Ao)
            }, e.prototype.Yd = function() {
                return this.Ly(this.mD), this.pD = null, this.Oy = this.uD, this.qD = 999, this.rD = null, this.uD.Eo(), this.Ub.tD(), this
            }, e.prototype.hD = function(t) {
                t.Lf()
            }, e.prototype.iD = function() {
                this.nD(), this.UC.fD()
            }, e.prototype.Ym = function(t) {
                this.CC(), this.pg.K("webglcontextlost", this.hD), this.pg.K("webglcontextrestored", this.iD), this.UC.Ym(), r.prototype.Ym.call(this, t), this.N = 0, this.Sw.Ym(), this.lD.Ym(), this.Qw.Ym(), this.Sw = null, this.Qw = null, this.UC = null, this.Nw = null, this.hD = null, this.iD = null, this.jD = null, this.Lm.En(null), this.Lm.Un("WEBGL_lose_context") && this.Lm.Un("WEBGL_lose_context").DD(), this.Lm = null
            }
        }, {
            yz: 78,
            Nz: 151,
            DC: 108,
            ED: 114,
            FD: 115,
            GD: 117,
            HD: 122,
            ID: 123,
            JD: 124,
            KD: 126,
            gD: 128,
            LD: 131,
            MD: 132,
            Au: 51
        }],
        117: [function(t, i, n) {
            function e(t) {
                this.ND = new Uint8Array(16), this.OD = new Uint8Array(16), this.OD[0] = 1, this.PD = 0, this.Oe = [], this.Lm = t, this.QD = t.xo(t.yo), this.Ao = {
                    zo: new Array(this.QD),
                    Ao: new Array(this.QD)
                }, this.eC = r(t), this.so = t.Un("OES_vertex_array_object") || t.Un("MOZ_OES_vertex_array_object") || t.Un("WEBKIT_OES_vertex_array_object")
            }
            var r = t("./utils/mapWebGLBlendModesToPixi");
            e.prototype.push = function() {
                var t = this.Oe[++this.PD];
                t || (t = this.Oe[this.PD] = new Uint8Array(16));
                for (var i = 0; i < this.ND.length; i++) this.ND[i] = t[i]
            };
            var o = 0,
                s = 1,
                h = 2,
                a = 3,
                u = 4;
            e.prototype.pop = function() {
                var t = this.Oe[--this.PD];
                this.RD(t)
            }, e.prototype.RD = function(t) {
                this.SD(t[o]), this.TD(t[s]), this.UD(t[h]), this.VD(t[a]), this.pz(t[u])
            }, e.prototype.SD = function(t) {
                if (!(this.ND[o] === t | 0)) {
                    this.ND[o] = 0 | t;
                    var i = this.Lm;
                    t ? i.WD(i.XD) : i.ye(i.XD)
                }
            }, e.prototype.pz = function(t) {
                t !== this.ND[u] && (this.ND[u] = t, this.Lm.YD(this.eC[t][0], this.eC[t][1]))
            }, e.prototype.TD = function(t) {
                if (!(this.ND[s] === t | 0)) {
                    this.ND[s] = 0 | t;
                    var i = this.Lm;
                    t ? i.WD(i.ZD) : i.ye(i.ZD)
                }
            }, e.prototype.VD = function(t) {
                if (!(this.ND[a] === t | 0)) {
                    this.ND[a] = 0 | t;
                    var i = this.Lm;
                    t ? i.WD(i.$D) : i.ye(i.$D)
                }
            }, e.prototype.UD = function(t) {
                if (!(this.ND[h] === t | 0)) {
                    this.ND[h] = 0 | t;
                    var i = this.Lm;
                    t ? i._D(i.aE) : i._D(i.bE)
                }
            }, e.prototype.cE = function() {
                var t;
                for (t = 0; t < this.Ao.zo.length; t++) this.Ao.zo[t] = 0;
                for (t = 0; t < this.Ao.Ao.length; t++) this.Ao.Ao[t] = 0;
                var i = this.Lm;
                for (t = 1; t < this.QD; t++) i.fp(t)
            }, e.prototype.tD = function() {
                this.so && this.so.Do(null), this.cE();
                for (var t = 0; t < this.ND.length; t++) this.ND[t] = 32;
                var i = this.Lm;
                i.Rn(i.dE, !1), this.RD(this.OD)
            }, i.r = e
        }, {
            eE: 130
        }],
        118: [function(t, i, n) {
            function e(t, i, n) {
                this.fE = t || e.gE, this.hE = i || e.iE, this.Xx = s.Ku.Lu, this.jE = n || r(this.fE, this.hE, "projectionMatrix|uSampler"), this.Dn = {};
                for (var a in this.jE) this.Dn[a] = this.jE[a].xc;
                this.kE = [], h[this.fE + this.hE] || (h[this.fE + this.hE] = o.N()), this.lE = h[this.fE + this.hE], this.zh = 4, this.tv = 1, this.Hd = !0
            }
            var r = t("./extractUniformsFromSrc"),
                o = t("../../../utils"),
                s = t("../../../const"),
                h = {};
            i.r = e, e.prototype.apply = function(t, i, n, e) {
                t.mE(this, i, n, e)
            }, e.gE = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 projectionMatrix;", "uniform mat3 filterMatrix;", "varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;", "   vTextureCoord = aTextureCoord ;", "}"].join("\n"), e.iE = ["varying vec2 vTextureCoord;", "varying vec2 vFilterCoord;", "uniform sampler2D uSampler;", "uniform sampler2D filterSampler;", "void main(void){", "   vec4 masky = texture2D(filterSampler, vFilterCoord);", "   vec4 sample = texture2D(uSampler, vTextureCoord);", "   vec4 color;", "   if(mod(vFilterCoord.x, 1.0) > 0.5)", "   {", "     color = vec4(1.0, 0.0, 0.0, 1.0);", "   }", "   else", "   {", "     color = vec4(0.0, 1.0, 0.0, 1.0);", "   }", "   gl_FragColor = mix(sample, masky, 0.5);", "   gl_FragColor *= sample.a;", "}"].join("\n")
        }, {
            $z: 78,
            _z: 151,
            nE: 119
        }],
        119: [function(t, i, n) {
            function e(t, i, n) {
                var e = r(t, n),
                    o = r(i, n);
                return Object.Dm(e, o)
            }

            function r(t) {
                for (var i, n = new RegExp("^(projectionMatrix|uSampler|filterArea)$"), e = {}, r = t.replace(/\s+/g, " ").split(/\s*;\s*/), s = 0; s < r.length; s++) {
                    var h = r[s].trim();
                    if (h.indexOf("uniform") > -1) {
                        var a = h.split(" "),
                            u = a[1],
                            c = a[2],
                            f = 1;
                        c.indexOf("[") > -1 && (i = c.split(/\[|\]/), c = i[0], f *= Number(i[1])), c.match(n) || (e[c] = {
                            xc: o(u, f),
                            name: c,
                            z: u
                        })
                    }
                }
                return e
            }
            var o = t("pixi-gl-core").b.Aa;
            i.r = e
        }, {
            Au: 51
        }],
        120: [function(t, i, n) {
            var e = t("../../../math"),
                r = function(t, i, n) {
                    var e = t.MB();
                    return e.JB(i.g / n.Ka, i.h / n.Ua), e.jw(n.Ka, n.Ua), e
                },
                o = function(t, i, n) {
                    var e = t.MB();
                    e.JB(i.g / n.Ka, i.h / n.Ua);
                    var r = n.Ka / i.Ka,
                        o = n.Ua / i.Ua;
                    return e.jw(r, o), e
                },
                s = function(t, i, n, r) {
                    var o = r.Zt.bx(e.Jx.NB),
                        s = r.IC._y,
                        h = t.MB(),
                        a = n.Ua / n.Ka;
                    h.JB(i.g / n.Ka, i.h / n.Ua), h.jw(1, a);
                    var u = n.Ka / s.Ka,
                        c = n.Ua / s.Ua;
                    return o.$t /= s.Ka * u, o.au /= s.Ka * u, o.LB(), h.Pg(o), h.jw(1, 1 / a), h.jw(u, c), h.JB(r.anchor.g, r.anchor.h), h
                };
            i.r = {
                oE: r,
                pE: o,
                qE: s
            }
        }, {
            bA: 102
        }],
        121: [function(t, i, n) {
            function e(t) {
                var i = new o.Jx;
                r.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n}\n", "#define GLSLIFY 1\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    original *= (masky.r * masky.a * alpha * clip);\n    gl_FragColor = original;\n}\n"), t.Hw = !1, this.rE = t, this.sE = i
            }
            var r = t("../Filter"),
                o = t("../../../../math");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, e.prototype.apply = function(t, i, n) {
                var e = this.rE;
                this.Dn.gx = e.IC, this.Dn.tE = t.qE(this.sE, e), this.Dn.Aw = e.zw, t.mE(this, i, n)
            }
        }, {
            uE: 102,
            vE: 118
        }],
        122: [function(t, i, n) {
            function e(t) {
                r.call(this, t), this.Lm = this.Ft.Lm, this.wE = new s(this.Lm, t.Ub.Ao), this.xE = {},
                    this.Ct = {}, this.yE = null
            }
            var r = t("./WebGLManager"),
                o = t("../utils/RenderTarget"),
                s = t("../utils/Quad"),
                h = t("../../../math"),
                a = t("../../../Shader"),
                u = t("../filters/filterTransforms"),
                c = t("bit-twiddle"),
                f = function() {
                    this.zE = null, this.AE = new h.Yv, this.BE = new h.Yv, this.Zd = [], this.zd = null, this.tv = 1
                };
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, e.prototype.Pw = function(t, i) {
                var n = this.Ft,
                    e = this.yE;
                if (!e) {
                    e = this.Ft.Oy.CE;
                    var r = new f;
                    r.AE = r.BE = this.Ft.Oy.Ho, r.zE = n.Oy, this.Ft.Oy.yE = e = {
                        ke: 0,
                        Oe: [r]
                    }, this.yE = e
                }
                var o = e.Oe[++e.ke];
                o || (o = e.Oe[e.ke] = new f);
                var s = i[0].tv,
                    h = i[0].zh,
                    a = t.Zw || t.cu(!0),
                    u = o.AE,
                    c = o.BE;
                u.g = (a.g * s | 0) / s, u.h = (a.h * s | 0) / s, u.Ka = (a.Ka * s | 0) / s, u.Ua = (a.Ua * s | 0) / s, e.Oe[0].zE.pw || u.bC(e.Oe[0].BE), c.Ka = u.Ka, c.Ua = u.Ua, u.aC(h);
                var l = this.DE(n.Lm, u.Ka, u.Ua, s);
                o.zd = t, o.Zd = i, o.tv = s, o.zE = l, l.yD(c, u), n.Qy(l), n.pn()
            }, e.prototype.Uw = function() {
                var t = this.yE,
                    i = t.Oe[t.ke - 1],
                    n = t.Oe[t.ke];
                this.wE.map(n.zE.Ho, n.AE).Qm();
                var e = n.Zd;
                if (1 === e.length) e[0].apply(this, n.zE, i.zE, !1), this.EE(n.zE);
                else {
                    var r = n.zE,
                        o = this.DE(this.Ft.Lm, n.AE.Ka, n.AE.Ua, 1);
                    o.yD(n.BE, n.AE);
                    for (var s = 0; s < e.length - 1; s++) {
                        e[s].apply(this, r, o, !0);
                        var h = r;
                        r = o, o = h
                    }
                    e[s].apply(this, r, i.zE, !1), this.EE(r), this.EE(o)
                }
                t.ke--, 0 === t.ke && (this.yE = null)
            }, e.prototype.mE = function(t, i, n, e) {
                var r = this.Ft,
                    o = t.kE[r.Cz];
                if (o || (t.lE ? (o = this.xE[t.lE], o || (o = t.kE[r.Cz] = this.xE[t.lE] = new a(this.Lm, t.fE, t.hE))) : o = t.kE[r.Cz] = new a(this.Lm, t.fE, t.hE), this.wE.FE(o)), r.Qy(n), e) {
                    var s = r.Lm;
                    s.ye(s.GE), r.pn(), s.WD(s.GE)
                }
                n === r.Sw.HE && r.Sw.IE(null, r.Sw.JE), r.Fz(o), this.KE(o, t), i.bn.bind(0), r.qD = 0, r.Ub.pz(t.Xx), this.wE.Mo()
            }, e.prototype.KE = function(t, i) {
                var n, e = i.jE,
                    r = i.Dn,
                    o = 1;
                if (t.Dn.Wb.Zw) {
                    n = this.yE.Oe[this.yE.ke];
                    var s = t.Dn.Zw;
                    s[0] = n.zE.Ho.Ka, s[1] = n.zE.Ho.Ua, s[2] = n.AE.g, s[3] = n.AE.h, t.Dn.Zw = s
                }
                if (t.Dn.Wb.LE) {
                    n = this.yE.Oe[this.yE.ke];
                    var h = t.Dn.LE;
                    h[0] = .5 / n.zE.Ho.Ka, h[1] = .5 / n.zE.Ho.Ua, h[2] = (n.AE.Ka - .5) / n.zE.Ho.Ka, h[3] = (n.AE.Ua - .5) / n.zE.Ho.Ua, t.Dn.LE = h
                }
                var a;
                for (var u in e)
                    if ("sampler2D" === e[u].z) {
                        if (t.Dn[u] = o, r[u]._y) this.Ft.Yn(r[u]._y, o);
                        else {
                            var c = this.Ft.Lm;
                            this.Ft.qD = c.Xn + o, c.Wn(c.Xn + o), r[u].bn.bind()
                        }
                        o++
                    } else "mat3" === e[u].z ? void 0 !== r[u]._t ? t.Dn[u] = r[u].$b(!0) : t.Dn[u] = r[u] : "vec2" === e[u].z ? void 0 !== r[u].g ? (a = t.Dn[u] || new Float32Array(2), a[0] = r[u].g, a[1] = r[u].h, t.Dn[u] = a) : t.Dn[u] = r[u] : "float" === e[u].z ? t.Dn.Wb[u].xc !== e[u] && (t.Dn[u] = r[u]) : t.Dn[u] = r[u]
            }, e.prototype.ME = function(t, i) {
                var n = this.yE.Oe[this.yE.ke],
                    e = this.DE(this.Ft.Lm, n.AE.Ka, n.AE.Ua, i || n.tv);
                return e.yD(n.BE, n.AE), e
            }, e.prototype.NE = function(t) {
                return this.EE(t)
            }, e.prototype.oE = function(t) {
                var i = this.yE.Oe[this.yE.ke];
                return u.oE(t, i.AE, i.zE.Ho)
            }, e.prototype.pE = function(t) {
                var i = this.yE.Oe[this.yE.ke];
                return u.pE(t, i.AE, i.zE.Ho, i.BE)
            }, e.prototype.qE = function(t, i) {
                var n = this.yE.Oe[this.yE.ke];
                return u.qE(t, n.AE, n.zE.Ho, i)
            }, e.prototype.Ym = function() {
                this.xE = [], this.OE()
            }, e.prototype.DE = function(t, i, n, e) {
                i = c.rl(i * e), n = c.rl(n * e);
                var r = (65535 & i) << 16 | 65535 & n;
                this.Ct[r] || (this.Ct[r] = []);
                var s = this.Ct[r].pop() || new o(t, i, n, null, 1);
                return s.tv = e, s.PE.Ka = s.Ho.Ka = i / e, s.PE.Ua = s.Ho.Ua = n / e, s
            }, e.prototype.OE = function() {
                for (var t in this.Ct) {
                    var i = this.Ct[t];
                    if (i)
                        for (var n = 0; n < i.length; n++) i[n].Ym(!0)
                }
                this.Ct = {}
            }, e.prototype.EE = function(t) {
                var i = t.Ho.Ka * t.tv,
                    n = t.Ho.Ua * t.tv,
                    e = (65535 & i) << 16 | 65535 & n;
                this.Ct[e].push(t)
            }
        }, {
            Zz: 77,
            bA: 102,
            QE: 120,
            RE: 127,
            SE: 128,
            TE: 125,
            UE: 14
        }],
        123: [function(t, i, n) {
            function e(t) {
                r.call(this, t), this.VE = !1, this.JE = null, this.HE = null, this.WE = !0, this.XE = [], this.YE = 0
            }
            var r = t("./WebGLManager"),
                o = t("../filters/spriteMask/SpriteMaskFilter");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, e.prototype.Rw = function(t, i) {
                if (i.bn) this.ZE(t, i);
                else if (this.WE && !this.VE && !this.Ft.lD.BD.length && i.Jy()) {
                    var n = i.Zt,
                        e = Math.atan2(n.ew, n._t);
                    e = Math.round(e * (180 / Math.PI)), e % 90 ? this.$E(i) : this.IE(t, i)
                } else this.$E(i)
            }, e.prototype.Tw = function(t, i) {
                i.bn ? this._E(t, i) : this.WE && !this.Ft.lD.BD.length ? this.aF(t, i) : this.bF(t, i)
            }, e.prototype.ZE = function(t, i) {
                var n = this.XE[this.YE];
                n || (n = this.XE[this.YE] = [new o(i)]), n[0].tv = this.Ft.tv, n[0].rE = i, t.Zw = i.cu(!0), this.Ft.Qw.Pw(t, n), this.YE++
            }, e.prototype._E = function() {
                this.Ft.Qw.Uw(), this.YE--
            }, e.prototype.$E = function(t) {
                this.Ft.Nw.Cb(), this.Ft.lD.cF(t)
            }, e.prototype.bF = function() {
                this.Ft.Nw.Cb(), this.Ft.lD.dF()
            }, e.prototype.IE = function(t, i) {
                i.Hw = !0;
                var n = this.Ft.Oy,
                    e = i.cu();
                e.bC(n.Ho), i.Hw = !1, this.Ft.Lm.WD(this.Ft.Lm.GE);
                var r = this.Ft.tv;
                this.Ft.Lm.VE(e.g * r, (n.Cd ? n.Ho.Ua - e.h - e.Ua : e.h) * r, e.Ka * r, e.Ua * r), this.HE = n, this.JE = i, this.VE = !0
            }, e.prototype.aF = function() {
                this.HE = null, this.JE = null, this.VE = !1;
                var t = this.Ft.Lm;
                t.ye(t.GE)
            }
        }, {
            eF: 121,
            TE: 125
        }],
        124: [function(t, i, n) {
            function e(t) {
                r.call(this, t), this.BD = null
            }
            var r = t("./WebGLManager");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, e.prototype.AD = function(t) {
                this.BD = t;
                var i = this.Ft.Lm;
                0 === t.length ? i.ye(i.fF) : i.WD(i.fF)
            }, e.prototype.cF = function(t) {
                this.Ft.Ly(this.Ft.mu.My), this.Ft.Oy.gF();
                var i = this.Ft.Lm,
                    n = this.BD;
                0 === n.length && (i.WD(i.fF), i.pn(i.hF), i.iF(i.jF, 1, 1)), n.push(t), i.kF(!1, !1, !1, !1), i.lF(i.mF, i.mF, i.nF), this.Ft.mu.My.Ny(t), i.kF(!0, !0, !0, !0), i.iF(i.oF, 0, n.length), i.lF(i.mF, i.mF, i.mF)
            }, e.prototype.dF = function() {
                this.Ft.Ly(this.Ft.mu.My);
                var t = this.Ft.Lm,
                    i = this.BD,
                    n = i.pop();
                0 === i.length ? t.ye(t.fF) : (t.kF(!1, !1, !1, !1), t.lF(t.mF, t.mF, t.pF), this.Ft.mu.My.Ny(n), t.kF(!0, !0, !0, !0), t.iF(t.oF, 0, i.length), t.lF(t.mF, t.mF, t.mF))
            }, e.prototype.Ym = function() {
                r.prototype.Ym.call(this), this.BD.qF = null
            }
        }, {
            TE: 125
        }],
        125: [function(t, i, n) {
            function e(t) {
                this.Ft = t, this.Ft.Lg("context", this.Dz, this)
            }
            e.prototype.constructor = e, i.r = e, e.prototype.Dz = function() {}, e.prototype.Ym = function() {
                this.Ft.pa("context", this.Dz, this), this.Ft = null
            }
        }, {}],
        126: [function(t, i, n) {
            function e(t) {
                r.call(this, t)
            }
            var r = t("../managers/WebGLManager");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, e.prototype.V = function() {}, e.prototype.Cb = function() {
                this.Mw()
            }, e.prototype.Mw = function() {}, e.prototype.Ny = function(t) {}
        }, {
            rF: 125
        }],
        127: [function(t, i, n) {
            function e(t, i) {
                this.Lm = t, this.Fl = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]), this.sF = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.tF = new Float32Array(16);
                for (var n = 0; n < 4; n++) this.tF[4 * n] = this.Fl[2 * n], this.tF[4 * n + 1] = this.Fl[2 * n + 1], this.tF[4 * n + 2] = this.sF[2 * n], this.tF[4 * n + 3] = this.sF[2 * n + 1];
                this.Iz = o(1), this.uF = r.Uo.Vm(t, this.tF, t.Pm), this.Bo = r.Uo.Wm(t, this.Iz, t.Pm), this.Hz = new r.Yo(t, i)
            }
            var r = t("pixi-gl-core"),
                o = t("../../../utils/createIndicesForQuads");
            e.prototype.constructor = e, e.prototype.FE = function(t) {
                this.Hz.pn().Lo(this.Bo).Ko(this.uF, t.Uc.Xz, this.Lm.Vn, !1, 16, 0).Ko(this.uF, t.Uc.vF, this.Lm.Vn, !1, 16, 8)
            }, e.prototype.map = function(t, i) {
                var n = 0,
                    e = 0;
                return this.sF[0] = n, this.sF[1] = e, this.sF[2] = n + i.Ka / t.Ka, this.sF[3] = e, this.sF[4] = n + i.Ka / t.Ka, this.sF[5] = e + i.Ua / t.Ua, this.sF[6] = n, this.sF[7] = e + i.Ua / t.Ua, n = i.g, e = i.h, this.Fl[0] = n, this.Fl[1] = e, this.Fl[2] = n + i.Ka, this.Fl[3] = e, this.Fl[4] = n + i.Ka, this.Fl[5] = e + i.Ua, this.Fl[6] = n, this.Fl[7] = e + i.Ua, this
            }, e.prototype.Mo = function() {
                return this.Hz.bind().Mo(this.Lm.fv, 6, 0).mk(), this
            }, e.prototype.Qm = function() {
                for (var t = 0; t < 4; t++) this.tF[4 * t] = this.Fl[2 * t], this.tF[4 * t + 1] = this.Fl[2 * t + 1], this.tF[4 * t + 2] = this.sF[2 * t], this.tF[4 * t + 3] = this.sF[2 * t + 1];
                return this.uF.Qm(this.tF), this
            }, e.prototype.Ym = function() {
                var t = this.Lm;
                t.Zm(this.uF), t.Zm(this.Bo)
            }, i.r = e
        }, {
            wF: 149,
            Au: 51
        }],
        128: [function(t, i, n) {
            var e = t("../../../math"),
                r = t("../../../const"),
                o = t("pixi-gl-core").Vo,
                s = function(t, i, n, s, h, a) {
                    this.Lm = t, this.xF = null, this.bn = null, this.qn = [0, 0, 0, 0], this.Ho = new e.Yv(0, 0, 1, 1), this.tv = h || r.qv, this.wD = new e.Jx, this.pw = null, this.zD = null, this.PE = new e.Yv, this.BE = null, this.AE = null, this.yF = null, this.BD = [], this.yE = null, this.cD = s || r.iv.us, this.Cd = a, this.Cd ? (this.xF = new o(t, 100, 100), this.xF.$m = null) : (this.xF = o.wn(t, 100, 100), this.cD === r.iv.do ? this.xF.bn.yn() : this.xF.bn.io(), this.bn = this.xF.bn), this.yD(), this.tn(i, n)
                };
            s.prototype.constructor = s, i.r = s, s.prototype.pn = function(t) {
                var i = t || this.qn;
                this.xF.pn(i[0], i[1], i[2], i[3])
            }, s.prototype.gF = function() {
                this.Cd || this.xF.hn()
            }, s.prototype.yD = function(t, i) {
                this.BE = t || this.BE || this.PE, this.AE = i || this.AE || t
            }, s.prototype.Eo = function() {
                var t = this.Lm;
                this.xF.bind(), this.zF(this.BE, this.AE), this.pw && this.wD.Og(this.pw), this.BE !== this.AE ? (t.WD(t.GE), t.VE(0 | this.BE.g, 0 | this.BE.h, this.BE.Ka * this.tv | 0, this.BE.Ua * this.tv | 0)) : t.ye(t.GE), t.AF(0 | this.BE.g, 0 | this.BE.h, this.BE.Ka * this.tv | 0, this.BE.Ua * this.tv | 0)
            }, s.prototype.zF = function(t, i) {
                var n = this.wD;
                i = i || t, n.MB(), this.Cd ? (n._t = 1 / t.Ka * 2, n.bu = -1 / t.Ua * 2, n.$t = -1 - i.g * n._t, n.au = 1 - i.h * n.bu) : (n._t = 1 / t.Ka * 2, n.bu = 1 / t.Ua * 2, n.$t = -1 - i.g * n._t, n.au = -1 - i.h * n.bu)
            }, s.prototype.tn = function(t, i) {
                if (t = 0 | t, i = 0 | i, this.Ho.Ka !== t || this.Ho.Ua !== i) {
                    this.Ho.Ka = t, this.Ho.Ua = i, this.PE.Ka = t, this.PE.Ua = i, this.xF.tn(t * this.tv, i * this.tv);
                    var n = this.zD || this.Ho;
                    this.zF(n)
                }
            }, s.prototype.Ym = function() {
                this.xF.Ym(), this.xF = null, this.bn = null
            }
        }, {
            $z: 78,
            bA: 102,
            Au: 51
        }],
        129: [function(t, i, n) {
            function e(t) {
                for (var i = "", n = 0; n < t; n++) n > 0 && (i += "\nelse "), n < t - 1 && (i += "if(test == " + n + ".0){}");
                return i
            }
            var r = t("pixi-gl-core"),
                o = ["precision mediump float;", "void main(void){", "float test = 0.1;", "%forloop%", "gl_FragColor = vec4(0.0);", "}"].join("\n"),
                s = function(t, i) {
                    var n = !i;
                    if (n) {
                        var s = document.t("canvas");
                        s.Ka = 1, s.Ua = 1, i = r.So(s)
                    }
                    for (var h = i.pp(i.hp);;) {
                        var a = o.replace(/%forloop%/gi, e(t));
                        if (i.qp(h, a), i.rp(h), i.sp(h, i.tp)) break;
                        t = t / 2 | 0
                    }
                    return n && i.Un("WEBGL_lose_context") && i.Un("WEBGL_lose_context").DD(), t
                };
            i.r = s
        }, {
            Au: 51
        }],
        130: [function(t, i, n) {
            function e(t, i) {
                return i = i || [], i[r.Ku.Lu] = [t.BF, t.CF], i[r.Ku.Mu] = [t.BF, t.DF], i[r.Ku.Nu] = [t.EF, t.CF], i[r.Ku.Ou] = [t.BF, t.FF], i[r.Ku.Pu] = [t.BF, t.CF], i[r.Ku.Qu] = [t.BF, t.CF], i[r.Ku.Ru] = [t.BF, t.CF], i[r.Ku.Su] = [t.BF, t.CF], i[r.Ku.Tu] = [t.BF, t.CF], i[r.Ku.Uu] = [t.BF, t.CF], i[r.Ku.Vu] = [t.BF, t.CF], i[r.Ku.Wu] = [t.BF, t.CF], i[r.Ku.Xu] = [t.BF, t.CF], i[r.Ku.Yu] = [t.BF, t.CF], i[r.Ku.Zu] = [t.BF, t.CF], i[r.Ku.$u] = [t.BF, t.CF], i[r.Ku._u] = [t.BF, t.CF], i
            }
            var r = t("../../../const");
            i.r = e
        }, {
            $z: 78
        }],
        131: [function(t, i, n) {
            function e(t, i) {
                i = i || {}, i[r.av.bv] = t.bv, i[r.av.cv] = t.cv, i[r.av.dv] = t.dv, i[r.av.ev] = t.ev, i[r.av.fv] = t.fv, i[r.av.gv] = t.gv, i[r.av.hv] = t.hv
            }
            var r = t("../../../const");
            i.r = e
        }, {
            $z: 78
        }],
        132: [function(t, i, n) {
            function e(t) {
                var i = t.GF();
                i.an || console.Ne("Provided WebGL context does not have a stencil buffer, masks may not render correctly")
            }
            i.r = e
        }, {}],
        133: [function(t, i, n) {
            function e(t) {
                s.call(this), this.anchor = new r.wx(this.Uy, this), this.IC = null, this.lw = 0, this.mw = 0, this.HF = null, this.IF = null, this.Vx = 16777215, this.Xx = a.Ku.Lu, this.b = null, this.JF = 16777215, this.bn = t || o.aw, this.KF = new Float32Array(8), this.LF = null, this.MF = -1, this.NF = -1
            }
            var r = t("../math"),
                o = t("../textures/Texture"),
                s = t("../display/Container"),
                h = t("../utils"),
                a = t("../const"),
                u = new r.vx;
            e.prototype = Object.create(s.prototype), e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                Ka: {
                    _: function() {
                        return Math.abs(this.jw.g) * this.bn.OF.Ka
                    },
                    P: function(t) {
                        var i = h.sign(this.jw.g) || 1;
                        this.jw.g = i * t / this.bn.OF.Ka, this.lw = t
                    }
                },
                Ua: {
                    _: function() {
                        return Math.abs(this.jw.h) * this.bn.OF.Ua
                    },
                    P: function(t) {
                        var i = h.sign(this.jw.h) || 1;
                        this.jw.h = i * t / this.bn.OF.Ua, this.mw = t
                    }
                },
                Vx: {
                    _: function() {
                        return this.HF
                    },
                    P: function(t) {
                        this.HF = t, this.IF = (t >> 16) + (65280 & t) + ((255 & t) << 16)
                    }
                },
                bn: {
                    _: function() {
                        return this.IC
                    },
                    P: function(t) {
                        this.IC !== t && (this.IC = t, this.JF = 16777215, this.NF = -1, t && (t._y.aD ? this.PF() : t.ve("update", this.PF, this)))
                    }
                }
            }), e.prototype.PF = function() {
                this.NF = -1, this.lw && (this.jw.g = h.sign(this.jw.g) * this.lw / this.bn.OF.Ka), this.mw && (this.jw.h = h.sign(this.jw.h) * this.mw / this.bn.OF.Ua)
            }, e.prototype.Uy = function() {
                this.MF = -1
            }, e.prototype.QF = function() {
                if (this.MF !== this.pw.jx || this.NF !== this.IC.RF) {
                    this.MF = this.pw.jx, this.NF = this.IC.RF;
                    var t, i, n, e, r = this.IC,
                        o = this.pw.Zt,
                        s = o._t,
                        h = o.ew,
                        a = o.fw,
                        u = o.bu,
                        c = o.$t,
                        f = o.au,
                        l = this.KF,
                        p = r.trim,
                        v = r.OF;
                    p ? (i = p.g - this.anchor.Qx * v.Ka, t = i + p.Ka, e = p.h - this.anchor.Px * v.Ua, n = e + p.Ua) : (t = v.Ka * (1 - this.anchor.Qx), i = v.Ka * -this.anchor.Qx, n = v.Ua * (1 - this.anchor.Px), e = v.Ua * -this.anchor.Px), l[0] = s * i + a * e + c, l[1] = u * e + h * i + f, l[2] = s * t + a * e + c, l[3] = u * e + h * t + f, l[4] = s * t + a * n + c, l[5] = u * n + h * t + f, l[6] = s * i + a * n + c, l[7] = u * n + h * i + f
                }
            }, e.prototype.SF = function() {
                this.LF || (this.LF = new Float32Array(8));
                var t, i, n, e, r = this.IC,
                    o = this.LF,
                    s = r.OF,
                    h = this.pw.Zt,
                    a = h._t,
                    u = h.ew,
                    c = h.fw,
                    f = h.bu,
                    l = h.$t,
                    p = h.au;
                t = s.Ka * (1 - this.anchor.Qx), i = s.Ka * -this.anchor.Qx, n = s.Ua * (1 - this.anchor.Px), e = s.Ua * -this.anchor.Px, o[0] = a * i + c * e + l, o[1] = f * e + u * i + p, o[2] = a * t + c * e + l, o[3] = f * e + u * t + p, o[4] = a * t + c * n + l, o[5] = f * n + u * t + p, o[6] = a * i + c * n + l, o[7] = f * n + u * i + p
            }, e.prototype.Lw = function(t) {
                this.QF(), t.Ly(t.mu.TF), t.mu.TF.Ny(this)
            }, e.prototype.Vw = function(t) {
                t.mu.TF.Ny(this)
            }, e.prototype.Ew = function() {
                var t = this.IC.trim,
                    i = this.IC.OF;
                !t || t.Ka === i.Ka && t.Ua === i.Ua ? (this.QF(), this.Dw.cw(this.KF)) : (this.SF(), this.Dw.cw(this.LF))
            }, e.prototype.kw = function(t) {
                return 0 === this.he.length ? (this.Dw.Tv = -this.IC.OF.Ka * this.anchor.Qx, this.Dw.Uv = -this.IC.OF.Ua * this.anchor.Px, this.Dw.Vv = this.IC.OF.Ka, this.Dw.Wv = this.IC.OF.Ua, t || (this._w || (this._w = new r.Yv), t = this._w), this.Dw._v(t)) : s.prototype.kw.call(this, t)
            }, e.prototype.Vy = function(t) {
                this.Zt.mx(t, u);
                var i, n = this.IC.OF.Ka,
                    e = this.IC.OF.Ua,
                    r = -n * this.anchor.g;
                return u.g > r && u.g < r + n && (i = -e * this.anchor.h, u.h > i && u.h < i + e)
            }, e.prototype.Ym = function(t) {
                s.prototype.Ym.call(this, t), this.anchor = null;
                var i = "boolean" == typeof t ? t : t && t.bn;
                if (i) {
                    var n = "boolean" == typeof t ? t : t && t._y;
                    this.IC.Ym(!!n)
                }
                this.IC = null, this.b = null
            }, e.UF = function(t) {
                return new e(o.UF(t))
            }, e.VF = function(t) {
                var i = h.WF[t];
                if (!i) throw new Error('The frameId "' + t + '" does not exist in the texture cache');
                return new e(i)
            }, e.XF = function(t, i, n) {
                return new e(o.XF(t, i, n))
            }
        }, {
            rx: 78,
            fz: 80,
            iw: 102,
            jz: 144,
            Xw: 151
        }],
        134: [function(t, i, n) {
            function e(t) {
                this.Ft = t
            }
            var r = t("../../renderers/canvas/CanvasRenderer"),
                o = t("../../const"),
                s = t("../../math"),
                h = new s.Jx,
                a = t("./CanvasTinter");
            e.prototype.constructor = e, i.r = e, r.pu("sprite", e), e.prototype.Ny = function(t) {
                var i, n, e = t.IC,
                    r = this.Ft,
                    u = t.pw.Zt,
                    c = e.Ty.Ka,
                    f = e.Ty.Ua;
                if (!(e.OF.Ka <= 0 || e.OF.Ua <= 0) && e._y.source && (r.pz(t.Xx), e.yC)) {
                    r.Xi.sz = t.zw;
                    var l = e._y.cD === o.iv.co;
                    r.oC && r.Xi[r.oC] !== l && (r.Xi[r.oC] = l), e.trim ? (i = e.trim.Ka / 2 + e.trim.g - t.anchor.g * e.OF.Ka, n = e.trim.Ua / 2 + e.trim.h - t.anchor.h * e.OF.Ua) : (i = (.5 - t.anchor.g) * e.OF.Ka, n = (.5 - t.anchor.h) * e.OF.Ua), e.KB && (u.bx(h), u = h, s.SB.GB(u, e.KB, i, n), i = 0, n = 0), i -= c / 2, n -= f / 2, r.Av ? (r.Xi.ox(u._t, u.ew, u.fw, u.bu, u.$t * r.tv | 0, u.au * r.tv | 0), i = 0 | i, n = 0 | n) : r.Xi.ox(u._t, u.ew, u.fw, u.bu, u.$t * r.tv, u.au * r.tv);
                    var p = e._y.tv;
                    16777215 !== t.Vx ? (t.JF !== t.Vx && (t.JF = t.Vx, t.YF = a.ZF(t, t.Vx)), r.Xi.MC(t.YF, 0, 0, c * p, f * p, i * r.tv, n * r.tv, c * r.tv, f * r.tv)) : r.Xi.MC(e._y.source, e.Ty.g * p, e.Ty.h * p, c * p, f * p, i * r.tv, n * r.tv, c * r.tv, f * r.tv)
                }
            }, e.prototype.Ym = function() {
                this.Ft = null
            }
        }, {
            yz: 78,
            $F: 102,
            zz: 109,
            _F: 135
        }],
        135: [function(t, i, n) {
            var e = t("../../utils"),
                r = t("../../renderers/canvas/utils/canUseNewCanvasBlendModes"),
                o = i.r = {
                    ZF: function(t, i) {
                        var n = t.bn;
                        i = o.aG(i);
                        var e = "#" + ("00000" + (0 | i).toString(16)).substr(-6);
                        if (n.bG = n.bG || {}, n.bG[e]) return n.bG[e];
                        var r = o.Zy || document.t("canvas");
                        if (o.cG(n, i, r), o.dG) {
                            var s = new Image;
                            s.Fa = r.eG(), n.bG[e] = s
                        } else n.bG[e] = r, o.Zy = null;
                        return r
                    },
                    fG: function(t, i, n) {
                        var e = n.Ro("2d"),
                            r = t.Ty.Ea(),
                            o = t._y.tv;
                        r.g *= o, r.h *= o, r.Ka *= o, r.Ua *= o, n.Ka = r.Ka, n.Ua = r.Ua, e.tz = "#" + ("00000" + (0 | i).toString(16)).substr(-6), e.wz(0, 0, r.Ka, r.Ua), e.zC = "multiply", e.MC(t._y.source, r.g, r.h, r.Ka, r.Ua, 0, 0, r.Ka, r.Ua), e.zC = "destination-atop", e.MC(t._y.source, r.g, r.h, r.Ka, r.Ua, 0, 0, r.Ka, r.Ua)
                    },
                    gG: function(t, i, n) {
                        var e = n.Ro("2d"),
                            r = t.Ty.Ea(),
                            o = t._y.tv;
                        r.g *= o, r.h *= o, r.Ka *= o, r.Ua *= o, n.Ka = r.Ka, n.Ua = r.Ua, e.zC = "copy", e.tz = "#" + ("00000" + (0 | i).toString(16)).substr(-6), e.wz(0, 0, r.Ka, r.Ua), e.zC = "destination-atop", e.MC(t._y.source, r.g, r.h, r.Ka, r.Ua, 0, 0, r.Ka, r.Ua)
                    },
                    hG: function(t, i, n) {
                        var r = n.Ro("2d"),
                            o = t.Ty.Ea(),
                            s = t._y.tv;
                        o.g *= s, o.h *= s, o.Ka *= s, o.Ua *= s, n.Ka = o.Ka, n.Ua = o.Ua, r.zC = "copy", r.MC(t._y.source, o.g, o.h, o.Ka, o.Ua, 0, 0, o.Ka, o.Ua);
                        for (var h = e.Ry(i), a = h[0], u = h[1], c = h[2], f = r.NC(0, 0, o.Ka, o.Ua), l = f.Wb, p = 0; p < l.length; p += 4) l[p + 0] *= a, l[p + 1] *= u, l[p + 2] *= c;
                        r.iG(f, 0, 0)
                    },
                    aG: function(t) {
                        var i = o.jG,
                            n = e.Ry(t);
                        return n[0] = Math.min(255, n[0] / i * i), n[1] = Math.min(255, n[1] / i * i), n[2] = Math.min(255, n[2] / i * i), e.Sy(n)
                    },
                    jG: 8,
                    dG: !1,
                    kG: r(),
                    cG: 0
                };
            o.cG = o.kG ? o.fG : o.hG
        }, {
            lG: 112,
            Nz: 151
        }],
        136: [function(t, i, n) {
            var e = function(t) {
                this.Fl = new ArrayBuffer(t), this.mG = new Float32Array(this.Fl), this.nG = new Uint32Array(this.Fl)
            };
            i.r = e, e.prototype.Ym = function() {
                this.Fl = null, this.oG = null, this.sF = null, this.pG = null
            }
        }, {}],
        137: [function(t, i, n) {
            function e(t) {
                r.call(this, t), this.qG = 5, this.rG = 4 * this.qG, this.Ho = c.Qv, this.sG = [];
                for (var i = 1; i <= l.rl(this.Ho); i *= 2) {
                    var n = 4 * i * this.rG;
                    this.sG.push(new u(n))
                }
                this.Iz = s(this.Ho), this.tG = null, this.uG = 0, p = 0, this.vG = [];
                for (var e = 0; e < this.Ho; e++) this.vG[e] = {
                    wG: [],
                    xG: 0,
                    yG: [],
                    Ho: 0,
                    V: 0,
                    zG: 0
                };
                this.AG = [], this.BG = [], this.CG = [], this.DG = 2, this.EG = 0, this.Ft.Lg("prerender", this.FG, this)
            }
            var r = t("../../renderers/webgl/utils/ObjectRenderer"),
                o = t("../../renderers/webgl/WebGLRenderer"),
                s = t("../../utils/createIndicesForQuads"),
                h = t("./generateMultiTextureShader"),
                a = t("../../renderers/webgl/utils/checkMaxIfStatmentsInShader"),
                u = t("./BatchBuffer"),
                c = t("../../const"),
                f = t("pixi-gl-core"),
                l = t("bit-twiddle"),
                p = 0;
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, o.pu("sprite", e), e.prototype.Dz = function() {
                var t = this.Ft.Lm;
                this.GG = Math.min(t.xo(t.HG), c.Rv), this.GG = a(this.GG, t), this.tG = new Array(this.GG), this.tG[0] = h(t, 1), this.tG[1] = h(t, 2), this.Bo = f.Uo.Wm(t, this.Iz, t.Pm);
                for (var i = this.tG[1], n = 0; n < this.DG; n++) this.BG[n] = f.Uo.Vm(t, null, t.IG), this.CG[n] = this.Ft.CD().Lo(this.Bo).Ko(this.BG[n], i.Uc.Xz, t.Vn, !1, this.rG, 0).Ko(this.BG[n], i.Uc.vF, t.Oo, !0, this.rG, 8).Ko(this.BG[n], i.Uc.Yz, t.On, !0, this.rG, 12).Ko(this.BG[n], i.Uc.JG, t.Vn, !1, this.rG, 16);
                this.Hz = this.CG[0], this.KG = 99999
            }, e.prototype.FG = function() {
                this.EG = 0
            }, e.prototype.Ny = function(t) {
                this.uG >= this.Ho && this.Mw(), t.bn.LG && (this.AG[this.uG++] = t)
            }, e.prototype.Mw = function() {
                if (0 !== this.uG) {
                    var t, i, n, e, r, o, s, a = this.Ft.Lm,
                        u = l.rl(this.uG),
                        c = l.log2(u),
                        v = this.sG[c],
                        y = this.AG,
                        d = this.vG,
                        g = v.mG,
                        m = v.nG,
                        b = 0,
                        w = 1,
                        x = 0,
                        C = d[0],
                        M = y[0].Xx;
                    C.xG = 0, C.V = 0, C.zG = M, p++;
                    for (var F = 0; F < this.uG; F++) {
                        var z = y[F];
                        if (t = z.IC._y, M !== z.Xx && (M = z.Xx, i = null, x = this.GG, p++), i !== t && (i = t, t.MG !== p && (x === this.GG && (p++, x = 0, C.Ho = F - C.V, C = d[w++], C.xG = 0, C.zG = M, C.V = F), t.MG = p, t.xD = x, C.wG[C.xG++] = t, x++)), n = z.KF, e = z.IF + (255 * z.zw << 24), r = z.IC.LG.NG, o = t.xD, this.Ft.Av) {
                            var I = this.Ft.tv;
                            g[b] = (n[0] * I | 0) / I, g[b + 1] = (n[1] * I | 0) / I, g[b + 5] = (n[2] * I | 0) / I, g[b + 6] = (n[3] * I | 0) / I, g[b + 10] = (n[4] * I | 0) / I, g[b + 11] = (n[5] * I | 0) / I, g[b + 15] = (n[6] * I | 0) / I, g[b + 16] = (n[7] * I | 0) / I
                        } else g[b] = n[0], g[b + 1] = n[1], g[b + 5] = n[2], g[b + 6] = n[3], g[b + 10] = n[4], g[b + 11] = n[5], g[b + 15] = n[6], g[b + 16] = n[7];
                        m[b + 2] = r[0], m[b + 7] = r[1], m[b + 12] = r[2], m[b + 17] = r[3], m[b + 3] = m[b + 8] = m[b + 13] = m[b + 18] = e, g[b + 4] = g[b + 9] = g[b + 14] = g[b + 19] = o, b += 20
                    }
                    for (C.Ho = F - C.V, this.EG++, this.DG <= this.EG && (this.DG++, s = this.tG[1], this.BG[this.EG] = f.Uo.Vm(a, null, a.IG), this.CG[this.EG] = this.Ft.CD().Lo(this.Bo).Ko(this.BG[this.EG], s.Uc.Xz, a.Vn, !1, this.rG, 0).Ko(this.BG[this.EG], s.Uc.vF, a.Oo, !0, this.rG, 8).Ko(this.BG[this.EG], s.Uc.Yz, a.On, !0, this.rG, 12).Ko(this.BG[this.EG], s.Uc.JG, a.Vn, !1, this.rG, 16)), this.BG[this.EG].Qm(v.Fl, 0), this.Hz = this.CG[this.EG].bind(), F = 0; F < w; F++) {
                        var j = d[F],
                            T = j.xG;
                        s = this.tG[T - 1], s || (s = this.tG[T - 1] = h(a, T)), this.Ft.Fz(s);
                        for (var K = 0; K < T; K++) this.Ft.Yn(j.wG[K], K);
                        this.Ft.Ub.pz(j.zG), a.No(a.fv, 6 * j.Ho, a.Oo, 6 * j.V * 2)
                    }
                    this.uG = 0
                }
            }, e.prototype.V = function() {}, e.prototype.Cb = function() {
                this.Mw(), this.Hz.mk()
            }, e.prototype.Ym = function() {
                for (var t = 0; t < this.DG; t++) this.BG[t].Ym(), this.CG[t].Ym();
                for (this.Bo.Ym(), this.Ft.pa("prerender", this.FG, this), r.prototype.Ym.call(this), t = 0; t < this.tG.length; t++) this.tG[t] && this.tG[t].Ym();
                for (this.BG = null, this.CG = null, this.Bo = null, this.Iz = null, this.AG = null, t = 0; t < this.sG.length; t++) this.sG[t].Ym()
            }
        }, {
            yz: 78,
            Lz: 116,
            Mz: 126,
            OG: 129,
            PG: 149,
            QG: 136,
            RG: 138,
            UE: 14,
            Au: 51
        }],
        138: [function(t, i, n) {
            function e(t, i) {
                var n = "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\nattribute float aTextureId;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying float vTextureId;\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vTextureId = aTextureId;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n",
                    e = s;
                e = e.replace(/%count%/gi, i), e = e.replace(/%forloop%/gi, r(i));
                for (var h = new o(t, n, e), a = [], u = 0; u < i; u++) a[u] = u;
                return h.bind(), h.Dn.SG = a, h
            }

            function r(t) {
                var i = "";
                i += "\n", i += "\n";
                for (var n = 0; n < t; n++) n > 0 && (i += "\nelse "), n < t - 1 && (i += "if(textureId == " + n + ".0)"), i += "\n{", i += "\n\tcolor = texture2D(uSamplers[" + n + "], vTextureCoord);", i += "\n}";
                return i += "\n", i += "\n"
            }
            var o = t("../../Shader"),
                s = ["varying vec2 vTextureCoord;", "varying vec4 vColor;", "varying float vTextureId;", "uniform sampler2D uSamplers[%count%];", "void main(void){", "vec4 color;", "float textureId = floor(vTextureId+0.5);", "%forloop%", "gl_FragColor = color * vColor;", "}"].join("\n");
            i.r = e
        }, {
            TG: 77
        }],
        139: [function(t, i, n) {
            function e(t, i) {
                this.Zy = document.t("canvas"), this.Xi = this.Zy.Ro("2d"), this.tv = a.qv, this.UG = null, this.VG = null, this.WG = null, this.XG = "";
                var n = o.Yy(this.Zy);
                n.OF = new s.Yv, n.trim = new s.Yv, r.call(this, n), this.u = t, this.T = i, this.YG = -1
            }
            var r = t("../sprites/Sprite"),
                o = t("../textures/Texture"),
                s = t("../math"),
                h = t("../utils"),
                a = t("../const"),
                u = t("./TextStyle"),
                c = {
                    bn: !0,
                    he: !1,
                    _y: !0
                };
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, e.ZG = {}, e.$G = document.t("canvas"), e._G = e.$G.Ro("2d"), Object.defineProperties(e.prototype, {
                Ka: {
                    _: function() {
                        return this.aH(!0), Math.abs(this.jw.g) * this.bn.OF.Ka
                    },
                    P: function(t) {
                        this.aH(!0);
                        var i = h.sign(this.jw.g) || 1;
                        this.jw.g = i * t / this.bn.OF.Ka, this.lw = t
                    }
                },
                Ua: {
                    _: function() {
                        return this.aH(!0), Math.abs(this.jw.h) * this.IC.OF.Ua
                    },
                    P: function(t) {
                        this.aH(!0);
                        var i = h.sign(this.jw.h) || 1;
                        this.jw.h = i * t / this.bn.OF.Ua, this.mw = t
                    }
                },
                T: {
                    _: function() {
                        return this.VG
                    },
                    P: function(t) {
                        t = t || {}, t instanceof u ? this.VG = t : this.VG = new u(t), this.YG = -1, this.Co = !0
                    }
                },
                u: {
                    _: function() {
                        return this.UG
                    },
                    P: function(t) {
                        t = t || " ", t = t.toString(), this.UG !== t && (this.UG = t, this.Co = !0)
                    }
                }
            }), e.prototype.aH = function(t) {
                var i = this.VG;
                if (this.YG !== i.bH && (this.Co = !0, this.YG = i.bH), this.Co || !t) {
                    var n = "number" == typeof i.cH ? i.cH + "px" : i.cH;
                    this.XG = i.dH + " " + i.eH + " " + i.jh + " " + n + " " + i.fH, this.Xi.gH = this.XG;
                    var e, r = i.hH ? this.hH(this.UG) : this.UG,
                        o = r.split(/(?:\r\n|\r|\n)/),
                        s = new Array(o.length),
                        h = 0,
                        a = this.iH(this.XG);
                    for (e = 0; e < o.length; e++) {
                        var u = this.Xi.jH(o[e]).Ka + (o[e].length - 1) * i.ih;
                        s[e] = u, h = Math.max(h, u)
                    }
                    var c = h + i.kH;
                    i.lH && (c += i.mH), c += 2 * i.zh, this.Zy.Ka = Math.ceil((c + this.Xi.Sx) * this.tv);
                    var f = this.T.ph || a.cH + i.kH,
                        l = Math.max(f, a.cH + i.kH) + (o.length - 1) * f;
                    i.lH && (l += i.mH), this.Zy.Ua = Math.ceil((l + 2 * this.VG.zh) * this.tv), this.Xi.jw(this.tv, this.tv), navigator.bs && this.Xi.BC(0, 0, this.Zy.Ka, this.Zy.Ua), this.Xi.gH = this.XG, this.Xi.uz = i.vz, this.Xi.Sx = i.kH, this.Xi.nH = i.nH, this.Xi.oH = i.oH, this.Xi.pH = i.pH;
                    var p, v;
                    if (i.lH) {
                        i.qH > 0 ? (this.Xi.rH = i.sH, this.Xi.tH = i.qH) : this.Xi.tz = i.sH;
                        var y = Math.cos(i.uH) * i.mH,
                            d = Math.sin(i.uH) * i.mH;
                        for (e = 0; e < o.length; e++) p = i.kH / 2, v = i.kH / 2 + e * f + a.vH, "right" === i.wH ? p += h - s[e] : "center" === i.wH && (p += (h - s[e]) / 2), i.zy && (this.xH(o[e], p + y + i.zh, v + d + i.zh), i.vz && i.kH && (this.Xi.uz = i.sH, this.xH(o[e], p + y + i.zh, v + d + i.zh, !0), this.Xi.uz = i.vz))
                    }
                    for (this.Xi.tz = this.yH(i, o), e = 0; e < o.length; e++) p = i.kH / 2, v = i.kH / 2 + e * f + a.vH, "right" === i.wH ? p += h - s[e] : "center" === i.wH && (p += (h - s[e]) / 2), i.vz && i.kH && this.xH(o[e], p + i.zh, v + i.zh, !0), i.zy && this.xH(o[e], p + i.zh, v + i.zh);
                    this._C()
                }
            }, e.prototype.xH = function(t, i, n, e) {
                var r = this.VG,
                    o = r.ih;
                if (0 === o) return void(e ? this.Xi.zH(t, i, n) : this.Xi.AH(t, i, n));
                for (var s, h = String.prototype.split.call(t, ""), a = 0, u = i; a < t.length;) s = h[a++], e ? this.Xi.zH(s, u, n) : this.Xi.AH(s, u, n), u += this.Xi.jH(s).Ka + o
            }, e.prototype._C = function() {
                var t = this.IC,
                    i = this.VG;
                t._y.aD = !0, t._y.tv = this.tv, t._y.BH = this.Zy.Ka, t._y.CH = this.Zy.Ua, t._y.Ka = this.Zy.Ka / this.tv, t._y.Ua = this.Zy.Ua / this.tv, t.trim.Ka = t.Ty.Ka = this.Zy.Ka / this.tv, t.trim.Ua = t.Ty.Ua = this.Zy.Ua / this.tv, t.trim.g = -i.zh, t.trim.h = -i.zh, t.OF.Ka = t.Ty.Ka - 2 * i.zh, t.OF.Ua = t.Ty.Ua - 2 * i.zh, this.PF(), t._y.Ll("update", t._y), this.Co = !1
            }, e.prototype.Gw = function(t) {
                this.tv !== t.tv && (this.tv = t.tv, this.Co = !0), this.aH(!0), r.prototype.Gw.call(this, t)
            }, e.prototype.Vw = function(t) {
                this.tv !== t.tv && (this.tv = t.tv, this.Co = !0), this.aH(!0), r.prototype.Vw.call(this, t)
            }, e.prototype.iH = function(t) {
                var i = e.ZG[t];
                if (!i) {
                    i = {};
                    var n = e.$G,
                        r = e._G;
                    r.gH = t;
                    var o = Math.ceil(r.jH("|M�q").Ka),
                        s = Math.ceil(r.jH("M").Ka),
                        h = 2 * s;
                    s = 1.4 * s | 0, n.Ka = o, n.Ua = h, r.tz = "#f00", r.wz(0, 0, o, h), r.gH = t, r.nH = "alphabetic", r.tz = "#000", r.AH("|M�q", 0, s);
                    var a, u, c = r.NC(0, 0, o, h).Wb,
                        f = c.length,
                        l = 4 * o,
                        p = 0,
                        v = !1;
                    for (a = 0; a < s; a++) {
                        for (u = 0; u < l; u += 4)
                            if (255 !== c[p + u]) {
                                v = !0;
                                break
                            }
                        if (v) break;
                        p += l
                    }
                    for (i.vH = s - a, p = f - l, v = !1, a = h; a > s; a--) {
                        for (u = 0; u < l; u += 4)
                            if (255 !== c[p + u]) {
                                v = !0;
                                break
                            }
                        if (v) break;
                        p -= l
                    }
                    i.DH = a - s, i.cH = i.vH + i.DH, e.ZG[t] = i
                }
                return i
            }, e.prototype.hH = function(t) {
                for (var i = "", n = t.split("\n"), e = this.VG.EH, r = 0; r < n.length; r++) {
                    for (var o = e, s = n[r].split(" "), h = 0; h < s.length; h++) {
                        var a = this.Xi.jH(s[h]).Ka;
                        if (this.VG.FH && a > e)
                            for (var u = s[h].split(""), c = 0; c < u.length; c++) {
                                var f = this.Xi.jH(u[c]).Ka;
                                f > o ? (i += "\n" + u[c], o = e - f) : (0 === c && (i += " "), i += u[c], o -= f)
                            } else {
                                var l = a + this.Xi.jH(" ").Ka;
                                0 === h || l > o ? (h > 0 && (i += "\n"), i += s[h], o = e - a) : (o -= l, i += " " + s[h])
                            }
                    }
                    r < n.length - 1 && (i += "\n")
                }
                return i
            }, e.prototype.Ew = function() {
                this.aH(!0), this.QF(), this.Dw.cw(this.KF)
            }, e.prototype.GH = function() {
                this.Co = !0
            }, e.prototype.yH = function(t, i) {
                if (Array.isArray(t.zy)) {
                    var n, e, r, o, s, h = this.Zy.Ka / this.tv,
                        u = this.Zy.Ua / this.tv;
                    if (t.HH === a.Nv.Ov)
                        for (e = this.Xi.IH(h / 2, 0, h / 2, u), r = (t.zy.length + 1) * i.length, o = 0, n = 0; n < i.length; n++) {
                            o += 1;
                            for (var c = 0; c < t.zy.length; c++) s = o / r, e.JH(s, t.zy[c]), o++
                        } else
                            for (e = this.Xi.IH(0, u / 2, h, u / 2), r = t.zy.length + 1, o = 1, n = 0; n < t.zy.length; n++) s = o / r, e.JH(s, t.zy[n]), o++;
                    return e
                }
                return t.zy
            }, e.prototype.Ym = function(t) {
                "boolean" == typeof t && (t = {
                    he: t
                }), t = Object.Dm({}, c, t), r.prototype.Ym.call(this, t), this.Xi = null, this.Zy = null, this.VG = null
            }
        }, {
            rx: 78,
            iw: 102,
            hz: 133,
            jz: 144,
            Xw: 151,
            KH: 140
        }],
        140: [function(t, i, n) {
            function e(t) {
                this.bH = 0, Object.Dm(this, this.LH, t)
            }

            function r(t) {
                if ("number" == typeof t) return s.jC(t);
                if (Array.isArray(t))
                    for (var i = 0; i < t.length; ++i) "number" == typeof t[i] && (t[i] = s.jC(t[i]));
                return t
            }
            var o = t("../const"),
                s = t("../utils");
            e.prototype.constructor = e, i.r = e, e.prototype.LH = {
                wH: "left",
                FH: !1,
                lH: !1,
                uH: Math.PI / 6,
                qH: 0,
                sH: "#000000",
                mH: 5,
                zy: "black",
                HH: o.Nv.Ov,
                fH: "Arial",
                cH: 26,
                dH: "normal",
                eH: "normal",
                jh: "normal",
                ih: 0,
                ph: 0,
                oH: "miter",
                pH: 10,
                zh: 0,
                vz: "black",
                kH: 0,
                nH: "alphabetic",
                hH: !1,
                EH: 100
            }, e.prototype.Ea = function() {
                var t = {};
                for (var i in this.LH) t[i] = this[i];
                return new e(t)
            }, e.prototype.Yd = function() {
                Object.Dm(this, this.LH)
            }, Object.defineProperties(e.prototype, {
                wH: {
                    _: function() {
                        return this.MH
                    },
                    P: function(t) {
                        this.MH !== t && (this.MH = t, this.bH++)
                    }
                },
                FH: {
                    _: function() {
                        return this.NH
                    },
                    P: function(t) {
                        this.NH !== t && (this.NH = t, this.bH++)
                    }
                },
                lH: {
                    _: function() {
                        return this.OH
                    },
                    P: function(t) {
                        this.OH !== t && (this.OH = t, this.bH++)
                    }
                },
                uH: {
                    _: function() {
                        return this.PH
                    },
                    P: function(t) {
                        this.PH !== t && (this.PH = t, this.bH++)
                    }
                },
                qH: {
                    _: function() {
                        return this.QH
                    },
                    P: function(t) {
                        this.QH !== t && (this.QH = t, this.bH++)
                    }
                },
                sH: {
                    _: function() {
                        return this.RH
                    },
                    P: function(t) {
                        var i = r(t);
                        this.RH !== i && (this.RH = i, this.bH++)
                    }
                },
                mH: {
                    _: function() {
                        return this.SH
                    },
                    P: function(t) {
                        this.SH !== t && (this.SH = t, this.bH++)
                    }
                },
                zy: {
                    _: function() {
                        return this.TH
                    },
                    P: function(t) {
                        var i = r(t);
                        this.TH !== i && (this.TH = i, this.bH++)
                    }
                },
                HH: {
                    _: function() {
                        return this.UH
                    },
                    P: function(t) {
                        this.UH !== t && (this.UH = t, this.bH++)
                    }
                },
                fH: {
                    _: function() {
                        return this.VH
                    },
                    P: function(t) {
                        this.fH !== t && (this.VH = t, this.bH++)
                    }
                },
                cH: {
                    _: function() {
                        return this.WH
                    },
                    P: function(t) {
                        this.WH !== t && (this.WH = t, this.bH++)
                    }
                },
                dH: {
                    _: function() {
                        return this.XH
                    },
                    P: function(t) {
                        this.XH !== t && (this.XH = t, this.bH++)
                    }
                },
                eH: {
                    _: function() {
                        return this.YH
                    },
                    P: function(t) {
                        this.YH !== t && (this.YH = t, this.bH++)
                    }
                },
                jh: {
                    _: function() {
                        return this.ZH
                    },
                    P: function(t) {
                        this.ZH !== t && (this.ZH = t, this.bH++)
                    }
                },
                ih: {
                    _: function() {
                        return this.$H
                    },
                    P: function(t) {
                        this.$H !== t && (this.$H = t, this.bH++)
                    }
                },
                ph: {
                    _: function() {
                        return this._H
                    },
                    P: function(t) {
                        this._H !== t && (this._H = t, this.bH++)
                    }
                },
                oH: {
                    _: function() {
                        return this.aI
                    },
                    P: function(t) {
                        this.aI !== t && (this.aI = t, this.bH++)
                    }
                },
                pH: {
                    _: function() {
                        return this.bI
                    },
                    P: function(t) {
                        this.bI !== t && (this.bI = t, this.bH++)
                    }
                },
                zh: {
                    _: function() {
                        return this.cI
                    },
                    P: function(t) {
                        this.cI !== t && (this.cI = t, this.bH++)
                    }
                },
                vz: {
                    _: function() {
                        return this.dI
                    },
                    P: function(t) {
                        var i = r(t);
                        this.dI !== i && (this.dI = i, this.bH++)
                    }
                },
                kH: {
                    _: function() {
                        return this.eI
                    },
                    P: function(t) {
                        this.eI !== t && (this.eI = t, this.bH++)
                    }
                },
                nH: {
                    _: function() {
                        return this.fI
                    },
                    P: function(t) {
                        this.fI !== t && (this.fI = t, this.bH++)
                    }
                },
                hH: {
                    _: function() {
                        return this.gI
                    },
                    P: function(t) {
                        this.gI !== t && (this.gI = t, this.bH++)
                    }
                },
                EH: {
                    _: function() {
                        return this.hI
                    },
                    P: function(t) {
                        this.hI !== t && (this.hI = t, this.bH++)
                    }
                }
            })
        }, {
            rx: 78,
            Xw: 151
        }],
        141: [function(t, i, n) {
            function e(t, i, n, e) {
                r.call(this, null, n), this.tv = e || o.qv, this.Ka = t || 100, this.Ua = i || 100, this.BH = this.Ka * this.tv, this.CH = this.Ua * this.tv, this.cD = n || o.iv.us, this.aD = !0, this.WC = [], this.$y = null, this.yC = !1
            }
            var r = t("./BaseTexture"),
                o = t("../const");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, e.prototype.tn = function(t, i) {
                t === this.Ka && i === this.Ua || (this.yC = t > 0 && i > 0, this.Ka = t, this.Ua = i, this.BH = this.Ka * this.tv, this.CH = this.Ua * this.tv, this.yC && this.Ll("update", this))
            }, e.prototype.Ym = function() {
                r.prototype.Ym.call(this, !0), this.Ft = null
            }
        }, {
            rx: 78,
            iI: 142
        }],
        142: [function(t, i, n) {
            function e(t, i, n) {
                s.call(this), this.N = r.N(), this.XC = 0, this.tv = n || o.qv, this.Ka = 100, this.Ua = 100, this.BH = 100, this.CH = 100, this.cD = i || o.iv.us, this.aD = !1, this.dr = !1, this.source = null, this.kD = !0, this.jI = null, this.dD = !1, this.Kn = o.ov, this.eD = o.jv.us, this.bD = [], this.MG = 0, this.xD = 0, t && this.kI(t)
            }
            var r = t("../utils"),
                o = t("../const"),
                s = t("eventemitter3"),
                h = t("../utils/determineCrossOrigin"),
                a = t("bit-twiddle");
            e.prototype = Object.create(s.prototype), e.prototype.constructor = e, i.r = e, e.prototype.Mt = function() {
                this.BH = this.source.lI || this.source.Pn || this.source.Ka, this.CH = this.source.mI || this.source.Qn || this.source.Ua, this.Ka = this.BH / this.tv, this.Ua = this.CH / this.tv, this.dD = a.ol(this.BH) && a.ol(this.CH), this.Ll("update", this)
            }, e.prototype.kI = function(t) {
                var i = this.dr;
                if (this.aD = !1, this.dr = !1, i && this.source && (this.source.Jj = null, this.source.Kj = null), this.source = t, (this.source.Ib || this.source.Ro) && this.source.Ka && this.source.Ua) this.nI();
                else if (!t.Ro) {
                    this.dr = !0;
                    var n = this;
                    t.Jj = function() {
                        t.Jj = null, t.Kj = null, n.dr && (n.dr = !1, n.nI(), n.Ll("loaded", n))
                    }, t.Kj = function() {
                        t.Jj = null, t.Kj = null, n.dr && (n.dr = !1, n.Ll("error", n))
                    }, t.Ib && t.Fa && (this.dr = !1, t.Jj = null, t.Kj = null, t.Ka && t.Ua ? (this.nI(), i && this.Ll("loaded", this)) : i && this.Ll("error", this))
                }
            }, e.prototype.nI = function() {
                this.aD = !0, this.Mt()
            }, e.prototype.Ym = function() {
                this.jI ? (delete r.oI[this.jI], delete r.WF[this.jI], this.jI = null, navigator.bs || (this.source.Fa = "")) : this.source && this.source.pI && delete r.oI[this.source.pI], this.source = null, this.qI()
            }, e.prototype.qI = function() {
                this.Ll("dispose", this)
            }, e.prototype.rI = function(t) {
                this.source.Fa = t, this.kI(this.source)
            }, e.XF = function(t, i, n) {
                var o = r.oI[t];
                if (!o) {
                    var s = new Image;
                    void 0 === i && 0 !== t.indexOf("data:") && (s.pr = h(t)), o = new e(s, n), o.jI = t, s.Fa = t, r.oI[t] = o, o.tv = r.sI(t)
                }
                return o
            }, e.Yy = function(t, i) {
                t.pI || (t.pI = "canvas_" + r.N());
                var n = r.oI[t.pI];
                return n || (n = new e(t, i), r.oI[t.pI] = n), n
            }
        }, {
            rx: 78,
            Xw: 151,
            tI: 150,
            UE: 14,
            nr: 16
        }],
        143: [function(t, i, n) {
            function e(t, i) {
                if (this.uI = null, !(t instanceof r)) {
                    var n = arguments[1],
                        e = arguments[2],
                        s = arguments[3] || 0,
                        h = arguments[4] || 1;
                    console.Ne("v4 RenderTexture now expects a new BaseRenderTexture. Please use RenderTexture.create(" + n + ", " + e + ")"), this.uI = arguments[0], i = null, t = new r(n, e, s, h)
                }
                o.call(this, t, i), this.yC = !0, this.vI()
            }
            var r = t("./BaseRenderTexture"),
                o = t("./Texture");
            e.prototype = Object.create(o.prototype), e.prototype.constructor = e, i.r = e, e.prototype.tn = function(t, i, n) {
                this.yC = t > 0 && i > 0, this.Ty.Ka = this.OF.Ka = t, this.Ty.Ua = this.OF.Ua = i, n || this._y.tn(t, i), this.vI()
            }, e.create = function(t, i, n, o) {
                return new e(new r(t, i, n, o))
            }
        }, {
            wI: 141,
            xI: 144
        }],
        144: [function(t, i, n) {
            function e(t, i, n, r, o) {
                if (h.call(this), this.yI = !1, i || (this.yI = !0, i = new a.Yv(0, 0, 1, 1)), t instanceof e && (t = t._y), this._y = t, this.Ty = i, this.trim = r, this.yC = !1, this.zI = !1, this.LG = null, this.OF = n || i, this.AI = +(o || 0), o === !0) this.AI = 2;
                else if (this.AI % 2 !== 0) throw "attempt to use diamond-shaped UVs. If you are sure, set rotation manually";
                t.aD ? (this.yI && (i = new a.Yv(0, 0, t.Ka, t.Ua),
                    t.Lg("update", this.BI, this)), this.zD = i) : t.ve("loaded", this.CI, this), this.RF = 0
            }
            var r = t("./BaseTexture"),
                o = t("./VideoBaseTexture"),
                s = t("./TextureUvs"),
                h = t("eventemitter3"),
                a = t("../math"),
                u = t("../utils");
            e.prototype = Object.create(h.prototype), e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                zD: {
                    _: function() {
                        return this.Ty
                    },
                    P: function(t) {
                        if (this.Ty = t, this.yI = !1, t.g + t.Ka > this._y.Ka || t.h + t.Ua > this._y.Ua) throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
                        this.yC = t && t.Ka && t.Ua && this._y.aD, this.trim || this.KB || (this.OF = t), this.yC && this.vI()
                    }
                },
                KB: {
                    _: function() {
                        return this.AI
                    },
                    P: function(t) {
                        this.AI = t, this.yC && this.vI()
                    }
                },
                Ka: {
                    _: function() {
                        return this.OF ? this.OF.Ka : 0
                    }
                },
                Ua: {
                    _: function() {
                        return this.OF ? this.OF.Ua : 0
                    }
                }
            }), e.prototype.Mt = function() {
                this._y.Mt()
            }, e.prototype.CI = function(t) {
                this.RF++, this.yI ? this.zD = new a.Yv(0, 0, t.Ka, t.Ua) : this.zD = this.Ty, this._y.Lg("update", this.BI, this), this.Ll("update", this)
            }, e.prototype.BI = function(t) {
                this.RF++, this.Ty.Ka = t.Ka, this.Ty.Ua = t.Ua, this.Ll("update", this)
            }, e.prototype.Ym = function(t) {
                this._y && (t && (u.WF[this._y.jI] && delete u.WF[this._y.jI], this._y.Ym()), this._y.pa("update", this.BI, this), this._y.pa("loaded", this.CI, this), this._y = null), this.Ty = null, this.LG = null, this.trim = null, this.OF = null, this.yC = !1, this.pa("dispose", this.qI, this), this.pa("update", this.Mt, this)
            }, e.prototype.Ea = function() {
                return new e(this._y, this.zD, this.OF, this.trim, this.KB)
            }, e.prototype.vI = function() {
                this.LG || (this.LG = new s), this.LG.P(this.Ty, this._y, this.KB), this.RF++
            }, e.XF = function(t, i, n) {
                var o = u.WF[t];
                return o || (o = new e(r.XF(t, i, n)), u.WF[t] = o), o
            }, e.VF = function(t) {
                var i = u.WF[t];
                if (!i) throw new Error('The frameId "' + t + '" does not exist in the texture cache');
                return i
            }, e.Yy = function(t, i) {
                return new e(r.Yy(t, i))
            }, e.DI = function(t, i) {
                return "string" == typeof t ? e.EI(t, i) : new e(o.DI(t, i))
            }, e.EI = function(t, i) {
                return new e(o.FI(t, i))
            }, e.UF = function(t) {
                if ("string" == typeof t) {
                    var i = u.WF[t];
                    if (!i) {
                        var n = null !== t.match(/\.(mp4|webm|ogg|h264|avi|mov)$/);
                        return n ? e.EI(t) : e.XF(t)
                    }
                    return i
                }
                return t instanceof HTMLCanvasElement ? e.Yy(t) : t instanceof HTMLVideoElement ? e.DI(t) : t instanceof r ? new e(r) : t
            }, e.GI = function(t, i) {
                u.WF[i] = t
            }, e.HI = function(t) {
                var i = u.WF[t];
                return delete u.WF[t], delete u.oI[t], i
            }, e.aw = new e(new r), e.aw.Ym = function() {}, e.aw.Lg = function() {}, e.aw.ve = function() {}, e.aw.Ll = function() {}
        }, {
            iw: 102,
            Xw: 151,
            iI: 142,
            II: 145,
            JI: 146,
            nr: 16
        }],
        145: [function(t, i, n) {
            function e() {
                this.KI = 0, this.LI = 0, this.MI = 1, this.NI = 0, this.OI = 1, this.QI = 1, this.RI = 0, this.SI = 1, this.NG = new Uint32Array(4)
            }
            i.r = e;
            var r = t("../math/GroupD8");
            e.prototype.P = function(t, i, n) {
                var e = i.Ka,
                    o = i.Ua;
                if (n) {
                    var s = t.Ka / 2 / e,
                        h = t.Ua / 2 / o,
                        a = t.g / e + s,
                        u = t.h / o + h;
                    n = r.ra(n, r.tB), this.KI = a + s * r.yB(n), this.LI = u + h * r.zB(n), n = r.ra(n, 2), this.MI = a + s * r.yB(n), this.NI = u + h * r.zB(n), n = r.ra(n, 2), this.OI = a + s * r.yB(n), this.QI = u + h * r.zB(n), n = r.ra(n, 2), this.RI = a + s * r.yB(n), this.SI = u + h * r.zB(n)
                } else this.KI = t.g / e, this.LI = t.h / o, this.MI = (t.g + t.Ka) / e, this.NI = t.h / o, this.OI = (t.g + t.Ka) / e, this.QI = (t.h + t.Ua) / o, this.RI = t.g / e, this.SI = (t.h + t.Ua) / o;
                this.NG[0] = (65535 * this.LI & 65535) << 16 | 65535 * this.KI & 65535, this.NG[1] = (65535 * this.NI & 65535) << 16 | 65535 * this.MI & 65535, this.NG[2] = (65535 * this.QI & 65535) << 16 | 65535 * this.OI & 65535, this.NG[3] = (65535 * this.SI & 65535) << 16 | 65535 * this.RI & 65535
            }
        }, {
            TI: 98
        }],
        146: [function(t, i, n) {
            function e(t, i) {
                if (!t) throw new Error("No video source element specified.");
                (t.Se === t.UI || t.Se === t.VI) && t.Ka && t.Ua && (t.Ib = !0), o.call(this, t, i), this.WI = !1, this.XI = this.XI.bind(this), this.YI = this.YI.bind(this), t.Ib || (t.Sc("canplay", this.YI), t.Sc("canplaythrough", this.YI), t.Sc("play", this.ZI.bind(this)), t.Sc("pause", this.$I.bind(this))), this._I = !1
            }

            function r(t, i) {
                i || (i = "video/" + t.substr(t.lastIndexOf(".") + 1));
                var n = document.t("source");
                return n.Fa = t, n.z = i, n
            }
            var o = t("./BaseTexture"),
                s = t("../utils");
            e.prototype = Object.create(o.prototype), e.prototype.constructor = e, i.r = e, e.prototype.XI = function() {
                this.WI && (window.a(this.XI), this.Mt())
            }, e.prototype.ZI = function() {
                this.aD || this.YI(), this.WI || (window.a(this.XI), this.WI = !0)
            }, e.prototype.$I = function() {
                this.WI = !1
            }, e.prototype.YI = function() {
                this.aD = !0, this.source && (this.source.K("canplay", this.YI), this.source.K("canplaythrough", this.YI), this.Ka = this.source.Pn, this.Ua = this.source.Qn, this.source.aJ(), this._I || (this._I = !0, this.Ll("loaded", this)))
            }, e.prototype.Ym = function() {
                this.source && this.source.pI && (delete s.oI[this.source.pI], delete this.source.pI), o.prototype.Ym.call(this)
            }, e.DI = function(t, i) {
                t.pI || (t.pI = "video_" + s.N());
                var n = s.oI[t.pI];
                return n || (n = new e(t, i), s.oI[t.pI] = n), n
            }, e.FI = function(t, i) {
                var n = document.t("video");
                if (Array.isArray(t))
                    for (var o = 0; o < t.length; ++o) n.x(r(t[o].Fa || t[o], t[o].bJ));
                else n.x(r(t.Fa || t, t.bJ));
                return n.Tf(), n.aJ(), e.DI(n, i)
            }, e.cJ = e.FI
        }, {
            Xw: 151,
            iI: 142
        }],
        147: [function(t, i, n) {
            function e() {
                var t = this;
                this.dJ = function(i) {
                    t.eJ = null, t.Lk && (t.Mt(i), t.Lk && null === t.eJ && t.fJ.Kl(s, !0) && (t.eJ = requestAnimationFrame(t.dJ)))
                }, this.fJ = new o, this.eJ = null, this.gJ = 100, this.hJ = !1, this.iJ = 1, this.jJ = 1 / r.Fu, this.kJ = 0, this.Nh = 1, this.Lk = !1
            }
            var r = t("../const"),
                o = t("eventemitter3"),
                s = "tick";
            Object.defineProperties(e.prototype, {
                lJ: {
                    _: function() {
                        return 1e3 / this.jJ
                    }
                },
                mJ: {
                    _: function() {
                        return 1e3 / this.gJ
                    },
                    P: function(t) {
                        var i = Math.min(Math.max(0, t) / 1e3, r.Fu);
                        this.gJ = 1 / i
                    }
                }
            }), e.prototype.nJ = function() {
                null === this.eJ && this.fJ.Kl(s, !0) && (this.kJ = performance.now(), this.eJ = requestAnimationFrame(this.dJ))
            }, e.prototype.oJ = function() {
                null !== this.eJ && (cancelAnimationFrame(this.eJ), this.eJ = null)
            }, e.prototype.pJ = function() {
                this.Lk ? this.nJ() : this.hJ && this.V()
            }, e.prototype.ra = function(t, i) {
                return this.fJ.Lg(s, t, i), this.pJ(), this
            }, e.prototype.qJ = function(t, i) {
                return this.fJ.ve(s, t, i), this.pJ(), this
            }, e.prototype.hb = function(t, i) {
                return this.fJ.pa(s, t, i), this.fJ.Kl(s, !0) || this.oJ(), this
            }, e.prototype.V = function() {
                this.Lk || (this.Lk = !0, this.nJ())
            }, e.prototype.Cb = function() {
                this.Lk && (this.Lk = !1, this.oJ())
            }, e.prototype.Mt = function(t) {
                var i;
                t = t || performance.now(), t > this.kJ ? (i = this.jJ = t - this.kJ, i > this.gJ && (i = this.gJ), this.iJ = i * r.Fu * this.Nh, this.fJ.Ll(s, this.iJ)) : this.iJ = this.jJ = 0, this.kJ = t
            }, i.r = e
        }, {
            rx: 78,
            nr: 16
        }],
        148: [function(t, i, n) {
            var e = t("./Ticker"),
                r = new e;
            r.hJ = !0, i.r = {
                rJ: r,
                sJ: e
            }
        }, {
            tJ: 147
        }],
        149: [function(t, i, n) {
            var e = function(t) {
                for (var i = 6 * t, n = new Uint16Array(i), e = 0, r = 0; e < i; e += 6, r += 4) n[e + 0] = r + 0, n[e + 1] = r + 1, n[e + 2] = r + 2, n[e + 3] = r + 0, n[e + 4] = r + 2, n[e + 5] = r + 3;
                return n
            };
            i.r = e
        }, {}],
        150: [function(t, i, n) {
            var e, r = t("url"),
                o = function(t, i) {
                    if (0 === t.indexOf("data:")) return "";
                    i = i || window.Ad, e || (e = document.t("a")), e.Fd = t, t = r.parse(e.Fd);
                    var n = !t.ms && "" === i.ms || t.ms === i.ms;
                    return t.ns === i.ns && n && t.Mi === i.Mi ? "" : "anonymous"
                };
            i.r = o
        }, {
            Ki: 72
        }],
        151: [function(t, i, n) {
            var e = t("../const"),
                r = i.r = {
                    uJ: 0,
                    vJ: !1,
                    wJ: t("eventemitter3"),
                    xC: t("./pluginTarget"),
                    N: function() {
                        return ++r.uJ
                    },
                    Ry: function(t, i) {
                        return i = i || [], i[0] = (t >> 16 & 255) / 255, i[1] = (t >> 8 & 255) / 255, i[2] = (255 & t) / 255, i
                    },
                    jC: function(t) {
                        return t = t.toString(16), t = "000000".substr(0, 6 - t.length) + t, "#" + t
                    },
                    Sy: function(t) {
                        return (255 * t[0] << 16) + (255 * t[1] << 8) + 255 * t[2]
                    },
                    sI: function(t) {
                        var i = e.pv.exec(t);
                        return i ? parseFloat(i[1]) : 1
                    },
                    dC: function(t) {
                        if (!r.vJ) {
                            if (navigator.Rl.toLowerCase().indexOf("chrome") > -1) {
                                var i = ["\n %c %c %c Pixi.js " + e.Bu + " - ? " + t + " ?  %c  %c  http://www.pixijs.com/  %c %c ?%c?%c? \n\n", "background: #ff66a5; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff66a5; background: #030307; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "background: #ffc3dc; padding:5px 0;", "background: #ff66a5; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;", "color: #ff2424; background: #fff; padding:5px 0;"];
                                window.Me.log.apply(console, i)
                            } else window.Me && window.Me.log("Pixi.js " + e.Bu + " - " + t + " - http://www.pixijs.com/");
                            r.vJ = !0
                        }
                    },
                    IA: function() {
                        var t = {
                            an: !0,
                            xJ: !0
                        };
                        try {
                            if (!window.yJ) return !1;
                            var i = document.t("canvas"),
                                n = i.Ro("webgl", t) || i.Ro("experimental-webgl", t),
                                e = !(!n || !n.GF().an);
                            if (n) {
                                var r = n.Un("WEBGL_lose_context");
                                r && r.DD()
                            }
                            return n = null, e
                        } catch (t) {
                            return !1
                        }
                    },
                    sign: function(t) {
                        return t ? t < 0 ? -1 : 1 : 0
                    },
                    Vt: function(t, i, n) {
                        var e = t.length;
                        if (!(i >= e || 0 === n)) {
                            n = i + n > e ? e - i : n;
                            for (var r = i, o = e - n; r < o; ++r) t[r] = t[r + n];
                            t.length = o
                        }
                    },
                    WF: {},
                    oI: {}
                }
        }, {
            rx: 78,
            zJ: 153,
            nr: 16
        }],
        152: [function(t, i, n) {
            var e = t("ismobilejs"),
                r = function(t) {
                    return e.Vl || e.Tl ? 2 : t
                };
            i.r = r
        }, {
            uu: 17
        }],
        153: [function(t, i, n) {
            function e(t) {
                t.AJ = {}, t.pu = function(i, n) {
                    t.AJ[i] = n
                }, t.prototype.uC = function() {
                    this.mu = this.mu || {};
                    for (var i in t.AJ) this.mu[i] = new t.AJ[i](this)
                }, t.prototype.CC = function() {
                    for (var t in this.mu) this.mu[t].Ym(), this.mu[t] = null;
                    this.mu = null
                }
            }
            i.r = {
                wC: function(t) {
                    e(t)
                }
            }
        }, {}],
        154: [function(t, i, n) {
            function e(t) {
                var i = (new Error).Oe;
                "undefined" == typeof i ? console.Ne("Deprecation Warning: ", t) : (i = i.split("\n").splice(3).join("\n"), console.BJ ? (console.BJ("%cDeprecation Warning: %c%s", "color:#614108;background:#fffbe6", "font-weight:normal;color:#614108;background:#fffbe6", t), console.Ne(i), console.CJ()) : (console.Ne("Deprecation Warning: ", t), console.Ne(i)))
            }
            var r = t("./core"),
                o = t("./mesh"),
                s = t("./particles"),
                h = t("./extras"),
                a = t("./filters");
            r.DJ = function() {
                throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")
            }, r.EJ = function() {
                throw new ReferenceError("The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.")
            }, Object.defineProperties(r, {
                FJ: {
                    _: function() {
                        return e("You do not need to use a PIXI Stage any more, you can simply render any container."), r.eA
                    }
                },
                GJ: {
                    _: function() {
                        return e("DisplayObjectContainer has been shortened to Container, please use Container from now on."), r.eA
                    }
                },
                HJ: {
                    _: function() {
                        return e("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."), o.IJ
                    }
                },
                JJ: {
                    _: function() {
                        return e("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."), o.JJ
                    }
                },
                KJ: {
                    _: function() {
                        return e("The ParticleContainer class has been moved to particles.ParticleContainer, please use particles.ParticleContainer from now on."), s.KJ
                    }
                },
                LJ: {
                    _: function() {
                        return e("The MovieClip class has been moved to extras.MovieClip, please use extras.MovieClip from now on."), h.LJ
                    }
                },
                MJ: {
                    _: function() {
                        return e("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."), h.MJ
                    }
                },
                NJ: {
                    _: function() {
                        return e("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."), h.NJ
                    }
                },
                eC: {
                    _: function() {
                        return e("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."), r.Ku
                    }
                },
                OJ: {
                    _: function() {
                        return e("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."), r.iv
                    }
                },
                oI: {
                    _: function() {
                        return e("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."), r.Wt.oI
                    }
                },
                WF: {
                    _: function() {
                        return e("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."), r.Wt.WF
                    }
                },
                PJ: {
                    _: function() {
                        return e("The math namespace is deprecated, please access members already accessible on PIXI."), r
                    }
                },
                QJ: {
                    _: function() {
                        return e("AstractFilter has been renamed to Filter, please use PIXI.Filter"), r.FA
                    }
                },
                RJ: {
                    _: function() {
                        return e("TransformManual has been renamed to TransformBase, please update your pixi-spine"), r.hA
                    }
                }
            }), r.Kt.prototype.kC = function(t, i, n) {
                return e("generateTexture has moved to the renderer, please use renderer.generateTexture(displayObject)"), t.kC(this, i, n)
            }, r.oA.prototype.kC = function(t, i) {
                return e("graphics generate texture has moved to the renderer. Or to render a graphics to a texture using canvas please use generateCanvasTexture"), this.Xy(t, i)
            }, r.uA.prototype.Ny = function(t, i, n, r) {
                this.uI.Ny(t, this, n, i, !r), e("RenderTexture.render is now deprecated, please use renderer.render(displayObject, renderTexture)")
            }, r.uA.prototype.SJ = function(t) {
                return e("RenderTexture.getImage is now deprecated, please use renderer.extract.image(target)"), this.uI.TJ.Wd(t)
            }, r.uA.prototype.UJ = function(t) {
                return e("RenderTexture.getBase64 is now deprecated, please use renderer.extract.base64(target)"), this.uI.TJ.VJ(t)
            }, r.uA.prototype.WJ = function(t) {
                return e("RenderTexture.getCanvas is now deprecated, please use renderer.extract.canvas(target)"), this.uI.TJ.Zy(t)
            }, r.uA.prototype.XJ = function(t) {
                return e("RenderTexture.getPixels is now deprecated, please use renderer.extract.pixels(target)"), this.uI.YJ(t)
            }, r.iA.prototype.ZJ = function(t) {
                this.bn = t, e("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")
            }, h.NJ.prototype.$J = function(t) {
                this.u = t, e("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")
            }, r.mA.prototype.$J = function(t) {
                this.u = t, e("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")
            }, r.mA.prototype._J = function(t) {
                this.T = t, e("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")
            }, Object.defineProperties(r.nA.prototype, {
                gH: {
                    _: function() {
                        e("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on");
                        var t = "number" == typeof this.WH ? this.WH + "px" : this.WH;
                        return this.XH + " " + this.YH + " " + this.ZH + " " + t + " " + this.VH
                    },
                    P: function(t) {
                        e("text style property 'font' is now deprecated, please use the 'fontFamily','fontSize',fontStyle','fontVariant' and 'fontWeight' properties from now on"), t.indexOf("italic") > 1 ? this.XH = "italic" : t.indexOf("oblique") > -1 ? this.XH = "oblique" : this.XH = "normal", t.indexOf("small-caps") > -1 ? this.YH = "small-caps" : this.YH = "normal";
                        var i, n = t.split(" "),
                            r = -1;
                        for (this.WH = 26, i = 0; i < n.length; ++i)
                            if (n[i].match(/(px|pt|em|%)/)) {
                                r = i, this.WH = n[i];
                                break
                            }
                        for (this.ZH = "normal", i = 0; i < r; ++i)
                            if (n[i].match(/(bold|bolder|lighter|100|200|300|400|500|600|700|800|900)/)) {
                                this.ZH = n[i];
                                break
                            }
                        if (r > -1 && r < n.length - 1) {
                            for (this.VH = "", i = r + 1; i < n.length; ++i) this.VH += n[i] + " ";
                            this.VH = this.VH.slice(0, -1)
                        } else this.VH = "Arial";
                        this.bH++
                    }
                }
            }), r.sA.prototype.yD = function(t) {
                this.zD = t, e("setFrame is now deprecated, please use the frame property, e.g : myTexture.frame = frame;")
            }, Object.defineProperties(a, {
                QJ: {
                    _: function() {
                        return e("AstractFilter has been renamed to Filter, please use PIXI.Filter"), r.QJ
                    }
                },
                EA: {
                    _: function() {
                        return e("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."), r.EA
                    }
                }
            }), r.Wt.aK = function() {
                return e("utils.uuid() is deprecated, please use utils.uid() from now on."), r.Wt.N()
            }, r.Wt.bK = function() {
                return e("utils.canUseNewCanvasBlendModes() is deprecated, please use CanvasTinter.canUseMultiply from now on"), r.kA.kG
            }
        }, {
            cK: 97,
            dK: 164,
            eK: 175,
            fK: 191,
            gK: 194
        }],
        155: [function(t, i, n) {
            function e(t) {
                this.Ft = t, t.TJ = this
            }
            var r = t("../../core"),
                o = new r.Yv;
            e.prototype.constructor = e, i.r = e, e.prototype.Wd = function(t) {
                var i = new Image;
                return i.Fa = this.VJ(t), i
            }, e.prototype.VJ = function(t) {
                return this.Zy(t).eG()
            }, e.prototype.Zy = function(t) {
                var i, n, e, s, h = this.Ft;
                t && (s = t instanceof r.uA ? t : h.kC(t)), s ? (i = s._y.$y.Xi, n = s._y.$y.tv, e = s.zD) : (i = h.lC, n = h.mC, e = o, e.Ka = this.Ft.Ka, e.Ua = this.Ft.Ua);
                var a = e.Ka * n,
                    u = e.Ua * n,
                    c = new r.yA(a, u),
                    f = i.NC(e.g * n, e.h * n, a, u);
                return c.Xi.iG(f, 0, 0), c.Zy
            }, e.prototype.YJ = function(t) {
                var i, n, e, s, h = this.Ft;
                return t && (s = t instanceof r.uA ? t : h.kC(t)), s ? (i = s._y.$y.Xi, n = s._y.$y.tv, e = s.zD) : (i = h.lC, n = h.mC, e = o, e.Ka = h.Ka, e.Ua = h.Ua), i.NC(0, 0, e.Ka * n, e.Ua * n).Wb
            }, e.prototype.Ym = function() {
                this.Ft.TJ = null, this.Ft = null
            }, r.ru.pu("extract", e)
        }, {
            hK: 97
        }],
        156: [function(t, i, n) {
            i.r = {
                iK: t("./webgl/WebGLExtract"),
                Zy: t("./canvas/CanvasExtract")
            }
        }, {
            jK: 155,
            kK: 157
        }],
        157: [function(t, i, n) {
            function e(t) {
                this.Ft = t, t.TJ = this
            }
            var r = t("../../core"),
                o = new r.Yv;
            e.prototype.constructor = e, i.r = e, e.prototype.Wd = function(t) {
                var i = new Image;
                return i.Fa = this.VJ(t), i
            }, e.prototype.VJ = function(t) {
                return this.Zy(t).eG()
            }, e.prototype.Zy = function(t) {
                var i, n, e, s, h = this.Ft,
                    a = !1;
                t && (s = t instanceof r.uA ? t : this.Ft.kC(t)), s ? (i = s._y.WC[this.Ft.Cz], n = i.tv, e = s.zD, a = !1) : (i = this.Ft.uD, n = i.tv, a = !0, e = o, e.Ka = i.Ho.Ka, e.Ua = i.Ho.Ua);
                var u = e.Ka * n,
                    c = e.Ua * n,
                    f = new r.yA(u, c);
                if (i) {
                    h.Qy(i);
                    var l = new Uint8Array(4 * u * c),
                        p = h.Lm;
                    p.lK(e.g * n, e.h * n, u, c, p.Nn, p.On, l);
                    var v = f.Xi.NC(0, 0, u, c);
                    v.Wb.P(l), f.Xi.iG(v, 0, 0), a && (f.Xi.jw(1, -1), f.Xi.MC(f.Zy, 0, -c))
                }
                return f.Zy
            }, e.prototype.YJ = function(t) {
                var i, n, e, s, h = this.Ft;
                t && (s = t instanceof r.uA ? t : this.Ft.kC(t)), s ? (i = s._y.WC[this.Ft.Cz], n = i.tv, e = s.zD) : (i = this.Ft.uD, n = i.tv, e = o, e.Ka = i.Ho.Ka, e.Ua = i.Ho.Ua);
                var a = e.Ka * n,
                    u = e.Ua * n,
                    c = new Uint8Array(4 * a * u);
                if (i) {
                    h.Qy(i);
                    var f = h.Lm;
                    f.lK(e.g * n, e.h * n, a, u, f.Nn, f.On, c)
                }
                return c
            }, e.prototype.Ym = function() {
                this.Ft.TJ = null, this.Ft = null
            }, r.qu.pu("extract", e)
        }, {
            hK: 97
        }],
        158: [function(t, i, n) {
            function e(t, i) {
                r.eA.call(this), i = i || {}, this.mK = 0, this.nK = 0, this.oK = [], this.XG = {
                    Vx: void 0 !== i.Vx ? i.Vx : 16777215,
                    wH: i.wH || "left",
                    name: null,
                    Ho: 0
                }, this.gH = i.gH, this.UG = t, this.Ma = 0, this.pK = 0, this.qK = new o(this.rK, this, 0, 0), this.Co = !1, this.aH()
            }
            var r = t("../core"),
                o = t("../core/math/ObservablePoint");
            e.prototype = Object.create(r.eA.prototype), e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                Vx: {
                    _: function() {
                        return this.XG.Vx
                    },
                    P: function(t) {
                        this.XG.Vx = "number" == typeof t && t >= 0 ? t : 16777215, this.Co = !0
                    }
                },
                wH: {
                    _: function() {
                        return this.XG.wH
                    },
                    P: function(t) {
                        this.XG.wH = t || "left", this.Co = !0
                    }
                },
                anchor: {
                    _: function() {
                        return this.qK
                    },
                    P: function(t) {
                        "number" == typeof t ? this.qK.P(t) : this.qK.bx(t)
                    }
                },
                gH: {
                    _: function() {
                        return this.XG
                    },
                    P: function(t) {
                        t && ("string" == typeof t ? (t = t.split(" "), this.XG.name = 1 === t.length ? t[0] : t.slice(1).join(" "), this.XG.Ho = t.length >= 2 ? parseInt(t[0], 10) : e.sK[this.XG.name].Ho) : (this.XG.name = t.name, this.XG.Ho = "number" == typeof t.Ho ? t.Ho : parseInt(t.Ho, 10)), this.Co = !0)
                    }
                },
                u: {
                    _: function() {
                        return this.UG
                    },
                    P: function(t) {
                        t = t.toString() || " ", this.UG !== t && (this.UG = t, this.Co = !0)
                    }
                }
            }), e.prototype.aH = function() {
                for (var t = e.sK[this.XG.name], i = new r.vx, n = null, o = [], s = 0, h = 0, a = [], u = 0, c = this.XG.Ho / t.Ho, f = -1, l = 0, p = 0, v = 0; v < this.u.length; v++) {
                    var y = this.u.charCodeAt(v);
                    if (/(\s)/.test(this.u.charAt(v)) && (f = v, l = s), /(?:\r\n|\r|\n)/.test(this.u.charAt(v))) a.push(s), h = Math.max(h, s), u++, i.g = 0, i.h += t.ph, n = null;
                    else if (f !== -1 && this.Ma > 0 && i.g * c > this.Ma) r.Wt.Vt(o, f, v - f), v = f, f = -1, a.push(l), h = Math.max(h, l), u++, i.g = 0, i.h += t.ph, n = null;
                    else {
                        var d = t.tK[y];
                        d && (n && d.uK[n] && (i.g += d.uK[n]), o.push({
                            bn: d.bn,
                            vK: u,
                            rg: y,
                            gh: new r.vx(i.g + d.wK, i.h + d.xK)
                        }), s = i.g + (d.bn.Ka + d.wK), i.g += d.yK, p = Math.max(p, d.xK + d.bn.Ua), n = y)
                    }
                }
                a.push(s), h = Math.max(h, s);
                var g = [];
                for (v = 0; v <= u; v++) {
                    var m = 0;
                    "right" === this.XG.wH ? m = h - a[v] : "center" === this.XG.wH && (m = (h - a[v]) / 2), g.push(m)
                }
                var b = o.length,
                    w = this.Vx;
                for (v = 0; v < b; v++) {
                    var x = this.oK[v];
                    x ? x.bn = o[v].bn : (x = new r.iA(o[v].bn), this.oK.push(x)), x.gh.g = (o[v].gh.g + g[o[v].vK]) * c, x.gh.h = o[v].gh.h * c, x.jw.g = x.jw.h = c, x.Vx = w, x.Kd || this.St(x)
                }
                for (v = b; v < this.oK.length; ++v) this.v(this.oK[v]);
                if (this.mK = h * c, this.nK = (i.h + t.ph) * c, 0 !== this.anchor.g || 0 !== this.anchor.h)
                    for (v = 0; v < b; v++) this.oK[v].g -= this.mK * this.anchor.g, this.oK[v].h -= this.nK * this.anchor.h;
                this.pK = p * c
            }, e.prototype.xw = function() {
                this.zK(), this.Bw()
            }, e.prototype.kw = function() {
                return this.zK(), r.eA.prototype.kw.call(this)
            }, e.prototype.zK = function() {
                this.Co && (this.aH(), this.Co = !1)
            }, e.prototype.rK = function() {
                this.Co = !0
            }, e.sK = {}
        }, {
            su: 97,
            AK: 100
        }],
        159: [function(t, i, n) {
            function e(t) {
                r.iA.call(this, t[0] instanceof r.sA ? t[0] : t[0].bn), this.BK = null, this.CK = null, this.wG = t, this.DK = 1, this.EK = !0, this.$q = null, this.FK = 0, this.GK = !1
            }
            var r = t("../core");
            e.prototype = Object.create(r.iA.prototype), e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                HK: {
                    _: function() {
                        return this.BK.length
                    }
                },
                wG: {
                    _: function() {
                        return this.BK
                    },
                    P: function(t) {
                        if (t[0] instanceof r.sA) this.BK = t, this.CK = null;
                        else {
                            this.BK = [], this.CK = [];
                            for (var i = 0; i < t.length; i++) this.BK.push(t[i].bn), this.CK.push(t[i].IK)
                        }
                    }
                },
                JK: {
                    _: function() {
                        var t = Math.floor(this.FK) % this.BK.length;
                        return t < 0 && (t += this.BK.length), t
                    }
                }
            }), e.prototype.Cb = function() {
                this.GK && (this.GK = !1, r.dA.rJ.hb(this.Mt, this))
            }, e.prototype.aJ = function() {
                this.GK || (this.GK = !0, r.dA.rJ.ra(this.Mt, this))
            }, e.prototype.KK = function(t) {
                this.Cb(), this.FK = t, this.IC = this.BK[this.JK], this.NF = -1
            }, e.prototype.LK = function(t) {
                this.FK = t, this.aJ()
            }, e.prototype.Mt = function(t) {
                var i = this.DK * t;
                if (null !== this.CK) {
                    var n = this.FK % 1 * this.CK[this.JK];
                    for (n += i / 60 * 1e3; n < 0;) this.FK--, n += this.CK[this.JK];
                    var e = Math.sign(this.DK * t);
                    for (this.FK = Math.floor(this.FK); n >= this.CK[this.JK];) n -= this.CK[this.JK] * e, this.FK += e;
                    this.FK += n / this.CK[this.JK]
                } else this.FK += i;
                this.FK < 0 && !this.EK ? (this.KK(0), this.$q && this.$q()) : this.FK >= this.BK.length && !this.EK ? (this.KK(this.BK.length - 1), this.$q && this.$q()) : (this.IC = this.BK[this.JK], this.NF = -1)
            }, e.prototype.Ym = function() {
                this.Cb(), r.iA.prototype.Ym.call(this)
            }, e.MK = function(t) {
                for (var i = [], n = 0; n < t.length; ++n) i.push(r.sA.VF(t[n]));
                return new e(i)
            }, e.NK = function(t) {
                for (var i = [], n = 0; n < t.length; ++n) i.push(r.sA.XF(t[n]));
                return new e(i)
            }
        }, {
            su: 97
        }],
        160: [function(t, i, n) {
            function e(t, i, n) {
                r.iA.call(this, t), this.OK = new r.vx(1, 1), this.PK = new r.vx(0, 0), this.lw = i || 100, this.mw = n || 100, this.LG = new r.xA, this.QK = null, this.RK = []
            }
            var r = t("../core"),
                o = new r.vx,
                s = t("../core/textures/Texture"),
                h = t("../core/sprites/canvas/CanvasTinter"),
                a = t("./webgl/TilingShader"),
                u = new Float32Array(4);
            e.prototype = Object.create(r.iA.prototype), e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                Ka: {
                    _: function() {
                        return this.lw
                    },
                    P: function(t) {
                        this.lw = t
                    }
                },
                Ua: {
                    _: function() {
                        return this.mw
                    },
                    P: function(t) {
                        this.mw = t
                    }
                }
            }), e.prototype.PF = function() {}, e.prototype.Lw = function(t) {
                var i = this.IC;
                if (i && i.LG) {
                    t.Mw();
                    var n = t.Lm,
                        e = this.RK[t.Cz];
                    e || (e = {
                        b: new a(n),
                        wE: new r.DA(n)
                    }, this.RK[t.Cz] = e, e.wE.FE(e.b));
                    var o = e.wE.Fl;
                    o[0] = o[6] = this.lw * -this.anchor.g, o[1] = o[3] = this.mw * -this.anchor.h, o[2] = o[4] = this.lw * (1 - this.anchor.g), o[5] = o[7] = this.mw * (1 - this.anchor.h), e.wE.Qm(), t.Fz(e.b);
                    var s = i.LG,
                        h = i.Ty.Ka,
                        c = i.Ty.Ua,
                        f = i._y.Ka,
                        l = i._y.Ua,
                        p = e.b.Dn.SK;
                    p[0] = 1 / f, p[1] = 1 / l, e.b.Dn.SK = p;
                    var v = e.b.Dn.TK;
                    v[0] = s.KI, v[1] = s.LI, v[2] = s.MI - s.KI, v[3] = s.QI - s.LI, e.b.Dn.TK = v;
                    var y = e.b.Dn.UK;
                    y[0] = this.PK.g % (h * this.OK.g) / this.lw, y[1] = this.PK.h % (c * this.OK.h) / this.mw, y[2] = f / this.lw * this.OK.g, y[3] = l / this.mw * this.OK.h, e.b.Dn.UK = y, e.b.Dn.Gz = this.Zt.$b(!0);
                    var d = u;
                    r.Wt.Ry(this.Vx, d), d[3] = this.zw, e.b.Dn.VK = d, t.Yn(this.IC, 0), t.Ub.pz(this.Xx), e.wE.Mo()
                }
            }, e.prototype.Vw = function(t) {
                var i = this.IC;
                if (i._y.aD) {
                    var n = t.Xi,
                        e = this.Zt,
                        o = t.tv,
                        s = i._y,
                        a = this.PK.g / this.OK.g % i.Ty.Ka,
                        u = this.PK.h / this.OK.h % i.Ty.Ua;
                    if (!this.QK) {
                        var c = new r.yA(i.Ty.Ka, i.Ty.Ua);
                        16777215 !== this.Vx ? (this.JF !== this.Vx && (this.JF = this.Vx, this.YF = h.ZF(this, this.Vx)), c.Xi.MC(this.YF, 0, 0)) : c.Xi.MC(s.source, -i.Ty.g, -i.Ty.h), this.QK = c.Xi.WK(c.Zy, "repeat")
                    }
                    n.sz = this.zw, n.ox(e._t * o, e.ew * o, e.fw * o, e.bu * o, e.$t * o, e.au * o), n.jw(this.OK.g, this.OK.h), n.JB(a + this.anchor.g * -this.lw, u + this.anchor.h * -this.mw);
                    var f = t.eC[this.Xx];
                    f !== t.Xi.zC && (n.zC = f), n.tz = this.QK, n.wz(-a, -u, this.lw / this.OK.g, this.mw / this.OK.h)
                }
            }, e.prototype.cu = function() {
                var t, i, n, e, r = this.lw,
                    o = this.mw,
                    s = r * (1 - this.anchor.g),
                    h = r * -this.anchor.g,
                    a = o * (1 - this.anchor.h),
                    u = o * -this.anchor.h,
                    c = this.Zt,
                    f = c._t,
                    l = c.ew,
                    p = c.fw,
                    v = c.bu,
                    y = c.$t,
                    d = c.au,
                    g = f * h + p * u + y,
                    m = v * u + l * h + d,
                    b = f * s + p * u + y,
                    w = v * u + l * s + d,
                    x = f * s + p * a + y,
                    C = v * a + l * s + d,
                    M = f * h + p * a + y,
                    F = v * a + l * h + d;
                t = g, t = b < t ? b : t, t = x < t ? x : t, t = M < t ? M : t, n = m, n = w < n ? w : n, n = C < n ? C : n, n = F < n ? F : n, i = g, i = b > i ? b : i, i = x > i ? x : i, i = M > i ? M : i, e = m, e = w > e ? w : e, e = C > e ? C : e, e = F > e ? F : e;
                var z = this.Dw;
                return z.g = t, z.Ka = i - t, z.h = n, z.Ua = e - n, this.px = z, z
            }, e.prototype.Vy = function(t) {
                this.Zt.mx(t, o);
                var i, n = this.lw,
                    e = this.mw,
                    r = -n * this.anchor.g;
                return o.g > r && o.g < r + n && (i = -e * this.anchor.h, o.h > i && o.h < i + e)
            }, e.prototype.Ym = function() {
                r.iA.prototype.Ym.call(this), this.OK = null, this.XK = null, this.PK = null, this.LG = null
            }, e.UF = function(t, i, n) {
                return new e(s.UF(t), i, n)
            }, e.VF = function(t, i, n) {
                var o = r.Wt.WF[t];
                if (!o) throw new Error('The frameId "' + t + '" does not exist in the texture cache ' + this);
                return new e(o, i, n)
            }, e.XF = function(t, i, n, o, s) {
                return new e(r.sA.XF(t, o, s), i, n)
            }
        }, {
            su: 97,
            YK: 135,
            ZK: 144,
            $K: 165
        }],
        161: [function(t, i, n) {
            var e = t("../core"),
                r = e.Kt,
                o = new e.Jx;
            r.prototype._K = !1, r.prototype.aL = !1;
            var s = function() {
                this.bL = null, this.cL = null, this.dL = null, this.eL = null, this.fL = null, this.gL = null, this.hL = null, this.iL = null, this.jL = null, this.TF = null
            };
            Object.defineProperties(r.prototype, {
                kL: {
                    _: function() {
                        return this._K
                    },
                    P: function(t) {
                        if (this._K !== t) {
                            this._K = t;
                            var i;
                            t ? (this.aL || (this.aL = new s), i = this.aL, i.bL = this.Gw, i.cL = this.Ww, i.fL = this.xw, i.dL = this.Ew, i.eL = this.kw, i.hL = this.Ym, i.lL = this.Vy, i.iL = this.Iw, i.jL = this.Zw, this.Gw = this.mL, this.Ww = this.nL, this.Ym = this.oL) : (i = this.aL, i.TF && this.pL(), this.Gw = i.bL, this.Ww = i.cL, this.Ew = i.dL, this.kw = i.eL, this.Ym = i.hL, this.xw = i.fL, this.Vy = i.lL, this.Iw = i.iL, this.Zw = i.jL)
                        }
                    }
                }
            }), r.prototype.mL = function(t) {
                !this.zj || this.zw <= 0 || !this.Hw || (this.qL(t), this.aL.TF.MF = -1, this.aL.TF.zw = this.zw, this.aL.TF.Lw(t))
            }, r.prototype.qL = function(t) {
                if (!this.aL || !this.aL.TF) {
                    var i = this.Aw;
                    this.Aw = 1, t.Nw.Mw();
                    var n = this.kw().Ea();
                    if (this.Jw) {
                        var r = this.Jw[0].zh;
                        n.aC(r)
                    }
                    var s = t.Oy,
                        h = t.Qw.CE,
                        a = e.uA.create(0 | n.Ka, 0 | n.Ua),
                        u = o;
                    u.$t = -n.g, u.au = -n.h, this.pw.Zt.MB(), this.Gw = this.aL.bL, t.Ny(this, a, !0, u, !0), t.Qy(s), t.Qw.CE = h, this.Gw = this.mL, this.xw = this.hx, this.Iw = null, this.Zw = null;
                    var c = new e.iA(a);
                    c.pw.Zt = this.pw.Zt, c.anchor.g = -(n.g / n.Ka), c.anchor.h = -(n.h / n.Ua), c.Aw = i, c.Dw = this.Dw, this.Ew = this.rL, this.kw = this.sL, this.aL.TF = c, this.pw.ow = -1, this.xw(), this.Vy = c.Vy.bind(c)
                }
            }, r.prototype.nL = function(t) {
                !this.zj || this.zw <= 0 || !this.Hw || (this.tL(t), this.aL.TF.zw = this.zw, this.aL.TF.Ww(t))
            }, r.prototype.tL = function(t) {
                if (!this.aL || !this.aL.TF) {
                    var i = this.kw(),
                        n = this.Aw;
                    this.Aw = 1;
                    var r = t.Xi,
                        s = new e.uA.create(0 | i.Ka, 0 | i.Ua),
                        h = o;
                    this.pw.Zt.bx(h), h.LB(), h.$t -= i.g, h.au -= i.h, this.Ww = this.aL.cL, t.Ny(this, s, !0, h, !1), t.Xi = r, this.Ww = this.nL, this.Ew = this.rL, this.Iw = null, this.Zw = null;
                    var a = new e.iA(s);
                    a.pw.Zt = this.pw.Zt, a.anchor.g = -(i.g / i.Ka), a.anchor.h = -(i.h / i.Ua), a.Dw = this.Dw, a.Aw = n, this.xw(), this.xw = this.hx, this.aL.TF = a, this.Vy = a.Vy.bind(a)
                }
            }, r.prototype.rL = function() {
                return this.aL.TF.Ew()
            }, r.prototype.sL = function() {
                return this.aL.TF.kw()
            }, r.prototype.pL = function() {
                this.aL.TF.IC.Ym(!0), this.aL.TF = null
            }, r.prototype.oL = function() {
                this.kL = !1, this.Ym()
            }
        }, {
            su: 97
        }],
        162: [function(t, i, n) {
            var e = t("../core");
            e.Kt.prototype.name = null, e.eA.prototype.uL = function(t) {
                for (var i = 0; i < this.he.length; i++)
                    if (this.he[i].name === t) return this.he[i];
                return null
            }
        }, {
            su: 97
        }],
        163: [function(t, i, n) {
            var e = t("../core");
            e.Kt.prototype.vL = function(t) {
                return t = t || new e.vx, this.Kd ? (this.hx(), t.g = this.Zt.$t, t.h = this.Zt.au) : (t.g = this.gh.g, t.h = this.gh.h), t
            }
        }, {
            su: 97
        }],
        164: [function(t, i, n) {
            t("./cacheAsBitmap"), t("./getChildByName"), t("./getGlobalPosition"), i.r = {
                LJ: t("./MovieClip"),
                MJ: t("./TilingSprite"),
                NJ: t("./BitmapText")
            }
        }, {
            wL: 158,
            xL: 159,
            yL: 160,
            zL: 161,
            AL: 162,
            BL: 163
        }],
        165: [function(t, i, n) {
            function e(t) {
                r.call(this, t, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\n\nuniform vec4 uFrame;\nuniform vec4 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vec2 coord = aTextureCoord;\n    coord -= uTransform.xy;\n    coord /= uTransform.zw;\n    vTextureCoord = coord;\n}\n", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform vec4 uFrame;\nuniform vec2 uPixelSize;\n\nvoid main(void)\n{\n\n   \tvec2 coord = mod(vTextureCoord, uFrame.zw);\n   \tcoord = clamp(coord, uPixelSize, uFrame.zw - uPixelSize);\n   \tcoord += uFrame.xy;\n\n   \tvec4 sample = texture2D(uSampler, coord);\n  \tvec4 color = vec4(uColor.rgb * uColor.a, uColor.a);\n\n   \tgl_FragColor = sample * color ;\n}\n")
            }
            var r = t("../../core/Shader");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e
        }, {
            CL: 77
        }],
        166: [function(t, i, n) {
            function e(t, i, n) {
                r.FA.call(this), this.DL = new o, this.EL = new s, this.tv = 1, this.zh = 0, this.tv = n || 1, this.FL = i || 4, this.Wf = t || 8
            }
            var r = t("../../core"),
                o = t("./BlurXFilter"),
                s = t("./BlurYFilter");
            e.prototype = Object.create(r.FA.prototype), e.prototype.constructor = e, i.r = e, e.prototype.apply = function(t, i, n) {
                var e = t.ME(!0);
                this.DL.apply(t, i, e, !0), this.EL.apply(t, e, n, !1), t.NE(e)
            }, Object.defineProperties(e.prototype, {
                Wf: {
                    _: function() {
                        return this.DL.Wf
                    },
                    P: function(t) {
                        this.DL.Wf = this.EL.Wf = t, this.zh = 2 * Math.max(Math.abs(this.EL.GL), Math.abs(this.EL.GL))
                    }
                },
                FL: {
                    _: function() {
                        return this.DL.FL
                    },
                    P: function(t) {
                        this.DL.FL = this.EL.FL = t
                    }
                },
                HL: {
                    _: function() {
                        return this.DL.Wf
                    },
                    P: function(t) {
                        this.DL.Wf = t, this.zh = 2 * Math.max(Math.abs(this.EL.GL), Math.abs(this.EL.GL))
                    }
                },
                IL: {
                    _: function() {
                        return this.EL.Wf
                    },
                    P: function(t) {
                        this.EL.Wf = t, this.zh = 2 * Math.max(Math.abs(this.EL.GL), Math.abs(this.EL.GL))
                    }
                }
            })
        }, {
            hK: 97,
            JL: 167,
            KL: 168
        }],
        167: [function(t, i, n) {
            function e(t, i, n) {
                var e = o(5, !0),
                    h = s(5);
                r.FA.call(this, e, h), this.tv = n || 1, this.LL = 0, this.FL = i || 4, this.GL = t || 8, this.ML = !0
            }
            var r = t("../../core"),
                o = t("./generateBlurVertSource"),
                s = t("./generateBlurFragSource"),
                h = t("./getMaxBlurKernelSize");
            e.prototype = Object.create(r.FA.prototype), e.prototype.constructor = e, i.r = e, e.prototype.apply = function(t, i, n, e) {
                if (this.ML) {
                    var r = t.Ft.Lm,
                        a = h(r);
                    this.fE = o(a, !0), this.hE = s(a), this.ML = !1
                }
                if (this.Dn.GL = 1 / n.Ho.Ka * (n.Ho.Ka / i.Ho.Ka), this.Dn.GL *= this.GL, this.Dn.GL /= this.NL, 1 === this.NL) t.mE(this, i, n, e);
                else {
                    for (var u = t.ME(!0), c = i, f = u, l = 0; l < this.NL - 1; l++) {
                        t.mE(this, c, f, !0);
                        var p = f;
                        f = c, c = p
                    }
                    t.mE(this, c, n, e), t.NE(u)
                }
            }, Object.defineProperties(e.prototype, {
                Wf: {
                    _: function() {
                        return this.GL
                    },
                    P: function(t) {
                        this.zh = 2 * Math.abs(t), this.GL = t
                    }
                },
                FL: {
                    _: function() {
                        return this.LL
                    },
                    P: function(t) {
                        this.LL = t, this.NL = t
                    }
                }
            })
        }, {
            hK: 97,
            OL: 169,
            PL: 170,
            QL: 171
        }],
        168: [function(t, i, n) {
            function e(t, i, n) {
                var e = o(5, !1),
                    h = s(5);
                r.FA.call(this, e, h), this.tv = n || 1, this.LL = 0, this.FL = i || 4, this.GL = t || 8, this.ML = !0
            }
            var r = t("../../core"),
                o = t("./generateBlurVertSource"),
                s = t("./generateBlurFragSource"),
                h = t("./getMaxBlurKernelSize");
            e.prototype = Object.create(r.FA.prototype), e.prototype.constructor = e, i.r = e, e.prototype.apply = function(t, i, n, e) {
                if (this.ML) {
                    var r = t.Ft.Lm,
                        a = h(r);
                    this.fE = o(a, !1), this.hE = s(a), this.ML = !1
                }
                if (this.Dn.GL = 1 / n.Ho.Ua * (n.Ho.Ua / i.Ho.Ua), this.Dn.GL *= this.GL, this.Dn.GL /= this.NL, 1 === this.NL) t.mE(this, i, n, e);
                else {
                    for (var u = t.ME(!0), c = i, f = u, l = 0; l < this.NL - 1; l++) {
                        t.mE(this, c, f, !0);
                        var p = f;
                        f = c, c = p
                    }
                    t.mE(this, c, n, e), t.NE(u)
                }
            }, Object.defineProperties(e.prototype, {
                Wf: {
                    _: function() {
                        return this.GL
                    },
                    P: function(t) {
                        this.zh = 2 * Math.abs(t), this.GL = t
                    }
                },
                FL: {
                    _: function() {
                        return this.LL
                    },
                    P: function(t) {
                        this.LL = t, this.NL = t
                    }
                }
            })
        }, {
            hK: 97,
            OL: 169,
            PL: 170,
            QL: 171
        }],
        169: [function(t, i, n) {
            var e = {
                    5: [.153388, .221461, .250301],
                    7: [.071303, .131514, .189879, .214607],
                    9: [.028532, .067234, .124009, .179044, .20236],
                    11: [.0093, .028002, .065984, .121703, .175713, .198596],
                    13: [.002406, .009255, .027867, .065666, .121117, .174868, .197641],
                    15: [489e-6, .002403, .009246, .02784, .065602, .120999, .174697, .197448]
                },
                r = ["varying vec2 vBlurTexCoords[%size%];", "uniform sampler2D uSampler;", "void main(void)", "{", "\tgl_FragColor = vec4(0.0);", "\t%blur%", "}"].join("\n"),
                o = function(t) {
                    for (var i, n = e[t], o = n.length, s = r, h = "", a = "gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;", u = 0; u < t; u++) {
                        var c = a.replace("%index%", u);
                        i = u, u >= o && (i = t - u - 1), c = c.replace("%value%", n[i]), h += c, h += "\n"
                    }
                    return s = s.replace("%blur%", h), s = s.replace("%size%", t)
                };
            i.r = o
        }, {}],
        170: [function(t, i, n) {
            var e = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform float strength;", "uniform mat3 projectionMatrix;", "varying vec2 vBlurTexCoords[%size%];", "void main(void)", "{", "gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);", "%blur%", "}"].join("\n"),
                r = function(t, i) {
                    var n, r, o = Math.ceil(t / 2),
                        s = e,
                        h = "";
                    n = i ? "vBlurTexCoords[%index%] = aTextureCoord + vec2(%sampleIndex% * strength, 0.0);" : "vBlurTexCoords[%index%] = aTextureCoord + vec2(0.0, %sampleIndex% * strength);";
                    for (var a = 0; a < t; a++) {
                        var u = n.replace("%index%", a);
                        r = a, a >= o && (r = t - a - 1), u = u.replace("%sampleIndex%", a - (o - 1) + ".0"), h += u, h += "\n"
                    }
                    return s = s.replace("%blur%", h), s = s.replace("%size%", t)
                };
            i.r = r
        }, {}],
        171: [function(t, i, n) {
            var e = function(t) {
                for (var i = t.xo(t.RL), n = 15; n > i;) n -= 2;
                return n
            };
            i.r = e
        }, {}],
        172: [function(t, i, n) {
            function e() {
                r.FA.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[20];\n\nvoid main(void)\n{\n\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.r = (m[0] * c.r);\n        gl_FragColor.r += (m[1] * c.g);\n        gl_FragColor.r += (m[2] * c.b);\n        gl_FragColor.r += (m[3] * c.a);\n        gl_FragColor.r += m[4] * c.a;\n\n    gl_FragColor.g = (m[5] * c.r);\n        gl_FragColor.g += (m[6] * c.g);\n        gl_FragColor.g += (m[7] * c.b);\n        gl_FragColor.g += (m[8] * c.a);\n        gl_FragColor.g += m[9] * c.a;\n\n     gl_FragColor.b = (m[10] * c.r);\n        gl_FragColor.b += (m[11] * c.g);\n        gl_FragColor.b += (m[12] * c.b);\n        gl_FragColor.b += (m[13] * c.a);\n        gl_FragColor.b += m[14] * c.a;\n\n     gl_FragColor.a = (m[15] * c.r);\n        gl_FragColor.a += (m[16] * c.g);\n        gl_FragColor.a += (m[17] * c.b);\n        gl_FragColor.a += (m[18] * c.a);\n        gl_FragColor.a += m[19] * c.a;\n\n//    gl_FragColor = vec4(m[0]);\n}\n"),
                    this.Dn.SL = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
            }
            var r = t("../../core");
            e.prototype = Object.create(r.FA.prototype), e.prototype.constructor = e, i.r = e, e.prototype.TL = function(t, i) {
                i = !!i;
                var n = t;
                i && (this.UL(n, this.Dn.SL, t), n = this.VL(n)), this.Dn.SL = n
            }, e.prototype.UL = function(t, i, n) {
                return t[0] = i[0] * n[0] + i[1] * n[5] + i[2] * n[10] + i[3] * n[15], t[1] = i[0] * n[1] + i[1] * n[6] + i[2] * n[11] + i[3] * n[16], t[2] = i[0] * n[2] + i[1] * n[7] + i[2] * n[12] + i[3] * n[17], t[3] = i[0] * n[3] + i[1] * n[8] + i[2] * n[13] + i[3] * n[18], t[4] = i[0] * n[4] + i[1] * n[9] + i[2] * n[14] + i[3] * n[19], t[5] = i[5] * n[0] + i[6] * n[5] + i[7] * n[10] + i[8] * n[15], t[6] = i[5] * n[1] + i[6] * n[6] + i[7] * n[11] + i[8] * n[16], t[7] = i[5] * n[2] + i[6] * n[7] + i[7] * n[12] + i[8] * n[17], t[8] = i[5] * n[3] + i[6] * n[8] + i[7] * n[13] + i[8] * n[18], t[9] = i[5] * n[4] + i[6] * n[9] + i[7] * n[14] + i[8] * n[19], t[10] = i[10] * n[0] + i[11] * n[5] + i[12] * n[10] + i[13] * n[15], t[11] = i[10] * n[1] + i[11] * n[6] + i[12] * n[11] + i[13] * n[16], t[12] = i[10] * n[2] + i[11] * n[7] + i[12] * n[12] + i[13] * n[17], t[13] = i[10] * n[3] + i[11] * n[8] + i[12] * n[13] + i[13] * n[18], t[14] = i[10] * n[4] + i[11] * n[9] + i[12] * n[14] + i[13] * n[19], t[15] = i[15] * n[0] + i[16] * n[5] + i[17] * n[10] + i[18] * n[15], t[16] = i[15] * n[1] + i[16] * n[6] + i[17] * n[11] + i[18] * n[16], t[17] = i[15] * n[2] + i[16] * n[7] + i[17] * n[12] + i[18] * n[17], t[18] = i[15] * n[3] + i[16] * n[8] + i[17] * n[13] + i[18] * n[18], t[19] = i[15] * n[4] + i[16] * n[9] + i[17] * n[14] + i[18] * n[19], t
            }, e.prototype.VL = function(t) {
                var i = new Float32Array(t);
                return i[4] /= 255, i[9] /= 255, i[14] /= 255, i[19] /= 255, i
            }, e.prototype.WL = function(t, i) {
                var n = [t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 1, 0];
                this.TL(n, i)
            }, e.prototype.XL = function(t, i) {
                var n = [t, t, t, 0, 0, t, t, t, 0, 0, t, t, t, 0, 0, 0, 0, 0, 1, 0];
                this.TL(n, i)
            }, e.prototype.YL = e.prototype.XL, e.prototype.ZL = function(t) {
                var i = [.3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0];
                this.TL(i, t)
            }, e.prototype.$L = function(t, i) {
                t = (t || 0) / 180 * Math.PI;
                var n = Math.cos(t),
                    e = Math.sin(t),
                    r = Math.sqrt,
                    o = 1 / 3,
                    s = r(o),
                    h = n + (1 - n) * o,
                    a = o * (1 - n) - s * e,
                    u = o * (1 - n) + s * e,
                    c = o * (1 - n) + s * e,
                    f = n + o * (1 - n),
                    l = o * (1 - n) - s * e,
                    p = o * (1 - n) - s * e,
                    v = o * (1 - n) + s * e,
                    y = n + o * (1 - n),
                    d = [h, a, u, 0, 0, c, f, l, 0, 0, p, v, y, 0, 0, 0, 0, 0, 1, 0];
                this.TL(d, i)
            }, e.prototype._L = function(t, i) {
                var n = (t || 0) + 1,
                    e = -128 * (n - 1),
                    r = [n, 0, 0, 0, e, 0, n, 0, 0, e, 0, 0, n, 0, e, 0, 0, 0, 1, 0];
                this.TL(r, i)
            }, e.prototype.aM = function(t, i) {
                var n = 2 * (t || 0) / 3 + 1,
                    e = (n - 1) * -.5,
                    r = [n, e, e, 0, 0, e, n, e, 0, 0, e, e, n, 0, 0, 0, 0, 0, 1, 0];
                this.TL(r, i)
            }, e.prototype.bM = function() {
                this.aM(-1)
            }, e.prototype.cM = function(t) {
                var i = [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0];
                this.TL(i, t)
            }, e.prototype.dM = function(t) {
                var i = [.393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0];
                this.TL(i, t)
            }, e.prototype.eM = function(t) {
                var i = [1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0];
                this.TL(i, t)
            }, e.prototype.fM = function(t) {
                var i = [1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0];
                this.TL(i, t)
            }, e.prototype.gM = function(t) {
                var i = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0];
                this.TL(i, t)
            }, e.prototype.hM = function(t) {
                var i = [1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0];
                this.TL(i, t)
            }, e.prototype.iM = function(t) {
                var i = [.5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0];
                this.TL(i, t)
            }, e.prototype.jM = function(t) {
                var i = [.6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0];
                this.TL(i, t)
            }, e.prototype.kM = function(t, i, n, e, r) {
                t = t || .2, i = i || .15, n = n || 16770432, e = e || 3375104;
                var o = (n >> 16 & 255) / 255,
                    s = (n >> 8 & 255) / 255,
                    h = (255 & n) / 255,
                    a = (e >> 16 & 255) / 255,
                    u = (e >> 8 & 255) / 255,
                    c = (255 & e) / 255,
                    f = [.3, .59, .11, 0, 0, o, s, h, t, 0, a, u, c, i, 0, o - a, s - u, h - c, 0, 0];
                this.TL(f, r)
            }, e.prototype.lM = function(t, i) {
                t = t || .1;
                var n = [t * -2, -t, 0, 0, 0, -t, 0, t, 0, 0, 0, t, 2 * t, 0, 0, 0, 0, 0, 1, 0];
                this.TL(n, i)
            }, e.prototype.mM = function(t, i) {
                var n = [11.224130630493164 * t, -4.794486999511719 * t, -2.8746118545532227 * t, 0 * t, .40342438220977783 * t, -3.6330697536468506 * t, 9.193157196044922 * t, -2.951810836791992 * t, 0 * t, -1.316135048866272 * t, -3.2184197902679443 * t, -4.2375030517578125 * t, 7.476448059082031 * t, 0 * t, .8044459223747253 * t, 0, 0, 0, 1, 0];
                this.TL(n, i)
            }, e.prototype.nM = function(t) {
                var i = [2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0];
                this.TL(i, t)
            }, e.prototype.Yd = function() {
                var t = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
                this.TL(t, !1)
            }, Object.defineProperties(e.prototype, {
                oM: {
                    _: function() {
                        return this.Dn.SL
                    },
                    P: function(t) {
                        this.Dn.SL = t
                    }
                }
            })
        }, {
            hK: 97
        }],
        173: [function(t, i, n) {
            function e(t, i) {
                var n = new r.Jx;
                t.Hw = !1, r.FA.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 filterMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vFilterCoord;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vFilterCoord;\nvarying vec2 vTextureCoord;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vFilterCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), filterClamp.xy, filterClamp.zw));\n}\n"), this.rE = t, this.sE = n, this.Dn.pM = t.bn, this.Dn.qM = n.$b(!0), this.Dn.jw = {
                    g: 1,
                    h: 1
                }, null !== i && void 0 !== i || (i = 20), this.jw = new r.vx(i, i)
            }
            var r = t("../../core");
            e.prototype = Object.create(r.FA.prototype), e.prototype.constructor = e, i.r = e, e.prototype.apply = function(t, i, n) {
                var e = 1 / n.BE.Ka * (n.Ho.Ka / i.Ho.Ka);
                this.Dn.qM = t.qE(this.sE, this.rE), this.Dn.jw.g = this.jw.g * e, this.Dn.jw.h = this.jw.h * e, t.mE(this, i, n)
            }, Object.defineProperties(e.prototype, {
                map: {
                    _: function() {
                        return this.Dn.pM
                    },
                    P: function(t) {
                        this.Dn.pM = t
                    }
                }
            })
        }, {
            hK: 97
        }],
        174: [function(t, i, n) {
            function e() {
                r.FA.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform vec4 filterArea;\n\nvarying vec2 vTextureCoord;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n               out vec2 v_rgbNW, out vec2 v_rgbNE,\n               out vec2 v_rgbSW, out vec2 v_rgbSE,\n               out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void) {\n\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n   vTextureCoord = aTextureCoord;\n\n   vec2 fragCoord = vTextureCoord * filterArea.xy;\n\n   texcoords(fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}", '#define GLSLIFY 1\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\n/**\n Basic FXAA implementation based on the code on geeks3d.com with the\n modification that the texture2DLod stuff was removed since it\'s\n unsupported by WebGL.\n \n --\n \n From:\n https://github.com/mitsuhiko/webgl-meincraft\n \n Copyright (c) 2011 by Armin Ronacher.\n \n Some rights reserved.\n \n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions are\n met:\n \n * Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n \n * Redistributions in binary form must reproduce the above\n copyright notice, this list of conditions and the following\n disclaimer in the documentation and/or other materials provided\n with the distribution.\n \n * The names of the contributors may not be used to endorse or\n promote products derived from this software without specific\n prior written permission.\n \n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\n OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\n SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\n LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\n DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\n THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\n OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n */\n\n#ifndef FXAA_REDUCE_MIN\n#define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n#define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n#define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n          vec2 v_rgbNW, vec2 v_rgbNE,\n          vec2 v_rgbSW, vec2 v_rgbSE,\n          vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n    \n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n    \n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n    \n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n                  dir * rcpDirMin)) * inverseVP;\n    \n    vec3 rgbA = 0.5 * (\n                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n    \n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\nvoid main() {\n\n  \tvec2 fragCoord = vTextureCoord * filterArea.xy;\n\n  \tvec4 color;\n\n    color = fxaa(uSampler, fragCoord, filterArea.xy, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n  \tgl_FragColor = color;\n}\n')
            }
            var r = t("../../core");
            e.prototype = Object.create(r.FA.prototype), e.prototype.constructor = e, i.r = e
        }, {
            hK: 97
        }],
        175: [function(t, i, n) {
            i.r = {
                rM: t("./fxaa/FXAAFilter"),
                sM: t("./noise/NoiseFilter"),
                tM: t("./displacement/DisplacementFilter"),
                uM: t("./blur/BlurFilter"),
                vM: t("./blur/BlurXFilter"),
                wM: t("./blur/BlurYFilter"),
                xM: t("./colormatrix/ColorMatrixFilter"),
                yM: t("./void/VoidFilter")
            }
        }, {
            zM: 166,
            AM: 167,
            BM: 168,
            CM: 172,
            DM: 173,
            EM: 174,
            FM: 176,
            GM: 177
        }],
        176: [function(t, i, n) {
            function e() {
                r.FA.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "precision highp float;\n#define GLSLIFY 1\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(gl_FragCoord.xy) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n"), this.j = .5
            }
            var r = t("../../core");
            e.prototype = Object.create(r.FA.prototype), e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                j: {
                    _: function() {
                        return this.Dn.j
                    },
                    P: function(t) {
                        this.Dn.j = t
                    }
                }
            })
        }, {
            hK: 97
        }],
        177: [function(t, i, n) {
            function e() {
                r.FA.call(this, "#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}", "#define GLSLIFY 1\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n"), this.lE = "void"
            }
            var r = t("../../core");
            e.prototype = Object.create(r.FA.prototype), e.prototype.constructor = e, i.r = e
        }, {
            hK: 97
        }],
        178: [function(t, i, n) {
            function e() {
                this.global = new r.vx, this.zd = null, this.Rf = null
            }
            var r = t("../core");
            e.prototype.constructor = e, i.r = e, e.prototype.HM = function(t, i, n) {
                return t.Zt.mx(n || this.global, i)
            }
        }, {
            su: 97
        }],
        179: [function(t, i, n) {
            function e(t, i) {
                s.call(this), i = i || {}, this.Ft = t, this.IM = void 0 === i.IM || i.IM, this.JM = i.JM || 10, this.KM = new o, this.KM.global.P(-999999), this.ou = {
                    LM: !1,
                    zd: null,
                    z: null,
                    Wb: this.KM,
                    Mf: function() {
                        this.LM = !0
                    }
                }, this.MM = [], this.NM = null, this.OM = !1, this.PM = !1, this.QM = this.QM.bind(this), this.RM = this.RM.bind(this), this.SM = this.SM.bind(this), this.TM = this.TM.bind(this), this.UM = this.UM.bind(this), this.VM = this.VM.bind(this), this.WM = this.WM.bind(this), this.XM = this.XM.bind(this), this.YM = this.YM.bind(this), this.ZM = this.ZM.bind(this), this.$M = this.$M.bind(this), this._M = this._M.bind(this), this.aN = this.aN.bind(this), this.bN = this.bN.bind(this), this.cN = this.cN.bind(this), this.dN = "inherit", this.eN = "inherit", this.fN = new r.vx, this.tv = 1, this.gN(this.Ft.pg, this.Ft.tv)
            }
            var r = t("../core"),
                o = t("./InteractionData"),
                s = t("eventemitter3");
            Object.Dm(r.Kt.prototype, t("./interactiveTarget")), e.prototype = Object.create(s.prototype), e.prototype.constructor = e, i.r = e, e.prototype.gN = function(t, i) {
                this.hN(), this.NM = t, this.tv = i || 1, this.iN()
            }, e.prototype.iN = function() {
                this.NM && (r.dA.rJ.ra(this.Mt, this), window.kN.jN && (this.NM.T["lN"] = "none", this.NM.T["mN"] = "none"), window.s.Sc("mousemove", this.UM, !0), this.NM.Sc("mousedown", this.SM, !0), this.NM.Sc("mouseout", this.WM, !0), this.NM.Sc("mouseover", this.YM, !0), this.NM.Sc("touchstart", this.ZM, !0), this.NM.Sc("touchend", this._M, !0), this.NM.Sc("touchmove", this.bN, !0), window.Sc("mouseup", this.QM, !0), this.PM = !0)
            }, e.prototype.hN = function() {
                this.NM && (r.dA.rJ.hb(this.Mt), window.kN.jN && (this.NM.T["lN"] = "", this.NM.T["mN"] = ""), window.s.K("mousemove", this.UM, !0), this.NM.K("mousedown", this.SM, !0), this.NM.K("mouseout", this.WM, !0), this.NM.K("mouseover", this.YM, !0), this.NM.K("touchstart", this.ZM, !0), this.NM.K("touchend", this._M, !0), this.NM.K("touchmove", this.bN, !0), this.NM = null, window.K("mouseup", this.QM, !0), this.PM = !1)
            }, e.prototype.Mt = function(t) {
                if (this.nN += t, !(this.nN < this.JM) && (this.nN = 0, this.NM)) {
                    if (this.oN) return void(this.oN = !1);
                    this.pN = this.dN, this.qN(this.KM.global, this.Ft.Ut, this.XM, !0), this.eN !== this.pN && (this.eN = this.pN, this.NM.T.pN = this.pN)
                }
            }, e.prototype.nu = function(t, i, n) {
                n.LM || (n.zd = t, n.z = i, t.Ll(i, n), t[i] && t[i](n))
            }, e.prototype.rN = function(t, i, n) {
                var e;
                e = this.NM.sN ? this.NM.Oa() : {
                    g: 0,
                    h: 0,
                    Ka: 0,
                    Ua: 0
                }, t.g = (i - e.xh) * (this.NM.Ka / e.Ka) / this.tv, t.h = (n - e.Rc) * (this.NM.Ua / e.Ua) / this.tv
            }, e.prototype.qN = function(t, i, n, e, r) {
                if (!i || !i.zj) return !1;
                var o = !1,
                    s = r = i.Qt || r;
                if (i.Yt && (s = !1), e && i.Iw && (i.Iw.Vy(t) || (e = !1)), e && i.Zw && (i.Zw.na(t.g, t.h) || (e = !1)), i.qx)
                    for (var h = i.he, a = h.length - 1; a >= 0; a--) {
                        var u = h[a];
                        if (this.qN(t, u, n, e, s)) {
                            if (!u.Kd) continue;
                            o = !0, s = !1, e = !1
                        }
                    }
                return r && (e && !o && (i.Yt ? (i.Zt.mx(t, this.fN), o = i.Yt.na(this.fN.g, this.fN.h)) : i.Vy && (o = i.Vy(t))), i.Qt && n(i, o)), o
            }, e.prototype.SM = function(t) {
                this.KM.Rf = t, this.ou.Wb = this.KM, this.ou.LM = !1, this.rN(this.KM.global, t.vg, t.wg), this.IM && this.KM.Rf.Lf(), this.qN(this.KM.global, this.Ft.Ut, this.TM, !0);
                var i = 2 === t.Md || 3 === t.Gg;
                this.Ll(i ? "rightdown" : "mousedown", this.ou)
            }, e.prototype.TM = function(t, i) {
                var n = this.KM.Rf,
                    e = 2 === n.Md || 3 === n.Gg;
                i && (t[e ? "tN" : "uN"] = !0, this.nu(t, e ? "rightdown" : "mousedown", this.ou))
            }, e.prototype.QM = function(t) {
                this.KM.Rf = t, this.ou.Wb = this.KM, this.ou.LM = !1, this.rN(this.KM.global, t.vg, t.wg), this.qN(this.KM.global, this.Ft.Ut, this.RM, !0);
                var i = 2 === t.Md || 3 === t.Gg;
                this.Ll(i ? "rightup" : "mouseup", this.ou)
            }, e.prototype.RM = function(t, i) {
                var n = this.KM.Rf,
                    e = 2 === n.Md || 3 === n.Gg,
                    r = e ? "_isRightDown" : "_isLeftDown";
                i ? (this.nu(t, e ? "rightup" : "mouseup", this.ou), t[r] && (t[r] = !1, this.nu(t, e ? "rightclick" : "click", this.ou))) : t[r] && (t[r] = !1, this.nu(t, e ? "rightupoutside" : "mouseupoutside", this.ou))
            }, e.prototype.UM = function(t) {
                this.KM.Rf = t, this.ou.Wb = this.KM, this.ou.LM = !1, this.rN(this.KM.global, t.vg, t.wg), this.oN = !0, this.pN = this.dN, this.qN(this.KM.global, this.Ft.Ut, this.VM, !0), this.Ll("mousemove", this.ou), this.eN !== this.pN && (this.eN = this.pN, this.NM.T.pN = this.pN)
            }, e.prototype.VM = function(t, i) {
                this.XM(t, i), this.OM && !i || this.nu(t, "mousemove", this.ou)
            }, e.prototype.WM = function(t) {
                this.KM.Rf = t, this.ou.Wb = this.KM, this.ou.LM = !1, this.rN(this.KM.global, t.vg, t.wg), this.NM.T.pN = this.dN, this.rN(this.KM.global, t.vg, t.wg), this.qN(this.KM.global, this.Ft.Ut, this.XM, !1), this.Ll("mouseout", this.ou)
            }, e.prototype.XM = function(t, i) {
                i ? (t.vN || (t.vN = !0, this.nu(t, "mouseover", this.ou)), t.wN && (this.pN = t.xN)) : t.vN && (t.vN = !1, this.nu(t, "mouseout", this.ou))
            }, e.prototype.YM = function(t) {
                this.KM.Rf = t, this.ou.Wb = this.KM, this.ou.LM = !1, this.Ll("mouseover", this.ou)
            }, e.prototype.ZM = function(t) {
                this.IM && t.Lf();
                for (var i = t.hg, n = i.length, e = 0; e < n; e++) {
                    var r = i[e],
                        o = this.yN(r);
                    o.Rf = t, this.ou.Wb = o, this.ou.LM = !1, this.qN(o.global, this.Ft.Ut, this.$M, !0), this.Ll("touchstart", this.ou), this.zN(o)
                }
            }, e.prototype.$M = function(t, i) {
                i && (t.AN = !0, this.nu(t, "touchstart", this.ou))
            }, e.prototype._M = function(t) {
                this.IM && t.Lf();
                for (var i = t.hg, n = i.length, e = 0; e < n; e++) {
                    var r = i[e],
                        o = this.yN(r);
                    o.Rf = t, this.ou.Wb = o, this.ou.LM = !1, this.qN(o.global, this.Ft.Ut, this.aN, !0), this.Ll("touchend", this.ou), this.zN(o)
                }
            }, e.prototype.aN = function(t, i) {
                i ? (this.nu(t, "touchend", this.ou), t.AN && (t.AN = !1, this.nu(t, "tap", this.ou))) : t.AN && (t.AN = !1, this.nu(t, "touchendoutside", this.ou))
            }, e.prototype.bN = function(t) {
                this.IM && t.Lf();
                for (var i = t.hg, n = i.length, e = 0; e < n; e++) {
                    var r = i[e],
                        o = this.yN(r);
                    o.Rf = t, this.ou.Wb = o, this.ou.LM = !1, this.qN(o.global, this.Ft.Ut, this.cN, this.OM), this.Ll("touchmove", this.ou), this.zN(o)
                }
            }, e.prototype.cN = function(t, i) {
                this.OM && !i || this.nu(t, "touchmove", this.ou)
            }, e.prototype.yN = function(t) {
                var i = this.MM.pop();
                return i || (i = new o), i.BN = t.BN, this.rN(i.global, t.vg, t.wg), navigator.bs && (i.global.g = i.global.g / this.tv, i.global.h = i.global.h / this.tv), t.CN = i.global.g, t.DN = i.global.h, i
            }, e.prototype.zN = function(t) {
                this.MM.push(t)
            }, e.prototype.Ym = function() {
                this.hN(), this.Nl(), this.Ft = null, this.KM = null, this.ou = null, this.MM = null, this.NM = null, this.QM = null, this.RM = null, this.SM = null, this.TM = null, this.UM = null, this.VM = null, this.WM = null, this.XM = null, this.YM = null, this.ZM = null, this.$M = null, this._M = null, this.aN = null, this.bN = null, this.cN = null, this.fN = null
            }, r.qu.pu("interaction", e), r.ru.pu("interaction", e)
        }, {
            su: 97,
            EN: 178,
            FN: 181,
            nr: 16
        }],
        180: [function(t, i, n) {
            i.r = {
                GN: t("./InteractionData"),
                HN: t("./InteractionManager"),
                IN: t("./interactiveTarget")
            }
        }, {
            EN: 178,
            JN: 179,
            FN: 181
        }],
        181: [function(t, i, n) {
            var e = {
                Qt: !1,
                qx: !0,
                Yt: null,
                wN: !1,
                xN: "pointer",
                vN: !1,
                uN: !1,
                tN: !1,
                AN: !1
            };
            i.r = e
        }, {}],
        182: [function(t, i, n) {
            function e(t, i) {
                var n = {},
                    e = t.Wb.aa("info")[0],
                    r = t.Wb.aa("common")[0];
                n.gH = e.O("face"), n.Ho = parseInt(e.O("size"), 10), n.ph = parseInt(r.O("lineHeight"), 10), n.tK = {};
                for (var h = t.Wb.aa("char"), a = 0; a < h.length; a++) {
                    var u = parseInt(h[a].O("id"), 10),
                        c = new o.Yv(parseInt(h[a].O("x"), 10) + i.zD.g, parseInt(h[a].O("y"), 10) + i.zD.h, parseInt(h[a].O("width"), 10), parseInt(h[a].O("height"), 10));
                    n.tK[u] = {
                        wK: parseInt(h[a].O("xoffset"), 10),
                        xK: parseInt(h[a].O("yoffset"), 10),
                        yK: parseInt(h[a].O("xadvance"), 10),
                        uK: {},
                        bn: new o.sA(i._y, c)
                    }
                }
                var f = t.Wb.aa("kerning");
                for (a = 0; a < f.length; a++) {
                    var l = parseInt(f[a].O("first"), 10),
                        p = parseInt(f[a].O("second"), 10),
                        v = parseInt(f[a].O("amount"), 10);
                    n.tK[p] && (n.tK[p].uK[l] = v)
                }
                t.KN = n, s.NJ.sK[n.gH] = n
            }
            var r = t("resource-loader").Ps,
                o = t("../core"),
                s = t("../extras"),
                h = t("path");
            i.r = function() {
                return function(t, i) {
                    if (!t.Wb || !t.vr) return i();
                    if (0 === t.Wb.aa("page").length || 0 === t.Wb.aa("info").length || null === t.Wb.aa("info")[0].O("face")) return i();
                    var n = t.or ? "" : h.Im(t.Ki);
                    t.or && ("." === n && (n = ""), this.Oq && n && ("/" === this.Oq.charAt(this.Oq.length - 1) && (n += "/"), n = n.replace(this.Oq, ""))), n && "/" !== n.charAt(n.length - 1) && (n += "/");
                    var s = n + t.Wb.aa("page")[0].O("file");
                    if (o.Wt.WF[s]) e(t, o.Wt.WF[s]), i();
                    else {
                        var a = {
                            pr: t.pr,
                            qr: r.ir.Rr,
                            tr: t.tr.LN
                        };
                        this.ra(t.name + "_image", s, a, function(n) {
                            e(t, n.bn), i()
                        })
                    }
                }
            }
        }, {
            su: 97,
            MN: 164,
            ft: 44,
            NN: 69
        }],
        183: [function(t, i, n) {
            i.r = {
                ON: t("./loader"),
                PN: t("./bitmapFontParser"),
                QN: t("./spritesheetParser"),
                RN: t("./textureParser"),
                Ps: t("resource-loader").Ps
            }
        }, {
            SN: 182,
            TN: 184,
            UN: 185,
            VN: 186,
            NN: 69
        }],
        184: [function(t, i, n) {
            function e(t, i) {
                r.call(this, t, i);
                for (var n = 0; n < e.WN.length; ++n) this.br(e.WN[n]())
            }
            var r = t("resource-loader"),
                o = t("./textureParser"),
                s = t("./spritesheetParser"),
                h = t("./bitmapFontParser");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, e.WN = [r.Qs.Ss.Ts, o, s, h], e.XN = function(t) {
                e.WN.push(t)
            };
            var a = r.Ps;
            a.Ms("fnt", a.jr.fs)
        }, {
            SN: 182,
            UN: 185,
            VN: 186,
            NN: 69
        }],
        185: [function(t, i, n) {
            var e = t("resource-loader").Ps,
                r = t("path"),
                o = t("../core"),
                s = 1e3;
            i.r = function() {
                return function(t, i) {
                    var n, h = t.name + "_image";
                    if (!t.Wb || !t.ur || !t.Wb.YN || this.Yq[h]) return i();
                    var a = {
                        pr: t.pr,
                        qr: e.ir.Rr,
                        tr: t.tr.LN
                    };
                    n = t.or ? t.Wb.ZN.Wd : r.Im(t.Ki.replace(this.Oq, "")) + "/" + t.Wb.ZN.Wd, this.ra(h, n, a, function(n) {
                        function e(i, e) {
                            for (var r = i; r - i < e && r < c.length;) {
                                var s = c[r],
                                    h = u[s].zD;
                                if (h) {
                                    var a = null,
                                        l = null,
                                        p = new o.Yv(0, 0, u[s]._N.$N / f, u[s]._N.aO / f);
                                    a = u[s].bO ? new o.Yv(h.g / f, h.h / f, h.aO / f, h.$N / f) : new o.Yv(h.g / f, h.h / f, h.$N / f, h.aO / f), u[s].cO && (l = new o.Yv(u[s].dO.g / f, u[s].dO.h / f, u[s].dO.$N / f, u[s].dO.aO / f)), t.wG[s] = new o.sA(n.bn._y, a, p, l, u[s].bO ? 2 : 0), o.Wt.WF[s] = t.wG[s]
                                }
                                r++
                            }
                        }

                        function r() {
                            return l * s < c.length
                        }

                        function h(t) {
                            e(l * s, s), l++, setTimeout(t, 0)
                        }

                        function a() {
                            h(function() {
                                r() ? a() : i()
                            })
                        }
                        t.wG = {};
                        var u = t.Wb.YN,
                            c = Object.keys(u),
                            f = o.Wt.sI(t.Ki),
                            l = 0;
                        c.length <= s ? (e(0, s), i()) : a()
                    })
                }
            }
        }, {
            su: 97,
            ft: 44,
            NN: 69
        }],
        186: [function(t, i, n) {
            var e = t("../core");
            i.r = function() {
                return function(t, i) {
                    if (t.Wb && t.wr) {
                        var n = new e.tA(t.Wb, null, e.Wt.sI(t.Ki));
                        n.jI = t.Ki, t.bn = new e.sA(n), e.Wt.oI[t.Ki] = n, e.Wt.WF[t.Ki] = t.bn
                    }
                    i()
                }
            }
        }, {
            su: 97
        }],
        187: [function(t, i, n) {
            function e(t, i, n, o, s) {
                r.eA.call(this), this.IC = null, this.sF = n || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.Fl = i || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]), this.Iz = o || new Uint16Array([0, 1, 3, 2]), this.Co = 0, this.eO = 0, this.Xx = r.Ku.Lu, this.fO = 0, this.gO = s || e.av.hO, this.bn = t, this.b = null, this.iO = new Float32Array([1, 1, 1]), this.RK = []
            }
            var r = t("../core"),
                o = t("pixi-gl-core"),
                s = t("./webgl/MeshShader"),
                h = new r.vx,
                a = new r.ny;
            e.prototype = Object.create(r.eA.prototype), e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                bn: {
                    _: function() {
                        return this.IC
                    },
                    P: function(t) {
                        this.IC !== t && (this.IC = t, t && (t._y.aD ? this.PF() : t.ve("update", this.PF, this)))
                    }
                },
                Vx: {
                    _: function() {
                        return r.Wt.Sy(this.iO)
                    },
                    P: function(t) {
                        this.iO = r.Wt.Ry(t, this.iO)
                    }
                }
            }), e.prototype.Lw = function(t) {
                t.Mw();
                var i = t.Lm,
                    n = this.RK[t.Cz];
                n || (n = {
                    b: new s(i),
                    uF: o.Uo.Vm(i, this.Fl, i.IG),
                    jO: o.Uo.Vm(i, this.sF, i.IG),
                    Bo: o.Uo.Wm(i, this.Iz, i.Pm),
                    Hz: new o.Yo(i),
                    Co: this.Co,
                    eO: this.eO
                }, n.Hz = new o.Yo(i).Lo(n.Bo).Ko(n.uF, n.b.Uc.Xz, i.Vn, !1, 8, 0).Ko(n.jO, n.b.Uc.vF, i.Vn, !1, 8, 0), this.RK[t.Cz] = n), this.Co !== n.Co && (n.Co = this.Co, n.jO.Qm()), this.eO !== n.eO && (n.eO = this.eO, n.Bo.Qm()), n.uF.Qm(), t.Fz(n.b), t.Yn(this.IC, 0), t.Ub.pz(this.Xx), n.b.Dn.Gz = this.Zt.$b(!0), n.b.Dn.Aw = this.zw, n.b.Dn.Vx = this.iO;
                var r = this.gO === e.av.hO ? i.gv : i.fv;
                n.Hz.bind().Mo(r, this.Iz.length).mk()
            }, e.prototype.Vw = function(t) {
                var i = t.Xi,
                    n = this.Zt,
                    r = t.tv;
                t.Av ? i.ox(n._t * r, n.ew * r, n.fw * r, n.bu * r, n.$t * r | 0, n.au * r | 0) : i.ox(n._t * r, n.ew * r, n.fw * r, n.bu * r, n.$t * r, n.au * r), this.gO === e.av.hO ? this.kO(i) : this.lO(i)
            }, e.prototype.kO = function(t) {
                for (var i = this.Fl, n = this.sF, e = i.length / 2, r = 0; r < e - 2; r++) {
                    var o = 2 * r;
                    this.mO(t, i, n, o, o + 2, o + 4)
                }
            }, e.prototype.lO = function(t) {
                for (var i = this.Fl, n = this.sF, e = this.Iz, r = e.length, o = 0; o < r; o += 3) {
                    var s = 2 * e[o],
                        h = 2 * e[o + 1],
                        a = 2 * e[o + 2];
                    this.mO(t, i, n, s, h, a)
                }
            }, e.prototype.mO = function(t, i, n, e, r, o) {
                var s = this.IC._y,
                    h = s.source,
                    a = s.Ka,
                    u = s.Ua,
                    c = i[e],
                    f = i[r],
                    l = i[o],
                    p = i[e + 1],
                    v = i[r + 1],
                    y = i[o + 1],
                    d = n[e] * s.Ka,
                    g = n[r] * s.Ka,
                    m = n[o] * s.Ka,
                    b = n[e + 1] * s.Ua,
                    w = n[r + 1] * s.Ua,
                    x = n[o + 1] * s.Ua;
                if (this.fO > 0) {
                    var C = this.fO / this.Zt._t,
                        M = this.fO / this.Zt.bu,
                        F = (c + f + l) / 3,
                        z = (p + v + y) / 3,
                        I = c - F,
                        j = p - z,
                        T = Math.sqrt(I * I + j * j);
                    c = F + I / T * (T + C), p = z + j / T * (T + M), I = f - F, j = v - z, T = Math.sqrt(I * I + j * j), f = F + I / T * (T + C), v = z + j / T * (T + M), I = l - F, j = y - z, T = Math.sqrt(I * I + j * j), l = F + I / T * (T + C), y = z + j / T * (T + M)
                }
                t.HC(), t.qz(), t.qy(c, p), t.ry(f, v), t.ry(l, y), t.az(), t.KC();
                var K = d * w + b * m + g * x - w * m - b * g - d * x,
                    U = c * w + b * l + f * x - w * l - b * f - c * x,
                    O = d * f + c * m + g * l - f * m - c * g - d * l,
                    W = d * w * l + b * f * m + c * g * x - c * w * m - b * g * l - d * f * x,
                    _ = p * w + b * y + v * x - w * y - b * v - p * x,
                    A = d * v + p * m + g * y - v * m - p * g - d * y,
                    D = d * w * y + b * v * m + p * g * x - p * w * m - b * g * y - d * v * x;
                t.pw(U / K, _ / K, O / K, A / K, W / K, D / K), t.MC(h, 0, 0, a * s.tv, u * s.tv, 0, 0, a, u), t.LC()
            }, e.prototype.nO = function(t) {
                var i = this.Xi,
                    n = t.Fl,
                    e = n.length / 2;
                i.qz();
                for (var r = 1; r < e - 2; r++) {
                    var o = 2 * r,
                        s = n[o],
                        h = n[o + 2],
                        a = n[o + 4],
                        u = n[o + 1],
                        c = n[o + 3],
                        f = n[o + 5];
                    i.qy(s, u), i.ry(h, c), i.ry(a, f)
                }
                i.tz = "#FF0000", i.zy(), i.az()
            }, e.prototype.PF = function() {}, e.prototype.Ew = function() {
                this.Dw.gw(this.pw, this.Fl, 0, this.Fl.length)
            }, e.prototype.Vy = function(t) {
                if (!this.cu().na(t.g, t.h)) return !1;
                this.Zt.mx(t, h);
                for (var i = this.Fl, n = a.ly, r = this.Iz, o = this.Iz.length, s = this.gO === e.av.fv ? 3 : 1, u = 0; u + 2 < o; u += s) {
                    var c = 2 * r[u],
                        f = 2 * r[u + 1],
                        l = 2 * r[u + 2];
                    if (n[0] = i[c], n[1] = i[c + 1], n[2] = i[f], n[3] = i[f + 1], n[4] = i[l], n[5] = i[l + 1], a.na(h.g, h.h)) return !0
                }
                return !1
            }, e.av = {
                hO: 0,
                fv: 1
            }
        }, {
            su: 97,
            oO: 192,
            Au: 51
        }],
        188: [function(t, i, n) {
            function e(t, i, n, e, s) {
                o.call(this, t, 4, 4);
                var h = this.sF;
                h[6] = h[14] = h[22] = h[30] = 1, h[25] = h[27] = h[29] = h[31] = 1, this.pO = t.Ka, this.qO = t.Ua, this.rO = 1 / this.pO, this.sO = 1 / this.qO, this.Ka = t.Ka, this.Ua = t.Ua, h[2] = h[10] = h[18] = h[26] = this.rO * i, h[4] = h[12] = h[20] = h[28] = 1 - this.rO * e, h[9] = h[11] = h[13] = h[15] = this.sO * n, h[17] = h[19] = h[21] = h[23] = 1 - this.sO * s, this.tO = "undefined" != typeof i ? i : r, this.uO = "undefined" != typeof e ? e : r, this.vO = "undefined" != typeof n ? n : r, this.wO = "undefined" != typeof s ? s : r
            }
            var r = 10,
                o = t("./Plane");
            e.prototype = Object.create(o.prototype), e.prototype.constructor = e, i.r = e, Object.defineProperties(e.prototype, {
                Ka: {
                    _: function() {
                        return this.lw
                    },
                    P: function(t) {
                        this.lw = t, this.xO()
                    }
                },
                Ua: {
                    _: function() {
                        return this.mw
                    },
                    P: function(t) {
                        this.mw = t, this.yO()
                    }
                },
                tO: {
                    _: function() {
                        return this.zO
                    },
                    P: function(t) {
                        this.zO = t;
                        var i = this.sF,
                            n = this.Fl;
                        i[2] = i[10] = i[18] = i[26] = this.rO * t, n[2] = n[10] = n[18] = n[26] = t, this.Co = !0
                    }
                },
                uO: {
                    _: function() {
                        return this.AO
                    },
                    P: function(t) {
                        this.AO = t;
                        var i = this.sF,
                            n = this.Fl;
                        i[4] = i[12] = i[20] = i[28] = 1 - this.rO * t, n[4] = n[12] = n[20] = n[28] = this.lw - t, this.Co = !0
                    }
                },
                vO: {
                    _: function() {
                        return this.BO
                    },
                    P: function(t) {
                        this.BO = t;
                        var i = this.sF,
                            n = this.Fl;
                        i[9] = i[11] = i[13] = i[15] = this.sO * t, n[9] = n[11] = n[13] = n[15] = t, this.Co = !0
                    }
                },
                wO: {
                    _: function() {
                        return this.CO
                    },
                    P: function(t) {
                        this.CO = t;
                        var i = this.sF,
                            n = this.Fl;
                        i[17] = i[19] = i[21] = i[23] = 1 - this.sO * t, n[17] = n[19] = n[21] = n[23] = this.mw - t, this.Co = !0
                    }
                }
            }), e.prototype.yO = function() {
                var t = this.Fl;
                t[9] = t[11] = t[13] = t[15] = this.BO, t[17] = t[19] = t[21] = t[23] = this.mw - this.CO, t[25] = t[27] = t[29] = t[31] = this.mw
            }, e.prototype.xO = function() {
                var t = this.Fl;
                t[2] = t[10] = t[18] = t[26] = this.zO, t[4] = t[12] = t[20] = t[28] = this.lw - this.AO, t[6] = t[14] = t[22] = t[30] = this.lw
            }, e.prototype.Vw = function(t) {
                var i = t.Xi;
                i.sz = this.zw;
                var n = this.Zt,
                    e = t.tv;
                t.Av ? i.ox(n._t * e, n.ew * e, n.fw * e, n.bu * e, n.$t * e | 0, n.au * e | 0) : i.ox(n._t * e, n.ew * e, n.fw * e, n.bu * e, n.$t * e, n.au * e);
                var r = this.IC._y,
                    o = r.source,
                    s = r.Ka,
                    h = r.Ua;
                this.DO(i, o, s, h, 0, 1, 10, 11), this.DO(i, o, s, h, 2, 3, 12, 13), this.DO(i, o, s, h, 4, 5, 14, 15), this.DO(i, o, s, h, 8, 9, 18, 19), this.DO(i, o, s, h, 10, 11, 20, 21), this.DO(i, o, s, h, 12, 13, 22, 23), this.DO(i, o, s, h, 16, 17, 26, 27), this.DO(i, o, s, h, 18, 19, 28, 29), this.DO(i, o, s, h, 20, 21, 30, 31)
            }, e.prototype.DO = function(t, i, n, e, r, o, s, h) {
                var a = this.sF,
                    u = this.Fl,
                    c = (a[s] - a[r]) * n,
                    f = (a[h] - a[o]) * e,
                    l = u[s] - u[r],
                    p = u[h] - u[o];
                c < 1 && (c = 1), f < 1 && (f = 1), l < 1 && (l = 1), p < 1 && (p = 1), t.MC(i, a[r] * n, a[o] * e, c, f, u[r], u[o], l, p)
            }
        }, {
            EO: 189
        }],
        189: [function(t, i, n) {
            function e(t, i, n) {
                r.call(this, t), this.FO = !0, this.GO = i || 10, this.HO = n || 10, this.gO = r.av.fv, this.nC()
            }
            var r = t("./Mesh");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, e.prototype.nC = function() {
                var t = this.GO * this.HO,
                    i = [],
                    n = [],
                    e = [],
                    r = [],
                    o = this.bn,
                    s = this.GO - 1,
                    h = this.HO - 1,
                    a = 0,
                    u = o.Ka / s,
                    c = o.Ua / h;
                for (a = 0; a < t; a++) {
                    var f = a % this.GO,
                        l = a / this.GO | 0;
                    i.push(f * u, l * c), e.push(o.LG.KI + (o.LG.MI - o.LG.KI) * (f / (this.GO - 1)), o.LG.LI + (o.LG.SI - o.LG.LI) * (l / (this.HO - 1)))
                }
                var p = s * h;
                for (a = 0; a < p; a++) {
                    var v = a % s,
                        y = a / s | 0,
                        d = y * this.GO + v,
                        g = y * this.GO + v + 1,
                        m = (y + 1) * this.GO + v,
                        b = (y + 1) * this.GO + v + 1;
                    r.push(d, g, m), r.push(g, b, m)
                }
                this.Fl = new Float32Array(i), this.sF = new Float32Array(e), this.pG = new Float32Array(n), this.Iz = new Uint16Array(r), this.eO = !0
            }, e.prototype.PF = function() {
                r.prototype.PF.call(this), this.FO && this.nC()
            }
        }, {
            IO: 187
        }],
        190: [function(t, i, n) {
            function e(t, i) {
                r.call(this, t), this.ly = i, this.Fl = new Float32Array(4 * i.length), this.sF = new Float32Array(4 * i.length), this.pG = new Float32Array(2 * i.length), this.Iz = new Uint16Array(2 * i.length), this.FO = !0, this.nC()
            }
            var r = t("./Mesh"),
                o = t("../core");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e, e.prototype.nC = function() {
                var t = this.ly;
                if (!(t.length < 1) && this.IC.LG) {
                    var i = this.sF,
                        n = this.Iz,
                        e = this.pG,
                        r = this.IC.LG,
                        s = new o.vx(r.KI, r.LI),
                        h = new o.vx(r.OI - r.KI, r.QI - r.LI);
                    i[0] = 0 + s.g, i[1] = 0 + s.h, i[2] = 0 + s.g, i[3] = 1 * h.h + s.h, e[0] = 1, e[1] = 1, n[0] = 0, n[1] = 1;
                    for (var a, u, c, f = t.length, l = 1; l < f; l++) a = t[l], u = 4 * l, c = l / (f - 1), i[u] = c * h.g + s.g, i[u + 1] = 0 + s.h, i[u + 2] = c * h.g + s.g, i[u + 3] = 1 * h.h + s.h, u = 2 * l, e[u] = 1, e[u + 1] = 1, u = 2 * l, n[u] = u, n[u + 1] = u + 1;
                    this.Co = !0, this.eO = !0
                }
            }, e.prototype.PF = function() {
                r.prototype.PF.call(this), this.FO && this.nC()
            }, e.prototype.xw = function() {
                var t = this.ly;
                if (!(t.length < 1)) {
                    for (var i, n, e, r, o, s, h = t[0], a = 0, u = 0, c = this.Fl, f = t.length, l = 0; l < f; l++) n = t[l], e = 4 * l, i = l < t.length - 1 ? t[l + 1] : n, u = -(i.g - h.g), a = i.h - h.h, r = 10 * (1 - l / (f - 1)), r > 1 && (r = 1), o = Math.sqrt(a * a + u * u), s = this.IC.Ua / 2, a /= o, u /= o, a *= s, u *= s, c[e] = n.g + a, c[e + 1] = n.h + u, c[e + 2] = n.g - a, c[e + 3] = n.h - u, h = n;
                    this.Bw()
                }
            }
        }, {
            su: 97,
            IO: 187
        }],
        191: [function(t, i, n) {
            i.r = {
                IJ: t("./Mesh"),
                JO: t("./Plane"),
                KO: t("./NineSlicePlane"),
                JJ: t("./Rope"),
                LO: t("./webgl/MeshShader")
            }
        }, {
            IO: 187,
            MO: 188,
            EO: 189,
            NO: 190,
            oO: 192
        }],
        192: [function(t, i, n) {
            function e(t) {
                r.call(this, t, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "}"].join("\n"), ["varying vec2 vTextureCoord;", "uniform float alpha;", "uniform vec3 tint;", "uniform sampler2D uSampler;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vec4(tint * alpha, alpha);", "}"].join("\n"));
            }
            var r = t("../../core/Shader");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e
        }, {
            CL: 77
        }],
        193: [function(t, i, n) {
            function e(t, i, n) {
                r.eA.call(this), n = n || 15e3, t = t || 15e3;
                var e = 16384;
                n > e && (n = e), n > t && (n = t), this.OO = [!1, !0, !1, !1, !1], this.PO = t, this.QO = n, this.RO = [], this.SO = 0, this.qx = !1, this.Xx = r.Ku.Lu, this.Av = !0, this._y = null, this.TO(i)
            }
            var r = t("../core");
            e.prototype = Object.create(r.eA.prototype), e.prototype.constructor = e, i.r = e, e.prototype.TO = function(t) {
                t && (this.OO[0] = "scale" in t ? !!t.jw : this.OO[0], this.OO[1] = "position" in t ? !!t.gh : this.OO[1], this.OO[2] = "rotation" in t ? !!t.ex : this.OO[2], this.OO[3] = "uvs" in t ? !!t.sF : this.OO[3], this.OO[4] = "alpha" in t ? !!t.Aw : this.OO[4])
            }, e.prototype.xw = function() {
                this.hx()
            }, e.prototype.Gw = function(t) {
                this.zj && !(this.zw <= 0) && this.he.length && this.Hw && (this._y || (this._y = this.he[0].IC._y, this._y.aD || this._y.ve("update", function() {
                    this.nw(0)
                }, this)), t.Ly(t.mu.UO), t.mu.UO.Ny(this))
            }, e.prototype.nw = function(t) {
                var i = Math.floor(t / this.QO);
                i < this.SO && (this.SO = i)
            }, e.prototype.Ww = function(t) {
                if (this.zj && !(this.zw <= 0) && this.he.length && this.Hw) {
                    var i = t.Xi,
                        n = this.Zt,
                        e = !0,
                        r = 0,
                        o = 0,
                        s = 0,
                        h = 0,
                        a = t.eC[this.Xx];
                    a !== i.zC && (i.zC = a), i.sz = this.zw, this.hx();
                    for (var u = 0; u < this.he.length; ++u) {
                        var c = this.he[u];
                        if (c.zj) {
                            var f = c.bn.zD;
                            if (i.sz = this.zw * c.Aw, c.ex % (2 * Math.PI) === 0) e && (i.ox(n._t, n.ew, n.fw, n.bu, n.$t * t.tv, n.au * t.tv), e = !1), r = c.anchor.g * (-f.Ka * c.jw.g) + c.gh.g + .5, o = c.anchor.h * (-f.Ua * c.jw.h) + c.gh.h + .5, s = f.Ka * c.jw.g, h = f.Ua * c.jw.h;
                            else {
                                e || (e = !0), c.hx();
                                var l = c.Zt;
                                t.Av ? i.ox(l._t, l.ew, l.fw, l.bu, l.$t * t.tv | 0, l.au * t.tv | 0) : i.ox(l._t, l.ew, l.fw, l.bu, l.$t * t.tv, l.au * t.tv), r = c.anchor.g * -f.Ka + .5, o = c.anchor.h * -f.Ua + .5, s = f.Ka, h = f.Ua
                            }
                            var p = c.bn._y.tv;
                            i.MC(c.bn._y.source, f.g * p, f.h * p, f.Ka * p, f.Ua * p, r * p, o * p, s * p, h * p)
                        }
                    }
                }
            }, e.prototype.Ym = function() {
                if (r.eA.prototype.Ym.apply(this, arguments), this.VO)
                    for (var t = 0; t < this.VO.length; ++t) this.VO[t].Ym();
                this.OO = null, this.VO = null
            }
        }, {
            su: 97
        }],
        194: [function(t, i, n) {
            i.r = {
                KJ: t("./ParticleContainer"),
                WO: t("./webgl/ParticleRenderer")
            }
        }, {
            XO: 193,
            YO: 196
        }],
        195: [function(t, i, n) {
            function e(t, i, n, e) {
                this.Lm = t, this.qG = 2, this.rG = 4 * this.qG, this.Ho = e, this.ZO = [], this.$O = [];
                for (var r = 0; r < i.length; r++) {
                    var o = i[r];
                    o = {
                        Go: o.Go,
                        Ho: o.Ho,
                        _O: o._O,
                        _j: o._j
                    }, n[r] ? this.ZO.push(o) : this.$O.push(o)
                }
                this.aP = 0, this.bP = null, this.cP = null, this.dP = 0, this.eP = null, this.fP = null, this.gP()
            }
            var r = t("pixi-gl-core"),
                o = t("../../core/utils/createIndicesForQuads");
            e.prototype.constructor = e, i.r = e, e.prototype.gP = function() {
                var t, i, n = this.Lm,
                    e = 0;
                for (this.Iz = o(this.Ho), this.Bo = r.Uo.Wm(n, this.Iz, n.Pm), this.dP = 0, t = 0; t < this.ZO.length; t++) i = this.ZO[t], i._j = e, e += i.Ho, this.dP += i.Ho;
                this.fP = new Float32Array(this.Ho * this.dP * 4), this.eP = r.Uo.Vm(n, this.fP, n.IG);
                var s = 0;
                for (this.aP = 0, t = 0; t < this.$O.length; t++) i = this.$O[t], i._j = s, s += i.Ho, this.aP += i.Ho;
                for (this.cP = new Float32Array(this.Ho * this.aP * 4), this.bP = r.Uo.Vm(n, this.cP, n.Pm), this.Hz = new r.Yo(n).Lo(this.Bo), t = 0; t < this.ZO.length; t++) i = this.ZO[t], this.Hz.Ko(this.eP, i.Go, n.Vn, !1, 4 * this.dP, 4 * i._j);
                for (t = 0; t < this.$O.length; t++) i = this.$O[t], this.Hz.Ko(this.bP, i.Go, n.Vn, !1, 4 * this.aP, 4 * i._j)
            }, e.prototype.hP = function(t, i, n) {
                for (var e = 0; e < this.ZO.length; e++) {
                    var r = this.ZO[e];
                    r._O(t, i, n, this.fP, this.dP, r._j)
                }
                this.eP.Qm()
            }, e.prototype.iP = function(t, i, n) {
                for (var e = 0; e < this.$O.length; e++) {
                    var r = this.$O[e];
                    r._O(t, i, n, this.cP, this.aP, r._j)
                }
                this.bP.Qm()
            }, e.prototype.bind = function() {
                this.Hz.bind()
            }, e.prototype.Ym = function() {
                this.ZO = null, this.fP = null, this.eP.Ym(), this.$O = null, this.cP = null, this.bP.Ym()
            }
        }, {
            jP: 149,
            Au: 51
        }],
        196: [function(t, i, n) {
            function e(t) {
                r.BA.call(this, t), this.b = null, this.Bo = null, this.kP = null, this.lP = new r.Jx, this.Cz = 0
            }
            var r = t("../../core"),
                o = t("./ParticleShader"),
                s = t("./ParticleBuffer");
            e.prototype = Object.create(r.BA.prototype), e.prototype.constructor = e, i.r = e, r.qu.pu("particle", e), e.prototype.Dz = function() {
                var t = this.Ft.Lm;
                this.Cz = this.Ft.Cz, this.b = new o(t), this.kP = [{
                    Go: this.b.Uc.Xz,
                    Ho: 2,
                    _O: this.mP,
                    _j: 0
                }, {
                    Go: this.b.Uc.nP,
                    Ho: 2,
                    _O: this.oP,
                    _j: 0
                }, {
                    Go: this.b.Uc.pP,
                    Ho: 1,
                    _O: this.qP,
                    _j: 0
                }, {
                    Go: this.b.Uc.vF,
                    Ho: 2,
                    _O: this.rP,
                    _j: 0
                }, {
                    Go: this.b.Uc.Yz,
                    Ho: 1,
                    _O: this.sP,
                    _j: 0
                }]
            }, e.prototype.V = function() {
                this.Ft.Fz(this.b)
            }, e.prototype.Ny = function(t) {
                var i = t.he,
                    n = i.length,
                    e = t.PO,
                    r = t.QO;
                if (0 !== n) {
                    n > e && (n = e);
                    var o = t.RO[this.Ft.Cz];
                    o || (o = t.RO[this.Ft.Cz] = this.tP(t)), this.Ft.pz(t.Xx);
                    var s = this.Ft.Lm,
                        h = t.Zt.bx(this.lP);
                    h.Pg(this.Ft.Oy.wD), this.b.Dn.wD = h.$b(!0), this.b.Dn.uP = t.zw;
                    var a = i[0].IC._y;
                    this.Ft.Yn(a);
                    for (var u = 0, c = 0; u < n; u += r, c += 1) {
                        var f = n - u;
                        f > r && (f = r);
                        var l = o[c];
                        l.hP(i, u, f), t.SO === c && (l.iP(i, u, f), t.SO = c + 1), l.Hz.bind().Mo(s.fv, 6 * f).mk()
                    }
                }
            }, e.prototype.tP = function(t) {
                var i, n = this.Ft.Lm,
                    e = [],
                    r = t.PO,
                    o = t.QO,
                    h = t.OO;
                for (i = 0; i < r; i += o) e.push(new s(n, this.kP, h, o));
                return e
            }, e.prototype.mP = function(t, i, n, e, r, o) {
                for (var s, h, a, u, c, f, l, p, v, y, d = 0; d < n; d++) s = t[i + d], h = s.IC, c = s.jw.g, f = s.jw.h, a = h.trim, u = h.OF, a ? (p = a.g - s.anchor.g * u.Ka, l = p + a.Ka, y = a.h - s.anchor.h * u.Ua, v = y + a.Ua) : (l = u.Ka * (1 - s.anchor.g), p = u.Ka * -s.anchor.g, v = u.Ua * (1 - s.anchor.h), y = u.Ua * -s.anchor.h), e[o] = p * c, e[o + 1] = y * f, e[o + r] = l * c, e[o + r + 1] = y * f, e[o + 2 * r] = l * c, e[o + 2 * r + 1] = v * f, e[o + 3 * r] = p * c, e[o + 3 * r + 1] = v * f, o += 4 * r
            }, e.prototype.oP = function(t, i, n, e, r, o) {
                for (var s = 0; s < n; s++) {
                    var h = t[i + s].gh;
                    e[o] = h.g, e[o + 1] = h.h, e[o + r] = h.g, e[o + r + 1] = h.h, e[o + 2 * r] = h.g, e[o + 2 * r + 1] = h.h, e[o + 3 * r] = h.g, e[o + 3 * r + 1] = h.h, o += 4 * r
                }
            }, e.prototype.qP = function(t, i, n, e, r, o) {
                for (var s = 0; s < n; s++) {
                    var h = t[i + s].ex;
                    e[o] = h, e[o + r] = h, e[o + 2 * r] = h, e[o + 3 * r] = h, o += 4 * r
                }
            }, e.prototype.rP = function(t, i, n, e, r, o) {
                for (var s = 0; s < n; s++) {
                    var h = t[i + s].IC.LG;
                    h ? (e[o] = h.KI, e[o + 1] = h.LI, e[o + r] = h.MI, e[o + r + 1] = h.NI, e[o + 2 * r] = h.OI, e[o + 2 * r + 1] = h.QI, e[o + 3 * r] = h.RI, e[o + 3 * r + 1] = h.SI, o += 4 * r) : (e[o] = 0, e[o + 1] = 0, e[o + r] = 0, e[o + r + 1] = 0, e[o + 2 * r] = 0, e[o + 2 * r + 1] = 0, e[o + 3 * r] = 0, e[o + 3 * r + 1] = 0, o += 4 * r)
                }
            }, e.prototype.sP = function(t, i, n, e, r, o) {
                for (var s = 0; s < n; s++) {
                    var h = t[i + s].Aw;
                    e[o] = h, e[o + r] = h, e[o + 2 * r] = h, e[o + 3 * r] = h, o += 4 * r
                }
            }, e.prototype.Ym = function() {
                this.Ft.Lm && this.Ft.Lm.Zm(this.Bo), r.BA.prototype.Ym.apply(this, arguments), this.b.Ym(), this.Iz = null, this.lP = null
            }
        }, {
            hK: 97,
            vP: 195,
            wP: 197
        }],
        197: [function(t, i, n) {
            function e(t) {
                r.call(this, t, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "void main(void){", "   vec2 v = aVertexPosition;", "   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);", "   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);", "   v = v + aPositionCoord;", "   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"].join("\n"), ["varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "uniform float uAlpha;", "void main(void){", "  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uAlpha;", "  if (color.a == 0.0) discard;", "  gl_FragColor = color;", "}"].join("\n"))
            }
            var r = t("../../core/Shader");
            e.prototype = Object.create(r.prototype), e.prototype.constructor = e, i.r = e
        }, {
            CL: 77
        }],
        198: [function(t, i, n) {
            Math.sign || (Math.sign = function(t) {
                return t = +t, 0 === t || isNaN(t) ? t : t > 0 ? 1 : -1
            })
        }, {}],
        199: [function(t, i, n) {
            Object.Dm || (Object.Dm = t("object-assign"))
        }, {
            xP: 43
        }],
        200: [function(t, i, n) {
            t("./Object.assign"), t("./requestAnimationFrame"), t("./Math.sign"), window.yP || (window.yP = Array), window.zP || (window.zP = Array), window.AP || (window.AP = Array), window.BP || (window.BP = Array)
        }, {
            CP: 198,
            DP: 199,
            EP: 201
        }],
        201: [function(t, i, n) {
            (function(t) {
                if (Date.now && Date.prototype.getTime || (Date.now = function() {
                        return (new Date).getTime()
                    }), !t.FP || !t.FP.now) {
                    var i = Date.now();
                    t.FP || (t.FP = {}), t.FP.now = function() {
                        return Date.now() - i
                    }
                }
                for (var n = Date.now(), e = ["ms", "moz", "webkit", "o"], r = 0; r < e.length && !t.a; ++r) t.a = t[e[r] + "RequestAnimationFrame"], t.ai = t[e[r] + "CancelAnimationFrame"] || t[e[r] + "CancelRequestAnimationFrame"];
                t.a || (t.a = function(t) {
                    if ("function" != typeof t) throw new TypeError(t + "is not a function");
                    var i = Date.now(),
                        e = 16 + n - i;
                    return e < 0 && (e = 0), n = i, setTimeout(function() {
                        n = Date.now(), t(performance.now())
                    }, e)
                }), t.ai || (t.ai = function(t) {
                    clearTimeout(t)
                })
            }).call(this, "undefined" != typeof I ? I : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        202: [function(t, i, n) {
            function e() {}
            var r = t("../../core");
            e.prototype.constructor = e, i.r = e, e.prototype.Qm = function(t, i) {
                "function" == typeof t && (i = t, t = null), i()
            }, e.prototype.GP = function() {
                return this
            }, e.prototype.ra = function() {
                return this
            }, e.prototype.Ym = function() {}, r.ru.pu("prepare", e)
        }, {
            hK: 97
        }],
        203: [function(t, i, n) {
            i.r = {
                iK: t("./webgl/WebGLPrepare"),
                Zy: t("./canvas/CanvasPrepare")
            }
        }, {
            HP: 202,
            IP: 204
        }],
        204: [function(t, i, n) {
            function e(t) {
                this.Ft = t, this.Ya = [], this.JP = [], this.KP = [], this.LP = [], this.MP = !1, this.GP(s, r).GP(h, o)
            }

            function r(t, i) {
                return i instanceof a.tA && (t.UC._C(i), !0)
            }

            function o(t, i) {
                return i instanceof a.oA && (t.mu.My.Ez(i), !0)
            }

            function s(t, i) {
                if (t instanceof a.tA) return i.indexOf(t) === -1 && i.push(t), !0;
                if (t.IC && t.IC instanceof a.sA) {
                    var n = t.IC._y;
                    return i.indexOf(n) === -1 && i.push(n), !0
                }
                return !1
            }

            function h(t, i) {
                return t instanceof a.oA && (i.push(t), !0)
            }
            var a = t("../../core"),
                u = a.dA.rJ;
            e.NP = 4, e.prototype.constructor = e, i.r = e, e.prototype.Qm = function(t, i) {
                "function" == typeof t && (i = t, t = null), t && this.ra(t), this.Ya.length ? (this.OP = e.NP, this.LP.push(i), this.MP || (this.MP = !0, u.ra(this.Ra, this))) : i()
            }, e.prototype.Ra = function() {
                for (var t, i; this.Ya.length && this.OP > 0;) {
                    var n = this.Ya[0],
                        r = !1;
                    for (t = 0, i = this.KP.length; t < i; t++)
                        if (this.KP[t](this.Ft, n)) {
                            this.OP--, this.Ya.shift(), r = !0;
                            break
                        }
                    r || this.Ya.shift()
                }
                if (this.Ya.length) this.OP = e.NP;
                else {
                    this.MP = !1, u.hb(this.Ra, this);
                    var o = this.LP.slice(0);
                    for (this.LP.length = 0, t = 0, i = o.length; t < i; t++) o[t]()
                }
            }, e.prototype.GP = function(t, i) {
                return t && this.JP.push(t), i && this.KP.push(i), this
            }, e.prototype.ra = function(t) {
                var i, n;
                for (i = 0, n = this.JP.length; i < n && !this.JP[i](t, this.Ya); i++);
                if (t instanceof a.eA)
                    for (i = t.he.length - 1; i >= 0; i--) this.ra(t.he[i]);
                return this
            }, e.prototype.Ym = function() {
                this.MP && u.hb(this.Ra, this), this.MP = !1, this.JP = null, this.KP = null, this.Ft = null, this.LP = null, this.Ya = null
            }, a.qu.pu("prepare", e)
        }, {
            hK: 97
        }],
        205: [function(t, i, n) {
            (function(n) {
                t("./polyfill");
                var e = i.r = t("./core");
                e.PP = t("./extras"), e.Zd = t("./filters"), e.lu = t("./interaction"), e.QP = t("./loaders"), e.RP = t("./mesh"), e.SP = t("./particles"), e.TP = t("./accessibility"), e.TJ = t("./extract"), e.UP = t("./prepare"), e.VP = new e.QP.ON, Object.Dm(e, t("./deprecation")), n.uk = e
            }).call(this, "undefined" != typeof I ? I : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            WP: 76,
            cK: 97,
            XP: 154,
            YP: 156,
            dK: 164,
            eK: 175,
            ZP: 180,
            $P: 183,
            fK: 191,
            gK: 194,
            _P: 200,
            aQ: 203
        }]
    }, {}, [205])(205)
}),
function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.r = t();
    else if ("function" == typeof define && define.qk) define([], t);
    else {
        var i;
        i = "undefined" != typeof window ? window : "undefined" != typeof I ? I : "undefined" != typeof self ? self : this, i.bQ = t()
    }
}(function() {
    var t;
    return function t(i, n, e) {
        function r(s, h) {
            if (!n[s]) {
                if (!i[s]) {
                    var a = "function" == typeof require && require;
                    if (!h && a) return a(s, !0);
                    if (o) return o(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw u.vk = "MODULE_NOT_FOUND", u
                }
                var c = n[s] = {
                    r: {}
                };
                i[s][0].call(c.r, function(t) {
                    var n = i[s][1][t];
                    return r(n ? n : t)
                }, c, c.r, t, i, n, e)
            }
            return n[s].r
        }
        for (var o = "function" == typeof require && require, s = 0; s < e.length; s++) r(e[s]);
        return r
    }({
        1: [function(t, i, n) {
            i.r = t("./lib/")
        }, {
            cQ: 2
        }],
        2: [function(t, i, n) {
            i.r = t("./socket"), i.r.dQ = t("engine.io-parser")
        }, {
            eQ: 3,
            fQ: 19
        }],
        3: [function(t, i, n) {
            (function(n) {
                function e(t, i) {
                    if (!(this instanceof e)) return new e(t, i);
                    i = i || {}, t && "object" == typeof t && (i = t, t = null), t ? (t = c(t), i.ns = t.kj, i.gQ = "https" == t.Mi || "wss" == t.Mi, i.ms = t.ms, t.et && (i.et = t.et)) : i.kj && (i.ns = c(i.kj).kj), this.gQ = null != i.gQ ? i.gQ : n.Ad && "https:" == location.Mi, i.ns && !i.ms && (i.ms = this.gQ ? "443" : "80"), this.hQ = i.hQ || !1, this.ns = i.ns || (n.Ad ? location.ns : "localhost"), this.ms = i.ms || (n.Ad && location.ms ? location.ms : this.gQ ? 443 : 80), this.et = i.et || {}, "string" == typeof this.et && (this.et = l.Fq(this.et)), this.iQ = !1 !== i.iQ, this.ft = (i.ft || "/engine.io").replace(/\/$/, "") + "/", this.jQ = !!i.jQ, this.Vj = !1 !== i.Vj, this.kQ = !!i.kQ, this.lQ = !!i.lQ, this.mQ = i.mQ || "t", this.nQ = i.nQ, this.oQ = i.oQ || ["polling", "websocket"], this.Se = "", this.pQ = [], this.qQ = i.qQ || 843, this.rQ = i.rQ || !1, this.sQ = null, this.tQ = i.tQ, this.uQ = !1 !== i.uQ && (i.uQ || {}), !0 === this.uQ && (this.uQ = {}), this.uQ && null == this.uQ.vQ && (this.uQ.vQ = 1024), this.wQ = i.wQ || null, this.sg = i.sg || null, this.xQ = i.xQ || null, this.yQ = i.yQ || null, this.zQ = i.zQ || null, this.AQ = i.AQ || null, this.BQ = void 0 === i.BQ ? null : i.BQ;
                    var r = "object" == typeof n && n;
                    r.global === r && i.CQ && Object.keys(i.CQ).length > 0 && (this.CQ = i.CQ), this.Fj()
                }

                function r(t) {
                    var i = {};
                    for (var n in t) t.hasOwnProperty(n) && (i[n] = t[n]);
                    return i
                }
                var o = t("./transports"),
                    s = t("component-emitter"),
                    h = t("debug")("engine.io-client:socket"),
                    a = t("indexof"),
                    u = t("engine.io-parser"),
                    c = t("parseuri"),
                    f = t("parsejson"),
                    l = t("parseqs");
                i.r = e, e.DQ = !1, s(e.prototype), e.Mi = u.Mi, e.EQ = e, e.FQ = t("./transport"), e.oQ = t("./transports"), e.dQ = t("engine.io-parser"), e.prototype.GQ = function(t) {
                    h('creating transport "%s"', t);
                    var i = r(this.et);
                    i.HQ = u.Mi, i.IQ = t, this.nc && (i.JQ = this.nc);
                    var n = new o[t]({
                        hQ: this.hQ,
                        ns: this.ns,
                        ms: this.ms,
                        gQ: this.gQ,
                        ft: this.ft,
                        et: i,
                        jQ: this.jQ,
                        Vj: this.Vj,
                        kQ: this.kQ,
                        lQ: this.lQ,
                        nQ: this.nQ,
                        mQ: this.mQ,
                        qQ: this.qQ,
                        KQ: this,
                        wQ: this.wQ,
                        sg: this.sg,
                        xQ: this.xQ,
                        yQ: this.yQ,
                        zQ: this.zQ,
                        AQ: this.AQ,
                        BQ: this.BQ,
                        uQ: this.uQ,
                        CQ: this.CQ
                    });
                    return n
                }, e.prototype.Fj = function() {
                    var t;
                    if (this.rQ && e.DQ && this.oQ.indexOf("websocket") != -1) t = "websocket";
                    else {
                        if (0 === this.oQ.length) {
                            var i = this;
                            return void setTimeout(function() {
                                i.Ll("error", "No transports available")
                            }, 0)
                        }
                        t = this.oQ[0]
                    }
                    this.Se = "opening";
                    try {
                        t = this.GQ(t)
                    } catch (t) {
                        return this.oQ.shift(), void this.Fj()
                    }
                    t.Fj(), this.LQ(t)
                }, e.prototype.LQ = function(t) {
                    h("setting transport %s", t.name);
                    var i = this;
                    this.IQ && (h("clearing existing transport %s", this.IQ.name), this.IQ.Nl()), this.IQ = t, t.Lg("drain", function() {
                        i.MQ()
                    }).Lg("packet", function(t) {
                        i.NQ(t)
                    }).Lg("error", function(t) {
                        i.OQ(t)
                    }).Lg("close", function() {
                        i.PQ("transport close")
                    })
                }, e.prototype.QQ = function(t) {
                    function i() {
                        if (l.tQ) {
                            var i = !this.RQ && l.IQ.RQ;
                            f = f || i
                        }
                        f || (h('probe transport "%s" opened', t), c.rj([{
                            z: "ping",
                            Wb: "probe"
                        }]), c.ve("packet", function(i) {
                            if (!f)
                                if ("pong" == i.z && "probe" == i.Wb) {
                                    if (h('probe transport "%s" pong', t), l.SQ = !0, l.Ll("upgrading", c), !c) return;
                                    e.DQ = "websocket" == c.name, h('pausing current transport "%s"', l.IQ.name), l.IQ.$k(function() {
                                        f || "closed" != l.Se && (h("changing transport and sending upgrade packet"), u(), l.LQ(c), c.rj([{
                                            z: "upgrade"
                                        }]), l.Ll("upgrade", c), c = null, l.SQ = !1, l.Mw())
                                    })
                                } else {
                                    h('probe transport "%s" failed', t);
                                    var n = new Error("probe error");
                                    n.IQ = c.name, l.Ll("upgradeError", n)
                                }
                        }))
                    }

                    function n() {
                        f || (f = !0, u(), c.bz(), c = null)
                    }

                    function r(i) {
                        var e = new Error("probe error: " + i);
                        e.IQ = c.name, n(), h('probe transport "%s" failed because of error: %s', t, i), l.Ll("upgradeError", e)
                    }

                    function o() {
                        r("transport closed")
                    }

                    function s() {
                        r("socket closed")
                    }

                    function a(t) {
                        c && t.name != c.name && (h('"%s" works - aborting "%s"', t.name, c.name), n())
                    }

                    function u() {
                        c.Ml("open", i), c.Ml("error", r), c.Ml("close", o), l.Ml("close", s), l.Ml("upgrading", a)
                    }
                    h('probing transport "%s"', t);
                    var c = this.GQ(t, {
                            QQ: 1
                        }),
                        f = !1,
                        l = this;
                    e.DQ = !1, c.ve("open", i), c.ve("error", r), c.ve("close", o), this.ve("close", s), this.ve("upgrading", a), c.Fj()
                }, e.prototype.TQ = function() {
                    if (h("socket open"), this.Se = "open", e.DQ = "websocket" == this.IQ.name, this.Ll("open"), this.Mw(), "open" == this.Se && this.iQ && this.IQ.$k) {
                        h("starting upgrade probes");
                        for (var t = 0, i = this.UQ.length; t < i; t++) this.QQ(this.UQ[t])
                    }
                }, e.prototype.NQ = function(t) {
                    if ("opening" == this.Se || "open" == this.Se) switch (h('socket receive: type "%s", data "%s"', t.z, t.Wb), this.Ll("packet", t), this.Ll("heartbeat"), t.z) {
                        case "open":
                            this.VQ(f(t.Wb));
                            break;
                        case "pong":
                            this.WQ(), this.Ll("pong");
                            break;
                        case "error":
                            var i = new Error("server error");
                            i.vk = t.Wb, this.OQ(i);
                            break;
                        case "message":
                            this.Ll("data", t.Wb), this.Ll("message", t.Wb)
                    } else h('packet received with socket readyState "%s"', this.Se)
                }, e.prototype.VQ = function(t) {
                    this.Ll("handshake", t), this.nc = t.JQ, this.IQ.et.JQ = t.JQ, this.UQ = this.XQ(t.UQ), this.YQ = t.YQ, this.ZQ = t.ZQ, this.TQ(), "closed" != this.Se && (this.WQ(), this.Ml("heartbeat", this.$Q), this.Lg("heartbeat", this.$Q))
                }, e.prototype.$Q = function(t) {
                    clearTimeout(this._Q);
                    var i = this;
                    i._Q = setTimeout(function() {
                        "closed" != i.Se && i.PQ("ping timeout")
                    }, t || i.YQ + i.ZQ)
                }, e.prototype.WQ = function() {
                    var t = this;
                    clearTimeout(t.aR), t.aR = setTimeout(function() {
                        h("writing ping packet - expecting pong within %sms", t.ZQ), t.bR(), t.$Q(t.ZQ)
                    }, t.YQ)
                }, e.prototype.bR = function() {
                    var t = this;
                    this.cR("ping", function() {
                        t.Ll("ping")
                    })
                }, e.prototype.MQ = function() {
                    this.pQ.splice(0, this.dR), this.dR = 0, 0 === this.pQ.length ? this.Ll("drain") : this.Mw()
                }, e.prototype.Mw = function() {
                    "closed" != this.Se && this.IQ.Sf && !this.SQ && this.pQ.length && (h("flushing %d packets in socket", this.pQ.length), this.IQ.rj(this.pQ), this.dR = this.pQ.length, this.Ll("flush"))
                }, e.prototype.eR = e.prototype.rj = function(t, i, n) {
                    return this.cR("message", t, i, n), this
                }, e.prototype.cR = function(t, i, n, e) {
                    if ("function" == typeof i && (e = i, i = void 0), "function" == typeof n && (e = n, n = null), "closing" != this.Se && "closed" != this.Se) {
                        n = n || {}, n.fR = !1 !== n.fR;
                        var r = {
                            z: t,
                            Wb: i,
                            Ch: n
                        };
                        this.Ll("packetCreate", r), this.pQ.push(r), e && this.ve("flush", e), this.Mw()
                    }
                }, e.prototype.bz = function() {
                    function t() {
                        e.PQ("forced close"), h("socket closing - telling transport to close"), e.IQ.bz()
                    }

                    function i() {
                        e.Ml("upgrade", i), e.Ml("upgradeError", i), t()
                    }

                    function n() {
                        e.ve("upgrade", i), e.ve("upgradeError", i)
                    }
                    if ("opening" == this.Se || "open" == this.Se) {
                        this.Se = "closing";
                        var e = this;
                        this.pQ.length ? this.ve("drain", function() {
                            this.SQ ? n() : t()
                        }) : this.SQ ? n() : t()
                    }
                    return this
                }, e.prototype.OQ = function(t) {
                    h("socket error %j", t), e.DQ = !1, this.Ll("error", t), this.PQ("transport error", t)
                }, e.prototype.PQ = function(t, i) {
                    if ("opening" == this.Se || "open" == this.Se || "closing" == this.Se) {
                        h('socket close with reason: "%s"', t);
                        var n = this;
                        clearTimeout(this.aR), clearTimeout(this._Q), this.IQ.Nl("close"), this.IQ.bz(), this.IQ.Nl(), this.Se = "closed", this.nc = null, this.Ll("close", t, i), n.pQ = [], n.dR = 0
                    }
                }, e.prototype.XQ = function(t) {
                    for (var i = [], n = 0, e = t.length; n < e; n++) ~a(this.oQ, t[n]) && i.push(t[n]);
                    return i
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {
            gR: 4,
            hR: 5,
            iR: 15,
            Et: 17,
            fQ: 19,
            jR: 23,
            kR: 26,
            lR: 27,
            mR: 28
        }],
        4: [function(t, i, n) {
            function e(t) {
                this.ft = t.ft, this.ns = t.ns, this.ms = t.ms, this.gQ = t.gQ, this.et = t.et, this.mQ = t.mQ, this.nQ = t.nQ, this.Se = "", this.hQ = t.hQ || !1, this.KQ = t.KQ, this.lQ = t.lQ, this.wQ = t.wQ, this.sg = t.sg, this.xQ = t.xQ, this.yQ = t.yQ, this.zQ = t.zQ, this.AQ = t.AQ, this.BQ = t.BQ, this.CQ = t.CQ
            }
            var r = t("engine.io-parser"),
                o = t("component-emitter");
            i.r = e, o(e.prototype), e.prototype.OQ = function(t, i) {
                var n = new Error(t);
                return n.z = "TransportError", n.nR = i, this.Ll("error", n), this
            }, e.prototype.Fj = function() {
                return "closed" != this.Se && "" != this.Se || (this.Se = "opening", this.oR()), this
            }, e.prototype.bz = function() {
                return "opening" != this.Se && "open" != this.Se || (this.pR(), this.PQ()), this
            }, e.prototype.rj = function(t) {
                if ("open" != this.Se) throw new Error("Transport not open");
                this.eR(t)
            }, e.prototype.TQ = function() {
                this.Se = "open", this.Sf = !0, this.Ll("open")
            }, e.prototype.qR = function(t) {
                var i = r.rR(t, this.KQ.sQ);
                this.NQ(i)
            }, e.prototype.NQ = function(t) {
                this.Ll("packet", t)
            }, e.prototype.PQ = function() {
                this.Se = "closed", this.Ll("close")
            }
        }, {
            iR: 15,
            fQ: 19
        }],
        5: [function(t, i, n) {
            (function(i) {
                function e(t) {
                    var n, e = !1,
                        h = !1,
                        a = !1 !== t.Vj;
                    if (i.Ad) {
                        var u = "https:" == location.Mi,
                            c = location.ms;
                        c || (c = u ? 443 : 80), e = t.ns != location.ns || c != t.ms, h = t.gQ != u
                    }
                    if (t.sR = e, t.tR = h, n = new r(t), "open" in n && !t.jQ) return new o(t);
                    if (!a) throw new Error("JSONP disabled");
                    return new s(t)
                }
                var r = t("xmlhttprequest-ssl"),
                    o = t("./polling-xhr"),
                    s = t("./polling-jsonp"),
                    h = t("./websocket");
                n.uR = e, n.vR = h
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {
            wR: 6,
            xR: 7,
            yR: 9,
            zR: 10
        }],
        6: [function(t, i, n) {
            (function(n) {
                function e() {}

                function r(t) {
                    o.call(this, t), this.et = this.et || {}, h || (n.AR || (n.AR = []), h = n.AR), this.ke = h.length;
                    var i = this;
                    h.push(function(t) {
                        i.qR(t)
                    }), this.et.BR = this.ke, n.s && n.Sc && n.Sc("beforeunload", function() {
                        i.Rj && (i.Rj.Kj = e)
                    }, !1)
                }
                var o = t("./polling"),
                    s = t("component-inherit");
                i.r = r;
                var h, a = /\n/g,
                    u = /\\n/g;
                s(r, o), r.prototype.RQ = !1, r.prototype.pR = function() {
                    this.Rj && (this.Rj.w.v(this.Rj), this.Rj = null), this.CR && (this.CR.w.v(this.CR), this.CR = null, this.DR = null), o.prototype.pR.call(this)
                }, r.prototype.ER = function() {
                    var t = this,
                        i = document.t("script");
                    this.Rj && (this.Rj.w.v(this.Rj), this.Rj = null), i.Oi = !0, i.Fa = this.FR(), i.Kj = function(i) {
                        t.OQ("jsonp poll error", i)
                    };
                    var n = document.aa("script")[0];
                    n ? n.w.Qg(i, n) : (document.y || document.Z).x(i), this.Rj = i;
                    var e = "undefined" != typeof navigator && /gecko/i.test(navigator.Rl);
                    e && setTimeout(function() {
                        var t = document.t("iframe");
                        document.Z.x(t), document.Z.v(t)
                    }, 100)
                }, r.prototype.GR = function(t, i) {
                    function n() {
                        e(), i()
                    }

                    function e() {
                        if (r.DR) try {
                            r.CR.v(r.DR)
                        } catch (t) {
                            r.OQ("jsonp polling iframe removal error", t)
                        }
                        try {
                            var t = '<iframe src="javascript:0" name="' + r.HR + '">';
                            o = document.t(t)
                        } catch (t) {
                            o = document.t("iframe"), o.name = r.HR, o.Fa = "javascript:0"
                        }
                        o.nc = r.HR, r.CR.x(o), r.DR = o
                    }
                    var r = this;
                    if (!this.CR) {
                        var o, s = document.t("form"),
                            h = document.t("textarea"),
                            c = this.HR = "eio_iframe_" + this.ke;
                        s.Vc = "socketio", s.T.gh = "absolute", s.T.Rc = "-1000px", s.T.xh = "-1000px", s.zd = c, s.ij = "POST", s.qc("accept-charset", "utf-8"), h.name = "d", s.x(h), document.Z.x(s), this.CR = s, this.IR = h
                    }
                    this.CR.JR = this.FR(), e(), t = t.replace(u, "\\\n"), this.IR.xc = t.replace(a, "\\n");
                    try {
                        this.CR.Xd()
                    } catch (t) {}
                    this.DR.Tc ? this.DR.Mj = function() {
                        "complete" == r.DR.Se && n()
                    } : this.DR.Jj = n
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {
            KR: 8,
            LR: 16
        }],
        7: [function(t, i, n) {
            (function(n) {
                function e() {}

                function r(t) {
                    if (a.call(this, t), n.Ad) {
                        var i = "https:" == location.Mi,
                            e = location.ms;
                        e || (e = i ? 443 : 80), this.MR = t.ns != n.Ad.ns || e != t.ms, this.NR = t.gQ != i
                    } else this.CQ = t.CQ
                }

                function o(t) {
                    this.ij = t.ij || "GET", this.FR = t.FR, this.MR = !!t.MR, this.NR = !!t.NR, this.Oi = !1 !== t.Oi, this.Wb = void 0 != t.Wb ? t.Wb : null, this.hQ = t.hQ, this.OR = t.OR, this.RQ = t.RQ, this.lQ = t.lQ, this.wQ = t.wQ, this.sg = t.sg, this.xQ = t.xQ, this.yQ = t.yQ, this.zQ = t.zQ, this.AQ = t.AQ, this.BQ = t.BQ, this.CQ = t.CQ, this.create()
                }

                function s() {
                    for (var t in o.PR) o.PR.hasOwnProperty(t) && o.PR[t].hj()
                }
                var h = t("xmlhttprequest-ssl"),
                    a = t("./polling"),
                    u = t("component-emitter"),
                    c = t("component-inherit"),
                    f = t("debug")("engine.io-client:polling-xhr");
                i.r = r, i.r.QR = o, c(r, a), r.prototype.RQ = !0, r.prototype.RR = function(t) {
                    return t = t || {}, t.FR = this.FR(), t.MR = this.MR, t.NR = this.NR, t.hQ = this.hQ || !1, t.RQ = this.RQ, t.lQ = this.lQ, t.wQ = this.wQ, t.sg = this.sg, t.xQ = this.xQ, t.yQ = this.yQ, t.zQ = this.zQ, t.AQ = this.AQ, t.BQ = this.BQ, t.CQ = this.CQ, new o(t)
                }, r.prototype.GR = function(t, i) {
                    var n = "string" != typeof t && void 0 !== t,
                        e = this.RR({
                            ij: "POST",
                            Wb: t,
                            OR: n
                        }),
                        r = this;
                    e.Lg("success", i), e.Lg("error", function(t) {
                        r.OQ("xhr post error", t)
                    }), this.SR = e
                }, r.prototype.ER = function() {
                    f("xhr poll");
                    var t = this.RR(),
                        i = this;
                    t.Lg("data", function(t) {
                        i.qR(t)
                    }), t.Lg("error", function(t) {
                        i.OQ("xhr poll error", t)
                    }), this.TR = t
                }, u(o.prototype), o.prototype.create = function() {
                    var t = {
                        hQ: this.hQ,
                        sR: this.MR,
                        tR: this.NR,
                        lQ: this.lQ
                    };
                    t.wQ = this.wQ, t.sg = this.sg, t.xQ = this.xQ, t.yQ = this.yQ, t.zQ = this.zQ, t.AQ = this.AQ, t.BQ = this.BQ;
                    var i = this.Cj = new h(t),
                        e = this;
                    try {
                        f("xhr open %s: %s", this.ij, this.FR), i.Fj(this.ij, this.FR, this.Oi);
                        try {
                            if (this.CQ) {
                                i.UR(!0);
                                for (var r in this.CQ) this.CQ.hasOwnProperty(r) && i.fj(r, this.CQ[r])
                            }
                        } catch (t) {}
                        if (this.RQ && (i.Nj = "arraybuffer"), "POST" == this.ij) try {
                            this.OR ? i.fj("Content-type", "application/octet-stream") : i.fj("Content-type", "text/plain;charset=UTF-8")
                        } catch (t) {}
                        "withCredentials" in i && (i.VR = !0), this.WR() ? (i.Jj = function() {
                            e.XR()
                        }, i.Kj = function() {
                            e.OQ(i.Oj)
                        }) : i.Mj = function() {
                            4 == i.Se && (200 == i.bj || 1223 == i.bj ? e.XR() : setTimeout(function() {
                                e.OQ(i.bj)
                            }, 0))
                        }, f("xhr data %s", this.Wb), i.rj(this.Wb)
                    } catch (t) {
                        return void setTimeout(function() {
                            e.OQ(t)
                        }, 0)
                    }
                    n.s && (this.ke = o.YR++, o.PR[this.ke] = this)
                }, o.prototype.ZR = function() {
                    this.Ll("success"), this.$R()
                }, o.prototype.qR = function(t) {
                    this.Ll("data", t), this.ZR()
                }, o.prototype.OQ = function(t) {
                    this.Ll("error", t), this.$R(!0)
                }, o.prototype.$R = function(t) {
                    if ("undefined" != typeof this.Cj && null !== this.Cj) {
                        if (this.WR() ? this.Cj.Jj = this.Cj.Kj = e : this.Cj.Mj = e, t) try {
                            this.Cj.hj()
                        } catch (t) {}
                        n.s && delete o.PR[this.ke], this.Cj = null
                    }
                }, o.prototype.XR = function() {
                    var t;
                    try {
                        var i;
                        try {
                            i = this.Cj.Ob("Content-Type").split(";")[0]
                        } catch (t) {}
                        if ("application/octet-stream" === i) t = this.Cj.Qj;
                        else if (this.RQ) try {
                            t = String.fromCharCode.apply(null, new Uint8Array(this.Cj.Qj))
                        } catch (i) {
                            for (var n = new Uint8Array(this.Cj.Qj), e = [], r = 0, o = n.length; r < o; r++) e.push(n[r]);
                            t = String.fromCharCode.apply(null, e)
                        } else t = this.Cj.Oj
                    } catch (t) {
                        this.OQ(t)
                    }
                    null != t && this.qR(t)
                }, o.prototype.WR = function() {
                    return "undefined" != typeof n.Mr && !this.NR && this.lQ
                }, o.prototype.hj = function() {
                    this.$R()
                }, n.s && (o.YR = 0, o.PR = {}, n.Tc ? n.Tc("onunload", s) : n.Sc && n.Sc("beforeunload", s, !1))
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {
            KR: 8,
            iR: 15,
            LR: 16,
            Et: 17,
            zR: 10
        }],
        8: [function(t, i, n) {
            function e(t) {
                var i = t && t.kQ;
                c && !i || (this.RQ = !1), r.call(this, t)
            }
            var r = t("../transport"),
                o = t("parseqs"),
                s = t("engine.io-parser"),
                h = t("component-inherit"),
                a = t("yeast"),
                u = t("debug")("engine.io-client:polling");
            i.r = e;
            var c = function() {
                var i = t("xmlhttprequest-ssl"),
                    n = new i({
                        sR: !1
                    });
                return null != n.Nj
            }();
            h(e, r), e.prototype.name = "polling", e.prototype.oR = function() {
                this._R()
            }, e.prototype.$k = function(t) {
                function i() {
                    u("paused"), n.Se = "paused", t()
                }
                var n = this;
                if (this.Se = "pausing", this.uR || !this.Sf) {
                    var e = 0;
                    this.uR && (u("we are currently polling - waiting to pause"), e++, this.ve("pollComplete", function() {
                        u("pre-pause polling complete"), --e || i()
                    })), this.Sf || (u("we are currently writing - waiting to pause"), e++, this.ve("drain", function() {
                        u("pre-pause writing complete"), --e || i()
                    }))
                } else i()
            }, e.prototype._R = function() {
                u("polling"), this.uR = !0, this.ER(), this.Ll("poll")
            }, e.prototype.qR = function(t) {
                var i = this;
                u("polling got data %s", t);
                var n = function(t, n, e) {
                    return "opening" == i.Se && i.TQ(), "close" == t.z ? (i.PQ(), !1) : void i.NQ(t)
                };
                s.aS(t, this.KQ.sQ, n), "closed" != this.Se && (this.uR = !1, this.Ll("pollComplete"), "open" == this.Se ? this._R() : u('ignoring poll - transport state "%s"', this.Se))
            }, e.prototype.pR = function() {
                function t() {
                    u("writing close packet"), i.eR([{
                        z: "close"
                    }])
                }
                var i = this;
                "open" == this.Se ? (u("transport open - closing"), t()) : (u("transport not open - deferring close"), this.ve("open", t))
            }, e.prototype.eR = function(t) {
                var i = this;
                this.Sf = !1;
                var n = function() {
                        i.Sf = !0, i.Ll("drain")
                    },
                    i = this;
                s.bS(t, this.RQ, function(t) {
                    i.GR(t, n)
                })
            }, e.prototype.FR = function() {
                var t = this.et || {},
                    i = this.gQ ? "https" : "http",
                    n = "";
                !1 !== this.nQ && (t[this.mQ] = a()), this.RQ || t.JQ || (t.cS = 1), t = o.Gq(t), this.ms && ("https" == i && 443 != this.ms || "http" == i && 80 != this.ms) && (n = ":" + this.ms), t.length && (t = "?" + t);
                var e = this.ns.indexOf(":") !== -1;
                return i + "://" + (e ? "[" + this.ns + "]" : this.ns) + n + this.ft + t
            }
        }, {
            dS: 4,
            LR: 16,
            Et: 17,
            fQ: 19,
            lR: 27,
            zR: 10,
            eS: 30
        }],
        9: [function(t, i, n) {
            (function(n) {
                function e(t) {
                    var i = t && t.kQ;
                    i && (this.RQ = !1), this.uQ = t.uQ, r.call(this, t)
                }
                var r = t("../transport"),
                    o = t("engine.io-parser"),
                    s = t("parseqs"),
                    h = t("component-inherit"),
                    a = t("yeast"),
                    u = t("debug")("engine.io-client:websocket"),
                    c = n.fS || n.gS,
                    f = c;
                if (!f && "undefined" == typeof window) try {
                    f = t("ws")
                } catch (t) {}
                i.r = e, h(e, r), e.prototype.name = "websocket", e.prototype.RQ = !0, e.prototype.oR = function() {
                    if (this.hS()) {
                        var t = this.FR(),
                            i = void 0,
                            n = {
                                hQ: this.hQ,
                                uQ: this.uQ
                            };
                        n.wQ = this.wQ, n.sg = this.sg, n.xQ = this.xQ, n.yQ = this.yQ, n.zQ = this.zQ, n.AQ = this.AQ, n.BQ = this.BQ, this.CQ && (n.nj = this.CQ), this.iS = c ? new f(t) : new f(t, i, n), void 0 === this.iS.sQ && (this.RQ = !1), this.iS.jS && this.iS.jS.Pj ? (this.RQ = !0, this.iS.sQ = "buffer") : this.iS.sQ = "arraybuffer", this.kS()
                    }
                }, e.prototype.kS = function() {
                    var t = this;
                    this.iS.lS = function() {
                        t.TQ()
                    }, this.iS.mS = function() {
                        t.PQ()
                    }, this.iS.nS = function(i) {
                        t.qR(i.Wb)
                    }, this.iS.Kj = function(i) {
                        t.OQ("websocket error", i)
                    }
                }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.Rl) && (e.prototype.qR = function(t) {
                    var i = this;
                    setTimeout(function() {
                        r.prototype.qR.call(i, t)
                    }, 0)
                }), e.prototype.eR = function(t) {
                    function i() {
                        e.Ll("flush"), setTimeout(function() {
                            e.Sf = !0, e.Ll("drain")
                        }, 0)
                    }
                    var e = this;
                    this.Sf = !1;
                    for (var r = t.length, s = 0, h = r; s < h; s++) ! function(t) {
                        o.oS(t, e.RQ, function(o) {
                            if (!c) {
                                var s = {};
                                if (t.Ch && (s.fR = t.Ch.fR), e.uQ) {
                                    var h = "string" == typeof o ? n.pS.Rm(o) : o.length;
                                    h < e.uQ.vQ && (s.fR = !1)
                                }
                            }
                            try {
                                c ? e.iS.rj(o) : e.iS.rj(o, s)
                            } catch (t) {
                                u("websocket closed before onclose event")
                            }--r || i()
                        })
                    }(t[s])
                }, e.prototype.PQ = function() {
                    r.prototype.PQ.call(this)
                }, e.prototype.pR = function() {
                    "undefined" != typeof this.iS && this.iS.bz()
                }, e.prototype.FR = function() {
                    var t = this.et || {},
                        i = this.gQ ? "wss" : "ws",
                        n = "";
                    this.ms && ("wss" == i && 443 != this.ms || "ws" == i && 80 != this.ms) && (n = ":" + this.ms), this.nQ && (t[this.mQ] = a()), this.RQ || (t.cS = 1), t = s.Gq(t), t.length && (t = "?" + t);
                    var e = this.ns.indexOf(":") !== -1;
                    return i + "://" + (e ? "[" + this.ns + "]" : this.ns) + n + this.ft + t
                }, e.prototype.hS = function() {
                    return !(!f || "__initialize" in f && this.name === e.prototype.name)
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {
            dS: 4,
            LR: 16,
            Et: 17,
            fQ: 19,
            lR: 27,
            iS: void 0,
            eS: 30
        }],
        10: [function(t, i, n) {
            var e = t("has-cors");
            i.r = function(t) {
                var i = t.sR,
                    n = t.tR,
                    r = t.lQ;
                try {
                    if ("undefined" != typeof XMLHttpRequest && (!i || e)) return new XMLHttpRequest
                } catch (t) {}
                try {
                    if ("undefined" != typeof XDomainRequest && !n && r) return new XDomainRequest
                } catch (t) {}
                if (!i) try {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                } catch (t) {}
            }
        }, {
            qS: 22
        }],
        11: [function(t, i, n) {
            function e(t, i, n) {
                function e(t, r) {
                    if (e.PC <= 0) throw new Error("after called too many times");
                    --e.PC, t ? (o = !0, i(t), i = n) : 0 !== e.PC || o || i(null, r)
                }
                var o = !1;
                return n = n || r, e.PC = t, 0 === t ? i() : e
            }

            function r() {}
            i.r = e
        }, {}],
        12: [function(t, i, n) {
            i.r = function(t, i, n) {
                var e = t.Rm;
                if (i = i || 0, n = n || e, t.slice) return t.slice(i, n);
                if (i < 0 && (i += e), n < 0 && (n += e), n > e && (n = e), i >= e || i >= n || 0 === e) return new ArrayBuffer(0);
                for (var r = new Uint8Array(t), o = new Uint8Array(n - i), s = i, h = 0; s < n; s++, h++) o[h] = r[s];
                return o.Sk
            }
        }, {}],
        13: [function(t, i, n) {
            ! function(t) {
                "use strict";
                n.Gq = function(i) {
                    var n, e = new Uint8Array(i),
                        r = e.length,
                        o = "";
                    for (n = 0; n < r; n += 3) o += t[e[n] >> 2], o += t[(3 & e[n]) << 4 | e[n + 1] >> 4], o += t[(15 & e[n + 1]) << 2 | e[n + 2] >> 6], o += t[63 & e[n + 2]];
                    return r % 3 === 2 ? o = o.substring(0, o.length - 1) + "=" : r % 3 === 1 && (o = o.substring(0, o.length - 2) + "=="), o
                }, n.Fq = function(i) {
                    var n, e, r, o, s, h = .75 * i.length,
                        a = i.length,
                        u = 0;
                    "=" === i[i.length - 1] && (h--, "=" === i[i.length - 2] && h--);
                    var c = new ArrayBuffer(h),
                        f = new Uint8Array(c);
                    for (n = 0; n < a; n += 4) e = t.indexOf(i[n]), r = t.indexOf(i[n + 1]), o = t.indexOf(i[n + 2]), s = t.indexOf(i[n + 3]), f[u++] = e << 2 | r >> 4, f[u++] = (15 & r) << 4 | o >> 2, f[u++] = (3 & o) << 6 | 63 & s;
                    return c
                }
            }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
        }, {}],
        14: [function(t, i, n) {
            (function(t) {
                function n(t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        if (n.Sk instanceof ArrayBuffer) {
                            var e = n.Sk;
                            if (n.Rm !== e.Rm) {
                                var r = new Uint8Array(n.Rm);
                                r.P(new Uint8Array(e, n.rS, n.Rm)), e = r.Sk
                            }
                            t[i] = e
                        }
                    }
                }

                function e(t, i) {
                    i = i || {};
                    var e = new o;
                    n(t);
                    for (var r = 0; r < t.length; r++) e.Og(t[r]);
                    return i.z ? e.sS(i.z) : e.sS()
                }

                function r(t, i) {
                    return n(t), new Blob(t, i || {})
                }
                var o = t.tS || t.uS || t.vS || t.wS,
                    s = function() {
                        try {
                            var t = new Blob(["hi"]);
                            return 2 === t.Ho
                        } catch (t) {
                            return !1
                        }
                    }(),
                    h = s && function() {
                        try {
                            var t = new Blob([new Uint8Array([1, 2])]);
                            return 2 === t.Ho
                        } catch (t) {
                            return !1
                        }
                    }(),
                    a = o && o.prototype.Og && o.prototype.sS;
                i.r = function() {
                    return s ? h ? t.Zs : r : a ? e : void 0
                }()
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {}],
        15: [function(t, i, n) {
            function e(t) {
                if (t) return r(t)
            }

            function r(t) {
                for (var i in e.prototype) t[i] = e.prototype[i];
                return t
            }
            i.r = e, e.prototype.Lg = e.prototype.Sc = function(t, i) {
                return this.xS = this.xS || {}, (this.xS[t] = this.xS[t] || []).push(i), this
            }, e.prototype.ve = function(t, i) {
                function n() {
                    e.pa(t, n), i.apply(this, arguments)
                }
                var e = this;
                return this.xS = this.xS || {}, n.Yb = i, this.Lg(t, n), this
            }, e.prototype.pa = e.prototype.Ml = e.prototype.Nl = e.prototype.K = function(t, i) {
                if (this.xS = this.xS || {}, 0 == arguments.length) return this.xS = {}, this;
                var n = this.xS[t];
                if (!n) return this;
                if (1 == arguments.length) return delete this.xS[t], this;
                for (var e, r = 0; r < n.length; r++)
                    if (e = n[r], e === i || e.Yb === i) {
                        n.splice(r, 1);
                        break
                    }
                return this
            }, e.prototype.Ll = function(t) {
                this.xS = this.xS || {};
                var i = [].slice.call(arguments, 1),
                    n = this.xS[t];
                if (n) {
                    n = n.slice(0);
                    for (var e = 0, r = n.length; e < r; ++e) n[e].apply(this, i)
                }
                return this
            }, e.prototype.Kl = function(t) {
                return this.xS = this.xS || {}, this.xS[t] || []
            }, e.prototype.yS = function(t) {
                return !!this.Kl(t).length
            }
        }, {}],
        16: [function(t, i, n) {
            i.r = function(t, i) {
                var n = function() {};
                n.prototype = i.prototype, t.prototype = new n, t.prototype.constructor = t
            }
        }, {}],
        17: [function(t, i, n) {
            function e() {
                return "WebkitAppearance" in document.Pc.T || window.Me && (console.zS || console.AS && console.BS) || navigator.Rl.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31
            }

            function r() {
                var t = arguments,
                    i = this.CS;
                if (t[0] = (i ? "%c" : "") + this.wf + (i ? " %c" : " ") + t[0] + (i ? "%c " : " ") + "+" + n.DS(this.ES), !i) return t;
                var e = "color: " + this.Uz;
                t = [t[0], e, "color: inherit"].concat(Array.prototype.slice.call(t, 1));
                var r = 0,
                    o = 0;
                return t[0].replace(/%[a-z%]/g, function(t) {
                    "%%" !== t && (r++, "%c" === t && (o = r))
                }), t.splice(o, 0, e), t
            }

            function o() {
                return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function s(t) {
                try {
                    null == t ? n.GS.FS("debug") : n.GS.Et = t
                } catch (t) {}
            }

            function h() {
                var t;
                try {
                    t = n.GS.Et
                } catch (t) {}
                return t
            }

            function a() {
                try {
                    return window.HS
                } catch (t) {}
            }
            n = i.r = t("./debug"), n.log = o, n.IS = r, n.HC = s, n.Tf = h, n.CS = e, n.GS = "undefined" != typeof chrome && "undefined" != typeof chrome.GS ? chrome.GS.JS : a(), n.pG = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], n.KS.BR = function(t) {
                return JSON.Lq(t)
            }, n.WD(h())
        }, {
            LS: 18
        }],
        18: [function(t, i, n) {
            function e() {
                return n.pG[c++ % n.pG.length]
            }

            function r(t) {
                function i() {}

                function r() {
                    var t = r,
                        i = +new Date,
                        o = i - (u || i);
                    t.ES = o, t.ie = u, t.MS = i, u = i, null == t.CS && (t.CS = n.CS()), null == t.Uz && t.CS && (t.Uz = e());
                    var s = Array.prototype.slice.call(arguments);
                    s[0] = n.NS(s[0]), "string" != typeof s[0] && (s = ["%o"].concat(s));
                    var h = 0;
                    s[0] = s[0].replace(/%([a-z%])/g, function(i, e) {
                        if ("%%" === i) return i;
                        h++;
                        var r = n.KS[e];
                        if ("function" == typeof r) {
                            var o = s[h];
                            i = r.call(t, o), s.splice(h, 1), h--
                        }
                        return i
                    }), "function" == typeof n.IS && (s = n.IS.apply(t, s));
                    var a = r.log || n.log || console.log.bind(console);
                    a.apply(t, s)
                }
                i.Hd = !1, r.Hd = !0;
                var o = n.Hd(t) ? r : i;
                return o.wf = t, o
            }

            function o(t) {
                n.HC(t);
                for (var i = (t || "").split(/[\s,]+/), e = i.length, r = 0; r < e; r++) i[r] && (t = i[r].replace(/\*/g, ".*?"), "-" === t[0] ? n.OS.push(new RegExp("^" + t.substr(1) + "$")) : n.PS.push(new RegExp("^" + t + "$")))
            }

            function s() {
                n.WD("")
            }

            function h(t) {
                var i, e;
                for (i = 0, e = n.OS.length; i < e; i++)
                    if (n.OS[i].test(t)) return !1;
                for (i = 0, e = n.PS.length; i < e; i++)
                    if (n.PS[i].test(t)) return !0;
                return !1
            }

            function a(t) {
                return t instanceof Error ? t.Oe || t.message : t
            }
            n = i.r = r, n.NS = a, n.ye = s, n.WD = o, n.Hd = h, n.DS = t("ms"), n.PS = [], n.OS = [], n.KS = {};
            var u, c = 0
        }, {
            QS: 25
        }],
        19: [function(t, i, n) {
            (function(i) {
                function e(t, i) {
                    var e = "b" + n.RS[t.z] + t.Wb.Wb;
                    return i(e)
                }

                function r(t, i, e) {
                    if (!i) return n.SS(t, e);
                    var r = t.Wb,
                        o = new Uint8Array(r),
                        s = new Uint8Array(1 + r.Rm);
                    s[0] = g[t.z];
                    for (var h = 0; h < o.length; h++) s[h + 1] = o[h];
                    return e(s.Sk)
                }

                function o(t, i, e) {
                    if (!i) return n.SS(t, e);
                    var r = new FileReader;
                    return r.Jj = function() {
                        t.Wb = r.Kf, n.oS(t, i, !0, e)
                    }, r.TS(t.Wb)
                }

                function s(t, i, e) {
                    if (!i) return n.SS(t, e);
                    if (d) return o(t, i, e);
                    var r = new Uint8Array(1);
                    r[0] = g[t.z];
                    var s = new w([r.Sk, t.Wb]);
                    return e(s)
                }

                function h(t, i, n) {
                    for (var e = new Array(t.length), r = l(t.length, n), o = function(t, n, r) {
                            i(n, function(i, n) {
                                e[t] = n, r(i, e)
                            })
                        }, s = 0; s < t.length; s++) o(s, t[s], r)
                }
                var a = t("./keys"),
                    u = t("has-binary"),
                    c = t("arraybuffer.slice"),
                    f = t("base64-arraybuffer"),
                    l = t("after"),
                    p = t("utf8"),
                    v = navigator.Rl.match(/Android/i),
                    y = /PhantomJS/i.test(navigator.Rl),
                    d = v || y;
                n.Mi = 3;
                var g = n.RS = {
                        Fj: 0,
                        bz: 1,
                        bR: 2,
                        US: 3,
                        message: 4,
                        iQ: 5,
                        fc: 6
                    },
                    m = a(g),
                    b = {
                        z: "error",
                        Wb: "parser error"
                    },
                    w = t("blob");
                n.oS = function(t, n, o, h) {
                    "function" == typeof n && (h = n, n = !1), "function" == typeof o && (h = o, o = null);
                    var a = void 0 === t.Wb ? void 0 : t.Wb.Sk || t.Wb;
                    if (i.yP && a instanceof ArrayBuffer) return r(t, n, h);
                    if (w && a instanceof i.Zs) return s(t, n, h);
                    if (a && a.VJ) return e(t, h);
                    var u = g[t.z];
                    return void 0 !== t.Wb && (u += o ? p.Gq(String(t.Wb)) : String(t.Wb)), h("" + u)
                }, n.SS = function(t, e) {
                    var r = "b" + n.RS[t.z];
                    if (w && t.Wb instanceof i.Zs) {
                        var o = new FileReader;
                        return o.Jj = function() {
                            var t = o.Kf.split(",")[1];
                            e(r + t)
                        }, o.VS(t.Wb)
                    }
                    var s;
                    try {
                        s = String.fromCharCode.apply(null, new Uint8Array(t.Wb))
                    } catch (i) {
                        for (var h = new Uint8Array(t.Wb), a = new Array(h.length), u = 0; u < h.length; u++) a[u] = h[u];
                        s = String.fromCharCode.apply(null, a)
                    }
                    return r += i.WS(s), e(r)
                }, n.rR = function(t, i, e) {
                    if ("string" == typeof t || void 0 === t) {
                        if ("b" == t.charAt(0)) return n.XS(t.substr(1), i);
                        if (e) try {
                            t = p.Fq(t)
                        } catch (t) {
                            return b
                        }
                        var r = t.charAt(0);
                        return Number(r) == r && m[r] ? t.length > 1 ? {
                            z: m[r],
                            Wb: t.substring(1)
                        } : {
                            z: m[r]
                        } : b
                    }
                    var o = new Uint8Array(t),
                        r = o[0],
                        s = c(t, 1);
                    return w && "blob" === i && (s = new w([s])), {
                        z: m[r],
                        Wb: s
                    }
                }, n.XS = function(t, n) {
                    var e = m[t.charAt(0)];
                    if (!i.yP) return {
                        z: e,
                        Wb: {
                            VJ: !0,
                            Wb: t.substr(1)
                        }
                    };
                    var r = f.Fq(t.substr(1));
                    return "blob" === n && w && (r = new w([r])), {
                        z: e,
                        Wb: r
                    }
                }, n.bS = function(t, i, e) {
                    function r(t) {
                        return t.length + ":" + t
                    }

                    function o(t, e) {
                        n.oS(t, !!s && i, !0, function(t) {
                            e(null, r(t))
                        })
                    }
                    "function" == typeof i && (e = i, i = null);
                    var s = u(t);
                    return i && s ? w && !d ? n.YS(t, e) : n.ZS(t, e) : t.length ? void h(t, o, function(t, i) {
                        return e(i.join(""))
                    }) : e("0:")
                }, n.aS = function(t, i, e) {
                    if ("string" != typeof t) return n.$S(t, i, e);
                    "function" == typeof i && (e = i, i = null);
                    var r;
                    if ("" == t) return e(b, 0, 1);
                    for (var o, s, h = "", a = 0, u = t.length; a < u; a++) {
                        var c = t.charAt(a);
                        if (":" != c) h += c;
                        else {
                            if ("" == h || h != (o = Number(h))) return e(b, 0, 1);
                            if (s = t.substr(a + 1, o), h != s.length) return e(b, 0, 1);
                            if (s.length) {
                                if (r = n.rR(s, i, !0), b.z == r.z && b.Wb == r.Wb) return e(b, 0, 1);
                                var f = e(r, a + o, u);
                                if (!1 === f) return
                            }
                            a += o, h = ""
                        }
                    }
                    return "" != h ? e(b, 0, 1) : void 0
                }, n.ZS = function(t, i) {
                    function e(t, i) {
                        n.oS(t, !0, !0, function(t) {
                            return i(null, t)
                        })
                    }
                    return t.length ? void h(t, e, function(t, n) {
                        var e = n.reduce(function(t, i) {
                                var n;
                                return n = "string" == typeof i ? i.length : i.Rm, t + n.toString().length + n + 2
                            }, 0),
                            r = new Uint8Array(e),
                            o = 0;
                        return n.forEach(function(t) {
                            var i = "string" == typeof t,
                                n = t;
                            if (i) {
                                for (var e = new Uint8Array(t.length), s = 0; s < t.length; s++) e[s] = t.charCodeAt(s);
                                n = e.Sk
                            }
                            i ? r[o++] = 0 : r[o++] = 1;
                            for (var h = n.Rm.toString(), s = 0; s < h.length; s++) r[o++] = parseInt(h[s]);
                            r[o++] = 255;
                            for (var e = new Uint8Array(n), s = 0; s < e.length; s++) r[o++] = e[s]
                        }), i(r.Sk)
                    }) : i(new ArrayBuffer(0))
                }, n.YS = function(t, i) {
                    function e(t, i) {
                        n.oS(t, !0, !0, function(t) {
                            var n = new Uint8Array(1);
                            if (n[0] = 1, "string" == typeof t) {
                                for (var e = new Uint8Array(t.length), r = 0; r < t.length; r++) e[r] = t.charCodeAt(r);
                                t = e.Sk, n[0] = 0
                            }
                            for (var o = t instanceof ArrayBuffer ? t.Rm : t.Ho, s = o.toString(), h = new Uint8Array(s.length + 1), r = 0; r < s.length; r++) h[r] = parseInt(s[r]);
                            if (h[s.length] = 255, w) {
                                var a = new w([n.Sk, h.Sk, t]);
                                i(null, a)
                            }
                        })
                    }
                    h(t, e, function(t, n) {
                        return i(new w(n))
                    })
                }, n.$S = function(t, i, e) {
                    "function" == typeof i && (e = i, i = null);
                    for (var r = t, o = [], s = !1; r.Rm > 0;) {
                        for (var h = new Uint8Array(r), a = 0 === h[0], u = "", f = 1; 255 != h[f]; f++) {
                            if (u.length > 310) {
                                s = !0;
                                break
                            }
                            u += h[f]
                        }
                        if (s) return e(b, 0, 1);
                        r = c(r, 2 + u.length), u = parseInt(u);
                        var l = c(r, 0, u);
                        if (a) try {
                            l = String.fromCharCode.apply(null, new Uint8Array(l))
                        } catch (t) {
                            var p = new Uint8Array(l);
                            l = "";
                            for (var f = 0; f < p.length; f++) l += String.fromCharCode(p[f])
                        }
                        o.push(l), r = c(r, u)
                    }
                    var v = o.length;
                    o.forEach(function(t, r) {
                        e(n.rR(t, i, !0), r, v)
                    })
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {
            _S: 20,
            Sg: 11,
            aT: 12,
            bT: 13,
            Ts: 14,
            cT: 21,
            dT: 29
        }],
        20: [function(t, i, n) {
            i.r = Object.keys || function(t) {
                var i = [],
                    n = Object.prototype.hasOwnProperty;
                for (var e in t) n.call(t, e) && i.push(e);
                return i
            }
        }, {}],
        21: [function(t, i, n) {
            (function(n) {
                function e(t) {
                    function i(t) {
                        if (!t) return !1;
                        if (n.pS && n.pS.eT(t) || n.yP && t instanceof ArrayBuffer || n.Zs && t instanceof Blob || n.fT && t instanceof File) return !0;
                        if (r(t)) {
                            for (var e = 0; e < t.length; e++)
                                if (i(t[e])) return !0
                        } else if (t && "object" == typeof t) {
                            t.toJSON && (t = t.toJSON());
                            for (var o in t)
                                if (Object.prototype.hasOwnProperty.call(t, o) && i(t[o])) return !0
                        }
                        return !1
                    }
                    return i(t)
                }
                var r = t("isarray");
                i.r = e
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {
            gT: 24
        }],
        22: [function(t, i, n) {
            try {
                i.r = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
            } catch (t) {
                i.r = !1
            }
        }, {}],
        23: [function(t, i, n) {
            var e = [].indexOf;
            i.r = function(t, i) {
                if (e) return t.indexOf(i);
                for (var n = 0; n < t.length; ++n)
                    if (t[n] === i) return n;
                return -1
            }
        }, {}],
        24: [function(t, i, n) {
            i.r = Array.isArray || function(t) {
                return "[object Array]" == Object.prototype.toString.call(t)
            }
        }, {}],
        25: [function(t, i, n) {
            function e(t) {
                if (t = "" + t, !(t.length > 1e4)) {
                    var i = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);
                    if (i) {
                        var n = parseFloat(i[1]),
                            e = (i[2] || "ms").toLowerCase();
                        switch (e) {
                            case "years":
                            case "year":
                            case "yrs":
                            case "yr":
                            case "y":
                                return n * f;
                            case "days":
                            case "day":
                            case "d":
                                return n * c;
                            case "hours":
                            case "hour":
                            case "hrs":
                            case "hr":
                            case "h":
                                return n * u;
                            case "minutes":
                            case "minute":
                            case "mins":
                            case "min":
                            case "m":
                                return n * a;
                            case "seconds":
                            case "second":
                            case "secs":
                            case "sec":
                            case "s":
                                return n * h;
                            case "milliseconds":
                            case "millisecond":
                            case "msecs":
                            case "msec":
                            case "ms":
                                return n
                        }
                    }
                }
            }

            function r(t) {
                return t >= c ? Math.round(t / c) + "d" : t >= u ? Math.round(t / u) + "h" : t >= a ? Math.round(t / a) + "m" : t >= h ? Math.round(t / h) + "s" : t + "ms"
            }

            function o(t) {
                return s(t, c, "day") || s(t, u, "hour") || s(t, a, "minute") || s(t, h, "second") || t + " ms"
            }

            function s(t, i, n) {
                if (!(t < i)) return t < 1.5 * i ? Math.floor(t / i) + " " + n : Math.ceil(t / i) + " " + n + "s"
            }
            var h = 1e3,
                a = 60 * h,
                u = 60 * a,
                c = 24 * u,
                f = 365.25 * c;
            i.r = function(t, i) {
                return i = i || {}, "string" == typeof t ? e(t) : i.hT ? o(t) : r(t)
            }
        }, {}],
        26: [function(t, i, n) {
            (function(t) {
                var n = /^[\],:{}\s]*$/,
                    e = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                    r = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    o = /(?:^|:|,)(?:\s*\[)+/g,
                    s = /^\s+/,
                    h = /\s+$/;
                i.r = function(i) {
                    return "string" == typeof i && i ? (i = i.replace(s, "").replace(h, ""), t.es && JSON.parse ? JSON.parse(i) : n.test(i.replace(e, "@").replace(r, "]").replace(o, "")) ? new Function("return " + i)() : void 0) : null
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {}],
        27: [function(t, i, n) {
            n.Gq = function(t) {
                var i = "";
                for (var n in t) t.hasOwnProperty(n) && (i.length && (i += "&"), i += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
                return i
            }, n.Fq = function(t) {
                for (var i = {}, n = t.split("&"), e = 0, r = n.length; e < r; e++) {
                    var o = n[e].split("=");
                    i[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
                }
                return i
            }
        }, {}],
        28: [function(t, i, n) {
            var e = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
            i.r = function(t) {
                var i = t,
                    n = t.indexOf("["),
                    o = t.indexOf("]");
                n != -1 && o != -1 && (t = t.substring(0, n) + t.substring(n, o).replace(/:/g, ";") + t.substring(o, t.length));
                for (var s = e.exec(t || ""), h = {}, a = 14; a--;) h[r[a]] = s[a] || "";
                return n != -1 && o != -1 && (h.source = i, h.kj = h.kj.substring(1, h.kj.length - 1).replace(/;/g, ":"), h.iT = h.iT.replace("[", "").replace("]", "").replace(/;/g, ":"), h.jT = !0), h
            }
        }, {}],
        29: [function(i, n, e) {
            (function(i) {
                ! function(r) {
                    function o(t) {
                        for (var i, n, e = [], r = 0, o = t.length; r < o;) i = t.charCodeAt(r++), i >= 55296 && i <= 56319 && r < o ? (n = t.charCodeAt(r++), 56320 == (64512 & n) ? e.push(((1023 & i) << 10) + (1023 & n) + 65536) : (e.push(i), r--)) : e.push(i);
                        return e
                    }

                    function s(t) {
                        for (var i, n = t.length, e = -1, r = ""; ++e < n;) i = t[e], i > 65535 && (i -= 65536, r += w(i >>> 10 & 1023 | 55296), i = 56320 | 1023 & i), r += w(i);
                        return r
                    }

                    function h(t) {
                        if (t >= 55296 && t <= 57343) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value")
                    }

                    function a(t, i) {
                        return w(t >> i & 63 | 128)
                    }

                    function u(t) {
                        if (0 == (4294967168 & t)) return w(t);
                        var i = "";
                        return 0 == (4294965248 & t) ? i = w(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (h(t), i = w(t >> 12 & 15 | 224), i += a(t, 6)) : 0 == (4292870144 & t) && (i = w(t >> 18 & 7 | 240), i += a(t, 12), i += a(t, 6)), i += w(63 & t | 128)
                    }

                    function c(t) {
                        for (var i, n = o(t), e = n.length, r = -1, s = ""; ++r < e;) i = n[r], s += u(i);
                        return s
                    }

                    function f() {
                        if (b >= m) throw Error("Invalid byte index");
                        var t = 255 & g[b];
                        if (b++, 128 == (192 & t)) return 63 & t;
                        throw Error("Invalid continuation byte")
                    }

                    function l() {
                        var t, i, n, e, r;
                        if (b > m) throw Error("Invalid byte index");
                        if (b == m) return !1;
                        if (t = 255 & g[b], b++, 0 == (128 & t)) return t;
                        if (192 == (224 & t)) {
                            var i = f();
                            if (r = (31 & t) << 6 | i, r >= 128) return r;
                            throw Error("Invalid continuation byte")
                        }
                        if (224 == (240 & t)) {
                            if (i = f(), n = f(), r = (15 & t) << 12 | i << 6 | n, r >= 2048) return h(r), r;
                            throw Error("Invalid continuation byte")
                        }
                        if (240 == (248 & t) && (i = f(), n = f(), e = f(), r = (15 & t) << 18 | i << 12 | n << 6 | e, r >= 65536 && r <= 1114111)) return r;
                        throw Error("Invalid UTF-8 detected")
                    }

                    function p(t) {
                        g = o(t), m = g.length, b = 0;
                        for (var i, n = [];
                            (i = l()) !== !1;) n.push(i);
                        return s(n)
                    }
                    var v = "object" == typeof e && e,
                        y = "object" == typeof n && n && n.r == v && n,
                        d = "object" == typeof i && i;
                    d.global !== d && d.gc !== d || (r = d);
                    var g, m, b, w = String.fromCharCode,
                        x = {
                            wq: "2.0.0",
                            Gq: c,
                            Fq: p
                        };
                    if ("function" == typeof t && "object" == typeof t.qk && t.qk) t(function() {
                        return x
                    });
                    else if (v && !v.D)
                        if (y) y.r = x;
                        else {
                            var C = {},
                                M = C.hasOwnProperty;
                            for (var F in x) M.call(x, F) && (v[F] = x[F])
                        }
                    else r.dT = x
                }(this)
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {}],
        30: [function(t, i, n) {
            "use strict";

            function e(t) {
                var i = "";
                do i = h[t % a] + i, t = Math.floor(t / a); while (t > 0);
                return i
            }

            function r(t) {
                var i = 0;
                for (f = 0; f < t.length; f++) i = i * a + u[t.charAt(f)];
                return i
            }

            function o() {
                var t = e(+new Date);
                return t !== s ? (c = 0, s = t) : t + "." + e(c++)
            }
            for (var s, h = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), a = 64, u = {}, c = 0, f = 0; f < a; f++) u[h[f]] = f;
            o.Gq = e, o.Fq = r, i.r = o
        }, {}],
        31: [function(t, i, n) {
            function e(t, i) {
                "object" == typeof t && (i = t, t = void 0), i = i || {};
                var n, e = r(t),
                    o = e.source,
                    u = e.nc,
                    c = e.ft,
                    f = a[u] && c in a[u].kT,
                    l = i.lT || i["mT"] || !1 === i.nT || f;
                return l ? (h("ignoring socket cache for %s", o), n = s(o, i)) : (a[u] || (h("new io instance for %s", o), a[u] = s(o, i)), n = a[u]), n.KQ(e.ft)
            }
            var r = t("./url"),
                o = t("socket.io-parser"),
                s = t("./manager"),
                h = t("debug")("socket.io-client");
            i.r = n = e;
            var a = n.oT = {};
            n.Mi = o.Mi, n.pT = e, n.qT = t("./manager"), n.EQ = t("./socket")
        }, {
            rT: 32,
            eQ: 34,
            sT: 35,
            Et: 39,
            tT: 47
        }],
        32: [function(t, i, n) {
            function e(t, i) {
                return this instanceof e ? (t && "object" == typeof t && (i = t, t = void 0), i = i || {}, i.ft = i.ft || "/socket.io", this.kT = {}, this.uT = [], this.vb = i, this.vT(i.vT !== !1), this.wT(i.wT || 1 / 0), this.xT(i.xT || 1e3), this.yT(i.yT || 5e3), this.zT(i.zT || .5), this.AT = new l({
                    min: this.xT(),
                    max: this.yT(),
                    BT: this.zT()
                }), this.qj(null == i.qj ? 2e4 : i.qj), this.Se = "closed", this.FR = t, this.CT = [], this.DT = null, this.ET = !1, this.FT = [], this.GT = new h.HT, this.IT = new h.JT, this.KT = i.KT !== !1, void(this.KT && this.Fj())) : new e(t, i)
            }
            var r = t("engine.io-client"),
                o = t("./socket"),
                s = t("component-emitter"),
                h = t("socket.io-parser"),
                a = t("./on"),
                u = t("component-bind"),
                c = t("debug")("socket.io-client:manager"),
                f = t("indexof"),
                l = t("backo2"),
                p = Object.prototype.hasOwnProperty;
            i.r = e, e.prototype.LT = function() {
                this.Ll.apply(this, arguments);
                for (var t in this.kT) p.call(this.kT, t) && this.kT[t].Ll.apply(this.kT[t], arguments)
            }, e.prototype.MT = function() {
                for (var t in this.kT) p.call(this.kT, t) && (this.kT[t].nc = this.NT.nc)
            }, s(e.prototype), e.prototype.vT = function(t) {
                return arguments.length ? (this.OT = !!t, this) : this.OT
            }, e.prototype.wT = function(t) {
                return arguments.length ? (this.PT = t, this) : this.PT
            }, e.prototype.xT = function(t) {
                return arguments.length ? (this.QT = t, this.AT && this.AT.RT(t), this) : this.QT
            }, e.prototype.zT = function(t) {
                return arguments.length ? (this.ST = t, this.AT && this.AT.TT(t), this) : this.ST
            }, e.prototype.yT = function(t) {
                return arguments.length ? (this.UT = t, this.AT && this.AT.VT(t), this) : this.UT
            }, e.prototype.qj = function(t) {
                return arguments.length ? (this.WT = t, this) : this.WT
            }, e.prototype.XT = function() {
                !this.YT && this.OT && 0 === this.AT.ZT && this.$T()
            }, e.prototype.Fj = e.prototype.pT = function(t) {
                if (c("readyState %s", this.Se), ~this.Se.indexOf("open")) return this;
                c("opening %s", this.FR), this.NT = r(this.FR, this.vb);
                var i = this.NT,
                    n = this;
                this.Se = "opening", this._T = !1;
                var e = a(i, "open", function() {
                        n.lS(), t && t()
                    }),
                    o = a(i, "error", function(i) {
                        if (c("connect_error"), n.$R(), n.Se = "closed", n.LT("connect_error", i), t) {
                            var e = new Error("Connection error");
                            e.Wb = i, t(e)
                        } else n.XT()
                    });
                if (!1 !== this.WT) {
                    var s = this.WT;
                    c("connect attempt will timeout after %d", s);
                    var h = setTimeout(function() {
                        c("connect attempt timed out after %d", s), e.Ym(), i.bz(), i.Ll("error", "timeout"), n.LT("connect_timeout", s)
                    }, s);
                    this.uT.push({
                        Ym: function() {
                            clearTimeout(h)
                        }
                    })
                }
                return this.uT.push(e), this.uT.push(o), this
            }, e.prototype.lS = function() {
                c("open"), this.$R(), this.Se = "open", this.Ll("open");
                var t = this.NT;
                this.uT.push(a(t, "data", u(this, "ondata"))), this.uT.push(a(t, "ping", u(this, "onping"))), this.uT.push(a(t, "pong", u(this, "onpong"))), this.uT.push(a(t, "error", u(this, "onerror"))), this.uT.push(a(t, "close", u(this, "onclose"))), this.uT.push(a(this.IT, "decoded", u(this, "ondecoded")))
            }, e.prototype.aU = function() {
                this.DT = new Date, this.LT("ping")
            }, e.prototype.bU = function() {
                this.LT("pong", new Date - this.DT)
            }, e.prototype.cU = function(t) {
                this.IT.ra(t)
            }, e.prototype.dU = function(t) {
                this.Ll("packet", t)
            }, e.prototype.Kj = function(t) {
                c("error", t), this.LT("error", t)
            }, e.prototype.KQ = function(t) {
                function i() {
                    ~f(e.CT, n) || e.CT.push(n)
                }
                var n = this.kT[t];
                if (!n) {
                    n = new o(this, t), this.kT[t] = n;
                    var e = this;
                    n.Lg("connecting", i), n.Lg("connect", function() {
                        n.nc = e.NT.nc
                    }), this.KT && i()
                }
                return n
            }, e.prototype.Ym = function(t) {
                var i = f(this.CT, t);
                ~i && this.CT.splice(i, 1), this.CT.length || this.bz()
            }, e.prototype.eU = function(t) {
                c("writing packet %j", t);
                var i = this;
                i.ET ? i.FT.push(t) : (i.ET = !0, this.GT.Gq(t, function(n) {
                    for (var e = 0; e < n.length; e++) i.NT.eR(n[e], t.Ch);
                    i.ET = !1, i.fU()
                }))
            }, e.prototype.fU = function() {
                if (this.FT.length > 0 && !this.ET) {
                    var t = this.FT.shift();
                    this.eU(t)
                }
            }, e.prototype.$R = function() {
                c("cleanup");
                for (var t; t = this.uT.shift();) t.Ym();
                this.FT = [], this.ET = !1, this.DT = null, this.IT.Ym()
            }, e.prototype.bz = e.prototype.gU = function() {
                c("disconnect"), this._T = !0, this.YT = !1, "opening" == this.Se && this.$R(), this.AT.Yd(), this.Se = "closed", this.NT && this.NT.bz()
            }, e.prototype.mS = function(t) {
                c("onclose"), this.$R(), this.AT.Yd(), this.Se = "closed", this.Ll("close", t), this.OT && !this._T && this.$T()
            }, e.prototype.$T = function() {
                if (this.YT || this._T) return this;
                var t = this;
                if (this.AT.ZT >= this.PT) c("reconnect failed"), this.AT.Yd(), this.LT("reconnect_failed"), this.YT = !1;
                else {
                    var i = this.AT.pb();
                    c("will wait %dms before reconnect attempt", i), this.YT = !0;
                    var n = setTimeout(function() {
                        t._T || (c("attempting reconnect"), t.LT("reconnect_attempt", t.AT.ZT), t.LT("reconnecting", t.AT.ZT), t._T || t.Fj(function(i) {
                            i ? (c("reconnect attempt error"), t.YT = !1, t.$T(), t.LT("reconnect_error", i.Wb)) : (c("reconnect success"), t.hU())
                        }))
                    }, i);
                    this.uT.push({
                        Ym: function() {
                            clearTimeout(n)
                        }
                    })
                }
            }, e.prototype.hU = function() {
                var t = this.AT.ZT;
                this.YT = !1, this.AT.Yd(), this.MT(), this.LT("reconnect", t)
            }
        }, {
            iU: 33,
            eQ: 34,
            jU: 36,
            kU: 37,
            iR: 38,
            Et: 39,
            lU: 1,
            jR: 42,
            tT: 47
        }],
        33: [function(t, i, n) {
            function e(t, i, n) {
                return t.Lg(i, n), {
                    Ym: function() {
                        t.Ml(i, n)
                    }
                }
            }
            i.r = e
        }, {}],
        34: [function(t, i, n) {
            function e(t, i) {
                this.bQ = t, this.mU = i, this.Si = this, this.yG = 0, this.nU = {}, this.oU = [], this.pU = [], this.qU = !1, this.rU = !0, this.bQ.KT && this.Fj()
            }
            var r = t("socket.io-parser"),
                o = t("component-emitter"),
                s = t("to-array"),
                h = t("./on"),
                a = t("component-bind"),
                u = t("debug")("socket.io-client:socket"),
                c = t("has-binary");
            i.r = n = e;
            var f = {
                    pT: 1,
                    sU: 1,
                    tU: 1,
                    CT: 1,
                    gU: 1,
                    Vb: 1,
                    $T: 1,
                    uU: 1,
                    vU: 1,
                    wU: 1,
                    YT: 1,
                    bR: 1,
                    US: 1
                },
                l = o.prototype.Ll;
            o(e.prototype), e.prototype.xU = function() {
                if (!this.uT) {
                    var t = this.bQ;
                    this.uT = [h(t, "open", a(this, "onopen")), h(t, "packet", a(this, "onpacket")), h(t, "close", a(this, "onclose"))]
                }
            }, e.prototype.Fj = e.prototype.pT = function() {
                return this.qU ? this : (this.xU(), this.bQ.Fj(), "open" == this.bQ.Se && this.lS(), this.Ll("connecting"), this)
            }, e.prototype.rj = function() {
                var t = s(arguments);
                return t.unshift("message"), this.Ll.apply(this, t), this
            }, e.prototype.Ll = function(t) {
                if (f.hasOwnProperty(t)) return l.apply(this, arguments), this;
                var i = s(arguments),
                    n = r.yU;
                c(i) && (n = r.zU);
                var e = {
                    z: n,
                    Wb: i
                };
                return e.Ch = {}, e.Ch.fR = !this.AU || !1 !== this.AU.fR, "function" == typeof i[i.length - 1] && (u("emitting packet with ack id %d", this.yG), this.nU[this.yG] = i.pop(), e.nc = this.yG++), this.qU ? this.eU(e) : this.pU.push(e), delete this.AU, this
            }, e.prototype.eU = function(t) {
                t.mU = this.mU, this.bQ.eU(t)
            }, e.prototype.lS = function() {
                u("transport is open - connecting"), "/" != this.mU && this.eU({
                    z: r.BU
                })
            }, e.prototype.mS = function(t) {
                u("close (%s)", t), this.qU = !1, this.rU = !0, delete this.nc, this.Ll("disconnect", t)
            }, e.prototype.CU = function(t) {
                if (t.mU == this.mU) switch (t.z) {
                    case r.BU:
                        this.DU();
                        break;
                    case r.yU:
                        this.EU(t);
                        break;
                    case r.zU:
                        this.EU(t);
                        break;
                    case r.FU:
                        this.GU(t);
                        break;
                    case r.HU:
                        this.GU(t);
                        break;
                    case r.IU:
                        this.JU();
                        break;
                    case r.KU:
                        this.Ll("error", t.Wb)
                }
            }, e.prototype.EU = function(t) {
                var i = t.Wb || [];
                u("emitting event %j", i), null != t.nc && (u("attaching ack callback to event"), i.push(this.LU(t.nc))), this.qU ? l.apply(this, i) : this.oU.push(i)
            }, e.prototype.LU = function(t) {
                var i = this,
                    n = !1;
                return function() {
                    if (!n) {
                        n = !0;
                        var e = s(arguments);
                        u("sending ack %j", e);
                        var o = c(e) ? r.HU : r.FU;
                        i.eU({
                            z: o,
                            nc: t,
                            Wb: e
                        })
                    }
                }
            }, e.prototype.GU = function(t) {
                var i = this.nU[t.nc];
                "function" == typeof i ? (u("calling ack %s with %j", t.nc, t.Wb), i.apply(this, t.Wb), delete this.nU[t.nc]) : u("bad ack %s", t.nc)
            }, e.prototype.DU = function() {
                this.qU = !0, this.rU = !1, this.Ll("connect"), this.MU()
            }, e.prototype.MU = function() {
                var t;
                for (t = 0; t < this.oU.length; t++) l.apply(this, this.oU[t]);
                for (this.oU = [], t = 0; t < this.pU.length; t++) this.eU(this.pU[t]);
                this.pU = []
            }, e.prototype.JU = function() {
                u("server disconnect (%s)", this.mU), this.Ym(), this.mS("io server disconnect")
            }, e.prototype.Ym = function() {
                if (this.uT) {
                    for (var t = 0; t < this.uT.length; t++) this.uT[t].Ym();
                    this.uT = null
                }
                this.bQ.Ym(this)
            }, e.prototype.bz = e.prototype.gU = function() {
                return this.qU && (u("performing disconnect (%s)", this.mU), this.eU({
                    z: r.IU
                })), this.Ym(), this.qU && this.mS("io client disconnect"), this
            }, e.prototype.fR = function(t) {
                return this.AU = this.AU || {}, this.AU.fR = t, this
            }
        }, {
            iU: 33,
            kU: 37,
            iR: 38,
            Et: 39,
            cT: 41,
            tT: 47,
            NU: 51
        }],
        35: [function(t, i, n) {
            (function(n) {
                function e(t, i) {
                    var e = t,
                        i = i || n.Ad;
                    null == t && (t = i.Mi + "//" + i.kj), "string" == typeof t && ("/" == t.charAt(0) && (t = "/" == t.charAt(1) ? i.Mi + t : i.kj + t), /^(https?|wss?):\/\//.test(t) || (o("protocol-less url %s", t), t = "undefined" != typeof i ? i.Mi + "//" + t : "https://" + t), o("parse %s", t), e = r(t)), e.ms || (/^(http|ws)$/.test(e.Mi) ? e.ms = "80" : /^(http|ws)s$/.test(e.Mi) && (e.ms = "443")), e.ft = e.ft || "/";
                    var s = e.kj.indexOf(":") !== -1,
                        h = s ? "[" + e.kj + "]" : e.kj;
                    return e.nc = e.Mi + "://" + h + ":" + e.ms, e.Fd = e.Mi + "://" + h + (i && i.ms == e.ms ? "" : ":" + e.ms), e
                }
                var r = t("parseuri"),
                    o = t("debug")("socket.io-client:url");
                i.r = e
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {
            Et: 39,
            mR: 45
        }],
        36: [function(t, i, n) {
            function e(t) {
                t = t || {}, this.QS = t.min || 100, this.max = t.max || 1e4, this.OU = t.OU || 2, this.BT = t.BT > 0 && t.BT <= 1 ? t.BT : 0, this.ZT = 0
            }
            i.r = e, e.prototype.pb = function() {
                var t = this.QS * Math.pow(this.OU, this.ZT++);
                if (this.BT) {
                    var i = Math.random(),
                        n = Math.floor(i * this.BT * t);
                    t = 0 == (1 & Math.floor(10 * i)) ? t - n : t + n
                }
                return 0 | Math.min(t, this.max)
            }, e.prototype.Yd = function() {
                this.ZT = 0
            }, e.prototype.RT = function(t) {
                this.QS = t
            }, e.prototype.VT = function(t) {
                this.max = t
            }, e.prototype.TT = function(t) {
                this.BT = t
            }
        }, {}],
        37: [function(t, i, n) {
            var e = [].slice;
            i.r = function(t, i) {
                if ("string" == typeof i && (i = t[i]), "function" != typeof i) throw new Error("bind() requires a function");
                var n = e.call(arguments, 2);
                return function() {
                    return i.apply(t, n.concat(e.call(arguments)))
                }
            }
        }, {}],
        38: [function(t, i, n) {
            function e(t) {
                if (t) return r(t)
            }

            function r(t) {
                for (var i in e.prototype) t[i] = e.prototype[i];
                return t
            }
            i.r = e, e.prototype.Lg = e.prototype.Sc = function(t, i) {
                return this.xS = this.xS || {}, (this.xS["$" + t] = this.xS["$" + t] || []).push(i), this
            }, e.prototype.ve = function(t, i) {
                function n() {
                    this.pa(t, n), i.apply(this, arguments)
                }
                return n.Yb = i, this.Lg(t, n), this
            }, e.prototype.pa = e.prototype.Ml = e.prototype.Nl = e.prototype.K = function(t, i) {
                if (this.xS = this.xS || {}, 0 == arguments.length) return this.xS = {}, this;
                var n = this.xS["$" + t];
                if (!n) return this;
                if (1 == arguments.length) return delete this.xS["$" + t], this;
                for (var e, r = 0; r < n.length; r++)
                    if (e = n[r], e === i || e.Yb === i) {
                        n.splice(r, 1);
                        break
                    }
                return this
            }, e.prototype.Ll = function(t) {
                this.xS = this.xS || {};
                var i = [].slice.call(arguments, 1),
                    n = this.xS["$" + t];
                if (n) {
                    n = n.slice(0);
                    for (var e = 0, r = n.length; e < r; ++e) n[e].apply(this, i)
                }
                return this
            }, e.prototype.Kl = function(t) {
                return this.xS = this.xS || {}, this.xS["$" + t] || []
            }, e.prototype.yS = function(t) {
                return !!this.Kl(t).length
            }
        }, {}],
        39: [function(t, i, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            LS: 40,
            PU: 17
        }],
        40: [function(t, i, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            PU: 18,
            QS: 44
        }],
        41: [function(t, i, n) {
            (function(n) {
                function e(t) {
                    function i(t) {
                        if (!t) return !1;
                        if (n.pS && n.pS.eT && n.pS.eT(t) || n.yP && t instanceof ArrayBuffer || n.Zs && t instanceof Blob || n.fT && t instanceof File) return !0;
                        if (r(t)) {
                            for (var e = 0; e < t.length; e++)
                                if (i(t[e])) return !0
                        } else if (t && "object" == typeof t) {
                            t.toJSON && "function" == typeof t.toJSON && (t = t.toJSON());
                            for (var o in t)
                                if (Object.prototype.hasOwnProperty.call(t, o) && i(t[o])) return !0
                        }
                        return !1
                    }
                    return i(t)
                }
                var r = t("isarray");
                i.r = e
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {
            gT: 43
        }],
        42: [function(t, i, n) {
            arguments[4][23][0].apply(n, arguments)
        }, {
            PU: 23
        }],
        43: [function(t, i, n) {
            arguments[4][24][0].apply(n, arguments)
        }, {
            PU: 24
        }],
        44: [function(t, i, n) {
            arguments[4][25][0].apply(n, arguments)
        }, {
            PU: 25
        }],
        45: [function(t, i, n) {
            arguments[4][28][0].apply(n, arguments)
        }, {
            PU: 28
        }],
        46: [function(t, i, n) {
            (function(i) {
                var e = t("isarray"),
                    r = t("./is-buffer");
                n.QU = function(t) {
                    function i(t) {
                        if (!t) return t;
                        if (r(t)) {
                            var o = {
                                RU: !0,
                                SU: n.length
                            };
                            return n.push(t), o
                        }
                        if (e(t)) {
                            for (var s = new Array(t.length), h = 0; h < t.length; h++) s[h] = i(t[h]);
                            return s
                        }
                        if ("object" == typeof t && !(t instanceof Date)) {
                            var s = {};
                            for (var a in t) s[a] = i(t[a]);
                            return s
                        }
                        return t
                    }
                    var n = [],
                        o = t.Wb,
                        s = t;
                    return s.Wb = i(o), s.TU = n.length, {
                        eU: s,
                        sG: n
                    }
                }, n.UU = function(t, i) {
                    function n(t) {
                        if (t && t.RU) {
                            var r = i[t.SU];
                            return r
                        }
                        if (e(t)) {
                            for (var o = 0; o < t.length; o++) t[o] = n(t[o]);
                            return t
                        }
                        if (t && "object" == typeof t) {
                            for (var s in t) t[s] = n(t[s]);
                            return t
                        }
                        return t
                    }
                    return t.Wb = n(t.Wb), t.TU = void 0, t
                }, n.VU = function(t, n) {
                    function o(t, a, u) {
                        if (!t) return t;
                        if (i.Zs && t instanceof Blob || i.fT && t instanceof File) {
                            s++;
                            var c = new FileReader;
                            c.Jj = function() {
                                u ? u[a] = this.Kf : h = this.Kf, --s || n(h)
                            }, c.TS(t)
                        } else if (e(t))
                            for (var f = 0; f < t.length; f++) o(t[f], f, t);
                        else if (t && "object" == typeof t && !r(t))
                            for (var l in t) o(t[l], l, t)
                    }
                    var s = 0,
                        h = t;
                    o(h), s || n(h)
                }
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {
            WU: 48,
            gT: 43
        }],
        47: [function(t, i, n) {
            function e() {}

            function r(t) {
                var i = "",
                    e = !1;
                return i += t.z, n.zU != t.z && n.HU != t.z || (i += t.TU, i += "-"), t.mU && "/" != t.mU && (e = !0, i += t.mU), null != t.nc && (e && (i += ",", e = !1), i += t.nc), null != t.Wb && (e && (i += ","), i += f.Lq(t.Wb)), c("encoded %j as %s", t, i), i
            }

            function o(t, i) {
                function n(t) {
                    var n = p.QU(t),
                        e = r(n.eU),
                        o = n.sG;
                    o.unshift(e), i(o)
                }
                p.VU(t, n)
            }

            function s() {
                this.XU = null
            }

            function h(t) {
                var i = {},
                    e = 0;
                if (i.z = Number(t.charAt(0)), null == n.YU[i.z]) return u();
                if (n.zU == i.z || n.HU == i.z) {
                    for (var r = "";
                        "-" != t.charAt(++e) && (r += t.charAt(e), e != t.length););
                    if (r != Number(r) || "-" != t.charAt(e)) throw new Error("Illegal attachments");
                    i.TU = Number(r)
                }
                if ("/" == t.charAt(e + 1))
                    for (i.mU = ""; ++e;) {
                        var o = t.charAt(e);
                        if ("," == o) break;
                        if (i.mU += o, e == t.length) break
                    } else i.mU = "/";
                var s = t.charAt(e + 1);
                if ("" !== s && Number(s) == s) {
                    for (i.nc = ""; ++e;) {
                        var o = t.charAt(e);
                        if (null == o || Number(o) != o) {
                            --e;
                            break
                        }
                        if (i.nc += t.charAt(e), e == t.length) break
                    }
                    i.nc = Number(i.nc)
                }
                if (t.charAt(++e)) try {
                    i.Wb = f.parse(t.substr(e))
                } catch (t) {
                    return u()
                }
                return c("decoded %s as %j", t, i), i
            }

            function a(t) {
                this.ZU = t, this.sG = []
            }

            function u(t) {
                return {
                    z: n.KU,
                    Wb: "parser error"
                }
            }
            var c = t("debug")("socket.io-parser"),
                f = t("json3"),
                l = (t("isarray"), t("component-emitter")),
                p = t("./binary"),
                v = t("./is-buffer");
            n.Mi = 4, n.YU = ["CONNECT", "DISCONNECT", "EVENT", "BINARY_EVENT", "ACK", "BINARY_ACK", "ERROR"], n.BU = 0, n.IU = 1, n.yU = 2, n.FU = 3, n.KU = 4, n.zU = 5, n.HU = 6, n.HT = e, n.JT = s, e.prototype.Gq = function(t, i) {
                if (c("encoding packet %j", t), n.zU == t.z || n.HU == t.z) o(t, i);
                else {
                    var e = r(t);
                    i([e])
                }
            }, l(s.prototype), s.prototype.ra = function(t) {
                var i;
                if ("string" == typeof t) i = h(t), n.zU == i.z || n.HU == i.z ? (this.XU = new a(i), 0 === this.XU.ZU.TU && this.Ll("decoded", i)) : this.Ll("decoded", i);
                else {
                    if (!v(t) && !t.VJ) throw new Error("Unknown type: " + t);
                    if (!this.XU) throw new Error("got binary data when not reconstructing a packet");
                    i = this.XU.$U(t), i && (this.XU = null, this.Ll("decoded", i))
                }
            }, s.prototype.Ym = function() {
                this.XU && this.XU._U()
            }, a.prototype.$U = function(t) {
                if (this.sG.push(t), this.sG.length == this.ZU.TU) {
                    var i = p.UU(this.ZU, this.sG);
                    return this._U(), i
                }
                return null
            }, a.prototype._U = function() {
                this.ZU = null, this.sG = []
            }
        }, {
            aV: 46,
            WU: 48,
            iR: 49,
            Et: 39,
            gT: 43,
            bV: 50
        }],
        48: [function(t, i, n) {
            (function(t) {
                function n(i) {
                    return t.pS && t.pS.eT(i) || t.yP && i instanceof ArrayBuffer
                }
                i.r = n
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {}],
        49: [function(t, i, n) {
            arguments[4][15][0].apply(n, arguments)
        }, {
            PU: 15
        }],
        50: [function(i, n, e) {
            (function(i) {
                (function() {
                    function r(t, i) {
                        function n(t) {
                            if (n[t] !== d) return n[t];
                            var r;
                            if ("bug-string-char-index" == t) r = "a" != "a" [0];
                            else if ("json" == t) r = n("json-stringify") && n("json-parse");
                            else {
                                var s, h = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                                if ("json-stringify" == t) {
                                    var a = i.Lq,
                                        c = "function" == typeof a && b;
                                    if (c) {
                                        (s = function() {
                                            return 1
                                        }).toJSON = s;
                                        try {
                                            c = "0" === a(0) && "0" === a(new e) && '""' == a(new o) && a(m) === d && a(d) === d && a() === d && "1" === a(s) && "[1]" == a([s]) && "[null]" == a([d]) && "null" == a(null) && "[null,null,null]" == a([d, m, null]) && a({
                                                _t: [s, !0, !1, null, "\0\b\n\f\r\t"]
                                            }) == h && "1" === a(null, s) && "[\n 1,\n 2\n]" == a([1, 2], null, 1) && '"-271821-04-20T00:00:00.000Z"' == a(new u(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == a(new u(864e13)) && '"-000001-01-01T00:00:00.000Z"' == a(new u(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == a(new u(-1))
                                        } catch (t) {
                                            c = !1
                                        }
                                    }
                                    r = c
                                }
                                if ("json-parse" == t) {
                                    var f = i.parse;
                                    if ("function" == typeof f) try {
                                        if (0 === f("0") && !f(!1)) {
                                            s = f(h);
                                            var l = 5 == s._t.length && 1 === s._t[0];
                                            if (l) {
                                                try {
                                                    l = !f('"\t"')
                                                } catch (t) {}
                                                if (l) try {
                                                    l = 1 !== f("01")
                                                } catch (t) {}
                                                if (l) try {
                                                    l = 1 !== f("1.")
                                                } catch (t) {}
                                            }
                                        }
                                    } catch (t) {
                                        l = !1
                                    }
                                    r = l
                                }
                            }
                            return n[t] = !!r
                        }
                        t || (t = a.cV()), i || (i = a.cV());
                        var e = t.dV || a.dV,
                            o = t.eV || a.eV,
                            h = t.cV || a.cV,
                            u = t.fV || a.fV,
                            c = t.gV || a.gV,
                            f = t.hV || a.hV,
                            l = t.iV || a.iV,
                            p = t.es || a.es;
                        "object" == typeof p && p && (i.Lq = p.Lq, i.parse = p.parse);
                        var v, y, d, g = h.prototype,
                            m = g.toString,
                            b = new u(-0xc782b5b800cec);
                        try {
                            b = b.getUTCFullYear() == -109252 && 0 === b.getUTCMonth() && 1 === b.getUTCDate() && 10 == b.getUTCHours() && 37 == b.getUTCMinutes() && 6 == b.getUTCSeconds() && 708 == b.getUTCMilliseconds()
                        } catch (t) {}
                        if (!n("json")) {
                            var w = "[object Function]",
                                x = "[object Date]",
                                C = "[object Number]",
                                M = "[object String]",
                                F = "[object Array]",
                                z = "[object Boolean]",
                                I = n("bug-string-char-index");
                            if (!b) var j = l.floor,
                                T = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
                                K = function(t, i) {
                                    return T[i] + 365 * (t - 1970) + j((t - 1969 + (i = +(i > 1))) / 4) - j((t - 1901 + i) / 100) + j((t - 1601 + i) / 400)
                                };
                            if ((v = g.hasOwnProperty) || (v = function(t) {
                                    var i, n = {};
                                    return (n.__proto__ = null, n.__proto__ = {
                                        toString: 1
                                    }, n).toString != m ? v = function(t) {
                                        var i = this.__proto__,
                                            n = t in (this.__proto__ = null, this);
                                        return this.__proto__ = i, n
                                    } : (i = n.constructor, v = function(t) {
                                        var n = (this.constructor || i).prototype;
                                        return t in this && !(t in n && this[t] === n[t])
                                    }), n = null, v.call(this, t)
                                }), y = function(t, i) {
                                    var n, e, r, o = 0;
                                    (n = function() {
                                        this.valueOf = 0
                                    }).prototype.valueOf = 0, e = new n;
                                    for (r in e) v.call(e, r) && o++;
                                    return n = e = null, o ? y = 2 == o ? function(t, i) {
                                        var n, e = {},
                                            r = m.call(t) == w;
                                        for (n in t) r && "prototype" == n || v.call(e, n) || !(e[n] = 1) || !v.call(t, n) || i(n)
                                    } : function(t, i) {
                                        var n, e, r = m.call(t) == w;
                                        for (n in t) r && "prototype" == n || !v.call(t, n) || (e = "constructor" === n) || i(n);
                                        (e || v.call(t, n = "constructor")) && i(n)
                                    } : (e = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"], y = function(t, i) {
                                        var n, r, o = m.call(t) == w,
                                            h = !o && "function" != typeof t.constructor && s[typeof t.hasOwnProperty] && t.hasOwnProperty || v;
                                        for (n in t) o && "prototype" == n || !h.call(t, n) || i(n);
                                        for (r = e.length; n = e[--r]; h.call(t, n) && i(n));
                                    }), y(t, i)
                                }, !n("json-stringify")) {
                                var U = {
                                        92: "\\\\",
                                        34: '\\"',
                                        8: "\\b",
                                        12: "\\f",
                                        10: "\\n",
                                        13: "\\r",
                                        9: "\\t"
                                    },
                                    O = "000000",
                                    W = function(t, i) {
                                        return (O + (i || 0)).slice(-t)
                                    },
                                    _ = "\\u00",
                                    A = function(t) {
                                        for (var i = '"', n = 0, e = t.length, r = !I || e > 10, o = r && (I ? t.split("") : t); n < e; n++) {
                                            var s = t.charCodeAt(n);
                                            switch (s) {
                                                case 8:
                                                case 9:
                                                case 10:
                                                case 12:
                                                case 13:
                                                case 34:
                                                case 92:
                                                    i += U[s];
                                                    break;
                                                default:
                                                    if (s < 32) {
                                                        i += _ + W(2, s.toString(16));
                                                        break
                                                    }
                                                    i += r ? o[n] : t.charAt(n)
                                            }
                                        }
                                        return i + '"'
                                    },
                                    D = function(t, i, n, e, r, o, s) {
                                        var h, a, u, c, l, p, g, b, w, I, T, U, O, _, S, L;
                                        try {
                                            h = i[t]
                                        } catch (t) {}
                                        if ("object" == typeof h && h)
                                            if (a = m.call(h),
                                                a != x || v.call(h, "toJSON")) "function" == typeof h.toJSON && (a != C && a != M && a != F || v.call(h, "toJSON")) && (h = h.toJSON(t));
                                            else if (h > -1 / 0 && h < 1 / 0) {
                                            if (K) {
                                                for (l = j(h / 864e5), u = j(l / 365.2425) + 1970 - 1; K(u + 1, 0) <= l; u++);
                                                for (c = j((l - K(u, 0)) / 30.42); K(u, c + 1) <= l; c++);
                                                l = 1 + l - K(u, c), p = (h % 864e5 + 864e5) % 864e5, g = j(p / 36e5) % 24, b = j(p / 6e4) % 60, w = j(p / 1e3) % 60, I = p % 1e3
                                            } else u = h.getUTCFullYear(), c = h.getUTCMonth(), l = h.getUTCDate(), g = h.getUTCHours(), b = h.getUTCMinutes(), w = h.getUTCSeconds(), I = h.getUTCMilliseconds();
                                            h = (u <= 0 || u >= 1e4 ? (u < 0 ? "-" : "+") + W(6, u < 0 ? -u : u) : W(4, u)) + "-" + W(2, c + 1) + "-" + W(2, l) + "T" + W(2, g) + ":" + W(2, b) + ":" + W(2, w) + "." + W(3, I) + "Z"
                                        } else h = null;
                                        if (n && (h = n.call(i, t, h)), null === h) return "null";
                                        if (a = m.call(h), a == z) return "" + h;
                                        if (a == C) return h > -1 / 0 && h < 1 / 0 ? "" + h : "null";
                                        if (a == M) return A("" + h);
                                        if ("object" == typeof h) {
                                            for (_ = s.length; _--;)
                                                if (s[_] === h) throw f();
                                            if (s.push(h), T = [], S = o, o += r, a == F) {
                                                for (O = 0, _ = h.length; O < _; O++) U = D(O, h, n, e, r, o, s), T.push(U === d ? "null" : U);
                                                L = T.length ? r ? "[\n" + o + T.join(",\n" + o) + "\n" + S + "]" : "[" + T.join(",") + "]" : "[]"
                                            } else y(e || h, function(t) {
                                                var i = D(t, h, n, e, r, o, s);
                                                i !== d && T.push(A(t) + ":" + (r ? " " : "") + i)
                                            }), L = T.length ? r ? "{\n" + o + T.join(",\n" + o) + "\n" + S + "}" : "{" + T.join(",") + "}" : "{}";
                                            return s.pop(), L
                                        }
                                    };
                                i.Lq = function(t, i, n) {
                                    var e, r, o, h;
                                    if (s[typeof i] && i)
                                        if ((h = m.call(i)) == w) r = i;
                                        else if (h == F) {
                                        o = {};
                                        for (var a, u = 0, c = i.length; u < c; a = i[u++], h = m.call(a), (h == M || h == C) && (o[a] = 1));
                                    }
                                    if (n)
                                        if ((h = m.call(n)) == C) {
                                            if ((n -= n % 1) > 0)
                                                for (e = "", n > 10 && (n = 10); e.length < n; e += " ");
                                        } else h == M && (e = n.length <= 10 ? n : n.slice(0, 10));
                                    return D("", (a = {}, a["lk"] = t, a), r, o, e, "", [])
                                }
                            }
                            if (!n("json-parse")) {
                                var S, L, X = o.fromCharCode,
                                    P = {
                                        92: "\\",
                                        34: '"',
                                        47: "/",
                                        98: "\b",
                                        116: "\t",
                                        110: "\n",
                                        102: "\f",
                                        114: "\r"
                                    },
                                    E = function() {
                                        throw S = L = null, c()
                                    },
                                    k = function() {
                                        for (var t, i, n, e, r, o = L, s = o.length; S < s;) switch (r = o.charCodeAt(S)) {
                                            case 9:
                                            case 10:
                                            case 13:
                                            case 32:
                                                S++;
                                                break;
                                            case 123:
                                            case 125:
                                            case 91:
                                            case 93:
                                            case 58:
                                            case 44:
                                                return t = I ? o.charAt(S) : o[S], S++, t;
                                            case 34:
                                                for (t = "@", S++; S < s;)
                                                    if (r = o.charCodeAt(S), r < 32) E();
                                                    else if (92 == r) switch (r = o.charCodeAt(++S)) {
                                                    case 92:
                                                    case 34:
                                                    case 47:
                                                    case 98:
                                                    case 116:
                                                    case 110:
                                                    case 102:
                                                    case 114:
                                                        t += P[r], S++;
                                                        break;
                                                    case 117:
                                                        for (i = ++S, n = S + 4; S < n; S++) r = o.charCodeAt(S), r >= 48 && r <= 57 || r >= 97 && r <= 102 || r >= 65 && r <= 70 || E();
                                                        t += X("0x" + o.slice(i, S));
                                                        break;
                                                    default:
                                                        E()
                                                } else {
                                                    if (34 == r) break;
                                                    for (r = o.charCodeAt(S), i = S; r >= 32 && 92 != r && 34 != r;) r = o.charCodeAt(++S);
                                                    t += o.slice(i, S)
                                                }
                                                if (34 == o.charCodeAt(S)) return S++, t;
                                                E();
                                            default:
                                                if (i = S, 45 == r && (e = !0, r = o.charCodeAt(++S)), r >= 48 && r <= 57) {
                                                    for (48 == r && (r = o.charCodeAt(S + 1), r >= 48 && r <= 57) && E(), e = !1; S < s && (r = o.charCodeAt(S), r >= 48 && r <= 57); S++);
                                                    if (46 == o.charCodeAt(S)) {
                                                        for (n = ++S; n < s && (r = o.charCodeAt(n), r >= 48 && r <= 57); n++);
                                                        n == S && E(), S = n
                                                    }
                                                    if (r = o.charCodeAt(S), 101 == r || 69 == r) {
                                                        for (r = o.charCodeAt(++S), 43 != r && 45 != r || S++, n = S; n < s && (r = o.charCodeAt(n), r >= 48 && r <= 57); n++);
                                                        n == S && E(), S = n
                                                    }
                                                    return +o.slice(i, S)
                                                }
                                                if (e && E(), "true" == o.slice(S, S + 4)) return S += 4, !0;
                                                if ("false" == o.slice(S, S + 5)) return S += 5, !1;
                                                if ("null" == o.slice(S, S + 4)) return S += 4, null;
                                                E()
                                        }
                                        return "$"
                                    },
                                    Y = function(t) {
                                        var i, n;
                                        if ("$" == t && E(), "string" == typeof t) {
                                            if ("@" == (I ? t.charAt(0) : t[0])) return t.slice(1);
                                            if ("[" == t) {
                                                for (i = []; t = k(), "]" != t; n || (n = !0)) n && ("," == t ? (t = k(), "]" == t && E()) : E()), "," == t && E(), i.push(Y(t));
                                                return i
                                            }
                                            if ("{" == t) {
                                                for (i = {}; t = k(), "}" != t; n || (n = !0)) n && ("," == t ? (t = k(), "}" == t && E()) : E()), "," != t && "string" == typeof t && "@" == (I ? t.charAt(0) : t[0]) && ":" == k() || E(), i[t.slice(1)] = Y(k());
                                                return i
                                            }
                                            E()
                                        }
                                        return t
                                    },
                                    V = function(t, i, n) {
                                        var e = R(t, i, n);
                                        e === d ? delete t[i] : t[i] = e
                                    },
                                    R = function(t, i, n) {
                                        var e, r = t[i];
                                        if ("object" == typeof r && r)
                                            if (m.call(r) == F)
                                                for (e = r.length; e--;) V(r, e, n);
                                            else y(r, function(t) {
                                                V(r, t, n)
                                            });
                                        return n.call(t, i, r)
                                    };
                                i.parse = function(t, i) {
                                    var n, e;
                                    return S = 0, L = "" + t, n = Y(k()), "$" != k() && E(), S = L = null, i && m.call(i) == w ? R((e = {}, e["lk"] = n, e), "", i) : n
                                }
                            }
                        }
                        return i.jV = r, i
                    }
                    var o = "function" == typeof t && t.qk,
                        s = {
                            kV: !0,
                            lV: !0
                        },
                        h = s[typeof e] && e && !e.D && e,
                        a = s[typeof window] && window || this,
                        u = h && s[typeof n] && n && !n.D && "object" == typeof i && i;
                    if (!u || u.global !== u && u.gc !== u && u.Bq !== u || (a = u), h && !o) r(a, h);
                    else {
                        var c = a.es,
                            f = a.mV,
                            l = !1,
                            p = r(a, a.mV = {
                                tk: function() {
                                    return l || (l = !0, a.es = c, a.mV = f, c = f = null), p
                                }
                            });
                        a.es = {
                            parse: p.parse,
                            Lq: p.Lq
                        }
                    }
                    o && t(function() {
                        return p
                    })
                }).call(this)
            }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof I ? I : {})
        }, {}],
        51: [function(t, i, n) {
            function e(t, i) {
                var n = [];
                i = i || 0;
                for (var e = i || 0; e < t.length; e++) n[e - i] = t[e];
                return n
            }
            i.r = e
        }, {}]
    }, {}, [31])(31)
}), Animation = function(t, i, n, e, r) {
    this.name = t, this.bn = i, this.nV = n, this.oV = e, this.pV = r, this.YN = [], this.Tf()
}, Animation.prototype.Tf = function() {
    for (var t = 0, i = 0; i < this.bn.Ua / this.pV; i++)
        for (var n = 0; n < this.bn.Ka / this.oV; n++) {
            if (!(t < this.nV)) return void console.log("Loaded animation with " + t + " frames.");
            var e = new PIXI.Yv(n * this.oV, i * this.pV, this.oV, this.pV);
            this.YN.push(e), t++
        }
    this.bn.zD = this.YN[0]
}, AnimationManager = function() {
    this.qV = {}, this.rV = {}
}, AnimationManager.prototype.Tf = function() {
    this.qV.sV = new Animation("feet", d.wG.sV, 60, 75, 75), this.rV.tV = new Cycle([
        [0, 0, -.5, 32],
        [0, 0, 0, 32]
    ])
}, AnimationManager.prototype.Mt = function() {
    var t = d.uV;
    t || console.Vb("Missing gameData.entityWorld");
    var i = new Date;
    t.vV.forEach(function(t) {
        t.wV && forIn(this, t.wV.wV, function(n) {
            if (n = t.wV.wV[n], n.xV && n.xV.yV)
                for (var e = i - n.xV.zV; e >= n.xV.AV;) e -= n.xV.AV, n.xV.zV = new Date, n.xV.JK += 1, n.xV.JK >= n.xV.BV.nV && (n.xV.JK = 0), n.TF.TF.bn.zD = n.xV.BV.YN[n.xV.JK], n.xV.CV && 0 == n.xV.JK && (n.xV.yV = !1, n.xV.DV = !1);
            else if (n.EV)
                for (var e = i - n.EV.zV; e >= n.EV.AV;) e -= n.EV.AV, n.EV.zV = new Date, n.EV.JK += 1, n.EV.JK >= n.EV.FV.nV && (n.EV.JK = 0), n.GV = [n.EV.FV.YN[n.EV.JK][0], n.EV.FV.YN[n.EV.JK][1], n.EV.FV.YN[n.EV.JK][2]], n.EV.CV && 0 == n.EV.JK && (n.EV = !1, n.EV.DV = !1)
        })
    })
}, BodyPart = function(t, i, n, e, r, o) {
    this.TF = t, this._j = [i, n, e], this.HV = [i, n, e], this.GV = [0, 0, 0], !r || 0 == r[0] && 0 == r[1] ? this.cx = [0, 0] : (this.IV = !0, this.cx = r, isServer || (this.TF.TF.anchor.g = 0, this.TF.TF.anchor.h = 0, this.TF.TF.cx.g = r[0], this.TF.TF.cx.h = r[1])), this.Kd = o, this.he = [], this.xV = null
}, BodyPart.prototype.gh = function(t, i, n) {
    var e = this.KB(0, 0, this._j[0] + (this.Kd ? this.Kd._j[0] : 0), this._j[1] + (this.Kd ? this.Kd._j[1] : 0), n);
    this.TF.TF.gh.g = t + e[0], this.TF.TF.gh.h = i + e[1], this.TF.TF.ex = n, forOf(this, this.he, function(t) {
        t.gh(this.TF.TF.gh.g, this.TF.TF.gh.h, this.TF.TF.ex)
    }), this.Kd || forOf(this, this.he, function(e) {
        var r = [e.GV[0], e.GV[1]],
            o = e.KB(0, 0, r[0], r[1], n + e.GV[2] + e._j[2]);
        0 == r[0] && 0 == r[1] && (o = [0, 0]), e.TF.TF.gh.g += o[0], e.TF.TF.gh.h += o[1], e.TF.TF.ex = n + e.GV[2] + e._j[2], forOf(this, e.he, function(r) {
            r.JV(t, i, n, e.TF.TF.ex)
        })
    })
}, BodyPart.prototype.KB = function(t, i, n, e, r) {
    var o = Math.cos(r),
        s = Math.sin(r),
        h = o * (n - t) + s * (e - i) + t,
        a = o * (e - i) - s * (n - t) + i;
    return [-h, a]
}, BodyPart.prototype.JV = function(t, i, n, e) {
    var r = this.KB(0, 0, this.Kd._j[0], this.Kd._j[1], n),
        o = this.KB(0, 0, this._j[0], this._j[1], e + this.GV[2] + this._j[2]);
    this.TF.TF.gh.g = t + r[0] + o[0], this.TF.TF.gh.h = i + r[1] + o[1], this.TF.TF.ex = e + this.GV[2] + this._j[2]
}, BodyPart.prototype.FV = function(t, i, n, e) {
    this.EV || (this.EV = {}, this.EV.FV = t.KV.rV[i]), this.EV.AV = 1e3 / n, this.EV.zV && this.EV || (this.EV.zV = new Date), this.EV.JK || (this.EV.JK = 0), this.EV.CV = e, this.EV.DV = !1
}, BodyPart.prototype.LV = function() {
    this.EV && (this.EV.CV = !0, this.EV.DV = !1)
}, BodyPart.prototype.Rh = function(t, i, n, e) {
    this.xV || (this.xV = {}, this.xV.BV = t.KV.qV[i], this.TF.TF.bn = this.xV.BV.bn.Ea()), this.xV.AV = 1e3 / n, this.xV.zV && this.xV.yV || (this.xV.zV = new Date), this.xV.JK || (this.xV.JK = 0), this.xV.CV = e, this.xV.DV = !1, this.xV.yV = !0
}, BodyPart.prototype.MV = function() {
    this.CV = !0, this.DV = !0
}, Cycle = function(t) {
    this.YN = [], this.Tf(t)
}, Cycle.prototype.Tf = function(t) {
    for (var i = 0; i < t.length; ++i)
        for (var n = t[i], e = n[0], r = n[1], o = n[2], s = n[3], h = 0; h < s; ++h) {
            var a = i > 0 ? t[i - 1][0] : t[t.length - 1][0],
                u = i > 0 ? t[i - 1][1] : t[t.length - 1][1],
                c = i > 0 ? t[i - 1][2] : t[t.length - 1][2],
                f = a + h / s * (e - a),
                l = u + h / s * (r - u),
                p = c + h / s * (o - c);
            this.YN.push([f, l, p])
        }
    this.nV = this.YN.length
}, Sprite = function(t, i, n) {
    this.NV = t ? t : "", this.OV = n, isServer || this.PV(t && t.length > 0 ? new PIXI.iA(d.wG[t]) : i)
}, Sprite.prototype.PV = function(t) {
    t ? (this.TF = t, !this.OV && this.TF && (this.TF.anchor.g = .5, this.TF.anchor.h = .5)) : this.TF = new PIXI.iA
}, BLOCK_CHUNK_DIM = 30, BLOCK_CHUNK_SIZE = BLOCK_CHUNK_DIM * BLOCK_CHUNK_DIM, BlockChunk = function() {
    this.QV = new Uint8Array(BLOCK_CHUNK_SIZE), this.RV = new Uint8Array(BLOCK_CHUNK_SIZE), this.GL = new Uint8Array(BLOCK_CHUNK_SIZE)
}, BlockChunk.prototype.SV = function(t, i) {
    return this.QV[t + i * BLOCK_CHUNK_DIM]
}, BlockChunk.prototype.TV = function(t, i, n) {
    this.QV[t + i * BLOCK_CHUNK_DIM] = n, this.UV = !0
}, BlockChunk.prototype.VV = function(t, i) {
    return this.RV[t + i * BLOCK_CHUNK_DIM]
}, BlockChunk.prototype.WV = function(t, i, n) {
    this.RV[t + i * BLOCK_CHUNK_DIM] = n, this.UV = !0
}, BlockChunk.prototype.XV = function(t, i) {
    return this.GL[t + i * BLOCK_CHUNK_DIM]
}, BlockChunk.prototype.YV = function(t, i, n) {
    this.GL[t + i * BLOCK_CHUNK_DIM] = n, this.UV = !0
}, v2WorldToBlockChunk = function(t, i, n) {
    v2.Bt(t, BLOCK_CHUNK_DIM, i), v2.floor(i, i), n && (blockChunkWorldPos = v2.Ea(i), v2.ZV(BLOCK_CHUNK_DIM, blockChunkWorldPos, blockChunkWorldPos), v2.floor(t, n), v2.sub(n, blockChunkWorldPos, n))
}, v2WorldFromBlockChunk = function(t, i, n) {
    v2.ZV(BLOCK_CHUNK_DIM, i, t), n && v2.ra(n, t, t)
}, BlockChunkRenderer = function(t, i, n) {
    this.Lm = t, this.$V = n, this._V = i, this.aW = new Map2D, this.bW = 0, this.cW = 0, this.dW = 0, this.eW = 0, this.fW = 0, this.gW = null, this.hW(), this.iW = null, this.jW = [new ShaderRequest("data/shaders/block/vert.glsl", t.gp), new ShaderRequest("data/shaders/block/frag.glsl", t.hp)], this.ec = !1
}, BlockChunkRenderer.prototype.kW = function() {
    this.ec || (this.iW || (this.iW = s(this.Lm, this.jW)), this.iW && (f.En(this.iW), this.bW = f.xp(this.iW, "aPos"), this.cW = f.xp(this.iW, "aUV"), this.dW = f.Dp(this.iW, "textureTiles"), this.eW = f.Dp(this.iW, "matVP"), this.fW = f.Dp(this.iW, "matM"), this.ec = !0))
}, BlockChunkRenderer.prototype.Ny = function(t, i, n, e) {
    for (var r = [], o = Math.floor((e.Eh[0] - e.Ka / 2) / this.$V / BLOCK_CHUNK_DIM), s = Math.floor((e.Eh[1] - e.Ua / 2) / this.$V / BLOCK_CHUNK_DIM), h = Math.floor((e.Eh[0] + e.Ka / 2) / this.$V / BLOCK_CHUNK_DIM), a = Math.floor((e.Eh[1] + e.Ua / 2) / this.$V / BLOCK_CHUNK_DIM), u = s; u <= a; ++u)
        for (var c = o; c <= h; ++c) {
            var f = i._(c, u);
            f && r.push({
                g: c,
                h: u,
                lW: f
            })
        }
    this.mW(t, n, r)
}, BlockChunkRenderer.prototype.mW = function(t, i, n) {
    if (this.ec || this.kW(), this.ec && this.gW) {
        f.En(this.iW), f.nW(this.eW, !1, i.$b()), f.oW(this.dW, 0);
        for (var e = 0; e < n.length; ++e) {
            var r = n[e].g,
                o = n[e].h,
                s = n[e].lW;
            if (s) {
                var h = this.aW._(r, o);
                h || (h = new GLBlockChunk(this.Lm, s), this.aW.P(r, o, h), s.UV = !0), s.UV, h.Mt(this.Lm, t, s), s.UV = !1;
                var a = PIXI.Jx.Lx.Ea().JB(r * BLOCK_CHUNK_DIM * this.$V, o * BLOCK_CHUNK_DIM * this.$V);
                f.nW(this.fW, !1, a.$b()), f.Wn(f.Xn), f.Yn(f.gn, this.gW), f.ep(this.bW), f.ep(this.cW), f.Fo(this.bW, 2, f.Vn, !1, 8, 0), f.Fo(this.cW, 2, f.Vn, !1, 8, 4 * h.pW * 4), f.Um(f.Nm, h.qW), f.rW(f.fv, 0, h.pW), f.Um(f.Nm, null), f.fp(this.bW), f.fp(this.cW)
            }
        }
    }
}, BlockChunkRenderer.prototype.hW = function() {
    var t = new Image;
    t.Fa = "data/textures/blockAtlas.png", t.sW = !1, t.Jj = function(i) {
        var n = f.Jn();
        f.Rn(f.dE, !0), f.Yn(f.gn, n), f.Tn(f.gn, 0, f.Nn, f.Nn, f.On, t), f.$n(f.gn, f.fo, f.do), f.$n(f.gn, f._n, f.do), f.Yn(f.gn, null), f.Rn(f.dE, !1), this.gW = n
    }.bind(this)
}, Blocks = {}, Blocks.tW = {
    name: "Air",
    uW: !1,
    vW: 0
}, Blocks.wW = {
    name: "Stone Wall",
    uW: !0,
    vW: 1
}, Blocks.xW = {
    name: "Stone Floor",
    uW: !1,
    vW: 1
}, getForeground = function(t, i, n) {
    var e = Math.floor(i / BLOCK_CHUNK_DIM),
        r = Math.floor(n / BLOCK_CHUNK_DIM),
        o = Math.floor(i) - e * BLOCK_CHUNK_DIM,
        s = Math.floor(n) - r * BLOCK_CHUNK_DIM,
        h = t._(e, r);
    return h ? h.SV(o, s) : 0
}, setForeground = function(t, i, n, e) {
    var r = Math.floor(i / BLOCK_CHUNK_DIM),
        o = Math.floor(n / BLOCK_CHUNK_DIM),
        s = Math.floor(i) - r * BLOCK_CHUNK_DIM,
        h = Math.floor(n) - o * BLOCK_CHUNK_DIM,
        a = t._(r, o);
    a || (a = new BlockChunk, t.P(r, o, a)), a.TV(s, h, e)
}, canvasInitGL = function(t) {
    return f = null, f = t.Ro("webgl", {
        uv: !1
    }) || t.Ro("experimental-webgl", {
        uv: !1
    }), f || document.eR("<h1 style = 'position: fixed; left:24px;top:24px;'>Unable to initialize WebGL. Your browser may not support it.</h1>"), f
}, canvasUpdateSize = function(t) {
    t.Ka = window.yW, t.Ua = window.zW
}, CHUNK_DIM = 30, CHUNK_DIM_2 = CHUNK_DIM + 2, CHUNK_SIZE = 900, Chunk = function() {
    this.AW = new Uint8Array(CHUNK_SIZE), this.BW = new Uint8Array(CHUNK_SIZE);
    for (var t = 0; t < CHUNK_DIM; ++t)
        for (var i = 0; i < CHUNK_DIM; ++i) this.AW[t * CHUNK_DIM + i] = (2 * i + i / 16 + 2 * t + t / 16) % 4, this.BW[t * CHUNK_DIM + i] = 255
}, Chunk.prototype.CW = function(t, i) {
    return this.BW[t + i * CHUNK_DIM]
}, Chunk.prototype.DW = function(t, i, n) {
    this.BW[t + i * CHUNK_DIM] = n, this.UV = !0
}, Chunk.prototype.EW = function(t, i) {
    return this.AW[t + i * CHUNK_DIM]
}, Chunk.prototype.FW = function(t, i, n) {
    this.AW[t + i * CHUNK_DIM] = n, this.UV = !0
}, v2WorldToChunk = function(t, i, n) {
    v2.Bt(t, CHUNK_DIM, i), v2.floor(i, i), n && (chunkWorldPos = v2.Ea(i), v2.ZV(CHUNK_DIM, chunkWorldPos, chunkWorldPos), v2.floor(t, n), v2.sub(n, chunkWorldPos, n))
}, v2WorldFromChunk = function(t, i, n) {
    v2.ZV(CHUNK_DIM, i, t), n && v2.ra(n, t, t)
}, ChunkRenderer = function(t, i, n) {
    this.Lm = t, this.$V = n, this._V = i, this.GW = new Map2D, this.HW = 0, this.IW = 0, this.JW = 0, this.dW = 0, this.KW = 0, this.eW = 0, this.fW = 0, this.Sk = null, this.LW = null, this.MW = null, this.hW(), this.iW = null, this.jW = [new ShaderRequest("data/shaders/terrain/vert.glsl", t.gp), new ShaderRequest("data/shaders/terrain/frag.glsl", t.hp)], this.ec = !1
}, ChunkRenderer.prototype.kW = function() {
    if (!this.ec && (this.iW || (this.iW = s(this.Lm, this.jW)), this.iW && !this.Sk)) {
        var t = this.$V * CHUNK_DIM,
            i = [0, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 1, t, t, 1, 1];
        this.Sk = f.Mm(), f.Um(f.Nm, this.Sk), f.Tm(f.Nm, new Float32Array(i), f.Pm);
        var n = [0, 1, 3, 0, 3, 2];
        this.LW = f.Mm(), f.Um(f.Xm, this.LW), f.Tm(f.Xm, new Uint16Array(n), f.Pm), f.En(this.iW), this.HW = f.xp(this.iW, "aPos"), this.IW = f.xp(this.iW, "aUV"), this.KW = f.Dp(this.iW, "textureDensity"), this.dW = f.Dp(this.iW, "textureTiles"), this.JW = f.Dp(this.iW, "textureTerrain"), this.eW = f.Dp(this.iW, "matVP"), this.fW = f.Dp(this.iW, "matM"), this.ec = !0
    }
}, ChunkRenderer.prototype.Ny = function(t, i, n) {
    for (var e = [], r = Math.floor((n.Eh[0] - n.Ka / 2) / this.$V / CHUNK_DIM), o = Math.floor((n.Eh[1] - n.Ua / 2) / this.$V / CHUNK_DIM), s = Math.floor((n.Eh[0] + n.Ka / 2) / this.$V / CHUNK_DIM), h = Math.floor((n.Eh[1] + n.Ua / 2) / this.$V / CHUNK_DIM), a = o; a <= h; ++a)
        for (var u = r; u <= s; ++u) {
            var c = t._(u, a);
            c && e.push({
                g: u,
                h: a,
                NW: c
            })
        }
    this.OW(i, e)
}, ChunkRenderer.prototype.OW = function(t, i) {
    if (this.ec || this.kW(), this.ec && this.MW) {
        f.En(this.iW), f.nW(this.eW, !1, t.$b()), f.oW(this.JW, 0), f.oW(this.dW, 1), f.oW(this.KW, 2);
        for (var n = 0; n < i.length; ++n) {
            var e = i[n].g,
                r = i[n].h,
                o = i[n].NW;
            if (o) {
                var s = this.GW._(e, r);
                if (s || (s = new GLChunk(this.Lm, o), this.GW.P(e, r, s), o.UV = !1, this.PW(o, e, r)), o.UV && (s.Mt(this.Lm, o), o.UV = !1, this.PW(o, e, r)), s.gW && s.QW) {
                    var h = PIXI.Jx.Lx.Ea().JB(e * CHUNK_DIM * this.$V, r * CHUNK_DIM * this.$V);
                    f.nW(this.fW, !1, h.$b()), f.Wn(f.Xn), f.Yn(f.gn, this.MW), f.Wn(f.RW), f.Yn(f.gn, s.gW), f.Wn(f.SW), f.Yn(f.gn, s.QW), f.Um(f.Nm, this.Sk), f.ep(this.HW), f.ep(this.IW), f.Fo(this.HW, 2, f.Vn, !1, 16, 0), f.Fo(this.IW, 2, f.Vn, !1, 16, 8), f.Um(f.Xm, this.LW), f.No(f.fv, 6, f.Oo, 0), f.Um(f.Xm, null), f.Um(f.Nm, null)
                }
            }
        }
    }
}, ChunkRenderer.prototype.hW = function() {
    var t = new Image;
    t.Fa = "data/textures/ground.png", t.sW = !1;
    var i = this;
    t.Jj = function(n) {
        var e = f.Jn();
        f.Rn(f.dE, !0), f.Yn(f.gn, e), f.Tn(f.gn, 0, f.Nn, f.Nn, f.On, t), f.$n(f.gn, f.fo, f.do), f.$n(f.gn, f._n, f.do), f.Yn(f.gn, null), f.Rn(f.dE, !1), i.MW = e
    }
}, ChunkRenderer.prototype.PW = function(t, i, n) {
    var e = this.Lm,
        r = this,
        o = r.GW._(i, n);
    if (t && o) {
        var s = function(s, h) {
            var a = r.GW._(s, h),
                u = r._V._(s, h);
            u && a && (o.TW(e, u, i, n, s, h), a.TW(e, t, s, h, i, n))
        };
        s(i, n + 1), s(i - 1, n + 1), s(i - 1, n), s(i - 1, n - 1), s(i, n - 1), s(i + 1, n - 1), s(i + 1, n), s(i + 1, n + 1)
    }
}, CommandDig = function(t, i, n) {
    this.g = toFix(t), this.h = toFix(i), this.Wy = toFix(n)
}, CommandDig.prototype.UW = function(t) {
    t.VW;
    carveCircle(t, this.g, this.h, this.Wy)
}, CommandDig.prototype.Fi = function(t, i) {
    serializeFix(t, i, this.g), serializeFix(t, i, this.h), serializeFix(t, i, this.Wy)
}, CommandDig.prototype.WW = function(t, i) {
    this.g = deserializeFix(t, i), this.h = deserializeFix(t, i), this.Wy = deserializeFix(t, i)
}, CommandDig.prototype.XW = function() {
    return 12
}, CommandPlayerDig = function(t, i, n, e, r, o, s) {
    this.YW = t, this.g = toFix(i), this.h = toFix(n), this.yc = e, this.Wy = toFix(r), this.ZW = o, this.$W = s
}, CommandPlayerDig.prototype.UW = function(t) {
    var i = t.aX._W[this.YW];
    if (i) {
        var n = t.uV._W[i.bX];
        if (n && n.cX) {
            n.cX.dX = n.cX.eX(t.fX);
            var e = (t.VW, t.gX[getTileId(t.VW, this.g + 1 * this.yc[0], this.h + 1 * this.yc[1])]),
                r = getDensity(t.VW, this.g + 1 * this.yc[0], this.h + 1 * this.yc[1]),
                o = null,
                s = 1.5;
            if (e.hX && r > 0) {
                n.cX.iX = !0, s = 1, this.Wy = 1, o = function(t, i, n, e, r) {
                    if (n.hX) {
                        var o = (e - r) / 2 >> 0,
                            s = e - o;
                        return s < 128 ? 0 : s
                    }
                    return e
                };
                var h = t.aX._W[this.YW].bX,
                    a = t.uV._W[h].jX.Nh;
                v2.ZV(.5, a, a)
            } else n.cX.kX = !0, o = function(t, i, n, e, r) {
                return n.hX ? e : r
            };
            var u = carveCircle(t, this.g + s * this.yc[0], this.h + s * this.yc[1], this.Wy, this.ZW, this.$W, o);
            if (!isServer) {
                var n = t.uV._W[i.bX];
                return void(n.lX && n.wV.wV.tV.FV(t, "rightArm", 64 / n.cX.mX, !1))
            }
            for (var c = 0; c < u.length; ++c)
                if (u[c] && !(u[c] <= 0)) {
                    var f = t.gX[c].name,
                        l = c,
                        p = new MessagePlayerInventory(this.YW, InventoryActions.nX, l, u[c]);
                    if (p.UW(t), p.rj(i.KQ), f == Tiles.oX.name) {
                        var v = 1e3 * Math.random(),
                            l = null;
                        if (v > 990 && (l = Items.pX.nc), null != l) {
                            var n = t.uV._W[i.bX],
                                y = n.jX,
                                d = entityTemplates.qX(idList.zc(), l, 1, t);
                            d.jX.Eh = v2.create(y.Eh[0], y.Eh[1]), d.jX.rX = v2.create(y.Eh[0], y.Eh[1]), d.jX.sX = y.sX, d.jX.tX = y.sX;
                            var p = new MessageEntitySpawn(t, d);
                            p.rj(t, io.uX)
                        }
                    }
                }
        }
    }
}, CommandPlayerDig.prototype.Fi = function(t, i) {
    serializeInt32(t, i, this.YW), serializeFix(t, i, this.g), serializeFix(t, i, this.h), serializeV2(t, i, this.yc), serializeFix(t, i, this.Wy), serializeFix(t, i, this.ZW), serializeFix(t, i, this.$W)
}, CommandPlayerDig.prototype.WW = function(t, i) {
    this.YW = deserializeInt32(t, i), this.g = deserializeFix(t, i), this.h = deserializeFix(t, i), this.yc = deserializeV2(t, i), this.Wy = deserializeFix(t, i), this.ZW = deserializeFix(t, i), this.$W = deserializeFix(t, i)
}, CommandPlayerDig.prototype.XW = function() {
    return 32
}, CommandPlayerEquipItem = function(t, i, n, e) {
    this.YW = t, this.vX = i, this.wX = n, this.xX = e
}, CommandPlayerEquipItem.prototype.UW = function(t) {
    var i = t.aX._W[this.YW],
        n = t.uV._W[i.bX],
        e = t.yX[this.wX],
        r = n.wV.wV[e.z].TF;
    if (isServer || !r.TF || this.xX) {
        if (this.xX) {
            n.lX.zX(n.wV.wV[e.z], new Sprite(e.name));
            var o = e.bn.AX ? e.bn.AX : [0, 0];
            n.wV.wV[e.z]._j[0] += o[0], n.wV.wV[e.z]._j[1] += o[1]
        }
    } else r.TF.zj = !1;
    if (isServer || this.YW == I.BX.YW) {
        var s = i.DX.CX[this.vX];
        if (s && s.nc == this.wX) {
            if (this.xX)
                for (var h = i.DX.EX(t, e.z, n.nc), a = 0; a < h.length; ++a) {
                    var u = h[a];
                    i.FX(u[0], t.yX[u[1]])
                }
            s.xX = this.xX, isServer || updateHUD(t)
        }
    }
    this.xX ? i.GX(this.vX, e) : i.FX(this.vX, e)
}, CommandPlayerEquipItem.prototype.Fi = function(t, i) {
    serializeInt32(t, i, this.YW), serializeInt32(t, i, this.vX), serializeInt32(t, i, this.wX);
    var n = [];
    n[0] = this.xX, serializeBooleans(t, i, n)
}, CommandPlayerEquipItem.prototype.WW = function(t, i) {
    this.YW = deserializeInt32(t, i), this.vX = deserializeInt32(t, i), this.wX = deserializeInt32(t, i), this.xX = deserializeBooleans(t, i)[0]
}, CommandPlayerEquipItem.prototype.XW = function() {
    return 13
}, PlayerMoveDirection = {
    HX: 0,
    IX: 1,
    JX: 2,
    KX: 3,
    LX: 4,
    MX: 5,
    NX: 6,
    OX: 7,
    PX: 8,
    QX: 9
}, CommandPlayerMove = function(t, i, n, e) {
    t && (this.YW = t.nc), this.RX = i, this.g = n, this.h = e
}, CommandPlayerMove.prototype.UW = function(t) {
    var i = t.aX,
        n = t.uV,
        e = i._W[this.YW];
    if (e) {
        var r = n._W[e.bX];
        if (r) {
            var o = r.cX;
            if (o) {
                switch (this.RX) {
                    case PlayerMoveDirection.HX:
                        o.SX = !0;
                        break;
                    case PlayerMoveDirection.IX:
                        o.xh = !0;
                        break;
                    case PlayerMoveDirection.JX:
                        o.TX = !0;
                        break;
                    case PlayerMoveDirection.KX:
                        o.UX = !0;
                        break;
                    case PlayerMoveDirection.LX:
                        o.VX = !0;
                        break;
                    case PlayerMoveDirection.MX:
                        o.SX = !1;
                        break;
                    case PlayerMoveDirection.NX:
                        o.xh = !1;
                        break;
                    case PlayerMoveDirection.OX:
                        o.TX = !1;
                        break;
                    case PlayerMoveDirection.PX:
                        o.UX = !1;
                        break;
                    case PlayerMoveDirection.QX:
                        o.VX = !1
                }
                r.jX.Eh[0] = this.g, r.jX.Eh[1] = this.h
            }
        }
    }
}, CommandPlayerMove.prototype.Fi = function(t, i) {
    serializeInt32(t, i, this.YW), serializeInt32(t, i, this.RX), serializeFix(t, i, this.g), serializeFix(t, i, this.h)
}, CommandPlayerMove.prototype.WW = function(t, i) {
    this.YW = deserializeInt32(t, i), this.RX = deserializeInt32(t, i), this.g = deserializeFix(t, i), this.h = deserializeFix(t, i)
}, CommandPlayerMove.prototype.XW = function() {
    return 16
}, compressRLE = function(t, i, n, e) {
    for (var i = i || [], n = n || 0, e = e || t.Rm || t.length, r = t[n], o = 1, s = n + 1; s < e; ++s) {
        var h = t[s];
        h == r && o < 255 ? o++ : (i.push(o, r), r = h, o = 1)
    }
    return i.push(o, r), i
}, decompressRLE = function(t, i, n, e) {
    for (var n = n || 0, e = e || t.length || t.Rm, r = 0, o = n; o < e;) {
        for (var s = t[o++], h = t[o++], a = 0; a < s; a++) i.zy(h, r, r + s);
        r += s
    }
    return i
}, forOf = function(t, i, n) {
    i.forEach(n.bind(t))
}, forIn = function(t, i, n) {
    Object.keys(i).forEach(n.bind(t))
}, fix = {}, fix.WX = 65536, toFix = function(t) {
    return (65536 * t >> 0) % 4294967296 / 65536
}, isFix = function(t) {
    return toFix(t) == t
}, fix.ra = function(t, i) {
    return toFix(t + i)
}, fix.sub = function(t, i) {
    return toFix(t - i)
}, fix.ZV = function(t, i) {
    return toFix(t * i)
}, fix.Bt = function(t, i) {
    return toFix(t / i)
}, fix.exp = function(t) {
    return toFix(Math.exp(t))
}, fix.log = function(t) {
    return toFix(Math.log(t))
}, fix.pow = function(t, i) {
    return toFix(Math.pow(t, i))
}, fix.sqrt = function(t) {
    return toFix(Math.sqrt(t))
}, fix.sin = function(t) {
    return toFix(Math.sin(t))
}, fix.cos = function(t) {
    return toFix(Math.cos(t))
}, fix.tan = function(t) {
    return toFix(Math.tan(t))
}, fix.asin = function(t) {
    return toFix(Math.asin(t))
}, fix.acos = function(t) {
    return toFix(Math.acos(t))
}, fix.atan = function(t) {
    return toFix(Math.atan(t))
}, fix.atan2 = function(t, i) {
    return toFix(Math.atan2(t, i))
}, Map2D = function(t) {
    this.map = {}
}, Map2D.prototype._ = function(t, i, n) {
    return this.map[t + "|" + i]
}, Map2D.prototype.P = function(t, i, n) {
    this.map[t + "|" + i] = n
}, PagedArray2D = function(t, i, n) {
    this.XX = t, this.YX = i, this.Aa = n, this.ZX = {}, this.$X = function(t, i, n) {}
}, PagedArray2D.prototype._ = function(t, i, n) {
    var e = t % this.XX,
        r = i % this.YX,
        o = (t - e) / this.XX,
        s = (i - r) / this.YX;
    t < 0 && (o--, e = (e - o * this.XX) % this.XX), i < 0 && (s--, r = (r - s * this.YX) % this.YX);
    var h = o + "," + s;
    return void 0 == this.ZX[h] ? this.Aa : this.ZX[h]._(e, r)
}, PagedArray2D.prototype.P = function(t, i, n) {
    var e = t % this.XX,
        r = i % this.YX,
        o = (t - e) / this.XX,
        s = (i - r) / this.YX;
    t < 0 && (o--, e = (e - o * this.XX) % this.XX), i < 0 && (s--, r = (r - s * this.YX) % this.YX);
    var h = o + "," + s;
    if (void 0 == this.ZX[h]) {
        var a = new Page2D(o, s, this.XX, this.YX, this.Aa);
        a.P(e, r, n), this.ZX[h] = a, this.$X(o, s, a)
    } else this.ZX[h].P(e, r, n)
}, PagedArray2D.prototype._X = function(t, i) {
    var n = t + "," + i;
    return this.ZX[n]
}, Page2D = function(t, i, n, e, r) {
    this.Wb = new Uint8Array(n * e), this.g = t, this.h = i, this.XX = n, this.YX = e, this.UV = !0;
    for (var i = 0; i < e; ++i)
        for (var t = 0; t < n; ++t) this.Wb[i * n + t] = r
}, Page2D.prototype._ = function(t, i) {
    return this.Wb[t + i * this.XX]
}, Page2D.prototype.P = function(t, i, n) {
    this.Wb[t + i * this.XX] = n, this.UV = !0
}, v2 = {}, v2.create = function(t, i) {
    var n = [toFix(t), toFix(i)];
    return n
}, v2.Ea = function(t) {
    return [t[0], t[1]]
}, v2.bx = function(t, i) {
    i[0] = t[0], i[1] = t[1]
}, v2.ra = function(t, i, n) {
    n[0] = fix.ra(t[0], i[0]), n[1] = fix.ra(t[1], i[1])
}, v2.sub = function(t, i, n) {
    n[0] = fix.sub(t[0], i[0]), n[1] = fix.sub(t[1], i[1])
}, v2.ZV = function(t, i, n) {
    n[0] = fix.ZV(t, i[0]), n[1] = fix.ZV(t, i[1])
}, v2.Bt = function(t, i, n) {
    n[0] = fix.Bt(t[0], i), n[1] = fix.Bt(t[1], i)
}, v2.aY = function(t, i, n) {
    n[0] = t[0] % toFix(i), n[1] = t[1] % toFix(i)
}, v2.normalize = function(t, i) {
    var n = v2.bY(t);
    0 != n && (i[0] = fix.Bt(t[0], n), i[1] = fix.Bt(t[1], n))
}, v2.bY = function(t) {
    return fix.sqrt(v2.length(t))
}, v2.length = function(t) {
    return fix.ra(fix.ZV(t[0], t[0]), fix.ZV(t[1], t[1]))
}, v2.cY = function(t, i) {
    var n = {};
    return v2.sub(t, i, n), v2.length(n)
}, v2.dY = function(t, i) {
    var n = {};
    return v2.sub(t, i, n), v2.bY(n)
}, v2.eY = function(t, i) {
    return fix.ra(fix.ZV(t[0], i[0]), fix.ZV(t[1], i[1]))
}, v2.fY = function(t, i, n) {
    return i = toFix(i), n = toFix(n), i <= n ? Math.max(Math.min(t, n), i) : Math.max(Math.min(t, i), n)
}, v2.floor = function(t, i) {
    i[0] = Math.floor(t[0]), i[1] = Math.floor(t[1])
}, v2.ceil = function(t, i) {
    i[0] = Math.ceil(t[0]), i[1] = Math.ceil(t[1])
}, Bodyparts = function(t) {
    this.wV = t;
    for (var i in this.wV) {
        var n = this.wV[i];
        if (n.name = i, n.Kd) {
            var e = n.Kd;
            n.Kd = this.wV[e]
        }
    }
    for (var i in this.wV) {
        var n = this.wV[i];
        n.he = this.gY(n.name)
    }
}, Bodyparts.prototype.name = t.name, Bodyparts.prototype.Fi = function(t, i) {
    serializeInt32(t, i, Object.keys(this.wV).length);
    for (var n in this.wV) {
        var e = this.wV[n];
        serializeUTF8(t, i, n), serializeUTF8(t, i, e.Kd ? e.Kd.name : ""), serializeUTF8(t, i, e.TF.NV), serializeFix(t, i, e._j[0]), serializeFix(t, i, e._j[1]), serializeFix(t, i, e._j[2]), serializeFix(t, i, e.HV[0]), serializeFix(t, i, e.HV[1]), serializeFix(t, i, e.HV[2]), serializeV2(t, i, e.cx)
    }
}, Bodyparts.prototype.WW = function(t, i, n) {
    this.wV = {};
    for (var e = deserializeInt32(t, i), r = 0; r < e; ++r) {
        var o = deserializeUTF8(t, i),
            s = deserializeUTF8(t, i),
            h = deserializeUTF8(t, i),
            a = [deserializeFix(t, i), deserializeFix(t, i), deserializeFix(t, i)],
            u = [deserializeFix(t, i), deserializeFix(t, i), deserializeFix(t, i)],
            c = deserializeV2(t, i),
            f = new Sprite(h);
        this.wV[o] = new BodyPart(f, u[0], u[1], u[2], c), this.wV[o]._j = a, s && s.length > 0 && (this.wV[o].Kd = s)
    }
    if (!isServer) {
        for (var o in this.wV) {
            var l = this.wV[o];
            if (l.name = o, l.Kd) {
                var p = l.Kd;
                l.Kd = this.wV[p]
            }
        }
        for (var o in this.wV) {
            var l = this.wV[o];
            l.he = this.gY(l.name)
        }
    }
}, Bodyparts.prototype.XW = function() {
    var t = 4;
    for (var i in this.wV) {
        var n = this.wV[i],
            e = n.Kd ? n.Kd.name : "",
            r = n.TF.NV;
        t += getUTF8SerializationSize(i), t += getUTF8SerializationSize(e), t += getUTF8SerializationSize(r ? r : ""), t += 32
    }
    return t
}, Bodyparts.prototype.gY = function(t) {
    var i = [];
    for (var n in this.wV) {
        var e = this.wV[n];
        e.Kd && e.Kd.name == t && i.push(e)
    }
    return i
}, Bodyparts.prototype.hY = function(t, i, n) {
    if (!isServer)
        for (var e in this.wV) e = this.wV[e], e.Kd || e.gh(t, i, n)
}, ComponentItem = function(t, i) {
    this.wX = t, this.iY = i, this.jY = new Date
}, ComponentItem.prototype.name = i.name, ComponentItem.prototype.Fi = function(t, i) {
    serializeInt32(t, i, this.wX), serializeInt32(t, i, this.iY)
}, ComponentItem.prototype.WW = function(t, i) {
    this.wX = deserializeInt32(t, i), this.iY = deserializeInt32(t, i), this.jY = new Date
}, ComponentItem.prototype.XW = function() {
    return 8
}, Drawable = function(t) {
    this.AG = {}, this.kY = t ? t : 0, isServer || (this.lY = new PIXI.eA, v[this.kY].St(this.lY))
}, Drawable.prototype.name = n.name, Drawable.prototype.Fi = function(t, i) {
    serializeInt32(t, i, this.kY), serializeInt32(t, i, Object.keys(this.AG).length);
    for (var n in this.AG) serializeUTF8(t, i, n), n = this.AG[n], serializeUTF8(t, i, n.NV), serializeV2(t, i, n._j), serializeInt8(t, i, n.mY ? 1 : 0), serializeInt8(t, i, n.OV ? 1 : 0)
}, Drawable.prototype.WW = function(t, i, n) {
    this.kY = deserializeInt32(t, i), this.kY = this.kY ? this.kY : 0, isServer || (this.lY = new PIXI.eA, v[this.kY].St(this.lY)), this.AG = {};
    for (var e = deserializeInt32(t, i), r = 0; r < e; ++r) {
        var o = deserializeUTF8(t, i),
            s = deserializeUTF8(t, i),
            h = deserializeV2(t, i),
            a = deserializeInt8(t, i);
        a = 1 == a;
        var u = deserializeInt8(t, i);
        u = 1 == u, this.nY(o, new Sprite(s, null, u), h, a)
    }
}, Drawable.prototype.XW = function() {
    var t = 8;
    for (var i in this.AG) t += getUTF8SerializationSize(i), i = this.AG[i], t += getUTF8SerializationSize(i.NV ? i.NV : ""), t += 10;
    return t
}, Drawable.prototype.nY = function(t, i, n, e) {
    this.AG[t] && this.oY(t), this.AG[t] = i, !isServer && n && (this.AG[t].TF.cx.g = -n[0], this.AG[t].TF.cx.h = -n[1]), this.AG[t]._j = n, this.AG[t].mY = e, isServer || this.lY.St(this.AG[t].TF)
}, Drawable.prototype.oY = function(t) {
    var i = this.AG[t];
    i && (isServer || this.lY.v(i.TF), delete this.AG[t])
}, Drawable.prototype.pY = function(t, i, n) {
    if (!isServer)
        for (var e in this.AG) e = this.AG[e], e.TF.gh.g = t, e.TF.gh.h = i, e.mY && (e.TF.ex = n)
}, Drawable.prototype.qY = function(t, i, n, e) {
    this.pY(t, i, n), e && e.hY(t, i, n)
}, Drawable.prototype.zX = function(t, i) {
    var n = -1;
    isServer || t.TF.TF.rY || (n = this.lY.sw(t.TF.TF), this.lY.v(t.TF.TF)), t.TF = i, t._j[0] = t.HV[0], t._j[1] = t.HV[1], t._j[2] = t.HV[2], isServer || (n != -1 ? this.lY.qw(i.TF, n) : this.lY.St(i.TF))
}, Drawable.prototype.sY = function(t) {
    for (var i in t) {
        var n = t[i];
        this.lY.St(n.TF.TF)
    }
}, Drawable.prototype.hb = function(t) {
    for (var i in this.AG) i = this.AG[i], isServer || this.lY.v(i.TF);
    for (var n in t) n = t[n], isServer || this.lY.v(n.TF.TF)
}, entityTemplates = {}, entityTemplates.BX = function(t, i, n, e) {
    var r = e.aX.ra(new Player(t, i, n), t),
        o = e.uV.ra({}, i);
    o.jX = new PhysicsBody(v2.create(0, 0), .01), o.cX = new Movement(50);
    var s = new Sprite("feet"),
        h = new Sprite("rightArm"),
        a = new Sprite("leftArm"),
        u = new Sprite("head"),
        c = {
            sV: new BodyPart(s, 0, 0, 0, null, null),
            tY: new BodyPart(new Sprite, -10, 15, 0, null, "rightArm"),
            tV: new BodyPart(h, 5, 4, 0, [10, 11], "body"),
            uY: new BodyPart(a, 5, -16, 0, [10, 11], "body"),
            Z: new BodyPart(new Sprite, 0, 0, 0, null, null),
            y: new BodyPart(u, 1, 0, 0, null, null),
            vY: new BodyPart(new Sprite, 1, 0, 0, null, null)
        };
    o.wV = new Bodyparts(c), o.lX = new Drawable(1);
    var f = new Sprite("healthbar", null, !0);
    return o.lX.nY("healthbar", f, v2.create(-32, -40), !1), r.wY = f, {
        BX: r,
        xY: o
    }
}, entityTemplates.qX = function(t, i, n, e) {
    var r = {};
    r.jX = new PhysicsBody(v2.create(0, 0), .01), r.qX = new ComponentItem(i, n);
    var o = e.yX[i],
        s = new Sprite(o.name),
        h = {
            Z: new BodyPart(s, 0, 0, 0),
            u: new BodyPart(s, 0, 0, 0)
        };
    return r.wV = new Bodyparts(h), r.lX = new Drawable(0), e.uV.ra(r, t), r
}, Movement = function(t, i) {
    this.SX = !1, this.xh = !1, this.TX = !1, this.UX = !1, this.VX = !1, this.Nh = t, this.dX = 0, this.mX = i || .25, this.yY = .65, this.zY = .05, this.kX = !1, this.iX = !1
}, Movement.prototype.name = e.name, Movement.prototype.eX = function(t) {
    return Math.round(1e3 * this.mX / t)
}, Movement.prototype.AY = function() {
    var t = v2.create(0, 0);
    return this.SX && !this.TX ? t[1] += 1 : this.TX && !this.SX && (t[1] -= 1), this.UX && !this.xh ? t[0] += 1 : this.xh && !this.UX && (t[0] -= 1), t
}, Movement.prototype.Fi = function(t, i) {
    var n = (this.SX ? 1 : 0) | (this.xh ? 2 : 0) | (this.TX ? 4 : 0) | (this.UX ? 8 : 0) | (this.VX ? 16 : 0);
    serializeInt8(t, i, n), serializeFix(t, i, this.Nh)
}, Movement.prototype.WW = function(t, i) {
    var n = deserializeInt8(t, i);
    this.Nh = deserializeFix(t, i), this.SX = n & !0, this.xh = n & !0, this.TX = n & !0, this.UX = n & !0, this.VX = n & !0
}, Movement.prototype.XW = function() {
    return 5
}, entityFunctionPlayerMovement = function(t, i) {
    var n = t.aX,
        e = t.uV;
    n && e || console.Vb("Missing gameData properties");
    for (var r = n.vV.length, o = 0; o < r; ++o) {
        var s = n.vV[o];
        if (s.bX) {
            var h = e._W[s.bX];
            if (h && h.cX && h.jX) {
                var a = v2.create(0, 0);
                h.cX.SX && (a[1] += 1), h.cX.TX && (a[1] -= 1), h.cX.xh && (a[0] -= 1), h.cX.UX && (a[0] += 1);
                var u = v2.create(0, 0);
                v2.normalize(a, u), v2.ZV(h.cX.Nh, u, u), h.cX.iX ? v2.ZV(h.cX.zY, u, u) : h.cX.kX && v2.ZV(h.cX.yY, u, u), v2.ZV(i, u, u), v2.ra(u, h.jX.Nh, h.jX.Nh);
                var c = h.cX.AY();
                0 == c[0] && 0 == c[1] || h.jX.BY(Math.atan2(-c[1], c[0]), h.jX.CY, i), h.cX.dX = h.cX.dX <= 0 ? 0 : h.cX.dX - 1, 0 == h.cX.dX && (h.cX.kX = !1, h.cX.iX = !1, h.wV.wV.tV && h.wV.wV.tV.LV())
            }
        }
    }
};
var h = 4,
    a = 3,
    e = new Movement;
PHYSICS_MAX_STEP_LENGTH = .5, PhysicsBody = function(t, i) {
    t && (this.Eh = v2.Ea(t), this.rX = v2.Ea(t)), this.Nh = v2.create(0, 0), this.DY = v2.Ea(this.Nh), i && (this.EY = toFix(i)), this.sX = 0, this.tX = 0, this.CY = toFix(10)
}, PhysicsBody.prototype.name = r.name, PhysicsBody.prototype.Fi = function(t, i) {
    serializeV2(t, i, this.Eh), serializeV2(t, i, this.Nh), serializeFix(t, i, this.sX), serializeFix(t, i, this.CY), serializeFix(t, i, this.EY)
}, PhysicsBody.prototype.WW = function(t, i) {
    this.Eh = deserializeV2(t, i), this.rX = v2.Ea(this.Eh), this.Nh = deserializeV2(t, i), this.DY = v2.Ea(this.Nh), this.sX = deserializeFix(t, i), this.tX = this.sX, this.CY = deserializeFix(t, i), this.EY = deserializeFix(t, i)
}, PhysicsBody.prototype.XW = function() {
    return 24
}, physicsBodySimulate = function(t, i, n) {
    v2.bx(i.Eh, i.rX), v2.bx(i.Nh, i.DY);
    var e = v2.create(0, 0);
    v2.ZV(n, i.Nh, e);
    var r = v2.bY(e),
        o = Math.ceil(r / PHYSICS_MAX_STEP_LENGTH);
    v2.Bt(e, o, e), r /= o, v2.ZV(fix.pow(i.EY, n), i.Nh, i.Nh);
    var s = v2.create(0, 0);
    for (y = 0; y < o; y++) {
        v2.ra(e, i.Eh, s);
        var h = calcDensity(t, s[0], s[1]);
        if (h > 0) {
            var a = calcDir(t, s[0], s[1]);
            v2.Bt(a, 2, a), v2.ra(s, a, s);
            var u = v2.create(0, 0);
            if (v2.normalize(a, u), u[0] || u[1]) {
                var c = v2.eY(u, i.Nh),
                    f = [0, 0];
                v2.ZV(-c, u, f), e = [(1 - Math.abs(u[0])) * e[0], (1 - Math.abs(u[1])) * e[1]], v2.ra(f, i.Nh, i.Nh)
            }
        }
        v2.bx(s, i.Eh)
    }
}, entityFunctionPhysicsBodySimulate = function(t, i) {
    var n = t.uV,
        e = t.VW;
    n && e || console.Vb("Missing gameData properties"), n.vV.forEach(function(t) {
        t.jX && physicsBodySimulate(e, t.jX, i)
    })
}, PhysicsBody.prototype.BY = function(t, i, n) {
    if (this.sX != t) {
        var e = Math.cos(t),
            r = Math.sin(t),
            o = Math.cos(this.sX),
            s = Math.sin(this.sX);
        o += (e - o) * i * n, s += (r - s) * i * n, this.sX = Math.atan2(s, o)
    }
}, angleLerp = function(t, i, n) {
    if (t != i) {
        var e = Math.cos(t),
            r = Math.sin(t),
            o = Math.cos(i),
            s = Math.sin(i);
        return o += (e - o) * n, s += (r - s) * n, Math.atan2(s, o)
    }
}, TextureLoader = function() {
    this.wG = {}, this.FY = [], this.ks = 0, this.GY = 0, this.HY = function() {}, this.IY = function() {}
}, TextureLoader.prototype.JY = function(t, i) {
    this.FY[this.ks] = {}, this.FY[this.ks].name = t, this.FY[this.ks].Ud = i ? i : t, ++this.ks
}, TextureLoader.prototype.KY = function() {
    var t = new PIXI.QP.ON,
        i = this;
    t.ra(this.FY[this.GY].name, "data/textures/" + this.FY[this.GY].Ud + ".png"), t.ve("complete", function(t) {
        var n = i.FY[i.GY];
        i.wG[n.name] = t.Yq[n.name].bn, i.IY(n.name, n.Ud, Math.ceil(100 * i.GY / (i.ks - 1))), i.GY + 1 < i.ks ? (++i.GY, i.KY()) : i.HY(i.wG)
    }), t.ve("error", function(t) {
        console.log(t)
    }), t.Tf()
}, TextureLoader.prototype.$q = function(t) {
    this.HY = t
}, TextureLoader.prototype.LY = function(t) {
    this.IY = t
}, TextureManager = function(t) {
    this.MY = t, this.VP = new TextureLoader, this.VP.JY("healthbar"), this.VP.JY("feet", "feetSheet"), this.VP.JY("tool", "toolSheet"), this.VP.JY("body", "body"), this.VP.JY("head", "head"), this.VP.JY("rightArm", "rightArm"), this.VP.JY("leftArm", "leftArm"), this.VP.JY("shovelAtlas.png", "shovelAtlas"), this.VP.JY("itemAtlas.png", "itemAtlas"), this.VP.JY("hatAtlas.png", "hatAtlas"), this.VP.JY("blockAtlas.png", "blockAtlas"), this.VP.JY("blockPosGood.png", "blockPosGood"),
        this.VP.JY("blockPosBad.png", "blockPosBad"), console.log("Loading textures..."), this.VP.KY(), this.VP.LY(function(t, i, n) {
            console.log(n + "% complete"), onTexturesLoadProgress && onTexturesLoadProgress(t, i, n)
        }), this.VP.$q(function(t) {
            console.log("Textures loaded.");
            for (var i in t) t[i].name = i;
            for (var n in Items) {
                var e = Items[n];
                if (e.bn.NY) {
                    var r = e.bn.Aj ? e.bn.Aj : 0,
                        o = e.bn.Bj ? e.bn.Bj : 0,
                        s = new PIXI.Yv(e.OY % e.bn.NY * (e.bn.PY + r), Math.floor(e.OY / e.bn.NY) * (e.bn.QY + o), e.bn.PY, e.bn.QY);
                    t[e.name] = new PIXI.sA(t[e.bn.ft], s)
                } else t[e.name] = t[e.bn.ft]
            }
            this.MY.wG = t, onTexturesLoadComplete && onTexturesLoadComplete(t)
        }.bind(this))
}, TextureManager.prototype.$q = function(t) {
    this.HY = t
}, TextureManager.prototype.LY = function(t) {
    this.IY = t
}, Generator = function(t) {
    t || (t = 0), this.m = t, this.j = this.m, this.RY = this.m + 1, this.SY = this.m + 331, this.TY = this.m + 71117
}, Generator.prototype.UY = function(t, i, n) {
    for (var e = 0; e < CHUNK_DIM; ++e)
        for (var r = 0; r < CHUNK_DIM; ++r) {
            var o = r + i * CHUNK_DIM,
                s = e + n * CHUNK_DIM,
                h = Math.sqrt(o * o + s * s) / 200;
            h -= .25, noise.m(this.m);
            var a = noise.p(o / 20, s / 20);
            a += h, noise.m(this.RY);
            var u = noise.p(o / 4, s / 4);
            noise.m(this.SY);
            var c = noise.p(o / 4, s / 4);
            noise.m(this.TY);
            var f = noise.p(o / 4, s / 4),
                l = 0;
            a > 0 && (l = 1), a > .5 && (l = 2), a > 1 && (l = 3), 0 != l && (u > .45 && (l = Tiles.VY.nc), c > .5 && (l = Tiles.WY.nc), f > .25 && (l = Tiles.XY.nc), f < -.25 && (l = Tiles.YY.nc)), t.FW(r, e, l)
        }
    t.DW(4, 4, 0)
}, GLBlockChunk = function(t, i) {
    this.qW = null, this.pW = 0
}, GLBlockChunk.prototype.Mt = function(t, i, n) {
    for (var e = 32, r = (e * BLOCK_CHUNK_DIM, []), o = [], s = 0; s < BLOCK_CHUNK_DIM; s++)
        for (var h = 0; h < BLOCK_CHUNK_DIM; h++) {
            var a = n.SV(s, h);
            if (0 != a) {
                var u = (i.gX[a], 32),
                    c = a % 16 * 2,
                    f = 2 * (a / 16 >> 0);
                r.push(s * e, h * e), r.push((s + 1) * e, h * e), r.push((s + 1) * e, (h + 1) * e), r.push(s * e, h * e), r.push((s + 1) * e, (h + 1) * e), r.push(s * e, (h + 1) * e), o.push((c + 0) / u, 1 - (f + 1) / u), o.push((c + 1) / u, 1 - (f + 1) / u), o.push((c + 1) / u, 1 - (f + 0) / u), o.push((c + 0) / u, 1 - (f + 1) / u), o.push((c + 1) / u, 1 - (f + 0) / u), o.push((c + 0) / u, 1 - (f + 0) / u)
            }
        }
    this.qW || (this.qW = t.Mm()), t.Um(t.Nm, this.qW), t.Tm(t.Nm, 16 * r.length, t.Pm), t.Sm(t.Nm, 0, new Float32Array(r)), t.Sm(t.Nm, 2 * r.length * 4, new Float32Array(o)), this.pW = r.length / 2
}, GLChunk = function(t, i) {
    this.gW = t.Jn(), this.QW = t.Jn(), t.Yn(t.gn, this.QW), t.Tn(t.gn, 0, t.ZY, CHUNK_DIM_2, CHUNK_DIM_2, 0, t.ZY, t.On, null), t.$n(t.gn, t.fo, t.co), t.$n(t.gn, t._n, t.co), t.Rn(t.$Y, 1), t.Rn(t._Y, 1), t.aZ(t.gn, 0, 1, 1, CHUNK_DIM, CHUNK_DIM, t.ZY, t.On, i.BW), t.Yn(t.gn, null), t.Yn(t.gn, this.gW), t.Tn(t.gn, 0, t.ZY, CHUNK_DIM_2, CHUNK_DIM_2, 0, t.ZY, t.On, null), t.$n(t.gn, t.fo, t.do), t.$n(t.gn, t._n, t.do), t.Rn(t.$Y, 1), t.Rn(t._Y, 1), t.aZ(t.gn, 0, 1, 1, CHUNK_DIM, CHUNK_DIM, t.ZY, t.On, i.AW), t.Yn(t.gn, null), i.UV = !1
}, GLChunk.prototype.Mt = function(t, i) {
    t.Yn(t.gn, this.QW), t.aZ(t.gn, 0, 1, 1, CHUNK_DIM, CHUNK_DIM, t.ZY, t.On, i.BW), t.Yn(t.gn, null), i.UV = !1
}, GLChunk.prototype.TW = function(t, i, n, e, r, o) {
    if (i) {
        for (var s = Math.max(n * CHUNK_DIM - 1, r * CHUNK_DIM), h = Math.max(e * CHUNK_DIM - 1, o * CHUNK_DIM), a = Math.min((n + 1) * CHUNK_DIM, (r + 1) * CHUNK_DIM - 1), u = Math.min((e + 1) * CHUNK_DIM, (o + 1) * CHUNK_DIM - 1), c = s - n * CHUNK_DIM + 1, f = h - e * CHUNK_DIM + 1, l = a - n * CHUNK_DIM + 1, p = u - e * CHUNK_DIM + 1, v = s - r * CHUNK_DIM, y = h - o * CHUNK_DIM, d = l - c + 1, g = p - f + 1, m = new Uint8Array(d * g), b = 0; b < d; ++b)
            for (var w = 0; w < g; ++w) m[b + w * d] = i.BW[v + b + (y + w) * CHUNK_DIM];
        for (var x = new Uint8Array(d * g), b = 0; b < d; ++b)
            for (var w = 0; w < g; ++w) x[b + w * d] = i.AW[v + b + (y + w) * CHUNK_DIM];
        t.Yn(t.gn, this.QW), t.aZ(t.gn, 0, c, f, l - c + 1, p - f + 1, t.ZY, t.On, m), t.Yn(t.gn, null), t.Yn(t.gn, this.gW), t.aZ(t.gn, 0, c, f, l - c + 1, p - f + 1, t.ZY, t.On, x), t.Yn(t.gn, null)
    }
};
var u = {};
HUDClosures = [], createHUD = function(t) {
    var i = document.mc("inventory");
    $(i).Xf(function(t) {
        t.Mf()
    }), i.fa = '<div class="inventoryHeader">Your amazing inventory</div>';
    var n = document.t("div");
    n.qc("class", "inventoryContent");
    for (var e = 0; e < 64; ++e) {
        var r = document.t("div");
        r.qc("class", "inventorySlot"), r.qc("id", "slot" + e), r.qc("title", "Empty slot");
        var o = document.t("div");
        o.qc("class", "slotDescriber"), r.x(o);
        var s = document.t("div");
        s.qc("class", "slotImageContainer"), s.T.bZ = "no-repeat", r.x(s);
        var h = document.t("div");
        h.qc("class", "slotImageContainerOverlay"), r.x(h);
        var a = document.t("div");
        a.qc("class", "slotTextContainer"), r.x(a), n.x(r)
    }
    i.x(n), $(".inventorySlot").Hg(function() {
        var t = $(this).Fc(".slotDescriber");
        t.Xh(50);
        var i = $(this).Fc(".slotTextContainer");
        i.Yh(50)
    }).Ig(function() {
        var t = $(this).Fc(".slotDescriber");
        t.Yh(50);
        var i = $(this).Fc(".slotTextContainer");
        i.Xh(50)
    });
    var u = document.mc("dugItems");
    u.fa = "";
    for (var e = 0; e < t.gX.length; ++e) {
        var c = t.gX[e];
        if (c.hX) {
            var f = document.t("div");
            f.qc("class", "dugItemsEntry"), f.qc("id", "entry" + e);
            var l = document.t("div");
            l.qc("class", "dugItemsEntryImage"), l.T.bZ = "no-repeat", l.T.cZ = "url('data/textures/tiles/" + c.name + ".png')", f.x(l);
            var p = document.t("div");
            p.qc("class", "dugItemsEntryText"), p.xd = "0.0", f.x(p), u.x(f)
        }
    }
    var v = document.t("div");
    v.qc("class", "dugItemsFooter"), u.x(v);
    for (var y = function(t) {
            return function() {
                var i = new MessageRequestDropStack(t);
                i.rj(socket)
            }
        }, d = function(t) {
            return function() {
                var i = new MessageRequestEquipStack(t);
                return i.rj(socket), !1
            }
        }, e = 0; e < 64; ++e) HUDClosures[e] = [], HUDClosures[e][0] = y(e), HUDClosures[e][1] = d(e);
    $(".dugItemsEntryImage").Hg(function() {
        var i = $(this).Kd().Fc(".dugItemsEntryText"),
            n = $(this).Kd().gd("id").substr($(this).Kd().gd("id").length - 1),
            e = t.gX[n];
        i.u(e.name)
    }).Ig(function() {
        updateHUD(t)
    }), $("*").dZ(function(i) {
        i.Mf();
        var n = i.Gg;
        if (67 == n) {
            var e = document.mc("crafting");
            return e.T.$ && "none" != e.T.$ ? closeCraftingWindow() : openCraftingWindow(t), !0
        }
        return !0
    }), $("*").dZ(function(t) {
        32 == t.tg && t.Lf()
    })
}, updateHUD = function(t) {
    for (var i = 0; i < 64; ++i) {
        var n = document.mc("slot" + i),
            e = n.ia[0],
            r = n.ia[1],
            o = n.ia[2],
            s = n.ia[3];
        o.T.cZ = "";
        var h = I.BX.DX.CX[i];
        if (h) {
            r.T.Ka = 34, r.T.Ua = 34;
            var a = t.yX[h.nc];
            putItemImage(r, a, 32, 32, a.bn.eZ, a.bn.fZ, a.bn.gZ), s.xd = "", h.iY > 1 && (s.xd = h.iY), e.xd = a.name, o.T.$ = "none", h.xX && (o.T.$ = "block"), n.hZ = HUDClosures[i][0], n.iZ = HUDClosures[i][1]
        } else r.T.cZ = "", s.xd = "", e.xd = "", n.hZ = null
    }
    for (var i = 0; i < t.gX.length; ++i) {
        var u = t.gX[i];
        if (u.hX) {
            var c = 0;
            I.BX.jZ[i] && (c = I.BX.jZ[i]);
            var f = document.mc("entry" + i),
                l = f.ia[1];
            l.xd = parseFloat(Math.floor(c / 256 * 10) / 10).toFixed(1)
        }
    }
}, openCraftingWindow = function(t) {
    u.kZ = null;
    var i = document.mc("crafting");
    i.T.$ = "block", $(i).Xf(function(t) {
        t.Mf()
    });
    var n = document.t("div");
    n.qc("class", "craftingLeft"), i.x(n);
    var e = document.t("div");
    e.qc("class", "craftingRight"), i.x(e);
    var r = document.t("div");
    r.qc("class", "craftingRightTextContainer"), r.qc("id", "craftingRightTextContainer"), e.x(r);
    var o = document.t("div");
    o.qc("class", "craftingRightPreview"), e.x(o);
    var s = document.t("div");
    s.qc("class", "craftingRightPreviewImageHolder"), o.x(s);
    var h = document.t("div");
    h.qc("class", "craftingRightPreviewTextContainer"), o.x(h);
    var a = document.t("div");
    a.qc("class", "craftButton"), a.xd = "Craft", e.x(a), $(a).Xf(function(t) {
        var i = u.kZ;
        if (null != i && void 0 != i) {
            var n = new MessageRequestCraft(i);
            n.rj(socket)
        }
    });
    for (var c = 0; c < Recipes.length; ++c) {
        var f = Recipes[c],
            l = document.t("div");
        l.qc("class", "craftingEntry"), l.qc("recipeId", c), n.x(l);
        var p = document.t("div");
        p.qc("class", "craftingEntryOverlay"), l.x(p), $(l).Xf(function() {
            $(".craftingEntry > .craftingEntryOverlay").F(function() {
                this.T.$ = "none"
            });
            var i = this.ia[0];
            i.T.$ = "block";
            var n = $(this).gd("recipeId");
            u.kZ = n;
            for (var e = Recipes[n], r = 0; r < e.qX.length; ++r) {
                var o = e.qX[r][0],
                    a = (e.qX[r][1], t.wG[o.name].Ka),
                    c = t.wG[o.name].Ua;
                s.T.Ka = a, s.T.Ua = c, putItemImage(s, o, 80, 80), h.xd = o.name
            }
            checkCanAffordRecipe()
        });
        var v = document.t("div");
        v.qc("class", "craftingEntryContent"), l.x(v);
        for (var y = 0; y < f.lZ.length; ++y) {
            var d = f.lZ[y][0],
                g = f.lZ[y][1],
                m = document.t("div");
            if (m.qc("class", "craftingImageHolder"), m.T.cZ = "url('data/textures/tiles/" + d.name + ".png')", m.T.Ka = 32, m.xd = g, v.x(m), y < f.lZ.length - 1) {
                var b = document.t("div");
                b.qc("class", "craftingEntryContentOperator"), b.xd = "+", v.x(b)
            }
        }
        if (f.lZ.length > 0 && f.mZ.length > 0) {
            var b = document.t("div");
            b.qc("class", "craftingEntryContentOperator"), b.xd = "+", v.x(b)
        }
        for (var y = 0; y < f.mZ.length; ++y) {
            var w = f.mZ[y][0],
                g = f.mZ[y][1],
                x = t.wG[w.name].Ka,
                C = t.wG[w.name].Ua,
                m = document.t("div");
            if (m.qc("class", "craftingImageHolder"), m.T.Ka = x, m.T.Ua = C, putItemImage(m, w, x, C, !1, !1), m.xd = g, v.x(m), y < f.mZ.length - 1) {
                var b = document.t("div");
                b.qc("class", "craftingEntryContentOperator"), b.xd = "+", v.x(b)
            }
        }
        var M = document.t("div");
        M.qc("class", "craftingEntryContentOperator"), M.xd = "=", v.x(M);
        for (var y = 0; y < f.qX.length; ++y) {
            var F = f.qX[y][0],
                z = f.qX[y][1],
                x = t.wG[F.name].Ka,
                C = t.wG[F.name].Ua,
                m = document.t("div");
            if (m.qc("class", "craftingImageHolder"), m.T.Ka = x, m.T.Ua = C, putItemImage(m, F, x, C, !1, !1), z > 1 && (m.xd = z), v.x(m), y < f.qX.length - 1) {
                var b = document.t("div");
                b.qc("class", "craftingEntryContentOperator"), b.xd = "+", v.x(b)
            }
        }
        if (c < Recipes.length - 1) {
            var I = document.t("div");
            I.qc("class", "craftingEntrySeparator"), n.x(I)
        }
    }
}, closeCraftingWindow = function() {
    var t = document.mc("crafting");
    t.fa = "", t.T.$ = "none"
}, checkCanAffordRecipe = function() {
    var t = u.kZ;
    if (null != t && void 0 != t) {
        var i = Recipes[t],
            n = document.mc("craftingRightTextContainer");
        n && (I.BX.nZ(i) === !1 ? n.xd = "Not enough resources" : n.xd = "")
    }
}, putItemImage = function(t, i, n, e, r, o, s) {
    var h = n / Math.max(i.bn.PY, i.bn.QY);
    n && s || (h = 1), s && (h *= s);
    var a = i.bn.Aj ? i.bn.Aj : 0,
        u = h * (i.bn.PY + a) * (i.bn.NY || 1),
        c = h * (i.bn.QY + a) * (i.bn.oZ || 1);
    t.T.pZ = u.toString() + "px " + c.toString() + "px ";
    var f = Math.floor(Math.max(0, n / 2 - h * i.bn.PY / 2)),
        l = Math.floor(Math.max(0, e / 2 - h * i.bn.QY / 2));
    t.T.qZ = f.toString() + "px", t.T.rZ = f.toString() + "px", t.T.sZ = l.toString() + "px", t.T.tZ = l.toString() + "px", t.T.eu = "solid", t.T.uZ = "rgba(0,0,0,0)", t.T.cZ = "url('data/textures/" + i.bn.ft + "')";
    var o = o ? o : v2.create(0, 0),
        p = -1 * h * ((i.OY ? i.OY : 0) % (i.bn.NY || 1)) * (i.bn.PY + a) + o[0],
        v = -1 * h * (((i.OY ? i.OY : 0) / (i.bn.NY || 1) >> 0) % (i.bn.oZ || 1)) * i.bn.QY + o[1];
    t.T.vZ = p.toString() + "px " + v.toString() + "px", t.T.pw = "", r && (t.T.pw = "rotate(" + 180 * r / Math.PI + "deg)")
}, IdList = function(t) {
    this.wZ = t || 1, this.xZ = []
}, IdList.prototype.zc = function() {
    return this.xZ.length > 0 ? this.xZ.pop() : ++this.wZ
}, IdList.prototype.hb = function(t) {
    this.xZ.push(t)
}, IndexCounter = function(t) {
    t ? this.xc = t : this.xc = 0
}, IndexCounter.prototype.ra = function(t) {
    this.xc += t
}, Inventory = function() {
    this.CX = []
}, Inventory.prototype.yZ = function() {
    this.CX.sort(function(t, i) {
        return t.nc < i.nc ? -1 : t.nc > i.nc ? 1 : 0
    })
}, Inventory.prototype.zZ = function(t, i, n) {
    for (var e = t.yX[i].AZ, r = 0; !0; ++r) {
        if (n < 0) return console.log("inventory bad thing happens!"), void this.yZ();
        if (0 == n) return void this.yZ();
        if (r >= this.CX.length || !this.CX[r]) {
            var o = n <= e ? n : e;
            this.CX.push({
                nc: i,
                name: t.yX[i].name,
                iY: o
            }), n -= o
        } else if (this.CX[r].nc === i && this.CX[r].iY < e) {
            var s = e - this.CX[r].iY,
                o = n <= s ? n : s;
            this.CX[r].iY += o, n -= o
        }
    }
    this.yZ()
}, Inventory.prototype.FS = function(t, i, n) {
    for (var e = [], r = this.CX.length - 1; r >= 0; --r) {
        var o = this.CX[r].iY;
        if (this.CX[r].nc === i && o >= 0) {
            var s = n <= o ? n : o;
            this.CX[r].iY -= s, this.CX[r].iY <= 0 && (e.push([r, this.CX[r].nc]), this.CX.splice(r, 1)), n -= s
        }
        if (n < 0 && console.log("inventory bad thing happens!"), 0 == n) return this.yZ(), e
    }
    return this.yZ(), e
}, Inventory.prototype.BZ = function(t, i) {
    for (var n = 0, e = 0; e < this.CX.length; ++e)
        if (this.CX[e].nc === t && (n += this.CX[e].iY, n >= i)) return !0;
    return !1
}, Inventory.prototype.CZ = function(t) {
    for (var i = 0, n = 0; n < this.CX.length; ++n) this.CX[n].nc === t && (i += this.CX[n].iY);
    return i
}, Inventory.prototype.DZ = function(t) {
    var i = this.CX[t];
    return delete this.CX[t], this.CX.splice(t, 1), this.yZ(d), i
}, Inventory.prototype.EX = function(t, i, n) {
    for (var e = [], r = 0; r < this.CX.length; ++r) {
        var o = t.yX[this.CX[r].nc];
        o.z == i && this.CX[r].xX && (this.CX[r].xX = !1, e.push([r, this.CX[r].nc]))
    }
    return this.yZ(t), e
}, Inventory.prototype.EZ = function(t) {
    for (var i = 0; i < this.CX.length; ++i) {
        var n = this.CX[i];
        if (n.xX) {
            var e = d.yX[n.nc];
            if (e.z == t) return e
        }
    }
}, Inventory.prototype.FZ = function(t) {
    for (var i = 0; i < this.CX.length; ++i) {
        var n = this.CX[i];
        if (n.xX) {
            var e = d.yX[n.nc];
            if (e.z == t) return i
        }
    }
}, Items = {}, ItemTextures = {}, ItemTextures.GZ = {
    ft: "shovelAtlas.png",
    PY: 64,
    QY: 32,
    gZ: 1.5,
    eZ: -Math.PI / 4,
    fZ: [-8, 0],
    NY: 4,
    oZ: 8
}, ItemTextures.HZ = {
    ft: "itemAtlas.png",
    PY: 32,
    QY: 32,
    gZ: 1,
    eZ: 0,
    fZ: [0, 0],
    NY: 16,
    oZ: 16
}, ItemTextures.IZ = {
    ft: "hatAtlas.png",
    PY: 32,
    QY: 32,
    gZ: 1,
    eZ: 0,
    fZ: [0, 0],
    NY: 16,
    oZ: 16
}, ItemTextures.JZ = {
    ft: "blockAtlas.png",
    PY: 32,
    QY: 32,
    Aj: 32,
    Bj: 0,
    KZ: 0,
    LZ: 0,
    gZ: 1,
    eZ: 0,
    fZ: [0, 0],
    AX: [0, 10],
    NY: 16,
    oZ: 16
}, initItems = function(t) {
    var i = 0;
    for (var n in Blocks) {
        var e = Blocks[n];
        Items[n] = {
            name: e.name,
            bn: ItemTextures.JZ,
            OY: i,
            MZ: !0,
            NZ: !0,
            AZ: 100,
            z: "tool",
            OZ: "block",
            PZ: i
        }, ++i
    }
    Items.QZ = {
        name: "Ugly Hat",
        bn: ItemTextures.IZ,
        OY: 3,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "hat"
    }, Items.RZ = {
        name: "Broken Hat",
        bn: ItemTextures.IZ,
        OY: 0,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "hat"
    }, Items.SZ = {
        name: "Rusty Shovel",
        bn: ItemTextures.GZ,
        OY: 0,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 1,
        $W: Tiles.WY.vW
    }, Items.TZ = {
        name: "Copper Shovel",
        bn: ItemTextures.GZ,
        OY: 1,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 1.2,
        $W: Tiles.XY.vW
    }, Items.UZ = {
        name: "Iron Shovel",
        bn: ItemTextures.GZ,
        OY: 2,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 1.6,
        $W: Tiles.XY.vW
    }, Items.VZ = {
        name: "Steel Shovel",
        bn: ItemTextures.GZ,
        OY: 3,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 1.8,
        $W: Tiles.YY.vW
    }, Items.WZ = {
        name: "Apatite Shovel",
        bn: ItemTextures.GZ,
        OY: 4,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 2,
        $W: 64
    }, Items.XZ = {
        name: "Lapis Lazuli Shovel",
        bn: ItemTextures.GZ,
        OY: 5,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 2.2,
        $W: 64
    }, Items.YZ = {
        name: "Turquoise Shovel",
        bn: ItemTextures.GZ,
        OY: 6,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 2.3,
        $W: 64
    }, Items.ZZ = {
        name: "Magnetite Shovel",
        bn: ItemTextures.GZ,
        OY: 7,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 2.4,
        $W: 64
    }, Items.$Z = {
        name: "Olivine Shovel",
        bn: ItemTextures.GZ,
        OY: 8,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 2.6,
        $W: 64
    }, Items._Z = {
        name: "Quartz Shovel",
        bn: ItemTextures.GZ,
        OY: 9,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 2.8,
        $W: 64
    }, Items.a$ = {
        name: "Emerald Shovel",
        bn: ItemTextures.GZ,
        OY: 10,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 3,
        $W: 64
    }, Items.b$ = {
        name: "Topaz Shovel",
        bn: ItemTextures.GZ,
        OY: 11,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 3.2,
        $W: 64
    }, Items.c$ = {
        name: "Ruby Shovel",
        bn: ItemTextures.GZ,
        OY: 12,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 3.6,
        $W: 64
    }, Items.d$ = {
        name: "Diamond Shovel",
        bn: ItemTextures.GZ,
        OY: 13,
        MZ: !0,
        NZ: !0,
        AZ: 1,
        z: "tool",
        OZ: "shovel",
        ZW: 4
    }, Items.pX = {
        name: "Rotten Root",
        bn: ItemTextures.HZ,
        OY: 0,
        MZ: !1,
        NZ: !0,
        AZ: 4,
        z: "resource"
    }, Items.e$ = {
        name: "Small Sticks",
        bn: ItemTextures.HZ,
        OY: 1,
        MZ: !1,
        NZ: !0,
        AZ: 100,
        z: "resource"
    }, Items.f$ = {
        name: "Dynamite",
        bn: ItemTextures.HZ,
        OY: 2,
        MZ: !0,
        NZ: !0,
        AZ: 8,
        z: "tool",
        OZ: "explosive",
        ZW: 0,
        $W: 0
    }, Items.g$ = {
        name: "Torch",
        bn: ItemTextures.HZ,
        OY: 3,
        MZ: !1,
        NZ: !0,
        AZ: 10,
        z: "resource"
    }
}, MessageChunk = function(t, i, n, e) {
    this.NW = t || new Chunk, this.lW = i || new BlockChunk, this.h$ = !0, this.g = n, this.h = e
}, MessageChunk.prototype.UW = function(t) {
    t.i$.UY(this.NW, this.g, this.h), t.VW.P(this.g, this.h, this.NW), this.h$ || t.j$.P(this.g, this.h, this.lW)
}, MessageChunk.prototype.rj = function(t) {
    var i = [],
        n = new IndexCounter;
    serializeInt32(i, n, this.g), serializeInt32(i, n, this.h);
    var e = compressRLE(this.NW.BW);
    serializeInt32(i, n, e.length), serializeUint8Array(i, n, e), e = compressRLE(this.lW.QV), serializeInt32(i, n, e.length), serializeUint8Array(i, n, e), e = compressRLE(this.lW.RV), serializeInt32(i, n, e.length), serializeUint8Array(i, n, e), e = compressRLE(this.lW.GL), serializeInt32(i, n, e.length), serializeUint8Array(i, n, e), t.Ll(this.k$, new Buffer(i))
}, MessageChunk.prototype.l$ = function(t, i) {
    var n = new Uint8Array(i),
        e = new IndexCounter;
    this.g = deserializeInt32(n, e), this.h = deserializeInt32(n, e);
    var r = deserializeInt32(n, e);
    decompressRLE(n, this.NW.BW, e.xc, e.xc + r), e.ra(r), r = deserializeInt32(n, e), r > 8 && (this.h$ = !1), decompressRLE(n, this.lW.QV, e.xc, e.xc + r), e.ra(r), r = deserializeInt32(n, e), r > 8 && (this.h$ = !1), decompressRLE(n, this.lW.RV, e.xc, e.xc + r), e.ra(r), r = deserializeInt32(n, e), r > 8 && (this.h$ = !1), decompressRLE(n, this.lW.GL, e.xc, e.xc + r), e.ra(r)
}, MessageCommands = function(t) {
    this.m$ = t ? t.m$ : 0, this.n$ = t ? t.n$ : []
}, MessageCommands.prototype.UW = function(t) {
    var i = this;
    setTimeout(function() {
        t.o$[i.m$] = i.n$
    }, t.p$ + t.q$ * Math.random())
}, MessageCommands.prototype.rj = function(t) {
    var i = 4;
    this.n$.forEach(function(t) {
        i += 4 + t.XW()
    });
    var n = new Buffer(i),
        e = new IndexCounter;
    serializeInt32(n, e, this.m$), this.n$.forEach(function(t) {
        serializeInt32(n, e, t.nc), t.Fi(n, e)
    }), t.Ll(this.k$, n)
}, MessageCommands.prototype.l$ = function(t, i) {
    i = new Uint8Array(i);
    var n = new IndexCounter;
    for (this.m$ = deserializeInt32(i, n); n.xc < i.Rm;) {
        var e = deserializeInt32(i, n),
            r = new t.r$[e];
        r.WW(i, n), this.n$.push(r)
    }
}, MessageEntityDestroy = function(t) {
    this.bX = t
}, MessageEntityDestroy.prototype.UW = function(t) {
    var i = t.uV._W[this.bX];
    i.lX && i.lX.hb(), i.lX && i.lX.hb(i.wV.wV), t.uV.hb(i)
}, MessageEntityDestroy.prototype.XW = function() {
    return 4
}, MessageEntityDestroy.prototype.rj = function(t) {
    var i = new Buffer(this.XW()),
        n = new IndexCounter;
    serializeInt32(i, n, this.bX), t.Ll(this.k$, i)
}, MessageEntityDestroy.prototype.l$ = function(t, i) {
    i = new Uint8Array(i);
    var n = new IndexCounter;
    this.bX = deserializeInt32(i, n)
}, MessageEntitySpawn = function(t, i) {
    this.xY = i, i && (this.bX = i.nc)
}, MessageEntitySpawn.prototype.UW = function(t) {
    t.uV._W[this.bX] ? console.log("Entity already exists!") : t.uV.ra(this.xY, this.bX), this.xY.lX && this.xY.wV && this.xY.lX.sY(this.xY.wV.wV)
}, MessageEntitySpawn.prototype.XW = function() {
    var t = 8;
    return this.s$ = 0, forIn(this, this.xY, function(i) {
        i = this.xY[i], i.Fi && (t += 4 + i.XW(), ++this.s$)
    }), t
}, MessageEntitySpawn.prototype.rj = function(t, i) {
    var n = new Array(this.XW()),
        e = new IndexCounter;
    serializeInt32(n, e, this.xY.nc), serializeInt32(n, e, this.s$), forIn(this, this.xY, function(t) {
        var i = this.xY[t];
        i.Fi && (serializeInt32(n, e, i.nc), i.Fi(n, e))
    }), i.Ll(this.k$, new Buffer(n))
}, MessageEntitySpawn.prototype.l$ = function(t, i) {
    i = new Uint8Array(i);
    for (var n = new IndexCounter, e = deserializeInt32(i, n), r = deserializeInt32(i, n), o = {}, s = 0; s < r; ++s) {
        var h = deserializeInt32(i, n),
            a = t.t$[h],
            u = a.prototype.name;
        o[u] = new a, o[u].WW(i, n, t)
    }
    this.bX = e, this.xY = o
}, MessageInit = function(t, i) {
    this.u$ = [], this.m$ = t ? t.m$ : 0, i && (this.YW = i.nc, this.bX = i.bX, this.v$ = i.name), t && t.uV.Mt()
}, MessageInit.prototype.UW = function(t) {
    t.m$ = this.m$;
    var i = t.aX.ra(new Player(this.YW, this.bX, this.v$), this.YW);
    i.w$(this.v$, t);
    for (var n = 0; n < this.u$.length; ++n) {
        var e = this.u$[n],
            i = t.aX.ra(new Player(e[0], e[1], e[2]), e[0]);
        i.w$(e[2], t)
    }
}, MessageInit.prototype.XW = function(t) {
    var i = 20 + getUTF8SerializationSize(this.v$),
        n = {};
    return console.log("forof of"), console.log(t.uV.vV), forOf(this, t.uV.vV, function(t) {
        i += 8;
        var e = 0;
        console.log("forin of "), console.log(t), forIn(this, t, function(i) {
            component = t[i], void 0 != component.Fi && (console.log("component " + component.nc + " serialization size " + component.XW()), e += 4 + component.XW())
        }), n[t.nc] = e, i += e
    }), this.x$ = n, i += 4, t.aX.vV.forEach(function(t) {
        t.nc != this.YW && (i += 8 + getUTF8SerializationSize(t.name))
    }.bind(this)), i
}, MessageInit.prototype.rj = function(t, i) {
    var n = new Array(this.XW(t)),
        e = new IndexCounter;
    serializeInt32(n, e, this.m$), serializeInt32(n, e, this.YW), serializeInt32(n, e, this.bX), serializeUTF8(n, e, this.v$), serializeInt32(n, e, t.i$.m), serializeInt32(n, e, t.uV.vV.length), t.uV.vV.forEach(function(t) {
        serializeInt32(n, e, t.nc), serializeInt32(n, e, this.x$[t.nc]), Object.keys(t).forEach(function(i) {
            var r = t[i];
            r.Fi && (serializeInt32(n, e, r.nc), r.Fi(n, e))
        }.bind(this))
    }.bind(this)), serializeInt32(n, e, t.aX.vV.length), t.aX.vV.forEach(function(t) {
        t.nc != this.YW && (serializeInt32(n, e, t.nc), serializeInt32(n, e, t.bX), serializeUTF8(n, e, t.name))
    }.bind(this)), i.Ll(this.k$, new Buffer(n))
}, MessageInit.prototype.l$ = function(t, i) {
    i = new Uint8Array(i);
    var n = new IndexCounter;
    this.m$ = deserializeInt32(i, n), this.YW = deserializeInt32(i, n), this.bX = deserializeInt32(i, n), this.v$ = deserializeUTF8(i, n), t.i$ = new Generator(deserializeInt32(i, n));
    for (var e = deserializeInt32(i, n), r = 0; r < e; ++r) {
        for (var o = deserializeInt32(i, n), s = deserializeInt32(i, n), h = n.xc + s, a = {}; n.xc < h;) {
            var u = deserializeInt32(i, n),
                c = t.t$[u],
                f = c.prototype.name;
            a[f] = new c, a[f].WW(i, n, t)
        }
        t.uV._W[o] ? console.log("Entity does already exist!") : t.uV.ra(a, o), a.lX && a.wV && a.lX.sY(a.wV.wV)
    }
    for (var l = deserializeInt32(i, n), r = 0; r < l; ++r) {
        var p = deserializeInt32(i, n),
            o = deserializeInt32(i, n),
            v = deserializeUTF8(i, n);
        this.u$.push([p, o, v])
    }
    this.ke = n
}, BlockTypes = {
    y$: 0,
    z$: 1,
    A$: 2
}, MessagePlayerBuild = function(t, i, n, e, r) {
    this.YW = t, this.g = i, this.h = n, this.nc = e, this.z = r
}, MessagePlayerBuild.prototype.UW = function(t) {
    setForeground(t.j$, this.g, this.h, this.nc);
    var i = t.aX._W[this.YW];
    if (i) {
        var n = t.uV._W[i.bX];
        n && (isServer || n.wV.wV.tV.FV(t, "rightArm", 256, !1))
    }
}, MessagePlayerBuild.prototype.XW = function() {
    return 20
}, MessagePlayerBuild.prototype.rj = function(t) {
    var i = new Buffer(this.XW()),
        n = new IndexCounter;
    serializeInt32(i, n, this.YW), serializeInt32(i, n, this.g), serializeInt32(i, n, this.h), serializeInt32(i, n, this.nc), serializeInt32(i, n, this.z), t.Ll(this.k$, i)
}, MessagePlayerBuild.prototype.l$ = function(t, i) {
    i = new Uint8Array(i);
    var n = new IndexCounter;
    this.YW = deserializeInt32(i, n), this.g = deserializeInt32(i, n), this.h = deserializeInt32(i, n), this.nc = deserializeInt32(i, n), this.z = deserializeInt32(i, n)
}, InventoryActions = {
    nX: 0,
    B$: 1,
    C$: 2,
    D$: 3,
    E$: 4
}, MessagePlayerInventory = function(t, i, n, e) {
    this.YW = t, this.F$ = i, this.nc = n, this.iY = e
}, MessagePlayerInventory.prototype.UW = function(t) {
    var i = t.aX._W[this.YW];
    if (i) {
        if (this.F$ == InventoryActions.nX) i.jZ[this.nc] || (i.jZ[this.nc] = 0), i.jZ[this.nc] += this.iY;
        else if (this.F$ == InventoryActions.B$) i.jZ[this.nc] || (i.jZ[this.nc] = 0), i.jZ[this.nc] -= this.iY;
        else if (this.F$ == InventoryActions.C$) i.DX.zZ(t, this.nc, this.iY);
        else if (this.F$ == InventoryActions.D$) {
            var n = i.DX.FS(t, this.nc, this.iY);
            if (isServer)
                for (var e = 0; e < n.length; ++e) {
                    var r = n[e],
                        o = new CommandPlayerEquipItem(i.YW, r[0], r[1], !1);
                    t.n$.push(o)
                }
        } else if (this.F$ == InventoryActions.E$) {
            i.DX.DZ(this.nc)
        }
        isServer || this.YW != I.BX.YW || (updateHUD(t), checkCanAffordRecipe())
    }
}, MessagePlayerInventory.prototype.XW = function() {
    return 16
}, MessagePlayerInventory.prototype.rj = function(t) {
    var i = new Buffer(this.XW()),
        n = new IndexCounter;
    serializeInt32(i, n, this.YW), serializeInt32(i, n, this.F$), serializeInt32(i, n, this.nc), serializeInt32(i, n, this.iY), t.Ll(this.k$, i)
}, MessagePlayerInventory.prototype.l$ = function(t, i) {
    i = new Uint8Array(i);
    var n = new IndexCounter;
    this.YW = deserializeInt32(i, n), this.F$ = deserializeInt32(i, n), this.nc = deserializeInt32(i, n), this.iY = deserializeInt32(i, n)
}, MessagePlayerJoin = function(t) {
    t && (this.YW = t.nc, this.bX = t.bX, this.v$ = t.name)
}, MessagePlayerJoin.prototype.UW = function(t) {
    console.log(this.v$ + " connected with playerId " + this.YW);
    var i = entityTemplates.BX(this.YW, this.bX, this.v$, t).BX;
    i.w$(this.v$, t);
    var n = t.uV._W[this.bX];
    n.lX && n.wV && n.lX.sY(n.wV.wV)
}, MessagePlayerJoin.prototype.XW = function() {
    return 8 + getUTF8SerializationSize(this.v$)
}, MessagePlayerJoin.prototype.rj = function(t) {
    var i = new Array(this.XW()),
        n = new IndexCounter;
    serializeInt32(i, n, this.YW), serializeInt32(i, n, this.bX), serializeUTF8(i, n, this.v$), t.Ll(this.k$, new Buffer(i))
}, MessagePlayerJoin.prototype.l$ = function(t, i) {
    i = new Uint8Array(i);
    var n = new IndexCounter;
    this.YW = deserializeInt32(i, n), this.bX = deserializeInt32(i, n), this.v$ = deserializeUTF8(i, n)
}, MessagePlayerLeave = function(t) {
    t && (this.YW = t.nc, this.bX = t.bX)
}, MessagePlayerLeave.prototype.UW = function(t) {
    var i = t.aX._W[this.YW],
        n = t.uV._W[this.bX];
    console.log(i.name + " disconnected with playerId " + this.YW), n.lX.hb(n.wV.wV), t.aX.hb(i), t.uV.hb(n)
}, MessagePlayerLeave.prototype.XW = function() {
    return 8
}, MessagePlayerLeave.prototype.rj = function(t) {
    var i = new Buffer(this.XW()),
        n = new IndexCounter;
    serializeInt32(i, n, this.YW), serializeInt32(i, n, this.bX), t.Ll(this.k$, i)
}, MessagePlayerLeave.prototype.l$ = function(t, i) {
    i = new Uint8Array(i);
    var n = new IndexCounter;
    this.YW = deserializeInt32(i, n), this.bX = deserializeInt32(i, n)
}, MessagePlayerMove = function(t) {
    this.RX = t
}, MessagePlayerMove.prototype.UW = function(t, i) {
    var n = t.uV._W[i.bX].jX;
    t.n$.push(new CommandPlayerMove(i, this.RX, n.Eh[0], n.Eh[1]))
}, MessagePlayerMove.prototype.rj = function(t) {
    t.Ll(this.k$, this.RX)
}, MessagePlayerMove.prototype.l$ = function(t, i) {
    this.RX = i
}, MessageRequestCraft = function(t) {
    this.G$ = t
}, MessageRequestCraft.prototype.UW = function(t, i) {
    var n = Recipes[this.G$];
    if (n && i.nZ(n)) {
        for (var e = 0; e < n.mZ.length; ++e) {
            var r = n.mZ[e][0],
                o = n.mZ[e][1],
                s = new MessagePlayerInventory(i.YW, InventoryActions.D$, r.nc, o);
            s.UW(t), s.rj(i.KQ)
        }
        for (var e = 0; e < n.lZ.length; ++e) {
            var h = n.lZ[e][0],
                o = 256 * n.lZ[e][1],
                s = new MessagePlayerInventory(i.YW, InventoryActions.B$, h.nc, o);
            s.UW(t), s.rj(i.KQ)
        }
        for (var e = 0; e < n.qX.length; ++e) {
            var a = n.qX[e][0],
                o = n.qX[e][1],
                s = new MessagePlayerInventory(i.YW, InventoryActions.C$, a.nc, o);
            s.UW(t), s.rj(i.KQ)
        }
    }
}, MessageRequestCraft.prototype.rj = function(t) {
    t.Ll(this.k$, this.G$)
}, MessageRequestCraft.prototype.l$ = function(t, i) {
    this.G$ = i
}, MessageRequestDropStack = function(t) {
    this.nc = t
}, MessageRequestDropStack.prototype.UW = function(t, i) {
    var n = i.DX.CX[this.nc];
    if (n) {
        var e = t.uV._W[i.bX],
            r = e.jX,
            o = Math.random() / 5 - .1,
            s = Math.random() / 5 - .1,
            h = Math.random() / 5 - .1 + 1,
            a = v2.create(Math.cos(o + r.sX), -Math.sin(s + r.sX)),
            u = {};
        v2.ZV(10 * h, a, u);
        var c = entityTemplates.qX(idList.zc(), n.nc, n.iY, t);
        c.jX.Eh = v2.create(r.Eh[0], r.Eh[1]), c.jX.rX = v2.create(r.Eh[0], r.Eh[1]), c.jX.Nh = v2.create(u[0], u[1]), c.jX.DY = v2.create(u[0], u[1]), c.jX.sX = r.sX, c.jX.tX = r.sX, c.qX.jY = new Date;
        var f = new MessageEntitySpawn(t, c);
        f.rj(t, io.uX);
        var f = new MessagePlayerInventory(i.YW, InventoryActions.E$, this.nc, 0);
        if (f.UW(t), f.rj(i.KQ), n.xX) {
            var l = new CommandPlayerEquipItem(i.YW, this.nc, n.nc, !1);
            t.n$.push(l)
        }
    }
}, MessageRequestDropStack.prototype.rj = function(t) {
    t.Ll(this.k$, this.nc)
}, MessageRequestDropStack.prototype.l$ = function(t, i) {
    this.nc = i
}, MessageRequestEquipStack = function(t) {
    this.nc = t
}, MessageRequestEquipStack.prototype.UW = function(t, i) {
    var n = i.DX.CX[this.nc];
    if (n) {
        var e = t.yX[n.nc];
        if (e && e.MZ) {
            null != n.xX && void 0 != n.xX || (n.xX = !1);
            var r = !n.xX,
                o = new CommandPlayerEquipItem(i.YW, this.nc, n.nc, r);
            t.n$.push(o)
        }
    }
}, MessageRequestEquipStack.prototype.rj = function(t) {
    t.Ll(this.k$, this.nc)
}, MessageRequestEquipStack.prototype.l$ = function(t, i) {
    this.nc = i
}, MessageRequestItemPickup = function(t) {
    this.bX = t
}, MessageRequestItemPickup.prototype.UW = function(t, i) {
    var n = t.uV._W[this.bX];
    if (n && n.qX && !n.H$) {
        var e = t.uV._W[i.bX];
        if (!e) return;
        var r = n.jX,
            o = e.jX,
            s = v2.cY(r.Eh, o.Eh);
        if (s <= t.I$ + .1) {
            n.H$ = !0;
            var h = new MessagePlayerInventory(i.YW, InventoryActions.C$, n.qX.wX, n.qX.iY);
            h.UW(t), h.rj(i.KQ), h = new MessageEntityDestroy(this.bX), h.UW(t), h.rj(io.uX)
        }
    }
}, MessageRequestItemPickup.prototype.rj = function(t) {
    t.Ll(this.k$, this.bX)
}, MessageRequestItemPickup.prototype.l$ = function(t, i) {
    this.bX = i
}, MessageRequestPlaceBlock = function(t, i, n) {
    this.vX = t, this.g = Math.floor(i), this.h = Math.floor(n)
}, MessageRequestPlaceBlock.prototype.UW = function(t, i) {
    var n = i.DX.CX[this.vX];
    if (n) {
        var e = t.yX[n.nc];
        if (e && "block" == e.OZ) {
            if (!i.DX.BZ(n.nc, 1)) return;
            if (!i.J$(t, this.g, this.h)) return;
            var r = Math.floor(this.g / BLOCK_CHUNK_DIM),
                o = Math.floor(this.h / BLOCK_CHUNK_DIM),
                s = Math.floor(this.g) - r * BLOCK_CHUNK_DIM,
                h = Math.floor(this.h) - o * BLOCK_CHUNK_DIM,
                a = t.j$._(r, o);
            if (a && a.SV(s, h) > 0) return;
            var u = new MessagePlayerInventory(i.YW, InventoryActions.D$, n.nc, 1);
            u.UW(t), u.rj(i.KQ);
            var u = new MessagePlayerBuild(i.YW, this.g, this.h, e.PZ, BlockTypes.y$);
            u.UW(t), u.rj(io.uX)
        }
    }
}, MessageRequestPlaceBlock.prototype.rj = function(t) {
    t.Ll(this.k$, {
        vX: this.vX,
        g: this.g,
        h: this.h
    })
}, MessageRequestPlaceBlock.prototype.l$ = function(t, i) {
    this.vX = i.vX, this.g = i.g, this.h = i.h
}, objectRegisterAdd = function(t, i) {
    return i.nc = t.length, t.push(i), t
}, objectRegisterAddByArray = function(t, i) {
    return forOf(this, i, function(i) {
        registerObject(t, i)
    }), t
}, objectRegisterAddByObject = function(t, i) {
    for (key in i) objectRegisterAdd(t, i[key]);
    return t
}, ObjectWorld = function() {
    this.vV = [], this._W = {}, this.K$ = [], this.L$ = [], this.M$ = null, this.N$ = null
}, ObjectWorld.prototype.ra = function(t, i) {
    return t.It = !1, t.nc = i, this._W[t.nc] = t, this.K$.push(t), t
}, ObjectWorld.prototype.hb = function(t) {
    delete this._W[t.nc], this.L$.push(t)
}, ObjectWorld.prototype.Mt = function() {
    var t = this;
    this.L$.forEach(function(i) {
        i.It = !1, t.N$ && t.N$(i)
    }), this.L$.length = 0, this.K$.forEach(function(i) {
        i.It = !0, t.M$ && t.M$(i)
    }), this.K$.length = 0, this.vV.length = 0;
    for (var i in this._W) this.vV.push(this._W[i])
}, Player = function(t, i, n) {
    this.YW = t, this.bX = i, this.name = n, this.u = null, this.DX = new Inventory, this.jZ = new Array
}, Player.prototype.w$ = function(t, i) {
    var n = i.uV._W[this.bX];
    this.u && n.lX.oY("username"), this.u = new PIXI.mA(t, {
        fH: "Monospace",
        cH: 15,
        zy: 16777215,
        wH: "center"
    });
    var e = new Sprite(null, this.u, !0);
    n.lX.nY("username", e, v2.create(-this.u.Ka / 2, -60), !1)
}, Player.prototype.O$ = function() {
    var t = 0,
        i = this.DX.EZ("tool");
    return i && "shovel" == i.OZ ? i.ZW : t
}, Player.prototype.P$ = function() {
    var t = 0,
        i = this.DX.EZ("tool");
    return i && "shovel" == i.OZ ? i.$W : t
}, Player.prototype.nZ = function(t) {
    for (var i = 0; i < t.mZ.length; ++i) {
        var n = t.mZ[i][0],
            e = t.mZ[i][1];
        if (this.DX.BZ(n.nc, e) === !1) return !1
    }
    for (var i = 0; i < t.lZ.length; ++i) {
        var r = t.lZ[i][0],
            e = 256 * t.lZ[i][1];
        if (!this.jZ[r.nc] || this.jZ[r.nc] < e) return !1
    }
    return !0
}, Player.prototype.GX = function(t, i) {
    "block" == i.OZ && (this.Q$ = !0)
}, Player.prototype.FX = function(t, i) {
    "block" == i.OZ && (this.Q$ = !1)
}, Player.prototype.J$ = function(t, i, n) {
    var e = [32 * i + 16, 32 * n - 16],
        r = t.uV._W[this.bX];
    if (!r) return !1;
    var o = [32 * r.jX.Eh[0], 32 * r.jX.Eh[1]],
        s = Math.sqrt((o[0] - e[0]) * (o[0] - e[0]) + (o[1] - e[1]) * (o[1] - e[1])),
        h = Math.floor(i / BLOCK_CHUNK_DIM),
        a = Math.floor(n / BLOCK_CHUNK_DIM),
        u = t.j$._(h, a),
        c = Math.floor(i) - h * BLOCK_CHUNK_DIM,
        f = Math.floor(n) - a * BLOCK_CHUNK_DIM;
    return s < t.R$ && (!u || !u.SV(c, f))
}, serializeBooleans = function(t, i, n) {
    for (var e = 0; e < 8; ++e) null != n[e] && void 0 != n[e] || (n[e] = !1);
    var r = (n[0] ? 1 : 0) | (n[1] ? 2 : 0) | (n[2] ? 4 : 0) | (n[3] ? 8 : 0) | (n[4] ? 16 : 0) | (n[5] ? 32 : 0) | (n[6] ? 64 : 0) | (n[7] ? 128 : 0);
    serializeInt8(t, i, r)
}, deserializeBooleans = function(t, i) {
    var n = deserializeInt8(t, i),
        e = [];
    return e[0] = n & !0, e[1] = n & !0, e[2] = n & !0, e[3] = n & !0, e[4] = n & !0, e[5] = n & !0, e[6] = n & !0, e[7] = n & !0, e
}, serializeInt8 = function(t, i, n) {
    t[i.xc] = 255 & n, i.ra(1)
}, deserializeInt8 = function(t, i) {
    var n = t[i.xc];
    return i.ra(1), n
}, serializeInt32 = function(t, i, n) {
    t[i.xc] = n >> 24 & 255, t[i.xc + 1] = n >> 16 & 255, t[i.xc + 2] = n >> 8 & 255, t[i.xc + 3] = 255 & n, i.ra(4)
}, deserializeInt32 = function(t, i) {
    var n = t[i.xc] << 24 | t[i.xc + 1] << 16 | t[i.xc + 2] << 8 | t[i.xc + 3];
    return i.ra(4), n
}, serializeFix = function(t, i, n) {
    serializeInt32(t, i, toFix(n) * fix.WX)
}, deserializeFix = function(t, i) {
    return toFix(deserializeInt32(t, i) / fix.WX)
}, serializeV2 = function(t, i, n) {
    serializeFix(t, i, n[0]), serializeFix(t, i, n[1])
}, deserializeV2 = function(t, i) {
    return v2.create(deserializeFix(t, i), deserializeFix(t, i))
}, serializeUint8Array = function(t, i, n) {
    for (var e = i.xc; e < i.xc + n.length; ++e) t[e] = n[e - i.xc];
    i.ra(n.length)
}, deserializeUint8Array = function(t, i, n) {
    for (var e = new Uint8Array(n), r = i.xc; r < i.xc + n; ++r) e[r - i.xc] = t[r];
    return i.ra(n), e
}, getUTF8SerializationSize = function(t) {
    for (var i = [], n = 0, e = 0; e < t.length; e++) {
        var r = t.charCodeAt(e);
        r < 128 ? i[n++] = r : r < 2048 ? (i[n++] = r >> 6 | 192, i[n++] = 63 & r | 128) : 55296 == (64512 & r) && e + 1 < t.length && 56320 == (64512 & t.charCodeAt(e + 1)) ? (r = 65536 + ((1023 & r) << 10) + (1023 & t.charCodeAt(++e)), i[n++] = r >> 18 | 240, i[n++] = r >> 12 & 63 | 128, i[n++] = r >> 6 & 63 | 128, i[n++] = 63 & r | 128) : (i[n++] = r >> 12 | 224, i[n++] = r >> 6 & 63 | 128, i[n++] = 63 & r | 128)
    }
    return i.length + 4
}, serializeUTF8 = function(t, i, n) {
    for (var e = [], r = 0, o = 0; o < n.length; o++) {
        var s = n.charCodeAt(o);
        s < 128 ? e[r++] = s : s < 2048 ? (e[r++] = s >> 6 | 192, e[r++] = 63 & s | 128) : 55296 == (64512 & s) && o + 1 < n.length && 56320 == (64512 & n.charCodeAt(o + 1)) ? (s = 65536 + ((1023 & s) << 10) + (1023 & n.charCodeAt(++o)), e[r++] = s >> 18 | 240, e[r++] = s >> 12 & 63 | 128, e[r++] = s >> 6 & 63 | 128, e[r++] = 63 & s | 128) : (e[r++] = s >> 12 | 224, e[r++] = s >> 6 & 63 | 128, e[r++] = 63 & s | 128)
    }
    serializeInt32(t, i, e.length), serializeUint8Array(t, i, e)
}, deserializeUTF8 = function(t, i) {
    for (var n = deserializeInt32(t, i), e = deserializeUint8Array(t, i, n), r = [], o = 0, s = 0; o < e.length;) {
        var h = e[o++];
        if (h < 128) r[s++] = String.fromCharCode(h);
        else if (h > 191 && h < 224) {
            var a = e[o++];
            r[s++] = String.fromCharCode((31 & h) << 6 | 63 & a)
        } else if (h > 239 && h < 365) {
            var a = e[o++],
                u = e[o++],
                c = e[o++],
                f = ((7 & h) << 18 | (63 & a) << 12 | (63 & u) << 6 | 63 & c) - 65536;
            r[s++] = String.fromCharCode(55296 + (f >> 10)), r[s++] = String.fromCharCode(56320 + (1023 & f))
        } else {
            var a = e[o++],
                u = e[o++];
            r[s++] = String.fromCharCode((15 & h) << 12 | (63 & a) << 6 | 63 & u)
        }
    }
    return r.join("")
}, ShaderRequest = function(t, i) {
    this.b = null, this.source = null, this.z = i;
    var n = new XMLHttpRequest;
    n.Fj("GET", t), n.Mj = function() {
        this.source = n.Oj
    }.bind(this), n.rj()
}, ShaderRequest.prototype.c = function(t) {
    if (null == this.b && null != this.source) {
        var i = t.pp(this.z);
        return t.qp(i, this.source), t.rp(i), t.sp(i, t.tp) ? (this.b = i, !0) : (console.log("ERROR IN  SHADER : " + t.up(i)), !1)
    }
    return !1
}, Tiles = {}, Tiles.oX = {
    name: "Dirt",
    uW: !0,
    hX: !1,
    vW: 1
}, Tiles.S$ = {
    name: "Stone",
    uW: !0,
    hX: !1,
    vW: 4
}, Tiles.T$ = {
    name: "Hard Stone",
    uW: !0,
    hX: !1,
    vW: 8
}, Tiles.U$ = {
    name: "Very Hard Stone",
    uW: !0,
    hX: !1,
    vW: 16
}, Tiles.VY = {
    name: "Coal",
    uW: !0,
    hX: !0,
    vW: 6
}, Tiles.V$ = {
    name: "Sulfur",
    uW: !0,
    hX: !0,
    vW: 20
}, Tiles.WY = {
    name: "Copper",
    uW: !0,
    hX: !0,
    vW: 8
}, Tiles.XY = {
    name: "Iron",
    uW: !0,
    hX: !0,
    vW: 16
}, Tiles.YY = {
    name: "Apatite",
    uW: !0,
    hX: !0,
    vW: 20
}, Tiles.W$ = {
    name: "Lapis Lazuli",
    uW: !0,
    hX: !0,
    vW: 26
}, Tiles.X$ = {
    name: "Iron",
    uW: !0,
    hX: !0,
    vW: 34
}, Tiles.Y$ = {
    name: "Olivine",
    uW: !0,
    hX: !0,
    vW: 44
}, Tiles.Z$ = {
    name: "Quartz",
    uW: !0,
    hX: !0,
    vW: 56
}, Tiles.$$ = {
    name: "Emerald",
    uW: !0,
    hX: !0,
    vW: 70
}, Tiles._$ = {
    name: "Topaz",
    uW: !0,
    hX: !0,
    vW: 86
}, Tiles.a_ = {
    name: "Ruby",
    uW: !0,
    hX: !0,
    vW: 96
}, Tiles.b_ = {
    name: "Diamond",
    uW: !0,
    hX: !0,
    vW: 120
}, TileType = function(t, i, n, e, r) {
    this.nc = t, this.name = i, this.uW = n, this.hX = e, this.vW = r
}, getDensity = function(t, i, n) {
    var e = Math.floor(i / CHUNK_DIM),
        r = Math.floor(n / CHUNK_DIM),
        o = Math.floor(i) - e * CHUNK_DIM,
        s = Math.floor(n) - r * CHUNK_DIM,
        h = t._(e, r);
    return h ? h.CW(o, s) : 255
}, setDensity = function(t, i, n, e) {
    var r = Math.floor(i / CHUNK_DIM),
        o = Math.floor(n / CHUNK_DIM),
        s = Math.floor(i) - r * CHUNK_DIM,
        h = Math.floor(n) - o * CHUNK_DIM,
        a = t._(r, o);
    return a ? void a.DW(s, h, e) : void console.log("Density set on missing chunk!")
}, getTileId = function(t, i, n) {
    var e = Math.floor(i / CHUNK_DIM),
        r = Math.floor(n / CHUNK_DIM),
        o = Math.floor(i) - e * CHUNK_DIM,
        s = Math.floor(n) - r * CHUNK_DIM,
        h = t._(e, r);
    return h ? h.EW(o, s) : 0
}, setTileId = function(t, i, n, e) {
    var r = Math.floor(i / CHUNK_DIM),
        o = Math.floor(n / CHUNK_DIM),
        s = Math.floor(i) - r * CHUNK_DIM,
        h = Math.floor(n) - o * CHUNK_DIM,
        a = t._(r, o);
    return a ? (a.FW(s, h, e), void this.Lg("onChunkChange", r, o, a)) : void console.log("Cannot set tile on missing chunk!")
}, calcDensity = function(t, i, n) {
    var e = Math.floor(i - .5),
        r = Math.floor(n - .5),
        o = e + 1,
        s = r + 1,
        h = i - .5 - e,
        a = n - .5 - r,
        u = [1 - h, 1 - a, h, a],
        c = [getDensity(t, e, r), getDensity(t, o, r), getDensity(t, e, s), getDensity(t, o, s)];
    return u[0] * u[1] * c[0] + u[2] * u[1] * c[1] + u[0] * u[3] * c[2] + u[2] * u[3] * c[3]
}, calcDir = function(t, i, n) {
    var e = .1,
        r = -calcDensity(t, i + e, n + e),
        o = -calcDensity(t, i - e, n + e),
        s = -calcDensity(t, i - e, n - e),
        h = -calcDensity(t, i + e, n - e),
        a = v2.create(+r, +r),
        u = v2.create(-o, +o),
        c = v2.create(-s, -s),
        f = v2.create(+h, -h),
        l = v2.create(0, 0);
    return v2.ra(l, a, l), v2.ra(l, u, l), v2.ra(l, c, l), v2.ra(l, f, l), v2.Bt(l, 255, l), l
}, calcNormal = function(t, i, n) {
    var e = calcDir(t, i, n);
    return v2.bY(e) > 0 && v2.normalize(e, e), e
}, carveCircle = function(t, i, n, e, r, o, s) {
    void 0 != r && null != r || (r = 1);
    for (var h = t.VW, a = t.gX, u = [], c = 0; c < a.length; ++c) u[c] = 0;
    for (var f = parseInt(e + .5), l = -4 * f; l < 4 * f; ++l)
        for (var p = -4 * f; p < 4 * f; ++p) {
            var v = Math.floor(i) + p,
                y = Math.floor(n) + l,
                d = i - .5 - v,
                g = n - .5 - y,
                m = Math.sqrt(d * d + g * g);
            if (!(m > e)) {
                var b = getDensity(h, v, y),
                    w = getTileId(h, v, y),
                    x = a[w];
                if (x) {
                    if (!(o && x.vW > o)) {
                        var C = Math.max(Math.min(e - m, 1) * r, 0) / x.vW,
                            M = Math.max(b - parseInt(255 * C), 0);
                        s && (M = s(v, y, x, b, M));
                        var F = b - M;
                        u[w] += F, setDensity(h, v, y, M, !0)
                    }
                } else console.log("Tile is undefined! TileID: " + w)
            }
        }
    return u
}, typeRegisterAdd = function(t, i) {
    if (void 0 == i.prototype.nc) return i.prototype.nc = t.length, i.prototype.k$ = i.prototype.nc.toString(36), t.push(i), t
}, typeRegisterAddByArray = function(t, i) {
    return forOf(this, i, function(i) {
        typeRegisterAdd(t, i)
    }), t
}, Client = function(t, i) {
    var n = t.ms;
    console.log("Connecting to " + i + ":" + n + "..."), socket = io(i + ":" + n), sentInit2 = !1, playersReceived = 0, socket.Lg("connect", function() {
        setInterval(function() {
            startTime = Date.now(), socket.Ll("ping")
        }, 2e3), console.log("Connected.")
    }), socket.Lg("message", function(t) {
        console.log("Message from server: " + t)
    }), socket.Lg("error", function(t) {
        console.log("Connection failed. " + t)
    }), socket.Lg("ping", function() {
        socket.Ll("pong", Date.now())
    }), socket.Lg("pong", function(t) {
        ping = 2 * (Date.now() - t)
    }), t.c_.forEach(function(i) {
        socket.Lg(i.prototype.k$, function(n) {
            var e = new i;
            e.l$(t, n), e.UW(t), F[i.prototype.nc] && F[i.prototype.nc](e)
        })
    })
}, Client.prototype.d_ = function(t) {
    var i = new Uint8Array(command.XW() + 4),
        n = new IndexCounter;
    serializeInt32(i, n, command.nc), command.Fi(i, n), socket.Ll("command", i)
}, GameData = function(t) {
    if (initItems(this), this.ms = 3e3, this.I$ = 1, this.R$ = 96, this.fX = 50, this.m$ = 0, this.p$ = 100, this.q$ = 8, this.aX = new ObjectWorld, this.uV = new ObjectWorld, this.VW = new Map2D, this.j$ = new Map2D, this.gX = objectRegisterAddByObject([], Tiles), this.yX = objectRegisterAddByObject([], Items), this.i$ = {}, isServer ? this.KV = {} : this.KV = new AnimationManager, this.n$ = [], this.o$ = {}, this.r$ = typeRegisterAddByArray([], [CommandPlayerMove, CommandDig, CommandPlayerDig, CommandPlayerEquipItem]), this.c_ = [MessageInit, MessageCommands, MessageChunk, MessagePlayerJoin, MessagePlayerLeave, MessagePlayerInventory, MessageEntitySpawn, MessageEntityDestroy, MessagePlayerBuild], this.e_ = [MessagePlayerMove, MessageRequestItemPickup, MessageRequestDropStack, MessageRequestEquipStack, MessageRequestCraft, MessageRequestPlaceBlock], this.f_ = typeRegisterAddByArray([], this.c_.concat(this.e_)), this.t$ = typeRegisterAddByArray([], [PhysicsBody, Movement, Drawable, Bodyparts, ComponentItem]), Recipes = [], Recipes.push({
            qX: [
                [Items.e$, 1]
            ],
            lZ: [],
            mZ: [
                [Items.pX, 1]
            ]
        }), Recipes.push({
            qX: [
                [Items.g$, 1]
            ],
            lZ: [
                [Tiles.VY, 1]
            ],
            mZ: [
                [Items.e$, 1]
            ]
        }), Recipes.push({
            qX: [
                [Items.TZ, 1]
            ],
            lZ: [
                [Tiles.WY, 10]
            ],
            mZ: [
                [Items.e$, 10],
                [Items.pX, 4]
            ]
        }), Recipes.push({
            qX: [
                [Items.UZ, 1]
            ],
            lZ: [
                [Tiles.XY, 10]
            ],
            mZ: [
                [Items.e$, 10],
                [Items.pX, 4]
            ]
        }), Recipes.push({
            qX: [
                [Items.VZ, 1]
            ],
            lZ: [
                [Tiles.VY, 10],
                [Tiles.XY, 10]
            ],
            mZ: [
                [Items.e$, 10],
                [Items.pX, 4]
            ]
        }), Recipes.push({
            qX: [
                [Items.WZ, 1]
            ],
            lZ: [
                [Tiles.YY, 10]
            ],
            mZ: [
                [Items.e$, 10],
                [Items.pX, 4]
            ]
        }), t) {
        var i = function(i) {
            t.hb(i.nc)
        };
        this.aX.N$ = i, this.uV.N$ = i
    }
}, GameData.prototype.Ra = function(t) {
    var i = this;
    this.o$[this.m$] && (this.n$ = this.n$.concat(this.o$[this.m$])), this.uV.vV.forEach(function(t) {
        t.jX && t.jX.sX && (t.jX.tX = t.jX.sX)
    }), this.n$.forEach(function(t) {
        t.UW(i)
    }), this.n$.length = 0, this.aX.Mt(), entityFunctionPlayerMovement(this, t), entityFunctionPhysicsBodySimulate(this, t), this.uV.Mt(), this.m$++
};
var c = document.mc("canvas"),
    f = canvasInitGL(c),
    l = PIXI.HA(window.yW, window.zW, {
        xv: !0,
        uv: !0
    }),
    p = new PIXI.eA,
    v = new Array;
v[0] = new PIXI.eA, v[1] = new PIXI.eA, v[2] = new PIXI.eA;
for (var y = 0; y < v.length; ++y) p.St(v[y]);
l.pg.T.gh = "absolute", l.pg.T.xh = "0%", l.pg.T.Rc = "0%", document.Z.x(l.pg), window.Sc("resize", function() {
    this.Ft.tn(window.yW, window.zW), this.g_.Ka = window.yW, this.g_.Ua = window.zW
}, !1);
var d = new GameData,
    g = {
        Ka: window.yW,
        Ua: window.zW,
        Eh: v2.create(0, 0)
    },
    m = new ChunkRenderer(f, d.VW, 32),
    b = new BlockChunkRenderer(f, d.j$, 32),
    w = [],
    x = null,
    C = null,
    M = {},
    F = {},
    z = new TextureManager(d),
    I = {};
loadGame = function() {
    d.KV.Tf(), $("*").dZ(function(t) {
        var i = String.fromCharCode(t.tg).toLowerCase();
        if (!M[i]) {
            M[i] = !0;
            var n = null;
            "w" == i && (n = PlayerMoveDirection.HX), "a" == i && (n = PlayerMoveDirection.IX), "s" == i && (n = PlayerMoveDirection.JX), "d" == i && (n = PlayerMoveDirection.KX), " " == i && (n = PlayerMoveDirection.LX), null != n && new MessagePlayerMove(n).rj(socket)
        }
    }), $("*").h_(function(t) {
        var i = String.fromCharCode(t.tg).toLowerCase();
        if (M[i]) {
            M[i] = !1;
            var n = null;
            "w" == i && (n = PlayerMoveDirection.MX), "a" == i && (n = PlayerMoveDirection.NX), "s" == i && (n = PlayerMoveDirection.OX), "d" == i && (n = PlayerMoveDirection.PX), " " == i && (n = PlayerMoveDirection.QX), null != n && new MessagePlayerMove(n).rj(socket)
        }
    }), o(tick, render, d.fX)
}, tick = function(t) {
    for (var i = 0, n = 0; n <= 6 && d.o$[d.m$ + n]; n++) i++;
    if (i >= 3)
        for (; i >= 1 && d.o$[d.m$];) d.Ra(t), i--;
    d.o$[d.m$] && d.Ra(t), forOf(this, d.uV.vV, function(t) {
        if (t.jX) {
            var i = t.jX;
            i.i_ && (i.rX = v2.Ea(i.i_)), i.i_ = v2.Ea(i.Eh)
        }
    }), d.uV.vV.forEach(function(t) {
        if (t.qX && t.jX && !t.H$ && (!t.qX.jY || new Date - t.qX.jY >= 500)) {
            var i = v2.cY(t.jX.Eh, I.j_.jX.Eh);
            if (i <= d.I$) {
                var n = new MessageRequestItemPickup(t.nc);
                n.rj(socket)
            }
        }
    })
}, render = function(t) {
    canvasUpdateSize(c), g.Ka = c.Ka, g.Ua = c.Ua, f.AF(0, 0, c.Ka, c.Ua), f.qn(0, 0, 0, 1), f.pn(f.rn | f.k_), g.Eh[0] = 32 * t * I.j_.jX.Eh[0] + 32 * (1 - t) * I.j_.jX.rX[0], g.Eh[1] = 32 * t * I.j_.jX.Eh[1] + 32 * (1 - t) * I.j_.jX.rX[1];
    var i = PIXI.Jx.Lx.Ea(),
        n = PIXI.Jx.Lx.Ea();
    if (n = n.JB(-Math.floor(g.Eh[0]), -Math.floor(g.Eh[1])), n = n.jw(2 / c.Ka, 2 / c.Ua), m.Ny(d.VW, i.Ea().Og(n), g), b.Ny(d, d.j$, i.Ea().Og(n), g), d.uV.vV.forEach(function(i) {
            if (i.jX && i.lX) {
                var n = -g.Eh[0] + c.Ka / 2 + 32 * t * i.jX.Eh[0] + 32 * (1 - t) * i.jX.rX[0],
                    e = g.Eh[1] + c.Ua / 2 - (32 * t * i.jX.Eh[1] + 32 * (1 - t) * i.jX.rX[1]),
                    r = (i.jX.sX - i.jX.tX) % (2 * Math.PI),
                    o = i.jX.tX + (2 * r % (2 * Math.PI) - r) * t;
                if (i.lX.qY(n, e, o, i.wV), i.wV.wV.sV) {
                    var s = Math.sqrt(i.jX.Nh[0] * i.jX.Nh[0] + i.jX.Nh[1] * i.jX.Nh[1]);
                    i.wV.wV.sV.Rh(d, "feet", 16 * s, !1)
                }
            }
        }), I.BX.Q$) {
        var e = [Math.floor((this.l_ + g.Eh[0] - g.Ka / 2) / 32), Math.floor((c.Ua - this.m_ + g.Eh[1] - g.Ua / 2) / 32)],
            r = [0, 0],
            o = [0, 0];
        v2WorldToBlockChunk(e, r, o);
        var s = [r[0] * BLOCK_CHUNK_DIM + o[0], r[1] * BLOCK_CHUNK_DIM + o[1]];
        I.BX.J$(d, s[0], s[1]) ? (this.n_.zj = !1, this.o_.zj = !0, this.o_.gh.g = 32 * s[0] - g.Eh[0] + g.Ka / 2, this.o_.gh.h = c.Ua - (32 * (s[1] + 1) - g.Eh[1] + g.Ua / 2)) : (this.o_.zj = !1, this.n_.zj = !0, this.n_.gh.g = 32 * s[0] - g.Eh[0] + g.Ka / 2, this.n_.gh.h = c.Ua - (32 * (s[1] + 1) - g.Eh[1] + g.Ua / 2))
    } else this.o_.zj = !1, this.n_.zj = !1;
    d.KV.Mt(), l.Ny(p)
}, loadChunk = function(t, i, n) {
    if (d.i$) {
        var e = new Chunk;
        d.i$.UY(e, i, n), t.P(i, n, e)
    }
}, onMessage = function(t, i) {
    F[t.prototype.nc] = i
}, onTexturesLoadProgress = function(t, i, n) {}, onTexturesLoadComplete = function(t) {
    this.o_ = new PIXI.iA(t["p_"]), this.q_.St(this.o_), this.n_ = new PIXI.iA(t["r_"]), this.q_.St(this.n_), $("*").s_(function(t) {
        this.l_ = t.mg, this.m_ = t.ng
    }.bind(this)), client = new Client(d, window.u_.t_)
}, onMessage(MessageInit, function(t) {
    I.BX = d.aX._W[t.YW], I.j_ = d.uV._W[t.bX], loadGame(), createHUD(d)
}), $(document).Xf(function(t) {
    var i = [Math.floor((t.vg + g.Eh[0] - g.Ka / 2) / 32), Math.floor((c.Ua - t.wg + g.Eh[1] - g.Ua / 2) / 32)];
    if (I.BX.Q$) {
        var n = I.BX.DX.FZ("tool");
        if (null != n) {
            var e = new MessageRequestPlaceBlock(n, i[0], i[1]);
            e.rj(socket)
        }
    }
}), d.uV.M$ = function(t) {
    if (t.qX && t.qX.iY > 1) {
        var i = new PIXI.mA(t.qX.iY, {
                fH: "Monospace",
                cH: 15,
                zy: 16777215,
                wH: "center"
            }),
            n = new Sprite(null, i, !1);
        t.lX.nY("textAmount", n, null, !1)
    }
};