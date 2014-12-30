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

The validator can also set a change-based handler for each input
(jQuery events: `change`, `keyup`, `paste`, `input`). 

### Configuration

The validation tool can up to four options:

Option | Description | Type | Default Value
-------|------------|-------|--------------
errorClass | The CSS class to apply when an error occurs | string | error
successClass | The CSS Class to apply when the input is valid | string | success
onchange | Whether or not to add the change-based handlers | boolean | true
validators | Mapping of input types to RegEx validators | object | [validators](#default-validators)

#### Default Validators

Input Type | Regular Expression Validator | Description
-----------|------------------------------|------------
text | `.+` | One or more characters
textarea | `.+` | One or more characters
email | `.+\@.+\..+` | email in the form of `email@domain.tld`

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
$("#my-awesome-form").validate();
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
