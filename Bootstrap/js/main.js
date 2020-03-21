var tag_selection = "";
var container, scene, camera, renderer, controls, stats;
var radius = 100;//圆的半径
var keyboard = new THREEx.KeyboardState();
var gui;
var mesh;
var gridHelper;
var plotgeo = false;
var plotpoint = true;
var is_2d = false;
var pointx, pointy;
var theta, dis;
var scale = 20;
var status_running = false;  //控制senddata
var test_status = false;     //控制2d和3d只绘制一次
// var ABCD_is_choose = true;
// var ABCD_size = 0;
// var point3D_a, point3D_c, point3D_b, point3D_d;
function mainload() {
    switchItem();
}
init();
initgui();
on();
animate();
function switchItem() {
    plotgeo = false;
    plotpoint = true;
    clearThree(scene);
    var tag = $('#shape_select').val();
    tag_selection = tag;
    //alert(tag_selection);
    switch (tag) {
        case 'Type1':
            document.getElementById('Type1').style.display = 'block';
            document.getElementById('Type2').style.display = 'none';
            document.getElementById('Type3').style.display = 'none';
            document.getElementById('Type4').style.display = 'none';
            document.getElementById('Type0').style.display = 'none';
            $("#svg_div").html($("#shape_type1").html());
            break;
        case 'Type2':
            document.getElementById('Type2').style.display = 'block';
            document.getElementById('Type1').style.display = 'none';
            document.getElementById('Type3').style.display = 'none';
            document.getElementById('Type4').style.display = 'none';
            document.getElementById('Type0').style.display = 'none';
            $("#svg_div").html($("#shape_type2").html());
            break;
        case 'Type3':
            document.getElementById('Type3').style.display = 'block';
            document.getElementById('Type1').style.display = 'none';
            document.getElementById('Type2').style.display = 'none';
            document.getElementById('Type4').style.display = 'none';
            document.getElementById('Type0').style.display = 'none';
            $("#svg_div").html($("#shape_type3").html());
            break;
        case 'Type4':
            document.getElementById('Type4').style.display = 'block';
            document.getElementById('Type1').style.display = 'none';
            document.getElementById('Type2').style.display = 'none';
            document.getElementById('Type3').style.display = 'none';
            document.getElementById('Type0').style.display = 'none';
            $("#svg_div").html($("#shape_type4").html());
            break;
        case 'Type0':
            document.getElementById('Type0').style.display = 'block';
            document.getElementById('Type1').style.display = 'none';
            document.getElementById('Type2').style.display = 'none';
            document.getElementById('Type3').style.display = 'none';
            document.getElementById('Type4').style.display = 'none';
            $("#svg_div").html($("#shape_type0").html());
            break;
    }
}
function init() {
    // SCENE
    container = document.getElementById('threejs_div');

    scene = new THREE.Scene();
    var SCREEN_WIDTH = container.clientWidth;
    var SCREEN_HEIGHT = container.clientHeight;
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    //var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    //camera.position.set(0,150,400);
    camera.position.set(0,400,0);
    camera.lookAt(scene.position);
    // RENDERER
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( {antialias:true} );
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    //container = document.getElementById( 'ThreeJS' );
    container.appendChild( renderer.domElement );
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
    // CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(100,250,100);
    scene.add(light);

    // SKYBOX
    var skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({color: 0x87CEFA, side: THREE.BackSide});
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);
//     //辅助的坐标系长度
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
    if(plotgeo!=true){
        switch (tag_selection) {
            case "Type0":
                var t0_length = document.getElementById("t0_length").value;
                var t0_width = document.getElementById("t0_width").value;
                var t0_height = document.getElementById("t0_height").value;
                if(t0_length!=''&&t0_width!=''&&t0_height!=''){
                    addGeo();
                }
                plotgeo = true;
                break;
            case "Type1":
                var t1_R = document.getElementById("t1_R").value;
                var t1_t = document.getElementById("t1_t").value;
                if(t1_R!=''&&t1_t!=''){
                    addGeo();
                }
                plotgeo = true;
                break;
            case "Type2":
                var t2_R = document.getElementById("t2_R").value;
                var t2_L = document.getElementById("t2_L").value;
                var t2_t = document.getElementById("t2_t").value;
                if(t2_R!=''&&t2_L!=''&&t2_t!=''){
                    addGeo();
                }
                plotgeo = true;
                break;
            case "Type3":
                var t3_R = document.getElementById("t3_R").value;
                var t3_L1 = document.getElementById("t3_L1").value;
                var t3_L2 = document.getElementById("t3_L2").value;
                var t3_t = document.getElementById("t3_t").value;
                if(t3_R!=''&&t3_L1!=''&&t3_L2!=''&&t3_t!=''){
                    addGeo();
                }
                plotgeo = true;
                break;
            case "Type4":
                var t4_R = document.getElementById("t4_R").value;
                var t4_L = document.getElementById("t4_L").value;
                var t4_D = document.getElementById("t4_D").value;
                var t4_t = document.getElementById("t4_t").value;
                if(t4_R!=''&&t4_L!=''&&t4_D!=''&&t4_t!=''){
                    addGeo();
                }
                break;
        }


    }
    if(plotpoint){
        switch (tag_selection) {
            case "Type0":
                var t0_length = document.getElementById("t0_length").value;
                var t0_width = document.getElementById("t0_width").value;
                var t0_height = document.getElementById("t0_height").value;
                if(t0_length!=''&&t0_width!=''&&t0_height!=''){
                    clearpoint(scene);
                    addpoint();
                    plotpoint = false;
                }
                break;
            case "Type1":
                var t1_R = document.getElementById("t1_R").value;
                var t1_t = document.getElementById("t1_t").value;
                if(t1_R!=''&&t1_t!=''){
                    clearpoint(scene);
                    addpoint();
                    plotpoint = false;
                }
                break;
            case "Type2":
                var t2_R = document.getElementById("t2_R").value;
                var t2_L = document.getElementById("t2_L").value;
                var t2_t = document.getElementById("t2_t").value;
                if(t2_R!=''&&t2_L!=''&&t2_t!=''){
                    clearpoint(scene);
                    addpoint();
                    plotpoint = false;
                }
                break;
            case "Type3":
                var t3_R = document.getElementById("t3_R").value;
                var t3_L1 = document.getElementById("t3_L1").value;
                var t3_L2 = document.getElementById("t3_L2").value;
                var t3_t = document.getElementById("t3_t").value;
                if(t3_R!=''&&t3_L1!=''&&t3_L2!=''&&t3_t!=''){
                    clearpoint(scene);
                    addpoint();
                    plotpoint = false;
                }
                break;
            case "Type4":
                var t4_R = document.getElementById("t4_R").value;
                var t4_L = document.getElementById("t4_L").value;
                var t4_D = document.getElementById("t4_D").value;
                var t4_t = document.getElementById("t4_t").value;
                if(t4_R!=''&&t4_L!=''&&t4_D!=''&&t4_t!=''){
                    clearpoint(scene);
                    addpoint();
                    plotpoint = false;
                }
                break;

        }
    }
    is_2d = gui.view2D;
    gridHelper.position.y = gui.gridY;
    if(gui.view2D){
        if(test_status){
            //绘制
            camera.position.set(0,400,0);
            clearThree(scene);
            plotgeo = false;
            plotpoint = true;
            test_status = false;
        }
    }
    else {
        test_status = true;
    }
    render();
    update();
    //gridHelper.position.y = gui.gridY;
    //ABCD_is_choose = gui.visible;
    //load_ABCD(ABCD_is_choose);
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
        view2D: true
    };

    var datGui = new dat.GUI();

    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）

    datGui.add(gui, "gridY", -50, 0);
    datGui.add(gui, 'view2D');
    //document.getElementById("gui_div").appendChild(datGui);
}
function addGeo() {
    switch (tag_selection) {
        case "Type0":
            var pl = Number(document.getElementById("t0_length").value)*scale;
            var pw = Number(document.getElementById("t0_width").value)*scale;
            var ph = Number(document.getElementById("t0_height").value)*scale;
            addgeo0(pl, ph, pw);
            break;
        case "Type1":
            var pR = Number(document.getElementById("t1_R").value)*scale;
            var pt = Number(document.getElementById("t1_t").value)*scale;
            addgeo1(pR, pt);
            break;
        case "Type2":
            var pR = Number(document.getElementById("t2_R").value)*scale;
            var pL = Number(document.getElementById("t2_L").value)*scale;
            var pt = Number(document.getElementById("t2_t").value)*scale;
            addgeo2(pR, pL, pt);
            break;
        case "Type3":
            var pR = Number(document.getElementById("t3_R").value)*scale;
            var pL1 = Number(document.getElementById("t3_L1").value)*scale;
            var pL2 = Number(document.getElementById("t3_L2").value)*scale;
            var pt = Number(document.getElementById("t3_t").value)*scale;
            addgeo3(pR, pL1, pL2, pt);
            break;
        case "Type4":
            var pR = Number(document.getElementById("t4_R").value)*scale;
            var pL = Number(document.getElementById("t4_L").value)*scale;
            var pD = Number(document.getElementById("t4_D").value)*scale;
            var pt = Number(document.getElementById("t4_t").value)*scale;
            addgeo4(pR, pL, pD, pt);
            break;
    }
}
function addgeo0(pl, pw, ph) {
    var geometry = new THREE.CubeGeometry(pl, pw, ph);//BoxGeometry创建一个长方体  长宽高-->
    var matarial = new THREE.MeshPhongMaterial({color: 0x00ffff});//MeshLambertMaterial材质-->
    var cube = new THREE.Mesh(geometry, matarial);
    scene.add(cube);//创建好的长方体添加到场景中-->
    render();
}
function addgeo1(pR, pt) {
    var cylinderGeo = new THREE.CylinderGeometry(pR, pR, pt, 50, 50);
    var cylinderMat = new THREE.MeshLambertMaterial({//创建材料
        color: 0xFFFFE0,
        wireframe: false
    });
    //创建圆柱体网格模型
    var cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinderMesh.position.set(0, 0, 0);//设置圆柱坐标
    scene.add(cylinderMesh);
}
function addgeo2(pR, pL, pt) {
    //pR 半径
    //pL 弦
    //pt 厚度
    var vertices = [];
    var faces = [];
    var arc_theta = Math.asin(pL / (2 * pR));
    var num = 50;
    var step = (2 * Math.PI - 2 * arc_theta) / num;
    num += 1;
    var current_x, current_y;
    for (var j = 0; j < num; j++) {
        current_x = pR * Math.cos(j * step + arc_theta);
        current_y = pR * Math.sin(j * step + arc_theta);
        vertices.push(new THREE.Vector3(current_x, -pt / 2, current_y));
        vertices.push(new THREE.Vector3(current_x, pt / 2, current_y));
    }
    vertices.push(new THREE.Vector3(0, -pt / 2, 0));
    vertices.push(new THREE.Vector3(0, pt / 2, 0));
    // current_point = new THREE.Vector3(0, 0, 0);
    // geometry.vertices.push(current_point);
    for (j = 0; j < num - 1; j++) {
        faces.push(new THREE.Face3(2 * j, 2 * num, 2 * (j + 1)));
    }
    for (j = 0; j < num - 1; j++) {
        faces.push(new THREE.Face3(2 * j + 1, 2 * (j + 1) + 1, 2 * num + 1));
    }
    faces.push(new THREE.Face3(0, 2 * (num - 1), 2 * num));
    faces.push(new THREE.Face3(2 * (num - 1) + 1, 1, 2 * num + 1));
    for (j = 0; j < num - 1; j++) {
        faces.push(new THREE.Face3(2 * j + 1, 2 * j, 2 * (j + 1)));
        faces.push(new THREE.Face3(2 * (j + 1), 2 * (j + 1) + 1, 2 * j + 1));
    }
    faces.push(new THREE.Face3(2 * (num - 1) + 1, 2 * (num - 1), 0));
    faces.push(new THREE.Face3(0, 1, 2 * (num - 1) + 1));
    var geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;
    geom.computeFaceNormals();
    var materials = new THREE.MeshLambertMaterial(
        {
            color: 0xdfdfdf,
            side: THREE.DoubleSide
            //wireframe: true
        }
    );
    //materials.side = THREE.DoubleSide
    var mesh = new THREE.Mesh(geom, materials);
    scene.add(mesh);
}

