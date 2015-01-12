!function(a,b){"object"==typeof exports?module.exports=b(require("d3")):"function"==typeof define&&define.amd?define(["d3"],b):a.cola=b(a.d3)}(this,function(a){var b;!function(a){var b=function(){function a(){this.locks={}}return a.prototype.add=function(a,b){isNaN(b[0])||isNaN(b[1]),this.locks[a]=b},a.prototype.clear=function(){this.locks={}},a.prototype.isEmpty=function(){for(var a in this.locks)return!1;return!0},a.prototype.apply=function(a){for(var b in this.locks)a(b,this.locks[b])},a}();a.Locks=b;var c=function(){function a(a,c,e){"undefined"==typeof e&&(e=null),this.D=c,this.G=e,this.threshold=1e-4,this.random=new d,this.project=null,this.x=a,this.k=a.length;var f=this.n=a[0].length;this.H=new Array(this.k),this.g=new Array(this.k),this.Hd=new Array(this.k),this.a=new Array(this.k),this.b=new Array(this.k),this.c=new Array(this.k),this.d=new Array(this.k),this.e=new Array(this.k),this.ia=new Array(this.k),this.ib=new Array(this.k),this.xtmp=new Array(this.k),this.locks=new b,this.minD=Number.MAX_VALUE;for(var g,h=f;h--;)for(g=f;--g>h;){var i=c[h][g];i>0&&i<this.minD&&(this.minD=i)}for(this.minD===Number.MAX_VALUE&&(this.minD=1),h=this.k;h--;){for(this.g[h]=new Array(f),this.H[h]=new Array(f),g=f;g--;)this.H[h][g]=new Array(f);this.Hd[h]=new Array(f),this.a[h]=new Array(f),this.b[h]=new Array(f),this.c[h]=new Array(f),this.d[h]=new Array(f),this.e[h]=new Array(f),this.ia[h]=new Array(f),this.ib[h]=new Array(f),this.xtmp[h]=new Array(f)}}return a.createSquareMatrix=function(a,b){for(var c=new Array(a),d=0;a>d;++d){c[d]=new Array(a);for(var e=0;a>e;++e)c[d][e]=b(d,e)}return c},a.prototype.offsetDir=function(){for(var a=this,b=new Array(this.k),c=0,d=0;d<this.k;++d){var e=b[d]=this.random.getNextBetween(.01,1)-.5;c+=e*e}return c=Math.sqrt(c),b.map(function(b){return b*=a.minD/c})},a.prototype.computeDerivatives=function(a){var b=this,c=this.n;if(!(1>c)){for(var d,e=new Array(this.k),f=new Array(this.k),g=new Array(this.k),h=0,i=0;c>i;++i){for(d=0;d<this.k;++d)g[d]=this.g[d][i]=0;for(var j=0;c>j;++j)if(i!==j){for(;;){var k=0;for(d=0;d<this.k;++d){var l=e[d]=a[d][i]-a[d][j];k+=f[d]=l*l}if(k>1e-9)break;var m=this.offsetDir();for(d=0;d<this.k;++d)a[d][j]+=m[d]}var n=Math.sqrt(k),o=this.D[i][j],p=null!=this.G?this.G[i][j]:1;if(p>1&&n>o||!isFinite(o))for(d=0;d<this.k;++d)this.H[d][i][j]=0;else{p>1&&(p=1);var q=o*o,r=p*(n-o)/(q*n),s=-p/(q*n*n*n);for(isFinite(r)||console.log(r),d=0;d<this.k;++d)this.g[d][i]+=e[d]*r,g[d]-=this.H[d][i][j]=s*(o*(f[d]-k)+n*k)}}for(d=0;d<this.k;++d)h=Math.max(h,this.H[d][i][i]=g[d])}this.locks.isEmpty()||this.locks.apply(function(c,e){for(d=0;d<b.k;++d)b.H[d][c][c]+=h,b.g[d][c]-=h*(e[d]-a[d][c])})}},a.dotProd=function(a,b){for(var c=0,d=a.length;d--;)c+=a[d]*b[d];return c},a.rightMultiply=function(b,c,d){for(var e=b.length;e--;)d[e]=a.dotProd(b[e],c)},a.prototype.computeStepSize=function(b){for(var c=0,d=0,e=0;2>e;++e)c+=a.dotProd(this.g[e],b[e]),a.rightMultiply(this.H[e],b[e],this.Hd[e]),d+=a.dotProd(b[e],this.Hd[e]);return 0!==d&&isFinite(d)?c/d:0},a.prototype.reduceStress=function(){this.computeDerivatives(this.x);for(var a=this.computeStepSize(this.g),b=0;b<this.k;++b)this.takeDescentStep(this.x[b],this.g[b],a);return this.computeStress()},a.copy=function(a,b){for(var c=a.length,d=b[0].length,e=0;c>e;++e)for(var f=0;d>f;++f)b[e][f]=a[e][f]},a.prototype.stepAndProject=function(b,c,d,e){a.copy(b,c),this.takeDescentStep(c[0],d[0],e),this.project&&this.project[0](b[0],b[1],c[0]),this.takeDescentStep(c[1],d[1],e),this.project&&this.project[1](c[0],b[1],c[1])},a.mApply=function(a,b,c){for(var d=a;d-->0;)for(var e=b;e-->0;)c(d,e)},a.prototype.matrixApply=function(b){a.mApply(this.k,this.n,b)},a.prototype.computeNextPosition=function(a,b){var c=this;this.computeDerivatives(a);var d=this.computeStepSize(this.g);this.stepAndProject(a,b,this.g,d);for(var e=0;e<this.n;++e)for(var f=0;f<this.k;++f)isNaN(b[f][e]);if(this.project){this.matrixApply(function(d,e){return c.e[d][e]=a[d][e]-b[d][e]});var g=this.computeStepSize(this.e);g=Math.max(.2,Math.min(g,1)),this.stepAndProject(a,b,this.e,g)}},a.prototype.run=function(a){for(var b=Number.MAX_VALUE,c=!1;!c&&a-->0;){var d=this.rungeKutta();c=Math.abs(b/d-1)<this.threshold,b=d}return b},a.prototype.rungeKutta=function(){var b=this;return this.computeNextPosition(this.x,this.a),a.mid(this.x,this.a,this.ia),this.computeNextPosition(this.ia,this.b),a.mid(this.x,this.b,this.ib),this.computeNextPosition(this.ib,this.c),this.computeNextPosition(this.c,this.d),this.matrixApply(function(a,c){return b.x[a][c]=(b.a[a][c]+2*b.b[a][c]+2*b.c[a][c]+b.d[a][c])/6}),this.computeStress()},a.mid=function(b,c,d){a.mApply(b.length,b[0].length,function(a,e){return d[a][e]=b[a][e]+(c[a][e]-b[a][e])/2})},a.prototype.takeDescentStep=function(a,b,c){for(var d=0;d<this.n;++d)a[d]=a[d]-c*b[d]},a.prototype.computeStress=function(){for(var a=0,b=0,c=this.n-1;c>b;++b)for(var d=b+1,e=this.n;e>d;++d){for(var f=0,g=0;g<this.k;++g){var h=this.x[g][b]-this.x[g][d];f+=h*h}f=Math.sqrt(f);var i=this.D[b][d];if(isFinite(i)){var j=i-f,k=i*i;a+=j*j/k}}return a},a.zeroDistance=1e-10,a}();a.Descent=c;var d=function(){function a(a){"undefined"==typeof a&&(a=1),this.seed=a,this.a=214013,this.c=2531011,this.m=2147483648,this.range=32767}return a.prototype.getNext=function(){return this.seed=(this.seed*this.a+this.c)%this.m,(this.seed>>16)/this.range},a.prototype.getNextBetween=function(a,b){return a+this.getNext()*(b-a)},a}();a.PseudoRandom=d}(b||(b={}));var c,d=this.__extends||function(a,b){function c(){this.constructor=a}for(var d in b)b.hasOwnProperty(d)&&(a[d]=b[d]);c.prototype=b.prototype,a.prototype=new c};!function(a){function b(a,b,c){return(b.x-a.x)*(c.y-a.y)-(c.x-a.x)*(b.y-a.y)}function c(a,c,d){return b(a,c,d)>0}function e(a,c,d){return b(a,c,d)<0}function g(a){var c,d=a.slice(0).sort(function(a,b){return a.x!==b.x?b.x-a.x:b.y-a.y}),e=a.length,f=0,g=d[0].x;for(c=1;e>c&&d[c].x===g;++c);var h=c-1,i=[];if(i.push(d[f]),h===e-1)d[h].y!==d[f].y&&i.push(d[h]);else{var j,k=e-1,l=d[e-1].x;for(c=e-2;c>=0&&d[c].x===l;c--);for(j=c+1,c=h;++c<=j;)if(!(b(d[f],d[j],d[c])>=0&&j>c)){for(;i.length>1&&!(b(i[i.length-2],i[i.length-1],d[c])>0);)i.length-=1;c!=f&&i.push(d[c])}k!=j&&i.push(d[k]);var m=i.length;for(c=j;--c>=h;)if(!(b(d[k],d[h],d[c])>=0&&c>h)){for(;i.length>m&&!(b(i[i.length-2],i[i.length-1],d[c])>0);)i.length-=1;c!=f&&i.push(d[c])}}return i}function h(a,b,c){b.slice(0).sort(function(b,c){return Math.atan2(b.y-a.y,b.x-a.x)-Math.atan2(c.y-a.y,c.x-a.x)}).forEach(c)}function i(a,b){return{rtan:j(a,b),ltan:k(a,b)}}function j(a,b){var d,f,g,h,i,j=b.length-1;if(e(a,b[1],b[0])&&!c(a,b[j-1],b[0]))return 0;for(d=0,f=j;;){if(f-d===1)return c(a,b[d],b[f])?d:f;if(g=Math.floor((d+f)/2),i=e(a,b[g+1],b[g]),i&&!c(a,b[g-1],b[g]))return g;h=c(a,b[d+1],b[d]),h?i?f=g:c(a,b[d],b[g])?f=g:d=g:i?e(a,b[d],b[g])?f=g:d=g:d=g}}function k(a,b){var d,f,g,h,i,j=b.length-1;if(c(a,b[j-1],b[0])&&!e(a,b[1],b[0]))return 0;for(d=0,f=j;;){if(f-d===1)return e(a,b[d],b[f])?d:f;if(g=Math.floor((d+f)/2),i=e(a,b[g+1],b[g]),c(a,b[g-1],b[g])&&!i)return g;h=e(a,b[d+1],b[d]),h?i?e(a,b[d],b[g])?f=g:d=g:f=g:i?d=g:c(a,b[d],b[g])?f=g:d=g}}function l(a,b,c,d,e,f){var g,h;g=c(b[0],a),h=d(a[g],b);for(var i=!1;!i;){for(i=!0;;){if(g===a.length-1&&(g=0),e(b[h],a[g],a[g+1]))break;++g}for(;;){if(0===h&&(h=b.length-1),f(a[g],b[h],b[h-1]))break;--h,i=!1}}return{t1:g,t2:h}}function m(a,b){var c=n(b,a);return{t1:c.t2,t2:c.t1}}function n(a,b){return l(a,b,j,k,c,e)}function o(a,b){return l(a,b,k,k,e,e)}function p(a,b){return l(a,b,j,j,c,c)}function q(a,b){for(var c=[],d=1,e=b.length;e>d;++d){var g=f.Rectangle.lineIntersection(a.x1,a.y1,a.x2,a.y2,b[d-1].x,b[d-1].y,b[d].x,b[d].y);g&&c.push(g)}return c}function r(a,c){for(var d=a.length-1,e=c.length-1,f=new z,g=0;d>g;++g)for(var h=0;e>h;++h){var i=a[0==g?d-1:g-1],j=a[g],k=a[g+1],l=c[0==h?e-1:h-1],m=c[h],n=c[h+1],o=b(i,j,m),p=b(j,l,m),q=b(j,m,n),r=b(l,m,j),s=b(m,i,j),t=b(m,j,k);o>=0&&p>=0&&0>q&&r>=0&&s>=0&&0>t?f.ll=new y(g,h):0>=o&&0>=p&&q>0&&0>=r&&0>=s&&t>0?f.rr=new y(g,h):0>=o&&p>0&&0>=q&&r>=0&&0>s&&t>=0?f.rl=new y(g,h):o>=0&&0>p&&q>=0&&0>=r&&s>0&&0>=t&&(f.lr=new y(g,h))}return f}function s(a,b){for(var c=1,d=b.length;d>c;++c)if(e(b[c-1],b[c],a))return!1;return!0}function t(a,b){return!a.every(function(a){return!s(a,b)})}function u(a,b){if(t(a,b))return!0;if(t(b,a))return!0;for(var c=1,d=a.length;d>c;++c){var e=a[c],f=a[c-1];if(q(new w(f.x,f.y,e.x,e.y),b).length>0)return!0}return!1}var v=function(){function a(){}return a}();a.Point=v;var w=function(){function a(a,b,c,d){this.x1=a,this.y1=b,this.x2=c,this.y2=d}return a}();a.LineSegment=w;var x=function(a){function b(){a.apply(this,arguments)}return d(b,a),b}(v);a.PolyPoint=x,a.isLeft=b,a.ConvexHull=g,a.clockwiseRadialSweep=h,a.tangent_PolyPolyC=l,a.LRtangent_PolyPolyC=m,a.RLtangent_PolyPolyC=n,a.LLtangent_PolyPolyC=o,a.RRtangent_PolyPolyC=p;var y=function(){function a(a,b){this.t1=a,this.t2=b}return a}();a.BiTangent=y;var z=function(){function a(){}return a}();a.BiTangents=z;var A=function(a){function b(){a.apply(this,arguments)}return d(b,a),b}(v);a.TVGPoint=A;var B=function(){function a(a,b,c,d){this.id=a,this.polyid=b,this.polyvertid=c,this.p=d,d.vv=this}return a}();a.VisibilityVertex=B;var C=function(){function a(a,b){this.source=a,this.target=b}return a.prototype.length=function(){var a=this.source.p.x-this.target.p.x,b=this.source.p.y-this.target.p.y;return Math.sqrt(a*a+b*b)},a}();a.VisibilityEdge=C;var D=function(){function b(b,c){if(this.P=b,this.V=[],this.E=[],c)this.V=c.V.slice(0),this.E=c.E.slice(0);else{for(var d=b.length,e=0;d>e;e++)for(var f=b[e],g=0;g<f.length;++g){var h=f[g],i=new B(this.V.length,e,g,h);this.V.push(i),g>0&&this.E.push(new C(f[g-1].vv,i))}for(var e=0;d-1>e;e++)for(var j=b[e],g=e+1;d>g;g++){var k=b[g],l=a.tangents(j,k);for(var m in l){var n=l[m],o=j[n.t1],p=k[n.t2];this.addEdgeIfVisible(o,p,e,g)}}}}return b.prototype.addEdgeIfVisible=function(a,b,c,d){this.intersectsPolys(new w(a.x,a.y,b.x,b.y),c,d)||this.E.push(new C(a.vv,b.vv))},b.prototype.addPoint=function(a,b){var c=this.P.length;this.V.push(new B(this.V.length,c,0,a));for(var d=0;c>d;++d)if(d!==b){var e=this.P[d],f=i(a,e);this.addEdgeIfVisible(a,e[f.ltan],b,d),this.addEdgeIfVisible(a,e[f.rtan],b,d)}return a.vv},b.prototype.intersectsPolys=function(a,b,c){for(var d=0,e=this.P.length;e>d;++d)if(d!=b&&d!=c&&q(a,this.P[d]).length>0)return!0;return!1},b}();a.TangentVisibilityGraph=D,a.tangents=r,a.polysOverlap=u}(c||(c={}));var b;!function(a){function b(a,b){var c={};for(var d in a)c[d]={};for(var d in b)c[d]={};return Object.keys(c).length}function c(a,b){var c=0;for(var d in a)"undefined"!=typeof b[d]&&++c;return c}function d(a,b,c,d){for(var e=new Array(a),f=0;a>f;++f)e[f]={};return b.forEach(function(a){e[c(a)][d(a)]={},e[d(a)][c(a)]={}}),e}function e(a,b,c,e,f,g,h){var i=d(a,b,f,g);b.forEach(function(a){var b=i[f(a)],d=i[g(a)];h(a,1+c*e(b,d))})}function f(a,d,f,g,h,i){"undefined"==typeof i&&(i=1),e(a,d,i,function(a,d){return Math.sqrt(b(a,d)-c(a,d))},f,g,h)}function g(a,d,f,g,h,i){"undefined"==typeof i&&(i=1),e(a,d,i,function(a,d){return Math.min(Object.keys(a).length,Object.keys(d).length)<1.1?0:c(a,d)/b(a,d)},f,g,h)}function h(a,b,c,d,e,f){var g=i(a,b,e,f),h={};g.filter(function(a){return a.length>1}).forEach(function(a){return a.forEach(function(b){return h[b]=a})});var j=[];return b.forEach(function(a){var b=h[e(a)],g=h[f(a)];b&&g&&b.component===g.component||j.push({axis:c,left:e(a),right:f(a),gap:d(a)})}),j}function i(a,b,c,d){function e(a){g[a]=k,h[a]=k,i[a]=!0,k+=1,l.push(a);for(var b=f[a],c=0;c<b.length;++c){var d=b[c];g[d]<0?(e(d),h[a]=0|Math.min(h[a],h[d])):i[d]&&(h[a]=Math.min(h[a],h[d]))}if(h[a]===g[a]){for(var j=[],c=l.length-1;c>=0;--c){var n=l[c];if(i[n]=!1,j.push(n),n===a){l.length=c;break}}m.push(j)}}for(var f=new Array(a),g=new Array(a),h=new Array(a),i=new Array(a),j=0;a>j;++j)f[j]=[],g[j]=-1,h[j]=0,i[j]=!1;for(var j=0;j<b.length;++j)f[c(b[j])].push(d(b[j]));for(var k=0,l=[],m=[],j=0;a>j;++j)g[j]<0&&e(j);return m}a.symmetricDiffLinkLengths=f,a.jaccardLinkLengths=g,a.generateDirectedEdgeConstraints=h}(b||(b={}));var e;!function(a){function b(a,c){for(var d in a){var e=a[d];e.getEdges(c),b(e.children,c)}}function c(a,b,d){for(var e in a){var f=a[e];if(f.isLeaf())b.leaves||(b.leaves=[]),b.leaves.push(f.id);else{var g=b;f.gid=d.length,f.isIsland()||(g={id:f.gid},b.groups||(b.groups=[]),b.groups.push(f.gid),d.push(g)),c(f.children,g,d)}}}function d(a,b){var c={};for(var d in a)d in b&&(c[d]=a[d]);return c}function e(a,b){return Object.keys(d(a,b)).length}function f(b,c){for(var d=b.length,e=new a.Configuration(d,c);e.greedyMerge(););var f=[],g=e.getGroupHierarchy(f);return f.forEach(function(a){var c=function(c){var d=a[c];"number"==typeof d&&(a[c]=b[d])};c("source"),c("target")}),{groups:g,powerEdges:f}}var g=function(){function a(a,b){var c=this;this.modules=new Array(a),this.roots=new Array(a);for(var d=0;a>d;++d)this.roots[d]=this.modules[d]=new h(d,{},{},{});this.R=b.length,b.forEach(function(a){var b=c.modules[a.source],d=c.modules[a.target];b.outgoing[d.id]=d,d.incoming[b.id]=b})}return a.prototype.merge=function(a,b){var c=d(a.incoming,b.incoming),e=d(a.outgoing,b.outgoing),f={};f[a.id]=a,f[b.id]=b;var g=new h(this.modules.length,e,c,f);this.modules.push(g);var i=function(c,d,e){for(var f in c){var h=c[f];h[d][g.id]=g,delete h[d][a.id],delete h[d][b.id],delete a[e][f],delete b[e][f]}};return i(e,"incoming","outgoing"),i(c,"outgoing","incoming"),this.R-=Object.keys(c).length+Object.keys(e).length,delete this.roots[a.id],delete this.roots[b.id],this.roots[g.id]=g,g},a.prototype.rootMerges=function(){for(var a=Object.keys(this.roots),b=a.length,c=new Array(b*(b-1)),d=0,e=0,f=b-1;f>e;++e)for(var g=e+1;b>g;++g){var h=this.roots[a[e]],i=this.roots[a[g]];c[d++]={nEdges:this.nEdges(h,i),a:h,b:i}}return c},a.prototype.greedyMerge=function(){var a=this.rootMerges().sort(function(a,b){return a.nEdges-b.nEdges}),b=a[0];return b.nEdges>=this.R?!1:(this.merge(b.a,b.b),!0)},a.prototype.nEdges=function(a,b){return this.R-e(a.outgoing,b.outgoing)-e(a.incoming,b.incoming)},a.prototype.getGroupHierarchy=function(a){var b=this,d=[],e={};c(this.roots,e,d);var f=this.allEdges();return f.forEach(function(c){var e=b.modules[c.source],f=b.modules[c.target];a.push({source:c.source="undefined"==typeof e.gid?c.source:d[e.gid],target:c.target="undefined"==typeof f.gid?c.target:d[f.gid]})}),d},a.prototype.allEdges=function(){var a=[];return b(this.roots,a),a},a}();a.Configuration=g;var h=function(){function a(a,b,c,d){this.id=a,this.outgoing=b,this.incoming=c,this.children=d}return a.prototype.getEdges=function(a){for(var b in this.outgoing)a.push({source:this.id,target:this.outgoing[b].id})},a.prototype.isLeaf=function(){return 0==Object.keys(this.children).length},a.prototype.isIsland=function(){return 0==Object.keys(this.outgoing).length&&0==Object.keys(this.incoming).length},a}();a.Module=h,a.getGroups=f}(e||(e={}));var f,g=function(){function a(a){this.elem=a,this.subheaps=[]}return a.prototype.toString=function(a){for(var b="",c=!1,d=0;d<this.subheaps.length;++d){var e=this.subheaps[d];e.elem?(c&&(b+=","),b+=e.toString(a),c=!0):c=!1}return""!==b&&(b="("+b+")"),(this.elem?a(this.elem):"")+b},a.prototype.forEach=function(a){this.empty()||(a(this.elem,this),this.subheaps.forEach(function(b){return b.forEach(a)}))},a.prototype.count=function(){return this.empty()?0:1+this.subheaps.reduce(function(a,b){return a+b.count()},0)},a.prototype.min=function(){return this.elem},a.prototype.empty=function(){return null==this.elem},a.prototype.contains=function(a){if(this===a)return!0;for(var b=0;b<this.subheaps.length;b++)if(this.subheaps[b].contains(a))return!0;return!1},a.prototype.isHeap=function(a){var b=this;return this.subheaps.every(function(c){return a(b.elem,c.elem)&&c.isHeap(a)})},a.prototype.insert=function(b,c){return this.merge(new a(b),c)},a.prototype.merge=function(a,b){return this.empty()?a:a.empty()?this:b(this.elem,a.elem)?(this.subheaps.push(a),this):(a.subheaps.push(this),a)},a.prototype.removeMin=function(a){return this.empty()?null:this.mergePairs(a)},a.prototype.mergePairs=function(b){if(0==this.subheaps.length)return new a(null);if(1==this.subheaps.length)return this.subheaps[0];var c=this.subheaps.pop().merge(this.subheaps.pop(),b),d=this.mergePairs(b);return c.merge(d,b)},a.prototype.decreaseKey=function(b,c,d,e){var f=b.removeMin(e);b.elem=f.elem,b.subheaps=f.subheaps,null!==d&&null!==f.elem&&d(b.elem,b);var g=new a(c);return null!==d&&d(c,g),this.merge(g,e)},a}(),h=function(){function a(a){this.lessThan=a}return a.prototype.top=function(){return this.empty()?null:this.root.elem},a.prototype.push=function(){for(var a=[],b=0;b<arguments.length-0;b++)a[b]=arguments[b+0];for(var c,d,e=0;d=a[e];++e)c=new g(d),this.root=this.empty()?c:this.root.merge(c,this.lessThan);return c},a.prototype.empty=function(){return!this.root||!this.root.elem},a.prototype.isHeap=function(){return this.root.isHeap(this.lessThan)},a.prototype.forEach=function(a){this.root.forEach(a)},a.prototype.pop=function(){if(this.empty())return null;var a=this.root.min();return this.root=this.root.removeMin(this.lessThan),a},a.prototype.reduceKey=function(a,b,c){"undefined"==typeof c&&(c=null),this.root=this.root.decreaseKey(a,b,c,this.lessThan)},a.prototype.toString=function(a){return this.root.toString(a)},a.prototype.count=function(){return this.root.count()},a}();!function(a){var b=function(){function a(a){this.scale=a,this.AB=0,this.AD=0,this.A2=0}return a.prototype.addVariable=function(a){var b=this.scale/a.scale,c=a.offset/a.scale,d=a.weight;this.AB+=d*b*c,this.AD+=d*b*a.desiredPosition,this.A2+=d*b*b},a.prototype.getPosn=function(){return(this.AD-this.AB)/this.A2},a}();a.PositionStats=b;var c=function(){function a(a,b,c,d){"undefined"==typeof d&&(d=!1),this.left=a,this.right=b,this.gap=c,this.equality=d,this.active=!1,this.unsatisfiable=!1,this.left=a,this.right=b,this.gap=c,this.equality=d}return a.prototype.slack=function(){return this.unsatisfiable?Number.MAX_VALUE:this.right.scale*this.right.position()-this.gap-this.left.scale*this.left.position()},a}();a.Constraint=c;var d=function(){function a(a,b,c){"undefined"==typeof b&&(b=1),"undefined"==typeof c&&(c=1),this.desiredPosition=a,this.weight=b,this.scale=c,this.offset=0}return a.prototype.dfdv=function(){return 2*this.weight*(this.position()-this.desiredPosition)},a.prototype.position=function(){return(this.block.ps.scale*this.block.posn+this.offset)/this.scale},a.prototype.visitNeighbours=function(a,b){var c=function(c,d){return c.active&&a!==d&&b(c,d)};this.cOut.forEach(function(a){return c(a,a.right)}),this.cIn.forEach(function(a){return c(a,a.left)})},a}();a.Variable=d;var e=function(){function a(a){this.vars=[],a.offset=0,this.ps=new b(a.scale),this.addVariable(a)}return a.prototype.addVariable=function(a){a.block=this,this.vars.push(a),this.ps.addVariable(a),this.posn=this.ps.getPosn()},a.prototype.updateWeightedPosition=function(){this.ps.AB=this.ps.AD=this.ps.A2=0;for(var a=0,b=this.vars.length;b>a;++a)this.ps.addVariable(this.vars[a]);this.posn=this.ps.getPosn()},a.prototype.compute_lm=function(a,b,c){var d=this,e=a.dfdv();return a.visitNeighbours(b,function(b,f){var g=d.compute_lm(f,a,c);f===b.right?(e+=g*b.left.scale,b.lm=g):(e+=g*b.right.scale,b.lm=-g),c(b)}),e/a.scale},a.prototype.populateSplitBlock=function(a,b){var c=this;a.visitNeighbours(b,function(b,d){d.offset=a.offset+(d===b.right?b.gap:-b.gap),c.addVariable(d),c.populateSplitBlock(d,a)})},a.prototype.traverse=function(a,b,c,d){"undefined"==typeof c&&(c=this.vars[0]),"undefined"==typeof d&&(d=null);var e=this;c.visitNeighbours(d,function(d,f){b.push(a(d)),e.traverse(a,b,f,c)})},a.prototype.findMinLM=function(){var a=null;return this.compute_lm(this.vars[0],null,function(b){!b.equality&&(null===a||b.lm<a.lm)&&(a=b)}),a},a.prototype.findMinLMBetween=function(a,b){this.compute_lm(a,null,function(){});var c=null;return this.findPath(a,null,b,function(a,b){!a.equality&&a.right===b&&(null===c||a.lm<c.lm)&&(c=a)}),c},a.prototype.findPath=function(a,b,c,d){var e=this,f=!1;return a.visitNeighbours(b,function(b,g){f||g!==c&&!e.findPath(g,a,c,d)||(f=!0,d(b,g))}),f},a.prototype.isActiveDirectedPathBetween=function(a,b){if(a===b)return!0;for(var c=a.cOut.length;c--;){var d=a.cOut[c];if(d.active&&this.isActiveDirectedPathBetween(d.right,b))return!0}return!1},a.split=function(b){return b.active=!1,[a.createSplitBlock(b.left),a.createSplitBlock(b.right)]},a.createSplitBlock=function(b){var c=new a(b);return c.populateSplitBlock(b,null),c},a.prototype.splitBetween=function(b,c){var d=this.findMinLMBetween(b,c);if(null!==d){var e=a.split(d);return{constraint:d,lb:e[0],rb:e[1]}}return null},a.prototype.mergeAcross=function(a,b,c){b.active=!0;for(var d=0,e=a.vars.length;e>d;++d){var f=a.vars[d];f.offset+=c,this.addVariable(f)}this.posn=this.ps.getPosn()},a.prototype.cost=function(){for(var a=0,b=this.vars.length;b--;){var c=this.vars[b],d=c.position()-c.desiredPosition;a+=d*d*c.weight}return a},a}();a.Block=e;var f=function(){function a(a){this.vs=a;var b=a.length;for(this.list=new Array(b);b--;){var c=new e(a[b]);this.list[b]=c,c.blockInd=b}}return a.prototype.cost=function(){for(var a=0,b=this.list.length;b--;)a+=this.list[b].cost();return a},a.prototype.insert=function(a){a.blockInd=this.list.length,this.list.push(a)},a.prototype.remove=function(a){var b=this.list.length-1,c=this.list[b];this.list.length=b,a!==c&&(this.list[a.blockInd]=c,c.blockInd=a.blockInd)},a.prototype.merge=function(a){var b=a.left.block,c=a.right.block,d=a.right.offset-a.left.offset-a.gap;b.vars.length<c.vars.length?(c.mergeAcross(b,a,d),this.remove(b)):(b.mergeAcross(c,a,-d),this.remove(c))},a.prototype.forEach=function(a){this.list.forEach(a)},a.prototype.updateBlockPositions=function(){this.list.forEach(function(a){return a.updateWeightedPosition()})},a.prototype.split=function(a){var b=this;this.updateBlockPositions(),this.list.forEach(function(c){var d=c.findMinLM();null!==d&&d.lm<g.LAGRANGIAN_TOLERANCE&&(c=d.left.block,e.split(d).forEach(function(a){return b.insert(a)}),b.remove(c),a.push(d))})},a}();a.Blocks=f;var g=function(){function a(a,b){this.vs=a,this.cs=b,this.vs=a,a.forEach(function(a){a.cIn=[],a.cOut=[]}),this.cs=b,b.forEach(function(a){a.left.cOut.push(a),a.right.cIn.push(a)}),this.inactive=b.map(function(a){return a.active=!1,a}),this.bs=null}return a.prototype.cost=function(){return this.bs.cost()},a.prototype.setStartingPositions=function(a){this.inactive=this.cs.map(function(a){return a.active=!1,a}),this.bs=new f(this.vs),this.bs.forEach(function(b,c){return b.posn=a[c]})},a.prototype.setDesiredPositions=function(a){this.vs.forEach(function(b,c){return b.desiredPosition=a[c]})},a.prototype.mostViolated=function(){for(var b=Number.MAX_VALUE,c=null,d=this.inactive,e=d.length,f=e,g=0;e>g;++g){var h=d[g];if(!h.unsatisfiable){var i=h.slack();if((h.equality||b>i)&&(b=i,c=h,f=g,h.equality))break}}return f!==e&&(b<a.ZERO_UPPERBOUND&&!c.active||c.equality)&&(d[f]=d[e-1],d.length=e-1),c},a.prototype.satisfy=function(){null==this.bs&&(this.bs=new f(this.vs)),this.bs.split(this.inactive);for(var b=null;(b=this.mostViolated())&&(b.equality||b.slack()<a.ZERO_UPPERBOUND&&!b.active);){var c=b.left.block,d=b.right.block;if(c!==d)this.bs.merge(b);else{if(c.isActiveDirectedPathBetween(b.right,b.left)){b.unsatisfiable=!0;continue}var e=c.splitBetween(b.left,b.right);if(null===e){b.unsatisfiable=!0;continue}this.bs.insert(e.lb),this.bs.insert(e.rb),this.bs.remove(c),this.inactive.push(e.constraint),b.slack()>=0?this.inactive.push(b):this.bs.merge(b)}}},a.prototype.solve=function(){this.satisfy();for(var a=Number.MAX_VALUE,b=this.bs.cost();Math.abs(a-b)>1e-4;)this.satisfy(),a=b,b=this.bs.cost();return b},a.LAGRANGIAN_TOLERANCE=-1e-4,a.ZERO_UPPERBOUND=-1e-10,a}();a.Solver=g}(f||(f={}));var f;!function(a){function b(a){return a.bounds=a.leaves.reduce(function(a,b){return b.bounds.union(a)},q.empty()),"undefined"!=typeof a.groups&&(a.bounds=a.groups.reduce(function(a,c){return b(c).union(a)},a.bounds)),"undefined"!=typeof a.padding&&(a.bounds=a.bounds.inflate(a.padding)),a.bounds}function c(a,b,c,d){var e=b.rayIntersection(c.cx(),c.cy());e||(e={x:b.cx(),y:b.cy()});var f=c.rayIntersection(b.cx(),b.cy());f||(f={x:c.cx(),y:c.cy()});var g=f.x-e.x,h=f.y-e.y,i=Math.sqrt(g*g+h*h),j=i-d;a.sourceIntersection=e,a.targetIntersection=f,a.arrowStart={x:e.x+j*g/i,y:e.y+j*h/i}}function e(a,b,c){var d=b.rayIntersection(a.x,a.y);d||(d={x:b.cx(),y:b.cy()});var e=d.x-a.x,f=d.y-a.y,g=Math.sqrt(e*e+f*f);return{x:d.x-c*e/g,y:d.y-c*f/g}}function f(a,b){return a.pos>b.pos?1:a.pos<b.pos?-1:a.isOpen?-1:0}function g(){return new RBTree(function(a,b){return a.pos-b.pos})}function h(a,b,c,d){"undefined"==typeof d&&(d=!1);var e="undefined"==typeof a.padding?1:a.padding,f="undefined"!=typeof a.groups?a.groups.length:0,g="undefined"!=typeof a.leaves?a.leaves.length:0,j=f?a.groups.reduce(function(a,d){return a.concat(h(d,b,c,!0))},[]):[],k=(d?2:0)+g+f,l=new Array(k),m=new Array(k),n=0,o=function(a,b){m[n]=a,l[n++]=b};if(d){var p=a.bounds,q=b.getCentre(p),r=b.getSize(p)/2,s=b.getOpen(p),t=b.getClose(p),u=q-r+e/2,v=q+r-e/2;a.minVar.desiredPosition=u,o(b.makeRect(s,t,u,e),a.minVar),a.maxVar.desiredPosition=v,o(b.makeRect(s,t,v,e),a.maxVar)}g&&a.leaves.forEach(function(a){return o(a.bounds,a.variable)}),f&&a.groups.forEach(function(a){var c=a.bounds;o(b.makeRect(b.getOpen(c),b.getClose(c),b.getCentre(c),b.getSize(c)),a.minVar)});var w=i(m,l,b,c);return f&&(l.forEach(function(a){a.cOut=[],a.cIn=[]}),w.forEach(function(a){a.left.cOut.push(a),a.right.cIn.push(a)}),a.groups.forEach(function(a){var c=(a.padding-b.getSize(a.bounds))/2;a.minVar.cIn.forEach(function(a){return a.gap+=c}),a.minVar.cOut.forEach(function(b){b.left=a.maxVar,b.gap+=c})})),j.concat(w)}function i(b,c,d,e){var h,i=b.length,j=2*i;console.assert(c.length>=i);var k=new Array(j);for(h=0;i>h;++h){var l=b[h],m=new r(c[h],l,d.getCentre(l));k[h]=new s(!0,m,d.getOpen(l)),k[h+i]=new s(!1,m,d.getClose(l))}k.sort(f);var n=new Array,o=g();for(h=0;j>h;++h){var p=k[h],m=p.v;if(p.isOpen)o.insert(m),d.findNeighbours(m,o);else{o.remove(m);var q=function(b,c){var f=(d.getSize(b.r)+d.getSize(c.r))/2+e;n.push(new a.Constraint(b.v,c.v,f))},t=function(a,b,c){for(var d,e=m[a].iterator();null!==(d=e[a]());)c(d,m),d[b].remove(m)};t("prev","next",function(a,b){return q(a,b)}),t("next","prev",function(a,b){return q(b,a)})}}return console.assert(0===o.size),n}function j(a,b){var c=function(c,d){for(var e,f=b.findIter(a);null!==(e=f[c]());){var g=e.r.overlapX(a.r);if((0>=g||g<=e.r.overlapY(a.r))&&(a[c].insert(e),e[d].insert(a)),0>=g)break}};c("next","prev"),c("prev","next")}function k(a,b){var c=function(c,d){var e=b.findIter(a)[c]();null!==e&&e.r.overlapX(a.r)>0&&(a[c].insert(e),e[d].insert(a))};c("next","prev"),c("prev","next")}function l(a,b){return i(a,b,t,1e-6)}function m(a,b){return i(a,b,u,1e-6)}function n(a){return h(a,t,1e-6)}function o(a){return h(a,u,1e-6)}function p(b){var c=b.map(function(b){return new a.Variable(b.cx())}),d=a.generateXConstraints(b,c),e=new a.Solver(c,d);e.solve(),c.forEach(function(a,c){return b[c].setXCentre(a.position())}),c=b.map(function(b){return new a.Variable(b.cy())}),d=a.generateYConstraints(b,c),e=new a.Solver(c,d),e.solve(),c.forEach(function(a,c){return b[c].setYCentre(a.position())})}a.computeGroupBounds=b;var q=function(){function a(a,b,c,d){this.x=a,this.X=b,this.y=c,this.Y=d}return a.empty=function(){return new a(Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY)},a.prototype.cx=function(){return(this.x+this.X)/2},a.prototype.cy=function(){return(this.y+this.Y)/2},a.prototype.overlapX=function(a){var b=this.cx(),c=a.cx();return c>=b&&a.x<this.X?this.X-a.x:b>=c&&this.x<a.X?a.X-this.x:0},a.prototype.overlapY=function(a){var b=this.cy(),c=a.cy();return c>=b&&a.y<this.Y?this.Y-a.y:b>=c&&this.y<a.Y?a.Y-this.y:0},a.prototype.setXCentre=function(a){var b=a-this.cx();this.x+=b,this.X+=b},a.prototype.setYCentre=function(a){var b=a-this.cy();this.y+=b,this.Y+=b},a.prototype.width=function(){return this.X-this.x},a.prototype.height=function(){return this.Y-this.y},a.prototype.union=function(b){return new a(Math.min(this.x,b.x),Math.max(this.X,b.X),Math.min(this.y,b.y),Math.max(this.Y,b.Y))},a.prototype.lineIntersections=function(b,c,d,e){for(var f=[[this.x,this.y,this.X,this.y],[this.X,this.y,this.X,this.Y],[this.X,this.Y,this.x,this.Y],[this.x,this.Y,this.x,this.y]],g=[],h=0;4>h;++h){var i=a.lineIntersection(b,c,d,e,f[h][0],f[h][1],f[h][2],f[h][3]);null!==i&&g.push({x:i.x,y:i.y})}return g},a.prototype.rayIntersection=function(a,b){var c=this.lineIntersections(this.cx(),this.cy(),a,b);return c.length>0?c[0]:null},a.prototype.vertices=function(){return[{x:this.x,y:this.y},{x:this.X,y:this.y},{x:this.X,y:this.Y},{x:this.x,y:this.Y},{x:this.x,y:this.y}]},a.lineIntersection=function(a,b,c,d,e,f,g,h){var i=c-a,j=g-e,k=d-b,l=h-f,m=l*i-j*k;if(0==m)return null;var n=a-e,o=b-f,p=j*o-l*n,q=p/m,r=i*o-k*n,s=r/m;return q>=0&&1>=q&&s>=0&&1>=s?{x:a+q*i,y:b+q*k}:null},a.prototype.inflate=function(b){return new a(this.x-b,this.X+b,this.y-b,this.Y+b)},a}();a.Rectangle=q,a.makeEdgeBetween=c,a.makeEdgeTo=e;var r=function(){function a(a,b,c){this.v=a,this.r=b,this.pos=c,this.prev=g(),this.next=g()}return a}(),s=function(){function a(a,b,c){this.isOpen=a,this.v=b,this.pos=c}return a}(),t={getCentre:function(a){return a.cx()},getOpen:function(a){return a.y},getClose:function(a){return a.Y},getSize:function(a){return a.width()},makeRect:function(a,b,c,d){return new q(c-d/2,c+d/2,a,b)},findNeighbours:j},u={getCentre:function(a){return a.cy()},getOpen:function(a){return a.x},getClose:function(a){return a.X},getSize:function(a){return a.height()},makeRect:function(a,b,c,d){return new q(a,b,c-d/2,c+d/2)},findNeighbours:k};a.generateXConstraints=l,a.generateYConstraints=m,a.generateXGroupConstraints=n,a.generateYGroupConstraints=o,a.removeOverlaps=p;var v=function(a){function b(b,c){a.call(this,0,c),this.index=b}return d(b,a),b}(a.Variable),w=function(){function c(c,d,e,f,g){"undefined"==typeof e&&(e=null),"undefined"==typeof f&&(f=null),"undefined"==typeof g&&(g=!1);var h=this;if(this.nodes=c,this.groups=d,this.rootGroup=e,this.avoidOverlaps=g,this.variables=c.map(function(a,b){return a.variable=new v(b,1)}),f&&this.createConstraints(f),g&&e&&"undefined"!=typeof e.groups){c.forEach(function(b){if(!b.width||!b.height)return b.bounds=new a.Rectangle(b.x,b.x,b.y,b.y),void 0;var c=b.width/2,d=b.height/2;b.bounds=new a.Rectangle(b.x-c,b.x+c,b.y-d,b.y+d)}),b(e);var i=c.length;d.forEach(function(a){h.variables[i]=a.minVar=new v(i++,.01),h.variables[i]=a.maxVar=new v(i++,.01)})}}return c.prototype.createSeparation=function(b){return new a.Constraint(this.nodes[b.left].variable,this.nodes[b.right].variable,b.gap,"undefined"!=typeof b.equality?b.equality:!1)},c.prototype.makeFeasible=function(a){var b=this;if(this.avoidOverlaps){var c="x",d="width";"x"===a.axis&&(c="y",d="height");var e=a.offsets.map(function(a){return b.nodes[a.node]}).sort(function(a,b){return a[c]-b[c]}),f=null;e.forEach(function(a){f&&(a[c]=f[c]+f[d]+1),f=a})}},c.prototype.createAlignment=function(b){var c=this,d=this.nodes[b.offsets[0].node].variable;this.makeFeasible(b);var e="x"===b.axis?this.xConstraints:this.yConstraints;b.offsets.slice(1).forEach(function(b){var f=c.nodes[b.node].variable;e.push(new a.Constraint(d,f,b.offset,!0))})},c.prototype.createConstraints=function(a){var b=this,c=function(a){return"undefined"==typeof a.type||"separation"===a.type};this.xConstraints=a.filter(function(a){return"x"===a.axis&&c(a)}).map(function(a){return b.createSeparation(a)}),this.yConstraints=a.filter(function(a){return"y"===a.axis&&c(a)}).map(function(a){return b.createSeparation(a)}),a.filter(function(a){return"alignment"===a.type}).forEach(function(a){return b.createAlignment(a)})},c.prototype.setupVariablesAndBounds=function(a,b,c,d){this.nodes.forEach(function(e,f){e.fixed?(e.variable.weight=1e3,c[f]=d(e)):e.variable.weight=1;
var g=(e.width||0)/2,h=(e.height||0)/2,i=a[f],j=b[f];e.bounds=new q(i-g,i+g,j-h,j+h)})},c.prototype.xProject=function(a,b,c){(this.rootGroup||this.avoidOverlaps||this.xConstraints)&&this.project(a,b,a,c,function(a){return a.px},this.xConstraints,n,function(a){return a.bounds.setXCentre(c[a.variable.index]=a.variable.position())},function(a){var b=c[a.minVar.index]=a.minVar.position(),d=c[a.maxVar.index]=a.maxVar.position(),e=a.padding/2;a.bounds.x=b-e,a.bounds.X=d+e})},c.prototype.yProject=function(a,b,c){(this.rootGroup||this.yConstraints)&&this.project(a,b,b,c,function(a){return a.py},this.yConstraints,o,function(a){return a.bounds.setYCentre(c[a.variable.index]=a.variable.position())},function(a){var b=c[a.minVar.index]=a.minVar.position(),d=c[a.maxVar.index]=a.maxVar.position(),e=a.padding/2;a.bounds.y=b-e,a.bounds.Y=d+e})},c.prototype.projectFunctions=function(){var a=this;return[function(b,c,d){return a.xProject(b,c,d)},function(b,c,d){return a.yProject(b,c,d)}]},c.prototype.project=function(a,c,d,e,f,g,h,i,j){this.setupVariablesAndBounds(a,c,e,f),this.rootGroup&&this.avoidOverlaps&&(b(this.rootGroup),g=g.concat(h(this.rootGroup))),this.solve(this.variables,g,d,e),this.nodes.forEach(i),this.rootGroup&&this.avoidOverlaps&&this.groups.forEach(j)},c.prototype.solve=function(b,c,d,e){var f=new a.Solver(b,c);f.setStartingPositions(d),f.setDesiredPositions(e),f.solve()},c}();a.Projection=w}(f||(f={}));var j;!function(a){var b=function(){function a(a,b){this.id=a,this.distance=b}return a}(),c=function(){function a(a){this.id=a,this.neighbours=[]}return a}(),d=function(){function a(a,d,e,f,g){this.n=a,this.es=d,this.neighbours=new Array(this.n);for(var h=this.n;h--;)this.neighbours[h]=new c(h);for(h=this.es.length;h--;){var i=this.es[h],j=e(i),k=f(i),l=g(i);this.neighbours[j].neighbours.push(new b(k,l)),this.neighbours[k].neighbours.push(new b(j,l))}}return a.prototype.DistanceMatrix=function(){for(var a=new Array(this.n),b=0;b<this.n;++b)a[b]=this.dijkstraNeighbours(b);return a},a.prototype.DistancesFromNode=function(a){return this.dijkstraNeighbours(a)},a.prototype.PathFromNodeToNode=function(a,b){return this.dijkstraNeighbours(a,b)},a.prototype.dijkstraNeighbours=function(a,b){"undefined"==typeof b&&(b=-1);for(var c=new h(function(a,b){return a.d<=b.d}),d=this.neighbours.length,e=new Array(d);d--;){var f=this.neighbours[d];f.d=d===a?0:Number.POSITIVE_INFINITY,f.q=c.push(f)}for(;!c.empty();){var g=c.pop();if(e[g.id]=g.d,g.id===b){for(var i=[],j=g;"undefined"!=typeof j.prev;)i.push(j.prev.id),j=j.prev;return i}for(d=g.neighbours.length;d--;){var k=g.neighbours[d],j=this.neighbours[k.id],l=g.d+k.distance;g.d!==Number.MAX_VALUE&&j.d>l&&(j.d=l,j.prev=g,c.reduceKey(j.q,j,function(a,b){return a.q=b}))}}return e},a}();a.Calculator=d}(j||(j={}));var b;!function(b){function c(a){a.fixed|=2,a.px=a.x,a.py=a.y}function d(a){a.fixed&=-7}return"undefined"==typeof f&&(f=b.vpsc),b.d3adaptor=function(){function e(a){return"function"==typeof t?+t.call(null,a):t}function g(a,b){a.length=b}function h(a){return a}function k(a){return"number"==typeof a.source?a.source:a.source.index}function l(a){return"number"==typeof a.target?a.target:a.target.index}function m(b){b.px=a.event.x,b.py=a.event.y,q.resume()}var n,o,p,q={},r=a.dispatch("start","tick","end"),s=[1,1],t=20,u=!1,v=!0,w=!1,x=[],y=[],z=[],A=null,B=[],C=[],D=null,E=null,F=null,G=1e-5,H=10,I=null;return q.tick=function(){if(G>o)return r.end({type:"end",alpha:o=0}),delete p,w=!1,!0;{var a,b=x.length;B.length}for(E.locks.clear(),i=0;b>i;++i)if(a=x[i],a.fixed){("undefined"==typeof a.px||"undefined"==typeof a.py)&&(a.px=a.x,a.py=a.y);var c=[a.px,a.py];E.locks.add(i,c)}var d=E.rungeKutta();for(0===d?o=0:"undefined"!=typeof p&&p>d-G&&(o=p/d-1),p=d,i=0;b>i;++i)a=x[i],a.fixed?(a.x=a.px,a.y=a.py):(a.x=E.x[0][i],a.y=E.x[1][i]);r.tick({type:"tick",alpha:o})},q.nodes=function(a){if(!arguments.length){if(0===x.length&&B.length>0){var b=0;B.forEach(function(a){b=Math.max(b,a.source,a.target)}),x=new Array(++b);for(var c=0;b>c;++c)x[c]={}}return x}return x=a,q},q.groups=function(a){return arguments.length?(y=a,A={},y.forEach(function(a){"undefined"!=typeof a.leaves&&a.leaves.forEach(function(b,c){(a.leaves[c]=x[b]).parent=a}),"undefined"!=typeof a.groups&&a.groups.forEach(function(b,c){(a.groups[c]=y[b]).parent=a})}),A.leaves=x.filter(function(a){return"undefined"==typeof a.parent}),A.groups=y.filter(function(a){return"undefined"==typeof a.parent}),q):y},q.avoidOverlaps=function(a){return arguments.length?(u=a,q):u},q.handleDisconnected=function(a){return arguments.length?(v=a,q):v},q.flowLayout=function(a,b){return arguments.length||(a="y"),F={axis:a,getMinSeparation:"number"==typeof b?function(){return b}:b},q},q.links=function(a){return arguments.length?(B=a,q):B},q.constraints=function(a){return arguments.length?(C=a,q):C},q.distanceMatrix=function(a){return arguments.length?(D=a,q):D},q.size=function(a){return arguments.length?(s=a,q):s},q.defaultNodeSize=function(a){return arguments.length?(H=a,q):H},q.linkDistance=function(a){return arguments.length?(t="function"==typeof a?a:+a,q):"function"==typeof t?t():t},q.convergenceThreshold=function(a){return arguments.length?(G="function"==typeof a?a:+a,q):G},q.alpha=function(b){return arguments.length?(b=+b,o?o=b>0?b:0:b>0&&(w||(w=!0,r.start({type:"start",alpha:o=b}),a.timer(q.tick))),q):o},q.symmetricDiffLinkLengths=function(a,c){return b.symmetricDiffLinkLengths(this.nodes().length,B,k,l,g,c),function(b){return a*b.length}},q.jaccardLinkLengths=function(a,c){return b.jaccardLinkLengths(this.nodes().length,B,k,l,g,c),function(b){return a*b.length}},q.start=function(){var a,c=this.nodes().length,d=c+2*y.length,g=(B.length,s[0]),h=s[1],i=new Array(d),j=new Array(d);z=new Array(d);var m=null,n=this.avoidOverlaps();x.forEach(function(a,b){a.index=b,"undefined"==typeof a.x&&(a.x=g/2,a.y=h/2),i[b]=a.x,j[b]=a.y});var o;D?o=D:(o=new b.shortestpaths.Calculator(d,B,k,l,e).DistanceMatrix(),m=b.Descent.createSquareMatrix(d,function(){return 2}),B.forEach(function(a){m[k(a)][l(a)]=m[l(a)][k(a)]=1}));var p=b.Descent.createSquareMatrix(d,function(a,b){return o[a][b]});if(A&&"undefined"!=typeof A.groups){var a=c;y.forEach(function(){m[a][a+1]=m[a+1][a]=1e-6,p[a][a+1]=p[a+1][a]=.1,i[a]=0,j[a++]=0,i[a]=0,j[a++]=0})}else A={leaves:x,groups:[]};var r=C||[];F&&(r=r.concat(b.generateDirectedEdgeConstraints(c,B,F.axis,F.getMinSeparation,k,l)));var t=arguments.length>0?arguments[0]:0,u=arguments.length>1?arguments[1]:0,w=arguments.length>2?arguments[2]:0;return this.avoidOverlaps(!1),E=new b.Descent([i,j],p),E.threshold=G,E.run(t),r.length>0&&(E.project=new f.Projection(x,y,A,r).projectFunctions()),E.run(u),this.avoidOverlaps(n),n&&(E.project=new f.Projection(x,y,A,r,!0).projectFunctions()),E.G=m,E.run(w),B.forEach(function(a){"number"==typeof a.source&&(a.source=x[a.source]),"number"==typeof a.target&&(a.target=x[a.target])}),x.forEach(function(a,b){a.x=i[b],a.y=j[b]}),!D&&v&&(b.applyPacking(b.separateGraphs(x,B),g,h,H),x.forEach(function(a,b){E.x[0][b]=a.x,E.x[1][b]=a.y})),q.resume()},q.resume=function(){return q.alpha(.1)},q.stop=function(){return q.alpha(0)},q.prepareEdgeRouting=function(a){I=new b.geom.TangentVisibilityGraph(x.map(function(b){return b.bounds.inflate(-a).vertices()}))},q.routeEdge=function(a,c){var d=[];10===a.source.id&&11===a.target.id;var e=new b.geom.TangentVisibilityGraph(I.P,{V:I.V,E:I.E}),g={x:a.source.x,y:a.source.y},h={x:a.target.x,y:a.target.y},i=e.addPoint(g,a.source.id),m=e.addPoint(h,a.target.id);e.addEdgeIfVisible(g,h,a.source.id,a.target.id),"undefined"!=typeof c&&c(e);var n=function(a){return a.source.id},o=function(a){return a.target.id},p=function(a){return a.length()},q=new j.Calculator(e.V.length,e.E,n,o,p),r=q.PathFromNodeToNode(i.id,m.id);if(1===r.length||r.length===e.V.length)f.makeEdgeBetween(a,a.source.innerBounds,a.target.innerBounds,5),d=[{x:a.sourceIntersection.x,y:a.sourceIntersection.y},{x:a.arrowStart.x,y:a.arrowStart.y}];else{for(var s=r.length-2,t=e.V[r[s]].p,u=e.V[r[0]].p,d=[a.source.innerBounds.rayIntersection(t.x,t.y)],v=s;v>=0;--v)d.push(e.V[r[v]].p);d.push(f.makeEdgeTo(u,a.target.innerBounds,5))}return d.forEach(function(b,c){if(c>0){var e=d[c-1];x.forEach(function(c){if(c.id!==k(a)&&c.id!==l(a)){var d=c.innerBounds.lineIntersections(e.x,e.y,b.x,b.y);d.length>0}})}}),d},q.drag=function(){return n||(n=a.behavior.drag().origin(h).on("dragstart.d3adaptor",c).on("drag.d3adaptor",m).on("dragend.d3adaptor",d)),arguments.length?(this.call(n),void 0):n},q.linkId=function(a){return k(a)+"-"+l(a)},a.rebind(q,r,"on")},b}(b||(b={})),RBTree=function(a){var b=function(a){var c=b.m[a];if(c.mod)return c.mod.exports;var d=c.mod={exports:{}};return c(d,d.exports),d.exports};return b.m={},b.m["./treebase"]=function(a){function b(){}function c(a){this._tree=a,this._ancestors=[],this._cursor=null}b.prototype.clear=function(){this._root=null,this.size=0},b.prototype.find=function(a){for(var b=this._root;null!==b;){var c=this._comparator(a,b.data);if(0===c)return b.data;b=b.get_child(c>0)}return null},b.prototype.findIter=function(a){for(var b=this._root,c=this.iterator();null!==b;){var d=this._comparator(a,b.data);if(0===d)return c._cursor=b,c;c._ancestors.push(b),b=b.get_child(d>0)}return null},b.prototype.lowerBound=function(a){return this._bound(a,this._comparator)},b.prototype.upperBound=function(a){function b(a,b){return c(b,a)}var c=this._comparator;return this._bound(a,b)},b.prototype.min=function(){var a=this._root;if(null===a)return null;for(;null!==a.left;)a=a.left;return a.data},b.prototype.max=function(){var a=this._root;if(null===a)return null;for(;null!==a.right;)a=a.right;return a.data},b.prototype.iterator=function(){return new c(this)},b.prototype.each=function(a){for(var b,c=this.iterator();null!==(b=c.next());)a(b)},b.prototype.reach=function(a){for(var b,c=this.iterator();null!==(b=c.prev());)a(b)},b.prototype._bound=function(a,b){for(var c=this._root,d=this.iterator();null!==c;){var e=this._comparator(a,c.data);if(0===e)return d._cursor=c,d;d._ancestors.push(c),c=c.get_child(e>0)}for(var f=d._ancestors.length-1;f>=0;--f)if(c=d._ancestors[f],b(a,c.data)>0)return d._cursor=c,d._ancestors.length=f,d;return d._ancestors.length=0,d},c.prototype.data=function(){return null!==this._cursor?this._cursor.data:null},c.prototype.next=function(){if(null===this._cursor){var a=this._tree._root;null!==a&&this._minNode(a)}else if(null===this._cursor.right){var b;do{if(b=this._cursor,!this._ancestors.length){this._cursor=null;break}this._cursor=this._ancestors.pop()}while(this._cursor.right===b)}else this._ancestors.push(this._cursor),this._minNode(this._cursor.right);return null!==this._cursor?this._cursor.data:null},c.prototype.prev=function(){if(null===this._cursor){var a=this._tree._root;null!==a&&this._maxNode(a)}else if(null===this._cursor.left){var b;do{if(b=this._cursor,!this._ancestors.length){this._cursor=null;break}this._cursor=this._ancestors.pop()}while(this._cursor.left===b)}else this._ancestors.push(this._cursor),this._maxNode(this._cursor.left);return null!==this._cursor?this._cursor.data:null},c.prototype._minNode=function(a){for(;null!==a.left;)this._ancestors.push(a),a=a.left;this._cursor=a},c.prototype._maxNode=function(a){for(;null!==a.right;)this._ancestors.push(a),a=a.right;this._cursor=a},a.exports=b},b.m.__main__=function(a){function c(a){this.data=a,this.left=null,this.right=null,this.red=!0}function d(a){this._root=null,this._comparator=a,this.size=0}function e(a){return null!==a&&a.red}function f(a,b){var c=a.get_child(!b);return a.set_child(!b,c.get_child(b)),c.set_child(b,a),a.red=!0,c.red=!1,c}function g(a,b){return a.set_child(!b,f(a.get_child(!b),!b)),f(a,b)}var h=b("./treebase");c.prototype.get_child=function(a){return a?this.right:this.left},c.prototype.set_child=function(a,b){a?this.right=b:this.left=b},d.prototype=new h,d.prototype.insert=function(a){var b=!1;if(null===this._root)this._root=new c(a),b=!0,this.size++;else{var d=new c(void 0),h=0,i=0,j=null,k=d,l=null,m=this._root;for(k.right=this._root;;){if(null===m?(m=new c(a),l.set_child(h,m),b=!0,this.size++):e(m.left)&&e(m.right)&&(m.red=!0,m.left.red=!1,m.right.red=!1),e(m)&&e(l)){var n=k.right===j;m===l.get_child(i)?k.set_child(n,f(j,!i)):k.set_child(n,g(j,!i))}var o=this._comparator(m.data,a);if(0===o)break;i=h,h=0>o,null!==j&&(k=j),j=l,l=m,m=m.get_child(h)}this._root=d.right}return this._root.red=!1,b},d.prototype.remove=function(a){if(null===this._root)return!1;var b=new c(void 0),d=b;d.right=this._root;for(var h=null,i=null,j=null,k=1;null!==d.get_child(k);){var l=k;i=h,h=d,d=d.get_child(k);var m=this._comparator(a,d.data);if(k=m>0,0===m&&(j=d),!e(d)&&!e(d.get_child(k)))if(e(d.get_child(!k))){var n=f(d,k);h.set_child(l,n),h=n}else if(!e(d.get_child(!k))){var o=h.get_child(!l);if(null!==o)if(e(o.get_child(!l))||e(o.get_child(l))){var p=i.right===h;e(o.get_child(l))?i.set_child(p,g(h,l)):e(o.get_child(!l))&&i.set_child(p,f(h,l));var q=i.get_child(p);q.red=!0,d.red=!0,q.left.red=!1,q.right.red=!1}else h.red=!1,o.red=!0,d.red=!0}}return null!==j&&(j.data=d.data,h.set_child(h.right===d,d.get_child(null===d.left)),this.size--),this._root=b.right,null!==this._root&&(this._root.red=!1),null!==j},a.exports=d},b("__main__")}(window);var b;return function(a){var b={};return b.PADDING=10,b.GOLDEN_SECTION=(1+Math.sqrt(5))/2,b.FLOAT_EPSILON=1e-4,b.MAX_INERATIONS=100,a.applyPacking=function(a,c,d,e,f){function g(a){function b(a){var b=Number.MAX_VALUE,c=Number.MAX_VALUE,d=0,f=0;a.array.forEach(function(a){var g="undefined"!=typeof a.width?a.width:e,h="undefined"!=typeof a.height?a.height:e;g/=2,h/=2,d=Math.max(a.x+g,d),b=Math.min(a.x-g,b),f=Math.max(a.y+h,f),c=Math.min(a.y-h,c)}),a.width=d-b,a.height=f-c}a.forEach(function(a){b(a)})}function h(a){a.forEach(function(a){var b={x:0,y:0};a.array.forEach(function(a){b.x+=a.x,b.y+=a.y}),b.x/=a.array.length,b.y/=a.array.length;var c={x:b.x-a.width/2,y:b.y-a.height/2},d={x:a.x-c.x,y:a.y-c.y};a.array.forEach(function(a){a.x=a.x+d.x+p/2-r/2,a.y=a.y+d.y+q/2-s/2})})}function i(a){var c=Number.POSITIVE_INFINITY,d=0;a.sort(function(a,b){return b.height-a.height}),t=a.reduce(function(a,b){return a.width<b.width?a.width:b.width});for(var e=k=t,f=m=l(a),g=0,h=0,i=10;Math.abs(k-m)>t||Math.abs(h-i)>b.FLOAT_EPSILON;){var k=f-(f-e)/b.GOLDEN_SECTION,m=e+(f-e)/b.GOLDEN_SECTION,h=j(a,k),i=j(a,m);if(h>i?e=k:f=m,c>h&&(c=h,d=k),c>i&&(c=i,d=m),g++>100)break}j(a,d)}function j(a,b){v=[],r=0,s=0,u=o;for(var c=0;c<a.length;c++){var d=a[c];k(d,b)}return Math.abs(m()-f)}function k(a,c){for(var d=void 0,e=0;e<v.length;e++)if(v[e].space_left>=a.height&&v[e].x+v[e].width+a.width+b.PADDING-c<=b.FLOAT_EPSILON){d=v[e];break}v.push(a),void 0!==d?(a.x=d.x+d.width+b.PADDING,a.y=d.bottom,a.space_left=a.height,a.bottom=a.y,d.space_left-=a.height+b.PADDING,d.bottom+=a.height+b.PADDING):(a.y=u,u+=a.height+b.PADDING,a.x=n,a.bottom=a.y,a.space_left=a.height),a.y+a.height-s>-b.FLOAT_EPSILON&&(s=a.y+a.height-o),a.x+a.width-r>-b.FLOAT_EPSILON&&(r=a.x+a.width-n)}function l(a){var c=0;return a.forEach(function(a){return c+=a.width+b.PADDING}),c}function m(){return r/s}var n=0,o=0,p=c,q=d,f="undefined"!=typeof f?f:1,e="undefined"!=typeof e?e:0,r=0,s=0,t=0,u=0,v=[];0!=a.length&&(g(a),i(a),h(a))},a.separateGraphs=function(a,b){function c(a,b){if(void 0===d[a.index]){b&&(f++,graphs.push({array:[]})),d[a.index]=f,graphs[f-1].array.push(a);var g=e[a.index];if(g)for(var h=0;h<g.length;h++)c(g[h],!1)}}var d={},e={};graphs=[];for(var f=0,g=0;g<b.length;g++){var h=b[g],i=h.source,j=h.target;e[i.index]?e[i.index].push(j):e[i.index]=[j],e[j.index]?e[j.index].push(i):e[j.index]=[i]}for(var g=0;g<a.length;g++){var k=a[g];d[k.index]||c(k,!0)}return graphs},a}(b||(b={})),b.powergraph=e,b.shortestpaths=j,b.geom=c,b.vpsc=f,b.PriorityQueue=h,b});
/**
 * An even better animation frame.
 *
 * @copyright Oleg Slobodskoi 2013
 * @website https://github.com/kof/animationFrame
 * @license MIT
 */

