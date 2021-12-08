let notes = document.querySelectorAll('.note');
let audioContext = null;
//function which is called when we click the button
function playnote(freq){
	//stop previous audioContext
	if(audioContext){
		audioContext.close();
	}
	audioContext = new AudioContext();
	//create an oscillator node
	let osc = audioContext.createOscillator();
	osc.type = 'sine';
	osc.frequency.value = freq;
	//controlling gain via lfo
	let amp = audioContext.createGain();
	amp.gain.setValueAtTime(-1, audioContext.currentTime);
	//create lfo
	let lfo = audioContext.createOscillator();
	lfo.type = 'sawtooth';
	lfo.frequency.value = 0.49;
	//connect lfo to gain
	lfo.connect(amp.gain);
	//connect our graph
	osc.connect(amp).connect(audioContext.destination);
	osc.start(audioContext.currentTime + 1);
	lfo.start();
	//document.getElementById('btn-stop').disabled = "false";
}

function stop(){
	console.log('stoped')
	if (audioContext.state === 'running'){
		audioContext.suspend();
		//document.getElementById('#btn-stop').setAttribute('disabled', 'disabled');
		document.querySelector('#monitor').innerHTML = 'Standard Tunning';
	}
}

notes.forEach((note) => {
	note.addEventListener('click', () => {
		//if (audioContext.state === 'suspended') {
		//	audioContext.resume();
		//}
		playnote(note.value);
		document.getElementById('monitor').innerHTML = note.value + ' Hz';
	})
})