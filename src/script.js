// Coded by Haidar Al-Sous 2022/6/17


//Start
//this code contains two main sections
//1.general section: for scene,camera,keyboard,mouse,drawing,rendering and gui settings
//2.physics section: for all the funtions that use the physics in the code

//--------------------------------------------------------------General Section-------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------Setting Up the Scene--------------------------------
import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'

//to load textures
var textureLoader = new THREE.TextureLoader();

// Canvas
const canvas = document.querySelector('canvas.webgl') //html

var Vx,Vy,Vz,Px,Py,Pz

// Scene
const scene = new THREE.Scene()//to ceeate the scene

const celestialObjects = new THREE.Group()//arrays to store objects and orbits
const orbit = new THREE.Group()

scene.add(celestialObjects)//to add objects and orbits
scene.add(orbit)
//---------------------------------------Skybox Settings-------------------------------------------------------

function SkyBoxSpace(){

    
    var uvss =[
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        1.0, 1.0,
        0.0,1.0,
        0.0,0.0
        ]

    //setting up each side of the skybox (6 sides)
    //side 1    
    //z=500 (back)
    var vertices = new Float32Array( 
        [
            -500,-500,-500,
             500,-500,-500,
             500,500,-500,
             500,500,-500,
             -500,500,-500,
            -500,-500,-500
        ]
     );

    var uvs = new Float32Array(uvss); //image coordinates
    var g1 = new THREE.BufferGeometry();

    g1.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );//3 is for x,y,z
    g1.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );//2 is for x,y

    textureLoader.load('a.jfif', function (texture){//loading image into the geometrical shape

    var material = new THREE.MeshBasicMaterial( {map: texture});

    var mesh = new THREE.Mesh( g1, material );// 
    scene.add(mesh);//adding the object to the scene

    }, undefined, function (err) {
    console.error('texture not loaded', err)
    }
    );

    //side 2 (front)
    //z=500
    vertices = new Float32Array( 
        [
             500,-500,500,
            -500,-500,500,
            -500,500,500,
            -500,500,500,
             500,500,500,
             500,-500,500
        ]
     );

     var g2 = new THREE.BufferGeometry();

     g2.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
     g2.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

     textureLoader.load('a.jfif', function (texture){

     var material = new THREE.MeshBasicMaterial( {map: texture});
     var mesh = new THREE.Mesh( g2, material );
     scene.add(mesh);
     
     }, undefined, function (err) {
     console.error('texture not loaded', err)
     }
     );

//side 3 (left)
//x=-500
vertices = new Float32Array( 
    [
        -500,-500,500,
        -500,-500,-500,
        -500,500,-500,
        -500,500,-500,
        -500,500,500,
        -500,-500,500
    ]
 );

 var g3 = new THREE.BufferGeometry();

 g3.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
 g3.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

 textureLoader.load('a.jfif', function (texture){

 var material = new THREE.MeshBasicMaterial( {map: texture});
 var mesh = new THREE.Mesh( g3, material );
 scene.add(mesh);
 
 }, undefined, function (err) {
 console.error('texture not loaded', err)
 }
 );

//side 4 (right)
//x=500
vertices = new Float32Array( 
    [
        500,-500,-500,
        500,-500,500,
        500,500,500,
        500,500,500,
        500,500,-500,
        500,-500,-500
    ]
 );

 var g4 = new THREE.BufferGeometry();

 g4.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
 g4.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

 textureLoader.load('a.jfif', function (texture){

 var material = new THREE.MeshBasicMaterial( {map: texture});
 var mesh = new THREE.Mesh( g4, material );
 scene.add(mesh);

 }, undefined, function (err) {
 console.error('texture not loaded', err)
 }
 );
 
 //side 5 (up)
 //y=500
 vertices = new Float32Array( 
    [
        -500,500,-500,
        500,500,-500,
        500,500,500,
        500,500,500,
        -500,500,500,
        -500,500,-500
    ]
 );

 var g5 = new THREE.BufferGeometry();

 g5.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
 g5.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

 textureLoader.load('a.jfif', function (texture){

 var material = new THREE.MeshBasicMaterial( {map: texture});
 var mesh = new THREE.Mesh( g5, material );
 scene.add(mesh);
 
 }, undefined, function (err) {
 console.error('texture not loaded', err)
 }
 );

 //side 6 (bottom)
 //y=-500
 vertices = new Float32Array( 
    [
        -500,-500,500,
        500,-500,500,
        500,-500,-500,
        500,-500,-500,
        -500,-500,-500,
        -500,-500,500
    ]
 );

 var g6 = new THREE.BufferGeometry();

 g6.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
 g6.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

 textureLoader.load('a.jfif', function (texture){

 var material = new THREE.MeshBasicMaterial( {map: texture});
 var mesh = new THREE.Mesh( g6, material );
 scene.add(mesh);

 }, undefined, function (err) {
 console.error('texture not loaded', err)
 }
 );
}

//-------------------------------------------Window & Camera & Keyboard Settings-----------------------------------------------------
//setting up screen size 
const sizes = {

    width: window.innerWidth,
    height: window.innerHeight
}

