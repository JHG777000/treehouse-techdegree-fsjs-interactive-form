/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

//Global state
const options_array = []; //saves color options, so they can reappear as needed
let tshirt_design_state = ''; //stores tshirt design state, uesd to determine which colors to display

hide_other_title(); //hide 'other-title' for Job Role
hide_t_shirt_info(); //hide tshirt colors, until a design is chosen
setup_checkboxes(); //setup checkboxes for 'Register for Activities'
hide_payment_info(); //hide payment methods, credit card is default

function hide_other_title() {
  const title = document.getElementById('title');
  //add event listener to Job menu, so show_other_title can unhide other-title' for Job Role
  title.addEventListener('change', show_other_title);
  const input = document.getElementById('other-title');
  input.hidden = true; //hide 'other-title' for Job Role
}

function show_other_title(e) {
  if (e.target.value === 'other') {
    //if 'other' is selected on Job menu, unhide
    const input = document.getElementById('other-title');
    input.hidden = false;
  } else {
    const input = document.getElementById('other-title');
    input.hidden = true;
  }
}
//hide colors menu, by default
let colors = document.getElementById('colors-js-puns');
colors.hidden = true;

function hide_t_shirt_info() {
  const tshirt = document.getElementById('color');
  const options = tshirt.getElementsByTagName('option');

  for (let i = 0; i < options.length; i++) {
    options_array.push(options[i]); //add option to options_array, so it can be restored
  }

  for (let i = 0; i < options_array.length; i++) {
    options_array[i].remove(); //remove all options from menu, start with a blank canvas
  }

  const design = document.getElementById('design');
  design.addEventListener('change', show_t_shirt_info);
}

function show_t_shirt_info(e) {
  let colors = document.getElementById('colors-js-puns');
  colors.hidden = false; //unhide colors menu

  const options_design = design.getElementsByTagName('option');
  options_design[0].disabled = true; //disable Select Theme option

  const tshirt = document.getElementById('color');
  const options = tshirt.getElementsByTagName('option');

  //if state is blank, initialize state
  if (tshirt_design_state === '') tshirt_design_state = e.target.value;

  //if state is not target value, then the selection has changed reset the menu
  if (tshirt_design_state !== e.target.value) hide_t_shirt_info();

  //set state to current value
  tshirt_design_state = e.target.value;

  //readd all options from options_array for 'js puns'
  for (let i = 0; i < options_array.length; i++) {
    if (e.target.value === 'js puns') {
      if (options_array[i].value === 'cornflowerblue')
        tshirt.add(options_array[i]);
      if (options_array[i].value === 'darkslategrey')
        tshirt.add(options_array[i]);
      if (options_array[i].value === 'gold') tshirt.add(options_array[i]);
    }

    //readd all options from options_array for 'heart js'
    if (e.target.value === 'heart js') {
      if (options_array[i].value === 'tomato') tshirt.add(options_array[i]);
      if (options_array[i].value === 'steelblue') tshirt.add(options_array[i]);
      if (options_array[i].value === 'dimgrey') shirt.add(options_array[i]);
    }
  }
}

function setup_checkboxes() {
  const activities = document.getElementsByClassName('activities')[0];
  const checkboxes = activities.getElementsByTagName('input');
  //add event listener to each checkbox
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', respond_to_checkbox_events);
  }
}

//map all activities to an index value based in their date and time
const date_and_time_object = {
  all: 0,
  'js-frameworks': 1,
  express: 1,
  'js-libs': 2,
  node: 2,
  'build-tools': 3,
  npm: 4
};

//keep track of checkbox state, used to disable checkboxed for conflicts in activities date and time
//also used for form validation
const date_and_time_array = [false, false, false, false, false];

function respond_to_checkbox_events(e) {
  let cost = 0;

  const activities = document.getElementsByClassName('activities')[0];
  const checkboxes = activities.getElementsByTagName('input');
  //get checkbox state, and save it
  date_and_time_array[date_and_time_object[e.target.name]] = e.target.checked;

  //remove 'cost' display if it already exists
  let cost_display = activities.getElementsByTagName('h1')[0];
  if (cost_display !== undefined) activities.removeChild(cost_display);

  for (let i = 0; i < checkboxes.length; i++) {
    //disable checkbox if not checked, and conflicted
    if (!checkboxes[i].checked)
      checkboxes[i].disabled =
        date_and_time_array[date_and_time_object[checkboxes[i].name]];
    //get cost of activity, add it to total
    if (checkboxes[i].checked)
      cost += parseInt(checkboxes[i].getAttribute('data-cost'));
  }

  //add 'cost' display to page if cost > 0
  if (cost > 0) {
    let cost_display = document.createElement('h1');
    cost_display.innerText = 'Total: $' + cost;
    activities.appendChild(cost_display);
  }

  //reset 'Must Register for Activities!' error if at least one checkbox is checked
  validate_checkboxes(false);
}

