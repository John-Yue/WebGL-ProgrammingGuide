const VSHADER_SOURCE = 
`
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main(){
        gl_Position = a_Position;
        gl_PointSize = a_PointSize;
    }
`;

const FSHADER_SOURCE =
`
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    }
`;

function main() {
    const canvas = document.querySelector("#example");

    const gl = getWebGLContext(canvas);

    if(!gl) {
        console.error('gl is null');
        return;
    }

    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error('Failed to inittialize shaders');
        return;
    }

    let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    if (a_Position < 0 || a_PointSize < 0) {
        console.error('a_var error');
        return;
    }

    gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);
    gl.vertexAttrib1f(a_PointSize, 30.0);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINtS, 0, 1);

}