//to listen of a screen resize
window.addEventListener('resize', () =>
{

    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
)

// Camera
//camera object with a field of view=20, ascpect ratio depends on window size, near point =0.1, far point=2000
const camera = new THREE.PerspectiveCamera(20, sizes.width / sizes.height, 0.1, 2000)

//Camera's position
var cameraX=0,cameraY=0,cameraZ=30,cameraAngle=0
camera.position.set(cameraX,cameraY,cameraZ)

//setting up keyboard settings to change the camera's position and move its field of view
document.addEventListener("keydown", onDocumentKeyDown, false);
var na='sun'

function onDocumentKeyDown(event) {

//this variable stores the keyboard key value in ascii
var keyCode = event.which;

if (keyCode == 87)//W 
{
    cameraZ-=Math.cos(cameraAngle*Math.PI)*0.4
    cameraX-=Math.sin(cameraAngle*Math.PI)*0.4
    
}
if (keyCode == 83)//S
{
    cameraZ+=Math.cos(cameraAngle*Math.PI)*0.4
    cameraX+=Math.sin(cameraAngle*Math.PI)*0.4
}
if (keyCode == 65)//A
{
    cameraZ+=Math.sin(cameraAngle*Math.PI)*0.2
    cameraX-=Math.cos(cameraAngle*Math.PI)*0.2
}
if (keyCode == 68)//D
{
    cameraZ-=Math.sin(cameraAngle*Math.PI)*0.2
    cameraX+=Math.cos(cameraAngle*Math.PI)*0.2

    }
if (keyCode == 37)//Right Arrow
{
   camera.rotation.y+=0.01*Math.PI
   cameraAngle+=0.01
    }
if (keyCode == 39)//Left Arrow
{
    camera.rotation.y-=0.01*Math.PI
    cameraAngle-=0.01

}
if (keyCode == 38)//Up Arrow
{
    cameraY+=0.2
    
}
if (keyCode == 40)//Down Arrow
{
    cameraY-=0.2
}
//-----------------------------------------------Adding an Object-----------------------------------------------
if(keyCode == 32)//hit the space bar to add an object by user input (using prompt)
{  
    let k1=prompt("name")
    if(k1!="")
    var k2=parseFloat(prompt("radius (astronomical unit/10)"))
    if(!isNaN(k2))
    var k3=parseFloat(prompt("Velocity Vx (m/s)"))
    if(!isNaN(k3))
    var k4=parseFloat(prompt("Velocity Vy (m/s)"))
    if(!isNaN(k4))
    var k5=parseFloat(prompt("Velocity Vz (m/s)"))
    if(!isNaN(k5))
    var k6=parseFloat(prompt("Position Px (astronomical unit/10)"))
    if(!isNaN(k6))
    var k7=parseFloat(prompt("Position Py (astronomical unit/10)"))
    if(!isNaN(k7))
    var k8=parseFloat(prompt("Position Pz (astronomical unit/10)"))
    if(!isNaN(k8))
    var k9=parseFloat(prompt("m (10^20 kg) "))*Math.pow(10,20)
    if(!isNaN(k9))
    var k10=parseFloat(prompt("Spin Velocity Vrx (m/s)"))
    if(!isNaN(k10))
    var k11=parseFloat(prompt("Spin Velocity Vry (m/s)"))
    if(!isNaN(k11))
    var k12=parseFloat(prompt("Spin Velocity Vrz (m/s)"))
    
    //after input, this creates a sphere with the previous values and adds a default picture to it (a texture)
    if(k1!=""&&!isNaN(k2)&&!isNaN(k3)&&!isNaN(k4)&&!isNaN(k5)&&!isNaN(k6)&&!isNaN(k7)&&!isNaN(k8)&&!isNaN(k9)&&!isNaN(k10)&&!isNaN(k11)&&!isNaN(k12))
    sphere(k1,k2,k6,k7,k8,'input.jpg',k3,k4,k5,k9,k10,k11,k12)

}
if(keyCode ==66)//B
{  
  na=prompt("name")
}

 camera.position.set(cameraX,cameraY,cameraZ)

}
//adding the create (camera) object to the scene
scene.add(camera)


//------------------------------------------------------Drawing a Sphere------------------------------------------------------------
function sphere(name,r,Px,Py,Pz,t,Vx,Vy,Vz,m,Vrx,Vry,Vrz){

    const p  = new Float32Array(4608)//2304*2
    const uvs = new Float32Array( 3072)//1536*2 
    let l=0     //for index P[l]
    let ll=0    //for index uvs[ll]

    let Radius=r    //radius
    let yt=1/2   // x of image (0-1)

    for (let aa = 0.0; aa <Math.PI/2; aa +=Math.PI/16)//288*8=2304 //192*8=1536
    {
        let r2=Math.cos(aa+Math.PI/16)*r        //upper radius
        let yy=Math.sin(aa+Math.PI/16)*r        //upper height

        let xt=0 // y of image (0-1)

    for (let a=0.0;a<2*Math.PI;a+=Math.PI/8)//18 vertix for 6 points for  2 tr 18*8*2=288
                                            //18 vertex for 6 points for 12 vertex uvs 12*8*2=192
    {    
     let y =  Math.sin(aa)*r // current length
     //1
     p[l]=Radius*Math.sin(a)
     p[l+1]=y
     p[l+2]=Radius*Math.cos(a)
 
     uvs[ll]=xt
     uvs[ll+1]=yt
 
     //2
     ll+=2
     l+=3
     p[l]=Radius*Math.sin(a+Math.PI/8) 
     p[l+1]=y
     p[l+2]=Radius*Math.cos(a+Math.PI/8)
 
     uvs[ll]=xt+(1/16)
     uvs[ll+1]=yt

     //3
     ll+=2
     l+=3
     p[l]= r2*Math.sin(a+Math.PI/8)
     p[l+1]=yy
     p[l+2]=r2*Math.cos(a+Math.PI/8)
 
     uvs[ll]=xt+(1/16)
     uvs[ll+1]=yt+(1/16)
    
     //4
     ll+=2
     l+=3

     p[l]= r2*Math.sin(a+Math.PI/8)
     p[l+1]=yy
     p[l+2]=r2*Math.cos(a+Math.PI/8) 
 
     uvs[ll]=xt+(1/16)
     uvs[ll+1]=yt+(1/16)
    
     //5
     ll+=2
     l+=3
    
     p[l]= r2*Math.sin(a)
     p[l+1]=yy
     p[l+2]=r2*Math.cos(a)
 
     uvs[ll]=xt
     uvs[ll+1]=yt+(1/16)
    
     //6
     ll+=2
     l+=3
     
     p[l]=Radius*Math.sin(a)
     p[l+1]=y
     p[l+2]=Radius*Math.cos(a)
   
     uvs[ll]=xt
     uvs[ll+1]=yt
   
     l+=3
     ll+=2
    
     xt+=(1/16)
   
    }

    yt+=(1/16)
    Radius=r2

    }

    Radius=r
    yt=(1/2)

    for (let aa = 0.0; aa <Math.PI/2; aa +=Math.PI/16)
    {
        let r2=Math.cos(aa+Math.PI/16)*r //lower radius
        let yy=-Math.sin(aa+Math.PI/16)*r

        let xt=0

    for (let a=0.0;a<2*Math.PI;a+=Math.PI/8)//12 points for 4 tr
    {
 
    let y =-Math.sin(aa)*r
     
    //-2
     
     p[l]= r2*Math.sin(a)
     p[l+1]=yy
     p[l+2]=r2*Math.cos(a)
 
     uvs[ll]=xt
     uvs[ll+1]=yt-(1/16)
     
     //-4
     l+=3
     ll+=2
     
     p[l]= r2*Math.sin(a+Math.PI/8)
     p[l+1]=yy
     p[l+2]=r2*Math.cos(a+Math.PI/8)
 
     uvs[ll]=xt+(1/16)
     uvs[ll+1]=yt-(1/16)
     
     //-3
     l+=3
     ll+=2
     p[l]=Radius*Math.sin(a+Math.PI/8) 
     p[l+1]=y
     p[l+2]=Radius*Math.cos(a+Math.PI/8)
 
     uvs[ll]=xt+(1/16)
     uvs[ll+1]=yt
     
     //-3
     l+=3
     ll+=2
     
     p[l]=Radius*Math.sin(a+Math.PI/8) 
     p[l+1]=y
     p[l+2]=Radius*Math.cos(a+Math.PI/8)
 
     uvs[ll]=xt+(1/16)
     uvs[ll+1]=yt
     
     //-1
     l+=3
     ll+=2
    
     p[l]=Radius*Math.sin(a)
     p[l+1]=y
     p[l+2]=Radius*Math.cos(a)
 
     uvs[ll]=xt
     uvs[ll+1]=yt
     
     //-2
     l+=3
     ll+=2
    
     p[l]= r2*Math.sin(a)
     p[l+1]=yy
     p[l+2]=r2*Math.cos(a)
 
     uvs[ll]=xt
     uvs[ll+1]=yt-(1/16)
    
     l+=3
     ll+=2
     xt+=(1/16)
    
    }
    
    Radius=r2
    yt-=(1/16)

}
//creating geometrical object and loading it with texture & values
//create process
const geometry = new THREE.BufferGeometry()

 geometry.setAttribute( 'position', new THREE.BufferAttribute( p, 3 ) );
 geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
//texture process
 textureLoader.load(t, function (texture){
        console.log('texture loaded');
        var material = new THREE.MeshBasicMaterial( {map: texture});
        var mesh = new THREE.Mesh( geometry, material );
//adding it to the array of objects        
        celestialObjects.add(mesh);

        mesh.position.set(Px,Py,Pz)
//storing values
        mesh.name=name
        mesh.userData.r=r
        mesh.userData.m=m
        mesh.userData.Mm=m
        mesh.userData.Vx=Vx
        mesh.userData.Vy=Vy
        mesh.userData.Vz=Vz
        mesh.userData.NumCol=0
        mesh.userData.ColVx=0
        mesh.userData.ColVy=0
        mesh.userData.ColVz=0
        mesh.userData.ColM=0
        mesh.userData.Vrx=Vrx
        mesh.userData.Vry=Vry
        mesh.userData.Vrz=Vrz

        mesh.userData.angleO=Math.acos(Vrx/Math.sqrt(Math.pow(Vrx,2)+Math.pow(Vrz,2)))
        
        if(isNaN(mesh.userData.angleO))
        mesh.userData.angleO=0
      
        mesh.userData.angleA=(-Math.PI/2)+Math.acos((Math.sqrt(Math.pow(Vrx,2)+Math.pow(Vrz,2)))/Math.sqrt(Math.pow(Vry,2)+Math.pow(Math.sqrt(Math.pow(Vrx,2)+Math.pow(Vrz,2)),2)))
        
        if(isNaN(mesh.userData.angleA))
        mesh.userData.angleA=(-Math.PI/2)

        mesh.userData.Vr=Math.sqrt(Math.pow(Vry,2)+Math.pow(Vrx,2)+Math.pow(Vrz,2))
       
        mesh.userData.w=mesh.userData.Vr/r

        mesh.userData.Axialtilt=(mesh.userData.angleA*180/Math.PI)+90
        //Ek=1/2*m*v^2
        mesh.userData.Ek=(1/2)* mesh.userData.m*Math.pow(mesh.userData.Vr,2)

    }, undefined, function (err) {
        console.error('texture not loaded', err)
    }
    );

 }
 //-------------------------------------------------Drawing Orbits-------------------------------------------------------------------
 //this function draws an orbit for the object by drawing dots continuously
 function dot(px,py,pz){
    //creating an array of coordinates for each dot
    var points=[
        px,py,pz
    ] 
    //creating each dot
    var dotGeometry = new THREE.BufferGeometry()
    dotGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ) );
    //setting up the dots size and color
    var dotMaterial = new THREE.PointsMaterial( { size: 0.1, color: 0xFFFFFF  } );
    //storing everything in the dot variable
    var dot = new THREE.Points( dotGeometry, dotMaterial );
    //adding the dots to the scene
    orbit.add( dot );
 }
