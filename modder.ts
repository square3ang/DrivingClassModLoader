import "frida-il2cpp-bridge"
const ab = require("./dcmlassets.js");

Il2Cpp.perform(() => {
    var il2cpp = Il2Cpp.domain.assembly("Assembly-CSharp").image;
    var unitycor = Il2Cpp.domain.assembly("UnityEngine.CoreModule").image;

    var unityui = Il2Cpp.domain.assembly("UnityEngine.UI").image;

    var abloadfrommemory = new NativeFunction(Il2Cpp.api.resolveInternalCall(Memory.allocUtf8String("UnityEngine.AssetBundle::LoadFromMemory_Internal")), "pointer", ["pointer"]);
    var abloadasset = new NativeFunction(Il2Cpp.api.resolveInternalCall(Memory.allocUtf8String("UnityEngine.AssetBundle::LoadAsset_Internal(System.String,System.Type)")), "pointer", ["pointer", "pointer"]);
    
    
    var dcmlassets = Memory.alloc(ab.dcmlassets.length);
    dcmlassets.writeByteArray(ab.dcmlassets);
    

    var assetBundle: NativePointer | null = null;


    function EditMainMenu() {

        

        var gameobject = unitycor.class("UnityEngine.GameObject");
        var find = gameobject.method<Il2Cpp.Object>("Find");

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

        // load menu
        var menu = instantiate1.invoke(new Il2Cpp.Object(abloadasset.call(assetBundle, Memory.allocUtf8String("ModSettingsMenu"), gameobject.type.handle)));
        
        menu.method("setActive").invoke(false);

        var onClickButton = Il2Cpp.delegate(unityaction, () => {
            var demoManager = il2cpp.class("DemoManager");
            find.invoke(Il2Cpp.string("Demo manager")).method<Il2Cpp.Object>("GetComponent", 0).inflate(demoManager).invoke().field<Il2Cpp.Object>("ButtonSound").value.method("Play", 0).invoke();
            menu.method("setActive").invoke(true);
        });

        setbuttoncmp.method<Il2Cpp.Object>("get_onClick").invoke().method("AddListener").invoke(onClickButton);
        
        

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
            assetBundle = abloadfrommemory.call(null, dcmlassets);
        }
        EditMainMenu();
    };
})


