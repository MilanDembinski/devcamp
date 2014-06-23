// maak namespace aan
var CAMERAALERT = CAMERAALERT || {};                                    

(function () {
  CAMERAALERT.controller = {   //controller = object                                     

      init: function () {   //init = methode                                          // Cordova connect met device
        $$(document).on('deviceready', CAMERAALERT.controller.startObjects);
      },
      
      // kijken of device ready is
      startObjects: function() {
        CAMERAALERT.camera.onDeviceReady();                            
      }
 
  };

  CAMERAALERT.camera = {
    // namespance   object
    onDeviceReady: function(){ //methode
        pictureSource=navigator.camera.PictureSourceType; //opent camera
        destinationType=navigator.camera.DestinationType;   
    },
    // camera maakt foto
    onPhotoDataSuccess: function(imageData){
        var smallImage = document.getElementById('smallImage'); 
        smallImage.className = smallImage.className + " show";
        smallImage.src = "data:image/jpeg;base64," + imageData;
    // geeft melding
        alert('Mooie foto!');                                                   
    },
    // als foto succesvol gemaakt is
    onPhotoURISuccess: function(imageURI){  
      // zoekt foto
      var largeImage = document.getElementById('largeImage'); 
      // laat foto zien
      largeImage.className = largeImage.className + " show";
      // locatie van foto
      largeImage.src = imageURI;                                            
    },
    capturePhoto: function(){
        navigator.camera.getPicture(CAMERAALERT.camera.onPhotoDataSuccess, CAMERAALERT.camera.onFail, { quality: 50,                            // maakt foto dmv camera
            destinationType: destinationType.DATA_URL });                                                                                                                                             
    },
    // maakt foto en geeft mogelijkheid tot edit
    capturePhotoEdit: function(){
    navigator.camera.getPicture(CAMERAALERT.camera.onPhotoDataSuccess, CAMERAALERT.camera.onFail, { quality: 20, allowEdit: true,
            destinationType: destinationType.DATA_URL });                                                           
    },
    // haalt foto van gespecificeerde source
    getPhoto: function(source){                           
      navigator.camera.getPicture(CAMERAALERT.camera.onPhotoURISuccess, CAMERAALERT.camera.onFail, { quality: 50,    
            destinationType: destinationType.FILE_URI,
            sourceType: source });
    },
    // geeft foutmelding
    onFail: function(message){  
      alert('Failed because: ' + message);
    }


}
    //HTML (DOM boom) is ready
domready(function () {     
    // Applicatie kan worden gestart
  CAMERAALERT.controller.init();
});

  })();
