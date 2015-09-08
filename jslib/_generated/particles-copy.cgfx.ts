// Generated from assets/shaders/particles-copy.cgfx
var particles_copy_cgfx : any =
{
    "version": 1,
    "name": "particles-copy.cgfx",
    "samplers":
    {
        "src":
        {
            "MinFilter": 9728,
            "MagFilter": 9728,
            "WrapS": 33071,
            "WrapT": 33071
        }
    },
    "parameters":
    {
        "src":
        {
            "type": "sampler2D"
        },
        "dim":
        {
            "type": "float",
            "columns": 2
        },
        "destRect":
        {
            "type": "float",
            "columns": 4
        }
    },
    "techniques":
    {
        "copy":
        [
            {
                "parameters": ["destRect","src"],
                "semantics": ["ATTR0"],
                "states":
                {
                    "DepthTestEnable": false,
                    "DepthMask": false,
                    "CullFaceEnable": false,
                    "BlendEnable": false
                },
                "programs": ["vp_copy","fp_copy"]
            }
        ]
    },
    "programs":
    {
        "fp_copy":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];\nvec4 _ret_0;uniform sampler2D src;void main()\n{_ret_0=texture2D(src,tz_TexCoord[0].xy);gl_FragColor=_ret_0;}"
        },
        "vp_copy":
        {
            "type": "vertex",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];attribute vec4 ATTR0;\nvec4 _outPosition1;vec2 _outUV1;uniform vec4 destRect;void main()\n{vec2 _xy;vec2 _wh;vec2 _TMP3;_xy=destRect.xy*2.0-1.0;_wh=(destRect.zw*2.0-1.0)-_xy;_TMP3=_xy+_wh*ATTR0.xy;_outPosition1=vec4(_TMP3.x,_TMP3.y,0.0,1.0);_outUV1=ATTR0.xy;tz_TexCoord[0].xy=ATTR0.xy;gl_Position=_outPosition1;}"
        }
    }
}