//----------------------------This function calculates the distance between to objects-------------------------------------------------
 function DistanceBetween(O1,O2){

//using the distance between to points: square root of[ (x1-x2)^2 + (y1-y2)^2 + (z1-z2)^2 ]
return Math.sqrt(Math.pow(O1.position.x-O2.position.x,2)+Math.pow(O1.position.y-O2.position.y,2)+Math.pow(O1.position.z-O2.position.z,2))


 }
//-------------------------------------Creating a few objects of the solar system (starter examples)--------------------------------------------
//sphere(name,r,Px,Py,Pz,texture,Vx,Vy,Vz,m,Vrx,Vry,Vrz)
sphere('sun',3,0.001,0,0,'sun.jpg',0,0,0,198855*Math.pow(10,25),0.001,0,0.001)
sphere('Mercury ',0.2,3.87,0,0,'Mercury.jpg',0,0,-1514069,330*Math.pow(10,21),0.46947156,0.1,0)
//sphere('venus',0.2,7.23,0,0,'venus .jpg',0,0,-1507725,4868*Math.pow(10,21),0.99862953,0.1,0.2)
sphere('earth',0.3,10,0,0,'land_ocean_ice_cloud_2048.jpg',0,0,-941906,5973.6*Math.pow(10,21),0.06,0.04,0.086519)
sphere('mars',0.2,15.2,0,0,'mars.jpg',0,0,-763975,642*Math.pow(10,21),0.42261826,0.2,0)
sphere('jupiter',1,52,0,0,'jupiter.jpg',0,0,-413047,1898600*Math.pow(10,21),0.06,0.01,0.086519)
//sphere('p2',0.2,180,0,0,'p.jpg',0,0,-222006,2*Math.pow(10,26),0.99254615,0.12186934,0)
sphere('saturn',0.5,95.7,0,0,'saturn.jpg',0,0,-304470,95169*Math.pow(10,21),0.5,0.5,0)
sphere('neptune',2,171,0,0,'R.jpg',0,0,-227773,102148.56*Math.pow(10,21),0.1,0.1,0.1)
SkyBoxSpace()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



//----------------------------------------------------------------GUI Settings---------------------------------------------------------------
//the gui contains information about the current object (the one that is clicked on), plus general information and commands
//example: delete an object, change the timescale, reset to default settings,etc....
let dtt=0.1*10

var id=0

//gui size
const gui = new dat.GUI({ 
    width : 400
})

const object1Folder = gui.addFolder('information and change') 

