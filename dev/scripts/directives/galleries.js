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
            '<p ng-if="currentImage.desc">{{currentImage.desc}}</p>',
        '</modal>',
        '<div class="gallery-item" ng-repeat="image in images">',
          '<div style="background-image:url(\'{{image.src}}\');" ng-click="openImage(image)">',
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
}).directive('slideGallery', function($timeout, $window){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      images: '=',
      previews: '=?'
    },
    template: [
      '<div class="gallery slide-g">',
        '<div class="current-image">',
          '<img alt="{{currentImage.alt}}" src="{{currentImage.src}}" class="thumbnail">',
        '</div>',
            '<p class="previous" ng-click="slideLeft()" ng-class="{\'disabled\': range.from == 0}"><i class="icon-chevron_left_light"></i></p>',
        '<div class="slide-items">',
          '<div>',
            '<div class="gallery-item" ng-repeat="image in images">',
              '<div ng-class="{\'active\':image === currentImage}">',
                '<img alt="{{image.alt}}" src="{{image.src}}" ng-click="openImage(image)" get-orientation>',
              '</div>',
            '</div>',
          '</div>',
        '</div>',
            '<p class="next" ng-click="slideRight()" ng-class="{\'disabled\': range.to >= images.length}"><i class="icon-chevron_right_light"></i></p>',
      '</div>'
    ].join(''),
    link: function(scope, elm, attrs){
      var slider = elm.children()[2],
          sliderWidth,
          imgWidth;
      
      scope.currentImage = scope.images[0];
      scope.range = {
                      from: 0, 
                      to: scope.previews || (scope.images.length < 4 ? scope.images.length : 4)
                    };
      setWidths();
      
      function setWidths(){
        resetSlider();
        imgWidth = slider.offsetWidth / scope.range.to;

        $timeout(function(){
          for(var i = 0; i < slider.children[0].children.length; i++){
            slider.children[0].children[i].style.width = imgWidth + 'px';
          }
          sliderWidth = imgWidth * scope.images.length;
          slider.children[0].style.width = sliderWidth + 'px';
        });
      }
      
      angular.element($window).bind('resize', setWidths);
      
      scope.openImage = function (img){
        if(img === scope.currentImage) return;
        scope.currentImage = img;
      };
      
      scope.slideLeft = function(){
        if (scope.range.from <= 0) return;
        scope.range.from--;
        scope.range.to--;
        slider.children[0].style.left = '-' + (scope.range.from * imgWidth) + 'px';
      }
      scope.slideRight = function(){
        if (scope.range.to > scope.images.length - 1) return;
        scope.range.from++;
        scope.range.to++;
        slider.children[0].style.left = '-' + (scope.range.from * imgWidth) + 'px';
      }
    
      function resetSlider(){
        scope.range.from = 0;
        scope.range.to = scope.previews || (scope.images.length < 4 ? scope.images.length : 4);
        slider.children[0].style.width = '';
        slider.children[0].style.left = '';
      }
    }
  }
}).directive('masonryGallery', function(){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      images: '=',
      columns: '=?'
    },
    template: [
      '<div class="gallery masonry-g">',
        '<modal show="openModal" next="nextImage()" previous="previousImage()">',
            '<img alt="{{currentImage.alt}}" src="{{currentImage.src}}"> {{$index}}',
            '<p ng-if="currentImage.desc">{{currentImage.desc}}</p>',
          '</modal>',
            '<div class="gallery-column" ng-repeat="column in sortedImages">',
              '<div ng-repeat="image in column">',
                  '<img alt="{{image.alt}}" src="{{image.src}}" ng-click="openImage(image)" get-orientation>',
              '</div>',
            '</div>',
      '</div>'
    ].join(''),
    link: function(scope, elm, attrs){
      var images = angular.copy(scope.images);
      scope.columns = scope.columns || 3;
      scope.sortedImages = [];
      
      for(var j = 0; j < scope.columns; j++){
        scope.sortedImages[j] = [];
      }
      
      for(var i = 0; images.length > 0; images.shift()){
        scope.sortedImages[i].push(images[0]);
        i = i == scope.sortedImages.length - 1 ? 0 : i + 1;
      }

      scope.openImage = function (img){
        scope.currentImage = img;
        scope.openModal = true;
      };
    
      function findIndex(img){
        for(var i = 0; i < scope.images.length; i++){
          var image = scope.images[i];
          if(img.src === image.src && img.alt === image.alt && img.desc === image.desc){
            return i;
          }
        }
      }
      
      scope.nextImage = function(){
        var index = findIndex(scope.currentImage);
        index = index == scope.images.length - 1 ? 0 : index + 1;
        scope.currentImage = scope.images[index];
      };
      scope.previousImage = function(){
        var index = findIndex(scope.currentImage);
        index = index == 0 ? scope.images.length - 1 : index - 1;
        scope.currentImage = scope.images[index];    
      }
    }
  }
});