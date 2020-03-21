// standard global variables
var tag_selection = "";
var container, scene, camera, renderer, controls, stats;
var radius = 100;//圆的半径
var t1length, t1wideth, t1height;
var t2R, t2L, t2t;
var t3R, t3L1, t3L2, t3t;
var t4R, t4L, t4D, t4t;
var keyboard = new THREEx.KeyboardState();
var gui;
var gridHelper;
var pointx, pointy;
var theta, dis;
var scale = 23;
var ABCD_is_choose = true;
var ABCD_size = 0;
var point3D_a, point3D_c, point3D_b, point3D_d;

function draw() {

    switchItem();
    init();
    initgui();
    animate();
}

// FUNCTIONS
function init() {
    // SCENE
    container = document.getElementById('display_div');

    scene = new THREE.Scene();
    var SCREEN_WIDTH = container.clientWidth;
    var SCREEN_HEIGHT = container.clientHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0, 150, 400);
    camera.lookAt(scene.position);
    // RENDERER
    if (Detector.webgl)
        renderer = new THREE.WebGLRenderer({antialias: true});
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container.appendChild(renderer.domElement);
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({charCode: 'm'.charCodeAt(0)});
    // CONTROLS
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // STATS
    // stats = new Stats();
    // // //stats.domElement.style.position = 'absolute';
    // // stats.domElement.style.marginBottom = '60px';
    // stats.domElement.style.marginLeft = '10px';
    // stats.domElement.style.marginTop = '10px';
    // stats.domElement.style.zIndex = "100px";
    // container.appendChild(stats.domElement);
    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(100, 250, 100);
    scene.add(light);
    // SKYBOX
    var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({color: 0x87CEFA, side: THREE.BackSide});
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);
    //辅助的坐标系长度
    var r = 100;

    var axis = new THREE.AxisHelper(r * 1.5);
    axis.material = new THREE.MeshBasicMaterial({color: 0xff0000});
    scene.add(axis);

    //添加网格辅助工具
    var size = 150;
    var divisions = 20;

    gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.position.set(0, -10, 0);
    scene.add(gridHelper);

}


function animate() {
    requestAnimationFrame(animate);
    render();
    update();
    gridHelper.position.y = gui.gridY;
    ABCD_is_choose = gui.visible;
    load_ABCD(ABCD_is_choose);
}

function update() {
    if (keyboard.pressed("z")) {
        // do something
    }

    controls.update();
    // stats.update();
}

function render() {
    renderer.render(scene, camera);
}

function initgui() {
    gui = {

        gridY: -10, //灯光y轴的位置
        visible: false
    };

    var datGui = new dat.GUI();

    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）

    datGui.add(gui, "gridY", -50, 0);
    datGui.add(gui, 'visible');
    datGui.domElement.style = 'position:absolute;top:60px;right:350px;height:200px';
}

function add_ABCD(ph) {
    theta = Number(document.getElementById("theta").value);
    dis = Number(document.getElementById("dis").value) * scale;
    var A_x, A_y, B_x, B_y, C_x, C_y, D_x, D_y;
    C_x = pointx + Math.cos(theta * Math.PI / 180) * dis / 2;
    C_y = pointy + Math.sin(theta * Math.PI / 180) * dis / 2;
    B_x = pointx + Math.cos((theta + 180) * Math.PI / 180) * dis / 2;
    B_y = pointy + Math.sin((theta + 180) * Math.PI / 180) * dis / 2;
    D_x = pointx + Math.cos(theta * Math.PI / 180) * 3 * dis / 2;
    D_y = pointy + Math.sin(theta * Math.PI / 180) * 3 * dis / 2;
    A_x = pointx + Math.cos((theta + 180) * Math.PI / 180) * 3 * dis / 2;
    A_y = pointx + Math.sin((theta + 180) * Math.PI / 180) * 3 * dis / 2;
    var pointGeometry_c = new THREE.SphereGeometry(2, 16, 16), // adjust the first value for the 'point' radius
        pointMaterial_c = new THREE.MeshPhongMaterial({color: 0xFFFF00}); // adjust the color of your 'point'
    point3D_c = new THREE.Mesh(pointGeometry_c, pointMaterial_c);
    point3D_c.position.set(C_x, ph / 2, C_y);
    var pointGeometry_b = new THREE.SphereGeometry(2, 16, 16), // adjust the first value for the 'point' radius
        pointMaterial_b = new THREE.MeshPhongMaterial({color: 0xFFFF00}); // adjust the color of your 'point'
    point3D_b = new THREE.Mesh(pointGeometry_b, pointMaterial_b);
    point3D_b.position.set(B_x, ph / 2, B_y);
    var pointGeometry_d = new THREE.SphereGeometry(2, 16, 16), // adjust the first value for the 'point' radius
        pointMaterial_d = new THREE.MeshPhongMaterial({color: 0xFF1493}); // adjust the color of your 'point'
    point3D_d = new THREE.Mesh(pointGeometry_d, pointMaterial_d);
    point3D_d.position.set(D_x, ph / 2, D_y);
    var pointGeometry_a = new THREE.SphereGeometry(2, 16, 16), // adjust the first value for the 'point' radius
        pointMaterial_a = new THREE.MeshPhongMaterial({color: 0xFF1493}); // adjust the color of your 'point'
    point3D_a = new THREE.Mesh(pointGeometry_a, pointMaterial_a);
    point3D_a.position.set(A_x, ph / 2, A_y);
    ABCD_size = 4;

}

