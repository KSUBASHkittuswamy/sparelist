$(document).ready(function () {

    $("#contextmsg").slideUp(1000);
    $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
        $("#content").toggleClass("active");
    });

    $(".more-button,.body-overlay").on("click", function () {
        $(".body-overlay").toggleClass("show-nav");

    });

    $("#sidebarCollapse,.body-overlay").on("click", function () {
        $("#sidebar,.body-overlay").toggleClass("show-nav");
    });

    // POST STATUS CHECK BOX
    $('#chkpostatus').on('change', () => {
        if ($('#chkpostatus').prop('checked')) {
            $('#hiddenchkpostatus').val('1');
            return false;
        }
        else {
            $('#hiddenchkpostatus').val('0');
            return false;

        }
    });
    // PAYMENT STATUS CHECK BOX
    $('#chkpaystatus').on('change', () => {
        if ($('#chkpaystatus').prop('checked')) {
            $('#hiddenchkpayment').val('1');
            return false;
        }
        else {
            $('#hiddenchkpayment').val('0');
            return false;

        }
    });
    // DISPATCH STATUs CHECK BOX
    $('#chkdispatch').on('change', () => {
        if ($('#chkdispatch').prop('checked')) {
            $('#hiddenchkdispatch').val('1');
            return false;
        }
        else {
            $('#hiddenchkdispatch').val('0');
            return false;

        }
    });
    $("#txtQuotationDate").datepicker({ dateFormat: 'yy-mm-dd' }).val(); ({
    });
    $("#txtSODate").datepicker({ dateFormat: 'yy-mm-dd' }).val(); ({
    });
    $("#txtDispatchDate").datepicker({ dateFormat: 'yy-mm-dd' }).val(); ({
    });
    $('select[name="txtProduct"]').on("change", function () {
        var product = $(this).val();
        if (product) {
            $.ajax({
                data: { 'product_id': product },
                url: "//127.0.0.1:8000/modeldataupdate/",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $('select[name="txtModel"]').empty();
                    $('#txtModel').html("<option value='0'>Select Model</option>")
                    $.each(data, function (key, value) {
                        $('select[name="txtModel"]').append(
                            '<option value="' + value.model_id + '">' + value.modelname + "</option>"
                        );
                    });
                },
            });
        } else {
            $('select[name="txtModel"]').empty();
        }
    });
    $('select[name="txtModel"]').on("change", function () {
        var modelname = $(this).val();
        if (modelname) {
            $.ajax({
                data: { 'model_id': modelname },
                url: "//127.0.0.1:8000/moduleupdate/",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $('select[name="txtModule"]').empty();
                    $('#txtModule').html("<option value='0` '>Select Module</option>")
                    $.each(data, function (key, value) {
                        $('select[name="txtModule"]').append(
                            '<option value="' + value.module_id + '">' + value.module + "</option>"
                        );
                    });
                },
            });
        } else {
            $('select[name="txtModule"]').empty();
        }
    });
    $('#tblSpares').DataTable();

    $("#txtDispatchDate").bind("change", function () {
        myfunc();
    });
});
function binding(x) {
    $.ajax({
        url: "http://127.0.0.1:8000/nestedupdate/" + x + '/',
        method: 'GET',
        data: 'response',
        dataType: "json",

    }).done(function (data) {
        $('#txtThrough').val(data.enquirythrough);
        $('#txtCustomer').val(data.customer);
        $('#txtRegion').val(data.region);
        $("#txtProduct").val(data.product_id.product_id).trigger("change");
        setTimeout(function () { $("#txtModel").val(data.model_id.model_id).trigger("change"); }, 500);
        setTimeout(function () { $("#txtModule").val(data.module_id.module_id).trigger("change"); }, 750);
        console.log(data.model_id);
        $('#txtitempart').val(data.itempart);
        $('#txtQuantity').val(data.quantity);
        $('#txtItemDesc').val(data.itemdescription);
        $('#textname').val(data.personname);
        $('#txtQuotationRefNo').val(data.qrefno);
        $('#txtQuotationDate').val(data.qdate);
        $('#txtRefNo').val(data.porefno);
        $("#chkpostatus").attr("checked", (data.postatus == "1" ? true : false));
        $("#txtSORefNo").val(data.sorefno);
        $("#txtSODate").val(data.sodate);
        $("#chkpaystatus").attr("checked", (data.pstatus == "1" ? true : false));
        $("#txtPayment").val(data.paymentvalue);
        $("#chkdispatch").val(data.dstatus);
        $("#chkdispatch").attr("checked", (data.dstatus == "1" ? true : false));
        $("#txtDispatchDate").val(data.ddate);
        $("#txtDuration").val(data.duration);
        $('#txtThrough').focus();
        $('#form1').attr('action', '/update/' + x + '/')
        $("#btnsave").text("update");
        $("#btnClear").text("Cancel");
    })
}
function clearFields() {
    document.getElementById("txtThrough").value = ""
    document.getElementById("txtCustomer").value = ""
    document.getElementById("txtRegion").value = ""
    document.getElementById("txtProduct").value = ""
    document.getElementById("txtModel").value = ""
    document.getElementById("txtModule").value = ""
    document.getElementById("txtitempart").value = ""
    document.getElementById("txtQuantity").value = ""
    document.getElementById("txtItemDesc").value = ""
    document.getElementById("textname").value = ""
    document.getElementById("txtQuotationRefNo").value = ""
    document.getElementById("txtQuotationDate").value = ""
    document.getElementById("txtRefNo").value = ""
    document.getElementById("chkpostatus").value = ""
    document.getElementById("txtSORefNo").value = ""
    document.getElementById("txtSODate").value = ""
    document.getElementById("chkpaystatus").value = ""
    document.getElementById("chkdispatch").value = ""
    document.getElementById("txtDispatchDate").value = ""
    document.getElementById("txtPayment").value = ""
    document.getElementById("txtDuration").value = ""
    document.getElementById("txtProduct").value = ""
    document.getElementById("txtModel").value = ""
    document.getElementById("txtModule").value = ""
}
function validate() {
    var enquirythrough = document.getElementById('txtThrough')
    var customer = document.getElementById('txtCustomer')
    var region = document.getElementById('txtRegion')
    var product_id = document.getElementById('txtProduct')
    var model_id = document.getElementById('txtModel')
    var module_id = document.getElementById('txtModule')
    var itempart = document.getElementById('txtitempart')
    var quantity = document.getElementById('txtQuantity')
    var itemdescription = document.getElementById('txtItemDesc')
    var personname = document.getElementById('textname')
    var qrefno = document.getElementById('txtQuotationRefNo')
    var qdate = document.getElementById('txtQuotationDate')
    var porefno = document.getElementById('txtRefNo')
    var sorefno = document.getElementById('txtSORefNo')
    var sodate = document.getElementById('txtSODate')
    var paymentvalue = document.getElementById('txtPayment')
    var ddate = document.getElementById('txtDispatchDate')
    var duration = document.getElementById('txtDuration')
    if (enquirythrough.value == 0) {
        alert('enquirythrough is required')
        enquirythrough.focus();
        enquirythrough.style.border = 'solid red 5px'
        return false;
    }
    if (customer.value == 0) {
        alert('customer is required')
        customer.focus();
        customer.style.border = 'solid red 5px'
        return false;
    }
    if (region.value == 0) {
        alert('region is required')
        region.focus();
        region.style.border = 'solid red 5px'
        return false;
    }
    if (product_id.value == 0) {
        alert('product_id is required')
        product_id.focus();
        product_id.style.border = 'solid red 5px'
        return false;
    }
    if (model_id.value == 0) {
        alert('model_id is required')
        model_id.focus();
        model_id.style.border = 'solid red 5px'
        return false;
    }
    if (module_id.value == 0) {
        alert('module is required')
        module_id.focus();
        module_id.style.border = 'solid red 5px'
        return false;
    }
    if (itempart.value == 0) {
        alert('itempart is required')
        itempart.focus();
        itempart.style.border = 'solid red 5px'
        return false;
    }
    if (quantity.value == 0) {
        alert('quantity is required')
        quantity.focus();
        quantity.style.border = 'solid red 5px'
        return false;
    }
    if (itemdescription.value == 0) {
        alert('itemdescription is required')
        itemdescription.focus();
        quantity.style.border = 'solid red 5px'
        return false;
    }
    if (personname.value == 0) {
        alert('personname is required')
        personname.focus();
        personname.style.border = 'solid red 5px'
        return false;
    }
    if (qrefno.value == 0) {
        alert('qrefno is required')
        qrefno.focus();
        qrefno.style.border = 'solid red 5px'
        return false;
    }
    if (qdate.value == 0) {
        alert('qdate is required')
        qdate.focus();
        qdate.style.border = 'solid red 5px'
        return false;
    }
    if (porefno.value == 0) {
        alert('po refno is required')
        porefno.focus();
        porefno.style.border = 'solid red 5px'
        return false;
    }
    if (sorefno.value == 0) {
        alert('so refno is required')
        sorefno.focus();
        sorefno.style.border = 'solid red 5px'
        return false;
    }
    if (sodate.value == 0) {
        alert('sodate is required')
        sodate.focus();
        sodate.style.border = 'solid red 5px'
        return false;
    }
    if (paymentvalue.value == 0) {
        alert('paymentvalue is required')
        paymentvalue.focus();
        paymentvalue.style.border = 'solid red 5px'
        return false;
    }
    if (ddate.value == 0) {
        alert('ddate is required')
        ddate.focus();
        ddate.style.border = 'solid red 5px'
        return false;
    }
    if (duration.value == 0) {
        alert('duration is required')
        duration.focus();
        duration.style.border = 'solid red 5px'
        return false;
    }
}
function myfunc() {
    var start = $("#txtSODate").datepicker("getDate");
    var end = $("#txtDispatchDate").datepicker("getDate");
    days = (end - start) / (1000 * 60 * 60 * 24);
    // alert(Math.round(days));
    $('#txtDuration').val(days);
}