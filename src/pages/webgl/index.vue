<template>
  <div>
    <!-- <button v-on:click="insert({url:'/resource/01.jpg',type:'0',index:'023',backcolor:0xFFFFFF})"  style="width: 60px;height:40px;position: absolute">添加画框</button>
    <button v-on:click="insert({url:'/resource/02.jpg',type:'0',index:'024',backcolor:0x000000})"  style="width: 60px;height:40px;position: absolute;left:60px">添加画框1</button>
    <button v-on:click="replacement_wallpaper('wall1_5')"  style="width: 60px;height:40px;position: absolute;left:120px">改变墙体</button>
    <button v-on:click="switch_camera()"  style="width: 60px;height:40px;position: absolute;left:180px">相机角度</button>
    <button v-on:click="transfrom_order('023','024')"  style="width: 60px;height:40px;position: absolute;left:240px">调换位置</button>
    <button v-on:click="exhibition_floor('2c',false)"  style="width: 60px;height:40px;position: absolute;left:300px">隐藏层</button> -->
    <div id="WebGL" ref="WebGL">

    </div>
  </div>

</template>

<script>
    import * as THREE from 'three'
    import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

// debugger
    var euler = new THREE.Euler( 0, 0, 0, 'YXZ' );
var minPolarAngle = 0;
var maxPolarAngle = 60;
var PI_2 = Math.PI / 2;

var scale = false;

var rotate = false;

var start = null;

var raycaster = new THREE.Raycaster();

var mouse = new THREE.Vector2();

var mouse_height = 1700;

var overlook = false;

var pre_camera = new THREE.Vector3(0,0,0);

var wall_container = new Array();

var floors_container = new Map();

var top;

var emissiveColor = new THREE.Color(1,1,1);

var lightMapIntensity = 2;

var emissiveIntensity = 1;

