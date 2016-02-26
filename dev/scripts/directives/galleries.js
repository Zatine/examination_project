app.directive('gallery', function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      images: '='
    },
    template: [
      '<div class="gallery">',
        '<modal show="openModal" next="nextImage()" previous="previousImage()">',
          '<img alt="{{currentImage.alt}}" src="{{currentImage.src}}">',
        '</modal>',
        '<div class="gallery-item" ng-repeat="image in images" >',
          '<img alt="{{image.alt}}" class="thumbnail" src="{{image.src}}" ng-click="openImage(image)">',
          //'<p ng-if="image.desc">{{image.desc}}</p>',
        '</div>',
      '</div>'
    ].join(''),
    link: function(scope, elm, attrs){
      scope.openImage = function (img){
        scope.currentImage = img;
        scope.openModal = true;
      };
      scope.nextImage = function(){
        var index = scope.images.indexOf(scope.currentImage);
        index = index == scope.images.length - 1 ? 0 : index + 1;
        scope.currentImage = scope.images[index];
      };
      scope.previousImage = function(){
        var index = scope.images.indexOf(scope.currentImage);
        index = index == 0 ? scope.images.length - 1 : index - 1;
        scope.currentImage = scope.images[index];        
      }
    }
  }
});