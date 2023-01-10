function lerp(v0, v1, t) {
    return v0 + t * (v1 - v0);
}

function sinLerp(a, b, t) {
    return Math.sin(t * Math.PI * 0.5) * (b - a) + a
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)) //https://thewebdev.info/2022/02/09/how-to-create-pause-or-delay-in-a-javascript-for-loop

function qrs2xy(q, r, s) { //https://www.reddit.com/r/askmath/comments/s6u33s/converting_cube_coordinates_to_cartesian/
    return [
        (r + s) * sqrt3 / 2,
        r / 2 - s / 2
    ]
}

function clamp(t, min = 0, max = 1) {
    return Math.max(Math.min(t, max), min);
}

function arraysEqual(a, b) { //https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript 
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function rand(a,b) {
    return mulberry32(a+seed*0.123456+b*0.987654)();
}

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}