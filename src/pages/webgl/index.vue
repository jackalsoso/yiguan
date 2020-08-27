<template>
  <div>
    <!-- <button
      v-on:click="
        insert({
          id: '12',
          frame_id: '',
          url: '/resource/01.jpg',
          type: '0',
          index: '023',
          backcolor: 0xffffff,
        })
      "
      style="width: 60px;height:40px;position: absolute"
    >
      添加画框
    </button>
    <button
      v-on:click="
        insert({
          url: '/resource/02.jpg',
          type: '0',
          index: '024',
          backcolor: 0x000000,
        })
      "
      style="width: 60px;height:40px;position: absolute;left:60px"
    >
      添加画框1
    </button>
    <button
      v-on:click="replacement_wallpaper('wall1_2')"
      style="width: 60px;height:40px;position: absolute;left:120px"
    >
      改变墙体
    </button>
    <button
      v-on:click="switch_camera()"
      style="width: 60px;height:40px;position: absolute;left:180px"
    >
      相机角度
    </button>
    <button
      v-on:click="exhibition_style('hk1_1')"
      style="width: 60px;height:40px;position: absolute;left:240px"
    >
      调换位置
    </button>
    <button
      v-on:click="set_origin_position('023')"
      style="width: 60px;height:40px;position: absolute;left:300px"
    >
      隐藏层
    </button> -->
    <div id="WebGL" ref="WebGL"></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

let cubeCamera;

let euler = new THREE.Euler(0, 0, 0, "YXZ");
let minPolarAngle = 1;
let maxPolarAngle = 60;
let PI_2 = Math.PI / 2;

let scale = false;

let rotate = false;

let start = null;

let raycaster = new THREE.Raycaster();

let mouse = new THREE.Vector2();

let mouse_height = 1700;

let overlook = false;

let pre_camera = new THREE.Vector3(0, 0, 0);

let wall_container = new Array();

let floors_container = new Map();

let top;

let emissiveColor = new THREE.Color(1, 1, 1);

let lightMapIntensity = 2;

let emissiveIntensity = 1;

let overlook_increment = { x: 0, y: 0 };

let rotate_increment = { x: 0, y: 0 };

let divisor = 10.0;

let lastClickTime = 0;

let clickTimer;

let pre_euler = new THREE.Euler(0, 0, 0, "YXZ");

let target_position = new THREE.Vector3(0, 0, 0);

let target_ratio = 1;

let style_point;

