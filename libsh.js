const fs={
"/":{type:"dir",c:{}}
}
function mkdir(p){let a=p.split("/").filter(x=>x);let n=fs["/"];for(let i=0;i<a.length;i++){n.c[a[i]]||(n.c[a[i]]={type:"dir",c:{}});n=n.c[a[i]]}}
["bin","etc","home","proc","sys","tmp","usr","var"].forEach(mkdir)
mkdir("usr/bin")
let cwd="/"
const term=document.getElementById("term")
const inp=document.getElementById("in")
function out(t){term.textContent+=t+"\n";term.scrollTop=term.scrollHeight}
function path(p){if(p.startsWith("/"))return p;return (cwd=="/"?"/":cwd+"/")+p}
function node(p){let a=p.split("/").filter(x=>x);let n=fs["/"];for(let i=0;i<a.length;i++){if(!n.c[a[i]])return null;n=n.c[a[i]]}return n}
function ls(p){let n=node(p||cwd);if(!n||n.type!="dir"){out("not a directory");return}out(Object.keys(n.c).join(" "))}
function cd(p){let n=node(path(p));if(n&&n.type=="dir"){cwd=path(p)}else out("no such directory")}
function pwd(){out(cwd)}
function echo(a){out(a.join(" "))}
function touch(p){let a=path(p).split("/").filter(x=>x);let f=a.pop();let n=node("/"+a.join("/"));if(n&&n.type=="dir")n.c[f]={type:"file",v:""}}
function cat(p){let n=node(path(p));if(n&&n.type=="file")out(n.v);else out("no such file")}
function run(cmd){
let a=cmd.trim().split(" ").filter(x=>x)
if(!a.length)return
let c=a.shift()
if(c=="ls")ls(a[0])
else if(c=="cd")cd(a[0])
else if(c=="pwd")pwd()
else if(c=="echo")echo(a)
else if(c=="touch")touch(a[0])
else if(c=="cat")cat(a[0])
else out("command not found")
}
out("LIB")
inp.onkeydown=e=>{
if(e.key=="Enter"){
out("$ "+inp.value)
run(inp.value)
inp.value=""
}
}
