// This script builds a keyboard simulation
// by generating an HTML DOM list of keyboard input characters

// Declare and initialise text input field
var $input,
	fieldContent = "";

// Keyboard properties
var keyb = {
    keysRow: [14, 14, 13, 13],
	capsLockOn: false,
    shiftLockOn: false,
    tabSize: 4,
	
	// Define labels
	labels: [
    ['`', 'Â'],
    ['1', '!'],
    ['2', '@'],
    ['3', '#'],
    ['4', '$'],
    ['5', '%'],
    ['6', '^'],
    ['7', '&'],
    ['8', '*'],
    ['9', '('],
    ['0', ')'],
    ['-', '_'],
    ['=', '+'],
    'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    ['[', '{'],
    [']', '}'],
    ['\\', '|'],
    'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
    [';', ':'],
    ['\'', '"'],
    'Enter/Return', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M',
    [',', '<'],
    ['.', '>'],
    ['/', '?'],
    'Shift',
    'Space'
	],
	
	// Assign class to manage visual layout of a key
	getClass: function (key) {
		switch (key.toLowerCase()) {
			case 'tab':
				return 'w-one-plus-hf';
			case 'backspace':
				return 'w-two';
			case 'enter/return':
				return 'w-one-plus-three-qt';
			case 'caps lock':
				return 'w-one-plus-three-qt caps';
			case 'shift':
				return 'w-two-plus-qt shift';
			case 'space':
				return 'w-fifteen';
			default:
				return '';
		}
	},
	
	// Handle key click
	onClick: function (label) {
		switch (label) {
		case 'Backspace':
    		fieldContent = fieldContent.substring(0, fieldContent.length - 1);
    		break;
		case 'Caps Lock':
    		keyb.capsLockOn = !keyb.capsLockOn;
			$('.caps').toggleClass('caps-on');
    		break;
		case 'Enter/Return':
    		fieldContent += "\n";
    		break;
		case 'Shift':
    		keyb.shiftLockOn = !keyb.shiftLockOn;
			$('.shift').toggleClass('shift-on');
    		break;
		case 'Space':
    		fieldContent += " ";
    		break;
		case 'Tab':
    		for (var i = 0; i < keyb.tabSize; ++i) {
				fieldContent += " ";
    		}
    		break;
		default:
    		this.getChar(label);
		}
	
		// display clicked character in text input control
		$input.val(fieldContent).focus();
	},
	
	// Output character that was clicked
	getChar: function (label) {
    	if (keyb.shiftLockOn || keyb.capsLockOn) {
			// display alphabetic character
    		if (label >= 'A' && label <= 'Z' || label >= 'a' && label <= 'z') {
				fieldContent += label;
	    	} else if (keyb.shiftLockOn) {
				// display upper of dual-character key
				if (label instanceof Array) {
					fieldContent += label[1];
				}
    		} else if (keyb.capsLockOn) {
				// display lower of dual-character key
				fieldContent += label[0];
			}
		} else {
    		fieldContent += (label instanceof Array) ? label[0] : label.toLowerCase();
		}
	}
};

// Create keyboard interface
$().ready(function () {
    var key,
		label,
		row = 0,
		col = 0,
		keyboard = $('#input');
	$input = $('#text_field').focus();
	for (var i = 0, x = keyb.labels.length; i < x; ++i, ++col) {
		label = keyb.labels[i];
		key = $('<li/>', {
			click: function (label) {
				return function () {
					keyb.onClick(label);
				}
			}(label)
		});
		if (label instanceof Array) {
			// apply style control to some end-of-row keys
			if (label[0] === '\\') {
				key.attr('class', 'w-one-plus-hf');
			}
			$('<span/>', {text: label[1]}).appendTo(key);
			$('<span/>', {text: label[0]}).appendTo(key);
		} else {
			$('<span/>', {text: label}).appendTo(key);
			key.attr('class', keyb.getClass(label));
		}
		// Conditionally begin new row of keys
		if (col === keyb.keysRow[row]) {
			key.addClass('clear-left');
			col = 0;
			++row;
		}
		key.appendTo(keyboard);
	}
});