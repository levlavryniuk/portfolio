
type PlayerImageState =
	| 'man-stand-right'
	| 'man-stand-left'
	| 'man-walk-right'
	| 'man-walk-left'
	| 'man-jetpack-left'
	| 'man-jetpack-right';
export default class Game {
	private GRAVITY = 0.4;
	private MAX_FALL_SPEED = 19;
	jetpackAcceleration = $state(0.4);
	private SPEED = 4;

	isJetpacking = $state(false);
	activeKeys: Set<string> = new Set();
	imageSrc = $state<PlayerImageState>('man-stand-right');
	velocity: { x: number; y: number } = { x: 0, y: 0 };
	acceleration: { x: number; y: number } = $state({ x: 0, y: 0 });
	position = $state({ x: 50, y: 0 });
	isInAir = $derived(() => {
		return this.position.y > 0;
	});
	isWalking = $derived(() => {
		if (this.isInAir()) return false;
		return this.velocity.x !== 0;
	});
	walkingAnimationInterval = $state<null | number>(null);
	interval = $state<number | null>(null);

	handleOrientation(event?: DeviceOrientationEvent) {
		if (event) {
			const angle = event.gamma;
			if (!angle) {
				return;
			} else {
				if (angle > 5) {
					this.handleKeysUp({ key: 'a' } as KeyboardEvent);
					this.handleKeysDown({ key: 'd' } as KeyboardEvent);
				} else if (angle < -5) {
					this.handleKeysUp({ key: 'd' } as KeyboardEvent);
					this.handleKeysDown({ key: 'a' } as KeyboardEvent);
				} else {
					this.handleKeysUp({ key: 'd' } as KeyboardEvent);
					this.handleKeysUp({ key: 'a' } as KeyboardEvent);
				}
			}
		}
	}
	private updateImageState() {
		if (this.isJetpacking && this.jetpackAcceleration > 0.4) {
			this.setJetpackImage();
			return;
		}
		if (!this.isWalking()) {
			this.setStandImage();
		}
	}

	setJetpackAcceleration(a: number) {
		let min = 0.4;
		let newAccel = min+ a;
    if (a > 0){
      this.isJetpacking = true
    }else{
      this.isJetpacking = false
    }
		this.jetpackAcceleration = newAccel;
	}

	handleKeysDown(event: KeyboardEvent) {
		this.activeKeys.add(event.key);

		this.updateMovement();
	}

	setJetpackImage() {
		if (this.velocity.x !== 0)
			this.imageSrc = this.velocity.x > 0 ? 'man-jetpack-right' : 'man-jetpack-left';
		if (this.imageSrc === 'man-walk-left' || this.imageSrc === 'man-stand-left') {
			this.imageSrc = 'man-jetpack-left';
		}
		if (this.imageSrc === 'man-walk-right' || this.imageSrc === 'man-stand-right') {
			this.imageSrc = 'man-jetpack-right';
		}
	}

	setStandImage() {
		if (this.imageSrc === 'man-walk-left' || this.imageSrc === 'man-jetpack-left') {
			this.imageSrc = 'man-stand-left';
		}
		if (this.imageSrc === 'man-walk-right' || this.imageSrc === 'man-jetpack-right') {
			this.imageSrc = 'man-stand-right';
		}
	}
	toggleWalkingState() {
		if (this.isInAir()) {
			this.velocity.x > 0 ? (this.imageSrc = 'man-walk-right') : (this.imageSrc = 'man-walk-left');
			return;
		}
		if (this.velocity.x < 0) {
			this.imageSrc = this.imageSrc === 'man-stand-left' ? 'man-walk-left' : 'man-stand-left';
		} else if (this.velocity.x > 0) {
			this.imageSrc = this.imageSrc === 'man-stand-right' ? 'man-walk-right' : 'man-stand-right';
		}
	}

	applyPhysics() {
		if (this.isInAir()) {
			this.velocity.y = Math.max(-this.MAX_FALL_SPEED, this.velocity.y - this.GRAVITY);
		} else {
			this.velocity.y = 0;
		}

		if ( this.isJetpacking) {
			this.velocity.y += this.jetpackAcceleration;
			this.isJetpacking = true;
		} else {
			this.isJetpacking = false;
		}

		if (this.position.y > 600) {
			this.velocity.y = -this.GRAVITY;
			this.acceleration.y = -this.GRAVITY;
		}
		this.position.y += this.velocity.y;
		this.updateImageState();
	}

	standStillIfIdle() {
		if (this.isInAir() || this.activeKeys.size !== 0 || this.velocity.x !== 0) return;
		if (this.imageSrc === 'man-walk-right') {
			this.imageSrc = 'man-stand-right';
		}
		if (this.imageSrc === 'man-walk-left') {
			this.imageSrc = 'man-stand-left';
		}
	}
	walk() {
		if (!this.walkingAnimationInterval) {
			this.walkingAnimationInterval = setInterval(() => this.toggleWalkingState(), 150);
		}
	}

	handleKeysUp(event: KeyboardEvent) {
		this.activeKeys.delete(event.key);

		if (this.activeKeys.size === 0) {
			if (this.walkingAnimationInterval) {
				clearInterval(this.walkingAnimationInterval);
				this.walkingAnimationInterval = null;
			}
		}
		this.updateMovement();
	}

	updateMovement() {
		this.velocity.x = 0;
		if (this.activeKeys.has('a')) {
			this.velocity.x = -this.SPEED;
			this.walk();
		}
		if (this.activeKeys.has('d')) {
			this.velocity.x = this.SPEED;
			this.walk();
		}

	}
	applyHorizontalVelocity() {
		const minBoundary = 20;
		const maxBoundary = window.innerWidth - minBoundary * 5;

		let newPos = Math.max(Math.min(maxBoundary, this.position.x + this.velocity.x), minBoundary);
		this.position.x = newPos;
	}

	public gameLoop() {
		this.interval = setInterval(() => {
			this.applyPhysics();
			this.applyHorizontalVelocity();
			this.standStillIfIdle();
		}, 1000 / 60);
	}
}
