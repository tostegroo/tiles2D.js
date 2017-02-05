/**
 * @author Fabio Toste
 */
 import MathHelper from './utils/mathHelper';
 import Vector2 from './geom/vector2';

 export class Ngint
 {
     constructor()
     {
         let vector2 = new Vector2(10, 10);
         console.log(vector2);

         let angle = MathHelper.degToRad(180);
         console.log(angle);

         console.log("Ngint created");
     }
 }
