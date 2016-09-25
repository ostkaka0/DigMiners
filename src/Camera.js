/**
 * @todo calculate bounds automatically if bounded
 * @param world
 * @constructor
 */
Camera = function() {

    PIXI.Container.call(this);

    this.root = new PIXI.Container();

    this.targetPos = v2.create(0, 0);
    this.target = null;
    this.velocity = null;

    this.mask = new PIXI.Graphics();
    this.viewport = new PIXI.Rectangle(0, 0, window.innerWidth, window.innerHeight);
    this.frustrum = this.viewport.clone();

    this.bounded = false;

    this._redrawMask();

    this.addChild(this.root);
    this.addChild(this.mask);
};
if(!isServer)
    Camera.prototype = Object.create(PIXI.Container.prototype);

/**
 * update the camera position based on it's target
 * @param dt delta time
 */
Camera.prototype.update = function(dt) {
    if(this.velocity) {
        this.targetPos.x += this.velocity.x;
        this.targetPos.y += this.velocity.y;
    }

    var x = ((this.target != null ? this.target.ix : this.targetPos.x) * this.zoom) - (this.width / 2);
    var y = ((this.target != null ? this.target.iy : this.targetPos.y) * this.zoom) - (this.height / 2);

    this.frustrum.x = x / this.zoom;
    this.frustrum.y = y / this.zoom;

    this._constrainFrustrum();

    this.root.position.set(
        -this.frustrum.x * this.zoom,
        -this.frustrum.y * this.zoom
    );

};

/**
 * keep the frustrum in scale relative to the viewport
 * @private
 */
Camera.prototype._scaleFrustrum = function() {

    this.frustrum.width = this.viewport.width / this.zoom;
    this.frustrum.height = this.viewport.height / this.zoom;
};

/**
 * make sure the frustrum is contained by the bounds (if set)
 * @private
 */
Camera.prototype._constrainFrustrum = function() {

    if(!this.bounded) {
        return;
    }

    if(this.frustrum.x < this._bounds.x) {
        this.frustrum.x = this._bounds.x;
    }

    if(this.frustrum.y < this._bounds.y) {
        this.frustrum.y = this._bounds.y;
    }

    if(this.frustrum.x + this.frustrum.width > this._bounds.x + this._bounds.width) {
        this.frustrum.x = this._bounds.x + this._bounds.width - this.frustrum.width;
    }

    if(this.frustrum.y + this.frustrum.height > this._bounds.y + this._bounds.height) {
        this.frustrum.y = this._bounds.y + this._bounds.height - this.frustrum.height;
    }
};

/**
 * update the mask if the viewport changes
 * @private
 */
Camera.prototype._redrawMask = function() {

    this.mask.beginFill();
    this.mask.drawRect(0, 0, this.viewport.width, this.viewport.height);
    this.mask.endFill();
};


Object.defineProperties(Camera.prototype, {

    width: {

        get: function() {

            return this.viewport.width;
        },

        set: function(value) {

            this.viewport.width = value;
            this._scaleFrustrum();
            this._constrainFrustrum();
            this._redrawMask();

            return this.viewport.width;
        }
    },

    height: {

        get: function() {

            return this.viewport.height;
        },

        set: function(value) {

            this.viewport.height = value;
            this._scaleFrustrum();
            this._constrainFrustrum();
            this._redrawMask();

            return this.viewport.height;
        }
    },


    zoom: {

        get: function() {

            return this._zoom;
        },

        set: function(level) {

            this._zoom = level;
            this.root.scale.set(level);
            this._scaleFrustrum();
            this._constrainFrustrum();

            return this._zoom;
        }
    },

    pos: {

        get: function() {

            return { x: this.frustrum.x, y: this.frustrum.y };
        },

        set: function(input) {

            if(input != undefined) {
                if(input.x != undefined)
                    this.frustrum.x = input.x;
                if(input.y != undefined)
                    this.frustrum.y = input.y;

                this._scaleFrustrum();
                this._constrainFrustrum();
            }

            return { x: this.frustrum.x, y: this.frustrum.y };
        }
    }
});
