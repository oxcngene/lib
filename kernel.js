
let fs=JSON.parse(localStorage.getItem("libfs")||"{}")
function save(){localStorage.setItem("libfs",JSON.stringify(fs))}
function ensure(p){let a=p.split("/").filter(Boolean);let n=fs;for(let x of a){n[x]=n[x]||{d:{}};n=n[x].d}}
function file(p,v){let a=p.split("/").filter(Boolean);let f=a.pop();let n=fs;for(let x of a){n[x]=n[x]||{d:{}};n=n[x].d}n[f]={f:v}}
function read(p){let a=p.split("/").filter(Boolean);let n=fs;for(let x of a){n=n[x].d||n[x].f}return n.f||""}
function ls(p){let a=p.split("/").filter(Boolean);let n=fs;for(let x of a){n=n[x].d}return Object.keys(n)}
["bin","sbin","etc","usr/bin","usr/lib","usr/share","var/log","var/lib/lib-pkg","home/root","tmp","proc","sys","dev"].forEach(ensure)
file("etc/passwd","root:x:0:0:root:/home/root:/bin/sh")
file("etc/group","root:x:0:")
file("etc/hostname","lib")
file("etc/issue","LIB GNU/Linux")
file("etc/profile","export PATH=/bin:/usr/bin")
file("etc/os-release","NAME=LIB\nID=lib\nVERSION=rolling")
file("var/log/dmesg","[    0.000000] LIB kernel boot")
file("var/log/syslog","")
file("home/root/.profile","export PS1='# '")
save()

const t=document.getElementById("term")
const i=document.getElementById("in")
let cwd="/home/root"
function o(x){t.textContent+=x+"\n";t.scrollTop=t.scrollHeight}
function run(c){
let a=c.split(" ");let cmd=a.shift()
if(cmd=="ls")o(ls(cwd).join(" "))
else if(cmd=="cd"){cwd=a[0]||cwd}
else if(cmd=="pwd")o(cwd)
else if(cmd=="cat")o(read(a[0])||"")
else if(cmd=="echo"){file(a[a.length-1],a.slice(0,-2).join(" "));save()}
else if(["apt","pacman","yay","dnf","zypper","apt-get"].includes(cmd))o("lib-pkg: installed "+a.join(" "))
else o("")
}
o("LIB GNU/Linux")
i.onkeydown=e=>{if(e.key=="Enter"){o("# "+i.value);run(i.value);i.value=""}}
