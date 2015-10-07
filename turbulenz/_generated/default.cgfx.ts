// Generated from assets/shaders/default.cgfx
var default_cgfx : any =
{
    "version": 1,
    "name": "default.cgfx",
    "samplers":
    {
        "diffuse":
        {
            "MinFilter": 9985,
            "MagFilter": 9729
        }
    },
    "parameters":
    {
        "worldViewProjection":
        {
            "type": "float",
            "rows": 4,
            "columns": 4
        },
        "diffuse":
        {
            "type": "sampler2D"
        }
    },
    "techniques":
    {
        "textured3D":
        [
            {
                "parameters": ["worldViewProjection","diffuse"],
                "semantics": ["ATTR0","ATTR8"],
                "states":
                {
                    "DepthTestEnable": true,
                    "DepthFunc": 515,
                    "DepthMask": true,
                    "CullFaceEnable": true,
                    "CullFace": 1029,
                    "BlendEnable": false
                },
                "programs": ["vp","fp"]
            }
        ]
    },
    "programs":
    {
        "fp":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];\nvec4 _ret_0;uniform sampler2D diffuse;void main()\n{_ret_0=texture2D(diffuse,tz_TexCoord[0].xy);gl_FragColor=_ret_0;}"
        },
        "vp":
        {
            "type": "vertex",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];attribute vec4 ATTR0;attribute vec4 ATTR8;\nvec4 _OUTpos1;vec2 _OUTuv1;uniform vec4 worldViewProjection[4];void main()\n{_OUTpos1=ATTR0.xxxx*worldViewProjection[0]+ATTR0.yyyy*worldViewProjection[1]+ATTR0.zzzz*worldViewProjection[2]+worldViewProjection[3];_OUTuv1=ATTR8.xy;tz_TexCoord[0].xy=ATTR8.xy;gl_Position=_OUTpos1;}"
        }
    }
}

