
import * as Kalidokit from "../dist1";
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { VRM, VRMSchema, VRMUtils } from "@pixiv/three-vrm";

//let siarp_sw_import=true;

var gral_json_accion=null;
var gral_json_partesCuerpo=null;
var gral_json_coordenadas=null;
var gral_json_accion_id=0;
async function siarp_loadDataVMRCoor(id){
    //console.log(id);
    if(id<0) id=0;
    if(id>=gral_json_accion.data.length) return;
    //console.log(id);
    var ptr_coor=new scad_sysData("/siarp_acciones.json","POST",
	'{"opera":60,"date":0,"time":0,"id_accion":'+gral_json_accion.data[id][0]+'}',
	function(data){
		// console.log('hola aqqui 1',JSON.stringify(data));
		// console.log('hola aqqui 2',data);
        if(data.rc==0){
            if(gral_json_coordenadas==null){
                gral_json_coordenadas=data;
            }else{
                gral_json_coordenadas.data.push(data.data[0]);
            }
            //console.log(JSON.stringify(gral_json_coordenadas));
        }else{

        }
            
		
		}
	,null,null,null,null,null);
    ptr_coor.setSendType("json");
    ptr_coor.setReturnType("json");	
    ptr_coor.setSync(true);
    await ptr_coor.send(); 	
    siarp_loadDataVMRCoor(id+1);
}
async function siarp_loadDataVMR()
{
    gral_json_coordenadas=null;
    gral_json_accion_id=0;
	var ptr_acc=new scad_sysData("/siarp_acciones.json","POST",
	'{"opera":10,"date":0,"time":0}',
	function(data){
		//console.log(data);
		gral_json_accion=data;
		}
	,null,null,null,null,null);
    ptr_acc.setSendType("json");
	var ptr_part=new scad_sysData("/siarp_acciones.json","POST",
	'{"opera":20,"date":0,"time":0}',
	function(data){
		console.log('los datos de data',data);
		gral_json_partesCuerpo=data;
		}
	,null,null,null,null,null);
    ptr_part.setSendType("json");
	var ptr_coor=new scad_sysData("/siarp_acciones.json","POST",
	'{"opera":30,"date":0,"time":0}',
	function(data){
		//console.log(data);
		gral_json_coordenadas=data;
		}
	,null,null,null,null,null);
    ptr_part.setReturnType("json");	
    ptr_part.send(); 	
	ptr_acc.setReturnType("json");	
    ptr_acc.setSync(true);
    //console.log(gral_json_accion);
    await ptr_acc.send(); 	
    //console.log(gral_json_accion);
    siarp_loadDataVMRCoor(-1);
	//ptr_coor.setReturnType("json");	ptr_coor.send(); 	
		
	/*
	=body;
	=coor;*/
	       
}
// siarp_loadDataVMR();

async function init() {
    await siarp_loadDataVMR();
    // Resto de inicializaciones
}
init();
// //Import Helper Functions from Kalidokit

const clamp = Kalidokit.Utils.clamp;
const lerp = Kalidokit.Vector.lerp;

/* THREEJS WORLD SETUP */
let currentVrm;
    


// renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });

