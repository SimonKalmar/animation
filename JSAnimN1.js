var $ = function (foo) {
    return document.getElementById(foo);    // save keystrokes
}

let Canvas = {
    init(canvasId, color) {
        this.canvas = $(canvasId);
        this.context = this.canvas.getContext("2d");
        this.color = color;
        this.prep();
    },
    prep() {
        this.context.fillStyle = this.color;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    getContext() {
        return this.context;
    },
    getHeight() {
        return this.canvas.height;
    },
    getWidth () {
        return this.canvas.width;
    }
};


            var arr = [];
            let canvas;

            let redraw = function () {
                canvas.clear();     // clear canvas
                canvas.prep();      // prep canvas with background color
                for (let umo of arr) {
                    umo.move();  // change coordinates
                    umo.draw();  // draw again with new coordinates
                }

            }

            let repeater = function () {
                setInterval(redraw, 10);
            }


            let initialize = function () {
              canvas = Object.create(Canvas);
              canvas.init('canvas', '#eeeeee');
              let c0 = Object.create(Umo);
              c0.init(canvas, '#00888a');
              arr.push(c0);
              c0 = Object.create(Umo);
              c0.init(canvas, '#000000');
              arr.push(c0);
              c0 = Object.create(Umo);
              c0.init(canvas, '#ffffff');
              arr.push(c0);
              c0 = Object.create(Umo);
              c0.init(canvas, '#e45453');
              arr.push(c0);
              c0 = Object.create(Umo);
              c0.init(canvas, '#820F71');
              arr.push(c0);
              c0 = Object.create(Umo);
              c0.init(canvas, '#4C7197');
              arr.push(c0);
              c0 = Object.create(Umo);
              c0.init(canvas, '#00864B');
              arr.push(c0);
              c0 = Object.create(Umo);
              c0.init(canvas, '#8D698D');
              arr.push(c0);
              c0 = Object.create(Umo);
              c0.init(canvas, '#666666');
              arr.push(c0);
              c0 = Object.create(Umo);
              c0.init(canvas, '#6caf37');
              arr.push(c0);
              repeater();
            }

            let Umo = {
                init(canvas, color) {
                    this.canvas = canvas;
                    this.x = Math.random() * this.canvas.getWidth();
                    this.y = Math.random() * this.canvas.getHeight();
                    this.r = Math.random() * 9 + 3;
                    this.dx = Math.random() * 5;
                    this.dy = Math.random() * 5;
                    this.color = color;
                },

                draw() {
                    this.canvas.getContext().beginPath();
                    this.canvas.getContext().fillStyle = this.color;
                    this.canvas.getContext().arc(this.x, this.y, this.r,
                                                 0, Math.PI * 2,
                                                 false);
                    this.canvas.getContext().fill();
                    this.canvas.getContext().closePath();
                },

                move() {
                    if (this.x + this.dx > this.canvas.getWidth()
                            || this.x + this.dx < 0)
                          this.dx = -this.dx;
                    if (this.y + this.dy > this.canvas.getHeight()
                            || this.y + this.dy < 0)
                          this.dy = -this.dy;

                    this.x += this.dx;
                    this.y += this.dy;

                    for (let j = 0; j < arr.length; j++) {
                      if (this === arr[j]) {
                        continue;
                      } else {
                        this.hittest(arr[j]);
                        arr.splice(j);
                      }

                    }
                },

                hittest(obj) {
                  var dist = Math.sqrt(Math.pow(this.x-obj.x, 2) + Math.pow(this.y-obj.y, 2));
                  if (dist <= this.r + obj.r) {
                    let a1 = Math.PI * Math.pow(this.r, 2);
                    let a2 = Math.PI * Math.pow(obj.r, 2);
                    this.r = Math.sqrt((a1 + a2) / Math.PI);

                  }
                },

                toString() {
                    s = '';
                    s += this.x + ':' + this.y + ', ' + this.r + " \n " + this.color;
                    console.log(s);
                }
            };
window.addEventListener('load', initialize);
