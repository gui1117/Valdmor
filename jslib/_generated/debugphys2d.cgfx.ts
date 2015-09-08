// Generated from assets/shaders/debugphys2d.cgfx
var debugphys2d_cgfx : any =
{
    "version": 1,
    "name": "debugphys2d.cgfx",
    "parameters":
    {
        "clipSpace":
        {
            "type": "float",
            "columns": 4
        }
    },
    "techniques":
    {
        "alpha":
        [
            {
                "parameters": ["clipSpace"],
                "semantics": ["ATTR0","ATTR3"],
                "states":
                {
                    "DepthTestEnable": false,
                    "DepthMask": false,
                    "CullFaceEnable": false,
                    "BlendEnable": true,
                    "BlendFunc": [770,771]
                },
                "programs": ["vp_draw2dlines","fp_draw2dlines"]
            }
        ]
    },
    "programs":
    {
        "fp_draw2dlines":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying TZ_LOWP vec4 tz_Color;\nvoid main()\n{gl_FragColor=tz_Color;}"
        },
        "vp_draw2dlines":
        {
            "type": "vertex",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying TZ_LOWP vec4 tz_Color;attribute vec4 ATTR0;attribute vec4 ATTR3;\nvec4 _outcol1;vec4 _outpos1;uniform vec4 clipSpace;void main()\n{vec2 _TMP1;_TMP1=ATTR0.xy*clipSpace.xy+clipSpace.zw;_outpos1=vec4(_TMP1.x,_TMP1.y,0.0,1.0);_outcol1=ATTR3;gl_Position=_outpos1;tz_Color=ATTR3;}"
        }
    }
}