;(function(window) {
'use strict'

var nativeRequestAnimationFrame,
    nativeCancelAnimationFrame

// Grab the native request and cancel functions.
;(function() {
    var i,
        vendors = ['webkit', 'moz', 'ms', 'o'],
        top

    // Test if we are within a foreign domain. Use raf from the top if possible.
    try {
        // Accessing .name will throw SecurityError within a foreign domain.
        window.top.name
        top = window.top
    } catch(e) {
        top = window
    }

    nativeRequestAnimationFrame = top.requestAnimationFrame
    nativeCancelAnimationFrame = top.cancelAnimationFrame || top.cancelRequestAnimationFrame


    // Grab the native implementation.
    for (i = 0; i < vendors.length && !nativeRequestAnimationFrame; i++) {
        nativeRequestAnimationFrame = top[vendors[i] + 'RequestAnimationFrame']
        nativeCancelAnimationFrame = top[vendors[i] + 'CancelAnimationFrame'] ||
            top[vendors[i] + 'CancelRequestAnimationFrame']
    }

    // Test if native implementation works.
    // There are some issues on ios6
    // http://shitwebkitdoes.tumblr.com/post/47186945856/native-requestanimationframe-broken-on-ios-6
    // https://gist.github.com/KrofDrakula/5318048
    nativeRequestAnimationFrame && nativeRequestAnimationFrame(function() {
        AnimationFrame.hasNative = true
    })
}())

/**
 * Animation frame constructor.
 *
 * Options:
 *   - `useNative` use the native animation frame if possible, defaults to true
 *   - `frameRate` pass a custom frame rate
 *
 * @param {Object|Number} options
 */
function AnimationFrame(options) {
    if (!(this instanceof AnimationFrame)) return new AnimationFrame(options)
    options || (options = {})

    // Its a frame rate.
    if (typeof options == 'number') options = {frameRate: options}
    options.useNative != null || (options.useNative = true)
    this.options = options
    this.frameRate = options.frameRate || AnimationFrame.FRAME_RATE
    this._frameLength = 1000 / this.frameRate
    this._isCustomFrameRate = this.frameRate !== AnimationFrame.FRAME_RATE
    this._timeoutId = null
    this._callbacks = {}
    this._lastTickTime = 0
    this._tickCounter = 0
}

/**
 * Default frame rate used for shim implementation. Native implementation
 * will use the screen frame rate, but js have no way to detect it.
 *
 * If you know your target device, define it manually.
 *
 * @type {Number}
 * @api public
 */
AnimationFrame.FRAME_RATE = 60

/**
 * Replace the globally defined implementation or define it globally.
 *
 * @param {Object|Number} [options]
 * @api public
 */
AnimationFrame.shim = function(options) {
    var animationFrame = new AnimationFrame(options)

    window.requestAnimationFrame = function(callback) {
        return animationFrame.request(callback)
    }
    window.cancelAnimationFrame = function(id) {
        return animationFrame.cancel(id)
    }

    return animationFrame
}

/**
 * Crossplatform Date.now()
 *
 * @return {Number} time in ms
 * @api public
 */
AnimationFrame.now = Date.now || function() {
    return (new Date).getTime()
}

/**
 * Replacement for PerformanceTiming.navigationStart for the case when
 * performance.now is not implemented.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming.navigationStart
 *
 * @type {Number}
 * @api public
 */
AnimationFrame.navigationStart = AnimationFrame.now()

/**
 * Crossplatform performance.now()
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Performance.now()
 *
 * @return {Number} relative time in ms
 * @api public
 */
AnimationFrame.perfNow = function() {
    if (window.performance && window.performance.now) return window.performance.now()
    return AnimationFrame.now() - AnimationFrame.navigationStart
}

/**
 * Is native animation frame implemented. The right value is set during feature
 * detection step.
 *
 * @type {Boolean}
 * @api public
 */
AnimationFrame.hasNative = false

/**
 * Request animation frame.
 * We will use the native RAF as soon as we know it does works.
 *
 * @param {Function} callback
 * @return {Number} timeout id or requested animation frame id
 * @api public
 */
AnimationFrame.prototype.request = function(callback) {
    var self = this,
        delay

    // Alawys inc counter to ensure it never has a conflict with the native counter.
    // After the feature test phase we don't know exactly which implementation has been used.
    // Therefore on #cancel we do it for both.
    ++this._tickCounter

    if (AnimationFrame.hasNative && self.options.useNative && !this._isCustomFrameRate) {
        return nativeRequestAnimationFrame(callback)
    }

    if (!callback) throw new TypeError('Not enough arguments')

    if (this._timeoutId == null) {
        // Much faster than Math.max
        // http://jsperf.com/math-max-vs-comparison/3
        // http://jsperf.com/date-now-vs-date-gettime/11
        delay = this._frameLength + this._lastTickTime - AnimationFrame.now()
        if (delay < 0) delay = 0

        this._timeoutId = window.setTimeout(function() {
            var id

            self._lastTickTime = AnimationFrame.now()
            self._timeoutId = null
            ++self._tickCounter

            for (id in self._callbacks) {
                if (self._callbacks[id]) {
                    if (AnimationFrame.hasNative && self.options.useNative) {
                        nativeRequestAnimationFrame(self._callbacks[id])
                    } else {
                        self._callbacks[id](AnimationFrame.perfNow())
                    }
                    delete self._callbacks[id]
                }
            }
        }, delay)
    }

    this._callbacks[this._tickCounter] = callback
    return this._tickCounter
}

/**
 * Cancel animation frame.
 *
 * @param {Number} timeout id or requested animation frame id
 *
 * @api public
 */
AnimationFrame.prototype.cancel = function(id) {
    if (AnimationFrame.hasNative && this.options.useNative) nativeCancelAnimationFrame(id)
    delete this._callbacks[id]
}


// Support commonjs wrapper, amd define and plain window.
if (typeof exports == 'object' && typeof module == 'object') {
    module.exports = AnimationFrame
} else if (typeof define == 'function' && define.amd) {
    define(function() { return AnimationFrame })
} else {
    window.AnimationFrame = AnimationFrame
}

}(window));

