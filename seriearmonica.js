		let maximos=17;
		let base=100
		let cont=1
		let temp=30
		let ctx=new AudioContext();
		var oscs=[]

	function suena(){
		if(cont<=maximos){
			let osc=ctx.createOscillator()
		
		osc.frequency.value=base;
		osc.start();
			base=base+base/cont;
			osc.frequency.value=base;
			cont++
			console.log(base)
			oscs.push(osc)

			let gain=ctx.createGain()
			gain.connect(ctx.destination)
			gain.gain.value=Math.random()
		osc.connect(gain)

		}else{
			clearInterval(t);
			for (var i = oscs.length - 1; i >= 0; i--) {
				oscs[i].stop()
			}
			
		}
	}

	t=setInterval(suena,temp)	
 