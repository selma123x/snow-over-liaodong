const fs=require('fs');
let html=fs.readFileSync('snow-3d.html','utf8');
html=html.replace('<!-- THREE -->','<script>\n'+fs.readFileSync('three.min.js','utf8')+'\n<\/script>')
         .replace('<!-- STORY -->','<script>\n'+fs.readFileSync('story.js','utf8')+'\n<\/script>')
         .replace('<!-- ANIM -->','<script>\n'+fs.readFileSync('anim.js','utf8')+'\n<\/script>')
         .replace('<!-- ENGINE -->','<script>\n'+fs.readFileSync('engine3d.js','utf8')+'\n<\/script>');
fs.writeFileSync('snow-over-liaodong-3d.html',html);
const vm=require('vm');let ok=true;
[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].forEach((m,i)=>{try{new vm.Script(m[1]);}catch(e){ok=false;console.log('block',i,e.message);}});
console.log('assembled '+(fs.statSync('snow-over-liaodong-3d.html').size/1024).toFixed(0)+' KB —',ok?'compiles':'ERRORS');
