$('#tcdb').click(() => {
    $('.name-cate').html("Tiểu cảnh để bàn")
})

$('#ccdb').click(() => {
    $('.name-cate').html("Chậu cảnh để bàn")
})

$('#ccmn').click(() => {
    $('.name-cate').html("Cây cảnh mini")
})

$('#pctt').click(() => {
    $('.name-cate').html("Phụ kiện trang trí")
})


    $("form[name='login']").validate({
        rules: {

            email: {
                required: true,
                email: true
            },
            password: {
                required: true,

            }
        },
        messages: {
            email: "Please enter a valid email address",

            password: {
                required: "Please enter password",

            }

        },
        submitHandler: () => {
            FormData.submit();
        }
    })

    $("form[name='resgistration']").validate({
        rules: {
            firstname: "required",
            lastname: "required",
            username: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },

        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            username: "Please enter your username",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            email: "Please enter a valid email address"
        },

        submitHandler: function (form) {
            form.submit();
        }
    })
