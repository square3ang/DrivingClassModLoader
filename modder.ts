import "frida-il2cpp-bridge"
//import * as asb from "./dcmlassets.js";
//import * as fs from "frida-fs";

setTimeout(() => {
    Il2Cpp.perform(() => {
        //const customCars: { ab: NativePointer, metaData: { handleTexture: string } }[] = [];

        //const customCarIdx = 0;

        const il2cpp = Il2Cpp.domain.assembly("Assembly-CSharp").image;
        const unitycor = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;

        const unityui = Il2Cpp.domain.assembly("UnityEngine.UI").image;

        const sceneManager = unitycor.class("UnityEngine.SceneManagement.SceneManager");
        const loadScene = sceneManager.method("LoadScene", 1).overload("System.Int32");
        try {
            loadScene?.invoke(0);
        }
        catch (e) {
            console.error("Failed to load scene: " + e);
        }

        //const abloadfromfile = new NativeFunction(Il2Cpp.api.resolveInternalCall(Memory.allocUtf8String("UnityEngine.AssetBundle::LoadFromFile_Internal(System.String,System.UInt32,System.UInt64)")), "pointer", ["pointer", "uint32", "uint64"]);
        //const abloadasset = new NativeFunction(Il2Cpp.api.resolveInternalCall(Memory.allocUtf8String("UnityEngine.AssetBundle::LoadAsset_Internal(System.String,System.Type)")), "pointer", ["pointer", "pointer", "pointer"]);

        //let assetBundle: NativePointer | null = null;

        const demoManager = il2cpp.class("DemoManager");

        const gameobject = unitycor.class("UnityEngine.GameObject");
        const find = gameobject.method<Il2Cpp.Object>("Find");

        function PlayButtonSound() {
            find.invoke(Il2Cpp.string("Demo manager"))
                .method<Il2Cpp.Object>("GetComponent", 0).inflate(demoManager).invoke()
                .field<Il2Cpp.Object>("ButtonSound").value.method("Play", 0).invoke();
        }

        const text = unityui.class("UnityEngine.UI.Text");
        const settxt = text.method<Il2Cpp.Object>("set_text");

        let skipp = true;
        //@ts-expect-error unnecessary error hide
        settxt.implementation = function (this: Il2Cpp.Object, value: Il2Cpp.String) {
            if (skipp) return;
            this.method("set_text").invoke(value);
        };

        const UnityAction2 = unitycor.class("UnityEngine.Events.UnityAction`2").inflate(unitycor.class("UnityEngine.SceneManagement.Scene"), unitycor.class("UnityEngine.SceneManagement.LoadSceneMode"));
        const callback = Il2Cpp.delegate(UnityAction2, () => {
            console.log("[+] Scene loaded!");

            // schedule

            setTimeout(() => {
                Il2Cpp.mainThread.schedule(() => {
                    skipp = false;

                    const uo = unitycor.class("UnityEngine.Object");

                    const findObjectsOfType = uo.method<Il2Cpp.Array<Il2Cpp.Object>>("FindObjectsOfType", 0).overload("System.Type", "System.Boolean");
                    console.log("FindObjectsOfType: " + findObjectsOfType);

                    const arrr = findObjectsOfType.invoke(Il2Cpp.corlib.class("System.Type").method<Il2Cpp.Object>("GetType", 1).invoke(Il2Cpp.string("UnityEngine.UI.Text")), true);
                    for (let i = 0; i < arrr.length; i++) {
                        const obj = arrr.get(i);
                        obj.method("set_text").invoke(Il2Cpp.string("정사각형"));
                    }

                    skipp = true;
                });
            }, 100);
        });
        sceneManager.method("add_sceneLoaded").invoke(callback);






        function EditMainMenu() {
            const vertxt = find.invoke(Il2Cpp.string("Version"));
            console.log(vertxt);
            const vertxtcmp = vertxt.method<Il2Cpp.Object>("GetComponent", 0).inflate(text).invoke();
            console.log(vertxtcmp);
            const vertxt_txtget = vertxtcmp.method<Il2Cpp.String>("get_text");
            const vertxt_txtset = vertxtcmp.method("set_text");

            vertxt_txtset.invoke(Il2Cpp.string(vertxt_txtget.invoke().content + "-mod"));
            const vertxt_fontSizeget = vertxtcmp.method<number>("get_fontSize");
            const vertxt_fontSizeset = vertxtcmp.method("set_fontSize");

            vertxt_fontSizeset.invoke(vertxt_fontSizeget.invoke() - 5);

            const fj = find.invoke(Il2Cpp.string("FreeJunag"));

            console.log("FJ: " + fj);

            /*const titletxt = find.invoke(Il2Cpp.string("Name"));
            const titletxtcmp = titletxt.method<Il2Cpp.Object>("GetComponent", 0).inflate(text).invoke();
            const titletxt_txtset = titletxtcmp.method("set_text");
            titletxt_txtset.invoke(Il2Cpp.string("감자자님한판해요"));*/


            const uo = unitycor.class("UnityEngine.Object");

            const findObjectsOfType = uo.method<Il2Cpp.Array<Il2Cpp.Object>>("FindObjectsOfType", 0).overload("System.Type", "System.Boolean");
            console.log("FindObjectsOfType: " + findObjectsOfType);

            const arrr = findObjectsOfType.invoke(Il2Cpp.corlib.class("System.Type").method<Il2Cpp.Object>("GetType", 1).invoke(Il2Cpp.string("UnityEngine.UI.Text")), true);
            for (let i = 0; i < arrr.length; i++) {
                const obj = arrr.get(i);
                obj.method("set_text").invoke(Il2Cpp.string("정사각형"));
            }



            const instantiate2 = uo.method<Il2Cpp.Object>("Instantiate", 2);
            //const instantiate1 = uo.method<Il2Cpp.Object>("Instantiate", 1);
            const destroy = uo.method("Destroy", 1);

            const localize = il2cpp.class("I2.Loc.Localize");

            // Create Button

            const mpbtn = find.invoke(Il2Cpp.string("MultiPlay"));

            const setBtn = instantiate2.inflate(gameobject).invoke(fj, fj.method<Il2Cpp.Object>("get_transform").invoke().method<Il2Cpp.Object>("get_parent").invoke());
            setBtn.method("set_name").invoke(Il2Cpp.string("DCMLSettings"));
            // button width: 250, height: 90, spacing: 35

            /*let sPosOff = vec3.alloc();
            sPosOff.method(".ctor", 2).invoke(575, 125);*/

            const setBtnTrans = setBtn.method<Il2Cpp.Object>("get_transform").invoke();

            //setBtnTrans.method("set_localPosition").invoke(vec3.method<Il2Cpp.ValueType>("op_Addition").invoke(setBtnTrans.method<Il2Cpp.ValueType>("get_localPosition").invoke(), sPosOff.unbox()));

            setBtnTrans.method("set_localPosition").invoke(mpbtn.method<Il2Cpp.Object>("get_transform").invoke().method<Il2Cpp.ValueType>("get_localPosition").invoke());

            destroy.invoke(mpbtn);

            const setBtnTxt = setBtn.method<Il2Cpp.Object>("GetComponentInChildren", 0).inflate(text).invoke();

            destroy.invoke(setBtnTxt.method<Il2Cpp.Object>("GetComponent", 0).inflate(localize).invoke());

            setBtnTxt.method("set_text").invoke(Il2Cpp.string("DCML 0.0.1"));

            const button = unityui.class("UnityEngine.UI.Button");
            const setbuttoncmp = setBtn.method<Il2Cpp.Object>("GetComponent", 0).inflate(button).invoke();

            setbuttoncmp.method<Il2Cpp.Object>("get_onClick").invoke().field<Il2Cpp.Object>("m_PersistentCalls").value.field<Il2Cpp.Object>("m_Calls").value.method("Clear").invoke();


            const unityaction = unitycor.class("UnityEngine.Events.UnityAction");



            console.log("Loading Menu");
            //console.log(assetBundle);
            //const mnu = abloadasset(assetBundle as NativePointerValue, Il2Cpp.string("ModSettingsMenu"), Il2Cpp.domain.assembly("mscorlib").image.class("System.Type").method<Il2Cpp.Object>("GetType", 1).invoke(Il2Cpp.string("UnityEngine.GameObject")));
            //console.log("Menu Loaded! Instantiate..");
            // load menu
            //const menu = instantiate1.invoke(new Il2Cpp.Object(mnu));
            //console.log(menu);

            //const menutransform = menu.method<Il2Cpp.Object>("get_transform").invoke();





            //menu.method("SetActive").invoke(false);

            //const s1 = menutransform.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("s1"));
            //const s2 = menutransform.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("s2"));

            /*s1.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("closemodsettings"))
                .method<Il2Cpp.Object>("GetComponent", 0).inflate(button).invoke()
                .method<Il2Cpp.Object>("get_onClick").invoke()
                .method("AddListener").invoke(Il2Cpp.delegate(unityaction, () => {
                    //menu.method("SetActive").invoke(false);
                }));*/

            setbuttoncmp.method<Il2Cpp.Object>("get_onClick").invoke()
                .method("AddListener").invoke(Il2Cpp.delegate(unityaction, () => {
                    PlayButtonSound();

                    //menu.method("SetActive").invoke(true);

                    /*s1.method<Il2Cpp.Object>("get_gameObject").invoke()
                        .method("SetActive").invoke(true);
     
                    s2.method<Il2Cpp.Object>("get_gameObject").invoke()
                        .method("SetActive").invoke(false);*/
                }));

            /*s1.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("btns"))
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
                }));*/

            /*s2.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("select"))
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
     
                }));*/



            console.log("Main Menu Edited!");
        }

        const start = il2cpp.class("DemoManager").method("Start");

        // Patch Start
        //@ts-expect-error unnecessary error hide
        start.implementation = function (this: Il2Cpp.Object) {
            console.log("Call Original");
            this.method("Start").invoke();
            console.log("Called");
            /*if (assetBundle == null) {
                fs.writeFileSync(Il2Cpp.application.dataPath + "/dcmlassets", new DataView(new Int8Array(asb.dcmlassets).buffer));
                assetBundle = abloadfromfile(Il2Cpp.string(Il2Cpp.application.dataPath + "/dcmlassets"), 0, 0);
                console.log("assetbundle loaded");
            }*/
            EditMainMenu();
        };


        //@ts-expect-error unnecessary error hide
        il2cpp.class("CarControleScriptAndroid").method("Start")
            .implementation = function (this: Il2Cpp.Object) {
                /*if (customCarIdx == 0) return;
                
                // 필요한 Unity 클래스 및 메서드를 가져옵니다.
                const UnityEngine_PlayerPrefs = unitycor.class("UnityEngine.PlayerPrefs");
                const UnityEngine_Object = unitycor.class("UnityEngine.Object");
                const UnityEngine_Transform = unitycor.class("UnityEngine.Transform");
                const RHC_HovercraftController = il2cpp.class("RHC_HovercraftController");
     
                // PlayerPrefs.SetInt("carnum", 0) 및 PlayerPrefs.Save()
                UnityEngine_PlayerPrefs.method("SetInt").invoke(Il2Cpp.string("carnum"), 0);
                UnityEngine_PlayerPrefs.method("Save").invoke();
     
                // this의 transform을 가져옵니다.
                const _c = this.method<Il2Cpp.Object>("get_transform").invoke();
     
                // this.GetComponent<RHC_HovercraftController>().enabled = false
                const hovercraftController = this.method<Il2Cpp.Object>("GetComponent", 0).inflate(RHC_HovercraftController).invoke();
                hovercraftController.method("set_enabled").invoke(false);
     
                // customCars[customCarIdx - 1]에서 car prefab을 로드하고 Instantiate합니다.
                
                const customCarPrefab = abloadasset(customCars[customCarIdx - 1].ab, Il2Cpp.string("CustomCar"), Il2Cpp.domain.assembly("mscorlib").image.class("System.Type").method<Il2Cpp.Object>("GetType", 1).invoke(Il2Cpp.string("UnityEngine.GameObject")));
                const cc = UnityEngine_Object.method<Il2Cpp.Object>("Instantiate").invoke(customCarPrefab);
     
                // cc의 모든 자식 Transform의 layer 값을 11로 설정
                for (const transfor of cc.method<Il2Cpp.Array<Il2Cpp.Object>>("GetComponentsInChildren", 0).inflate(UnityEngine_Transform).invoke()) {
                    transfor.method<Il2Cpp.Object>("get_gameObject").invoke().method<Il2Cpp.Object>("set_layer").invoke(11);
                }
     
                // WheelColliders 및 Accent 하위 오브젝트 찾기
                const wcs = _c.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("WheelColliders"));
                const awc = wcs.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("0_Accent"));
                for (const child of awc.method<Il2Cpp.Array<Il2Cpp.Object>>("GetComponentsInChildren", 0).inflate(UnityEngine_Transform).invoke()) {
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
                            this.field("wheelFL_AccentCar").value = _wc;
                            break;
                        case 1:
                            this.field("wheelFR_AccentCar").value = _wc;
                            break;
                        case 2:
                            this.field("wheelRL_AccentCar").value = _wc;
                            break;
                        case 3:
                            this.field("wheelRR_AccentCar").value = _wc;
                            break;
                    }
     
                    wc.method("set_localPosition").invoke(lp);
                }
     
                // WheelTransforms 및 Accent 하위 오브젝트 찾기
                const wts = _c.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("WheelTransforms"));
                const at = wts.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("Accent"));
     
                for (const child of at.method<Il2Cpp.Array<Il2Cpp.Object>>("GetComponentsInChildren", 0).inflate(UnityEngine_Transform).invoke()) {
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
                            this.field("AccentwheelFLTrans").value = wm;
                            break;
                        case 1:
                            this.field("AccentwheelFRTrans").value = wm;
                            break;
                        case 2:
                            this.field("AccentwheelRLTrans").value = wm;
                            break;
                        case 3:
                            this.field("AccentwheelRRTrans").value = wm;
                            break;
                    }
     
                    wm.method("set_localPosition").invoke(lp);
                }
     
                // Accent 하위 오브젝트 비활성화 및 위치 재설정
                const ab = _c.method<Il2Cpp.Object>("Find").invoke(Il2Cpp.string("Accent"));
                for (const child of ab.method<Il2Cpp.Array<Il2Cpp.Object>>("GetComponentsInChildren", 0).inflate(UnityEngine_Transform).invoke()) {
                    child.method<Il2Cpp.Object>("get_gameObject").invoke().method("SetActive").invoke(false);
                }
                ab.method<Il2Cpp.Object>("get_transform").invoke()
                    .method("set_position").invoke(
                        ab.method<Il2Cpp.Object>("get_transform").invoke()
                            .method<Il2Cpp.Object>("get_parent").invoke()
                            .method<Il2Cpp.Object>("get_position").invoke());
     
                // Body의 자식 오브젝트 태그 설정 및 연결
     
                for (const child of cc.method<Il2Cpp.Object>("get_transform").invoke()
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
                const texturePath = customCars[customCarIdx - 1].metaData.handleTexture;
                const texture = new Il2Cpp.Object(abloadasset(customCars[customCarIdx - 1].ab, Il2Cpp.string(texturePath), Il2Cpp.domain.assembly("mscorlib").image.class("System.Type").method<Il2Cpp.Object>("GetType", 1).invoke(Il2Cpp.string("UnityEngine.Texture2D"))));
                const vec2 = unitycor.class("UnityEngine.Vector2");
                const rect = unitycor.class("UnityEngine.Rect")
                const spriteRect = rect.alloc();
                spriteRect.method(".ctor", 4).invoke(0, 0, texture.method<number>("get_width").invoke(), texture.method<number>("get_height").invoke());
                const spritePivot = vec2.alloc();
                spritePivot.method(".ctor", 2).invoke(0.5, 0.5)
                const sprite = unitycor.class("UnityEngine.Sprite").method<Il2Cpp.Object>("Create", 3).invoke(texture, spriteRect, spritePivot);
                (this.field("HandleG").value as Il2Cpp.Array<Il2Cpp.Object>).set(0, sprite);
    */
                console.log("Call Original");
                this.method("Start").invoke();
                console.log("Called");
            }
    });
}, 1000);
