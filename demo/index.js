
function main() {
    const canvas = document.querySelector("#example");
    console.log('canvas content: ', canvas);
    if(!canvas) {
        console.error('Failed to retrieve the <canvase> element');
        return;
    }

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'
    ctx.fillRect(120,10,150,150)
}