/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

const options_array = [];
let tshirt_design_state = '';
let cost = 0;

hide_other_title();
hide_t_shirt_info();
setup_checkboxes();
hide_payment_info();

function hide_other_title() {
  const title = document.getElementById('title');
  title.addEventListener('change', show_other_title);
  const input = document.getElementById('other-title');
  input.hidden = true;
}

function show_other_title(e) {
  if (e.target.value === 'other') {
    const input = document.getElementById('other-title');
    input.hidden = false;
  } else {
    const input = document.getElementById('other-title');
    input.hidden = true;
  }
}

let colors = document.getElementById('colors-js-puns');
colors.hidden = true;

function hide_t_shirt_info() {
  const tshirt = document.getElementById('color');
  const options = tshirt.getElementsByTagName('option');

  for (let i = 0; i < options.length; i++) {
    options_array.push(options[i]);
  }

  for (let i = 0; i < options_array.length; i++) {
    options_array[i].remove();
  }

  const design = document.getElementById('design');
  design.addEventListener('change', show_t_shirt_info);
}

function show_t_shirt_info(e) {
  let colors = document.getElementById('colors-js-puns');
  colors.hidden = false;

  const options_design = design.getElementsByTagName('option');
  options_design[0].disabled = true;

  const tshirt = document.getElementById('color');
  const options = tshirt.getElementsByTagName('option');

  if (tshirt_design_state === '') tshirt_design_state = e.target.value;

  if (tshirt_design_state !== e.target.value) hide_t_shirt_info();

  tshirt_design_state = e.target.value;

  for (let i = 0; i < options_array.length; i++) {
    if (e.target.value === 'js puns') {
      if (options_array[i].value === 'cornflowerblue')
        tshirt.add(options_array[i]);
      if (options_array[i].value === 'darkslategrey')
        tshirt.add(options_array[i]);
      if (options_array[i].value === 'gold') tshirt.add(options_array[i]);
    }

    if (e.target.value === 'heart js') {
      if (options_array[i].value === 'tomato') tshirt.add(options_array[i]);
      if (options_array[i].value === 'steelblue') tshirt.add(options_array[i]);
      if (options_array[i].value === 'dimgrey') tshirt.add(options_array[i]);
    }
  }
}

function setup_checkboxes() {
  const activities = document.getElementsByClassName('activities')[0];
  const checkboxes = activities.getElementsByTagName('input');

  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', respond_to_checkbox_events);
  }
}

const date_and_time_object = {
  all: 0,
  'js-frameworks': 1,
  express: 1,
  'js-libs': 2,
  node: 2,
  'build-tools': 3,
  npm: 4
};

const date_and_time_array = [false, false, false, false, false];

function respond_to_checkbox_events(e) {
  const activities = document.getElementsByClassName('activities')[0];
  const checkboxes = activities.getElementsByTagName('input');

  date_and_time_array[date_and_time_object[e.target.name]] = e.target.checked;

  let cost_display = activities.getElementsByTagName('h1')[0];
  if (cost_display !== undefined) activities.removeChild(cost_display);
  cost = 0;

  for (let i = 0; i < checkboxes.length; i++) {
    if (!checkboxes[i].checked)
      checkboxes[i].disabled =
        date_and_time_array[date_and_time_object[checkboxes[i].name]];

    if (checkboxes[i].checked)
      cost += parseInt(checkboxes[i].getAttribute('data-cost'));
  }

  if (cost > 0) {
    let cost_display = document.createElement('h1');
    cost_display.innerText = 'Total: $' + cost;

    activities.appendChild(cost_display);
  }

  validate_checkboxes(false);
}

function hide_payment_info() {
  const payment = document.getElementById('payment');
  payment.addEventListener('change', show_payment_info);

  const select_method = payment.getElementsByTagName('option')[0];
  select_method.disabled = true;

  const paypal = document.getElementById('paypal');
  paypal.hidden = true;

  const bitcoin = document.getElementById('bitcoin');
  bitcoin.hidden = true;
}

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

function validate_form() {
  let is_valid = true;

  if (validate_name() === false) is_valid = false;

  if (validate_email() === false) is_valid = false;

  if (validate_checkboxes(true) === false) is_valid = false;

  if (validate_credit_card() === false) is_valid = false;

  return is_valid;
}

function display_text_in_label(text, color, id) {
  let label = document.getElementsByTagName('label')[id];
  if (id === 2) label = document.getElementsByTagName('legend')[id];
  label.textContent = text;
  label.style.color = color;
}

document.getElementById('name').addEventListener('keyup', validate_name);

function validate_name() {
  const name = document.getElementById('name');

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

  if (!/^[^@#!$%\^&*/\\?()\[\]+-]+$/.test(name.value)) {
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

document.getElementById('mail').addEventListener('keyup', validate_email);

function validate_email() {
  const email = document.getElementById('mail');

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

document
  .getElementById('cc-num')
  .addEventListener('keyup', validate_credit_card_number);
document.getElementById('zip').addEventListener('keyup', validate_zip_code);
document.getElementById('cvv').addEventListener('keyup', validate_ccv);

function validate_credit_card() {
  let is_valid = true;

  if (validate_credit_card_number() === false) is_valid = false;

  if (validate_zip_code() === false) is_valid = false;

  if (validate_ccv() === false) is_valid = false;

  return is_valid;
}

function validate_credit_card_number() {
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
