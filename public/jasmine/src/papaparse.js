/*
  Papa Parse
  v3.0.1
  https://github.com/mholt/PapaParse
*/
;(function(e){"use strict";function u(e,r){var i=t?r:g(r);var s=i.worker&&Papa.WORKERS_SUPPORTED&&n;if(s){var o=d();o.userStep=i.step;o.userChunk=i.chunk;o.userComplete=i.complete;o.userError=i.error;i.step=b(i.step);i.chunk=b(i.chunk);i.complete=b(i.complete);i.error=b(i.error);delete i.worker;o.postMessage({input:e,config:i,workerId:o.id})}else{if(typeof e==="string"){if(i.download){var u=new f(i);u.stream(e)}else{var a=new c(i);var h=a.parse(e);if(b(i.complete))i.complete(h);return h}}else if(e instanceof File){if(i.step||i.chunk){var u=new l(i);u.stream(e)}else{var a=new c(i);if(t){var p=new FileReaderSync;var v=p.readAsText(e,i.encoding);return a.parse(v)}else{p=new FileReader;p.onload=function(e){var t=new c(i);var n=t.parse(e.target.result);if(b(i.complete))i.complete(n)};p.readAsText(e,i.encoding)}}}}}function a(t,n){function a(){if(typeof n!=="object")return;if(typeof n.delimiter==="string"&&n.delimiter.length==1&&e.Papa.BAD_DELIMITERS.indexOf(n.delimiter)==-1){o=n.delimiter}if(typeof n.quotes==="boolean"||n.quotes instanceof Array)s=n.quotes;if(typeof n.newline==="string")u=n.newline}function f(e){if(typeof e!=="object")return[];var t=[];for(var n in e)t.push(n);return t}function l(e,t){var n="";if(typeof e==="string")e=JSON.parse(e);if(typeof t==="string")t=JSON.parse(t);var r=e instanceof Array&&e.length>0;var i=!(t[0]instanceof Array);if(r){for(var s=0;s<e.length;s++){if(s>0)n+=o;n+=c(e[s],s)}if(t.length>0)n+=u}for(var a=0;a<t.length;a++){var f=r?e.length:t[a].length;for(var l=0;l<f;l++){if(l>0)n+=o;var h=r&&i?e[l]:l;n+=c(t[a][h],l)}if(a<t.length-1)n+=u}return n}function c(t,n){if(typeof t==="undefined")return"";t=t.toString().replace(/"/g,'""');var r=typeof s==="boolean"&&s||s instanceof Array&&s[n]||h(t,e.Papa.BAD_DELIMITERS)||t.indexOf(o)>-1||t.charAt(0)==" "||t.charAt(t.length-1)==" ";return r?'"'+t+'"':t}function h(e,t){for(var n=0;n<t.length;n++)if(e.indexOf(t[n])>-1)return true;return false}var r="";var i=[];var s=false;var o=",";var u="\r\n";a();if(typeof t==="string")t=JSON.parse(t);if(t instanceof Array){if(!t.length||t[0]instanceof Array)return l(null,t);else if(typeof t[0]==="object")return l(f(t[0]),t)}else if(typeof t==="object"){if(typeof t.data==="string")t.data=JSON.parse(t.data);if(t.data instanceof Array){if(!t.fields)t.fields=t.data[0]instanceof Array?t.fields:f(t.data[0]);if(!(t.data[0]instanceof Array)&&typeof t.data[0]!=="object")t.data=[t.data]}return l(t.fields||[],t.data||[])}throw"exception: Unable to serialize unrecognized input"}function f(n){n=n||{};if(!n.chunkSize)n.chunkSize=Papa.RemoteChunkSize;var r=0,i=0;var s="";var o="";var u,a;var f=new c(y(n));this.stream=function(l){function c(){u=new XMLHttpRequest;if(!t){u.onload=h;u.onerror=p}u.open("GET",l,!t);if(n.step){var e=r+n.chunkSize-1;if(i&&e>i)e=i;u.setRequestHeader("Range","bytes="+r+"-"+e)}u.send();if(t&&u.status==0)p();else r+=n.chunkSize}function h(){if(u.readyState!=4)return;if(u.status<200||u.status>=400){p();return}s+=o+u.responseText;o="";var i=!n.step||r>d(u);if(!i){var l=s.lastIndexOf("\n");if(l<0)l=s.lastIndexOf("\r");if(l>-1){o=s.substring(l+1);s=s.substring(0,l)}else{a();return}}var c=f.parse(s);s="";if(t){e.postMessage({results:c,workerId:Papa.WORKER_ID,finished:i})}else if(b(n.chunk)){n.chunk(c);c=undefined}if(i&&b(n.complete))n.complete(c);else if(c&&c.meta.aborted&&b(n.complete))n.complete(c);else if(!i)a()}function p(){if(b(n.error))n.error(u.statusText);else if(t&&n.error){e.postMessage({workerId:Papa.WORKER_ID,error:u.statusText,finished:false})}}function d(e){var t=e.getResponseHeader("Content-Range");return parseInt(t.substr(t.lastIndexOf("/")+1))}if(t){a=function(){c();h()}}else{a=function(){c()}}a()}}function l(n){n=n||{};if(!n.chunkSize)n.chunkSize=Papa.LocalChunkSize;var r=0;var i="";var s="";var o,u,a;var f=new c(y(n));var l=typeof FileReader==="function";this.stream=function(u){function c(){if(r<u.size)h()}function h(){var e=Math.min(r+n.chunkSize,u.size);var t=o.readAsText(a.call(u,r,e),n.encoding);if(!l)p({target:{result:t}})}function p(o){r+=n.chunkSize;i+=s+o.target.result;s="";var a=r>=u.size;if(!a){var l=i.lastIndexOf("\n");if(l<0)l=i.lastIndexOf("\r");if(l>-1){s=i.substring(l+1);i=i.substring(0,l)}else{c();return}}var h=f.parse(i);i="";if(t){e.postMessage({results:h,workerId:Papa.WORKER_ID,finished:a})}else if(b(n.chunk)){n.chunk(h,u);h=undefined}if(a&&b(n.complete))n.complete(undefined,u);else if(h&&h.meta.aborted&&b(n.complete))n.complete(h,u);else if(!a)c()}function d(){if(b(n.error))n.error(o.error,u);else if(t&&n.error){e.postMessage({workerId:Papa.WORKER_ID,error:o.error,file:u,finished:false})}}var a=u.slice||u.webkitSlice||u.mozSlice;if(l){o=new FileReader;o.onload=p;o.onerror=d}else o=new FileReaderSync;c()}}function c(e){function s(){if(i&&n){c("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to comma");n=false}if(o())u();return a()}function o(){return e.header&&r.length==0}function u(){if(!i)return;for(var e=0;o()&&e<i.data.length;e++)for(var t=0;t<i.data[e].length;t++)r.push(i.data[e][t]);i.data.splice(0,1)}function a(){if(!i||!e.header&&!e.dynamicTyping)return i;for(var t=0;t<i.data.length;t++){var n={};for(var s=0;s<i.data[t].length;s++){if(e.dynamicTyping){var o=i.data[t][s];if(o=="true")i.data[t][s]=true;else if(o=="false")i.data[t][s]=false;else i.data[t][s]=l(o)}if(e.header){if(s>=r.length){if(!n["__parsed_extra"])n["__parsed_extra"]=[];n["__parsed_extra"].push(i.data[t][s])}n[r[s]]=i.data[t][s]}}if(e.header){i.data[t]=n;if(s>r.length)c("FieldMismatch","TooManyFields","Too many fields: expected "+r.length+" fields but parsed "+s,t);else if(s<r.length)c("FieldMismatch","TooFewFields","Too few fields: expected "+r.length+" fields but parsed "+s,t)}}if(e.header&&i.meta);i.meta.fields=r;return i}function f(t){var n=[",","  ","|",";",Papa.RECORD_SEP,Papa.UNIT_SEP];var r,i,s;for(var o=0;o<n.length;o++){var u=n[o];var a=0,f=0;s=undefined;var l=(new h({delimiter:u,preview:10})).parse(t);for(var c=0;c<l.data.length;c++){var p=l.data[c].length;f+=p;if(typeof s==="undefined"){s=p;continue}else if(p>1){a+=Math.abs(p-s);s=p}}f/=l.data.length;if((typeof i==="undefined"||a<i)&&f>1.99){i=a;r=u}}e.delimiter=r;return{successful:!!r,bestDelimiter:r}}function l(e){var n=t.test(e);return n?parseFloat(e):e}function c(e,t,n,r){i.errors.push({type:e,code:t,message:n,row:r})}var t=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;var n;var r=[];var i={data:[],errors:[],meta:{}};e=y(e);this.parse=function(t){n=false;if(!e.delimiter){var r=f(t);if(r.successful)e.delimiter=r.bestDelimiter;else{n=true;e.delimiter=","}i.meta.delimiter=e.delimiter}if(b(e.step)){var u=e.step;e.step=function(e,t){i=e;if(o())s();else u(s(),t)}}i=(new h(e)).parse(t);return s()}}function h(e){function E(){while(l<r.length){if(y)break;if(a>0&&g>=a)break;if(w)return x();if(f=='"')T();else if(c)N();else C();S()}return x()}function S(){l++;f=r[l]}function x(){if(y)I("Abort","ParseAbort","Parsing was aborted by the user's step function");if(c)I("Quotes","MissingQuotes","Unescaped or mismatched quotes");_();if(!b(o))return U()}function T(){if(j()&&!B())c=!c;else{A();if(c&&B())l++;else I("Quotes","UnexpectedQuotes","Unexpected quotes")}}function N(){if(P(l)||H(l))h++;A()}function C(){if(f==i)O();else if(P(l)){M();S()}else if(H(l))M();else if(k())L();else A()}function k(){if(!s)return false;var e=l==0||H(l-1)||P(l-2);return e&&r[l]===s}function L(){while(!P(l)&&!H(l)&&l<r.length){S()}}function A(){p[v][m]+=f}function O(){p[v].push("");m=p[v].length-1}function M(){_();h++;g++;p.push([]);v=p.length-1;O()}function _(){D();if(b(o)){if(p[v])o(U(),t);R()}}function D(){if(p[v].length==1&&n.test(p[v][0])){if(e.keepEmptyRows)p[v].splice(0,1);else p.splice(v,1);v=p.length-1}}function P(e){return e<r.length-1&&(r[e]=="\r"&&r[e+1]=="\n"||r[e]=="\n"&&r[e+1]=="\r")}function H(e){return r[e]=="\r"||r[e]=="\n"}function B(){return!j()&&l<r.length-1&&r[l+1]=='"'}function j(){return!c&&F(l-1)||F(l+1)}function F(e){if(typeof e!="number")e=l;var t=r[e];return e<=-1||e>=r.length||t==i||t=="\r"||t=="\n"}function I(e,t,n){d.push({type:e,code:t,message:n,line:h,row:v,index:l})}function q(e){r=e;c=false;l=0,g=0,h=1;R();p=[[""]];f=r[l]}function R(){p=[];d=[];v=0;m=0}function U(){return{data:p,errors:d,meta:{lines:h,delimiter:i,aborted:y}}}var t=this;var n=/^\s*$/;var r;var i;var s;var o;var u;var a;var f;var l;var c;var h;var p;var d;var v;var m;var g;var y=false;var w=false;e=e||{};i=e.delimiter;s=e.comments;o=e.step;a=e.preview;if(typeof i!=="string"||i.length!=1||Papa.BAD_DELIMITERS.indexOf(i)>-1)i=",";if(s===true)s="#";else if(typeof s!=="string"||s.length!=1||Papa.BAD_DELIMITERS.indexOf(s)>-1||s==i)s=false;this.parse=function(e){if(typeof e!=="string")throw"Input must be a string";q(e);return E()};this.abort=function(){y=true}}function p(){var e="worker"+String(Math.random()).substr(2);document.write('<script id="'+e+'"></script>');return document.getElementById(e).previousSibling.src}function d(){if(!Papa.WORKERS_SUPPORTED)return false;var t=new e.Worker(n);t.onmessage=v;t.id=i++;r[t.id]=t;return t}function v(e){var t=e.data;var n=r[t.workerId];if(t.error)n.userError(t.error,t.file);else if(t.results&&t.results.data){if(b(n.userStep)){for(var i=0;i<t.results.data.length;i++){n.userStep({data:[t.results.data[i]],errors:t.results.errors,meta:t.results.meta})}delete t.results}else if(b(n.userChunk)){n.userChunk(t.results,t.file);delete t.results}}if(t.finished){if(b(r[t.workerId].userComplete))r[t.workerId].userComplete(t.results);r[t.workerId].terminate();delete r[t.workerId]}}function m(t){var n=t.data;if(typeof Papa.WORKER_ID==="undefined"&&n)Papa.WORKER_ID=n.workerId;if(typeof n.input==="string"){e.postMessage({workerId:Papa.WORKER_ID,results:Papa.parse(n.input,n.config),finished:true})}else if(n.input instanceof File){var r=Papa.parse(n.input,n.config);if(r)e.postMessage({workerId:Papa.WORKER_ID,results:r,finished:true})}}function g(e){if(typeof e!=="object")e={};var t=y(e);if(typeof t.delimiter!=="string"||t.delimiter.length!=1||Papa.BAD_DELIMITERS.indexOf(t.delimiter)>-1)t.delimiter=s.delimiter;if(typeof t.header!=="boolean")t.header=s.header;if(typeof t.dynamicTyping!=="boolean")t.dynamicTyping=s.dynamicTyping;if(typeof t.preview!=="number")t.preview=s.preview;if(typeof t.step!=="function")t.step=s.step;if(typeof t.complete!=="function")t.complete=s.complete;if(typeof t.encoding!=="string")t.encoding=s.encoding;if(typeof t.worker!=="boolean")t.worker=s.worker;if(typeof t.download!=="boolean")t.download=s.download;if(typeof t.keepEmptyRows!=="boolean")t.keepEmptyRows=s.keepEmptyRows;return t}function y(e){if(typeof e!=="object")return e;var t=e instanceof Array?[]:{};for(var n in e)t[n]=y(e[n]);return t}function b(e){return typeof e==="function"}var t=!e.document,n;var r={},i=0;var s={delimiter:"",header:false,dynamicTyping:false,preview:0,step:undefined,encoding:"",worker:false,comments:false,complete:undefined,download:false,chunk:undefined,keepEmptyRows:false};e.Papa={};e.Papa.parse=u;e.Papa.unparse=a;e.Papa.RECORD_SEP=String.fromCharCode(30);e.Papa.UNIT_SEP=String.fromCharCode(31);e.Papa.BYTE_ORDER_MARK="﻿";e.Papa.BAD_DELIMITERS=["\r","\n",'"',e.Papa.BYTE_ORDER_MARK];e.Papa.WORKERS_SUPPORTED=!!e.Worker;e.Papa.LocalChunkSize=1024*1024*10;e.Papa.RemoteChunkSize=1024*1024*5;e.Papa.Parser=h;e.Papa.ParserHandle=c;e.Papa.NetworkStreamer=f;e.Papa.FileStreamer=l;if(e.jQuery){var o=e.jQuery;o.fn.parse=function(t){function i(){if(r.length==0){if(b(t.complete))t.complete();return}var e=r[0];if(b(t.before)){var n=t.before(e.file,e.inputElem);if(typeof n==="object"){if(n.action=="abort"){s("AbortError",e.file,e.inputElem,n.reason);return}else if(n.action=="skip"){u();return}else if(typeof n.config==="object")e.instanceConfig=o.extend(e.instanceConfig,n.config)}else if(n=="skip"){u();return}}var i=e.instanceConfig.complete;e.instanceConfig.complete=function(t){if(b(i))i(t,e.file,e.inputElem);u()};Papa.parse(e.file,e.instanceConfig)}function s(e,n,r,i){if(b(t.error))t.error({name:e},n,r,i)}function u(){r.splice(0,1);i()}var n=t.config||{};var r=[];this.each(function(t){var i=o(this).prop("tagName").toUpperCase()=="INPUT"&&o(this).attr("type").toLowerCase()=="file"&&e.FileReader;if(!i||!this.files||this.files.length==0)return true;for(var s=0;s<this.files.length;s++){r.push({file:this.files[s],inputElem:this,instanceConfig:o.extend({},n)})}});i();return this}}if(t)e.onmessage=m;else if(Papa.WORKERS_SUPPORTED)n=p()})(this);