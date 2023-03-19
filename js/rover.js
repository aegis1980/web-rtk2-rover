const PI2 = Math.PI *2;
const PI_OVER_180 = Math.PI/180;

/*
    Returns speeds for left and right rover tracks
https://robotics.stackexchange.com/a/2016/34548

Args:
    r (float): power, 0 to 100
    theta (float): angle in degrees, 12 oclock is zero. 
Returns:
    dict: 
*/
function joystick_to_trackspeeds1(r, theta){
    theta = ((theta + 180) % 360) - 180  // normalize value to [-180, 180)
    r = Math.min(Math.max(0, r), 100)              // normalize value to [0, 100]
    v_a = r * (45 - theta % 90) / 45          // falloff of main motor
    v_b = Math.min(100, 2 * r + v_a, 2 * r - v_a)  // compensation of other motor
    if (theta < -90) return -v_b, -v_a
    if (theta < 0)   return -v_a, v_b
    if (theta < 90)  return v_b, v_a
    return {
        speedL :v_a, 
        speedR :-v_b
    }
}

function joystick_to_trackspeeds2(x, y){
    var r = Math.sqrt(x*x+y*y);
    var theta = bearing(0,1,x,y,0,0);
    return joystick_to_trackspeeds1(r,theta)
}

/**
 * angle between points, ox & oy is the origin
 */
function bearing(x1,y1,x2,y2,ox,oy){
    
    var a1 = Math.atan2(y2 - oy, x2 - ox);
    a2 = Math.atan2(y1 - oy, x1 - ox);
    a = a1-a2
    if (a < 0){
        a += PI2
    }
    return a * PI_OVER_180;
}




if (typeof fitc === "undefined") {
	fitc = {};
}

fitc.Rover = (function (global) {





})(window);