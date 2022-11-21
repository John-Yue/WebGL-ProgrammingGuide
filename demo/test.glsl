mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord.xy -.5 *iResolution.xy)/iResolution.y;
    
    vec3 col = vec3(0.);

    float aa=0.,rnd;
    for(aa=0.;aa++<4.;){
        vec3 p,d=normalize(vec3(uv,1.));
        for(float i=0.,e,g=0.;i++<99.;){
            vec3 p = d*g,op=p;
            p.xy+=rnd=sqrt(i)*fract(tan(445.887*sin(dot(vec2(p.xy)*aa,vec2(2425.223,984.401)))))*.03*length(uv);
            p.xz*=rot(iTime*.1+asin(sin(iTime+cos(iTime*2.)))*.5);
          
            p.zx +=iTime;
            p.y -= -2.5+clamp(abs(mod(p.z+p.x,6.)-3.)*.5,0.5,1.5);
            
            p.xz = fract(p.xz)-.5;
            float h =min(length(p.yz),length(p.xy))-.01;
            g+=e=max(.0001,abs(h)*.7);
            col += sqrt(vec3(.7+sin(iTime+op.z)*.5,.5,.5+cos(iTime-op.z*4.)*.2)*.025/exp(i*i*e));
        }
    }
    fragColor = vec4(sqrt(col/aa),1.0);
}