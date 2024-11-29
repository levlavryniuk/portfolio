
	export type PlayerImageState =
		| 'man-stand-right'
		| 'man-stand-left'
		| 'man-walk-right'
		| 'man-walk-left'
		| 'man-jetpack-left'
		| 'man-jetpack-right';
	export default class Player {
		private GRAVITY = 0.4;
		private JUMP_VELOCITY = 7;
		private MAX_FALL_SPEED = 12;
		private JETPACK_ACCELERATION = 0.5;
		private SPEED = 4;

		private canJetpack = false;
		private spaceHitCount = 0;

		isJetpacking = $state(false);
		private activeKeys: Set<string> = new Set();
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

		private updateImageState() {
			if (this.isJetpacking) {
        if (this.velocity.x !== 0)
				this.imageSrc = this.velocity.x > 0 ? 'man-jetpack-right' : 'man-jetpack-left';
				return;
			}

			if (this.isInAir()) {
        if (this.velocity.x !== 0)
				this.imageSrc = this.velocity.x >= 0 ? 'man-walk-right' : 'man-walk-left';
				return;
			}
			if (this.isWalking()) {
				return;
			}
			if (this.velocity.x < 0) {
				this.imageSrc = this.imageSrc === 'man-stand-left' ? 'man-walk-left' : 'man-stand-left';
			} else if (this.velocity.x > 0) {
				this.imageSrc = this.imageSrc === 'man-stand-right' ? 'man-walk-right' : 'man-stand-right';
			}
		}
		handleKeysDown(event: KeyboardEvent) {
			this.activeKeys.add(event.key);

			if (event.key === ' ') {
				this.spaceHitCount++;
			}

			if (this.spaceHitCount === 1) {
				this.canJetpack = true;
			}

			this.updateMovement();
		}


		toggleWalkingState() {
			if (this.isInAir()) {
				this.velocity.x > 0
					? (this.imageSrc = 'man-walk-right')
					: (this.imageSrc = 'man-walk-left');
				return;
			}
			if (this.velocity.x < 0) {
				this.imageSrc = this.imageSrc === 'man-stand-left' ? 'man-walk-left' : 'man-stand-left';
			} else if (this.velocity.x > 0) {
				this.imageSrc = this.imageSrc === 'man-stand-right' ? 'man-walk-right' : 'man-stand-right';
			}
		}
		applyPhysics() {
			if (!this.isInAir()) {
				this.velocity.y = 0;
				this.canJetpack = false;
				this.spaceHitCount = 0;
			} else {
				this.velocity.y = Math.max(-this.MAX_FALL_SPEED, this.velocity.y - this.GRAVITY);
			}

			if (this.activeKeys.has(' ') && !this.isInAir() && !this.isJetpacking) {
				this.isJetpacking = false;
				this.canJetpack = false;
				this.spaceHitCount = 0;
				this.velocity.y = this.JUMP_VELOCITY;
			}
			if (this.activeKeys.has(' ') && this.isInAir() && this.canJetpack) {
				this.velocity.y += this.JETPACK_ACCELERATION;
				this.isJetpacking = true;
			} else {
				this.isJetpacking = false;
			}

			this.position.y += this.velocity.y;
			this.updateImageState();
		}
		walk() {
			if (!this.walkingAnimationInterval) {
				this.walkingAnimationInterval = setInterval(() => this.toggleWalkingState(), 150);
			}
		}

		handleKeysUp(event: KeyboardEvent) {
			this.activeKeys.delete(event.key);

			if (event.key === ' ' && this.activeKeys.size === 0) {
				this.spaceHitCount = 0;
				this.canJetpack = false;
			}
			if (this.activeKeys.size === 0) {
				if (this.walkingAnimationInterval) {
					clearInterval(this.walkingAnimationInterval);
					this.walkingAnimationInterval = null;
				}
				if (this.isInAir())
					this.imageSrc = this.velocity.x < 0 ? 'man-walk-left' : 'man-walk-right';
			}
			this.updateMovement();
		}

		applyGravity() {
			if (this.isInAir()) {
				this.acceleration.y = -this.GRAVITY;
			} else {
				this.acceleration.y = 0;
			}
		}

		updateMovement() {
			this.velocity.x = 0;
			if (this.activeKeys.has('a')) {
				this.walk();
				this.velocity.x = -this.SPEED;
			}
			if (this.activeKeys.has('d')) {
				this.walk();
				this.velocity.x = this.SPEED;
			}

			if (this.activeKeys.has('o')) {
				this.acceleration.y += 10;
			} else {
				this.acceleration.y = -this.GRAVITY;
			}
		}

		applyHorizontalVelocity() {
			this.position.x += this.velocity.x;
		}

		public gameLoop() {
			this.interval = setInterval(() => {
				this.applyPhysics();
				this.applyHorizontalVelocity();
			}, 1000 / 60);
		}
	}
