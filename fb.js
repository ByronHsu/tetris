      window.fbAsyncInit = () => {
        window.FB.init({
          appId      : '1945913712308994',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.9'
        });
        document.getElementById('hello').style.display='none';
        window.FB.AppEvents.logPageView();
        window.FB.Event.subscribe('auth.statusChange', statusChangeCallback);
      };
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response){
    if (response.status === 'connected') {
      didLogin();
    } else {
      didNotLogin();
    }
  }
function didLogin(){
    window.FB.api('/me', (res) => {
        login=1;
        UserName=res.name;
        document.getElementsByClassName('fb-login-button')[0].style.display='none';
        document.getElementById('hello').style.display='inline-block';
        document.getElementById('hello').innerHTML=`Hello ${res.name}`;
    });
}
function didNotLogin (){
        login=0;
        document.getElementsByClassName('fb-login-button')[0].style.display='inline-block';
}
let UserName;
let login=0;
export {UserName,login};