function load_ABCD(choose) {
    if (choose == true) {
        scene.add(point3D_a);
        scene.add(point3D_b);
        scene.add(point3D_c);
        scene.add(point3D_d);
    }
    else {
        if (ABCD_size == 4) {
            scene.remove(point3D_a);
            scene.remove(point3D_b);
            scene.remove(point3D_c);
            scene.remove(point3D_d);
        }

    }
}

function getdomheight(dom) {   //获取一个dom的高度-->
    return dom.offsetHeight;
}

function switchItem() {
    var tag = document.getElementById('type_select').value;
    tag_selection = tag;
    switch (tag) {
        case 'Type1':
            document.getElementById('type1').style.display = 'block';
            document.getElementById('type2').style.display = 'none';
            document.getElementById('type3').style.display = 'none';
            document.getElementById('type4').style.display = 'none';
            break;
        case 'Type2':
            document.getElementById('type2').style.display = 'block';
            document.getElementById('type1').style.display = 'none';
            document.getElementById('type3').style.display = 'none';
            document.getElementById('type4').style.display = 'none';
            break;
        case 'Type3':
            document.getElementById('type3').style.display = 'block';
            document.getElementById('type1').style.display = 'none';
            document.getElementById('type2').style.display = 'none';
            document.getElementById('type4').style.display = 'none';
            break;
        case 'Type4':
            document.getElementById('type4').style.display = 'block';
            document.getElementById('type1').style.display = 'none';
            document.getElementById('type2').style.display = 'none';
            document.getElementById('type3').style.display = 'none';
            break;
    }
}

function addtype() {
    console.log(tag_selection);
    switch (tag_selection) {
        case "Type1":
            addtype1();
            break;
        case "Type2":
            addtype2();
            break;
        case "Type3":
            addtype3();
            break;
        case "Type4":
            addtype4();
            break;
    }
}

function addtype1() {
    t1length = Number(document.getElementById("type1length").value) * scale;
    t1wideth = Number(document.getElementById("type1width").value) * scale;
    t1height = Number(document.getElementById("type1height").value) * scale;
    var geometry = new THREE.CubeGeometry(t1length, t1height, t1wideth);//BoxGeometry创建一个长方体  长宽高-->
    var matarial = new THREE.MeshPhongMaterial({color: 0x00ffff});//MeshLambertMaterial材质-->
    var cube = new THREE.Mesh(geometry, matarial);
    scene.add(cube);//创建好的长方体添加到场景中-->
    animate();
}

