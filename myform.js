document.addEventListener('DOMContentLoaded', function(e) {

    const form  = document.getElementById('myForm');
    const bS    = form.querySelector('[id="btnSubmit"]');
    const sM    = form.querySelector('[id="submitModal"]');
    const sml   = form.querySelector('[id="submitModalLabel"]');
    const smp   = form.querySelector('[id="submitModalParagraph"]');

    const fv = FormValidation.formValidation (
        form, {
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: 'The name is required.'
                        },
                        regexp: {
                            message: 'Only alphabetical letters in this field.',
                            regexp: /^[A-Za-z\s]+$/
                        },
                        stringLength: {
                            min: 2,
                            message: 'Username must be longer than 2 characters.'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'The e-mail is required.'
                        },
                        emailAddress: {
                            message: 'Please enter a valid email address.'
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: 'The phone number is required.'
                        },
                        stringLength: {
                            min: 14,
                            message: 'Landline or cell phone, preceded by the area code.'
                        }
                    }
                },
                realEstate: {
                    validators: {
                        notEmpty: {
                            message: 'Selecting a real estate property is required.'
                        }
                    }
                }
            },
            plugins: {
                trigger: new FormValidation.plugins.Trigger(),
                submitButton: new FormValidation.plugins.SubmitButton(),
                defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
                bootstrap: new FormValidation.plugins.Bootstrap(),
                icon: new FormValidation.plugins.Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh',
                }),
            },
        }
    );


    const selectpicker = function() {
        const realEstate = form.querySelector('[name="realEstate"]').value;

        // Revalidate it
        fv.revalidateField('realEstate');
    };


});


// BR Phone mask
function mask(o,f){
    v_obj=o
    v_fun=f
    setTimeout('execmask()',1)
}

function execmask(){
    v_obj.value=v_fun(v_obj.value)
}

function mtel(v){
    v=v.replace(/\D/g,'');
    v=v.replace(/^(\d{2})(\d)/g,'($1) $2');
    v=v.replace(/(\d)(\d{4})$/,'$1-$2');
    return v;
}

function id( el ){
    return document.getElementById( el );
}

window.onload = function(){
    id('phone-input').onkeyup = function(){
        mask( this, mtel );
    }
}
