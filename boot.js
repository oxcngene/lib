importScripts=[];
fetch('kernel.js').then(r=>r.text()).then(t=>eval(t))