function addgeo3(pR, pL1, pL2, pt) {
    //pR 半径
    //pL 弦
    //pt 厚度
    var vertices = [];
    var faces = [];
    var arc_theta1 = Math.asin(pL1 / (2 * pR));
    var arc_theta2 = Math.asin(pL2 / (2 * pR));
    var num1 = 45;
    var num2 = 15;
    var num;
    var step2 = (Math.PI / 2 - arc_theta1 - arc_theta2) / (num2);
    var step1 = (1.5 * Math.PI - arc_theta1 - arc_theta2) / (num1);
    num1 += 1;
    var current_x, current_y;
    for (var j = 0; j < num1; j++) {
        current_x = pR * Math.cos(j * step1 + Math.PI / 2 + arc_theta2);
        current_y = pR * Math.sin(j * step1 + Math.PI / 2 + arc_theta2);
        vertices.push(new THREE.Vector3(current_x, -pt / 2, current_y));
        vertices.push(new THREE.Vector3(current_x, pt / 2, current_y));
    }
    num2 += 1;
    for (j = 0; j < num2; j++) {
        current_x = pR * Math.cos(j * step2 + arc_theta1);
        current_y = pR * Math.sin(j * step2 + arc_theta1);
        vertices.push(new THREE.Vector3(current_x, -pt / 2, current_y));
        vertices.push(new THREE.Vector3(current_x, pt / 2, current_y));
    }
    num = num1 + num2;
    vertices.push(new THREE.Vector3(0, -pt / 2, 0));
    vertices.push(new THREE.Vector3(0, pt / 2, 0));
    // current_point = new THREE.Vector3(0, 0, 0);
    // geometry.vertices.push(current_point);
    for (j = 0; j < num - 1; j++) {
        faces.push(new THREE.Face3(2 * j, 2 * num, 2 * (j + 1)));
    }
    for (j = 0; j < num - 1; j++) {
        faces.push(new THREE.Face3(2 * j + 1, 2 * (j + 1) + 1, 2 * num + 1));
    }
    faces.push(new THREE.Face3(0, 2 * (num - 1), 2 * num));
    faces.push(new THREE.Face3(2 * (num - 1) + 1, 1, 2 * num + 1));
    for (j = 0; j < num - 1; j++) {
        faces.push(new THREE.Face3(2 * j + 1, 2 * j, 2 * (j + 1)));
        faces.push(new THREE.Face3(2 * (j + 1), 2 * (j + 1) + 1, 2 * j + 1));
    }
    faces.push(new THREE.Face3(2 * (num - 1) + 1, 2 * (num - 1), 0));
    faces.push(new THREE.Face3(0, 1, 2 * (num - 1) + 1));
    var geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;
    geom.computeFaceNormals();
    var materials = new THREE.MeshLambertMaterial(
        {
            color: 0xdfdfdf,
            side: THREE.DoubleSide
            //wireframe: true
        }
    );
    //materials.side = THREE.DoubleSide
    var mesh = new THREE.Mesh(geom, materials);
    scene.add(mesh);
}
function addgeo4(pR, pL, pD, pt) {
    var vertices = [];
    var simplify_type = true;
    var faces = [];
    var num1 = 50;
    var num2 = 21;
    var num;
    var step1, step2;
    var theta1 = Math.asin(pL/(2*pR));
    step1 = (2*Math.PI - 2*theta1)/num1;
    num1+=1;
    var current_x, current_y;
    for (var j = 0; j < num1; j++) {
        current_x = pR * Math.cos( - j * step1 + Math.PI / 2 - theta1);
        current_y = pR * Math.sin( - j * step1 + Math.PI / 2 - theta1);
        vertices.push(new THREE.Vector3(current_x, -pt / 2, current_y));
        vertices.push(new THREE.Vector3(current_x, pt / 2, current_y));
    }
    var small_radius = (pD*pD + pL*pL/4)/(2*pD);
    var theta2 = Math.asin(pL/(2*small_radius));
    var r_position_y;
    if(small_radius>=pD){
        r_position_y = Math.sqrt(pR*pR - pL*pL/4)+small_radius - pD;
        step2 = 2*theta2/num2;
        num2+=1;
        for(j = 0; j<num2; j++){
            current_x = small_radius*Math.cos(1.5*Math.PI - theta2 + step2*j);
            current_y = small_radius*Math.sin(1.5*Math.PI - theta2 + step2*j)+r_position_y;
            vertices.push(new THREE.Vector3(current_x, -pt / 2, current_y));
            vertices.push(new THREE.Vector3(current_x, pt / 2, current_y));
        }
    }
    else {
        r_position_y = Math.sqrt(pR*pR - pL*pL/4) - pD + small_radius;
        simplify_type = false;
        step2 = (2*Math.PI - 2*theta2)/num2;
        num2+=1;
        for(j=0;j<num2;j++){
            current_x = small_radius*Math.cos(0.5*Math.PI + theta2 + step2*j);
            current_y = small_radius*Math.sin(0.5*Math.PI + theta2 + step2*j)+r_position_y;
            vertices.push(new THREE.Vector3(current_x, -pt / 2, current_y));
            vertices.push(new THREE.Vector3(current_x, pt / 2, current_y));
        }
    }
    num = num1 + num2;
    vertices.push(new THREE.Vector3(0, -pt / 2, 0));
    vertices.push(new THREE.Vector3(0, pt / 2, 0));
    // current_point = new THREE.Vector3(0, 0, 0);
    // geometry.vertices.push(current_point);
    if(simplify_type){
        for (j = 0; j < num - 1; j++) {
            faces.push(new THREE.Face3(2 * j, 2 * num, 2 * (j + 1)));
        }
        for (j = 0; j < num - 1; j++) {
            faces.push(new THREE.Face3(2 * j + 1, 2 * (j + 1) + 1, 2 * num + 1));
        }
        faces.push(new THREE.Face3(0, 2 * (num - 1), 2 * num));
        faces.push(new THREE.Face3(2 * (num - 1) + 1, 1, 2 * num + 1));
        for (j = 0; j < num - 1; j++) {
            faces.push(new THREE.Face3(2 * j + 1, 2 * j, 2 * (j + 1)));
            faces.push(new THREE.Face3(2 * (j + 1), 2 * (j + 1) + 1, 2 * j + 1));
        }
        faces.push(new THREE.Face3(2 * (num - 1) + 1, 2 * (num - 1), 0));
        faces.push(new THREE.Face3(0, 1, 2 * (num - 1) + 1));
    }
    else{
        //先填充上下两个平面
        var complex_num = num2/2;
        for(j = complex_num - 1; j< num1 - complex_num; j++){
            faces.push(new THREE.Face3(2 * j, 2 * num, 2 * (j + 1)));
        }
        for(j = complex_num - 1; j< num1 - complex_num; j++){
            faces.push(new THREE.Face3(2 * j + 1, 2 * (j + 1) + 1, 2 * num + 1));
        }
        faces.push(new THREE.Face3(2*(num1+complex_num-1), 2*num, 2*(num1+complex_num)));
        faces.push(new THREE.Face3(2*(num1+complex_num)+1, 2*num+1, 2*(num1+complex_num-1)+1));
        faces.push(new THREE.Face3(2*(complex_num-1)+1, 2*num+1, 2*(num1+complex_num)+1));
        faces.push(new THREE.Face3(2*(num1+complex_num), 2*num, 2*(complex_num-1)));
        faces.push(new THREE.Face3(2*(num1-complex_num), 2*num, 2*(num1+complex_num-1)));
        faces.push(new THREE.Face3(2*(num1+complex_num-1)+1, 2*num+1, 2*(num1-complex_num)+1));
        for(j=0; j<complex_num - 1;j++){
            //添加上面的面
            faces.push(new THREE.Face3(2*(num-1-j-1)+1, 2*(num-1-j)+1, 2*j+1));
            faces.push(new THREE.Face3(2*j+1, 2*(j+1)+1, 2*(num-1-j-1)+1));
            //添加下面的面
            faces.push(new THREE.Face3(2*(num-1-j-1), 2*j, 2*(num-1-j)));
            faces.push(new THREE.Face3(2*j, 2*(num-1-j-1), 2*(j+1)));
        }
        for(j=0;j<complex_num-1;j++){
            faces.push(new THREE.Face3(2*(num1-1-j-1)+1, 2*(num1-1-j)+1, 2*(num1+j)+1));
            faces.push(new THREE.Face3(2*(num1+j)+1, 2*(num1+j+1)+1, 2*(num1-1-j-1)+1));

            //下面的面
            faces.push(new THREE.Face3(2*(num1-1-j-1), 2*(num1+j), 2*(num1-1-j)));
            faces.push(new THREE.Face3(2*(num1+j), 2*(num1-1-j-1), 2*(num1+j+1)));
        }
        //添加侧面
        for (j = 0; j < num - 1; j++) {
            faces.push(new THREE.Face3(2 * j + 1, 2 * j, 2 * (j + 1)));
            faces.push(new THREE.Face3(2 * (j + 1), 2 * (j + 1) + 1, 2 * j + 1));
        }
        faces.push(new THREE.Face3(2 * (num - 1) + 1, 2 * (num - 1), 0));
        faces.push(new THREE.Face3(0, 1, 2 * (num - 1) + 1));
    }
    var geom = new THREE.Geometry();
    geom.vertices = vertices;
    geom.faces = faces;
    geom.computeFaceNormals();
    var materials = new THREE.MeshLambertMaterial(
        {
            color: 0xdfdfdf,
            side: THREE.DoubleSide
            //wireframe: true
        }
    );
    //materials.side = THREE.DoubleSide
    var mesh = new THREE.Mesh(geom, materials);
    scene.add(mesh);
}
//清除场景中的几何体
function clearThree(obj){
    while(obj.children.length > 5){
        clearThree(obj.children[5]);
        obj.remove(obj.children[5]);
    }
    if(obj.geometry) obj.geometry.dispose();
    if(obj.material) obj.material.dispose();
    if(obj.texture) obj.texture.dispose();
}
//清除场景中你的点
function clearpoint(obj){
    while(obj.children.length > 6){
        clearThree(obj.children[6]);
        obj.remove(obj.children[6]);
    }
    if(obj.geometry) obj.geometry.dispose();
    if(obj.material) obj.material.dispose();
    if(obj.texture) obj.texture.dispose();
}

