import "frida-il2cpp-bridge"
import * as asb from "./dcmlassets.js";
import * as fs from "frida-fs";


Il2Cpp.perform(() => {
    var customCars: any[] = [];

    var customCarIdx = 0;

    var il2cpp = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    var unitycor = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;

    var unityui = Il2Cpp.domain.assembly("UnityEngine.UI").image;

    var abloadfromfile = new NativeFunction(Il2Cpp.api.resolveInternalCall(Memory.allocUtf8String("UnityEngine.AssetBundle::LoadFromFile_Internal(System.String,System.UInt32,System.UInt64)")), "pointer", ["pointer", "uint32", "uint64"]);
    var abloadasset = new NativeFunction(Il2Cpp.api.resolveInternalCall(Memory.allocUtf8String("UnityEngine.AssetBundle::LoadAsset_Internal(System.String,System.Type)")), "pointer", ["pointer", "pointer", "pointer"]);

    var assetBundle: NativePointer | null = null;

    var demoManager = il2cpp.class("DemoManager");

    var gameobject = unitycor.class("UnityEngine.GameObject");
    var find = gameobject.method<Il2Cpp.Object>("Find");

    function PlayButtonSound() {
        find.invoke(Il2Cpp.string("Demo manager"))
            .method<Il2Cpp.Object>("GetComponent", 0).inflate(demoManager).invoke()
            .field<Il2Cpp.Object>("ButtonSound").value.method("Play", 0).invoke();
    }


    function EditMainMenu() {
        var text = unityui.class("UnityEngine.UI.Text");
        var vertxt = find.invoke(Il2Cpp.string("Version"));
        console.log(vertxt);
        var vertxtcmp = vertxt.method<Il2Cpp.Object>("GetComponent", 0).inflate(text).invoke();
        console.log(vertxtcmp);
        var vertxt_txtget = vertxtcmp.method<Il2Cpp.String>("get_text");
        var vertxt_txtset = vertxtcmp.method("set_text");

        vertxt_txtset.invoke(Il2Cpp.string(vertxt_txtget.invoke().content + "-mod"));
        var vertxt_fontSizeget = vertxtcmp.method<number>("get_fontSize");
        var vertxt_fontSizeset = vertxtcmp.method("set_fontSize");

        vertxt_fontSizeset.invoke(vertxt_fontSizeget.invoke() - 5);

        var fj = find.invoke(Il2Cpp.string("FreeJunag"));

        console.log("FJ: " + fj);

        var uo = unitycor.class("UnityEngine.Object");
        var instantiate2 = uo.method<Il2Cpp.Object>("Instantiate", 2);
        var instantiate1 = uo.method<Il2Cpp.Object>("Instantiate", 1);
        var destroy = uo.method("Destroy", 1);


        // Write DCML Alert
        var child = fj.method<Il2Cpp.Object>("GetComponentInChildren", 0).inflate(text).invoke();
        var child_ = child.method<Il2Cpp.Object>("get_gameObject").invoke();
        var trans = fj.method<Il2Cpp.Object>("get_transform").invoke();
        var parent = trans.method<Il2Cpp.Object>("get_parent").invoke()

        var datxt = instantiate2.inflate(gameobject).invoke(child_, parent);

        var localize = il2cpp.class("I2.Loc.Localize");

        destroy.invoke(datxt.method<Il2Cpp.Object>("GetComponent", 0).inflate(localize).invoke());

        var vec3 = unitycor.class("UnityEngine.Vector3");
        var npos = vec3.alloc();
        npos.method(".ctor", 3).invoke(0, 320, 0);

        datxt.method<Il2Cpp.Object>("get_transform").invoke().method("set_localPosition").invoke(npos.unbox());

        var vec2 = unitycor.class("UnityEngine.Vector2");
        var nsize = vec2.alloc();
        var recttrans = unitycor.class("UnityEngine.RectTransform");
        nsize.method(".ctor", 2).invoke(640, 200);
        datxt.method<Il2Cpp.Object>("GetComponent", 0).inflate(recttrans).invoke().method("set_sizeDelta").invoke(nsize.unbox());
        datxt.method<Il2Cpp.Object>("GetComponent", 0).inflate(text).invoke().method("set_text").invoke(Il2Cpp.string("DCML version 0.0.1"));

        var outline = unityui.class("UnityEngine.UI.Outline");
        var lineout = datxt.method<Il2Cpp.Object>("AddComponent", 0).inflate(outline).invoke();
        var color = unitycor.class("UnityEngine.Color");
        lineout.method("set_effectColor").invoke(color.method<Il2Cpp.ValueType>("get_black").invoke());
        var ndist = vec2.alloc();
        ndist.method(".ctor", 2).invoke(2, 2);
        lineout.method("set_effectDistance").invoke(ndist.unbox());

        // Create Button

        var mpbtn = find.invoke(Il2Cpp.string("MultiPlay"));



        var setBtn = instantiate2.inflate(gameobject).invoke(fj, fj.method<Il2Cpp.Object>("get_transform").invoke().method<Il2Cpp.Object>("get_parent").invoke());
        setBtn.method("set_name").invoke(Il2Cpp.string("DCMLSettings"));
        // button width: 250, height: 90, spacing: 35

        /*var sPosOff = vec3.alloc();
        sPosOff.method(".ctor", 2).invoke(575, 125);*/

        var setBtnTrans = setBtn.method<Il2Cpp.Object>("get_transform").invoke();

        //setBtnTrans.method("set_localPosition").invoke(vec3.method<Il2Cpp.ValueType>("op_Addition").invoke(setBtnTrans.method<Il2Cpp.ValueType>("get_localPosition").invoke(), sPosOff.unbox()));

        setBtnTrans.method("set_localPosition").invoke(mpbtn.method<Il2Cpp.Object>("get_transform").invoke().method<Il2Cpp.ValueType>("get_localPosition").invoke());

        destroy.invoke(mpbtn);

        var setBtnTxt = setBtn.method<Il2Cpp.Object>("GetComponentInChildren", 0).inflate(text).invoke();

        destroy.invoke(setBtnTxt.method<Il2Cpp.Object>("GetComponent", 0).inflate(localize).invoke());

        setBtnTxt.method("set_text").invoke(Il2Cpp.string("DCML Settings"));

        var button = unityui.class("UnityEngine.UI.Button");
        var setbuttoncmp = setBtn.method<Il2Cpp.Object>("GetComponent", 0).inflate(button).invoke();

        setbuttoncmp.method<Il2Cpp.Object>("get_onClick").invoke().field<Il2Cpp.Object>("m_PersistentCalls").value.field<Il2Cpp.Object>("m_Calls").value.method("Clear").invoke();


        var unityaction = unitycor.class("UnityEngine.Events.UnityAction");

        console.log("Loading Menu");
        console.log(assetBundle);
        var mnu = abloadasset(assetBundle as NativePointerValue, Il2Cpp.string("ModSettingsMenu"), Il2Cpp.domain.assembly("mscorlib").image.class("System.Type").method<Il2Cpp.Object>("GetType", 1).invoke(Il2Cpp.string("UnityEngine.GameObject")));
        console.log("Menu Loaded! Instantiate..");
        // load menu
        var menu = instantiate1.invoke(new Il2Cpp.Object(mnu));
        console.log(menu);

        var menutransform = menu.method<Il2Cpp.Object>("get_transform").invoke();





        menu.method("SetActive").invoke(false);

        var s1 = menutransform.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("s1"));
        var s2 = menutransform.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("s2"));

        s1.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("closemodsettings"))
            .method<Il2Cpp.Object>("GetComponent", 0).inflate(button).invoke()
            .method<Il2Cpp.Object>("get_onClick").invoke()
            .method("AddListener").invoke(Il2Cpp.delegate(unityaction, () => {
                menu.method("SetActive").invoke(false);
            }));

        setbuttoncmp.method<Il2Cpp.Object>("get_onClick").invoke()
            .method("AddListener").invoke(Il2Cpp.delegate(unityaction, () => {
                PlayButtonSound();

                menu.method("SetActive").invoke(true);

                s1.method<Il2Cpp.Object>("get_gameObject").invoke()
                    .method("SetActive").invoke(true);

                s2.method<Il2Cpp.Object>("get_gameObject").invoke()
                    .method("SetActive").invoke(false);
            }));

        s1.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("btns"))
            .method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("customvehicle"))
            .method<Il2Cpp.Object>("GetComponent", 0).inflate(button).invoke()
            .method<Il2Cpp.Object>("get_onClick").invoke()
            .method("AddListener").invoke(Il2Cpp.delegate(unityaction, () => {
                PlayButtonSound();

                menutransform.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("s1"))
                    .method<Il2Cpp.Object>("get_gameObject").invoke()
                    .method("SetActive").invoke(false);

                menutransform.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("s2"))
                    .method<Il2Cpp.Object>("get_gameObject").invoke()
                    .method("SetActive").invoke(true);
            }));

        s2.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("select"))
            .method<Il2Cpp.Object>("GetComponent", 0).inflate(button).invoke()
            .method<Il2Cpp.Object>("get_onClick").invoke()
            .method("AddListener").invoke(Il2Cpp.delegate(unityaction, () => {
                PlayButtonSound();

                menutransform.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("s1"))
                    .method<Il2Cpp.Object>("get_gameObject").invoke()
                    .method("SetActive").invoke(true);

                menutransform.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("s2"))
                    .method<Il2Cpp.Object>("get_gameObject").invoke()
                    .method("SetActive").invoke(false);

            }));



        console.log("Main Menu Edited!");
    }

    var start = il2cpp.class("DemoManager").method("Start");

    // Patch Start
    //@ts-ignore
    start.implementation = function (this: Il2Cpp.Object) {
        console.log("Call Original");
        var org = this.method("Start").invoke();
        console.log("Called");
        if (assetBundle == null) {
            fs.writeFileSync(Il2Cpp.application.dataPath + "/dcmlassets", new DataView(new Int8Array(asb.dcmlassets).buffer));
            assetBundle = abloadfromfile(Il2Cpp.string(Il2Cpp.application.dataPath + "/dcmlassets"), 0, 0);
            console.log("assetbundle loaded");
        }
        EditMainMenu();
    };

    //@ts-ignore
    il2cpp.class("CarControleScriptAndroid").method("Start")
        .implementation = function (this: Il2Cpp.Object) {
            if (customCarIdx == 0) return;
            
            // 필요한 Unity 클래스 및 메서드를 가져옵니다.
            const UnityEngine_PlayerPrefs = unitycor.class("UnityEngine.PlayerPrefs");
            const UnityEngine_Object = unitycor.class("UnityEngine.Object");
            const UnityEngine_Transform = unitycor.class("UnityEngine.Transform");
            const RHC_HovercraftController = il2cpp.class("RHC_HovercraftController");

            // PlayerPrefs.SetInt("carnum", 0) 및 PlayerPrefs.Save()
            UnityEngine_PlayerPrefs.method("SetInt").invoke(Il2Cpp.string("carnum"), 0);
            UnityEngine_PlayerPrefs.method("Save").invoke();

            // __instance의 transform을 가져옵니다.
            const __instance = this;
            const _c = __instance.method<Il2Cpp.Object>("get_transform").invoke();

            // __instance.GetComponent<RHC_HovercraftController>().enabled = false
            const hovercraftController = __instance.method<Il2Cpp.Object>("GetComponent", 0).inflate(RHC_HovercraftController).invoke();
            hovercraftController.method("set_enabled").invoke(false);

            // customCars[customCarIdx - 1]에서 car prefab을 로드하고 Instantiate합니다.

            const customCarPrefab = customCars[customCarIdx - 1].ab.method("LoadAsset", 1).inflate(gameobject).invoke("CustomCar");
            const cc = UnityEngine_Object.method<Il2Cpp.Object>("Instantiate").invoke(customCarPrefab);

            // cc의 모든 자식 Transform의 layer 값을 11로 설정
            for (var transfor of cc.method<Il2Cpp.Array<Il2Cpp.Object>>("GetComponentsInChildren", 0).inflate(UnityEngine_Transform).invoke()) {
                transfor.method<Il2Cpp.Object>("get_gameObject").invoke().method<Il2Cpp.Object>("set_layer").invoke(11);
            }

            // WheelColliders 및 Accent 하위 오브젝트 찾기
            const wcs = _c.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("WheelColliders"));
            const awc = wcs.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("0_Accent"));
            for (var child of awc.method<Il2Cpp.Array<Il2Cpp.Object>>("GetComponentsInChildren", 0).inflate(UnityEngine_Transform).invoke()) {
                child.method<Il2Cpp.Object>("get_gameObject").invoke().method("SetActive").invoke(false);
            }

            // WheelColliders의 자식 오브젝트 연결
            const childCntWc = cc.method<Il2Cpp.Object>("get_transform").invoke().method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("WheelColliders")).method<number>("get_childCount").invoke();

            for (let i = 0; i < childCntWc; i++) {
                const wc = cc.method<Il2Cpp.Object>("get_transform").invoke().method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("WheelColliders")).method<Il2Cpp.Object>("GetChild").invoke(0);
                const lp = wc.method<Il2Cpp.Object>("get_localPosition").invoke();
                wc.method<Il2Cpp.Object>("set_parent").invoke(awc);
                const _wc = wc.method<Il2Cpp.Object>("GetComponent", 0).inflate(unitycor.class("UnityEngine.WheelCollider")).invoke();

                // 해당 인스턴스의 특정 휠에 할당
                switch (i) {
                    case 0:
                        __instance.field("wheelFL_AccentCar").value = _wc;
                        break;
                    case 1:
                        __instance.field("wheelFR_AccentCar").value = _wc;
                        break;
                    case 2:
                        __instance.field("wheelRL_AccentCar").value = _wc;
                        break;
                    case 3:
                        __instance.field("wheelRR_AccentCar").value = _wc;
                        break;
                }

                wc.method("set_localPosition").invoke(lp);
            }

            // WheelTransforms 및 Accent 하위 오브젝트 찾기
            const wts = _c.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("WheelTransforms"));
            const at = wts.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("Accent"));

            for (var child of at.method<Il2Cpp.Array<Il2Cpp.Object>>("GetComponentsInChildren", 0).inflate(UnityEngine_Transform).invoke()) {
                child.method<Il2Cpp.Object>("get_gameObject").invoke().method("SetActive").invoke(false);
            }

            // WheelModels 자식 오브젝트 연결
            const childCntMdl = cc.method<Il2Cpp.Object>("get_transform").invoke().method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("WheelModels")).method<number>("get_childCount").invoke();

            for (let i = 0; i < childCntMdl; i++) {
                const wm = cc.method<Il2Cpp.Object>("get_transform").invoke().method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("WheelModels")).method<Il2Cpp.Object>("GetChild").invoke(0);
                const lp = wm.method<Il2Cpp.Object>("get_localPosition").invoke();
                wm.method<Il2Cpp.Object>("set_parent").invoke(at);

                switch (i) {
                    case 0:
                        __instance.field("AccentwheelFLTrans").value = wm;
                        break;
                    case 1:
                        __instance.field("AccentwheelFRTrans").value = wm;
                        break;
                    case 2:
                        __instance.field("AccentwheelRLTrans").value = wm;
                        break;
                    case 3:
                        __instance.field("AccentwheelRRTrans").value = wm;
                        break;
                }

                wm.method("set_localPosition").invoke(lp);
            }

            // Accent 하위 오브젝트 비활성화 및 위치 재설정
            const ab = _c.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("Accent"));
            for (var child of ab.method<Il2Cpp.Array<Il2Cpp.Object>>("GetComponentsInChildren", 0).inflate(UnityEngine_Transform).invoke()) {
                child.method<Il2Cpp.Object>("get_gameObject").invoke().method("SetActive").invoke(false);
            }
            ab.method<Il2Cpp.Object>("get_transform").invoke()
                .method("set_position").invoke(
                    ab.method<Il2Cpp.Object>("get_transform").invoke()
                        .method<Il2Cpp.Object>("get_parent").invoke()
                        .method<Il2Cpp.Object>("get_position").invoke());

            // Body의 자식 오브젝트 태그 설정 및 연결

            for (var child of cc.method<Il2Cpp.Object>("get_transform").invoke()
                .method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("Body"))
                .method<Il2Cpp.Array<Il2Cpp.Object>>("GetComponentsInChildren", 0).inflate(UnityEngine_Transform).invoke()) {
                child.method<Il2Cpp.Object>("get_gameObject").invoke().method("set_tag").invoke(Il2Cpp.string("FreeJuhang"));
            }

            const childCntBdy = cc.method<Il2Cpp.Object>("get_transform").invoke().method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("Body")).method<number>("get_childCount").invoke();

            for (let i = 0; i < childCntBdy; i++) {
                const bd = cc.method<Il2Cpp.Object>("get_transform").invoke().method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("Body")).method<Il2Cpp.Object>("GetChild").invoke(0);
                const lp = bd.method<Il2Cpp.Object>("get_localPosition").invoke();
                bd.method<Il2Cpp.Object>("set_parent").invoke(ab);
                bd.method<Il2Cpp.Object>("set_localPosition").invoke(lp);
            }

            // customCar에서 Texture를 로드하고 Sprite로 변환
            const texturePath = customCars[customCarIdx - 1].metaData["handleTexture"];
            const texture = customCars[customCarIdx - 1].ab.method("Load", 1).inflate(unitycor.class("UnityEngine.Texture2D")).invoke(Il2Cpp.string(texturePath));
            var vec2 = unitycor.class("UnityEngine.Vector2");
            var rect = unitycor.class("UnityEngine.Rect")
            const spriteRect = rect.alloc();
            spriteRect.method(".ctor", 4).invoke(0, 0, texture.method("get_width").invoke(), texture.method("get_height").invoke());
            const spritePivot = vec2.alloc();
            spritePivot.method(".ctor", 2).invoke(0.5, 0.5)
            const sprite = unitycor.class("UnityEngine.Sprite").method<Il2Cpp.Object>("Create", 3).invoke(texture, spriteRect, spritePivot);
            (__instance.field("HandleG").value as Il2Cpp.Array<Il2Cpp.Object>).set(0, sprite);

        };
})


