
(function () {

   function setCharacterDirection(held_directions) {

      const held_direction = held_directions[0];
      if (held_direction) {
         if (held_direction === directions.right) { x += 1; }
         if (held_direction === directions.left) { x -= 1; }
         if (held_direction === directions.down) { y += 1; }
         if (held_direction === directions.up) { y -= 1; }
         character.setAttribute("facing", held_direction);
      }
   }
   
   let character = document.querySelector(".character");
   let map = document.querySelector(".map");

   let x = 0;
   let y = 0;
   let held_directions = [];

   const moveCharacter = () => {

      let pixelScale = parseInt(
         getComputedStyle(document.documentElement).getPropertyValue('--pixel-scale')
      );

      setCharacterDirection(held_directions);
      character.setAttribute("walking", held_directions[0] ? "true" : "false");

      let leftWall = 0;
      let rightWall = 16 * 12;
      if (x < leftWall) { x = leftWall; }
      if (x > rightWall) { x = rightWall; }

      let topWall = -16;
      let bottomWall = (16 * 11);
      if (y < topWall) { y = topWall; }
      if (y > bottomWall) { y = bottomWall; }

      let camera_left = pixelScale * 100;
      let camera_top = pixelScale * 60;

      map.style.transform = `translate3d( ${-x * pixelScale + camera_left}px, ${-y * pixelScale + camera_top}px, 0 )`;
      character.style.transform = `translate3d( ${x * pixelScale}px, ${y * pixelScale}px, 0 )`;
   }


   const loop = () => {
      moveCharacter();
      window.requestAnimationFrame(() => {
         loop();
      })
   }

   loop();


   /* Direction key state */
   const directions = {
      up: "up",
      down: "down",
      left: "left",
      right: "right",
   }
   const keys = {
      38: directions.up,
      37: directions.left,
      39: directions.right,
      40: directions.down,
   }
   document.addEventListener("keydown", (e) => {
      let dir = keys[e.keyCode];
      if (dir && held_directions.indexOf(dir) === -1) {
         held_directions.unshift(dir)
      }
   })

   document.addEventListener("keyup", (e) => {
      let dir = keys[e.keyCode];
      let index = held_directions.indexOf(dir);
      if (index > -1) {
         held_directions.splice(index, 1)
      }
   });

})();




