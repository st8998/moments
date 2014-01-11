// TODO fix drag hover messages for non uploading content

angular.module('app').directive('mUploader', ['jquery', 'sequence', '$timeout', function($, seq, $timeout) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      onUpload: '&',
      url: '&'
    },
    template: '<div class="upload-component" ng-transclude></div>',
    link: function(scope, elem, attrs) {
      var setProgress = (function(hideAfter) {
        var progress = elem.find('.horizontal-progress')
        var hideProgressTimeout
        return function(amount) {
          $timeout.cancel(hideProgressTimeout)
          progress.removeClass('hidden')
          progress.css({width: amount+'%'})
          hideProgressTimeout = $timeout(progress.addClass.bind(progress, 'hidden'), hideAfter, false)
        }
      }(2000))

      var comp = elem.find('.upload-component')
      var fileInput = elem.find('.upload-hint').append('<input class="hidden-file-upload-button" type="file" multiple />')

      ;(function() {
        var target
        $(document).on('dragenter', function(e) {
          target = e.target
          comp.addClass('file-page-hover')
        })
        $(document).on('dragleave', function(e) {
          if (e.target === target)
            comp.removeClass('file-page-hover')
        })
      }())

      ;(function() {
        var target
        comp.on('dragenter', function(e) {
          target = e.target
          comp.addClass('file-hover')
        })
        comp.on('dragleave', function(e) {
          if (e.target === target)
            comp.removeClass('file-hover')
        })
        comp.on('drop', function() {
          $('.file-hover, .file-page-hover').removeClass('file-hover file-page-hover')
        })
      }())

      comp.fileupload({
        url: scope.url(),
        type: 'post',
        dropZone: comp,
        pasteZone: comp,
        fileInput: fileInput,
        paramName: 'image',
        sequentialUploads: true, // TODO review this option

        done: function(e, data) {
          scope.$apply(function() {
            scope.onUpload({attrs: data.result})
          })
        },
        progressall: function(e, data) {
          setProgress(parseInt(data.loaded / data.total * 100, 10))
        }
      })

      scope.$on('$destroy', function() {
        comp.fileupload('destroy')
      })
    }
  }
}])