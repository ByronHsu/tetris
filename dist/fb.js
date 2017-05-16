// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
        console.log(document.getElementsByClassName('fb-login-button')[0]);
        document.getElementsByClassName('fb-login-button')[0].style.display = 'none';
        testAPI();
        return 1;
    } else {
        document.getElementById('hello').style.display = 'none';
    }
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1945913712308994',
        cookie     : true, 
        xfbml      : true, 
        version    : 'v2.8' 
    });
    FB.getLoginStatus(function(response) {
        if(statusChangeCallback(response)){
            console.log('!!!');
        }
        
    });
    FB.Event.subscribe('auth.statusChange',()=>{
        console.log('123123');
    })
};

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        document.getElementById('hello').innerHTML=`Hello ${response.name}`
    });
}