<script lang="ts">
	let isOn = $state(true);
	let clickCounter = $state(0);

	function toggleLamp() {
		isOn = !isOn;
		clickCounter++;
		if (clickCounter > 6) {
			setTimeout(() => {
				clickCounter = 0;
			}, 2000);
		}
		window.document.documentElement.setAttribute('data-theme', !isOn ? 'sunset' : 'luxury');
	}
</script>

<div
	id="lampadario"
	style:transform={`${clickCounter > 6 ? 'translateY(-200%)' : ''}`}
	class="transition-transform duration-1000"
>
	<input type="radio" name="switch" value="on" checked={true} onchange={toggleLamp} />
	<input type="radio" name="switch" value="off" checked={false} onchange={toggleLamp} />
	<label for="switch"></label>
	<div id="filo"></div>
</div>

<style>
	#lampadario {
		@apply absolute right-1/3 top-0;
	}
	#filo {
		@apply relative left-2/4 z-[1] -ml-px h-[150px] w-0.5 origin-[0%_0%] bg-black after:absolute after:left-[-3px] after:top-full after:h-0 after:w-1 after:border-x-4 after:border-b-[15px] after:border-solid after:border-x-transparent after:border-b-black after:content-["_"];
		animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
		-webkit-transform-origin: 0% 0%;
		-moz-transform-origin: 0% 0%;
		-ms-transform-origin: 0% 0%;
		-o-transform-origin: 0% 0%;
		-webkit-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
		-moz-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
		-ms-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
		-o-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
	}
	input[value='off']:checked ~ #filo {
		@apply shadow-[-80px_-10px_7px_0_rgba(0,0,0,0.1)];
		-webkit-box-shadow: -80px -10px 7px 0 rgba(0, 0, 0, 0.1);
		-moz-box-shadow: -80px -10px 7px 0 rgba(0, 0, 0, 0.1);
		-ms-box-shadow: -80px -10px 7px 0 rgba(0, 0, 0, 0.1);
		-o-box-shadow: -80px -10px 7px 0 rgba(0, 0, 0, 0.1);
	}
	input[value='off']:checked ~ #filo:after {
		@apply shadow-[-80px_-10px_10px_-2px_rgba(0,0,0,0.1)];
		-webkit-box-shadow: -80px -10px 10px -2px rgba(0, 0, 0, 0.1);
		-moz-box-shadow: -80px -10px 10px -2px rgba(0, 0, 0, 0.1);
		-ms-box-shadow: -80px -10px 10px -2px rgba(0, 0, 0, 0.1);
		-o-box-shadow: -80px -10px 10px -2px rgba(0, 0, 0, 0.1);
	}
	input {
		@apply absolute top-[150px] z-[1] ml-[-45px] h-[70px] w-[90px] cursor-pointer opacity-0;
	}
	input[value='on'] {
		@apply top-[150px] checked:top-[-100px];
	}
	input[value='off'] {
		@apply top-[-100px];
	}
	input[value='on']:checked + input[value='off'] {
		@apply top-[150px];
	}
	label {
		@apply absolute left-0 top-[164px] -ml-6 h-[51px] w-[51px] rounded-full;
		-webkit-border-radius: 100%;
		animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
		-moz-border-radius: 100%;
		-ms-border-radius: 100%;
		-o-border-radius: 100%;
		-webkit-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
		-moz-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
		-ms-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
		-o-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
	}
	input[value='off']:checked ~ label {
		@apply shadow-[inset_0px_1px_5px_rgba(255,255,255,0.1),inset_0px_2px_20px_rgba(255,255,255,0.07),-80px_-15px_15px_-5px_rgba(0,0,0,0.1)];
		background: rgba(255, 255, 255, 0.03);
		-webkit-box-shadow:
			inset 0px 1px 5px rgba(255, 255, 255, 0.1),
			inset 0px 2px 20px rgba(255, 255, 255, 0.07),
			-80px -15px 15px -5px rgba(0, 0, 0, 0.1);
		-moz-box-shadow:
			inset 0px 1px 5px rgba(255, 255, 255, 0.1),
			inset 0px 2px 20px rgba(255, 255, 255, 0.07),
			-80px -15px 15px -5px rgba(0, 0, 0, 0.1);
		-ms-box-shadow:
			inset 0px 1px 5px rgba(255, 255, 255, 0.1),
			inset 0px 2px 20px rgba(255, 255, 255, 0.07),
			-80px -15px 15px -5px rgba(0, 0, 0, 0.1);
		-o-box-shadow:
			inset 0px 1px 5px rgba(255, 255, 255, 0.1),
			inset 0px 2px 20px rgba(255, 255, 255, 0.07),
			-80px -15px 15px -5px rgba(0, 0, 0, 0.1);
	}
	input[value='on']:checked ~ label {
		@apply shadow-[0px_0px_10px_rgba(255,255,255,0.8),0px_0px_30px_rgba(255,255,255,0.8),0px_0px_50px_rgba(255,255,255,0.6),0px_0px_70px_rgba(255,255,255,0.6),-80px_-15px_120px_0px_rgba(255,255,255,0.4)];
		background: rgba(255, 255, 255, 1);
		-webkit-box-shadow:
			0px 0px 10px rgba(255, 255, 255, 0.8),
			0px 0px 30px rgba(255, 255, 255, 0.8),
			0px 0px 50px rgba(255, 255, 255, 0.6),
			0px 0px 70px rgba(255, 255, 255, 0.6),
			-80px -15px 120px 0px rgba(255, 255, 255, 0.4);
		-moz-box-shadow:
			0px 0px 10px rgba(255, 255, 255, 0.8),
			0px 0px 30px rgba(255, 255, 255, 0.8),
			0px 0px 50px rgba(255, 255, 255, 0.6),
			0px 0px 70px rgba(255, 255, 255, 0.6),
			-80px -15px 120px 0px rgba(255, 255, 255, 0.4);
		-ms-box-shadow:
			0px 0px 10px rgba(255, 255, 255, 0.8),
			0px 0px 30px rgba(255, 255, 255, 0.8),
			0px 0px 50px rgba(255, 255, 255, 0.6),
			0px 0px 70px rgba(255, 255, 255, 0.6),
			-80px -15px 120px 0px rgba(255, 255, 255, 0.4);
		-o-box-shadow:
			0px 0px 10px rgba(255, 255, 255, 0.8),
			0px 0px 30px rgba(255, 255, 255, 0.8),
			0px 0px 50px rgba(255, 255, 255, 0.6),
			0px 0px 70px rgba(255, 255, 255, 0.6),
			-80px -15px 120px 0px rgba(255, 255, 255, 0.4);
	}
	input[value='off']:checked ~ label:after {
		@apply absolute left-0 top-0 ml-[15px] h-[15px] w-[15px] rounded-full border-2 border-solid border-[rgba(255,255,255,0.03)] content-["_"];
	}
	@-webkit-keyframes oscillaFilo {
		from {
			-webkit-transform: rotate(5deg);
		}
		to {
			-webkit-transform: rotate(-5deg);
		}
	}
	@-moz-keyframes oscillaFilo {
		from {
			-moz-transform: rotate(5deg);
		}
		to {
			-moz-transform: rotate(-5deg);
		}
	}
	@-ms-keyframes oscillaFilo {
		from {
			-ms-transform: rotate(5deg);
		}
		to {
			-ms-transform: rotate(-5deg);
		}
	}
	@-o-keyframes oscillaFilo {
		from {
			-o-transform: rotate(5deg);
		}
		to {
			-o-transform: rotate(-5deg);
		}
	}
	@keyframes oscillaFilo {
		from {
			transform: rotate(5deg);
		}
		to {
			transform: rotate(-5deg);
		}
	}
	@-webkit-keyframes oscillaLampadina {
		from {
			-webkit-transform: rotate(3deg) translate(-16.4px, -10px);
		}
		to {
			-webkit-transform: rotate(-3deg) translate(16.4px, -100px);
		}
	}
	@-moz-keyframes oscillaLampadina {
		from {
			-moz-transform: rotate(3deg) translate(-16.4px, -1px);
		}
		to {
			-moz-transform: rotate(-3deg) translate(16.4px, -1px);
		}
	}
	@-ms-keyframes oscillaLampadina {
		from {
			-ms-transform: rotate(3deg) translate(-16.4px, -1px);
		}
		to {
			-ms-transform: rotate(-3deg) translate(16.4px, -1px);
		}
	}
	@-o-keyframes oscillaLampadina {
		from {
			-o-transform: rotate(3deg) translate(-16.4px, -1px);
		}
		to {
			-o-transform: rotate(-3deg) translate(16.4px, -1px);
		}
	}
	@keyframes oscillaLampadina {
		from {
			transform: translateY(-1px) translateX(-16.4px) rotate(3deg);
		}
		to {
			transform: translateY(-1px) translateX(16.4px) rotate(-3deg);
		}
	}
</style>