function addtype2() {
    //创建立方体几何体
    t2R = Number(document.getElementById("type2R").value) * scale;
    t2t = Number(document.getElementById("type2t").value) * scale;
    t2L = Number(document.getElementById("type2L").value) * scale;
    var cylinderGeo = new THREE.CylinderGeometry(t2R, t2R, t2t, 50, 50);
    var cylinderMat = new THREE.MeshLambertMaterial({//创建材料
        color: 0xFFFFE0,
        wireframe: false
    });
    //创建圆柱体网格模型
    var cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinderMesh.position.set(0, 0, 0);//设置圆柱坐标
    //scene.add(cylinderMesh);
    var geometry = new THREE.CubeGeometry(2 * t2R, 2 * t2t, 2 * t2R);//BoxGeometry创建一个长方体  长宽高
    var matarial = new THREE.MeshLambertMaterial({color: 0x89a255});//MeshLambertMaterial材质
    var cube = new THREE.Mesh(geometry, matarial);
    //计算切点的位置
    var tempcutx = Math.sqrt(t2R * t2R - t2L * t2L / 4);
    cube.position.set(tempcutx - t2R, 0, 0);
    //scene.add(cube);//创建好的长方体添加到场景中
    //生成ThreeBSP对象
    var sphereBSP = new ThreeBSP(cylinderMesh);
    var cubeBSP = new ThreeBSP(cube);

    //进行并集计算
    var resultBSP = sphereBSP.intersect(cubeBSP);

    //从BSP对象内获取到处理完后的mesh模型数据
    var result = resultBSP.toMesh();
    //更新模型的面和顶点的数据
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();

    //重新赋值一个纹理
    var material = new THREE.MeshPhongMaterial({color: 0x00ffff});
    result.material = material;

    //将计算出来模型添加到场景当中
    scene.add(result);
}

function addtype3() {
    //创建立方体几何体
    t3R = Number(document.getElementById("type3R").value) * scale;
    t3L1 = Number(document.getElementById("type3L1").value) * scale;
    t3L2 = Number(document.getElementById("type3L2").value) * scale;
    t3t = Number(document.getElementById("type3t").value) * scale;
    var cylinderGeo = new THREE.CylinderGeometry(t3R, t3R, t3t, 50, 50);
    var cylinderMat = new THREE.MeshLambertMaterial({//创建材料
        color: 0xFFFFE0,
        wireframe: false
    });
    //创建圆柱体网格模型
    var cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinderMesh.position.set(0, 0, 0);//设置圆柱坐标
    //添加立方体
    var geometry = new THREE.CubeGeometry(2 * t3R, 2 * t3t, 2 * t3R);//BoxGeometry创建一个长方体  长宽高
    var matarial = new THREE.MeshLambertMaterial({color: 0x89a255});//MeshLambertMaterial材质
    var cube = new THREE.Mesh(geometry, matarial);
    //计算切点的位置
    var tempcutx = Math.sqrt(t3R * t3R - t3L1 * t3L1 / 4);
    cube.position.set(tempcutx - t3R, 0, 0);
    //scene.add(cube);//创建好的长方体添加到场景中
    //生成ThreeBSP对象
    var sphereBSP = new ThreeBSP(cylinderMesh);
    var cubeBSP = new ThreeBSP(cube);

    //进行并集计算
    var resultBSP = sphereBSP.intersect(cubeBSP);

    //从BSP对象内获取到处理完后的mesh模型数据
    var result = resultBSP.toMesh();
    //更新模型的面和顶点的数据
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();

    //重新赋值一个纹理
    var material = new THREE.MeshPhongMaterial({color: 0x00ffff});
    result.material = material;


    var geometry2 = new THREE.CubeGeometry(2 * t3R, 2 * t3t, 2 * t3R);//BoxGeometry创建一个长方体  长宽高
    var matarial2 = new THREE.MeshLambertMaterial({color: 0x89a255});//MeshLambertMaterial材质
    var cube2 = new THREE.Mesh(geometry2, matarial2);
    var tempcuty = Math.sqrt(t3R * t3R - t3L2 * t3L2 / 4);
    cube2.position.set(0, 0, tempcuty - t3R);
    var resultBSP1 = new ThreeBSP(result);
    var cube2BSP = new ThreeBSP(cube2);
    //进行并集计算
    var lastBSP = resultBSP1.intersect(cube2BSP);

    //从BSP对象内获取到处理完后的mesh模型数据
    var last = lastBSP.toMesh();
    //更新模型的面和顶点的数据
    last.geometry.computeFaceNormals();
    last.geometry.computeVertexNormals();

    var material2 = new THREE.MeshPhongMaterial({color: 0x00ffff});
    last.material = material2;
    scene.add(last);
}