export default {
  name: "WebGL",
  data() {
    return {
      scene: Object,
      camera: Object,
      controls: Object,
      renderer: Object,
      frame_container: Object,
      frame_position: Object,
      frame_kind: Map,
      resource: [
        { id: "hk1_1", form: "fbx" },
        { id: "hk1_2", form: "fbx" },
        { id: "hk1_3", form: "fbx" },
        { id: "hk1_4", form: "fbx" },
        { id: "hk1_5", form: "fbx" },
        { id: "hk1_6", form: "fbx" },
        { id: "hk1_7", form: "fbx" },
        { id: "hk1_8", form: "fbx" },
        { id: "wall1_1", form: "texture" },
        { id: "wall1_2", form: "texture" },
        { id: "wall1_3", form: "texture" },
        { id: "wall1_4", form: "texture" },
        { id: "wall1_5", form: "texture" },
      ],
      frame_info: Map,
      bottom_container: Array,
      style_container: Object,
    };
  },
  props: ["LoadScene", "sceneLoad", "mouseClick"],
  created: function() {
    this.bottom_container = new Array();

    this.frame_kind = new Map();

    this.frame_info = new Map();
    this.frame_info.set("0", [
      { id: "hk1_1", ratio: 0.802 },
      { id: "hk1_2", ratio: 0.664 },
      { id: "hk1_3", ratio: 0.81 },
      { id: "hk1_4", ratio: 0.74 },
      { id: "hk1_5", ratio: 1.246 },
      { id: "hk1_6", ratio: 1.505 },
      { id: "hk1_7", ratio: 1.234 },
      { id: "hk1_8", ratio: 1.35 },
    ]);

    this.frame_container = new THREE.Group();
    this.style_container = new THREE.Group();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      100,
      100000
    );
    this.scene.add(this.camera);
    this.scene.add(this.frame_container);
    this.scene.add(this.style_container);

    this.camera.position.y = mouse_height;

    this.frame_container.position.set(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      precision: "highp",
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    var ambient_light = new THREE.AmbientLight(0x080808, 0.5);

    var cubeRenderTarget = new THREE.WebGLCubeRenderTarget(1024, {
      format: THREE.RGBFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter,
    });

    cubeCamera = new THREE.CubeCamera(100, 100000, cubeRenderTarget);

    this.scene.add(cubeCamera);

    this.scene.add(ambient_light);

    this.renderer.setClearColor(new THREE.Color(0x000000));

    this.event_listen();

    this.resource_load();

    this.loader("/resource/gallery.FBX", this.scene_load);
    //初始fbx材质文件
  },
  mounted: function() {
    this.$nextTick(function() {
      this.$refs.WebGL.appendChild(this.renderer.domElement);
      this.WebGL_Renderer();
    });
  },
  methods: {
    load_scene: function(sceneName) {
      this.loader(sceneName, this.scene_load);
    },
    onProgress: function(xhr) {
      if (xhr.lengthComputable) {
        var percentComplete = (xhr.loaded / xhr.total) * 100;
        var progress = Math.round(percentComplete * 0.5, 2);
      }
    },
    onError: function(xhr) {},
    insert: function(info) {
      if (info.url) {
        let that = this;
        this.image_loader(info.url, function(texture) {
          let image = texture.image;
          let ratio = image.width / image.height;
          if (info.frame_id) {
            that.create_frame(
              info.frame_id,
              info.id,
              info.index,
              info.backcolor,
              texture
            );
          } else {
            let id = that.getFrameId(info.type, ratio);
            that.create_frame(id, info.id, info.index, info.backcolor, texture);
          }
        });
      }
    },
    getFrameId(type, ratio) {
      if (this.frame_info.has(type)) {
        let infos = this.frame_info.get(type);
        let min = Number.MAX_VALUE;
        let id = null;
        infos.forEach(function(item) {
          if (Math.abs(item.ratio - ratio) < min) {
            min = Math.abs(item.ratio - ratio);
            id = item.id;
          }
        });
        return id;
      }
    },
    create_frame: function(id, name, index, color, texture) {
      if (this.frame_kind.has(id)) {
        let child = this.frame_kind.get(id).clone();

        child.name = "frame_" + index;

        child.realName = name;

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
          let width_scale = (size.z * ratio) / size.x;
          picture.scale.x *= width_scale;
        }

        let position = new THREE.Vector3(0, 0, 0);
        let point = this.frame_position.getObjectByName("P_" + index);
        point.getWorldPosition(position);
        child.position = position;
        let look = point.localToWorld(new THREE.Vector3(0, 100, 0));
        child.lookAt(look);
      }
    },
    replacement_wallpaper: function(id) {
      if (this.frame_kind.has(id)) {
        let texture = this.frame_kind.get(id);

        wall_container.forEach(function(child) {
          var tex = child.material.map;
          child.material.map = texture;
          if (tex) {
            texture.wrapS = tex.wrapS;
            texture.wrapT = tex.wrapT;
            texture.repeat = tex.repeat;
          }
        });
      }
    },
    transfrom_order: function(pre, next) {
      let pre_frame = this.frame_container.getObjectByName("frame_" + pre);
      let pre_position = this.frame_position.getObjectByName("P_" + pre);
      let next_frame = this.frame_container.getObjectByName("frame_" + next);
      let next_position = this.frame_position.getObjectByName("P_" + next);
      let position = new THREE.Vector3(0, 0, 0);

      if (pre_frame) {
        next_position.getWorldPosition(position);
        pre_frame.position = position.clone();
        pre_frame.name = "frame_" + next;
      }

      if (next_frame) {
        pre_position.getWorldPosition(position);
        next_frame.position = position.clone();
        next_frame.name = "frame_" + pre;
      }
    },
    WebGL_Renderer: function() {
      requestAnimationFrame(this.WebGL_Renderer);

      if (Math.abs(overlook_increment.x) > Math.pow(10, -3)) {
        var matrix = new THREE.Matrix4();
        matrix.makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          (overlook_increment.x / divisor) * -0.01
        );
        this.camera.applyMatrix4(matrix);
        overlook_increment.x -= overlook_increment.x / divisor;
      }

      if (Math.abs(rotate_increment.y) > Math.pow(10, -3)) {
        euler.setFromQuaternion(this.camera.quaternion);
        euler.x += (rotate_increment.y / divisor) * 0.005;
        euler.x = Math.max(
          PI_2 - maxPolarAngle,
          Math.min(PI_2 - minPolarAngle, euler.x)
        );

        rotate_increment.y -= rotate_increment.y / divisor;

        this.camera.quaternion.setFromEuler(euler);
      }

      if (Math.abs(rotate_increment.x) > Math.pow(10, -3)) {
        euler.y += (rotate_increment.x / divisor) * 0.005;
        rotate_increment.x -= rotate_increment.x / divisor;
        this.camera.quaternion.setFromEuler(euler);
      }

      if (Math.abs(target_ratio - 1) > Math.pow(10, -2)) {
        this.camera.position.lerp(target_position, target_ratio);
        target_ratio += 0.01;
      }

      this.renderer.render(this.scene, this.camera);
      //cubeCamera.update(this.renderer, this.scene);
    },
    event_listen: function() {
      this.renderer.domElement.addEventListener("click", this.click, false);

      this.renderer.domElement.addEventListener(
        "touchstart",
        this.touchstart,
        false
      );

      this.renderer.domElement.addEventListener(
        "touchmove",
        this.touchmove,
        false
      );

      this.renderer.domElement.addEventListener(
        "touchend",
        this.touchend,
        false
      );
    },
    resource_load: function() {
      let _this = this;
      this.resource.forEach(function(item) {
        if (Object.is(item.form, "fbx")) {
          let file_path = "/resource/" + item.id + ".FBX";
          _this.loader(file_path, function(element) {
            _this.frame_kind.set(item.id, element);
          });
        } else if (Object.is(item.form, "texture")) {
          let file_path = "/resource/" + item.id + ".jpg";
          _this.image_loader(file_path, function(element) {
            _this.frame_kind.set(item.id, element);
          });
        }
      });
    },
    scene_load: function(scene) {
      let that = this;
      this.scene.add(scene);
      scene.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          if (child.name.startsWith("wall")) {
            wall_container.push(child);
          } else if (child.name.startsWith("bottom")) {
            //that.bottom_container.push(child);
          }
        } else {
          if (child.name.startsWith("floor_")) {
            floors_container.set(child.name, child);
          } else if (child.name == "origin_position") {
            let pos = new THREE.Vector3(0, 0, 0);
            child.getWorldPosition(pos);
            that.camera.position.set(pos.x, mouse_height, pos.z);
          }
        }
      });

      scene.position.set(0, 0, 0);
      this.frame_position = scene.getObjectByName("frame_position");
      top = scene.getObjectByName("top");

      if (this.$props.sceneLoad) {
        this.$props.sceneLoad();
      }
    },
    loader: function(url, callback) {
      let manager = new THREE.LoadingManager();
      manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
      };

      var loader = new FBXLoader();

      var that = this;

      loader.load(
        url,
        function(object) {
          object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
              let name = "/resource/" + child.name + "VRayCompleteMap.jpg";
              let lightMap = new THREE.TextureLoader().load(name);
              if (Array.isArray(child.material)) {
                child.material.forEach(function(mat) {
                  mat.lightMap = lightMap;
                  mat.lightMapIntensity = lightMapIntensity;
                  if (mat.emissiveMap) {
                    mat.emissiveIntensity = emissiveIntensity;
                    mat.emissive = emissiveColor;
                  }
                });
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
        },
        this.onProgress,
        this.onError
      );
    },
    image_loader: function(url, callback) {
      let manager = new THREE.LoadingManager();
      manager.onProgress = function(item, loaded, total) {
        console.log(item, loaded, total);
      };
      var loader = new THREE.TextureLoader();

      var that = this;

      loader.load(
        url,
        function(texture) {
          callback(texture);
        },
        this.onProgress,
        this.onError
      );
    },
    onMouseMove: function(event) {
      let movementX =
        event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      let movementY =
        event.movementY || event.mozMovementY || event.webkitMovementY || 0;

      euler.setFromQuaternion(this.camera.quaternion);

      euler.y -= movementX * 0.002;
      euler.x -= movementY * 0.002;

      euler.x = Math.max(
        PI_2 - maxPolarAngle,
        Math.min(PI_2 - minPolarAngle, euler.x)
      );

      this.camera.quaternion.setFromEuler(euler);
    },
    touchstart: function(e) {
      start = e.touches;
      if (e.touches.length == 1) {
        rotate = true;
        scale = false;
      } else if (e.touches.length >= 2) {
        scale = true;
        rotate = false;
      }
    },
    touchmove: function(e) {
      e.preventDefault();
      let current = e.touches;
      if (rotate) {
        var data = this.getDelta(start[0], current[0]);

        //euler.setFromQuaternion(this.camera.quaternion);

        if (overlook) {
          /*
          var matrix = new THREE.Matrix4();
          matrix.makeRotationAxis(new THREE.Vector3(0,1,0),data.x * -0.01);
          this.camera.applyMatrix4(matrix);*/
          overlook_increment.x += data.x;
          overlook_increment.y += data.y;

          //this.camera.rotateOnWorldAxis(new THREE.Vector3(0,1,0),euler.y);
        } else {
          /*
          euler.y -= data.x * 0.002;
          euler.x -= data.y * 0.002;
          euler.x = Math.max(PI_2 - maxPolarAngle, Math.min(PI_2 - minPolarAngle, euler.x));
          this.camera.quaternion.setFromEuler(euler);*/
          rotate_increment.x += data.x;
          rotate_increment.y += data.y;
        }
        //this.camera.quaternion.setFromEuler(euler);
      } else if (scale) {
        if (overlook) {
          let pre_distance = this.getDistance(start[0], start[1]);
          let cur_distance = this.getDistance(current[0], current[1]);

          let next_position = this.camera.localToWorld(
            new THREE.Vector3(0, 0, (pre_distance - cur_distance) * 100)
          );

          if (
            next_position.distanceTo(this.scene.position) < 80000 &&
            next_position.distanceTo(this.scene.position) > 20000
          ) {
            this.camera.position = next_position;
          }
        }
      }
      start = current;
    },
    touchend: function(e) {
      rotate = false;
      scale = false;
    },
    getDistance: function(pre, next) {
      let x = next.pageX - pre.pageX;
      let y = next.pageY - pre.pageY;
      return Math.sqrt(x * x + y * y);
    },
    getDelta: function(pre, next) {
      let x = next.pageX - pre.pageX;
      let y = next.pageY - pre.pageY;
      return { x: x, y: y };
    },
    dblclick: function(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);

      var intersects = raycaster.intersectObject(this.scene, true);

      if (intersects.length != 0) {
        if (!intersects[0].object.name.startsWith("bottom")) {
          return;
        }

        let point = intersects[0].point;
        target_position = point;
        target_position.y = point.y + mouse_height;
        target_ratio = 0;
        //this.camera.position.set(point.x,(point.y+mouse_height),point.z);
      }
    },
    click: function(e) {
      let nowTime = new Date().getTime();
      if (nowTime - lastClickTime < 400) {
        lastClickTime = 0;
        clickTimer && clearTimeout(clickTimer);
        this.dblclick(e);
      } else {
        lastClickTime = nowTime;
        clickTimer = setTimeout(() => {
          if (this.$props.mouseClick) {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, this.camera);

            var intersects = raycaster.intersectObject(
              this.frame_container,
              true
            );

            if (intersects.length != 0) {
              this.$props.mouseClick();
            }
          }
        }, 400);
      }
    },
    switch_camera: function() {
      overlook = !overlook;
      overlook_increment = { x: 0, y: 0 };
      rotate_increment = { x: 0, y: 0 };
      if (overlook) {
        if (top) {
          top.visible = false;
        }
        pre_euler.setFromQuaternion(this.camera.quaternion);
        pre_camera = this.camera.position;
        this.camera.position = new THREE.Vector3(0, 20000, 20000);
        this.camera.lookAt(this.scene.position);
      } else {
        if (top) {
          top.visible = true;
        }
        this.camera.quaternion.setFromEuler(pre_euler);
        this.camera.position = pre_camera;
      }
    },
    exhibition_floor: function(id, station) {
      if (floors_container.has(id)) {
        let floor = floors_container.get(id);
        floor.visible = station;
      }
    },
    exhibition_floors: function(station) {
      floors_container.forEach(function(child) {
        child.visibility = station;
      });
    },
  },
};
</script>

<style scoped>
#WebGL {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1000;
  border: 1px solid pink;
}
</style>
