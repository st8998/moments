angular.module('app').directive('mDropzone', function(progressJs, sequence, $timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      onUpload: '&',
      url: '&',
      paramName: '@'
    },
    template: '<div class="dropzone-component" ng-transclude></div>',
    link: function(scope, elem, attrs) {
      var comp = elem.find('.dropzone-component')
      var fileInput = elem.find('.upload-hint').append('<input class="hidden-file-upload-button" type="file" multiple />')

      ;(function() {
        var target
        $(document).on('dragenter', function(e) {
          var dt = e.originalEvent.dataTransfer;
          if(dt.types != null && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('application/x-moz-file'))) {
            target = e.target
            comp.addClass('file-page-hover')
          }
        })
        $(document).on('dragleave', function(e) {
          if (e.target === target)
            comp.removeClass('file-page-hover')
        })
      }())

      ;(function() {
        var target
        comp.on('dragenter', function(e) {
          var dt = e.originalEvent.dataTransfer;
          if(dt.types != null && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('application/x-moz-file'))) {
            target = e.target
            comp.addClass('file-hover')
          }
        })
        comp.on('dragleave', function(e) {
          if (e.target === target)
            comp.removeClass('file-hover')
        })
        comp.on('drop', function() {
          $('.file-hover, .file-page-hover').removeClass('file-hover file-page-hover')
        })
      }())

      var progressBar, progressComp = comp.find('.progress')

      comp.fileupload({
        url: scope.url(),
        type: 'post',
        dropZone: comp,
        pasteZone: comp,
        fileInput: fileInput,
        paramName: scope.paramName || 'image',
        sequentialUploads: true, // TODO review this option

        done: function(e, data) {
          scope.$apply(function() {
            scope.onUpload({attrs: data.result})
          })
        },
        progressall: function(e, data) {
          if (progressComp) {
            if (!progressBar) {
              progressBar = progressJs(progressComp).start()
            }
            progressBar.set(data.loaded / data.total * 100)
          }

          if (data.loaded == data.total) {
            progressBar.end()
            progressBar = undefined
          }
        }
      })
    }
  }
})