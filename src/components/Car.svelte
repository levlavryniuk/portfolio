<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	let enableCar = $state(true);

	function checkMobile() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	}
	class Car {
		public static MAX_SPEED = 2;
		public static ROTATION_SPEED = 0.02;
		public speed = $state(0);
		interval = $state<number | null>(null);

		public isAccelerating = $state(true);
		public lastMouseX = $state(0);
		public lastMouseY = $state(0);
		public x = $state(-50);

		public y = $state(-30);
		public ref = $state<HTMLDivElement | null>(null);
		carRotation = $state(0);
		rotationSpeed = 0.1;
		toDegrees = (angle: number) => angle * (180 / Math.PI);

		move() {
			let { x, y } = this.getCoordsDelta();
			if (x < 50 && y < 50) {
				this.isAccelerating = false;
			} else {
				this.isAccelerating = true;
			}
			this.x += this.speed * Math.cos(this.carRotation);
			this.y += this.speed * Math.sin(this.carRotation);
		}

		accelerate() {
			this.speed = Math.min(Car.MAX_SPEED, this.speed + 0.05);
		}

		decelerate() {
			this.speed = Math.max(0, this.speed - 0.05);
		}

		getAngleFromCoords(x: number, y: number) {
			return Math.atan2(y - this.y, x - this.x);
		}

		rotateCar() {
			let angle = this.getAngleFromCoords(this.lastMouseX, this.lastMouseY);
			let deltaAngle = angle - this.carRotation;
			if (this.ref) {
				if (deltaAngle > Math.PI) {
					deltaAngle -= Math.PI * 2;
				}

				if (deltaAngle < -Math.PI) {
					deltaAngle += Math.PI * 2;
				}
				if (Math.abs(deltaAngle) < 0.1) {
					//this.carRotation += this.deltaAngle;
				} else {
					this.carRotation += deltaAngle > 0 ? Car.ROTATION_SPEED : -Car.ROTATION_SPEED;
				}
			}
		}

		startCar() {
			this.interval = setInterval(() => {
				if (!enableCar) return;
				if (this.isAccelerating) {
					this.accelerate();
				} else {
					this.decelerate();
				}
				this.move();
				if (this.isAccelerating) {
					this.rotateCar();
				}
			}, 1000 / 60);
		}
		stopCar() {
			if (this.interval) {
				clearInterval(this.interval);
			}
		}

		getCoordsDelta() {
			return {
				x: Math.abs(this.lastMouseX - this.x),
				y: Math.abs(this.lastMouseY - this.y)
			};
		}

		public handleMouseMove(event: MouseEvent) {
			this.lastMouseX = event.pageX;
			this.lastMouseY = event.pageY;
		}
	}
	let car = new Car();
	onMount(() => {
		let isMobile = checkMobile();
		if (!isMobile) {
			car.startCar();
		}
	});
	onDestroy(() => {
		car.stopCar();
	});
</script>

<svelte:window
	onmousemove={(e) => {
		if (!enableCar) return;
		car.handleMouseMove(e);
	}}
/>
<div class="fixed bottom-2 left-2 flex items-center gap-2 p-1 max-lg:hidden">
	<p class="text-sm">Enable car</p>
	<input type="checkbox" class="checkbox checkbox-xs" bind:checked={enableCar} />
</div>
<img
	src="/images/car.png"
	alt="car"
	bind:this={car.ref}
	class:hidden={!enableCar}
	style:left={car.x + 'px'}
	style:top={car.y + 'px'}
	style:transform={`rotate(${car.carRotation}rad)`}
	class="absolute h-8 w-14 origin-center"
/>