//hide payment methods, credit card is default
function hide_payment_info() {
  const payment = document.getElementById('payment');
  payment.addEventListener('change', show_payment_info);

  const select_method = payment.getElementsByTagName('option')[0];
  select_method.disabled = true;

  payment.selectedIndex = 1;

  const paypal = document.getElementById('paypal');
  paypal.hidden = true;

  const bitcoin = document.getElementById('bitcoin');
  bitcoin.hidden = true;
}

//show selected payment method
function show_payment_info(e) {
  const credit_card = document.getElementById('credit-card');
  credit_card.hidden = true;

  const paypal = document.getElementById('paypal');
  paypal.hidden = true;

  const bitcoin = document.getElementById('bitcoin');
  bitcoin.hidden = true;

  if (e.target.value === 'credit card') credit_card.hidden = false;

  if (e.target.value === 'paypal') paypal.hidden = false;

  if (e.target.value === 'bitcoin') bitcoin.hidden = false;
}

document
  .getElementsByTagName('button')[0]
  .addEventListener('mouseover', reset_errors);

let document_is_valid = true;

function reset_errors() {
  if (!document_is_valid) validate_form();
}

//validate form using onsubmit
function validate_form() {
  let is_valid = true;
  if (validate_name() === false) is_valid = false;
  if (validate_email() === false) is_valid = false;
  if (validate_checkboxes(true) === false) is_valid = false;
  if (validate_credit_card() === false) is_valid = false;

  document_is_valid = is_valid;

  if (!is_valid) {
    let button = document.getElementsByTagName('button')[0];
    button.innerText =
      'To Register, please scroll up and fill out all needed fields.';
    button.style.borderColor = 'red';
    button.style.color = 'red';
  }

  if (is_valid) {
    let button = document.getElementsByTagName('button')[0];
    button.innerText = 'Register';
    button.style.borderColor = '';
    button.style.color = '';
  }

  return is_valid;
}

//used to display error text in labels
function display_text_in_label(text, color, id) {
  let label = document.getElementsByTagName('label')[id];
  if (id === 2) label = document.getElementsByTagName('legend')[id];
  label.textContent = text;
  label.style.color = color;
}

//add event listener to the name field, so it can be validated in real-time
document.getElementById('name').addEventListener('keyup', validate_name);

function validate_name() {
  const name = document.getElementById('name');

  //make sure text was given and not just spaces
  if (name.value.length === 0 || !/[^\s]+/.test(name.value)) {
    display_text_in_label('Name has not been provided!', 'red', 0);
    name.style.borderColor = 'red';
    name.style.color = 'red';
    return false;
  } else {
    display_text_in_label('Name:', 'black', 0);
    name.style.borderColor = '';
    name.style.color = 'black';
  }

  //make sure name does not contain numbers
  if (!/^[^\d]+$/.test(name.value)) {
    display_text_in_label('Name can not contain numbers!', 'red', 0);
    name.style.borderColor = 'red';
    name.style.color = 'red';
    return false;
  } else {
    display_text_in_label('Name:', 'black', 0);
    name.style.borderColor = '';
    name.style.color = 'black';
  }

  //make sure name does not contain extra symbols
  if (!/^[^@#!$%\^&*/\\?()\[\]+\-]+$/.test(name.value)) {
    display_text_in_label('Name can not contain: @#!$%^&*!?()[]+-', 'red', 0);
    name.style.borderColor = 'red';
    name.style.color = 'red';
    return false;
  } else {
    display_text_in_label('Name:', 'black', 0);
    name.style.borderColor = '';
    name.style.color = 'black';
  }

  return true;
}

//add event listener to the email field, so it can be validated in real-time
document.getElementById('mail').addEventListener('keyup', validate_email);

function validate_email() {
  const email = document.getElementById('mail');

  //make sure text was given and not just spaces
  if (email.value.length === 0 || !/[^\s]+/.test(email.value)) {
    display_text_in_label('Email has not been provided!', 'red', 1);
    email.style.borderColor = 'red';
    email.style.color = 'red';
    return false;
  } else {
    display_text_in_label('Email:', 'black', 1);
    email.style.borderColor = '';
    email.style.color = 'black';
  }

  //make sure email is valid, is of the form: 'emailaddress@example.com'
  if (!/^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value)) {
    display_text_in_label(
      'Email is not valid! Make sure the email is in the form of "emailaddress@example.com".',
      'red',
      1
    );
    email.style.borderColor = 'red';
    email.style.color = 'red';
    return false;
  } else {
    display_text_in_label('Email:', 'black', 1);
    email.style.borderColor = '';
    email.style.color = 'black';
  }
  return true;
}

