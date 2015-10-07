// Generated from assets/shaders/textureeffects.cgfx
var textureeffects_cgfx : any =
{
    "version": 1,
    "name": "textureeffects.cgfx",
    "samplers":
    {
        "inputTexture0":
        {
            "MinFilter": 9729,
            "MagFilter": 9729,
            "WrapS": 33071,
            "WrapT": 33071
        },
        "inputTexture1":
        {
            "MinFilter": 9729,
            "MagFilter": 9729,
            "WrapS": 33071,
            "WrapT": 33071
        },
        "inputTexture2":
        {
            "MinFilter": 9729,
            "MagFilter": 9729,
            "WrapS": 33071,
            "WrapT": 33071
        },
        "distortTexture":
        {
            "MinFilter": 9729,
            "MagFilter": 9729,
            "WrapS": 10497,
            "WrapT": 10497
        }
    },
    "parameters":
    {
        "strength":
        {
            "type": "float",
            "columns": 2
        },
        "transform":
        {
            "type": "float",
            "rows": 2,
            "columns": 3
        },
        "invTransform":
        {
            "type": "float",
            "rows": 2,
            "columns": 2
        },
        "colorMatrix":
        {
            "type": "float",
            "rows": 3,
            "columns": 4
        },
        "sampleRadius":
        {
            "type": "float",
            "columns": 2
        },
        "bloomThreshold":
        {
            "type": "float"
        },
        "thresholdCutoff":
        {
            "type": "float"
        },
        "bloomSaturation":
        {
            "type": "float"
        },
        "originalSaturation":
        {
            "type": "float"
        },
        "bloomIntensity":
        {
            "type": "float"
        },
        "originalIntensity":
        {
            "type": "float"
        },
        "inputTexture0":
        {
            "type": "sampler2D"
        },
        "inputTexture1":
        {
            "type": "sampler2D"
        },
        "inputTexture2":
        {
            "type": "sampler2D"
        },
        "distortTexture":
        {
            "type": "sampler2D"
        },
        "Gauss":
        {
            "type": "float",
            "rows": 9,
            "values": [0.93,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1]
        }
    },
    "techniques":
    {
        "distort":
        [
            {
                "parameters": ["strength","transform","invTransform","inputTexture0","distortTexture"],
                "semantics": ["ATTR0","ATTR8"],
                "states":
                {
                    "DepthTestEnable": false,
                    "DepthMask": false,
                    "CullFaceEnable": false,
                    "BlendEnable": false
                },
                "programs": ["vp_copy","fp_distort"]
            }
        ],
        "copyColorMatrix":
        [
            {
                "parameters": ["colorMatrix","inputTexture0"],
                "semantics": ["ATTR0","ATTR8"],
                "states":
                {
                    "DepthTestEnable": false,
                    "DepthMask": false,
                    "CullFaceEnable": false,
                    "BlendEnable": false
                },
                "programs": ["vp_copy","fp_colorMatrix"]
            }
        ],
        "bloomThreshold":
        [
            {
                "parameters": ["bloomThreshold","thresholdCutoff","inputTexture0"],
                "semantics": ["ATTR0","ATTR8"],
                "states":
                {
                    "DepthTestEnable": false,
                    "DepthMask": false,
                    "CullFaceEnable": false,
                    "BlendEnable": false
                },
                "programs": ["vp_copy","fp_bloom_threshold"]
            }
        ],
        "bloomMerge":
        [
            {
                "parameters": ["bloomSaturation","originalSaturation","bloomIntensity","originalIntensity","inputTexture0","inputTexture1"],
                "semantics": ["ATTR0","ATTR8"],
                "states":
                {
                    "DepthTestEnable": false,
                    "DepthMask": false,
                    "CullFaceEnable": false,
                    "BlendEnable": false
                },
                "programs": ["vp_copy","fp_bloom_merge"]
            }
        ],
        "gaussianBlur":
        [
            {
                "parameters": ["sampleRadius","inputTexture0","Gauss"],
                "semantics": ["ATTR0","ATTR8"],
                "states":
                {
                    "DepthTestEnable": false,
                    "DepthMask": false,
                    "CullFaceEnable": false,
                    "BlendEnable": false
                },
                "programs": ["vp_copy","fp_gaussian_blur"]
            }
        ]
    },
    "programs":
    {
        "fp_gaussian_blur":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];\nvec4 _ret_0;vec4 _TMP2;vec4 _TMP1;vec2 _c0022;vec2 _c0024;uniform vec2 sampleRadius;uniform sampler2D inputTexture0;uniform float Gauss[9];void main()\n{vec2 _step;vec4 _color;vec2 _dir;_step=sampleRadius/9.0;_color=texture2D(inputTexture0,tz_TexCoord[0].xy);_c0022=tz_TexCoord[0].xy+_step;_TMP1=texture2D(inputTexture0,_c0022);_color=_color+_TMP1*Gauss[0];_c0024=tz_TexCoord[0].xy-_step;_TMP2=texture2D(inputTexture0,_c0024);_color=_color+_TMP2*Gauss[0];_dir=_step+_step;_c0022=tz_TexCoord[0].xy+_dir;_TMP1=texture2D(inputTexture0,_c0022);_color=_color+_TMP1*Gauss[1];_c0024=tz_TexCoord[0].xy-_dir;_TMP2=texture2D(inputTexture0,_c0024);_color=_color+_TMP2*Gauss[1];_dir=_dir+_step;_c0022=tz_TexCoord[0].xy+_dir;_TMP1=texture2D(inputTexture0,_c0022);_color=_color+_TMP1*Gauss[2];_c0024=tz_TexCoord[0].xy-_dir;_TMP2=texture2D(inputTexture0,_c0024);_color=_color+_TMP2*Gauss[2];_dir=_dir+_step;_c0022=tz_TexCoord[0].xy+_dir;_TMP1=texture2D(inputTexture0,_c0022);_color=_color+_TMP1*Gauss[3];_c0024=tz_TexCoord[0].xy-_dir;_TMP2=texture2D(inputTexture0,_c0024);_color=_color+_TMP2*Gauss[3];_dir=_dir+_step;_c0022=tz_TexCoord[0].xy+_dir;_TMP1=texture2D(inputTexture0,_c0022);_color=_color+_TMP1*Gauss[4];_c0024=tz_TexCoord[0].xy-_dir;_TMP2=texture2D(inputTexture0,_c0024);_color=_color+_TMP2*Gauss[4];_dir=_dir+_step;_c0022=tz_TexCoord[0].xy+_dir;_TMP1=texture2D(inputTexture0,_c0022);_color=_color+_TMP1*Gauss[5];_c0024=tz_TexCoord[0].xy-_dir;_TMP2=texture2D(inputTexture0,_c0024);_color=_color+_TMP2*Gauss[5];_dir=_dir+_step;_c0022=tz_TexCoord[0].xy+_dir;_TMP1=texture2D(inputTexture0,_c0022);_color=_color+_TMP1*Gauss[6];_c0024=tz_TexCoord[0].xy-_dir;_TMP2=texture2D(inputTexture0,_c0024);_color=_color+_TMP2*Gauss[6];_dir=_dir+_step;_c0022=tz_TexCoord[0].xy+_dir;_TMP1=texture2D(inputTexture0,_c0022);_color=_color+_TMP1*Gauss[7];_c0024=tz_TexCoord[0].xy-_dir;_TMP2=texture2D(inputTexture0,_c0024);_color=_color+_TMP2*Gauss[7];_dir=_dir+_step;_c0022=tz_TexCoord[0].xy+_dir;_TMP1=texture2D(inputTexture0,_c0022);_color=_color+_TMP1*Gauss[8];_c0024=tz_TexCoord[0].xy-_dir;_TMP2=texture2D(inputTexture0,_c0024);_color=_color+_TMP2*Gauss[8];_ret_0=_color*9.94035751E-02;gl_FragColor=_ret_0;}"
        },
        "vp_copy":
        {
            "type": "vertex",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];attribute vec4 ATTR0;attribute vec4 ATTR8;\nvec4 _OutPosition1;vec2 _OutUV1;void main()\n{_OutPosition1=ATTR0;_OutUV1=ATTR8.xy;tz_TexCoord[0].xy=ATTR8.xy;gl_Position=ATTR0;}"
        },
        "fp_bloom_merge":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];\nvec4 _ret_0;vec4 _TMP3;vec4 _TMP5;float _TMP2;vec4 _TMP1;float _TMP0;vec4 _TMP36;uniform float bloomSaturation;uniform float originalSaturation;uniform float bloomIntensity;uniform float originalIntensity;uniform sampler2D inputTexture0;uniform sampler2D inputTexture1;void main()\n{vec4 _orig;vec4 _bloom;_orig=texture2D(inputTexture0,tz_TexCoord[0].xy);_bloom=texture2D(inputTexture1,tz_TexCoord[0].xy);_TMP0=dot(_bloom.xyz,vec3(2.12599993E-01,7.15200007E-01,7.22000003E-02));_TMP1=vec4(_TMP0,_TMP0,_TMP0,_TMP0)+bloomSaturation*(_bloom-vec4(_TMP0,_TMP0,_TMP0,_TMP0));_bloom=_TMP1*bloomIntensity;_TMP2=dot(_orig.xyz,vec3(2.12599993E-01,7.15200007E-01,7.22000003E-02));_TMP3=vec4(_TMP2,_TMP2,_TMP2,_TMP2)+originalSaturation*(_orig-vec4(_TMP2,_TMP2,_TMP2,_TMP2));_TMP5=min(vec4(1.0,1.0,1.0,1.0),_bloom);_TMP36=max(vec4(0.0,0.0,0.0,0.0),_TMP5);_orig=(_TMP3*(1.0-_TMP36))*originalIntensity;_ret_0=_bloom+_orig;gl_FragColor=_ret_0;}"
        },
        "fp_bloom_threshold":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];\nvec4 _ret_0;float _TMP1;float _TMP0;float _a0025;float _x0027;uniform float bloomThreshold;uniform float thresholdCutoff;uniform sampler2D inputTexture0;void main()\n{vec4 _col;float _luminance;float _x;float _cut;_col=texture2D(inputTexture0,tz_TexCoord[0].xy);_luminance=dot(_col.xyz,vec3(2.12599993E-01,7.15200007E-01,7.22000003E-02));_x=float((_luminance>=bloomThreshold));_a0025=3.14159274*(_luminance/bloomThreshold-0.5);_TMP0=sin(_a0025);_x0027=0.5*(1.0+_TMP0);_TMP1=pow(_x0027,thresholdCutoff);_cut=bloomThreshold*_TMP1;_ret_0=(_x+(1.0-_x)*_cut)*_col;gl_FragColor=_ret_0;}"
        },
        "fp_colorMatrix":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];\nvec3 _r0019;uniform vec4 colorMatrix[3];uniform sampler2D inputTexture0;void main()\n{vec4 _color;vec4 _mutc;_color=texture2D(inputTexture0,tz_TexCoord[0].xy);_mutc=_color;_mutc.w=1.0;_r0019.x=dot(colorMatrix[0],_mutc);_r0019.y=dot(colorMatrix[1],_mutc);_r0019.z=dot(colorMatrix[2],_mutc);_mutc.xyz=_r0019;_mutc.w=_color.w;gl_FragColor=_mutc;}"
        },
        "fp_distort":
        {
            "type": "fragment",
            "code": "#ifdef GL_ES\n#define TZ_LOWP lowp\nprecision highp float;\nprecision highp int;\n#else\n#define TZ_LOWP\n#endif\nvarying vec4 tz_TexCoord[1];\nvec4 _ret_0;vec2 _UV1;vec4 _TMP1;vec2 _r0020;vec2 _r0028;vec2 _v0028;uniform vec2 strength;uniform vec3 transform[2];uniform vec2 invTransform[2];uniform sampler2D inputTexture0;uniform sampler2D distortTexture;void main()\n{vec3 _uvt;_uvt=vec3(tz_TexCoord[0].x,tz_TexCoord[0].y,1.0);_r0020.x=dot(transform[0],_uvt);_r0020.y=dot(transform[1],_uvt);_TMP1=texture2D(distortTexture,_r0020);_v0028=_TMP1.xy-0.5;_r0028.x=dot(invTransform[0],_v0028);_r0028.y=dot(invTransform[1],_v0028);_UV1=tz_TexCoord[0].xy+_r0028*strength;_ret_0=texture2D(inputTexture0,_UV1);gl_FragColor=_ret_0;}"
        }
    }
}

