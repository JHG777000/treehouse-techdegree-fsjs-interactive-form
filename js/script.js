/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

//document.getElementById("name").focus();

const options_array = [];
let tshirt_design_state = '';
let cost = 0;

hide_other_title();
hide_t_shirt_info();
setup_checkboxes();

function hide_other_title() {
    const title = document.getElementById('title');
    title.addEventListener('change',show_other_title);
    const input = document.getElementById('other-title');
    input.hidden = true;
}

function show_other_title(e) {

 if (e.target.value === "other") {
    const input = document.getElementById('other-title');
    input.hidden = false;
 } else {
    const input = document.getElementById('other-title');
    input.hidden = true;
 }

}

function hide_t_shirt_info() {
    const tshirt = document.getElementById('color');
    const options = tshirt.getElementsByTagName('option');
    
    for(let i = 0;i < options.length;i++) {
        options_array.push(options[i]);
    }

    for(let i = 0;i < options_array.length;i++) {
        options_array[i].remove();
    }

    const design = document.getElementById('design');
    design.addEventListener('change',show_t_shirt_info);

    let option = document.createElement("option");
    option.text = "Please select a T-shirt theme";

    tshirt.add(option);
}

function show_t_shirt_info(e) {

    const tshirt = document.getElementById('color');
    const options = tshirt.getElementsByTagName('option');

    options[0].remove();

    if (e.target.value === 'Select Theme') {

        hide_t_shirt_info();
        return;
    }

    if ( tshirt_design_state === '') tshirt_design_state = e.target.value;

    if ( tshirt_design_state !== e.target.value ) {
        hide_t_shirt_info();
        options[0].remove();
    }

    tshirt_design_state = e.target.value;

    for(let i = 0;i < options_array.length;i++) {

        if (e.target.value === 'js puns') {
            if ( options_array[i].value === 'cornflowerblue' )
             tshirt.add(options_array[i]);
            if ( options_array[i].value === 'darkslategrey' )
             tshirt.add(options_array[i]);
            if ( options_array[i].value === 'gold' )
             tshirt.add(options_array[i]);      
        }

        if (e.target.value === 'heart js') {
            if ( options_array[i].value === 'tomato' )
             tshirt.add(options_array[i]);
            if ( options_array[i].value === 'steelblue' )
             tshirt.add(options_array[i]);
            if ( options_array[i].value === 'dimgrey' )
             tshirt.add(options_array[i]);      
        }
        
    }
}

function setup_checkboxes() {
    const activities = document.getElementsByClassName('activities')[0];
    const checkboxes = activities.getElementsByTagName('input');

    for(let i = 0;i < checkboxes.length;i++) {
        checkboxes[i].addEventListener('change',respond_to_checkbox_events);
    }
   
}

function respond_to_checkbox_events(e) {

    //update map

    const activities = document.getElementsByClassName('activities')[0];
    const checkboxes = activities.getElementsByTagName('input');

    let cost_display = activities.getElementsByTagName('h1')[0];

    if ( cost_display !== undefined ) activities.removeChild(cost_display);

    cost = 0;
    
    for(let i = 0;i < checkboxes.length;i++) {
        //set checkbox disabled
        if ( checkboxes[i].checked ) 
         cost += parseInt(checkboxes[i].getAttribute('data-cost'));
    }

    if ( cost > 0 ) {
     let cost_display = document.createElement('h1');
     cost_display.innerText = 'Total: $' + cost;

     activities.appendChild(cost_display);
    }
}

