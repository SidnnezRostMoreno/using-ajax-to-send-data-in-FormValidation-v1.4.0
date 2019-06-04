$(document).ready(function() {

    const form = document.getElementById('myForm');
    const rE   = $(form.querySelector('[name="realEstate]'));

    var bS  = $('#btnSubmit'),
        sM  = $('#submitModal'),
        sml = $('#submitModalLabel'),
        smp = $('#submitModalParagraph'),
        mH  = $('#submitModal').find('.modal-header'),
        mF  = $('#submitModal').find('.modal-footer');

    const fv = FormValidation.formValidation (
        form, {
            fields: {
                username: {
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
                bootstrap: new FormValidation.plugins.Bootstrap(),
                icon: new FormValidation.plugins.Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh',
                }),
            },
        }
    ).on('core.form.valid', function() {

        FormValidation.utils.fetch('/dist/php/send.php', {
            method: 'POST',
            params: {
                username: form.querySelector('[name="username"]').value,
                email: form.querySelector('[name="email"]').value,
                phone: form.querySelector('[name="phone"]').value,
                realEstate: form.querySelector('[name="realEstate"]').value
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        .then((response) => {
            if (response.result === 'success') {
                sM.modal('show')
                mH.css('background-color', 'palegreen')
                mF.css('background-color', '#f9f9f9')
                sml.removeClass('hellip-loading').addClass('success').text('Your data has been sent successfully !')
                smp.text('We will get back to you shortly.')
                setTimeout(function() {
                    sM.modal('hide')
                    sml.removeClass('success').addClass('hellip-loading');
                }, 15000);
                console.log(response);
            } else {
                sM.modal('show')
                mH.css('background-color', 'tomato')
                mF.css('background-color', '#f9f9f9')
                sml.removeClass('hellip-loading').addClass('error').text('There was a problem with sending your data.')
                smp.text('Please try again later.')
                setTimeout(function() {
                    sM.modal('hide')
                    sml.removeClass('error').addClass('hellip-loading');
                }, 15000);
                console.log(response);
            }
        });
    })
    // Integrate with SelectPicker
    rE.selectpicker()
        .change(function(e) {
            fv.revalidateField('realEstate');
        });
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
    id('user-phone').onkeyup = function(){
        mask( this, mtel );
    }
}