var g1 = object1Folder.add(camera.position,'x').listen()  
var g2 = object1Folder.add(camera.position,'y').listen()  
var g3 = object1Folder.add(camera.position,'z').listen()  
var g4 = object1Folder.add(camera.rotation,'y').listen()
var g5 = object1Folder.add(camera.rotation,'x').listen()

var controls = new function() {
    this.time = dtt;
}

gui.add(controls, 'time',0,100).name('timescale')

var Orbit = {
    switch: false
};

gui.add(Orbit, 'switch').name("show orbit");

var button1 = { 
    add: function() {
    
    Orbit.switch= false

    while (orbit.children.length > 0) {
    orbit.remove(orbit.children[orbit.children.length - 1]);
}  
      alert("deleted")
    }
};

gui.add(button1, "add").name("delete all orbits");

var button2 = {
    add: function() {
    
    while (celestialObjects.children.length > 0) {
    celestialObjects.remove(celestialObjects.children[celestialObjects.children.length - 1]);
}  

    while (orbit.children.length > 0) {
            orbit.remove(orbit.children[orbit.children.length - 1]);
}

debug.innerText=" " 
debug2.innerText=" " 
debug3.innerText=" " 
debug5.innerText=" " 
id=0


object1Folder.remove(g1)
object1Folder.remove(g2)
object1Folder.remove(g3)
object1Folder.remove(g4)
object1Folder.remove(g5)

alert("start Celestial Objects")

//sphere(name,r,Px,Py,Pz,texture,Vx,Vy,Vz,m)
sphere('sun',3,0.001,0,0,'sun.jpg',0,0,0,198855*Math.pow(10,25),0.001,0,0.001)
sphere('Mercury ',0.2,3.87,0,0,'Mercury.jpg',0,0,-1514069,330*Math.pow(10,21),0.46947156,0.1,0)
//sphere('venus',0.2,7.23,0,0,'venus .jpg',0,0,-1507725,4868*Math.pow(10,21),0.99862953,0.1,0.2)
sphere('earth',0.3,10,0,0,'land_ocean_ice_cloud_2048.jpg',0,0,-941906,5973.6*Math.pow(10,21),0.06,0.04,0.086519)
sphere('mars',0.2,15.2,0,0,'mars.jpg',0,0,-763975,642*Math.pow(10,21),0.42261826,0.2,0)
sphere('jupiter',1,52,0,0,'jupiter.jpg',0,0,-413047,1898600*Math.pow(10,21),0.06,0.01,0.086519)
//sphere('p2',0.2,180,0,0,'p.jpg',0,0,-222006,2*Math.pow(10,26),0.99254615,0.12186934,0)
sphere('saturn',0.5,95.7,0,0,'saturn.jpg',0,0,-304470,95169*Math.pow(10,21),0.5,0.5,0)
sphere('neptune',2,171,0,0,'R.jpg',0,0,-227773,102148.56*Math.pow(10,21),0.1,0.1,0.1)
 
 g1 = object1Folder.add(camera.position,'x').listen()
 g2 = object1Folder.add(camera.position,'y').listen()
 g3 = object1Folder.add(camera.position,'z').listen()
 g4 = object1Folder.add(camera.rotation,'y').listen()
 g5 = object1Folder.add(camera.rotation,'x').listen()

 object1Folder.close()
    }
};

gui.add(button2, "add").name("reset to default");
  
var button3 = {
    add: function() {

    na=prompt("name")
}
};

gui.add(button3,"add").name("calculate distance from another object");

var namede=" "

var button4 = {
    add: function() {
        
    namede=prompt("input the name of the object: ")
    
    for(var b=0;b<celestialObjects.children.length;b++)
     if(celestialObjects.children[b].name==namede)   
 {   celestialObjects.remove(celestialObjects.children[b]);
    if(id==celestialObjects.children[b].id)
    {
     debug.innerText=" " 
     debug2.innerText=" " 
     debug3.innerText=" " 
     debug5.innerText=" " 
     id=0
    }
 }

    namede=" "
    }     
    
};

gui.add(button4,"add").name("delete object by name");

var button5 = {
    add: function() {
    
        while (celestialObjects.children.length > 0) {
            celestialObjects.remove(celestialObjects.children[celestialObjects.children.length - 1]);
        }  

         debug.innerText=" " 
         debug2.innerText=" " 
         debug3.innerText=" " 
         debug5.innerText=" " 
         id=0

    }     
    
};

gui.add(button5,"add").name("delete all objects");


var button6 = {
    add: function() {
    
        for(var b=0;b<celestialObjects.children.length;b++)
           if(celestialObjects.children[b].id==id)
             if(b+1<celestialObjects.children.length)
             {
             id=celestialObjects.children[b+1].id
             break;
             }
             else
             {
             id=celestialObjects.children[0].id 
             break;
             }

    }     
    
};

gui.add(button6,"add").name("move between objects");

var law='newton'
var button7 = {
    add: function() {
       
        if(law=='newton')
          law='Einstein'
        else
          law='newton'  

    }     
    
};

gui.add(button7,"add").name("click this to switch between (Einstein-newton)");


//---------------------------------------------------------------Mouse Settings------------------------------------------------------------------
//setting up mouse pointer coordinates
const mouse={
    x:0,
    y:0
}
//ray caster object is for when clicking on an object on the screen (the ray from the camera to the object)
var raycaster = new THREE.Raycaster();
//listener for a click event
document.addEventListener( 'mousedown', onDocumentMouseDown, false );

function onDocumentMouseDown( event ) 
{//mouse object holds the values of x and y of the mouse's pointer
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;   
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );//to tie the camera to the mouse
    var intersects = raycaster.intersectObjects( celestialObjects.children );

    if (intersects.length>0)
    {   object1Folder.remove(g1)
        object1Folder.remove(g2)
        object1Folder.remove(g3)
        object1Folder.remove(g4)
        object1Folder.remove(g5)
//id variable holds the value of thhat represents the mouse click
        id=intersects[0].object.id

        for(let f=0;f<celestialObjects.children.length;f++)
         if(celestialObjects.children[f].id==id)
        {  
            g1=object1Folder.add(celestialObjects.children[f].userData, 'Vx', -2000000, 2000000, 1000).name('Vx').listen()
            g2=object1Folder.add(celestialObjects.children[f].userData, 'Vy', -2000000, 2000000, 1000).name('Vy').listen()
            g3=object1Folder.add(celestialObjects.children[f].userData, 'Vz', -2000000, 2000000, 1000).name('Vz').listen()          
            g4=object1Folder.add(celestialObjects.children[f].userData, 'Mm',Math.pow(10,20),Math.pow(10,32)).name('m').listen()
            g5=object1Folder.add(celestialObjects.children[f].userData, 'Ek',Math.pow(10,11),Math.pow(10,31)).name('Ek').listen()
            
            object1Folder.open()
        }
    }
}
//---------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------


