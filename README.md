form-validate.js
================

*jQuery-driven form validation*

form-validate.js is a simple script to validate forms (as the name implies).

To use it, simply use the jQuery selector with the `.validate()` method:

```js
$("#myForm").validate();
```
  
This will set the the `onsubmit` handler for the form.
This means that whenever the form is submitted, the data will be validated.
If the data is not valid, it will not submit the form.
In addition, it will alert the user by adding a CSS class to the specific input.
**It is the job of the client to define these classes.**

The validator can also set a change-based handler for each input. 

### Configuration

The validation tool can be configured with up to six options:

Option | Description | Type | Default Value
---------|--------------|-------|----------------
errorClass | The CSS class to apply when an error occurs | string | "error"
successClass | The CSS class to apply when the input is valid | string | "success"
onchange | jQuery events to use as bindings | array | [bindings](#default-jquery-bindings)
validators | Mapping of input types to RegEx validators | object | [validators](#default-validators)
onsuccess | A function to call when an element has a successful validation | function | `null`
onerror | A function to call when an element fails validation | function | `null`

#### Default Validators

Input Type | Regular Expression Validator | Description
-------------|----------------------------------|--------------
text | `.+` | One or more characters
textarea | `.+` | One or more characters
email | `.+\@.+\..+` | email in the form of `email@domain.tld`

#### Default jQuery bindings

These are the jQuery bindings for each element.
They are called whenever the associated event occurs for that element.
To see the full list of bindings, check out the [jQuery Events page](http://api.jquery.com/category/events/).

Binding Name | Description
-----------------|--------------
change | Triggered whenever the input element is changed
keyup | Called when a key is released
paste | Executed when the user pastes into the input element
input | Triggered when input is entered into the element
blur | Called once the element loses focus

#### onsuccess and onerror handlers

These two handlers are used to trigger user-defined functions when certain events occur.
The functions are only called when the `onsubmit` event is triggered
--- any of the `onchange`, jQuery-driven events do not affect these handlers.

The `onsuccess` handler is called whenever an element is successfully validated.
For example, when the user presses the "Submit" button, the validator iterates through all of the form elements.
If an element is validated successfully during this iteration, it will call the handler, with the first argument being the DOM element.
Knowing this, a potential `onsuccess` handler could be:

```js
function mySuccessHandler(element) {
	$(element).hide();
	}
```
Of course, any CSS-related handlers can be incorporated directly into the `successClass` and `errorClass` configuration.

Similarly, an `onerror` handler:

```js
function myErrorHandler(element) {
	$(element).css("color", "red");
	// again, it's easier to use the successClass and errorClass configuration options
	}
```

### Example usage
#### HTML
```html
<script type = "text/javascript" src = "https://code.jquery.com/jquery-2.1.3.min.js"></script>
<form id = "my-awesome-form">
	<div>
		<input type = "text" name = "userame" placeholder = "Username" />
		<span class = "error-text">Please enter your username!</span>
	</div>
	<div>
		<input type = "text" name = "recipient" placeholder = "Recipient" />
		<span class = "error-text">Please enter a recipient username!</span>
	</div>
	<div>
		<textarea name = "message" rows = "6" placeholder = "Message" class = "input-validate"></textarea>
		<span class = "error-text">No message entered :(!</span>
	</div>
	<input type = "submit" value = "Send" />
</form>
```

#### JavaScript
```js
$("#my-awesome-form").validate(); // default options

$("#my-awesome-form").validate({ // set a few handlers instead
	onerror: function (element) { 
		console.log(element.id + " is invalid!");
		},
	onsuccess: function (element) {
		console.log(element.id + " is valid!");
		}
	})
```

#### CSS
```css
input ~ .error-text, .input-validate ~ .error-text {
	color: red;
	display: none;
	}
input.success, .input-validate.success {
	border-color: green;
	}
	
input.error, .input-validate.error {
	border-color: red;
	}
input.error ~ .error-text, .input-validate.error ~ .error-text {
	display: initial;
	}
```

### SASS/SCSS
```scss
$color-form-error: red;
$color-form-success: green;

input, .input-validate {
	& ~ .error-text {
		color: $color-form-error;
		display: none;
		}
	&.success {
		border-color: $color-form-success;
		}
	&.error {
		border-color: $color-form-error;
		& ~ .error-text {
			display: initial;
			}
		}
	}
```
