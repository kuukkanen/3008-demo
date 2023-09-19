function generateNewColor() {
    let color = "#";
    let x = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D', 'E','F']

    for(let i = 0; i < 6;i++){
        const random = Math.floor(Math.random() * x.length);
        color += x[random];
    }
    return color;
}
btn = document.getElementById('color-changer');
btn.addEventListener("click", (event) => {
		
	const newColor = generateNewColor();

	btn.style.background = newColor;
});