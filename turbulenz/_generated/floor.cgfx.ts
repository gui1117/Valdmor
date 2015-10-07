// Generated from assets/shaders/floor.cgfx
var floor_cgfx : any =
{
    "version": 1,
    "name": "floor.cgfx",
    "parameters":
    {
        "worldViewProjection":
        {
            "type": "float",
            "rows": 4,
            "columns": 4
        },
        "color":
        {
            "type": "float",
            "columns": 4
        },
        "fadeToColor":
        {
            "type": "float",
            "columns": 4
        }
    },
    "techniques":
    {
        "floor":
        [
            {
                "parameters": ["worldViewProjection","color","fadeToColor"],
                "semantics": ["ATTR0"],
                "states":
                {
                    "DepthTestEnable": true,
                    "DepthFunc": 515,
                    "DepthMask": false,
                    "CullFaceEnable": false,
                    "BlendEnable": false
                },
                "programs": ["vp_floor","fp_floor"]
            }
        ]
    },
    "programs":
    {
        "fp_floor":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];\nvec4 _ret_0;float _TMP0;float _TMP2;float _TMP10;uniform vec4 color;uniform vec4 fadeToColor;void main()\n{_TMP0=length(tz_TexCoord[0].xy);_TMP2=min(1.0,_TMP0);_TMP10=max(0.0,_TMP2);_ret_0=color+_TMP10*(fadeToColor-color);gl_FragColor=_ret_0;}"
        },
        "vp_floor":
        {
            "type": "vertex",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];attribute vec4 ATTR0;\nvec4 _OUTPosition1;vec2 _OUTDistance1;uniform vec4 worldViewProjection[4];void main()\n{_OUTPosition1=ATTR0.xxxx*worldViewProjection[0]+ATTR0.yyyy*worldViewProjection[2]+worldViewProjection[3];_OUTDistance1=ATTR0.xy;tz_TexCoord[0].xy=ATTR0.xy;gl_Position=_OUTPosition1;}"
        }
    }
}

