(function(){
	'use strict';
	angular.module('core.module')
		.directive('popoverTrig', popoverTrig)

		popoverTrig.$inject = [];

		function popoverTrig(){
			var directive;

			directive = {
				restrict : 'A',
				scope : {},
				link : linkFunction
			}

			return directive;

			///////////////////////////////////////

			function linkFunction(scope, element, attrs){
				var _element = element,
            input = _element.closest('.input-group').find('input'),
						select = _element.closest('.row').find('select'),
						textarea = _element.closest('.row').find('textarea');

				_element.on('click', popoverHandler);

				function popoverHandler(event){
          input.popover('show');
					select.popover('show');
					textarea.popover('show');
				}

        input.on('keydown', hidePopover);
        textarea.on('keydown', hidePopover);
				select.on('focus', hidePopover);

        function hidePopover(event){
          if(input.hasClass('validation-error')){
            input.popover('hide');
          }else if(textarea.hasClass('validation-error')){
          	textarea.popover('hide');
          }
					select.popover('destroy');
        }

				$(window).off("resize").on("resize", function() {
				    $(".popover").each(function() {
				        var popover = $(this);
								if ( $(window).width() < 767 ){
									var ctrl = $(popover.context);
									ctrl.popover('destroy');
								}else{
									if (popover.is(":visible")) {
					            var ctrl = $(popover.context);
					            ctrl.popover('show');
					        }
								}
				    });
				});
			}
		}
})();
