const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main(){
        gl_Position = a_Position;
        gl_PointSize = a_PointSize;
    }
`;

const FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    }
`;

function main() {
    const canvas = document.querySelector("#example");

    const gl = getWebGLContext(canvas);

    if (!gl) {
        console.error("gl is null");
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error("Failed to inittialize shaders");
        return;
    }

    let a_Position = gl.getAttribLocation(gl.program, "a_Position");
    let a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

    if (a_Position < 0 || a_PointSize < 0) {
        console.error("a_var error");
        return;
    }

    // canvas.onclick = function (ev) {
    //     click(ev, gl, canvas, a_Position);
    // };

    canvas.addEventListener("click", function(e) {
        click(e, gl, canvas, a_Position);
    });

    // gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
    gl.vertexAttrib1f(a_PointSize, 3.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.drawArrays(gl.POINtS, 0, 1);
}
let g_points = [];
function click(ev, gl, canvas, a_Position) {
    let x = ev.clientX;
    let y = ev.clientY;
    let rect = ev.target.getBoundingClientRect();

    x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    g_points.push(x)
    g_points.push(y);

    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for(let i = 0; i < len; i+=2) {
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}