//---------------------------------------------------------Physics Section---------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------Defining Variables----------------------------------------------------------------
let distance //distance between two objects
let angleA //the angle for vertical axial tilt (spin)
let angleO //angle for horizontal axial tilt (spin)
let Fx //force on x axis
let Fy //force on y axis
let Fz //force on z axis
let EFx //sum of forces on x axis
let EFy //sum of forces on y axis
let EFz //sum of forces on z axis
let ax,ay,az, //acceleration on the three axes
    dVx,dVy,dVz, //change of velocity on the three axes
    dPx,dPy,dPz //change of position coordinates on the three axes

//the stats containers
var debug = document.getElementById('debug')
var debug2 = document.getElementById('debug2')
var debug3 = document.getElementById('debug3')
var debug4 = document.getElementById('debug4')
var debug5 = document.getElementById('debug5')

var col=0 // a boolean to tell if there is collision (0 if no collision)
var sumdt=0 //sum of dt
var ssumdt=0 //also sum of dt (temp variable)
let j //the index of the current object

//for einstein laws
var c=299792458 // speed of light
var LorentzFactor1 //lorentz factor (lambda) for the first object
var LorentzFactor2 //lorentz factor (lambda) for the second object
var MassRelative1 //relative mass for the first object
var MassRelative2 //relative mass for the second object
var TimeRelative //relative time
var LengthRelative // relative length
//--------------------------------------------------------------Main Function-----------------------------------------------------------------------------