function addtype4() {
    t4R = Number(document.getElementById("type4R").value) * scale;
    t4L = Number(document.getElementById("type4L").value) * scale;
    t4D = Number(document.getElementById("type4D").value) * scale;
    t4t = Number(document.getElementById("type4t").value) * scale;
    var cylinderGeo = new THREE.CylinderGeometry(t4R, t4R, t4t, 50, 50);
    var cylinderMat = new THREE.MeshLambertMaterial({//创建材料
        color: 0xFFFFE0,
        wireframe: false
    });
    //创建圆柱体网格模型
    var cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinderMesh.position.set(0, 0, 0);//设置圆柱坐标
    var smallradius = (t4D * t4D + t4L * t4L / 4) / (2 * t4D);
    var geometry = new THREE.CylinderGeometry(smallradius, smallradius, 2 * t4t, 50, 50);//BoxGeometry创建一个长方体  长宽高
    var matarial = new THREE.MeshLambertMaterial({
        color: 0xFFFFE0,
        wireframe: false
    });//MeshLambertMaterial材质
    var cube = new THREE.Mesh(geometry, matarial);
    var tempz = Math.sqrt(t4R * t4R - t4L * t4L / 4) + smallradius - t4D;
    cube.position.set(0, 0, tempz);

    //生成ThreeBSP对象
    var sphereBSP = new ThreeBSP(cylinderMesh);
    var cubeBSP = new ThreeBSP(cube);

    //进行并集计算
    var resultBSP = sphereBSP.subtract(cubeBSP);

    //从BSP对象内获取到处理完后的mesh模型数据
    var result = resultBSP.toMesh();
    //更新模型的面和顶点的数据
    result.geometry.computeFaceNormals();
    result.geometry.computeVertexNormals();

    //重新赋值一个纹理
    var material2 = new THREE.MeshPhongMaterial({color: 0x00ffff});
    result.material = material2;

    //将计算出来模型添加到场景当中
    scene.add(result);
}

function addpoint() {
    var thick;
    switch (tag_selection) {
        case "Type1":
            thick = t1height;
            break;
        case "Type2":
            thick = t2t;
            break;
        case "Type3":
            thick = t3t;
            break;
        case "Type4":
            thick = t4t;
            break;
    }
    pointx = Number(document.getElementById("x").value) * scale;
    pointy = Number(document.getElementById("y").value) * scale;
    var pointGeometry = new THREE.SphereGeometry(2, 16, 16), // adjust the first value for the 'point' radius
        pointMaterial = new THREE.MeshPhongMaterial({color: 0x00ff00}), // adjust the color of your 'point'
        point3D = new THREE.Mesh(pointGeometry, pointMaterial);
    point3D.position.set(pointx, thick / 2, pointy);
    scene.add(point3D);
    add_ABCD(thick);
}