export function siarp_initDrawVRM()
{
const elemento = document.getElementById("cam_DashBody");

renderer.setSize(elemento.parentNode.clientWidth,elemento.parentNode.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
console.log('ele',elemento);
elemento.appendChild(renderer.domElement);
document.body.onresize = function(){
    var elemento = document.getElementById("cam_DashBody");
    renderer.setSize(elemento.parentNode.clientWidth,elemento.parentNode.clientHeight);
};
//siarp_sw_import=false;
}


export function siarp_initDrawVRM_pop()
{
const elemento = document.getElementById("cam_DashBody_pop");

renderer.setSize(elemento.parentNode.clientWidth,elemento.parentNode.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
console.log('9999999999999',elemento);
elemento.appendChild(renderer.domElement);
document.body.onresize = function(){
    var elemento = document.getElementById("cam_DashBody_pop");
    renderer.setSize(elemento.parentNode.clientWidth,elemento.parentNode.clientHeight);
};
//siarp_sw_import=false;
}




// camera
const orbitCamera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
orbitCamera.position.set(0.0, 1.5, 0.7);
console.log(orbitCamera);
console.log(orbitCamera.position);
//orbitCamera.scale.y=1.5;
// controls
const orbitControls = new OrbitControls(orbitCamera, renderer.domElement);
orbitControls.screenSpacePanning = true;
orbitControls.target.set(0.0, 1.48, 0.0);
orbitControls.update();

// scene
const scene = new THREE.Scene();

// light
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1.0, 1.0, 1.0).normalize();
scene.add(light);

// Main Render Loop
const clock = new THREE.Clock();
console.log(clock);
var gral_tm_mem=0;
var gral_tmLast_mem=0;
var gral_tm_interval=0;

function animate() {
    

	var start = new Date();
	var val_t=start.getTime();
	var rest_t=val_t - gral_tm_mem;
	//console.log("rest:"+rest_t + " inter:"+gral_tm_interval);
	
	if(rest_t>gral_tm_interval)
	{		
		if (currentVrm) {
			// Update model to render physics
			currentVrm.update(clock.getDelta());
		}
		renderer.render(scene, orbitCamera);
		
		gral_tm_mem=val_t;
		gral_tm_interval=(val_t-gral_tmLast_mem)*2;
		
	}	
	gral_tmLast_mem=val_t;
	if(gral_tm_interval>4000)gral_tm_interval=0;
	

   requestAnimationFrame(animate);
   
}
animate();


/*===========================================*/
var gral_cnt_inactividad=5;
var bool_posInit=true;
scad_sysLoop(()=>
{
	//console.log("bucle");
	gral_cnt_inactividad--;

    if(bool_posInit==true){
        if(gral_cnt_inactividad<0)
        {
            //console.log("lanza");
            gral_cnt_inactividad=5;
            siarp_posInitial();
            
        }
    }
}, 1000, null, true, null, null,document.body);
/*===========================================*/
export function siarp_getDataVRM()

{
     if (!currentVrm || !currentVrm.humanoid) return [];
	var bones_vrm=currentVrm.humanoid.humanBones;
	//console.log(bones_vrm);
	var part=gral_json_partesCuerpo.data;
	var rsp=[];
	var rspq=[];
	for(let i=0;i<part.length;i++)
	{
		if(part[i][2]==true)
		{
			//console.log(part[i][1]);
            //console.log(bones_vrm[part[i][1]][0]);
            if(bones_vrm[part[i][1]][0]==undefined) continue;
            //console.log(part[i][1]);
			//console.log(bones_vrm[part[i][1]][0].node.rotation);
			
			//console.log(part[i][1]+" :"+JSON.stringify([part[i][0],valx,valy,valz]));
			var rota=bones_vrm[part[i][1]][0].node.rotation;
			var qua=bones_vrm[part[i][1]][0].node.quaternion;
			
            var valx=rota._x.toFixed(6)*1;
            var valy=rota._y.toFixed(6)*1;
            var valz=rota._z.toFixed(6)*1;
			//rsp[rsp.length]=[part[i][0],valx,valy,valz];
			rsp[rsp.length]=[part[i][0],[valx+','+valy+','+valz]];
            var valxq=qua._x.toFixed(6)*1;
            var valyq=qua._y.toFixed(6)*1;
            var valzq=qua._z.toFixed(6)*1;
            var valwq=qua._w.toFixed(6)*1;

            /*var valxq=qua._x;
            var valyq=qua._y;
            var valzq=qua._z;
            var valwq=qua._w;*/

			//rsp[rsp.length]=[part[i][0],valxq,valyq,valzq,valwq];

		}
	}
	//console.log(JSON.stringify(rsp));
	//console.log(JSON.stringify(rspq));

	return rsp;
}
/*===========================================*/
export function siarp_getDataVRM2()
{
	var bones_vrm=currentVrm.humanoid.humanBones;
	//console.log(bones_vrm);
	var part=gral_json_partesCuerpo.data;
	var rsp=[];
	var rspq=[];
    var strx="";
    var stry="";
    var strz="";
	for(let i=0;i<part.length;i++)
	{
		if(part[i][2]==true)
		{
			//console.log(part[i][1]);
            //console.log(bones_vrm[part[i][1]][0]);
            if(bones_vrm[part[i][1]][0]==undefined) continue;
            //console.log(part[i][1]);
			//console.log(bones_vrm[part[i][1]][0].node.rotation);
			
			//console.log(part[i][1]+" :"+JSON.stringify([part[i][0],valx,valy,valz]));
			var rota=bones_vrm[part[i][1]][0].node.rotation;
			var qua=bones_vrm[part[i][1]][0].node.quaternion;
			//console.log(rota);
			//console.log(rota._x);
			//console.log(rota._y);
			//console.log(rota._z);
            var valx=parseFloat(rota._x).toFixed(6)*1;
            var valy=parseFloat(rota._y).toFixed(6)*1;
            var valz=parseFloat(rota._z).toFixed(6)*1;
			//rsp[rsp.length]=[part[i][0],valx,valy,valz];
           
            if(valx==0)strx=0;
            else strx=valx;

            if(valy==0)stry=0;
            else stry=valy;

            if(valz==0)strz=0;
            else strz=valz;

			rsp[rsp.length]=[part[i][0],[[strx,stry,strz]]];
            var valxq=qua._x.toFixed(6)*1;
            var valyq=qua._y.toFixed(6)*1;
            var valzq=qua._z.toFixed(6)*1;
            var valwq=qua._w.toFixed(6)*1;

            /*var valxq=qua._x;
            var valyq=qua._y;
            var valzq=qua._z;
            var valwq=qua._w;*/

			//rsp[rsp.length]=[part[i][0],valxq,valyq,valzq,valwq];

		}
	}
	//console.log(JSON.stringify(rsp));
	//console.log(JSON.stringify(rspq));

	return rsp;
}
/*===========================================*/
function siarp_setRotation(obj,x,y,z)
{
    if(obj==undefined) return;
    
	obj.node.rotation._x=x;
	obj.node.rotation._y=y;
	obj.node.rotation._z=z;
	obj.node.rotation._onChangeCallback();
    
}
function siarp_posInitial()
{
	//siarp_getDataVRM();	
    if (!currentVrm || !currentVrm.humanoid) {
        console.warn("Modelo VRM aún no cargado.");
        return;
    }
	//console.log(currentVrm);
	var bones_vrm=currentVrm.humanoid.humanBones;
   
    if(gral_json_partesCuerpo==null) return;
	var part=gral_json_partesCuerpo.data;
    //console.log(part);	
    //console.log(part[3][1]);	
	for(let i=0;i<part.length;i++)
	{
		if(part[i][2]==true)		
			siarp_setRotation(bones_vrm[part[i][1]][0],0,0,0);
		
	}
	siarp_setRotation(bones_vrm.neck[0],-0.3,0,0.2);
	siarp_setRotation(bones_vrm.rightUpperArm[0],0,0,-1.2);
	siarp_setRotation(bones_vrm.leftUpperArm[0],0,0,1.2);
	siarp_setRotation(bones_vrm.rightLowerArm[0],0,0.3,0);
	siarp_setRotation(bones_vrm.leftLowerArm[0],0,-1,-0.3);
	siarp_setRotation(bones_vrm.leftHand[0],0.5,0,-0.5);
	siarp_setRotation(bones_vrm.rightHand[0],0,0,-0.5);
	
}
/*===========================================*/

/* VRM CHARACTER SETUP */

// Import Character VRM
const loader = new GLTFLoader();
loader.crossOrigin = "anonymous";
// Import model from URL, add your own model here
//loader.load(
loader.load("./public/Ashtra.vrm",
//loader.load("model_file.binz",

    (gltf) => {
        VRMUtils.removeUnnecessaryJoints(gltf.scene);

        VRM.from(gltf).then((vrm) => {
            if (!vrm || !vrm.humanoid) {
                throw new Error('Modelo VRM inválido');
            }
            currentVrm = vrm;
            scene.add(vrm.scene);
            currentVrm = vrm;
            console.log(vrm);
            currentVrm.scene.position.y=0.4;
            currentVrm.scene.rotation.y = Math.PI; // Rotate model 180deg to face camera
			
			siarp_posInitial();
			
        }).catch((error) => {
            console.error('Error cargando VRM:', error);
        });
    },

    (progress) => console.log("Loading model...", 100.0 * (progress.loaded / progress.total), "%"),

    (error) => console.error(error)
);      
async function safeLoadVRMModel() {
    try {
        // Añade verificaciones exhaustivas
        const modelUrl = './public/Ashtra.vrm';
        
        if (!modelUrl) {
            console.error('URL del modelo no definida');
            return;
        }

        // Usa fetch con manejo de errores
        const response = await fetch(modelUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        
        // Añade validación adicional
        if (!blob || blob.size === 0) {
            console.error('Blob del modelo está vacío');
            return;
        }

        // Lógica de carga del modelo VRM
        const loader = new VRMLoader();
        loader.load(
            modelUrl, 
            (vrm) => {
                console.log('Modelo VRM cargado exitosamente');
                // Aquí puedes hacer lo que necesites con el modelo
            },
            (progress) => {
                console.log(`Cargando modelo: ${progress.loaded / progress.total * 100}%`);
            },
            (error) => {
                console.error('Error al cargar el modelo VRM:', error);
            }
        );

    } catch (error) {
        console.error('Error en la carga del modelo:', error);
    }
}
safeLoadVRMModel();
// Función de diagnóstico exhaustivo
function debugVRMLoading() {
    // Verifica importaciones
    console.log("Verificando librerías:");
    console.log("THREE disponible:", typeof THREE !== 'undefined');
    console.log("GLTFLoader disponible:", typeof GLTFLoader !== 'undefined');
    console.log("VRMLoader disponible:", typeof VRMLoader !== 'undefined');

    // Función de carga con múltiples verificaciones
    function safeLoadVRM(url) {
        return new Promise((resolve, reject) => {
            // Verifica URL
            if (!url) {
                reject(new Error("URL de modelo no proporcionada"));
                return;
            }

            // Log de intento de carga
            console.log(`Intentando cargar modelo desde: ${url}`);

            // Usa fetch primero para verificar la respuesta
            fetch(url)
                .then(response => {
                    console.log("Respuesta del servidor:", response);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.blob();
                })
                .then(blob => {
                    console.log("Blob recibido:", blob);
                    
                    // Lógica de carga del modelo
                    const loader = new THREE.GLTFLoader();
                    
                    loader.load(
                        url,
                        (gltf) => {
                            console.log("Modelo cargado exitosamente:", gltf);
                            resolve(gltf);
                        },
                        (progress) => {
                            console.log(`Progreso de carga: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
                        },
                        (error) => {
                            console.error("Error detallado de carga:", error);
                            reject(error);
                        }
                    );
                })
                .catch(error => {
                    console.error("Error en la solicitud inicial:", error);
                    reject(error);
                });
        });
    }

    // Ejemplo de uso
    const MODEL_URL = './public/Ashtra.vrm';
    safeLoadVRM(MODEL_URL)
        .then(model => {
            console.log("Modelo VRM cargado completamente:", model);
            // Aquí puedes añadir la lógica para usar el modelo
        })
        .catch(error => {
            console.error("Fallo en la carga del modelo:", error);
        });
}

// Llama a la función de diagnóstico
debugVRMLoading();
// Animate Rotation Helper function

// Evitar declaraciones múltiples
const initVRMLoaderModule = (function() {
    // Función interna de carga de script
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Función principal de carga de VRM
    async function initVRMLoader() {
        // URLs de CDN para las librerías
        const threeJsUrl = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        const gltfLoaderUrl = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
        const vrmLoaderUrl = 'https://unpkg.com/@pixiv/three-vrm@0.3.x/lib/three-vrm.js';

        try {
            // Cargar librerías de forma secuencial
            await loadScript(threeJsUrl);
            await loadScript(gltfLoaderUrl);
            await loadScript(vrmLoaderUrl);

            // Verificar que las librerías están cargadas
            if (!window.THREE || !window.THREE.GLTFLoader) {
                throw new Error('Librerías Three.js no cargadas correctamente');
            }

            // Función de carga de modelo VRM
            function loadVRMModel(url) {
                return new Promise((resolve, reject) => {
                    // Verificar que THREE esté disponible
                    if (!window.THREE) {
                        reject(new Error('Three.js no está disponible'));
                        return;
                    }

                    // Crear loader
                    const loader = new window.THREE.GLTFLoader();

                    // Intentar cargar el modelo
                    loader.load(
                        url,
                        (gltf) => {
                            console.log('Modelo cargado exitosamente', gltf);
                            resolve(gltf);
                        },
                        (xhr) => {
                            // Progreso de carga
                            console.log(`Cargando modelo: ${(xhr.loaded / xhr.total * 100).toFixed(2)}%`);
                        },
                        (error) => {
                            console.error('Error en la carga del modelo:', error);
                            reject(error);
                        }
                    );
                });
            }

            // Configuración de la escena
            function setupScene(model) {
                const scene = new window.THREE.Scene();
                const camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                const renderer = new window.THREE.WebGLRenderer();

                renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(renderer.domElement);

                // Añadir modelo a la escena
                scene.add(model.scene);

                // Posicionar cámara
                camera.position.z = 5;

                // Función de animación
                function animate() {
                    requestAnimationFrame(animate);
                    renderer.render(scene, camera);
                }
                animate();
            }

            // Cargar el modelo VRM específico
            const MODEL_URL = 'https://accomplished-art-production.up.railway.app/public/Ashtra.vrm';
            const model = await loadVRMModel(MODEL_URL);
            
            // Configurar escena
            setupScene(model);

        } catch (error) {
            console.error('Error en la inicialización del modelo VRM:', error);
        }
    }

    // Función de inicialización global
    function siarp_initDrawVRM() {
        try {
            initVRMLoader();
        } catch (error) {
            console.error('Error en siarp_initDrawVRM:', error);
        }
    }

    // Retornar función para ser exportada
    return {
        siarp_initDrawVRM
    };
})();

// Exportar la función de manera segura
export const { siarp_initDrawVRM } = initVRMLoaderModule;
function detailedVRMLoader(url) {
    return new Promise((resolve, reject) => {
        // Verificaciones de librerías
        console.log("Verificación de librerías:");
        console.log("THREE disponible:", !!THREE);
        console.log("GLTFLoader disponible:", !!GLTFLoader);
        console.log("VRMLoaderPlugin disponible:", !!VRMLoaderPlugin);

        // Verificar que las clases necesarias estén definidas
        if (!THREE || !GLTFLoader) {
            reject(new Error("Three.js o GLTFLoader no están correctamente importados"));
            return;
        }

        // Crear loader de GLTF
        const loader = new GLTFLoader();

        // Añadir plugin VRM si está disponible
        if (VRMLoaderPlugin) {
            loader.register((parser) => new VRMLoaderPlugin(parser));
        }

        // Cargar modelo
        loader.load(
            url,
            (gltf) => {
                console.log("Modelo cargado exitosamente:", gltf);
                
                // Verificaciones adicionales
                if (gltf.userData && gltf.userData.vrm) {
                    console.log("Datos VRM encontrados:", gltf.userData.vrm);
                    resolve(gltf);
                } else {
                    console.warn("Modelo cargado, pero sin datos VRM específicos");
                    resolve(gltf);
                }
            },
            (progress) => {
                console.log(`Progreso de carga: ${(progress.loaded / progress.total * 100).toFixed(2)}%`);
            },
            (error) => {
                console.error("Error detallado de carga:", error);
                reject(error);
            }
        );
    });
}

// Función de inicialización
async function initializeVRMModel() {
    const MODEL_URL = 'https://accomplished-art-production.up.railway.app/public/Ashtra.vrm';
    
    try {
        console.log("Iniciando carga del modelo VRM");
        const model = await detailedVRMLoader(MODEL_URL);
        console.log("Modelo VRM cargado completamente:", model);
        
        // Aquí puedes añadir lógica adicional para usar el modelo
    } catch (error) {
        console.error("Error en la inicialización del modelo VRM:", error);
    }
}

// Ejecutar inicialización
initializeVRMModel();
const rigRotation = (name, rotation = { x: 0, y: 0, z: 0 }, dampener = 1, lerpAmount = 0.3) => {
    if (!currentVrm) {
        return;
    }
    //console.log(VRMSchema.HumanoidBoneName[name]);
    const Part = currentVrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName[name]);
    //console.log(Part);
    if (!Part) {
        return;
    }
    Part.rotation._x=rotation.x;
	Part.rotation._y=rotation.y;
	Part.rotation._z=rotation.z;
	Part.rotation._onChangeCallback();
    /*
    let euler = new THREE.Euler(rotation.x * dampener, rotation.y * dampener, rotation.z * dampener);
    let quaternion = new THREE.Quaternion().setFromEuler(euler);
    Part.quaternion.slerp(quaternion, lerpAmount); // interpolate*/
};

// Animate Position Helper Function
const rigPosition = (name, position = { x: 0, y: 0, z:0 }, dampener = 1, lerpAmount = 0.3) => {
    if (!currentVrm) {
        return;
    }
    const Part = currentVrm.humanoid.getBoneNode(VRMSchema.HumanoidBoneName[name]);
    if (!Part) {
        return;
    }
    let vector = new THREE.Vector3(position.x * dampener, position.y * dampener, position.z * dampener);
    Part.position.lerp(vector, lerpAmount); // interpolate
};

let oldLookTarget = new THREE.Euler();
const rigFace = (riggedFace) => {
    if (!currentVrm) {
        return;
    }
    rigRotation("Neck", riggedFace.head, 0.7);

    // Blendshapes and Preset Name Schema
    const Blendshape = currentVrm.blendShapeProxy;
    const PresetName = VRMSchema.BlendShapePresetName;

    // Simple example without winking. Interpolate based on old blendshape, then stabilize blink with `Kalidokit` helper function.
    // for VRM, 1 is closed, 0 is open.
    riggedFace.eye.l = lerp(clamp(1 - riggedFace.eye.l, 0, 1), Blendshape.getValue(PresetName.Blink), 0.5);
    riggedFace.eye.r = lerp(clamp(1 - riggedFace.eye.r, 0, 1), Blendshape.getValue(PresetName.Blink), 0.5);
    riggedFace.eye = Kalidokit.Face.stabilizeBlink(riggedFace.eye, riggedFace.head.y);
    Blendshape.setValue(PresetName.Blink, riggedFace.eye.l);

    // Interpolate and set mouth blendshapes
    Blendshape.setValue(PresetName.I, lerp(riggedFace.mouth.shape.I, Blendshape.getValue(PresetName.I), 0.5));
    Blendshape.setValue(PresetName.A, lerp(riggedFace.mouth.shape.A, Blendshape.getValue(PresetName.A), 0.5));
    Blendshape.setValue(PresetName.E, lerp(riggedFace.mouth.shape.E, Blendshape.getValue(PresetName.E), 0.5));
    Blendshape.setValue(PresetName.O, lerp(riggedFace.mouth.shape.O, Blendshape.getValue(PresetName.O), 0.5));
    Blendshape.setValue(PresetName.U, lerp(riggedFace.mouth.shape.U, Blendshape.getValue(PresetName.U), 0.5));

    //PUPILS
    //interpolate pupil and keep a copy of the value
    let lookTarget = new THREE.Euler(
        lerp(oldLookTarget.x, riggedFace.pupil.y, 0.4),
        lerp(oldLookTarget.y, riggedFace.pupil.x, 0.4),
        0,
        "XYZ"
    );
    oldLookTarget.copy(lookTarget);
    currentVrm.lookAt.applyer.lookAt(lookTarget);
};

/* VRM Character Animator */
const animateVRM = (vrm, results) => {
	gral_cnt_inactividad=5;
    if (!vrm) {
        return;
    }
    // Take the results from `Holistic` and animate character based on its Face, Pose, and Hand Keypoints.
    let riggedPose, riggedLeftHand, riggedRightHand, riggedFace;

    const faceLandmarks = results.faceLandmarks;
    // Pose 3D Landmarks are with respect to Hip distance in meters
    const pose3DLandmarks = results.ea;
    // Pose 2D landmarks are with respect to videoWidth and videoHeight
    const pose2DLandmarks = results.poseLandmarks;
    // Be careful, hand landmarks may be reversed
    const leftHandLandmarks = results.rightHandLandmarks;
    const rightHandLandmarks = results.leftHandLandmarks;

    // Animate Face
    if (faceLandmarks) {
        riggedFace = Kalidokit.Face.solve(faceLandmarks, {
            runtime: "mediapipe",
            video: videoElement,
        });
        rigFace(riggedFace);
    }

    // Animate Pose
    if (pose2DLandmarks && pose3DLandmarks) {
        riggedPose = Kalidokit.Pose.solve(pose3DLandmarks, pose2DLandmarks, {
            runtime: "mediapipe",
            video: videoElement,
        });
        //rigRotation("Hips", riggedPose.Hips.rotation, 0.7);
        /*rigPosition(
            "Hips",
            {
                x: -riggedPose.Hips.worldPosition.x, // Reverse direction
                y: riggedPose.Hips.worldPosition.y + 1, // Add a bit of height
                z: -riggedPose.Hips.worldPosition.z, // Reverse direction
            },
            1,
            0.07
        );*/
        //console.log("Hips");

        //rigRotation("Chest", riggedPose.Spine, 0.25, 0.3);
        //rigRotation("Spine", riggedPose.Spine, 0.45, 0.3);

        //console.log("Spine", riggedPose.Spine, 0.45, 0.3);

        rigRotation("RightUpperArm", riggedPose.RightUpperArm, 1, 0.3);
        rigRotation("RightLowerArm", riggedPose.RightLowerArm, 1, 0.3);
        rigRotation("LeftUpperArm", riggedPose.LeftUpperArm, 1, 0.3);
        rigRotation("LeftLowerArm", riggedPose.LeftLowerArm, 1, 0.3);

        /*rigRotation("LeftUpperLeg", riggedPose.LeftUpperLeg, 1, 0.3);
        rigRotation("LeftLowerLeg", riggedPose.LeftLowerLeg, 1, 0.3);
        rigRotation("RightUpperLeg", riggedPose.RightUpperLeg, 1, 0.3);
        rigRotation("RightLowerLeg", riggedPose.RightLowerLeg, 1, 0.3);*/
    }

    // Animate Hands
    if (leftHandLandmarks) {
        riggedLeftHand = Kalidokit.Hand.solve(leftHandLandmarks, "Left");
        rigRotation("LeftHand", {
            // Combine pose rotation Z and hand rotation X Y
            z: riggedPose.LeftHand.z,
            y: riggedLeftHand.LeftWrist.y,
            x: riggedLeftHand.LeftWrist.x,
        });
        rigRotation("LeftRingProximal", riggedLeftHand.LeftRingProximal);
        rigRotation("LeftRingIntermediate", riggedLeftHand.LeftRingIntermediate);
        rigRotation("LeftRingDistal", riggedLeftHand.LeftRingDistal);
        rigRotation("LeftIndexProximal", riggedLeftHand.LeftIndexProximal);
        rigRotation("LeftIndexIntermediate", riggedLeftHand.LeftIndexIntermediate);
        rigRotation("LeftIndexDistal", riggedLeftHand.LeftIndexDistal);
        rigRotation("LeftMiddleProximal", riggedLeftHand.LeftMiddleProximal);
        rigRotation("LeftMiddleIntermediate", riggedLeftHand.LeftMiddleIntermediate);
        rigRotation("LeftMiddleDistal", riggedLeftHand.LeftMiddleDistal);
        rigRotation("LeftThumbProximal", riggedLeftHand.LeftThumbProximal);
        rigRotation("LeftThumbIntermediate", riggedLeftHand.LeftThumbIntermediate);
        rigRotation("LeftThumbDistal", riggedLeftHand.LeftThumbDistal);
        rigRotation("LeftLittleProximal", riggedLeftHand.LeftLittleProximal);
        rigRotation("LeftLittleIntermediate", riggedLeftHand.LeftLittleIntermediate);
        rigRotation("LeftLittleDistal", riggedLeftHand.LeftLittleDistal);
    }
    if (rightHandLandmarks) {
        riggedRightHand = Kalidokit.Hand.solve(rightHandLandmarks, "Right");
        rigRotation("RightHand", {
            // Combine Z axis from pose hand and X/Y axis from hand wrist rotation
            z: riggedPose.RightHand.z,
            y: riggedRightHand.RightWrist.y,
            x: riggedRightHand.RightWrist.x,
        });
        rigRotation("RightRingProximal", riggedRightHand.RightRingProximal);
        rigRotation("RightRingIntermediate", riggedRightHand.RightRingIntermediate);
        rigRotation("RightRingDistal", riggedRightHand.RightRingDistal);
        rigRotation("RightIndexProximal", riggedRightHand.RightIndexProximal);
        rigRotation("RightIndexIntermediate", riggedRightHand.RightIndexIntermediate);
        rigRotation("RightIndexDistal", riggedRightHand.RightIndexDistal);
        rigRotation("RightMiddleProximal", riggedRightHand.RightMiddleProximal);
        rigRotation("RightMiddleIntermediate", riggedRightHand.RightMiddleIntermediate);
        rigRotation("RightMiddleDistal", riggedRightHand.RightMiddleDistal);
        rigRotation("RightThumbProximal", riggedRightHand.RightThumbProximal);
        rigRotation("RightThumbIntermediate", riggedRightHand.RightThumbIntermediate);
        rigRotation("RightThumbDistal", riggedRightHand.RightThumbDistal);
        rigRotation("RightLittleProximal", riggedRightHand.RightLittleProximal);
        rigRotation("RightLittleIntermediate", riggedRightHand.RightLittleIntermediate);
        rigRotation("RightLittleDistal", riggedRightHand.RightLittleDistal);
    }
};

console.log(animateVRM);

/* SETUP MEDIAPIPE HOLISTIC INSTANCE */
//let videoElement = document.querySelector(".input_video"),
//    guideCanvas = document.querySelector("canvas.guides");
let videoElement = document.getElementById("video01");
let guideCanvas = document.getElementById("canvas02");

const onResults = (results) => {
    // Draw landmark guides
    drawResults(results);
    // Animate model
    animateVRM(currentVrm, results);
};

const holistic = new Holistic({
    locateFile: (file) => {
        //return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.5.1635989137/${file}`;
        return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@`+ `${holistic.VERSION}/${file}`;
    },
});

holistic.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
    refineFaceLandmarks: true,
});
// Pass holistic a callback function
holistic.onResults(onResults);

const drawResults = (results) => {
    guideCanvas.width = videoElement.videoWidth;
    guideCanvas.height = videoElement.videoHeight;
    let canvasCtx = guideCanvas.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, guideCanvas.width, guideCanvas.height);
    // Use `Mediapipe` drawing functions
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: "#00cff7",
        lineWidth: 4,
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: "#ff0364",
        lineWidth: 2,
    });
    drawConnectors(canvasCtx, results.faceLandmarks, FACEMESH_TESSELATION, {
        color: "#C0C0C070",
        lineWidth: 1,
    });
    if (results.faceLandmarks && results.faceLandmarks.length === 478) {
        //draw pupils
        drawLandmarks(canvasCtx, [results.faceLandmarks[468], results.faceLandmarks[468 + 5]], {
            color: "#ffe603",
            lineWidth: 2,
        });
    }
    drawConnectors(canvasCtx, results.leftHandLandmarks, HAND_CONNECTIONS, {
        color: "#eb1064",
        lineWidth: 5,
    });
    drawLandmarks(canvasCtx, results.leftHandLandmarks, {
        color: "#00cff7",
        lineWidth: 2,
    });
    drawConnectors(canvasCtx, results.rightHandLandmarks, HAND_CONNECTIONS, {
        color: "#22c3e3",
        lineWidth: 5,
    });
    drawLandmarks(canvasCtx, results.rightHandLandmarks, {
        color: "#ff0364",
        lineWidth: 2,
    });
};

// Use `Mediapipe` utils to get camera - lower resolution = higher fps
const camera = null;
/*new Camera(videoElement, {
    onFrame: async () => {
        await holistic.send({ image: videoElement });
    },
    width: 640,
    height: 480,
});*/
export function siarp_camPowerOff()
{
console.log(videoElement);
if(videoElement!=null)
 videoElement.srcObject.getTracks()[0].stop()
}
export function siarp_camPowerOn()
{
videoElement = document.getElementById("video01");
guideCanvas = document.getElementById("canvas02");

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await holistic.send({ image: videoElement });
    },
    width: 640,
    height: 480,
});

if(videoElement!=null)
camera.start();
console.log(camera);
}
//insert_camOn(power_on_cam);
//insert_camOff(power_off_cam);

export function siarp_audioPause(){if (annyang)annyang.pause();}
export function siarp_audioResume(){if (annyang)annyang.resume();}
export function siarp_audioStart() {
	
    if (annyang) {
        annyang.setLanguage("es")
        annyang.start({ autoRestart: true, continuous: false }); 
        console.log(annyang);
        console.log("Listening...")
        //annyang.addCommands(comandos);
        //annyang.addCommands(cmdAudio);
        annyang.debug()
        //document.getElementById("btn").style.display = "none"   
}

//siarp_audioPause();
//siarp_audioResume();

}


let bandera = false;

annyang.addCallback('soundstart', function (a,b) {
        
    console.log("sound detected");
        
});

/*==================================================*/
function siarp_getPartBody(id)
{
	var dat_part=gral_json_partesCuerpo.data;
	for(let i=0; i< dat_part.length;i++)
	{
		if(id==dat_part[i][0])
		{
			
			if(dat_part[i][2]==true)	
				return dat_part[i][1];
			else
				return null;
		}
		
	}
}
/*==================================================*/
export async function siarp_moveVRM(id)
{
    gral_cnt_inactividad=5;
	var dat_coor=gral_json_coordenadas.data;
   console.log(JSON.stringify(dat_coor))
    
    for(let k=0;k<dat_coor.length;k++)
	{
        if(!Array.isArray(dat_coor[k][1][0][1])){
            for(let i=0;i<dat_coor[k][1].length;i++)
            {
                dat_coor[k][1][i][1]=JSON.parse(dat_coor[k][1][i][1]);
            }
        }

        if(dat_coor[k][0]==id)
		{
            var list_coor=dat_coor[k][1];
            for(let j=0;j<list_coor[0][1].length;j++)
            {
                var manipu;
                for(let i=0;i<list_coor.length;i++)
                {
                    var name_part=siarp_getPartBody(list_coor[i][0]);
                    manipu=currentVrm.humanoid.humanBones[name_part];
                   
                    if(name_part!=null)
                    {
                        
                        manipu[0].node.rotation._x=list_coor[i][1][j][0];
                        manipu[0].node.rotation._y=list_coor[i][1][j][1];
                        manipu[0].node.rotation._z=list_coor[i][1][j][2]; 
                    }
                    manipu[0].node.rotation._onChangeCallback(); 
                }
                
                await new Promise(resolve => setTimeout(resolve, 200)); 
                
            }
        }
       
    }
    
return;
	
}
/*==================================================*/
annyang.addCallback('result', async function (data) {
    console.log('sound stopped');
    var comp_bool = true;
	if(data!=undefined)
	{
		//console.log(data);
		var val_dat=gral_json_accion.data
		for(let i=0;i<val_dat.length;i++)
		{
			for(let j=0;j<data.length;j++)
			{
              
				if(data[j].toUpperCase().trim()===val_dat[i][1].toUpperCase().trim())
				{
                    comp_bool=true;
                    if(document.getElementById("scad_conteWord")){
                        await animacion_desvanecer(document.getElementById("scad_conteWord"),1000);
                    }
                    var conteWord=new scad_ctrlPanel(document.getElementById("cam_DashBody"),"scad_conteWord","scad_conteWord");
                    var conteWordImg=new scad_ctrlPanel(conteWord.getHandler(),"scad_conteWordImg","scad_conteWordImg");
                    conteWordImg.addImagePanel("scad/assets/img/scad_demoRegister/microf.png","1")
                    conteWord.addTextPanel('<b>'+data[j]+'</b>');
                    
					gral_cnt_inactividad=5;				
					siarp_moveVRM(val_dat[i][0]);					
					//console.log("encontrado");
					siarp_voz(val_dat[i][2]);
                    
					i=val_dat.length;
                    await new Promise(resolve => setTimeout(resolve, 4000)); 
                    await animacion_desvanecer(conteWord.getHandler(),1000);
                    break;
					
				}else{
                    comp_bool=false;
                    break;
                }
			}
		}
	}
    if(comp_bool==false)
    {
        if(document.getElementById("scad_conteWord")){
            await animacion_desvanecer(document.getElementById("scad_conteWord"),1000);
        }
        var conteWord=new scad_ctrlPanel(document.getElementById("cam_DashBody"),"scad_conteWord","scad_conteWord");
        //var conteWordImg=new scad_ctrlPanel(conteWord.getHandler(),"scad_conteWordImg","scad_conteWordImg");
        //conteWordImg.addImagePanel("scad/assets/img/scad_demoRegister/microf.png","1")
        conteWord.addTextPanel('Acción no registrada');
        conteWord.getHandler().style.color = "red";
        await new Promise(resolve => setTimeout(resolve, 4000)); 
        await animacion_desvanecer(conteWord.getHandler(),1000);
    }
});
export async function animacion_desvanecer(parent,time)
{
    //console.log(parent);
    let time_ani=time/1000;
    parent.style.transition = "all "+time_ani+"s"; 
    parent.style.opacity = "0";
    await new Promise(resolve => setTimeout(resolve, time)); 
    parent.remove();
};

const voiceschanged = () => {
  console.log(`Voices #: ${speechSynthesis.getVoices().length}`)
  speechSynthesis.getVoices().forEach(voice => {
    console.log(voice.name, voice.lang)
  })
}
speechSynthesis.onvoiceschanged = voiceschanged;

export function siarp_voz(texto) {
	if(!texto) return;
	if(texto.length<1) return;
	siarp_audioPause();
//
    //document.getElementById("all2").style.visibility = "hidden";
    var textoAEscuchar = texto;
    console.log(textoAEscuchar);
    var mensaje = new SpeechSynthesisUtterance();
	//console.log( window.speechSynthesis.getVoices());
	//console.log( window.speechSynthesis.getVoices());
	var voces=window.speechSynthesis.getVoices();
	console.log(mensaje);
    mensaje.text = textoAEscuchar;
    mensaje.volume = 1;
    mensaje.rate = 1;// 0.9;
    mensaje.pitch = 1;
    mensaje.voice  = voces[1];
    // ¡Parla!
    //document.getElementById("all").style.visibility = "visible";
   
    speechSynthesis.speak(mensaje);
	siarp_audioResume();
}
/*================*/
export function siarp_setMovCoor(coor){
    var manipu;
    bool_posInit=false;
    for(let i=0;i<coor.length;i++)
    {
        var name_part=siarp_getPartBody(coor[i][0]);
        manipu=currentVrm.humanoid.humanBones[name_part];
    
        if(name_part!=null)
        {
            
            manipu[0].node.rotation._x=coor[i][1][0][0];
            manipu[0].node.rotation._y=coor[i][1][0][1];
            manipu[0].node.rotation._z=coor[i][1][0][2]; 
            manipu[0].node.rotation._onChangeCallback(); 
        }
        //manipu[0].node.rotation._onChangeCallback(); 
    }
    //gral_cnt_inactividad=10000000000000000; 
}
/*===========================================*/
export async function siarp_setRotationPart(id,x,y,z)
{
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    var bones_vrm=currentVrm.humanoid.humanBones;
    //console.log(gral_json_partesCuerpo);
    if(gral_json_partesCuerpo==null) return;
	var part=gral_json_partesCuerpo.data;
    
    for (let index = 0; index < part.length; index++) {
      
        if(part[index][0]===id){
        //console.log(part[index][1]);
        siarp_setRotation(bones_vrm[part[index][1]][0],x,y,z);
        }
       
    }
    //siarp_setRotation(bones_vrm[part[i][1]][0],0,0,0);
    
}