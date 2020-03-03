/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

//document.getElementById("name").focus();

const options_array = [];

hide_other_title();
hide_t_shirt_info();

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

function show_t_shirt_info() {

    const tshirt = document.getElementById('color');
    const options = tshirt.getElementsByTagName('option');

    options[0].remove();

    for(let i = 0;i < options_array.length;i++) {
        tshirt.add(options_array[i]);
    }
}

