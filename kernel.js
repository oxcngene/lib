
const dbName="libfs"
let fs={}
function load(){let d=localStorage.getItem("fs");fs=d?JSON.parse(d):{}}
function save(){localStorage.setItem("fs",JSON.stringify(fs))}
function mkdir(p){let a=p.split("/").filter(Boolean);let n=fs;for(let x of a){n[x]=n[x]||{d:{}};n=n[x].d}}
function file(p,v){let a=p.split("/").filter(Boolean);let f=a.pop();let n=fs;for(let x of a){n[x]=n[x]||{d:{}};n=n[x].d}n[f]={f:v||""}}
function read(p){let a=p.split("/").filter(Boolean);let n=fs;for(let x of a){if(!n[x])return null;n=n[x].d||n[x].f}return n.f||""}
function list(p){let a=p.split("/").filter(Boolean);let n=fs;for(let x of a){n=n[x].d}return Object.keys(n)}
load()
["bin","sbin","etc","usr/bin","usr/lib","home/root","var/lib/lib-pkg","tmp"].forEach(mkdir)
file("etc/passwd","root:x:0:0:root:/home/root:/bin/sh")
save()
const t=document.getElementById("t")
const i=document.getElementById("i")
let cwd="/home/root"
function o(x){t.textContent+=x+"\n";t.scrollTop=t.scrollHeight}
function run(c){
let a=c.split(" ");let cmd=a.shift()
if(cmd=="ls")o(list(cwd).join(" "))
else if(cmd=="cd"){cwd=a[0]||cwd}
else if(cmd=="cat")o(read(a[0])||"")
else if(cmd=="echo"){file(a[a.length-1],a.slice(0,-2).join(" "));save()}
else if(["apt","pacman","yay","dnf","zypper"].includes(cmd))o("lib-pkg: installed "+a.join(" "))
else o("")
}
o("LIB GNU/Linux")
i.onkeydown=e=>{if(e.key=="Enter"){o("# "+i.value);run(i.value);i.value=""}}