//根据文本框内容改变产生新的几何体
function change_geo_by_text() {
    plotgeo = false;
    plotpoint = true;
    clearThree(scene);
}
function change_point_by_text() {
    plotpoint = true;
}
//添加点
function addpoint() {
    var thick;
    switch (tag_selection) {
        case "Type0":
            thick = Number(document.getElementById("t0_height").value)*scale;
            break;
        case "Type1":
            thick = Number(document.getElementById("t1_t").value)*scale;
            break;
        case "Type2":
            thick = Number(document.getElementById("t2_t").value)*scale;
            break;
        case "Type3":
            thick = Number(document.getElementById("t3_t").value)*scale;
            break;
        case "Type4":
            thick = Number(document.getElementById("t4_t").value)*scale;
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
//添加ABCD四个点
function add_ABCD(ph) {
    theta = Number(document.getElementById("theta").value);
    dis = Number(document.getElementById("h").value) * scale;
    var A_x, A_y, B_x, B_y, C_x, C_y, D_x, D_y;
    C_x = pointx + Math.cos(theta * Math.PI / 180) * dis / 2;
    C_y = pointy + Math.sin(theta * Math.PI / 180) * dis / 2;
    B_x = pointx - Math.cos((theta) * Math.PI / 180) * dis / 2;
    B_y = pointy - Math.sin((theta) * Math.PI / 180) * dis / 2;
    D_x = pointx + Math.cos(theta * Math.PI / 180) * 3 * dis / 2;
    D_y = pointy + Math.sin(theta * Math.PI / 180) * 3 * dis / 2;
    A_x = pointx - Math.cos((theta) * Math.PI / 180) * 3 * dis / 2;
    A_y = pointy - Math.sin((theta) * Math.PI / 180) * 3 * dis / 2;
    var pointGeometry_c = new THREE.SphereGeometry(2, 16, 16), // adjust the first value for the 'point' radius
        pointMaterial_c = new THREE.MeshPhongMaterial({color: 0xFFFF00}); // adjust the color of your 'point'
    var point3D_c = new THREE.Mesh(pointGeometry_c, pointMaterial_c);
    point3D_c.position.set(C_x, ph / 2, C_y);
    var pointGeometry_b = new THREE.SphereGeometry(2, 16, 16), // adjust the first value for the 'point' radius
        pointMaterial_b = new THREE.MeshPhongMaterial({color: 0xFFFF00}); // adjust the color of your 'point'
    var point3D_b = new THREE.Mesh(pointGeometry_b, pointMaterial_b);
    point3D_b.position.set(B_x, ph / 2, B_y);
    var pointGeometry_d = new THREE.SphereGeometry(2, 16, 16), // adjust the first value for the 'point' radius
        pointMaterial_d = new THREE.MeshPhongMaterial({color: 0xFF1493}); // adjust the color of your 'point'
    var point3D_d = new THREE.Mesh(pointGeometry_d, pointMaterial_d);
    point3D_d.position.set(D_x, ph / 2, D_y);
    var pointGeometry_a = new THREE.SphereGeometry(2, 16, 16), // adjust the first value for the 'point' radius
        pointMaterial_a = new THREE.MeshPhongMaterial({color: 0xFF1493}); // adjust the color of your 'point'
    var point3D_a = new THREE.Mesh(pointGeometry_a, pointMaterial_a);
    point3D_a.position.set(A_x, ph / 2, A_y);
    scene.add(point3D_a);
    scene.add(point3D_b);
    scene.add(point3D_c);
    scene.add(point3D_d);
}
function senddata() {
    $("#btn_start").prop("disabled", true);
    status_running = true;
    document.getElementById("result_display").innerHTML = "Computing...";
}
//禁用或开启鼠标事件
function on() {
    var event = $("#all_content").click(function(e) {
        if(gui.view2D){
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    });
    var event = $("#all_content").mousemove(function(e) {
        if(gui.view2D){
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    });
    var event = $("#all_content").mouseout(function(e) {
        if(gui.view2D){
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    });
    var event = $("#all_content").mouseup(function(e) {
        if(gui.view2D){
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    });
    var event = $("#all_content").mouseover(function(e) {
        if(gui.view2D){
            e.stopPropagation();
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    });
}
