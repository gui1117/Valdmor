// Generated from assets/shaders/loadingscreen.cgfx
var loadingscreen_cgfx : any =
{
    "version": 1,
    "name": "loadingscreen.cgfx",
    "samplers":
    {
        "diffuse":
        {
            "MinFilter": 9729,
            "MagFilter": 9729,
            "WrapS": 33071,
            "WrapT": 33071
        }
    },
    "parameters":
    {
        "color":
        {
            "type": "float",
            "columns": 4
        },
        "clipSpace":
        {
            "type": "float",
            "columns": 4
        },
        "alpha":
        {
            "type": "float"
        },
        "diffuse":
        {
            "type": "sampler2D"
        }
    },
    "techniques":
    {
        "background":
        [
            {
                "parameters": ["color"],
                "semantics": ["ATTR0"],
                "states":
                {
                    "DepthTestEnable": false,
                    "DepthMask": false,
                    "CullFaceEnable": false,
                    "BlendEnable": true,
                    "BlendFunc": [770,771]
                },
                "programs": ["vp_background","fp_background"]
            }
        ],
        "texture":
        [
            {
                "parameters": ["clipSpace","alpha","diffuse"],
                "semantics": ["ATTR0","ATTR8"],
                "states":
                {
                    "DepthTestEnable": false,
                    "DepthMask": false,
                    "CullFaceEnable": false,
                    "BlendEnable": true,
                    "BlendFunc": [770,771]
                },
                "programs": ["vp_texture","fp_texture"]
            }
        ]
    },
    "programs":
    {
        "fp_texture":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];\nfloat _TMP0;float _TMP1;float _TMP12;uniform float alpha;uniform sampler2D diffuse;void main()\n{vec4 _textureColor;_textureColor=texture2D(diffuse,tz_TexCoord[0].xy);_TMP1=min(1.0,alpha);_TMP12=max(0.0,_TMP1);_TMP0=_TMP12*_TMP12*(3.0-2.0*_TMP12);_textureColor.w=_textureColor.w*_TMP0;gl_FragColor=_textureColor;}"
        },
        "vp_texture":
        {
            "type": "vertex",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];attribute vec4 ATTR0;attribute vec4 ATTR8;\nvec4 _OutPosition1;vec2 _OutUV1;uniform vec4 clipSpace;void main()\n{_OutPosition1.xy=ATTR0.xy*clipSpace.xy+clipSpace.zw;_OutPosition1.zw=ATTR0.zw;_OutUV1=ATTR8.xy;tz_TexCoord[0].xy=ATTR8.xy;gl_Position=_OutPosition1;}"
        },
        "fp_background":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvec4 _ret_0;float _TMP0;float _TMP1;float _TMP11;uniform vec4 color;void main()\n{_TMP1=min(1.0,color.w);_TMP11=max(0.0,_TMP1);_TMP0=_TMP11*_TMP11*(3.0-2.0*_TMP11);_ret_0=vec4(color.x,color.y,color.z,_TMP0);gl_FragColor=_ret_0;}"
        },
        "vp_background":
        {
            "type": "vertex",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nattribute vec4 ATTR0;\nvoid main()\n{gl_Position=ATTR0;}"
        }
    }
}