function validate_checkboxes(show_error) {
  for (let i = 0; i < date_and_time_array.length; i++) {
    if (date_and_time_array[i]) {
      display_text_in_label('Register for Activities', '', 2);
      return true;
    }
  }
  if (show_error) {
    display_text_in_label('Must Register for Activities!', 'red', 2);
    return false;
  }
}
//add event listener to the card number field, so it can be validated in real-time
document
  .getElementById('cc-num')
  .addEventListener('keyup', validate_credit_card_number);
//add event listener to the zip code field, so it can be validated in real-time
document.getElementById('zip').addEventListener('keyup', validate_zip_code);
//add event listener to the cvv field, so it can be validated in real-time
document.getElementById('cvv').addEventListener('keyup', validate_ccv);

//used by validate_form
function validate_credit_card() {
  let is_valid = true;
  if (validate_credit_card_number() === false) is_valid = false;
  if (validate_zip_code() === false) is_valid = false;
  if (validate_ccv() === false) is_valid = false;
  return is_valid;
}

function validate_credit_card_number() {
  //only validate if credit card is selected as payment
  const credit_card = document.getElementById('credit-card');
  if (credit_card.hidden) return true;

  const cc_num = document.getElementById('cc-num');

  if (cc_num.value.length === 0) {
    display_text_in_label('Card Number has not been provided!', 'red', 14);
    cc_num.style.borderColor = 'red';
    cc_num.style.color = 'red';
    return false;
  } else {
    display_text_in_label('Card Number:', 'black', 14);
    cc_num.style.borderColor = '';
    cc_num.style.color = 'black';
  }

  if (!/^\d{13,16}$/.test(cc_num.value)) {
    display_text_in_label(
      'Card Number is not between 13 and 16 digits!',
      'red',
      14
    );
    cc_num.style.borderColor = 'red';
    cc_num.style.color = 'red';
    return false;
  } else {
    display_text_in_label('Card Number:', 'black', 14);
    cc_num.style.borderColor = '';
    cc_num.style.color = 'black';
  }

  return true;
}

function validate_zip_code() {
  //only validate if credit card is selected as payment
  const credit_card = document.getElementById('credit-card');
  if (credit_card.hidden) return true;

  const zip = document.getElementById('zip');

  if (zip.value.length === 0) {
    display_text_in_label('Zip Code has not been provided!', 'red', 15);
    zip.style.borderColor = 'red';
    zip.style.color = 'red';
    return false;
  } else {
    display_text_in_label('Zip Code:', 'black', 15);
    zip.style.borderColor = '';
    zip.style.color = 'black';
  }

  if (!/^\d{5}$/.test(zip.value)) {
    display_text_in_label('Zip Code is not 5 digits!', 'red', 15);
    zip.style.borderColor = 'red';
    zip.style.color = 'red';
    return false;
  } else {
    display_text_in_label('Zip Code:', 'black', 15);
    zip.style.borderColor = '';
    zip.style.color = 'black';
  }

  return true;
}

function validate_ccv() {
  //only validate if credit card is selected as payment
  const credit_card = document.getElementById('credit-card');
  if (credit_card.hidden) return true;

  const cvv = document.getElementById('cvv');

  if (cvv.value.length === 0) {
    display_text_in_label('CVV has not been provided!', 'red', 16);
    cvv.style.borderColor = 'red';
    cvv.style.color = 'red';
    return false;
  } else {
    display_text_in_label('CVV:', 'black', 16);
    cvv.style.borderColor = '';
    cvv.style.color = 'black';
  }

  if (!/^\d{3}$/.test(cvv.value)) {
    display_text_in_label('CVV is not 3 digits!', 'red', 16);
    cvv.style.borderColor = 'red';
    cvv.style.color = 'red';
    return false;
  } else {
    display_text_in_label('CVV:', 'black', 16);
    cvv.style.borderColor = '';
    cvv.style.color = 'black';
  }

  return true;
}