;(function() {
  'use strict';

  if (typeof sigma === 'undefined') {
    throw 'sigma is not declared';
  }

  // default layout options
  var defaultOptions = {
    convergenceThreshold: 0.01,

    // link length options
    linkLength: undefined,
    symmetricDiffLinkLengths: 6,

    // positioning options
    // relative alignment constraints on the nodes with the same
    // parent node.
    alignment: undefined,
    avoidOverlaps: true,
    // layout constraints. If specified, alignment option will be
    // ignored
    constraints: undefined,
    handleDisconnected: true,

    // iterations for cola algorithm
    // unconstrained initial layout iterations
    initialUnconstrainedIterations: 0,
    // initial layout iterations with user-specified constraints
    initialUserConstraintIterations: 0,
    // initial layout iterations with all constraints including
    // non-overlap
    initialAllConstraintsIterations: 0
  };

  function ColaLayout(sigInst, options) {
    this.animationFrame = new AnimationFrame();
    this.colaNodeIndices = {};
    this.dragListener = sigma.plugins.dragNodes(
      sigInst,
      sigInst.renderers[0]);
    this.options = defaultOptions;
    this.sigInst = sigInst;

    for (var i in options) {
      if (options[i] != null) {
        this.options[i] = options[i];
      }
    }
  }

  ColaLayout.prototype.start = function() {
    var animationFrame = this.animationFrame,
      colaLinks = [],
      colaNodeIndices = {},
      container = this.sigInst.renderers[0].container,
      dragListener = this.dragListener,
      edges = this.sigInst.graph.edges(),
      nodes = this.sigInst.graph.nodes(),
      options = this.options,
      parentNodes = [],
      sigInst = this.sigInst;

    nodes.forEach(function(node, index) {
      // set up node boundaries
      node.width = node.size * 2;
      node.height = node.size * 2;
      colaNodeIndices[node.id] = index;
    });

    edges.forEach(function(edge) {
      var sourceIndex = colaNodeIndices[edge.source];
      var targetIndex = colaNodeIndices[edge.target];
      if (parentNodes[sourceIndex] == null) {
        parentNodes[sourceIndex] = [];
      }

      parentNodes[sourceIndex].push(targetIndex);
      colaLinks.push({
        source: colaNodeIndices[edge.source],
        target: colaNodeIndices[edge.target]
      });
    });

    var adaptor = cola.adaptor({
      trigger: function() {
          sigInst.refresh();
      },
      kick: function(tick) {
        function frame() {
          if (tick()) {
            return;
          }
          animationFrame.request(frame);
        }
        animationFrame.request(frame);
      },

      on: function() {
      },
      drag: function() {
        // handled in dragListener
      }
    });

    adaptor
      .size([container.offsetWidth, container.offsetHeight])
      .avoidOverlaps(options.avoidOverlaps)
      .nodes(nodes)
      .links(colaLinks)
      .handleDisconnected(options.handleDisconnected)
      .convergenceThreshold(options.convergenceThreshold);

    if (options.constraints == null && options.alignment != null &&
        (options.alignment === 'x' || options.alignment === 'y')) {
      options.constraints = [];
      parentNodes.forEach(function(parentNode) {
        var constraint = {'type': 'alignment',
          'axis': options.alignment,
          'offsets': []};
        parentNode.forEach(function(target) {
          constraint.offsets.push({node: target, offset: 0});
        });
        options.constraints.push(constraint);
      });
    }

    if (options.constraints != null) {
      adaptor.constraints(options.constraints);
    }

    if (options.linkLength) {
      adaptor.linkDistance(options.linkLength);
    }

    if (options.flowLayout != null &&
        options.flowLayout.axis != null) {
      var minSeparation = options.flowLayout.minSeparation != null ?
          options.flowLayout.minSeparation : 0;
      adaptor.flowLayout(options.flowLayout.axis, minSeparation);
    }

    adaptor.start(options.initialUnconstrainedIterations,
        options.initialUserConstraintIterations,
        options.initialAllConstraintsIterations);

    dragListener.bind('startdrag', function(e) {
      adaptor.dragstart(e.data.node);
      adaptor.resume();
    });

    dragListener.bind('drag', function(e) {
      var node = e.data.node;
      node.px = node.x;
      node.py = node.y;
      adaptor.resume();
    });

    dragListener.bind('dragend', function(e) {
      var node = e.data.node;
      node.px = node.x;
      node.py = node.y;
      adaptor.dragend(e.data.node);
    });

    this.adaptor = adaptor;
  };

  ColaLayout.prototype.stop = function() {
    if (this.adaptor) {
      this.adaptor.stop();
    }
    return this;
  };

  /**
   * Interface
   * ---------
   */

  sigma.prototype.startCola = function(config) {
    if (!this.cola) {
      this.cola = new ColaLayout(this, config);
    }

    this.cola.start();
    return this;
  };

  sigma.prototype.stopCola = function() {
    if (this.cola) {
      this.cola.stop();
    }

    return this;
  };

  sigma.prototype.killCola = function() {
    if (this.cola) {
      this.cola.stop();
      this.cola = null;
    }

    return this;
  };

  sigma.prototype.isColaRunning = function() {
    return this.cola != null;
  };
})();
