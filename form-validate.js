// Rushy Panchal
// form-validate.js
// jQuery-based form validation

(function ($) {
	'use strict';
	var jQuery = $;

	var FORM_VALIDATORS = {
		text: /.+/,
		textarea: /.+/,
		email: /.+\@.+\..+/
		};

	function validateForm(formID, options) {
		// Validate a form by ID, same as $(formID).validate();
		$(formID).validate(options);
		}

	jQuery.fn.validate = function(options) {
		// Validate a form (onsubmit), through jQuery's selector
		var options = jQuery.extend(
			{onchange: ["change", "keyup", "paste", "input", "blur"],
			onsuccess: null,
			onerror: null,
			errorClass: "error", 
			successClass: "success",
			validators: {},
			_triggersCalled: true}, options);

		options.validators = jQuery.extend(FORM_VALIDATORS, options.validators);
		var form = this.get(0);
		var formElements = form.elements;
	 	var thisFormValidate = function() {
	 		var validForm = true;
	 		options._triggersCalled = false;
	 		for (var index = 0; index < formElements.length; index++) {
				var elem = formElements[index];
				validForm = validateElement(elem, options) && validForm;
				}
			options._triggersCalled = true; // only allow this method to call the triggers
			return validForm;
	 		}

	 	form.onsubmit = function() {
	 		if (thisFormValidate()) {
	 			this.submit();
	 			return true;
	 			}
	 		return false;
	 		};

	 	if (options.onchange.length > 0) {
	 		$(formElements).on(options.onchange.join(" "), function () { // check the elements when they change
		 		validateElement(this, options);
		 		});
	 		}
		}

	function validateElement(elem, options) {
		// Validate a specific element
		if (elem.type in options.validators) {
			var validator = options.validators[elem.type];
			if ((validator instanceof RegExp && validator.test(elem.value)) || (typeof validator == "function" && validator(elem.value, elem))) { // Success!
				$(elem).removeClass(options.errorClass).addClass(options.successClass);
				if (options.onsuccess && !options._triggersCalled) {
					options.onsuccess(elem);
					options._triggersCalled = true;
					}
				return true;
				}
			else { // Invalid :(
				$(elem).removeClass(options.successClass).addClass(options.errorClass);
				if (options.onerror && !options._triggersCalled) {
					options.onerror(elem);
					options._triggersCalled = true;
					}
				return false;
				}
			}
		return true;
		}
	}(jQuery));