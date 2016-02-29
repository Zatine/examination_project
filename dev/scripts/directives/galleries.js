app.directive('modalGallery', function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      images: '='
    },
    template: [
      '<div class="gallery modal-g">',
        '<modal show="openModal" next="nextImage()" previous="previousImage()">',
          '<img alt="{{currentImage.alt}}" src="{{currentImage.src}}">',
        '</modal>',
        '<div class="gallery-item" ng-repeat="image in images" >',
          '<div>',
            '<img alt="{{image.alt}}" src="{{image.src}}" ng-click="openImage(image)" get-orientation>',
            //'<p ng-if="image.desc">{{image.desc}}</p>',
          '</div>',
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
}).directive('slideGallery', function($timeout){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      images: '='
    },
    template: [
      '<div class="gallery slide-g">',
        '<div class="current-image">',
          '<img alt="{{currentImage.alt}}" src="{{currentImage.src}}">',
        '</div>',
            '<span class="previous" ng-click="slideLeft()" ng-show="range.from != 0">&lt;</span>',
        '<div class="slide-items">',
          '<div>',
            '<div class="gallery-item" ng-repeat="image in images">',
              '<div>',
                '<img alt="{{image.alt}}" src="{{image.src}}" ng-click="openImage(image)" get-orientation>',
              '</div>',
            '</div>',
          '</div>',
        '</div>',
            '<span class="next" ng-click="slideRight()" ng-show="range.to != images.length -1">&gt;</span>',
      '</div>'
    ].join(''),
    link: function(scope, elm, attrs){
      var slider = elm.children()[2],
          imgWidth = slider.offsetWidth / 4;
      $timeout(function(){
        for(var i = 0; i < slider.children[0].children.length; i++){
          slider.children[0].children[i].setAttribute('style', 'width:' + imgWidth + 'px;');
        }
        slider.children[0].setAttribute('style', 'width:' + (imgWidth * scope.images.length) + 'px;');
      });
      
      scope.currentImage = scope.images[0];
      scope.range = {
                      from: 0, 
                      to: scope.images.length < 4 ? scope.images.length : 4
                    };
      
      scope.openImage = function (img){
        scope.currentImage = img;
        scope.openModal = true;
      };
      
      scope.slideLeft = function(){
        if (scope.range.from <= 0) return;
        scope.range.from--;
        scope.range.to--;
        slider.children[0].setAttribute('style', 'width:' + (imgWidth * scope.images.length) + 'px;left: -' + (scope.range.from * imgWidth) + 'px;');
      }
      scope.slideRight = function(){
        if (scope.range.to >= scope.images.length - 1) return;
        scope.range.from++;
        scope.range.to++;
        slider.children[0].setAttribute('style', 'width:' + (imgWidth * scope.images.length) + 'px;left: -' + (scope.range.from * imgWidth) + 'px;');
      }
    
    }
  }
});