export default {
  name:"WebGL",
  data(){
    return{
      scene:Object,
      camera:Object,
      controls:Object,
      renderer:Object,
      frame_container:Object,
      frame_position:Object,
      frame_kind:Map,
      resource:[{id:"hk1_1",form:"fbx"},{id:"hk1_2",form:"fbx"},{id:"hk1_3",form:"fbx"},{id:"hk1_4",form:"fbx"},{id:"hk1_5",form:"fbx"},{id:"hk1_6",form:"fbx"},{id:"hk1_7",form:"fbx"},{id:"hk1_8",form:"fbx"},{id:"wall1_1",form: "texture"},{id:"wall1_2",form: "texture"},{id:"wall1_3",form: "texture"},{id:"wall1_4",form: "texture"},{id:"wall1_5",form: "texture"}],
      frame_info:Map
    }
  },
  created:function () {
    //wall_container = new Array();

    this.frame_kind = new Map();

    this.frame_info = new Map();
    this.frame_info.set("0",[{id:"hk1_1",ratio:0.802},{id:"hk1_2",ratio:0.664},{id:"hk1_3",ratio:0.81},{id:"hk1_4",ratio:0.74},{id:"hk1_5",ratio:1.246},{id:"hk1_6",ratio:1.505},{id:"hk1_7",ratio:1.234},{id:"hk1_8",ratio:1.35}]);
    //this.frame_info.set("1",[{id:"frame",ratio:1.5}]);

    this.frame_container = new THREE.Group();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.1,100000);
    this.scene.add(this.camera);
    this.scene.add(this.frame_container);

    this.camera.position.y = mouse_height;

    this.frame_container.position.set(0,0,0);

    this.renderer = new THREE.WebGLRenderer({antialias:true,precision: 'highp',logarithmicDepthBuffer:true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    var ambient_light = new THREE.AmbientLight(0x080808,0.5);
    /*
    var direct_light = new THREE.DirectionalLight(0xCCCCCC,2);
    direct_light.castShadow = true;
    direct_light.position.set(-1000,1000,1000);

    var direct = new THREE.DirectionalLight(0xCCCCCC,2);
    direct.lookAt(this.scene.position);
    direct.position.set(1000,1000,-1000);*/

    this.scene.add(ambient_light);

    //this.scene.add(direct_light);

    //this.scene.add(direct);

    /*
    this.scene.background = new THREE.CubeTextureLoader()
            .setPath("/skybox/")
            .load(["px.jpg","nx.jpg","py.jpg","ny.jpg","pz.jpg","nz.jpg"],(texture)=>{

            },(request)=>{
              console.log("Process");
            },()=>{
              console.log("Error");
            })*/

    this.loader("/resource/gallery.FBX",this.scene_load);

    this.renderer.setClearColor(new THREE.Color(0x000000));
    this.event_listen();

    this.resource_load();
  },
  mounted:function(){
    this.$nextTick(function() {
      this.$refs.WebGL.appendChild(this.renderer.domElement);
      this.WebGL_Renderer();
    });
  },
  methods: {
    onProgress: function (xhr) {
      if (xhr.lengthComputable) {
        // var percentComplete = xhr.loaded / xhr.total * 100;
        // var progress = Math.round(percentComplete * 0.5, 2);
      }
    },
    // onError: function (xhr) {
    // },
    insert: function (info) {
      if (info.url) {
        let that = this;
        this.image_loader(info.url, function (texture) {
          let image = texture.image;
          let ratio = image.width / image.height;
          let id = that.getFrameId(info.type, ratio);
          that.create_frame(id,info.index,info.backcolor,texture);
        })
      }
    },
    getFrameId(type, ratio) {
      if (this.frame_info.has(type)) {
        let infos = this.frame_info.get(type);

        let min = Number.MAX_VALUE;
        let id = null;
        infos.forEach(function (item) {
          if (Math.abs(item.ratio - ratio) < min) {
            min = Math.abs(item.ratio - ratio);
            id = item.id;
          }
        })
        console.log(id);
        return id;
      }
    },
    create_frame: function (id, index,color,texture) {
      if (this.frame_kind.has(id)) {
        let child = this.frame_kind.get(id).clone();

        child.name = "frame_"+index;

        this.frame_container.add(child);

        let shadow = child.getObjectByName("shadow");
        shadow.material.transparent = true;

        let back = child.getObjectByName("back");
        back.material = back.material.clone();
        back.material.emissive = new THREE.Color(color);

        let picture = child.getObjectByName("picture");
        picture.material = picture.material.clone();

        picture.material.map = texture;
        picture.material.emissiveMap = texture;

        let image = texture.image;
        let ratio = image.width / image.height;

        picture.geometry.computeBoundingBox();
        let bound = picture.geometry.boundingBox;
        let size = new THREE.Vector3(0, 0, 0);
        bound.getSize(size);

        let pic_ratio = size.x / size.z;
        if (ratio > pic_ratio) {
          let height_scale = size.x / ratio / size.z;
          picture.scale.z *= height_scale;
        } else if (ratio < pic_ratio) {
          let width_scale = size.z * ratio / size.x;
          picture.scale.x *= width_scale;
        }

        let position = new THREE.Vector3(0, 0, 0);
        let point = this.frame_position.getObjectByName("P_"+index);
        point.getWorldPosition(position);
        child.position = position;
        let look = point.localToWorld(new THREE.Vector3(0, 100, 0));
        child.lookAt(look);
      }
      //this.frame_container.add(child);
    },
    replacement_wallpaper: function (id) {
      if (this.frame_kind.has(id)) {
        let texture = this.frame_kind.get(id);

        wall_container.forEach(function (child) {
          var tex = child.material.map;
          child.material.map = texture;
          if(tex){
            texture.wrapS = tex.wrapS;
            texture.wrapT = tex.wrapT;
            texture.repeat = tex.repeat;
          }
        })
      }
    },
    transfrom_order: function (pre, next) {
      let pre_frame = this.frame_container.getObjectByName("frame_" + pre);
      let pre_position = this.frame_position.getObjectByName("P_"+pre);
      let next_frame = this.frame_container.getObjectByName("frame_" + next);
      let next_position = this.frame_position.getObjectByName("P_"+next);
      let position = new THREE.Vector3(0, 0, 0);

      if (pre_frame) {
        next_position.getWorldPosition(position);
        pre_frame.position = position.clone();
        pre_frame.name = "frame_"+next;
      }

      if(next_frame){
        pre_position.getWorldPosition(position);
        next_frame.position = position.clone();
        next_frame.name = "frame_"+pre;
      }
    },
    WebGL_Renderer: function () {
      requestAnimationFrame(this.WebGL_Renderer);

      /*
      var intersections = raycaster.intersectObjects(objects);

      var onObject = intersections.length > 0;

      var time = performance.now();
      var delta = (time - prevTime) / 1000;

      velocity.x -= velocity.x * 10.0 * delta;
      velocity.z -= velocity.z * 10.0 * delta;

      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      direction.z = Number(moveForward) - Number(moveBackward);
      direction.x = Number(moveRight) - Number(moveLeft);
      direction.normalize(); // this ensures consistent movements in all directions

      if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
      if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

      if (onObject === true) {

        velocity.y = Math.max(0, velocity.y);
        canJump = true;

      }

      this.moveRight(-velocity.x * delta);
      this.moveForward(-velocity.z * delta);

      this.camera.position.y += (velocity.y * delta); // new behavior

      if (this.camera.position.y < 10) {

        velocity.y = 0;
        this.camera.position.y = 10;

        canJump = true;
      }

      prevTime = time;*/
      this.renderer.render(this.scene, this.camera);
      //this.controls.update(0.01);
    },
    event_listen: function () {
      this.renderer.domElement.addEventListener("dblclick", this.dblclick, false);

      // this.renderer.domElement.addEventListener('mousemove', this.onMouseMove, false);

      this.renderer.domElement.addEventListener( 'touchstart', this.touchstart, false );

      this.renderer.domElement.addEventListener( 'touchmove', this.touchmove, false );

      this.renderer.domElement.addEventListener( 'touchend', this.touchend, false);
    },
    resource_load: function () {
      let _this = this;
      this.resource.forEach(function (item) {
        if (Object.is(item.form, "fbx")) {
          let file_path = "/resource/" + item.id + ".FBX";
          _this.loader(file_path, function (element) {
            _this.frame_kind.set(item.id, element);
          })
        } else if (Object.is(item.form, "texture")) {
          let file_path = "/resource/" + item.id + ".jpg";
          _this.image_loader(file_path, function (element) {
            _this.frame_kind.set(item.id, element);
          })
        }
      })
    },
    scene_load: function (scene) {
      scene.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          if(child.name.startsWith("wall")){
            wall_container.push(child);
          }
        }else{
          if(child.name.startsWith("floor_")){
            floors_container.set(child.name,child);
          }
        }
      });

      this.scene.add(scene);
      scene.position.set(0, 0, 0);
      this.frame_position = scene.getObjectByName("frame_position");
      top = scene.getObjectByName("top");
    },
    loader: function (url, callback) {
      let manager = new THREE.LoadingManager();
      manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
      };

      var loader = new FBXLoader();

      // var that = this;

      loader.load(url, function (object) {
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            let name = "/resource/" + child.name + "VRayCompleteMap.jpg";
            let lightMap = new THREE.TextureLoader().load(name);
            if (Array.isArray(child.material)) {
              child.material.forEach(function (mat) {
                //mat.color= new THREE.Color(0.5,0.5,0.5);
                mat.lightMap = lightMap;
                child.material.lightMapIntensity = lightMapIntensity;
                if (child.material.emissiveMap) {
                  child.material.emissiveIntensity = emissiveIntensity;
                  child.material.emissive = emissiveColor;
                }
              })
            } else {
              child.material.lightMap = lightMap;
              child.material.lightMapIntensity = lightMapIntensity;
              if (child.material.emissiveMap) {
                child.material.emissiveIntensity = emissiveIntensity;
                child.material.emissive = emissiveColor;
              }
            }
          }
        });
        callback(object);
      }, this.onProgress, this.onError);
    },
    image_loader: function (url, callback) {
      let manager = new THREE.LoadingManager();
      manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
      };
      var loader = new THREE.TextureLoader();

      // var that = this;

      loader.load(url, function (texture) {
        callback(texture);
      }, this.onProgress, this.onError);
    },
    onMouseMove: function (event) {
      let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      euler.setFromQuaternion(this.camera.quaternion);

      euler.y -= movementX * 0.002;
      euler.x -= movementY * 0.002;

      euler.x = Math.max(PI_2 - maxPolarAngle, Math.min(PI_2 - minPolarAngle, euler.x));

      this.camera.quaternion.setFromEuler(euler);
    },
    touchstart: function (e) {
      start = e.touches;
      if (e.touches.length == 1) {
        rotate = true;
        scale = false;
      } else if (e.touches.length >= 2) {
        scale = true;
        rotate = false;
      }
    },
    touchmove: function (e) {
      e.preventDefault();
      let current = e.touches;
      if (rotate) {
        var data = this.getDelta(start[0], current[0]);

        euler.setFromQuaternion(this.camera.quaternion);

        if(overlook){
          var matrix = new THREE.Matrix4();
          matrix.makeRotationAxis(new THREE.Vector3(0,1,0),data.x * -0.01);
          this.camera.applyMatrix4(matrix);

          //this.camera.rotateOnWorldAxis(new THREE.Vector3(0,1,0),euler.y);
        }else{
          euler.y += data.x * 0.002;
          euler.x += data.y * 0.002;
          euler.x = Math.max(PI_2 - maxPolarAngle, Math.min(PI_2 - minPolarAngle, euler.x));
          this.camera.quaternion.setFromEuler(euler);
        }
        //this.camera.quaternion.setFromEuler(euler);
      } else if (scale) {
        if(overlook){
          let pre_distance = this.getDistance(start[0],start[1]);
          let cur_distance = this.getDistance(current[0],current[1]);
          this.camera.translateOnAxis(new THREE.Vector3(0,0,1),(pre_distance - cur_distance)*100);
        }
      }
      start = current;
    },
    touchend: function (e) {
      console.log(e)
      rotate = false;
      scale = false;
    },
    getDistance: function (pre, next) {
      let x = next.pageX - pre.pageX;
      let y = next.pageY - pre.pageY;
      return Math.sqrt((x * x) + (y * y));
    },
    getDelta: function (pre, next) {
      let x = next.pageX - pre.pageX;
      let y = next.pageY - pre.pageY;
      return {x: x, y: y};
    },
    dblclick: function (e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);

      var intersects = raycaster.intersectObject(this.scene,true);

      let point = intersects[0].point;

      this.camera.position.set(point.x,(point.y+mouse_height),point.z);
    },
    switch_camera:function(){
      overlook = !overlook;
      if(overlook){
        if(top){
          top.visible = false;
        }
        pre_camera = this.camera.position;
        this.camera.position = new THREE.Vector3(0,20000,20000);
        this.camera.lookAt(this.scene.position);
      }else{
        if(top){
          top.visible = true;
        }
        this.camera.position = pre_camera;
      }
    },
    exhibition_floor:function(id,station){
      if (floors_container.has(id)){
        let floor = floors_container.get(id);
        floor.visible = station;
      }
    },
    exhibition_floors:function(station){
      floors_container.forEach(function(child){
        child.visibility = station;
      });
    }
  }
}
</script>

<style scoped>

#WebGL {
  width:100%;
  height:100%;
  position: absolute;
  z-index:1000;
  border: 1px solid pink;
}


</style>