function display_type1_length() {
    var img = document.getElementById("image_type1_length");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function vanish_type1_length() {
    var img = document.getElementById("image_type1_length");
    img.style.display = "none";
}

function display_type1_width() {
    var img = document.getElementById("image_type1_width");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function vanish_type1_width() {
    var img = document.getElementById("image_type1_width");
    img.style.display = "none";
}

function display_type1_height() {
    var img = document.getElementById("image_type1_height");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function vanish_type1_height() {
    var img = document.getElementById("image_type1_height");
    img.style.display = "none";
}

function display_type2_R() {
    var img = document.getElementById("image_type2_R");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function vanish_type2_R() {
    var img = document.getElementById("image_type2_R");
    img.style.display = "none";
}

function display_type2_L() {
    var img = document.getElementById("image_type2_L");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function vanish_type2_L() {
    var img = document.getElementById("image_type2_L");
    img.style.display = "none";
}

function display_type2_t() {
    var img = document.getElementById("image_type2_t");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function vanish_type2_t() {
    var img = document.getElementById("image_type2_t");
    img.style.display = "none";
}

function type3R_D() {
    var img = document.getElementById("image_type3_R");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function type3R_V() {
    var img = document.getElementById("image_type3_R");
    img.style.display = "none";
}

function type3L1_D() {
    var img = document.getElementById("image_type3_L1");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function type3L1_V() {
    var img = document.getElementById("image_type3_L1");
    img.style.display = "none";
}

function type3L2_D() {
    var img = document.getElementById("image_type3_L2");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function type3L2_V() {
    var img = document.getElementById("image_type3_L2");
    img.style.display = "none";
}

function type3t_D() {
    var img = document.getElementById("image_type3_t");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function type3t_V() {
    var img = document.getElementById("image_type3_t");
    img.style.display = "none";
}

function type4R_D() {
    var img = document.getElementById("image_type4_R");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function type4R_V() {
    var img = document.getElementById("image_type4_R");
    img.style.display = "none";
}

function type4L_D() {
    var img = document.getElementById("image_type4_L");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function type4L_V() {
    var img = document.getElementById("image_type4_L");
    img.style.display = "none";
}

function type4D_D() {
    var img = document.getElementById("image_type4_D");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function type4D_V() {
    var img = document.getElementById("image_type4_D");
    img.style.display = "none";
}

function type4t_D() {
    var img = document.getElementById("image_type4_t");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function type4t_V() {
    var img = document.getElementById("image_type4_t");
    img.style.display = "none";
}

function x_show() {
    var img = document.getElementById("image_x");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function x_van() {
    var img = document.getElementById("image_x");
    img.style.display = "none";
}

function y_show() {
    var img = document.getElementById("image_y");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y + "px";
    img.style.display = "block";
}

//图片消失
function y_van() {
    var img = document.getElementById("image_y");
    img.style.display = "none";
}

function theta_show() {
    var img = document.getElementById("image_theta");
    var x = event.clientX + document.body.scrollLeft + 20;
    var y = event.clientY + document.body.scrollTop - 5;
    img.style.position = "fixed";
    img.style.left = x - 570 + "px";
    img.style.top = y - 300 + "px";
    img.style.display = "block";
}

//图片消失
function theta_van() {
    var img = document.getElementById("image_theta");
    img.style.display = "none";
}

var divfaher = document.getElementById("divright");
var divtemp = document.getElementById("divshape");
var divtype1 = document.getElementById("typeshape_btn");
var divtype2 = document.getElementById("divchoosepoint");
var divtype3 = document.getElementById("choose_point_btn");
var divpre = document.getElementById("divprecision");
divpre.style.height = getdomheight(divfaher)
    - getdomheight(divtemp)
    - getdomheight(divtype1)
    - getdomheight(divtype2)
    - getdomheight(divtype3) + 'px';
document.getElementById("measure_point").addEventListener('click', addpoint);

function senddata() {
    //第一步：定义json格式数据
    var postData;
    switch (tag_selection) {
        case "Type1":
            postData = {
                "param": '0'
                    + ','
                    + $('#type1length').val()
                    + ','
                    + $('#type1width').val()
                    + ','
                    + $('#type1height').val()
                    + ','
                    + $('#x').val()
                    + ','
                    + $('#y').val()
                    + ','
                    + $('#theta').val()
                    + ','
                    + $('#dis').val()
            };
            break;
        case "Type2":
            if(Number($('#type2L').val()) == 0)
            {
                postData = {
                    "param" :  '1'
                        + ','
                        + $('#type2R').val()
                        + ','
                        + $('#type2t').val()
                        + ','
                        + $('#x').val()
                        + ','
                        + $('#y').val()
                        + ','
                        + $('#theta').val()
                        + ','
                        + $('#dis').val()
                };
            }
            else {
                postData = {
                    "param" :  '2'
                        + ','
                        + $('#type2R').val()
                        + ','
                        + $('#type2L').val()
                        + ','
                        + $('#type2t').val()
                        + ','
                        + $('#x').val()
                        + ','
                        + $('#y').val()
                        + ','
                        + $('#theta').val()
                        + ','
                        + $('#dis').val()
                };
            }
            break;
        case "Type3":
            postData = {
                "param" : '3'
                    + ','
                    + $('#type3R').val()
                    + ','
                    + $('#type3L1').val()
                    + ','
                    + $('#type3L2').val()
                    + ','
                    + $('#type3t').val()
                    + ','
                    + $('#x').val()
                    + ','
                    + $('#y').val()
                    + ','
                    + $('#theta').val()
                    + ','
                    + $('#dis').val()
            };
            break;
        case "Type4":
            postData = {
                "param" : '4'
                    + ','
                    + $('#type4R').val()
                    + ','
                    + $('#type4L').val()
                    + ','
                    + $('#type4D').val()
                    + ','
                    + $('#type4t').val()
                    + ','
                    + $('#x').val()
                    + ','
                    + $('#y').val()
                    + ','
                    + $('#theta').val()
                    + ','
                    + $('#dis').val()
            };
            break;
    }
    /**ajax的type,url,dataType,contentType,data属性*/
    $.ajax({
        async: false,
        cache: false,
        type: 'POST',
        url: 'area/delete',
        dataType: "json",
        contentType: 'application/json', //第二步：定义格式
        data: JSON.stringify(postData), //第二步；把json转为String传递给后台
        error: function () {
            alert('请求失败 ');
        },
        success: function (data) {
            alert(data);
        }
    });
}