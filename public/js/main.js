// fix fb auth weird URL with #_=_
// http://stackoverflow.com/a/18305085
if (window.location.hash == '#_=_'){
    history.replaceState 
        ? history.replaceState(null, null, window.location.href.split('#')[0])
        : window.location.hash = '';
}