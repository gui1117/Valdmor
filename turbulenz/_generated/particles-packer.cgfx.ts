// Generated from assets/shaders/particles-packer.cgfx
var particles_packer_cgfx : any =
{
    "version": 1,
    "name": "particles-packer.cgfx",
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
        },
        "border":
        {
            "type": "float"
        }
    },
    "techniques":
    {
        "pack":
        [
            {
                "parameters": ["dim","destRect","border","src"],
                "semantics": ["ATTR0"],
                "states":
                {
                    "DepthTestEnable": false,
                    "DepthMask": false,
                    "CullFaceEnable": false,
                    "BlendEnable": false
                },
                "programs": ["vp_pack","fp_pack"]
            }
        ]
    },
    "programs":
    {
        "fp_pack":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];\nvec4 _ret_0;uniform sampler2D src;void main()\n{_ret_0=texture2D(src,tz_TexCoord[0].xy);gl_FragColor=_ret_0;}"
        },
        "vp_pack":
        {
            "type": "vertex",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];attribute vec4 ATTR0;\nvec4 _outPosition1;vec2 _outUV1;uniform vec2 dim;uniform vec4 destRect;uniform float border;void main()\n{vec2 _xy;vec2 _wh;vec2 _TMP4;_xy=destRect.xy*2.0-1.0;_wh=(destRect.zw*2.0-1.0)-_xy;_TMP4=_xy+_wh*ATTR0.xy;_outPosition1=vec4(_TMP4.x,_TMP4.y,0.0,1.0);_outUV1=ATTR0.xy+((ATTR0.xy*2.0-1.0)*border)/dim;tz_TexCoord[0].xy=_outUV1;gl_Position=_outPosition1;}"
        }
    }
}