// tick function is the main function that contains all the physics
const tick = () =>
{
   camera.lookAt(new THREE.Vector3(cameraX-Math.sin(cameraAngle*Math.PI),cameraY,cameraZ-Math.cos(cameraAngle*Math.PI)))
  
   dtt=controls.time //dt ((temp variable))
   let dt=dtt/20 //to make it between 0.1 and 100 easier to use
   sumdt+=dt  //sum dt for orbits (when to draw orbits or not)
   

   for(let f=0;f<celestialObjects.children.length;f+=1)//looping throught all objects
   {   
       EFx=0,EFy=0,EFz=0 
       col = 0

       if(celestialObjects.children[f].userData.Mm!=celestialObjects.children[f].userData.m)//updates the mass of the object as a result of a change in the slider in the gui 
       {
        //calucalting Ek (0.5 m . V^2) for spin (V is Vr)
        celestialObjects.children[f].userData.Ek=0.5*celestialObjects.children[f].userData.Mm*Math.pow(celestialObjects.children[f].userData.Vr,2)
        //when interacting with the slider, changes are done to Mm, this line of code stores Mm in m
        celestialObjects.children[f].userData.m=celestialObjects.children[f].userData.Mm
       }
       //
       //---------------------------------------------Spin------------------------------------------------------------------------------
       //A and B are two points of a line of the spin axis
       let vecA = new THREE.Vector3(celestialObjects.children[f].position.x+((0.5*Math.cos(celestialObjects.children[f].userData.angleO))*Math.cos(celestialObjects.children[f].userData.angleA)),celestialObjects.children[f].position.y+(0.5*Math.sin(celestialObjects.children[f].userData.angleA)),celestialObjects.children[f].position.z+(0.5*Math.sin(celestialObjects.children[f].userData.angleO)*Math.cos(celestialObjects.children[f].userData.angleA)));
       let vecB = new THREE.Vector3(celestialObjects.children[f].position.x-((0.5*Math.cos(celestialObjects.children[f].userData.angleO))*Math.cos(celestialObjects.children[f].userData.angleA)),celestialObjects.children[f].position.y-(0.5*Math.sin(celestialObjects.children[f].userData.angleA)),celestialObjects.children[f].position.z-(0.5*Math.sin(celestialObjects.children[f].userData.angleO)*Math.cos(celestialObjects.children[f].userData.angleA)));
       
       //vecA should be in a positive field 
       //vecB should be in a negative field
       
        //defining a vector for storing the coordinates of vecA to vecB       
       const vec = new THREE.Vector3();
       vec.copy(vecA).sub(vecB);

       //the shift of the object during spin
       //to calculate axial tilt then use it to make the rotation
       var o=celestialObjects.children[f].userData.w*dt   //tilt     
       celestialObjects.children[f].rotateOnAxis(vec,-o); //vector of rotation
       celestialObjects.children[f].matrix.makeRotationFromEuler(celestialObjects.children[f].rotation); //changing the base line so the object tilts proceeding from the new base line after every tilt
       //
       //-----------------------------------------------Motion Study--------------------------------------------------------------------------
       for(let d=0;d<celestialObjects.children.length;d+=1)//looping through all objects except for the current object
       {   
           if(f==d)
           continue;

           //dd is the distance between the current object and the other object in the loop
           var dd= DistanceBetween(celestialObjects.children[f],celestialObjects.children[d])

           //to convert distance
           //these values are multiplied by 10 before being stored, this allows us to store 14959787 instead of 149597870 
           distance = dd*14959787//unit/10 to km 
//-----------------------------------------------------Collision--------------------------------------------------------------------
           //if this condition is true ==> there is a collision
           if(((dd-(celestialObjects.children[f].userData.r+celestialObjects.children[d].userData.r))<=0))
           {
            //velocity of spin
            var Vrx,Vry,Vrz  
           
            
               //P=mv //Px=mvx 
               var P1x=celestialObjects.children[f].userData.m*celestialObjects.children[f].userData.Vx
               var P2x=celestialObjects.children[d].userData.m*celestialObjects.children[d].userData.Vx
               var P1y=celestialObjects.children[f].userData.m*celestialObjects.children[f].userData.Vy
               var P2y=celestialObjects.children[d].userData.m*celestialObjects.children[d].userData.Vy
               var P1z=celestialObjects.children[f].userData.m*celestialObjects.children[f].userData.Vz
               var P2z=celestialObjects.children[d].userData.m*celestialObjects.children[d].userData.Vz

               //v=p1+p2/m1+m2
               Vx=(P1x+P2x)/(celestialObjects.children[d].userData.m+celestialObjects.children[f].userData.m)
               Vy=(P1y+P2y)/(celestialObjects.children[d].userData.m+celestialObjects.children[f].userData.m)
               Vz=(P1z+P2z)/(celestialObjects.children[d].userData.m+celestialObjects.children[f].userData.m)

               //elastic
               //this condition checks which object is bigger in mass, the smaller object disappears into the bigger object
               //if the first is bigger than the second object (d is deleted (smaller))
               if(celestialObjects.children[f].userData.m>celestialObjects.children[d].userData.m)
               {  
                //to delete the smaller object
                if(id==celestialObjects.children[d].id)
                {
                 debug.innerText=" " 
                 debug2.innerText=" " 
                 debug3.innerText=" " 
                 debug5.innerText=" " 
                 id=0 // id is the index of the object
                }

                //spin velocity after collision
                //vr=(m1*v1r+m2*v2)/m1+m2
                Vrx=(celestialObjects.children[f].userData.m*celestialObjects.children[f].userData.Vrx
                +celestialObjects.children[d].userData.m*celestialObjects.children[d].userData.Vx)
                /(celestialObjects.children[d].userData.m+celestialObjects.children[f].userData.m)
                
                Vry=(celestialObjects.children[f].userData.m*celestialObjects.children[f].userData.Vry
                +celestialObjects.children[d].userData.m*celestialObjects.children[d].userData.Vy)
                /(celestialObjects.children[d].userData.m+celestialObjects.children[f].userData.m)

                Vrz=(celestialObjects.children[f].userData.m*celestialObjects.children[f].userData.Vrz
                +celestialObjects.children[d].userData.m*celestialObjects.children[d].userData.Vz)
                /(celestialObjects.children[d].userData.m+celestialObjects.children[f].userData.m)
                
                celestialObjects.children[f].userData.ColM+=celestialObjects.children[d].userData.m
                //m1+m2
                celestialObjects.children[f].userData.m+=celestialObjects.children[d].userData.m
                celestialObjects.children[f].userData.Mm=celestialObjects.children[f].userData.m
                celestialObjects.remove(celestialObjects.children[d])

                 if(d<f) // to fix indices after delete 
                 f-=1

                //to show information about post collision 
                 celestialObjects.children[f].userData.NumCol+=1 //number of collisions 
                //change in speed due to collision
                 celestialObjects.children[f].userData.ColVx+=Vx-celestialObjects.children[f].userData.Vx            
                 celestialObjects.children[f].userData.ColVy+=Vy-celestialObjects.children[f].userData.Vy
                 celestialObjects.children[f].userData.ColVz+=Vz-celestialObjects.children[f].userData.Vz
                //to calculate the speed of the object (storing the calculated values)
                 celestialObjects.children[f].userData.Vx=Vx
                 celestialObjects.children[f].userData.Vy=Vy
                 celestialObjects.children[f].userData.Vz=Vz
                //to calculate the speed of the spin
                 celestialObjects.children[f].userData.Vrx=Vrx 
                 celestialObjects.children[f].userData.Vry=Vry
                 celestialObjects.children[f].userData.Vrz=Vrz

                 //angle o = acos(Vrx/root(Vrx^2 + Vrz^2))
                 celestialObjects.children[f].userData.angleO=Math.acos(Vrx/Math.sqrt(Math.pow(Vrx,2)+Math.pow(Vrz,2)))
                
                 //if angle o is infinite ==> return angle o is 0
                 if(isNaN(celestialObjects.children[f].userData.angleO))
                 celestialObjects.children[f].userData.angleO=0
              
                 //angle a = acos(Vrx/root(Vrx^2 + Vrz^2))
                 celestialObjects.children[f].userData.angleA=(-Math.PI/2)+Math.acos((Math.sqrt(Math.pow(Vrx,2)+Math.pow(Vrz,2)))/Math.sqrt(Math.pow(Vry,2)+Math.pow(Vrx,2)+Math.pow(Vrz,2)))
                
                 //if angle a is infinite ==> return angle a is -pi/2

                 if(isNaN(celestialObjects.children[f].userData.angleA))
                 celestialObjects.children[f].userData.angleA=(-Math.PI/2)
                
                //Vr= root(Vry^2 + Vrx^2 + Vrz^2) (current spin velocity)
                 celestialObjects.children[f].userData.Vr=Math.sqrt(Math.pow(Vry,2)+Math.pow(Vrx,2)+Math.pow(Vrz,2))
                 //to calculate the angular velocity using Vr (linear), where w = Vr/r
                 celestialObjects.children[f].userData.w=celestialObjects.children[f].userData.Vr/celestialObjects.children[f].userData.r
                 //calculating the new axial tilt
                 celestialObjects.children[f].userData.Axialtilt=(celestialObjects.children[f].userData.angleA*180/Math.PI)+90 

                 //calculating the new Ek
                 //Ek=1/2*m*v^2
                 celestialObjects.children[f].userData.Ek=(1/2)*celestialObjects.children[f].userData.m*Math.pow(celestialObjects.children[f].userData.Vr,2)
            }
            //else
            else if(celestialObjects.children[d].userData.m>celestialObjects.children[f].userData.m)
            {

              if(id==celestialObjects.children[f].id)
              {  
                  debug.innerText=" "
                  debug2.innerText=" " 
                  debug3.innerText=" " 
                  debug5.innerText=" " 

                  id=0
              }
                //same process, but now f is deleted (the second objectis bigger than the first) (f is smaller)
                Vrx=(celestialObjects.children[f].userData.m*celestialObjects.children[f].userData.Vx
                +celestialObjects.children[d].userData.m*celestialObjects.children[d].userData.Vrx)
                /(celestialObjects.children[d].userData.m+celestialObjects.children[f].userData.m)
                
                Vry=(celestialObjects.children[f].userData.m*celestialObjects.children[f].userData.Vy
                +celestialObjects.children[d].userData.m*celestialObjects.children[d].userData.Vry)
                /(celestialObjects.children[d].userData.m+celestialObjects.children[f].userData.m)
                
                Vrz=(celestialObjects.children[f].userData.m*celestialObjects.children[f].userData.Vz
                +celestialObjects.children[d].userData.m*celestialObjects.children[d].userData.Vrz)
                /(celestialObjects.children[d].userData.m+celestialObjects.children[f].userData.m)

                celestialObjects.children[d].userData.ColM+=celestialObjects.children[f].userData.m
                //m1+m2
                celestialObjects.children[d].userData.m+=celestialObjects.children[f].userData.m
                celestialObjects.children[d].userData.Mm=celestialObjects.children[d].userData.m

                celestialObjects.remove(celestialObjects.children[f])

                if(f<d)
                d-=1


                celestialObjects.children[d].userData.NumCol+=1
                celestialObjects.children[d].userData.ColVx+=Vx-celestialObjects.children[d].userData.Vx              
                celestialObjects.children[d].userData.ColVy+=Vy-celestialObjects.children[d].userData.Vy
                celestialObjects.children[d].userData.ColVz+=Vz-celestialObjects.children[d].userData.Vz
                celestialObjects.children[d].userData.Vx=Vx
                celestialObjects.children[d].userData.Vy=Vy
                celestialObjects.children[d].userData.Vz=Vz

                celestialObjects.children[d].userData.Vrx=Vrx
                celestialObjects.children[d].userData.Vry=Vry
                celestialObjects.children[d].userData.Vrz=Vrz
                celestialObjects.children[d].userData.angleO=Math.acos(Vrx/Math.sqrt(Math.pow(Vrx,2)+Math.pow(Vrz,2)))
           
                if(isNaN(celestialObjects.children[d].userData.angleO))
                celestialObjects.children[d].userData.ngleO=0
         
                celestialObjects.children[d].userData.angleA=(-Math.PI/2)+Math.acos((Math.sqrt(Math.pow(Vrx,2)+Math.pow(Vrz,2)))/Math.sqrt(Math.pow(Vry,2)+Math.pow(Vrx,2)+Math.pow(Vrz,2)))
         
                if(isNaN(celestialObjects.children[d].userData.angleA))
                celestialObjects.children[d].userData.angleA=(-Math.PI/2)

                celestialObjects.children[d].userData.Vr=Math.sqrt(Math.pow(Vry,2)+Math.pow(Vrx,2)+Math.pow(Vrz,2))
                celestialObjects.children[d].userData.w=celestialObjects.children[d].userData.Vr/celestialObjects.children[d].userData.r
                celestialObjects.children[d].userData.Axialtilt=(celestialObjects.children[d].userData.angleA*180/Math.PI)+90
               
                //Ek=1/2*m*v^2
                celestialObjects.children[d].userData.Ek=(1/2)*celestialObjects.children[d].userData.m*Math.pow(celestialObjects.children[d].userData.Vr,2)

            }
               //if collision happened on the current iteration in the loop (col becomes 1)
               col=1
               continue; 

            }   
           //-------------------------------------------Gravity (Newton & Einstein)------------------------------------------------------------------------------


           //reusing old angle variables to store the angles between axes for force
            //angleO is now the angle between the y and z
            //angleA is now the angle between the x and z

        
           //atan(z1-z2/x1-x2)
           angleA=Math.atan2(celestialObjects.children[d].position.z-celestialObjects.children[f].position.z,celestialObjects.children[f].position.x-celestialObjects.children[d].position.x)
        
           //atan(y1-y2/x1-x2)    
           angleO=Math.atan2(celestialObjects.children[f].position.y-celestialObjects.children[d].position.y,celestialObjects.children[f].position.x-celestialObjects.children[d].position.x)
          
           //if atan is infinity..angle o is 0
           if(angleO==NaN||celestialObjects.children[f].position.y-celestialObjects.children[d].position.y==0)
           angleO=0


           //if atan is infinity..angle a is 0
           if(angleA==NaN||celestialObjects.children[d].position.z-celestialObjects.children[f].position.z==0)
           angleA=0

           if(law=='newton')
           {    //calculating the force of gravity according to newton's laws on all axes 

           Fx = (6.67408*Math.pow(10, -11)*celestialObjects.children[f].userData.m*celestialObjects.children[d].userData.m*Math.cos(angleA))/Math.pow(distance,2)
           Fy = (6.67408*Math.pow(10, -11)*celestialObjects.children[f].userData.m*celestialObjects.children[d].userData.m*Math.sin(angleO))/Math.pow(distance,2)//m*m
           Fz = (6.67408*Math.pow(10, -11)*celestialObjects.children[f].userData.m*celestialObjects.children[d].userData.m*Math.sin(angleA))/Math.pow(distance,2)
           }
           else if(law=='Einstein')
           {
            //calculating the attributes according to einstein's theory of special relativity
            speed=Math.sqrt(Math.pow(celestialObjects.children[f].userData.Vx,2)//velocity of first object
            +Math.pow(Math.sqrt(Math.pow(celestialObjects.children[f].userData.Vy,2)
            +Math.pow(celestialObjects.children[f].userData.Vz,2)),2))
            
            LorentzFactor1=1/Math.sqrt(1-Math.pow(speed/c,2))//LorentzFactor1=1/sqrt(1-(v^2/c^2))
           
            speed=Math.sqrt(Math.pow(celestialObjects.children[d].userData.Vx,2)//velocity of the second object
            +Math.pow(Math.sqrt(Math.pow(celestialObjects.children[d].userData.Vy,2)
            +Math.pow(celestialObjects.children[d].userData.Vz,2)),2))

            LorentzFactor2=1/Math.sqrt(1-Math.pow(speed/c,2))//LorentzFactor2=1/sqrt(1-(v^2/c^2))

            //calculating relative masses for object 1 and 2
            MassRelative1=celestialObjects.children[f].userData.m*LorentzFactor1
            MassRelative2=celestialObjects.children[d].userData.m*LorentzFactor2
            //calculating relative length
            LengthRelative=distance/LorentzFactor1 //relative distance
            Fx = (6.67408*Math.pow(10, -11)*MassRelative1*MassRelative2*Math.cos(angleA))/Math.pow(LengthRelative,2)
            Fy = (6.67408*Math.pow(10, -11)*MassRelative1*MassRelative2*Math.sin(angleO))/Math.pow(LengthRelative,2)//m*m
            Fz = (6.67408*Math.pow(10, -11)*MassRelative1*MassRelative2*Math.sin(angleA))/Math.pow(LengthRelative,2)
           }

           //calculating the sum of forces (einstein or newton(for both))
           EFx+=Fx
           EFy+=Fy
           EFz+=Fz

        }   
        //if collision occurs, calculations would be wrong, therefore skip when there is a collision
         if(col==1)
         continue;
         
         //to convert lengths from astronomical unit to kilometer 
         //these values are multiplied by 10 before being stored, this allows us to store 14959787 instead of 149597870 
         Px=celestialObjects.children[f].position.x*14959787
         Py=celestialObjects.children[f].position.y*14959787
         Pz=celestialObjects.children[f].position.z*14959787
         
         //so far, we've calculated EF (according to newton or einstein)
         //now we will calculate velocity
         //to do that, first, we need to calculate the acceleration
         if(law=='newton')
         {
        //acceleration calculation
         ax=-EFx/celestialObjects.children[f].userData.m
         ay=-EFy/celestialObjects.children[f].userData.m
         az=EFz/celestialObjects.children[f].userData.m
         
         //new velocity is old velocity + the change in velocity
         //calculating the change in velocity to add it to the velocity
         dVx=ax*dt
         dVy=ay*dt
         dVz=az*dt
        //storing the velocities in temp variables
         Vx=celestialObjects.children[f].userData.Vx
         Vy=celestialObjects.children[f].userData.Vy
         Vz=celestialObjects.children[f].userData.Vz
        //calculating the new velocities
         Vx+=dVx
         Vy+=dVy
         Vz+=dVz
        //storing calculated values in the attribues of the object
         celestialObjects.children[f].userData.Vx=Vx
         celestialObjects.children[f].userData.Vy=Vy
         celestialObjects.children[f].userData.Vz=Vz
        //calculating the change in position
         dPx=Vx*dt
         dPy=Vy*dt
         dPz=Vz*dt
         }


         //same process but for einstein laws (we use relative mass,length,time)
         else if(law=='Einstein')
         {
            //calc relative time
         TimeRelative=dt*LorentzFactor1
            //calc acceleration based on relative mass
         ax=-EFx/MassRelative1
         ay=-EFy/MassRelative1
         az=EFz/MassRelative1
         //calc change in velocity based on relative time
         dVx=ax*TimeRelative
         dVy=ay*TimeRelative
         dVz=az*TimeRelative
            // storing old velocities in temp variables
         Vx=celestialObjects.children[f].userData.Vx
         Vy=celestialObjects.children[f].userData.Vy
         Vz=celestialObjects.children[f].userData.Vz
            //calc new velocities
         Vx+=dVx
         Vy+=dVy
         Vz+=dVz
            //storing new velocities
         celestialObjects.children[f].userData.Vx=Vx
         celestialObjects.children[f].userData.Vy=Vy
         celestialObjects.children[f].userData.Vz=Vz
            //calc change in position based on relative time
         dPx=Vx*TimeRelative
         dPy=Vy*TimeRelative
         dPz=Vz*TimeRelative
         }
         // calc new position (for newton or einstein (both))
         Px+=dPx
         Py+=dPy
         Pz+=dPz
         //calc position in astronomical units
         Px/=14959787
         Py/=14959787
         Pz/=14959787
         //setting the object position the newly-calculated position  (for drawing only)
         celestialObjects.children[f].position.set(Px,Py,Pz)

//---------------------------------Calculate distance between the current object and another object by name--------------------------------------------------------------------------------
        //searching by name for the object that we need to calculate the distance for 
        for(let k=0;k<celestialObjects.children.length;k++) 
         {  
            if(celestialObjects.children[k].name==na)
            j=k
         }
//------------------------------------------------------------Printing Stats------------------------------------------------------------------        
         if(celestialObjects.children[f].id==id)
         { 
           var speed=Math.sqrt(Math.pow(celestialObjects.children[f].userData.Vx,2)+Math.pow(Math.sqrt(Math.pow(celestialObjects.children[f].userData.Vy,2)+Math.pow(celestialObjects.children[f].userData.Vz,2)),2))
      
           debug.innerText =
           'name :' 
           +celestialObjects.children[f].name 
           +'\n Px : '+celestialObjects.children[f].position.x.toFixed(5)
           +'\n Py : '+celestialObjects.children[f].position.y.toFixed(5)
           +'\n Pz : '+celestialObjects.children[f].position.z.toFixed(5)
           +'\n speed : '+speed.toFixed(2)+' m.s \n Vx=' 
           + celestialObjects.children[f].userData.Vx.toFixed(2) 
           +'\n Vy='+celestialObjects.children[f].userData.Vy.toFixed(2)
           +'\n Vz='+celestialObjects.children[f].userData.Vz.toFixed(2)
           +'\n distance from the :'
           +celestialObjects.children[j].name+'\n'
           +(DistanceBetween(celestialObjects.children[f],celestialObjects.children[j])/10).toFixed(2)
           +' unit'
           +'\n '+(DistanceBetween(celestialObjects.children[f],celestialObjects.children[j])*14959787).toFixed(0)+' km' 
           +'\n mass : '
           +(celestialObjects.children[f].userData.m/Math.pow(10,6))
           +' milion kg \n'
           
           debug2.innerText=
           'number collision : '
           + celestialObjects.children[f].userData.NumCol 
           +'\n Change Vx :'+celestialObjects.children[f].userData.ColVx.toFixed(4) 
           +'\n Change Vy :'+celestialObjects.children[f].userData.ColVy.toFixed(4) 
           +'\n Change Vz :'+celestialObjects.children[f].userData.ColVz.toFixed(4) 
           +'\n Change M+=:'+celestialObjects.children[f].userData.ColM.toFixed(4) 

           debug3.innerText=
           'Axial tilt :'
           +celestialObjects.children[f].userData.Axialtilt.toFixed(2)
           +'\n speed V :'
           +celestialObjects.children[f].userData.Vr.toFixed(4)
           +'\n Angular velocity W :'
           +celestialObjects.children[f].userData.w.toFixed(4)
           +'\n change in angular rotation dO : \n'
           +(celestialObjects.children[f].userData.w*dt).toFixed(8)
           +'\n EK : '
           +(celestialObjects.children[f].userData.Ek).toFixed(7)
           +' jol'
           if(law=='Einstein')
          { debug5.innerText='Time Relative :'
            +TimeRelative*20
            +' dt \n Mass Relative : \n'
            +MassRelative1/Math.pow(10,6)
            +' milion kg \n Distance Relative from the :'
            +celestialObjects.children[j].name
            +'\n '
            +((DistanceBetween(celestialObjects.children[f],celestialObjects.children[j])/LorentzFactor1)*14959787).toFixed(0)+' km'
          }
           else 
           debug5.innerText=" "

//---------------------------------------------To draw orbits-------------------------------------------------------------------------
           if(Orbit.switch==true&&sumdt>ssumdt)
           {
             ssumdt+=1
             dot(celestialObjects.children[f].position.x,celestialObjects.children[f].position.y,celestialObjects.children[f].position.z)
           }
         }
//-----------------------------------------------------change in Ek ==>> change in Velocity------------------------------------------------------------------------
         if(celestialObjects.children[f].userData.Ek>0)
         {
         celestialObjects.children[f].userData.Ek-=Math.pow(10,10)*dt
         
         //v=sqrt(2Ek/m)
         celestialObjects.children[f].userData.Vr=Math.sqrt(2*celestialObjects.children[f].userData.Ek/celestialObjects.children[f].userData.m)
         celestialObjects.children[f].userData.w=celestialObjects.children[f].userData.Vr/celestialObjects.children[f].userData.r

        }  
    }
//------------------------------------------------------to count the number of object-----------------------------------------------------   
   debug4.innerText=
   'Number Objects : '
   +celestialObjects.children.length
//------------------------------------------------------Calling Functions-----------------------------------------------------------------
   renderer.autoClear = false;

   renderer.render(scene, camera)

   window.requestAnimationFrame(tick)
}

tick()
