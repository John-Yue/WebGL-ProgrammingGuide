const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
    }
`;

const FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor;
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

function main() {
    const canvas = document.getElementById("example");

    const gl = getWebGLContext(canvas);

    if (!gl) {
        console.error("gl is null");
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error("Failed to initialize shaders");
        return;
    }

    const n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("Failed to set the position of the vertices");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.drawArrays(gl.POINTS, 0, n);
    // gl.drawArrays(gl.TRIANGLES, 0, n);
    // gl.drawArrays(gl.LINES, 0, n);
    // gl.drawArrays(gl.LINES_STRIP, 0, n);
    gl.drawArrays(gl.LINE_LOOP, 0, n);
    // gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);



}

let g_points = [];
let g_colors = [];
function click(e, gl, canvas, a_Position, u_FragColor) {
    let x = e.clientX;
    let y = e.clientY;

    let rect = e.target.getBoundingClientRect();

    x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

    g_points.push([x, y]);

    // if (x >= 0.0 && y >= 0.0) {
    //     g_colors.push([1.0, 0.0, 0.0, 1.0]); // 红色
    // } else if (x < 0.0 && y < 0.0) {
    //     g_colors.push([0.0, 1.0, 0.0, 1.0]); // 绿色
    // } else {
    //     g_colors.push([1.0, 1.0, 1.0, 1.0]); // 白色
    // }
    if (y != 0.0) {
        g_colors.push([x, y, x / y, 1.0]);
    } else {
        g_colors.push([y, x, 1.0, 1.0]);
    }

    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let i = 0; i < g_points.length; i++) {
        const xy = g_points[i];
        const rgba = g_colors[i]

        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        gl.drawArrays(gl.POINTS, 0, 1);
    }

}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);

    let n = 3;

    // 创建缓冲区对象
    let vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("Failed to create the buffer object ");
        return -1;
    }

    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // 向缓冲区写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    let a_Position = gl.getAttribLocation(gl.program, "a_Position");

    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // 连接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}