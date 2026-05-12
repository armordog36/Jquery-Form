$(document).ready(function () {

    $("#name").focus();

    function isBlank(value) {
        return $.trim(value) === "";
    }

    function validateRequired(fieldId, errorId, message) {
        if (isBlank($("#" + fieldId).val())) {
            $("#" + errorId).text(message);
            return false;
        } else {
            $("#" + errorId).text("");
            return true;
        }
    }

    function validateEmail(fieldId, errorId) {
        var email = $.trim($("#" + fieldId).val());
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {
            $("#" + errorId).text("Email is required.");
            return false;
        } else if (!emailPattern.test(email)) {
            $("#" + errorId).text("Enter a valid email address.");
            return false;
        } else {
            $("#" + errorId).text("");
            return true;
        }
    }

    function validateZip(fieldId, errorId) {
        var zip = $.trim($("#" + fieldId).val());
        var zipPattern = /^\d{5}$/;

        if (zip === "") {
            $("#" + errorId).text("Zip code is required.");
            return false;
        } else if (!zipPattern.test(zip)) {
            $("#" + errorId).text("Zip code must be 5 numeric characters.");
            return false;
        } else {
            $("#" + errorId).text("");
            return true;
        }
    }

    $("#name").blur(function () {
        validateRequired("name", "nameErr", "Name is required.");
    });

    $("#address").blur(function () {
        validateRequired("address", "addressErr", "Billing address is required.");
    });

    $("#city").blur(function () {
        validateRequired("city", "cityErr", "City is required.");
    });

    $("#zip").blur(function () {
        validateZip("zip", "zipErr");
    });

    $("#email").blur(function () {
        validateEmail("email", "emailErr");
    });

    $("#shipaddr").blur(function () {
        validateRequired("shipaddr", "shipaddrErr", "Shipping address is required.");
    });

    $("#shipcity").blur(function () {
        validateRequired("shipcity", "shipcityErr", "Shipping city is required.");
    });

    $("#shipzip").blur(function () {
        validateZip("shipzip", "shipzipErr");
    });

    $("#copy").change(function () {
        if ($(this).is(":checked")) {
            $("#shipaddr").val($("#address").val());
            $("#shipcity").val($("#city").val());
            $("#shipzip").val($("#zip").val());
            $("#shipstate").val($("#state").val());
        }
    });

    $(".qty").blur(function () {
        var ordertotal = 0;

        $(".qty").each(function () {
            var index = $(this).attr("id");
            var quantity = parseInt($(this).val());

            if (isNaN(quantity)) {
                quantity = 0;
                $(this).val(0);
            }

            var price = parseFloat($("#price" + index).text());
            var total = price * quantity;

            $("#total" + index).text(total.toFixed(2));

            ordertotal += total;
        });

        $("#subt").text(ordertotal.toFixed(2));

        var tax = 0;
        var shipState = $("#shipstate").val();

        if (shipState === "TX") {
            tax = ordertotal * 0.08;
        }

        $("#tax").text(tax.toFixed(2));

        ordertotal += tax;

        var shipping = 10;

        if (shipState === "TX") {
            shipping = 5;
        } else if (shipState === "CA" || shipState === "NY") {
            shipping = 20;
        }

        $("#ship").text(shipping.toFixed(2));

        ordertotal += shipping;

        $("#gTotal").text(ordertotal.toFixed(2));
    });

});