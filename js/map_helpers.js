/**
 * https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/world-files-for-raster-datasets.htm
 * 
 */

const 

WORLD_FILE_PATH = "./assets/auckland-0075m-urban-aerial-photos-2015-2016.tfw";
IMAGE_PATH = "./assets/auckland-0075m-urban-aerial-photos-2015-2016.png";


function getImageSize(){
    return new Promise((resolve,reject) => {
        const img = new Image();
        img.onload = function() {
      
            resolve([Number(this.width),Number(this.height)]);
        };
        img.src = IMAGE_PATH;
    });
}

getImageSize().then(
    readWorldFile(this)
);
/**
 * 20.17541308822119 - A        -> t[0]
 * 0.00000000000000 - D         -> t[1]
 * 0.00000000000000 - B         -> t[2]
 * -20.17541308822119 - E       -> t[3]
 * 424178.11472601280548 - C    -> t[4]
 * 4313415.90726399607956 - F   -> t[5]
 * 
 * x1 = Ax + By + C
 * y1 = Dx + Ey + F
 * 
 * @param {*} x 
 * @param {*} y 
 * @param {*} t 
 * @returns 
 */
function wfTransform (x, y, t){
    x1 = t[0]*x + t[2]*y + t[4];
    y1 = t[1]*x + t[3]*y + t[5];
    return [x1,y1];
}

function readWorldFile(dims){
    xhrDoc= new XMLHttpRequest();   
    xhrDoc.open('GET', WORLD_FILE_PATH , true);
    if (xhrDoc.overrideMimeType)
        xhrDoc.overrideMimeType('text/plain; charset=x-user-defined');
    xhrDoc.onreadystatechange =function()
        {
            if (this.readyState == 4)
            {
                if (this.status == 200)
                    {
                        var str= this.response; //Here is a string of the text data 
                        //var data = str.split(/\r?\n|\r|\n/g);// Split the string on \n or \r characters
                        var t = str.split(/\r?\n|\r|\n/g).map(x => Number(x)).slice(0,-1);
                        nwCorner  =wfTransform(0,0,t);
                        seCorner = wfTransform(dims[0],dims[1],t);
                        console.log (nwCorner,seCorner);
                    }
    
            }                   
        }
    xhrDoc.send(); //sending the request
}

