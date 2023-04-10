const PI2 = Math.PI *2;
const _180_OVER_PI = 180.0/Math.PI;

/*
    Returns speeds for left and right rover tracks
https://robotics.stackexchange.com/a/2016/34548

Args:
    r (float): power, 0 to 100
    theta (float): angle in degrees, 12 oclock is zero. 
Returns:
    dict: 
*/
function joystick_to_trackspeeds1(r, bearing){
    theta = ((bearing + 180.0) % 360.0) - 180.0;  // normalize value to [-180, 180)
    r = Math.min(Math.max(0, r), 100.0);              // normalize value to [0, 100]
    x =theta%90;
    if (x<0)x+=90;
    v_a = r * (45 - x % 90.0) / 45.0;            // falloff of main motor
    v_b = Math.min(100.0, 2 * r + v_a, 2 * r - v_a);  // compensation of other motor
    s_l= 0;
    s_r= 0;

    if (theta < -90){
        s_l = -v_b;
        s_r = -v_a;
    } else if (theta < 0){
        s_l = -v_a;
        s_r = v_b;
    } else if (theta < 90){
        s_l = v_b;
        s_r = v_a;
    } else {
        s_l = v_a;
        s_r = -v_b;
    }
    return {
        speedL :s_l * 2.0, 
        speedR :s_r * 2.0,
        r : r,
        bearing : bearing,
        theta: theta 
    }
}

function joystick_to_trackspeeds2(x, y){
    var r = Math.min(Math.sqrt(x*x+y*y),100);
    var b = bearing(0,1,x,y,0,0);
    return joystick_to_trackspeeds1(r,b)
}

/**
 * angle between points, ox & oy is the origin
 */
function bearing(x1,y1,x2,y2,ox,oy){
    
    var a1 = Math.atan2(y2 - oy, x2 - ox);
    a2 = Math.atan2(y1 - oy, x1 - ox);
    a = a1-a2
    if (a < 0){
        a += PI2;
    }
    return 360-(a *_180_OVER_PI)
}











if (typeof fitc === "undefined") {
	fitc = {};
}

fitc.Rover = (function (global) {





})(window);